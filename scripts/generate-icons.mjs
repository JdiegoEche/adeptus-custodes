// Generates the generic PWA icons (gold spear inside a gold ring on a dark field).
// Pure Node: no image libraries, no third-party artwork.
import { deflateSync, crc32 } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const BACKGROUND = [13, 12, 16];
const GOLD = [212, 175, 55];

/** Returns true when the normalized point (u, v) is gold. `scale` shrinks the drawing toward the center. */
function isGold(u, v, scale) {
  const x = (u - 0.5) / scale + 0.5;
  const y = (v - 0.5) / scale + 0.5;
  const distance = Math.hypot(x - 0.5, y - 0.5);
  const ring = distance >= 0.33 && distance <= 0.37;
  const shaft = Math.abs(x - 0.5) <= 0.022 && y >= 0.36 && y <= 0.8;
  const tip = Math.abs(x - 0.5) / 0.075 + Math.abs(y - 0.3) / 0.13 <= 1;
  const guard = Math.abs(y - 0.44) <= 0.018 && Math.abs(x - 0.5) <= 0.1;
  const pommel = Math.hypot(x - 0.5, y - 0.82) <= 0.035;
  return ring || shaft || tip || guard || pommel;
}

function renderPng(size, scale) {
  const samples = 4;
  const rowLength = size * 3 + 1;
  const raw = Buffer.alloc(rowLength * size);
  for (let py = 0; py < size; py++) {
    raw[py * rowLength] = 0;
    for (let px = 0; px < size; px++) {
      let hits = 0;
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const u = (px + (sx + 0.5) / samples) / size;
          const v = (py + (sy + 0.5) / samples) / size;
          if (isGold(u, v, scale)) hits++;
        }
      }
      const t = hits / (samples * samples);
      const offset = py * rowLength + 1 + px * 3;
      for (let c = 0; c < 3; c++) {
        raw[offset + c] = Math.round(BACKGROUND[c] * (1 - t) + GOLD[c] * t);
      }
    }
  }
  const chunk = (type, data) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const typed = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typed) >>> 0);
    return Buffer.concat([length, typed, crc]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // color type: RGB
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const outputs = [
  ['icon-192.png', 192, 1],
  ['icon-512.png', 512, 1],
  ['icon-maskable-512.png', 512, 0.8],
  ['apple-touch-icon.png', 180, 0.9],
];
for (const [name, size, scale] of outputs) {
  writeFileSync(join(outDir, name), renderPng(size, scale));
  console.log(`wrote public/icons/${name}`);
}
