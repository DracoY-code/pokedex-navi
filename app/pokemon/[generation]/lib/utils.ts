import { notFound } from "next/navigation";

// Function to change the string to title case
export function toTitleCase(str: string, separator: string = " "): string {
  return str
    .toLowerCase()
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Function to format the id to "#----"
export function formatId(id: number): string {
  return `#${id.toString().padStart(4, "0")}`;
}

// Function to format the height values
export function formatHeight(height: number): string {
  return `${height / 10} m`;
}

// Function to format the weight values
export function formatWeight(weight: number): string {
  return `${weight / 10} kg`;
}

// Function to apply the color to the stat based on thresholds:
// - Red (0 - 60)
// - Blue (61 - 100)
// - Green (101 and above)
export function applyStatColor(stat: number): string {
  return stat <= 60
    ? "text-red-600"
    : stat <= 100
    ? "text-blue-600"
    : "text-green-600";
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

// Function to validate the generation string from the URL
export function validateGeneration(generationIndex: string): number {
  // Get the generation from the URL parameters
  const generation = Number(generationIndex);

  // Handle invalid generation values (should be 1-9)
  if (isNaN(generation) || generation < 1 || generation > 9) {
    return notFound();
  }

  return generation;
}
