import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Only regenerate assets in the live manifest. Unused originals and videos must
// not be reintroduced when this command runs.
const root = process.cwd();
const manifestPath = path.join(root, "src/content/media.ts");
const originals = path.join(root, "asset-sources/originals");
const force = process.argv.includes("--force");
const originalFiles = await fs.readdir(originals);
let manifest = await fs.readFile(manifestPath, "utf8");
const assetPattern = /const assets: Record<string,MediaAsset> = (\{[\s\S]*?\n\});/;
const match = manifest.match(assetPattern);
if (!match) throw new Error("Cannot find the image asset manifest.");
const assets = JSON.parse(match[1]);
const inventory = [];

for (const [key, asset] of Object.entries(assets)) {
  const name = key.slice("image:".length);
  const filename = originalFiles.find((file) =>
    path.parse(file).name === name && /\.(jpe?g|png|webp|avif)$/i.test(file),
  );
  if (!filename) throw new Error(`Missing source image for ${key}`);
  const source = path.join(originals, filename);
  const sourceInfo = await fs.stat(source);
  for (const variant of asset.srcset) {
    for (const format of ["avif", "webp"]) {
      const destination = path.join(root, "public", decodeURIComponent(variant[format]));
      let fresh = false;
      try {
        const outputInfo = await fs.stat(destination);
        fresh = outputInfo.size > 0 && outputInfo.mtimeMs >= sourceInfo.mtimeMs;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      if (!force && fresh) continue;
      await fs.mkdir(path.dirname(destination), { recursive: true });
      const image = sharp(source).rotate().resize({ width: variant.width, withoutEnlargement: true });
      await (format === "avif" ? image.avif({ quality: 62 }) : image.webp({ quality: 67 })).toFile(destination);
    }
  }
  asset.blurDataURL = `data:image/webp;base64,${(await sharp(source).rotate().resize(24, 16, { fit: "inside" }).blur(1).webp({ quality: 30 }).toBuffer()).toString("base64")}`;
  asset.kind = "image";
  asset.sources = [];
  inventory.push({ file: filename, bytes: sourceInfo.size, classification: asset.alt });
  console.log(`Image: ${filename}`);
}
manifest = manifest.replace(assetPattern, `const assets: Record<string,MediaAsset> = ${JSON.stringify(assets, null, 2)};`);
await fs.writeFile(manifestPath, manifest);
const slots = JSON.parse(manifest.match(/const slots:Record<string,string> = (\{[\s\S]*?\n\});/)[1]);
const outputs = [];
for (const file of [...new Set(Object.values(assets).flatMap(asset => asset.srcset.flatMap(variant => [variant.avif, variant.webp])))]) {
  outputs.push({ file: file.replace("/assets/", ""), bytes: (await fs.stat(path.join(root, "public", decodeURIComponent(file)))).size });
}
await fs.writeFile(path.join(root, "MEDIA_INVENTORY.json"), JSON.stringify({ originals: inventory, slots, outputs, totalBytes: outputs.reduce((total, item) => total + item.bytes, 0), videoBytes: 0 }, null, 2) + "\n");
console.log(`Verified ${Object.keys(assets).length} live image assets. No video files generated.`);
