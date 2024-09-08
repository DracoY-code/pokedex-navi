import { Pokémon } from "../lib/interfaces";
import { toTitleCase } from "../lib/utils";
import PokémonAbilityLister from "./PokémonAbilityLister";
import PokémonCryPlayer from "./PokémonCryPlayer";
import PokémonSpriteVisualizer from "./PokémonSpriteVisualizer";
import PokémonTypeBadges from "./PokémonTypeBadges";

export default function PokémonLister({
  params,
}: {
  params: { pokémonList: Pokémon[] };
}) {
  return (
    <>
      <div>
        <table className="table text-center w-full">
          <thead
            className={`drop-shadow-md dark:text-white
              bg-gray-200 dark:bg-gray-600 sticky top-8 z-10`}
          >
            <tr>
              <th>Index</th>
              <th>Sprite</th>
              <th>Name</th>
              <th>Types</th>
              <th>Abilities</th>
              <th>Cries</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Base Stat Total (BST)</th>
            </tr>
          </thead>
          <tbody>
            {params.pokémonList.map((pokémon) => (
              <tr key={pokémon.id}>
                <td>#{pokémon.id.toString().padStart(4, "0")}</td>
                <td>
                  <PokémonSpriteVisualizer
                    params={{
                      default: pokémon.sprites.front_default,
                      shiny: pokémon.sprites.front_shiny,
                      alt: toTitleCase(pokémon.name, "-"),
                    }}
                  />
                </td>
                <td>{toTitleCase(pokémon.name, "-")}</td>
                <td>
                  <PokémonTypeBadges params={{ types: pokémon.types }} />
                </td>
                <td>
                  <PokémonAbilityLister
                    params={{ abilities: pokémon.abilities }}
                  />
                </td>
                <td>
                  <PokémonCryPlayer
                    params={{ cries: pokémon.cries, name: pokémon.name }}
                  />
                </td>
                <td>{pokémon.height / 10} m</td>
                <td>{pokémon.weight / 10} kg</td>
                <td>
                  {pokémon.stats
                    .map((stat) => stat.base_stat)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
