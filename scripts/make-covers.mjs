/**
 * Tạo ảnh cover biến thể nhỏ cho static export:
 * mỗi cover-*.webp → cover-*@760w.webp + cover-*@380w.webp
 * Dùng Sharp (nếu có) hoặc ffmpeg. Gọi: node scripts/make-covers.mjs
 */
import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../public/blog/", import.meta.url).pathname;
const files = readdirSync(dir).filter((f) => f.startsWith("cover-") && f.endsWith(".webp"));

let sharpAvailable = false;
try {
  await import("sharp");
  sharpAvailable = true;
} catch {
  sharpAvailable = false;
}

for (const f of files) {
  const base = f.replace(/\.webp$/, "");
  for (const w of [760, 380]) {
    const out = join(dir, `${base}@${w}w.webp`);
    if (sharpAvailable) {
      const sharp = (await import("sharp")).default;
      await sharp(join(dir, f)).resize(w, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    } else {
      execSync(
        `ffmpeg -y -v error -i "${join(dir, f)}" -vf "scale=${w}:-1" -c:v libwebp -q:v 80 "${out}"`,
      );
    }
    console.log(`  ${out}`);
  }
}
console.log(`Done: ${files.length} covers x 2 variants`);
