import { countryPaths } from "./country-paths";

export type MapPoint = { x: number; y: number };
export type MapView = MapPoint & { width: number; height: number };

// Same equirectangular projection and confirmed Lahore coordinate as the old map.
export const LAHORE = { x: (74.3587 - 32) * 20, y: (39 - 31.5204) * 20 };
export const REGION_VIEW: MapView = { x: 15, y: -30, width: 925, height: 535 };

// Label offsets are CSS pixels from the country marker, independent of SVG zoom.
// Arc control points use the original Natural Earth projection units.
export const PRESENCE_MAP_LAYOUT: Record<string, {
  label: MapPoint;
  mobileLabel: MapPoint;
  arcControl: MapPoint;
}> = {
  Pakistan: { label: { x: -146, y: -57 }, mobileLabel: { x: -142, y: -54 }, arcControl: LAHORE },
  Qatar: { label: { x: 32, y: 25 }, mobileLabel: { x: 16, y: 34 }, arcControl: { x: 610, y: 35 } },
  "Saudi Arabia": { label: { x: -85, y: 25 }, mobileLabel: { x: -72, y: 29 }, arcControl: { x: 510, y: -5 } },
  Iraq: { label: { x: -42, y: -53 }, mobileLabel: { x: -36, y: -50 }, arcControl: { x: 500, y: -75 } },
};

// The existing geometry uses only M/L/Z. Use the largest ring, excluding islands.
export function countryGeometry(path: string) {
  const rings = path.split(/Z/i).map((ring) =>
    [...ring.matchAll(/([\d.-]+),([\d.-]+)/g)].map((match) => ({ x: Number(match[1]), y: Number(match[2]) })),
  ).filter((ring) => ring.length > 2);
  const all = rings.flat();
  const minX = Math.min(...all.map((point) => point.x));
  const minY = Math.min(...all.map((point) => point.y));
  const maxX = Math.max(...all.map((point) => point.x));
  const maxY = Math.max(...all.map((point) => point.y));
  const polygons = rings.map((ring) => {
    let area = 0, x = 0, y = 0;
    ring.forEach((point, index) => {
      const next = ring[(index + 1) % ring.length];
      const cross = point.x * next.y - next.x * point.y;
      area += cross;
      x += (point.x + next.x) * cross;
      y += (point.y + next.y) * cross;
    });
    return { area: Math.abs(area), point: { x: x / (3 * area), y: y / (3 * area) } };
  }).sort((a, b) => b.area - a.area);
  return { centroid: polygons[0].point, bounds: { x: minX, y: minY, width: maxX - minX, height: maxY - minY } };
}

export const mapCountries = countryPaths.map((country) => {
  const geometry = countryGeometry(country.path);
  return {
    ...country,
    ...geometry,
    marker: country.name === "Pakistan" ? LAHORE : geometry.centroid,
  };
});

export function connectionPath(country: typeof mapCountries[number]) {
  const control = PRESENCE_MAP_LAYOUT[country.name]?.arcControl ?? {
    x: (LAHORE.x + country.marker.x) / 2,
    y: Math.min(LAHORE.y, country.marker.y) - 120,
  };
  return `M${LAHORE.x},${LAHORE.y} Q${control.x},${control.y} ${country.marker.x},${country.marker.y}`;
}

export function countryView(bounds: MapView, aspect: number): MapView {
  let width = Math.max(bounds.width + 130, 360);
  let height = Math.max(bounds.height + 180, 300);
  if (width / height < aspect) width = height * aspect;
  else height = width / aspect;
  return { x: bounds.x + bounds.width / 2 - width / 2, y: bounds.y - 40, width, height };
}
