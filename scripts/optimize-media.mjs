import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const root = process.cwd();
const originals = path.join(root, "media/originals");
const output = path.join(root, "public/media");
const cache = path.join(root, "media/.cache");
const force = process.argv.includes("--force");
const widths = [640, 1080, 1920, 2560];
const credit =
  "User-supplied stock. Source URL, author and licence awaiting confirmation.";
const heroNames = new Set([
  "oil-refinery",
  "pipeline-welding",
  "14529100_3840_2160_30fps",
]);
const classifications = {
  "12966194_4096_2160_25fps":
    "Black-and-white industrial processing equipment and piping",
  "14529100_3840_2160_30fps": "Offshore platform and vessel at sunset",
  "15122253_2160_3840_30fps":
    "Portrait clip of a worker among industrial pipes",
  "4392869-uhd_3840_2160_30fps": "Crane vessel at an offshore worksite",
  "9339478-uhd_3840_2160_24fps":
    "Daytime aerial view of refinery processing units",
  scaffolding:
    "Residential house scaffolding (video); multi-storey building frame (photo)",
  "pexels-joseph-russo-430180075-29590119":
    "Industrial processing facility illuminated at dusk",
  "pipe-rack": "Steel pipes stacked in a fabrication/storage yard",
  "pipe-rack1": "Stacked steel pipes beside a gantry crane",
};
const altByName = {
  engineering: "Industrial engineering and machine equipment",
  "Electrical & Instrumentation": "Electrical control-panel wiring and instrumentation",
  "Procurement-supply-chain": "Container vessel illustrating procurement and supply chains",
  "project-management": "Construction team reviewing a building worksite",
  "project-facilities": "Illustrative facility-management graphic with a worker",
  Sectors: "Offshore structures at sunset",
  "frank-mckenna-tjX_sniNzgQ-unsplash": "Shipping containers stacked in a logistics yard",
  "oil-refinery": "Aerial view of an illuminated oil refinery at night",
  "pipeline-welding": "Automated welding around an industrial pipe",
  "cement-plant": "Cement manufacturing facility and processing structures",
  "industrial-plant-night": "Industrial processing plant illuminated at night",
  offshore: "Small offshore structure standing above the sea",
  offshore1: "Offshore drilling platform beside a shoreline",
  "pipe-welding": "Worker welding a steel pipe, wearing protective gloves",
  "power-plant": "Power station cooling towers releasing steam",
  "steel-structure-construction":
    "Interior of a building with structural steel roof framing",
  "steel-structure-construction-1":
    "Structural steel building framework under construction",
};
const focalByName = {
  offshore: { x: 0.5, y: 0.46 },
  scaffolding: { x: 0.58, y: 0.5 },
  "pipe-welding": { x: 0.56, y: 0.55 },
};
function run(command, args) {
  const r = spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
  if (r.status !== 0)
    throw new Error(`${command} failed: ${r.stderr || r.error}`);
  return r.stdout;
}
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
async function encode(src, dest, args, maxBytes) {
  let bytes = (await exists(dest)) ? (await fs.stat(dest)).size : Infinity;
  if (force || bytes > maxBytes) {
    let attempt = [...args];
    for (let pass = 0; pass < 4; pass++) {
      run("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        ...attempt,
        dest,
      ]);
      bytes = (await fs.stat(dest)).size;
      if (bytes <= maxBytes) break;
      const index = attempt.indexOf("-crf");
      attempt[index + 1] = String(Number(attempt[index + 1]) + 4);
      if (pass >= 1) attempt[attempt.indexOf("-t") + 1] = "6";
    }
  }
  if (bytes > maxBytes)
    throw new Error(
      `Size budget exceeded after retries: ${path.basename(dest)} = ${bytes} bytes (limit ${maxBytes}).`,
    );
  return { file: path.relative(output, dest), bytes };
}

