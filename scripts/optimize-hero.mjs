import fs from "node:fs/promises";
import sharp from "sharp";

const directory = new URL("../public/assets/images/", import.meta.url);
let originalBytes = 0;
let optimizedBytes = 0;
for (let index = 1; index <= 7; index++) {
  const source = new URL(`slider-${index}.jpeg`, directory);
  const destination = new URL(`slider-${index}.webp`, directory);
  const result = await sharp(await fs.readFile(source)).rotate().webp({ quality: 78, effort: 5 }).toBuffer();
  await fs.writeFile(destination, result);
  originalBytes += (await fs.stat(source)).size;
  optimizedBytes += result.length;
}
console.log(`Hero images: ${originalBytes} → ${optimizedBytes} bytes (${Math.round((1 - optimizedBytes / originalBytes) * 100)}% smaller).`);
