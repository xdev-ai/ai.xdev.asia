// Post-process Next.js static export: convert <slug>.html -> <slug>/index.html
// so URLs keep trailing slashes matching the production sitemap (ai.xdev.asia/blog/<slug>/).
const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "..", "out");

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "404.html") {
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

// Inject per-page canonical <link> into every exported HTML file.
// Pages are "use client" components, so Next.js metadata/alternates cannot be used.
const BASE = "https://ai.xdev.asia";
let injected = 0;
for (const html of walk(OUT)) {
  let dir = path.dirname(html);
  // normalize: <slug>/index.html -> /<slug>/ ; out/index.html -> /
  let route = dir === OUT ? "/" : "/" + path.relative(OUT, dir);
  route = route.replace(/\\/g, "/");
  if (route === "/index") route = "/";
  if (route.endsWith("/index")) route = route.slice(0, -6); // trailing-slash canonical for nested pages
  const canonical = `${BASE}${route === "/" ? "" : route}`;
  const linkTag = `<link rel="canonical" href="${canonical}" />`;
  const content = fs.readFileSync(html, "utf8");
  if (content.includes("rel=\"canonical\"")) continue;
  const updated = content.replace("</head>", `${linkTag}</head>`);
  fs.writeFileSync(html, updated);
  injected += 1;
}
console.log(`injected ${injected} canonical links`);
