import { readStats, writeStats, readJson } from '../lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  try {
    const body = await readJson(req);
    let s = await readStats() || { visits: 0, sessions: 0, unique: 0, first: Date.now(), last: 0, visitors: {} };
    s.visits = (s.visits || 0) + 1;
    s.last = Date.now();
    if (!s.first) s.first = s.last;

    s.visitors = s.visitors || {};
    if (body.vid && !s.visitors[body.vid]) s.visitors[body.vid] = 1;
    else if (body.vid) s.visitors[body.vid]++;
    s.unique = Object.keys(s.visitors).length;

    if (body.newSession) s.sessions = (s.sessions || 0) + 1;

    await writeStats(s);
    return res.status(200).json({ visits: s.visits, sessions: s.sessions, unique: s.unique, first: s.first, last: s.last });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
