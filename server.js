const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

(function loadDotEnvFile() {
    try {
        const envPath = path.join(ROOT_DIR, '.env');
        if (!fs.existsSync(envPath)) {
            return;
        }
        const text = fs.readFileSync(envPath, 'utf8');
        for (const line of text.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) {
                continue;
            }
            const eq = trimmed.indexOf('=');
            if (eq <= 0) {
                continue;
            }
            const key = trimmed.slice(0, eq).trim();
            if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
                continue;
            }
            let value = trimmed.slice(eq + 1).trim();
            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1);
            }
            if (process.env[key] === undefined) {
                process.env[key] = value;
            }
        }
    } catch (error) {
        console.warn('[env] Could not read .env:', error.message);
    }
})();

const DATA_DIR = path.join(ROOT_DIR, 'data');
const FEEDBACK_LOG = path.join(DATA_DIR, 'feedback-log.jsonl');
const MAX_BODY_BYTES = 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_MS = 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const feedbackRateLimitStore = new Map();

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf'
};

function ensureDataDir() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
}

function sanitizeText(value, maxLen) {
    return String(value || '')
        .replace(/\0/g, '')
        .trim()
        .slice(0, maxLen);
}

function getRateLimitState(ip) {
    const now = Date.now();
    const key = ip || 'unknown';
    const existing = feedbackRateLimitStore.get(key) || { windowStart: now, count: 0 };
    if (now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
        const reset = { windowStart: now, count: 0 };
        feedbackRateLimitStore.set(key, reset);
        return reset;
    }
    return existing;
}

function checkAndConsumeRateLimit(ip) {
    const state = getRateLimitState(ip);
    if (state.count >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }
    state.count += 1;
    feedbackRateLimitStore.set(ip || 'unknown', state);
    return true;
}

function collectRequestBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];

        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                reject(new Error('Payload too large'));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });

        req.on('end', () => {
            resolve(Buffer.concat(chunks).toString('utf8'));
        });

        req.on('error', reject);
    });
}

function extractClientIp(req) {
    const fwd = req.headers['x-forwarded-for'];
    if (typeof fwd === 'string' && fwd.length > 0) {
        return fwd.split(',')[0].trim();
    }
    return req.socket.remoteAddress || '';
}

function truncateNotifyText(value, maxLen) {
    const t = String(value || '');
    if (t.length <= maxLen) {
        return t;
    }
    return `${t.slice(0, Math.max(0, maxLen - 1))}…`;
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

async function postDiscordWebhook(webhookUrl, record) {
    const { sender, subject, message, receivedAt, metadata } = record;
    const body = {
        username: 'Site feedback',
        embeds: [
            {
                title: truncateNotifyText(subject, 256),
                color: 0x4a90e2,
                fields: [
                    {
                        name: 'Name',
                        value: truncateNotifyText(sender.name, 1024) || '—',
                        inline: true
                    },
                    {
                        name: 'Email',
                        value: truncateNotifyText(sender.email, 1024) || '—',
                        inline: true
                    },
                    {
                        name: 'Message',
                        value: truncateNotifyText(message, 4000) || '—'
                    },
                    {
                        name: 'Meta',
                        value: truncateNotifyText(
                            `Page: ${metadata.page || ''}\nLang: ${metadata.language || ''}\nIP: ${metadata.ip || ''}`,
                            1024
                        )
                    }
                ],
                footer: { text: truncateNotifyText(receivedAt, 2048) }
            }
        ]
    };
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status}: ${truncateNotifyText(detail, 200)}`);
    }
}

async function postSlackWebhook(webhookUrl, record) {
    const { sender, subject, message, receivedAt, metadata } = record;
    const text =
        `*New website message*\n` +
        `*When:* ${receivedAt}\n` +
        `*Name:* ${sender.name}\n` +
        `*Email:* ${sender.email}\n` +
        `*Subject:* ${subject}\n` +
        `*Message:*\n${message}\n` +
        `—\n_Page:_ ${metadata.page || ''} _Lang:_ ${metadata.language || ''} _IP:_ ${metadata.ip || ''}`;
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: truncateNotifyText(text, 38000) }),
        signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status}: ${truncateNotifyText(detail, 200)}`);
    }
}

