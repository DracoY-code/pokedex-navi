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
