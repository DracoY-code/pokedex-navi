import { PokémonType } from "../lib/interfaces";
import { toTitleCase } from "../lib/utils";

// Define a colormap for the Pokémon types
const typeColorMap: Record<string, string> = {
  normal: "bg-[#aa9]",
  fire: "bg-[#f42]",
  water: "bg-[#39f]",
  electric: "bg-[#fc3]",
  grass: "bg-[#7c5]",
  ice: "bg-[#6cf]",
  fighting: "bg-[#b54]",
  poison: "bg-[#a59]",
  ground: "bg-[#db5]",
  flying: "bg-[#89f]",
  psychic: "bg-[#f59]",
  bug: "bg-[#ab2]",
  rock: "bg-[#ba5]",
  ghost: "bg-[#66b]",
  dragon: "bg-[#76e]",
  dark: "bg-[#754]",
  steel: "bg-[#aab]",
  fairy: "bg-[#e9e]",
};

// Function to determine the color of the type badge
function getTypeColorClass(type: string): string {
  return typeColorMap[type] || "bg-gray-100 text-black";
}

export default function PokémonTypeBadges({
  params,
}: {
  params: { types: PokémonType[] };
}) {
  return (
    <>
      <div className="flex space-x-1">
        {params.types.map((type, index) => (
          <span
            key={index}
            className={`badge text-xs drop-shadow
            ${getTypeColorClass(type.type.name)}
            transition-opacity duration-300
            opacity-100 hover:opacity-90
            text-white font-medium cursor-pointer`}
          >
            {toTitleCase(type.type.name)}
          </span>
        ))}
      </div>
    </>
  );
}
