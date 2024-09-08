import { notFound } from "next/navigation";
import { PokéAPIResults, Pokémon, PokémonAbility } from "../lib/interfaces";

// Set the base API path and expose it to the application
export const API_URL = "https://pokeapi.co/api/v2";

// Function to fetch the list of Pokémon
export async function fetchPokémonList(
  limit: number,
  offset: number = 0
): Promise<PokéAPIResults> {
  try {
    const response = await fetch(
      `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: PokéAPI fetch failed`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

// Function to fetch details about the Pokémon
export async function fetchPokémonDetails(id: number): Promise<Pokémon> {
  try {
    const response = await fetch(`${API_URL}/pokemon/${id}`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: PokéAPI fetch failed`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

// Function to generate the list with Pokémon details for the selected generation
export async function generatePokémonList(
  generation: number = 1
): Promise<Pokémon[]> {
  // Mapping for the number of Pokémon in each generation
  const generationalMapping: Record<number, { limit: number; offset: number }> =
    {
      1: { limit: 151, offset: 0 },
      2: { limit: 100, offset: 151 },
      3: { limit: 135, offset: 251 },
      4: { limit: 107, offset: 386 },
      5: { limit: 156, offset: 493 },
      6: { limit: 72, offset: 649 },
      7: { limit: 88, offset: 721 },
      8: { limit: 96, offset: 809 },
      9: { limit: 120, offset: 905 },
    };

  // Fetch the list of Pokémon for the selected generation
  const listResponse = await fetchPokémonList(
    generationalMapping[generation].limit,
    generationalMapping[generation].offset
  );

  return Promise.all(
    // Fetch the details for each Pokémon in that generation
    listResponse.results.map(async (result) => {
      // Extracting the ID from the URL
      const urlPaths = result.url.split("/");
      const id = Number(urlPaths[urlPaths.length - 2]);

      // Handle invalid ID
      if (isNaN(id)) {
        console.error(`Pokémon ID (${id}) not found`);
        return notFound();
      }

      // Fetch the Pokémon details with the ID
      return fetchPokémonDetails(id);
    })
  );
}

// Function to fetch details for the Pokémon abilities
export async function fetchPokémonAbilities(
  id: number
): Promise<PokémonAbility> {
  try {
    const response = await fetch(`${API_URL}/ability/${id}`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: PokéAPI fetch failed`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
