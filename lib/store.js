import { put, list } from '@vercel/blob';

const CFG_PATH = 'site-config.json';
const STATS_PATH = 'site-stats.json';

export const DEFAULT_CONFIG = {
  theme: { accent: '#3fe0ff', accent2: '#7aa2ff', bg: '#05060a' },
  hero: { desktop: '', mobile: '' },
  categories: [
    { id: 'about', label: 'Men haqimda', icon: 'user' },
    { id: 'projects', label: 'Loyihalar', icon: 'folder' },
    { id: 'certs', label: 'Sertifikatlar', icon: 'award' },
    { id: 'contact', label: "Bog'lanish", icon: 'mail' }
  ],
  text: {
    tabTitle: 'Umidjon Nuraliyev — Nuraliyev Umidjon | Shaxsiy veb-sayt',
    h1: 'NURALIYEV UMIDJON',
    footer: 'Bu — <strong>Umidjon Nuraliyev</strong> (<em>Nuraliyev Umidjon</em>) ning rasmiy shaxsiy veb-sayti. Shaxsiy sahifa, loyihalar, sertifikatlar va bog\'lanish bo\'limlari. GitHub profilingi: <a href="https://github.com/heddleka" rel="me noopener" target="_blank">heddleka</a>.'
  },
  analytics: { snippet: '' },
  creds: { user: 'heddleka', pass: 'umidjon1434##' }
};

async function readPath(pathname) {
  try {
    const res = await list({ prefix: pathname });
    const blobs = (res && res.blobs) || [];
    const rec = blobs.find(function (b) { return b.pathname === pathname; });
    if (!rec) return null;
    const r = await fetch(rec.url);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    return null;
  }
}

async function writePath(pathname, obj) {
  await put(pathname, JSON.stringify(obj), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

export async function readConfig() { return readPath(CFG_PATH); }
export async function writeConfig(cfg) { return writePath(CFG_PATH, cfg); }

export async function ensureConfig() {
  let cfg = await readConfig();
  if (!cfg) { cfg = DEFAULT_CONFIG; await writeConfig(cfg); }
  return cfg;
}

export async function readStats() { return readPath(STATS_PATH); }
export async function writeStats(s) { return writePath(STATS_PATH, s); }

export function readJson(req) {
  return new Promise(function (resolve) {
    var data = '';
    req.on('data', function (c) { data += c; });
    req.on('end', function () { try { resolve(data ? JSON.parse(data) : {}); } catch (e) { resolve({}); } });
    req.on('error', function () { resolve({}); });
  });
}
