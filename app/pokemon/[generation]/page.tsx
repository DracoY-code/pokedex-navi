import { notFound } from "next/navigation";
import NavigationBar from "../../components/NavigationBar";
import { Pokémon } from "./lib/interfaces";
import { fetchPokémonDetails, fetchPokémonList } from "./lib/pokémon";
import { validateGeneration } from "./lib/utils";
import PokémonCard from "./components/PokémonCard";
import LinearFooter from "@/app/components/LinearFooter";

// Function to generate static paths for each generation
export async function generateStaticParams() {
  return Array.from({ length: 9 }, (_, index) => ({
    generation: `${index + 1}`,
  }));
}

export default async function PokémonListPage({
  params,
}: {
  params: { generation: string };
}) {
  // Validate the generation from the URL parameters
  const generation = validateGeneration(params.generation);

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

  const listResponse = await fetchPokémonList(
    generationalMapping[generation].limit,
    generationalMapping[generation].offset
  );

  const pokémonList: Pokémon[] = await Promise.all(
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

  return (
    <main>
      <NavigationBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {pokémonList.map((pokémon) => (
          <PokémonCard key={pokémon.id} params={{ pokémon }} />
        ))}
      </div>
      <LinearFooter />
    </main>
  );
}
