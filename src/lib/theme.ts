import { readFileSync } from "node:fs";
import { join } from "node:path";

// ImageResponse cannot resolve CSS variables; resolve aliases from the CSS source.
export function themeColor(token: string): string {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  const seen = new Set<string>();
  const resolve = (name: string): string => {
    if (!/^[a-z0-9-]+$/i.test(name)) throw new Error(`Invalid theme token: ${name}`);
    if (seen.has(name)) throw new Error(`Circular theme token: ${name}`);
    seen.add(name);
    const match = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`));
    if (!match) throw new Error(`Missing theme token: ${name}`);
    const value = match[1].trim();
    const alias = value.match(/^var\(--color-([a-z0-9-]+)\)$/i);
    return alias ? resolve(alias[1]) : value;
  };
  return resolve(token);
}
