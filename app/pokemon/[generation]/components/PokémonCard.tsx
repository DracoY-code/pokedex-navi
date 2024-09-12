import { Pokémon } from "../lib/interfaces";
import {
  applyStatColor,
  formatHeight,
  formatId,
  formatWeight,
  toTitleCase,
} from "../lib/utils";
import PokémonCryPlayer from "./PokémonCryPlayer";
import PokémonSpriteVisualizer from "./PokémonSpriteVisualizer";
import PokémonTypeBadges from "./PokémonTypeBadges";

export default function PokémonCard({
  params,
}: {
  params: { pokémon: Pokémon };
}) {
  return (
    <>
      <div
        key={params.pokémon.id}
        className="card card-compact bg-base-100 shadow-xl p-4"
      >
        <div className="flex items-center justify-between">
          {/* Pokémon Sprite */}
          <div className="w-1/3 flex items-center justify-center">
            <PokémonSpriteVisualizer
              params={{
                default: params.pokémon.sprites.front_default,
                shiny: params.pokémon.sprites.front_shiny,
                alt: toTitleCase(params.pokémon.name, "-"),
                width: 200,
                height: 200,
              }}
            />
          </div>
          <div className="w-2/3 flex flex-col pl-4">
            {/* Pokémon ID */}
            <div className="flex justify-end">
              <span className="text-right text-sm pr-4">
                {formatId(params.pokémon.id)}
              </span>
            </div>

            {/* Pokémon Name */}
            <div className="mt-1 ml-1">
              <h2 className="card-title text-lg">
                {toTitleCase(params.pokémon.name, "-")}
              </h2>
            </div>

            {/* Pokémon Types */}
            <div className="mt-1 ml-1">
              <PokémonTypeBadges params={{ types: params.pokémon.types }} />
            </div>
          </div>
        </div>

        <div className="card-body text-sm flex flex-col flex-grow">
          {/* Pokémon Information */}
          <div className="flex flex-col space-y-1 justify-start mt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Height:</span>
              {formatHeight(params.pokémon.height)}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold">Weight:</span>
              {formatWeight(params.pokémon.weight)}
            </div>

            {/* Pokémon Stats */}
            <div className="flex flex-col pt-2">
              {params.pokémon.stats.map((stat) => (
                <div
                  key={params.pokémon.id}
                  className="flex items-center justify-between mt-2 ${}"
                >
                  <span className="font-semibold">
                    {toTitleCase(stat.stat.name, "-")}:
                  </span>
                  <span className={`${applyStatColor(stat.base_stat)}`}>
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold">Base Stat Total (BST):</span>
              {params.pokémon.stats
                .map((stat) => stat.base_stat)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )}
            </div>
          </div>

          {/* Play Cry Button */}
          <div className="card-actions justify-end mt-4">
            <PokémonCryPlayer
              params={{
                cries: params.pokémon.cries,
                name: params.pokémon.name,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