async function imageVariants(src, name, focal = { x: 0.5, y: 0.5 }) {
  const metadata = await sharp(src).metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
  const sourceHeight = metadata.autoOrient?.height ?? metadata.height;
  const targets = widths.filter((w) => w <= sourceWidth);
  if (!targets.length) targets.push(sourceWidth);
  const srcset = [];
  for (const width of targets) {
    const avif = `${name}-${width}.avif`,
      webp = `${name}-${width}.webp`;
    for (const [file, format] of [
      [avif, "avif"],
      [webp, "webp"],
    ]) {
      const dest = path.join(output, "images", file);
      if (force || !(await exists(dest))) {
        const pipeline = sharp(src)
          .rotate()
          .resize({ width, withoutEnlargement: true });
        await (
          format === "avif"
            ? pipeline.avif({ quality: 62, effort: 3 })
            : pipeline.webp({ quality: 67 })
        ).toFile(dest);
      }
    }
    srcset.push({
      width,
      avif: `/media/images/${avif}`,
      webp: `/media/images/${webp}`,
    });
  }
  const blurDataURL = `data:image/webp;base64,${(await sharp(src).rotate().resize(24, 16, { fit: "inside" }).blur(1).webp({ quality: 30 }).toBuffer()).toString("base64")}`;
  const recommended = srcset.find((v) => v.width === 1080) ?? srcset[0];
  return {
    kind: "image",
    src: recommended.avif,
    srcset,
    sources: [],
    poster: recommended.avif,
    blurDataURL,
    focal,
    alt: altByName[name] ?? classifications[name] ?? name.replaceAll("-", " "),
    credit,
    stock: true,
    width: sourceWidth,
    height: sourceHeight,
  };
}

run("ffmpeg", ["-version"]);
await Promise.all(
  ["images", "videos"].map((dir) =>
    fs.mkdir(path.join(output, dir), { recursive: true }),
  ),
);
await fs.mkdir(cache, { recursive: true });
const files = (await fs.readdir(originals))
  .filter((f) => /\.(jpg|jpeg|png|webp|mp4)$/i.test(f))
  .sort();
const assets = {},
  inventory = [];
