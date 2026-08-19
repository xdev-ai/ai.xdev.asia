// Post-process Next.js static export: inline stylesheet chunks into each HTML page
// so the first paint happens with CSS already applied (no FOUC / transient scrollbar).
const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "..", "out");

// 1. Collect all generated CSS chunks
const cssMap = {};
function walkCss(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkCss(full);
    else if (entry.isFile() && entry.name.endsWith(".css")) {
      cssMap[entry.name] = fs.readFileSync(full, "utf8");
    }
  }
}
walkCss(path.join(OUT, "_next", "static", "chunks"));
const totalCss = Object.values(cssMap).join("");
console.log(`collected ${Object.keys(cssMap).length} css chunks, ${totalCss.length} chars`);

// 2. Inject <style> before </head> of every HTML file
let htmlFiles = 0;
let injected = 0;
function walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles++;
      let html = fs.readFileSync(full, "utf8");
      if (!html.includes('href="/_next/static/chunks/') && !html.includes('href="/_next/static/css/')) continue;
      const headClose = html.indexOf("</head>");
      if (headClose === -1) continue;
      html = html.slice(0, headClose) + `<style data-inlined="true">${totalCss}</style>` + html.slice(headClose);
      // CSS is now inlined — remove the <link> stylesheet tags so they don't block rendering (~300ms saved)
      html = html.replace(/<link rel="stylesheet" href="\/_next\/static\/(chunks|css)\/[^"']*"[^>]*>/g, "");
      fs.writeFileSync(full, html);
      injected++;
    }
  }
}
walkHtml(OUT);
console.log(`scanned ${htmlFiles} html files, injected CSS into ${injected}`);
