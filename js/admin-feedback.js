(function () {
    'use strict';

    const searchInput = document.getElementById('admin-search');
    const langFilter = document.getElementById('admin-lang-filter');
    const tokenInput = document.getElementById('admin-token');
    const refreshBtn = document.getElementById('admin-refresh');
    const countEl = document.getElementById('admin-count');
    const statusEl = document.getElementById('admin-status');
    const tbody = document.getElementById('admin-tbody');

    let rawRecords = [];

    function setStatus(text) {
        if (statusEl) {
            statusEl.textContent = text;
        }
    }

    function esc(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderRows(records) {
        if (!tbody) return;
        if (!records.length) {
            tbody.innerHTML =
                '<tr><td colspan="9" style="text-align:center; opacity:0.75;">No feedback records found.</td></tr>';
            return;
        }

        tbody.innerHTML = records
            .map((item) => {
                const sender = item.sender || {};
                const meta = item.metadata || {};
                return `<tr>
                    <td>${esc(item.receivedAt)}</td>
                    <td>${esc(sender.name)}</td>
                    <td>${esc(sender.email)}</td>
                    <td>${esc(item.subject)}</td>
                    <td class="admin-message">${esc(item.message)}</td>
                    <td>${esc(meta.language)}</td>
                    <td>${esc(meta.timezone)}</td>
                    <td>${esc(meta.ip)}</td>
                    <td>${esc(meta.page)}</td>
                </tr>`;
            })
            .join('');
    }

    function applyFilters() {
        const query = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
        const lang = (langFilter && langFilter.value ? langFilter.value : '').trim().toLowerCase();

        const filtered = rawRecords.filter((item) => {
            const sender = item.sender || {};
            const meta = item.metadata || {};
            if (lang && String(meta.language || '').toLowerCase() !== lang) {
                return false;
            }
            if (!query) {
                return true;
            }
            const haystack = [
                sender.name,
                sender.email,
                item.subject,
                item.message,
                meta.page,
                meta.timezone
            ]
                .map((v) => String(v || '').toLowerCase())
                .join(' ');
            return haystack.includes(query);
        });

        renderRows(filtered);
        if (countEl) {
            countEl.textContent = `${filtered.length} records`;
        }
    }

    async function loadRecords() {
        setStatus('Loading...');
        try {
            const headers = {};
            const token = tokenInput && tokenInput.value ? tokenInput.value.trim() : '';
            if (token) {
                headers['x-admin-token'] = token;
            }

            const response = await fetch('/api/feedback/list?limit=500', { headers });
            if (!response.ok) {
                throw new Error(`Request failed (${response.status})`);
            }
            const data = await response.json();
            rawRecords = Array.isArray(data.records) ? data.records : [];
            applyFilters();
            setStatus(`Updated at ${new Date().toLocaleTimeString()}`);
        } catch (error) {
            rawRecords = [];
            renderRows([]);
            if (countEl) {
                countEl.textContent = '0 records';
            }
            setStatus(`Error: ${error.message}`);
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (langFilter) {
        langFilter.addEventListener('change', applyFilters);
    }
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadRecords);
    }

    loadRecords();
})();
