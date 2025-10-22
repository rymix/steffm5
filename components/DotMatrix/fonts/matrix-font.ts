import type { FontDefinition } from "../types";

// 5x7 dot matrix font - classic pinball style
export const MATRIX_FONT_5x7: FontDefinition = {
  name: "Matrix5x7",
  charWidth: 5,
  charHeight: 7,
  spacing: 1,
  characters: {
    A: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
    ],
    B: [
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, false],
    ],
    C: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    D: [
      [true, true, true, false, false],
      [true, false, false, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, true, false],
      [true, true, true, false, false],
    ],
    E: [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
    ],
    F: [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
    ],
    G: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, false],
      [true, false, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    H: [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
    ],
    I: [
      [false, true, true, true, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, true, true, true, false],
    ],
    J: [
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    K: [
      [true, false, false, false, true],
      [true, false, false, true, false],
      [true, false, true, false, false],
      [true, true, false, false, false],
      [true, false, true, false, false],
      [true, false, false, true, false],
      [true, false, false, false, true],
    ],
    L: [
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
    ],
    M: [
      [true, false, false, false, true],
      [true, true, false, true, true],
      [true, false, true, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
    ],
    N: [
      [true, false, false, false, true],
      [true, true, false, false, true],
      [true, false, true, false, true],
      [true, false, false, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
    ],
    O: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    P: [
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
    ],
    Q: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, true, false, true],
      [true, false, false, true, false],
      [false, true, true, false, true],
    ],
    R: [
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, false],
      [true, false, true, false, false],
      [true, false, false, true, false],
      [true, false, false, false, true],
    ],
    S: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    T: [
      [true, true, true, true, true],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
    ],
    U: [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    V: [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, false, true, false],
      [false, true, false, true, false],
      [false, false, true, false, false],
    ],
    W: [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, true, false, true],
      [true, false, true, false, true],
      [true, true, false, true, true],
      [true, false, false, false, true],
    ],
    X: [
      [true, false, false, false, true],
      [false, true, false, true, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, true, false, true, false],
      [true, false, false, false, true],
    ],
    Y: [
      [true, false, false, false, true],
      [false, true, false, true, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
    ],
    Z: [
      [true, true, true, true, true],
      [false, false, false, true, false],
      [false, false, true, false, false],
      [false, true, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
    ],
    " ": [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    "0": [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, true, true],
      [true, false, true, false, true],
      [true, true, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    "1": [
      [false, false, true, false, false],
      [false, true, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, true, true, true, false],
    ],
    "2": [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [false, false, false, false, true],
      [false, false, true, true, false],
      [false, true, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
    ],
    "3": [
      [true, true, true, true, true],
      [false, false, false, true, false],
      [false, false, true, false, false],
      [false, false, true, true, false],
      [false, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    "4": [
      [false, false, false, true, false],
      [false, false, true, true, false],
      [false, true, false, true, false],
      [true, false, false, true, false],
      [true, true, true, true, true],
      [false, false, false, true, false],
      [false, false, false, true, false],
    ],
    "5": [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, true, true, true, false],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    "6": [
      [false, false, true, true, false],
      [false, true, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    "7": [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, true, false],
      [false, false, true, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
    ],
    "8": [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
    ],
    "9": [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, true, false],
      [false, true, true, false, false],
    ],
    ":": [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    "♪": [
      [false, false, false, true, true],
      [false, false, false, true, false],
      [false, false, false, true, false],
      [false, true, false, true, false],
      [true, true, true, true, false],
      [true, true, false, false, false],
      [false, false, false, false, false],
    ],
    "♫": [
      [false, false, true, true, true],
      [false, false, true, false, true],
      [false, false, true, false, true],
      [true, false, true, false, true],
      [true, true, true, true, true],
      [true, true, false, true, true],
      [false, false, false, false, false],
    ],
    "-": [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, true, true, true, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    ".": [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
  },
};

export function getCharacterBitmap(
  char: string,
  font: FontDefinition = MATRIX_FONT_5x7,
): boolean[][] {
  const upperChar = char.toUpperCase();
  return font.characters[upperChar] || font.characters[" "];
}

export function textToBitmap(
  text: string,
  font: FontDefinition = MATRIX_FONT_5x7,
): boolean[][] {
  const chars = text.split("");
  const bitmaps = chars.map((char) => getCharacterBitmap(char, font));

  if (bitmaps.length === 0) return [];

  const charHeight = font.charHeight;
  const totalWidth = bitmaps.reduce((width, bitmap, index) => {
    return (
      width + font.charWidth + (index < bitmaps.length - 1 ? font.spacing : 0)
    );
  }, 0);

  const result: boolean[][] = Array(charHeight)
    .fill(null)
    .map(() => Array(totalWidth).fill(false));

  let xOffset = 0;
  bitmaps.forEach((bitmap, charIndex) => {
    for (let row = 0; row < charHeight; row++) {
      for (let col = 0; col < font.charWidth; col++) {
        if (bitmap[row] && bitmap[row][col]) {
          result[row][xOffset + col] = true;
        }
      }
    }
    xOffset += font.charWidth;
    if (charIndex < bitmaps.length - 1) {
      xOffset += font.spacing;
    }
  });

  return result;
}
