import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (fs.existsSync(indexPath)) {
  const htmlContent = fs.readFileSync(indexPath, "utf-8");

  // Directories to duplicate index.html into for pure static hostings
  const routes = ["admin", "paket", "cek-area", "keunggulan", "cara-pasang", "testimoni", "faq", "mindi"];

  for (const route of routes) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, "index.html"), htmlContent);
  }

  // Also write 404.html as a duplicate of index.html so static hosts fallback seamlessly
  fs.writeFileSync(path.join(distDir, "404.html"), htmlContent);

  console.log("Postbuild completed: Static SPA routes generated.");
}
