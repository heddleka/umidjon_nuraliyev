import { ensureConfig, writeConfig, readJson } from '../lib/store.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const cfg = await ensureConfig();
      const pub = Object.assign({}, cfg);
      delete pub.creds; // login/parol hech qachon mijozga qaytarilmaydi
      return res.status(200).json(pub);
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const cur = await ensureConfig();
      const authed = body.user === cur.creds.user && body.pass === cur.creds.pass;
      if (!authed) return res.status(401).json({ error: 'auth' });

      const incoming = body.config || {};
      const creds = incoming.creds || cur.creds;
      const merged = Object.assign({}, cur, incoming, { creds });
      await writeConfig(merged);

      const pub = Object.assign({}, merged);
      delete pub.creds;
      return res.status(200).json(pub);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
