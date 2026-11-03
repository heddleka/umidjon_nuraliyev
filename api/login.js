import { ensureConfig, readJson } from '../lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  try {
    const { user, pass } = await readJson(req);
    const cfg = await ensureConfig();
    if (user === cfg.creds.user && pass === cfg.creds.pass) {
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ ok: false });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
