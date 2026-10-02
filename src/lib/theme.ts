import { readFileSync } from "node:fs";
import { join } from "node:path";
// ImageResponse cannot resolve CSS variables. Resolve the SAME @theme source on the server.
export function themeColor(token: string) {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  const match = css.match(new RegExp(`--color-${token}:\\s*([^;]+);`));
  if (!match) throw new Error(`Missing theme token: ${token}`);
  return match[1].trim();
}
