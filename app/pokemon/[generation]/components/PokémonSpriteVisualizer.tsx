"use client";

import Image from "next/image";
import { useState } from "react";

export default function PokémonSpriteVisualizer({
  params,
}: {
  params: { default: string; shiny: string; alt: string };
}) {
  const [isShiny, setIsShiny] = useState(false);

  const handleToggle = () => {
    setIsShiny((prevState) => !prevState);
  };

  return (
    <>
      <div
        className="md:tooltip md:tooltip-bottom"
        data-tip={
          isShiny ? "Press to change it back!" : "Press to make it shiny!"
        }
      >
        <Image
          src={isShiny ? params.shiny : params.default}
          alt={params.alt}
          onClick={handleToggle}
          aria-label={`Front Sprite of ${params.alt}`}
          width={100}
          height={100}
          quality={100}
          priority={true}
          className="cursor-pointer"
        ></Image>
      </div>
    </>
  );
}
