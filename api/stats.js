import { readStats } from '../lib/store.js';

export default async function handler(req, res) {
  try {
    const s = await readStats();
    return res.status(200).json({
      visits: (s && s.visits) || 0,
      sessions: (s && s.sessions) || 0,
      unique: (s && s.unique) || 0,
      first: (s && s.first) || 0,
      last: (s && s.last) || 0
    });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
