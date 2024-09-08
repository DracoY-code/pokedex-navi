import { notFound } from "next/navigation";
import GenerationTabList from "./components/GenerationTabList";
import PokémonLister from "./components/PokémonLister";
import { Pokémon } from "./lib/interfaces";
import { generatePokémonList } from "./lib/pokémon";

export default async function PokémonListPage({
  params,
}: {
  params: { generation: string };
}) {
  // Get the generation from the URL parameters
  const generation = Number(params.generation);

  // Handle invalid generation values (should be 1-9)
  if (isNaN(generation) || generation < 1 || generation > 9) {
    return notFound();
  }

  // Fetch the Pokémon list for the selected generation
  const pokémonList: Pokémon[] = await generatePokémonList(generation);

  return (
    <main>
      <GenerationTabList params={{ generation: generation }} />
      <PokémonLister params={{ pokémonList: pokémonList }} />
    </main>
  );
}
