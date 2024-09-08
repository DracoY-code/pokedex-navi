// Function to change the string to title case
export function toTitleCase(str: string, separator: string = " "): string {
  return str
    .toLowerCase()
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Function to convert a number to its Roman numeral representation.
 * @param n The number of the Pokémon generation (1-9).
 * @returns The Roman numeral representation as a string.
 */
export function toRomanNumeral(n: number): string {
  const numberToRomanMapper: Record<number, string> = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
  };
  return numberToRomanMapper[n];
}