async function postResendEmail(record) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.FEEDBACK_NOTIFY_EMAIL;
    const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
    if (!apiKey || !to) {
        return;
    }
    const { sender, subject, message, receivedAt, metadata } = record;
    const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">
<h2 style="margin:0 0 12px">New site message</h2>
<p><strong>When:</strong> ${escapeHtml(receivedAt)}</p>
<p><strong>Name:</strong> ${escapeHtml(sender.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(sender.email)}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<p><strong>Message:</strong></p>
<pre style="white-space:pre-wrap;margin:0;padding:12px;background:#f4f4f5;border-radius:8px">${escapeHtml(
        message
    )}</pre>
<hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/>
<p style="font-size:13px;color:#555">Page: ${escapeHtml(metadata.page)} · Lang: ${escapeHtml(
        metadata.language
    )} · IP: ${escapeHtml(metadata.ip)}</p>
</body></html>`;
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from,
            to: [to],
            subject: `[Site] ${truncateNotifyText(subject, 180)}`,
            html
        }),
        signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(`Resend ${response.status}: ${truncateNotifyText(detail, 300)}`);
    }
}

async function sendFeedbackNotifications(record) {
    const discordUrl = (process.env.DISCORD_WEBHOOK_URL || '').trim();
    const slackUrl = (process.env.SLACK_WEBHOOK_URL || '').trim();
    const hasResend =
        Boolean((process.env.RESEND_API_KEY || '').trim()) &&
        Boolean((process.env.FEEDBACK_NOTIFY_EMAIL || '').trim());

    const tasks = [];
    if (discordUrl) {
        tasks.push(
            postDiscordWebhook(discordUrl, record).catch((error) => {
                console.error('[notify discord]', error.message);
            })
        );
    }
    if (slackUrl) {
        tasks.push(
            postSlackWebhook(slackUrl, record).catch((error) => {
                console.error('[notify slack]', error.message);
            })
        );
    }
    if (hasResend) {
        tasks.push(
            postResendEmail(record).catch((error) => {
                console.error('[notify email]', error.message);
            })
        );
    }

    if (tasks.length === 0) {
        return;
    }
    await Promise.all(tasks);
}

async function handleFeedback(req, res) {
    try {
        const rawBody = await collectRequestBody(req);
        const parsed = JSON.parse(rawBody);
        const ip = sanitizeText(extractClientIp(req), 120);

        if (!checkAndConsumeRateLimit(ip)) {
            sendJson(res, 429, { ok: false, error: 'Too many submissions, try again later.' });
            return;
        }

        const honeypotValue = sanitizeText(parsed.website, 300);
        if (honeypotValue) {
            sendJson(res, 400, { ok: false, error: 'Spam detected' });
            return;
        }

        const clientStartedAt = Date.parse(parsed.clientStartedAt || '');
        const clientTimestamp = Date.parse(parsed.clientTimestamp || '');
        if (!Number.isNaN(clientStartedAt) && !Number.isNaN(clientTimestamp)) {
            if (clientTimestamp - clientStartedAt < MIN_FORM_FILL_MS) {
                sendJson(res, 400, { ok: false, error: 'Form submitted too quickly' });
                return;
            }
        }

        const record = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
            receivedAt: new Date().toISOString(),
            sender: {
                name: sanitizeText(parsed.name, 120),
                email: sanitizeText(parsed.email, 180)
            },
            subject: sanitizeText(parsed.subject, 180),
            message: sanitizeText(parsed.message, 4000),
            metadata: {
                page: sanitizeText(parsed.page, 240),
                language: sanitizeText(parsed.language, 20),
                timezone: sanitizeText(parsed.timezone, 80),
                clientTimestamp: sanitizeText(parsed.clientTimestamp, 80),
                ip,
                userAgent: sanitizeText(req.headers['user-agent'], 400)
            }
        };

        if (!record.sender.name || !record.sender.email || !record.subject || !record.message) {
            sendJson(res, 400, { ok: false, error: 'Missing required fields' });
            return;
        }

        ensureDataDir();
        fs.appendFileSync(FEEDBACK_LOG, `${JSON.stringify(record)}\n`, 'utf8');
        sendJson(res, 200, { ok: true });
        setImmediate(() => {
            sendFeedbackNotifications(record).catch((error) => {
                console.error('[feedback notify]', error.message);
            });
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, error: 'Unable to process feedback' });
    }
}

function readFeedbackRecords(limit) {
    if (!fs.existsSync(FEEDBACK_LOG)) {
        return [];
    }
    const raw = fs.readFileSync(FEEDBACK_LOG, 'utf8');
    if (!raw.trim()) {
        return [];
    }
    const lines = raw
        .trim()
        .split('\n')
        .filter(Boolean);
    const sliced = lines.slice(-limit).reverse();
    return sliced
        .map((line) => {
            try {
                return JSON.parse(line);
            } catch (error) {
                return null;
            }
        })
        .filter(Boolean);
}

function handleFeedbackList(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const limitRaw = Number(parsedUrl.searchParams.get('limit') || '200');
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 1000) : 200;

    if (ADMIN_TOKEN) {
        const suppliedToken = String(req.headers['x-admin-token'] || '');
        if (suppliedToken !== ADMIN_TOKEN) {
            sendJson(res, 401, { ok: false, error: 'Unauthorized' });
            return;
        }
    }

    const records = readFeedbackRecords(limit);
    sendJson(res, 200, {
        ok: true,
        count: records.length,
        records
    });
}

function resolveSafePath(urlPathname) {
    const cleaned = decodeURIComponent(urlPathname.split('?')[0]);
    const requestedPath = cleaned === '/' ? '/index.html' : cleaned;
    const normalized = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, '');
    return path.join(ROOT_DIR, normalized);
}

function serveStatic(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const fsPath = resolveSafePath(parsedUrl.pathname);

    if (!fsPath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(fsPath, (error, data) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not found');
                return;
            }
            res.writeHead(500);
            res.end('Server error');
            return;
        }

        const ext = path.extname(fsPath).toLowerCase();
        const mime = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
    });
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/api/feedback') {
        await handleFeedback(req, res);
        return;
    }
    if (req.method === 'GET' && req.url.startsWith('/api/feedback/list')) {
        handleFeedbackList(req, res);
        return;
    }
    serveStatic(req, res);
});

server.listen(PORT, () => {
    ensureDataDir();
    console.log(`Website server is running at http://localhost:${PORT}`);
    console.log(`Feedback log file: ${FEEDBACK_LOG}`);
    if (!ADMIN_TOKEN) {
        console.warn(
            '[security] ADMIN_TOKEN is not set: anyone who can reach /api/feedback/list can read messages. Set ADMIN_TOKEN in .env for production.'
        );
    }
    const hasDiscord = Boolean((process.env.DISCORD_WEBHOOK_URL || '').trim());
    const hasSlack = Boolean((process.env.SLACK_WEBHOOK_URL || '').trim());
    const hasResend =
        Boolean((process.env.RESEND_API_KEY || '').trim()) &&
        Boolean((process.env.FEEDBACK_NOTIFY_EMAIL || '').trim());
    if (!hasDiscord && !hasSlack && !hasResend) {
        console.warn(
            '[notify] No DISCORD_WEBHOOK_URL, SLACK_WEBHOOK_URL, or RESEND+FEEDBACK_NOTIFY_EMAIL — new messages are only written to the log file.'
        );
    } else {
        const channels = [
            hasDiscord && 'Discord',
            hasSlack && 'Slack',
            hasResend && 'Email (Resend)'
        ].filter(Boolean);
        console.log(`[notify] Enabled: ${channels.join(', ')}`);
    }
});