for (const file of files) {
  const name = path.parse(file).name,
    src = path.join(originals, file);
  const stat = await fs.stat(src);
  if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
    assets[`image:${name}`] = await imageVariants(src, name, focalByName[name]);
    inventory.push({
      file,
      bytes: stat.size,
      classification: assets[`image:${name}`].alt,
    });
    console.log(`Image: ${file}`);
    continue;
  }
  const probe = JSON.parse(
    run("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "stream=width,height:format=duration",
      "-of",
      "json",
      src,
    ]),
  );
  const stream = probe.streams.find((s) => s.width),
    duration = Number(probe.format.duration);
  const portrait = stream.height > stream.width,
    hero = heroNames.has(name);
  const start = Math.max(0, Math.min(duration / 2 - 4, duration - 8));
  const posterSource = path.join(cache, `${name}-poster.jpg`);
  if (force || !(await exists(posterSource)))
    run("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-ss",
      String(duration / 2),
      "-i",
      src,
      "-frames:v",
      "1",
      "-q:v",
      "2",
      posterSource,
    ]);
  const posterAsset = await imageVariants(
    posterSource,
    `${name}-poster`,
    focalByName[name],
  );
  posterAsset.alt =
    altByName[name] ?? classifications[name] ?? name.replaceAll("-", " ");
  const sources = [];
  const formats = hero
    ? [
        { width: 1920, height: 1080, format: "mp4", crf: 28, max: 4e6 },
        { width: 1920, height: 1080, format: "webm", crf: 34, max: 4e6 },
        { width: 1280, height: 720, format: "mp4", crf: 30, max: 1.5e6 },
      ]
    : [
        {
          width: portrait ? 406 : 1280,
          height: 720,
          format: "mp4",
          crf: 30,
          max: 2e6,
        },
      ];
  for (const variant of formats) {
    const filename = `${name}-${variant.height}${variant.format === "webm" ? "-vp9" : ""}.${variant.format}`;
    const dest = path.join(output, "videos", filename);
    const filter = `scale=${variant.width}:${variant.height}:force_original_aspect_ratio=increase,crop=${variant.width}:${variant.height},fps=24`;
    const args = [
      "-ss",
      String(start),
      "-i",
      src,
      "-t",
      "8",
      "-vf",
      filter,
      "-an",
    ];
    if (variant.format === "mp4")
      args.push(
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        String(variant.crf),
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
      );
    else
      args.push(
        "-c:v",
        "libvpx-vp9",
        "-crf",
        String(variant.crf),
        "-b:v",
        "1800k",
        "-maxrate",
        "2500k",
        "-bufsize",
        "5000k",
        "-row-mt",
        "1",
        "-deadline",
        "realtime",
        "-cpu-used",
        "5",
        "-pix_fmt",
        "yuv420p",
      );
    const info = await encode(src, dest, args, variant.max);
    sources.push({
      src: `/media/videos/${filename}`,
      type: `video/${variant.format}`,
      width: variant.width,
      height: variant.height,
      bytes: info.bytes,
      mobile: variant.height === 720,
    });
  }
  assets[`video:${name}`] = { ...posterAsset, kind: "video", sources };
  inventory.push({
    file,
    bytes: stat.size,
    width: stream.width,
    height: stream.height,
    duration,
    classification: assets[`video:${name}`].alt,
    portrait,
  });
  console.log(`Video: ${file}`);
}
const slots = {
  Engineering: "image:engineering",
  "Procurement & Supply Chain": "image:Procurement-supply-chain",
  "Project Management": "image:project-management",
  "Electrical & Instrumentation": "image:Electrical & Instrumentation",
  "Project Facilities": "image:project-facilities",
  Sectors: "video:oil-refinery",
  Projects: "image:offshore1",
  Insights: "image:pexels-joseph-russo-430180075-29590119",
  Careers: "image:scaffolding",
  "Become a Vendor": "image:pipe-rack1",
  "Request a Quote": "image:cement-plant",
  "hero-1": "video:oil-refinery",
  "hero-2": "video:pipeline-welding",
  "hero-3": "video:14529100_3840_2160_30fps",
  "Oil & Gas": "image:Sectors",
  Refining: "video:9339478-uhd_3840_2160_24fps",
  Power: "video:power-plant",
  Cement: "video:cement-plant",
  "refining-photo": "image:pexels-joseph-russo-430180075-29590119",
  "power-photo": "image:power-plant",
  "cement-photo": "image:cement-plant",
  "Civil & Buildings": "image:scaffolding",
  "Mechanical & Piping": "image:pipe-welding",
  "Structural Steel": "image:steel-structure-construction-1",
  "Plant Services (Turnaround & Shutdown)": "video:12966194_4096_2160_25fps",
  Maintenance: "video:industrial-plant-night",
  Offshore: "video:4392869-uhd_3840_2160_30fps",
  "offshore-photo": "image:offshore",
  "offshore-platform": "image:offshore1",
  "piping-yard": "image:pipe-rack",
  "piping-yard-alternate": "image:pipe-rack1",
  "mechanical-texture": "video:12966194_4096_2160_25fps",
  "civil-scaffolding-video": "video:scaffolding",
  "Plan & Procure": "image:frank-mckenna-tjX_sniNzgQ-unsplash",
  "Build & Maintain": "image:steel-structure-construction-1",
  About: "image:industrial-plant-night",
  Services: "image:steel-structure-construction",
  QHSE: "image:pipe-welding",
  Conduct: "image:pipe-rack",
  Contact: "video:industrial-plant-night",
  "qhse-story": "video:15122253_2160_3840_30fps",
  "qhse-background": "image:industrial-plant-night",
  "cta-background": "image:offshore",
  "project-1": "image:pexels-joseph-russo-430180075-29590119",
  "project-2": "image:power-plant",
  "project-3": "image:cement-plant",
  "insight-1": "image:project-management",
  "insight-2": "video:15122253_2160_3840_30fps",
  "insight-3": "image:engineering",
};
const collections = {
  "Mechanical & Piping": ["piping-yard", "piping-yard-alternate", "mechanical-texture"],
  "Structural Steel": ["Services"],
  "Civil & Buildings": ["civil-scaffolding-video"],
  "Offshore": ["offshore-photo", "offshore-platform"],
  "Refining": ["refining-photo"],
  "Power": ["power-photo"],
  "Cement": ["cement-photo"],
};
const missing = [
  "careers-people",
];
const placeholder = {
  kind: "placeholder",
  src: "/media-placeholder.svg",
  srcset: [],
  sources: [],
  poster: "/media-placeholder.svg",
  blurDataURL: "",
  focal: { x: 0.5, y: 0.5 },
  alt: "Reserved media area; approved imagery needed",
  credit: "Placeholder; no stock asset assigned",
  stock: false,
  width: 1600,
  height: 1000,
};
// Evaluate the brightest sampled 8x8 region, including both mobile/desktop crops.
const luminance = rgb => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
const bannerContrast = {};
for (const [key, asset] of Object.entries(assets)) {
  const {data, info} = await sharp(path.join(root, 'public', asset.poster)).resize({width: 512}).removeAlpha().raw().toBuffer({resolveWithObject: true});
  let brightest = [0, 0, 0], maximum = 0;
  for (let y = 0; y < info.height - 7; y += 8) for (let x = 0; x < info.width - 7; x += 8) {
    const rgb = [0, 0, 0];
    for (let dy = 0; dy < 8; dy++) for (let dx = 0; dx < 8; dx++) for (let c = 0; c < 3; c++) rgb[c] += data[((y + dy) * info.width + x + dx) * info.channels + c] / 64;
    if (luminance(rgb) > maximum) { maximum = luminance(rgb); brightest = rgb; }
  }
  let alpha = .55;
  const background = () => brightest.map((v, i) => v * (1 - alpha) + [10, 35, 66][i] * alpha);
  while (contrast([233, 169, 58], background()) < 4.6 && alpha < .9) alpha += .01;
  asset.scrimStrength = Number(alpha.toFixed(2));
  bannerContrast[key] = { brightestRGB: brightest.map(Math.round), scrimStrength: asset.scrimStrength, whiteRatio: Number(contrast([255,255,255],background()).toFixed(2)), honeyRatio: Number(contrast([233,169,58],background()).toFixed(2)), method: 'Brightest averaged 8x8 patch of 512px-wide decoded poster; flat blue-950 composite' };
}
const text = `// Generated by scripts/optimize-media.mjs. Edit slot mapping and focal points there, then rerun.\nexport type MediaAsset = {kind: 'image' | 'video' | 'placeholder';src:string;srcset:{width:number;avif:string;webp:string}[];sources:{src:string;type:string;width:number;height:number;bytes:number;mobile:boolean}[];poster:string;blurDataURL:string;focal:{x:number;y:number};alt:string;credit:string;stock:boolean;width:number;height:number;scrimStrength?:number};\nconst base = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '').replace(/\\/$/, '');\nconst url = (src:string) => {const encoded=src.split('/').map(encodeURIComponent).join('/');return src.startsWith('/media/') && base ? base + encoded : encoded;};\nconst assets: Record<string,MediaAsset> = ${JSON.stringify(assets, null, 2)};\nfunction resolve(asset:MediaAsset):MediaAsset{return {...asset,src:url(asset.src),poster:url(asset.poster),srcset:asset.srcset.map(v=>({...v,avif:url(v.avif),webp:url(v.webp)})),sources:asset.sources.map(v=>({...v,src:url(v.src)}))};}\nconst slots:Record<string,string> = ${JSON.stringify(slots, null, 2)};\nexport const placeholderMedia:MediaAsset = ${JSON.stringify(placeholder)};\nexport const media:Record<string,MediaAsset> = Object.fromEntries(Object.entries(slots).map(([slot,key])=>[slot,resolve(assets[key])]));\nfor(const slot of ${JSON.stringify(missing)})media[slot]=placeholderMedia;\nexport const heroMedia = [media['hero-1'],media['hero-2'],media['hero-3']];\n`;
await fs.writeFile(path.join(root, "src/content/media.ts"), text + `export const mediaCollections:Record<string,string[]> = ${JSON.stringify(collections,null,2)};\n`);
const outputs = [];
for (const dir of ["images", "videos"])
  for (const file of (await fs.readdir(path.join(output, dir))).sort()) {
    const bytes = (await fs.stat(path.join(output, dir, file))).size;
    outputs.push({ file: `${dir}/${file}`, bytes });
  }
