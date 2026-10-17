/** Split a plain heading for word reveals and highlight its final word. */
export function getHeadingWords(heading: string) {
  const words = heading.match(/\S+/g) ?? [];
  return words.map((text, index) => ({
    text,
    highlighted: index === words.length - 1,
  }));
}
