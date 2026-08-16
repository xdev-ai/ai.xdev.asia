// Post-process Next.js static export: convert <slug>.html -> <slug>/index.html
// so URLs keep trailing slashes matching the production sitemap (ai.xdev.asia/blog/<slug>/).
const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "..", "out");

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "index.html" && entry.name !== "404.html") {
      results.push(full);
    }
  }
  return results;
}

let moved = 0;
for (const html of walk(OUT)) {
  const dir = path.dirname(html);
  const base = path.basename(html, ".html");
  // Skip __next.* data files
  if (base.startsWith("__next")) continue;
  const targetDir = path.join(dir, base);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.renameSync(html, path.join(targetDir, "index.html"));
  moved += 1;
}
console.log(`moved ${moved} html files to trailing-slash folders`);