const report = {
  originals: inventory,
  slots,
  collections,
  bannerContrast,
  needImage: missing,
  outputs,
  totalBytes: outputs.reduce((n, x) => n + x.bytes, 0),
  videoBytes: outputs
    .filter((x) => x.file.startsWith("videos/"))
    .reduce((n, x) => n + x.bytes, 0),
};
await fs.writeFile(
  path.join(root, "MEDIA_INVENTORY.json"),
  JSON.stringify(report, null, 2) + "\n",
);
await fs.writeFile(
  path.join(root, "public/placeholder/CREDITS.md"),
  `# Media provenance\n\nEvery supplied asset is STOCK, not evidence of Dodzel projects. All source URLs, authors and licences remain pending user confirmation.\n\n${inventory.map((i) => `- \`${i.file}\`: ${i.classification}. User supplied; source URL and licence needed.`).join("\n")}\n\nGenerated AVIF/WebP sizes, blur thumbnails, posters and video trims inherit the original credit. Slot mapping: src/content/media.ts. Sizes: MEDIA_INVENTORY.json.\n\nThe scaffolding video shows a residential house, so it is assigned only to a civil illustration slot. Portrait pipe-worker video is reserved for the QHSE story. Piping-yard photos show stacked pipes, not an erected pipe rack.\n`,
);
console.log(
  `Outputs: ${(report.totalBytes / 1e6).toFixed(2)} MB; videos: ${(report.videoBytes / 1e6).toFixed(2)} MB.`,
);
if (report.videoBytes > 25e6)
  console.log(
    "Video budget exceeds 25 MB: use NEXT_PUBLIC_MEDIA_BASE_URL with Vercel Blob or R2.",
  );
