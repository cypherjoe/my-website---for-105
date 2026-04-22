const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
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
});
