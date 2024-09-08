"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRef } from "react";
import { PokémonCries } from "../lib/interfaces";

export default function PokémonCryPlayer({
  params,
}: {
  params: { cries: PokémonCries; name: string };
}) {
  // Create a mutable audio reference
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to play the audio file
  // referenced by the audio element
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.src = params.cries.latest;
      audioRef.current.play();
    }
  };

  return (
    <>
      <button
        onClick={playAudio}
        className="md:tooltip md:tooltip-bottom"
        data-tip="Press to hear the cry!"
        aria-label={`Play the cry of ${params.name}`}
      >
        <PlayArrowIcon />
      </button>
      <audio ref={audioRef} className="hidden"></audio>
    </>
  );
}
