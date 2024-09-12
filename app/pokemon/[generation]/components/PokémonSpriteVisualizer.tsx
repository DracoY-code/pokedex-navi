"use client";

import { useState } from "react";

interface PokémonSpriteProps {
  default: string;
  shiny: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function PokémonSpriteVisualizer({
  params,
}: {
  params: PokémonSpriteProps;
}) {
  const [isShiny, setIsShiny] = useState<boolean>(false);

  const handleToggle = () => {
    setIsShiny((prevState) => !prevState);
  };

  return (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <figure>
        <img
          src={isShiny ? params.shiny : params.default}
          alt={params.alt}
          onClick={handleToggle}
          aria-label={`Front Sprite of ${params.alt}`}
          width={params.width ?? 100}
          height={params.height ?? 100}
          className="cursor-pointer"
        ></img>
      </figure>
    </>
  );
}
