interface PokéAPIResults {
  results: { url: string }[];
}

interface Pokémon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokémonAbility[];
  sprites: PokémonSprites;
  cries: PokémonCries;
  stats: PokémonBaseStats[];
  types: PokémonType[];
}

interface PokémonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokémonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    home: {
      front_default: string;
      front_shiny: string;
    };
    officialArtwork: {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      front_default: string;
      front_shiny: string;
    };
  };
}

interface PokémonCries {
  latest: string;
  legacy: string;
}

interface PokémonBaseStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokémonType {
  type: {
    name: string;
  };
}

// Expose these interfaces as types to the application
export type {
  PokéAPIResults,
  Pokémon,
  PokémonAbility,
  PokémonCries,
  PokémonBaseStats,
  PokémonSprites,
  PokémonType,
};
