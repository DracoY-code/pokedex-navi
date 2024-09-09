"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GenerationTabList from "./components/GenerationTabList";
import { validateGeneration } from "./lib/utils";

export default function Loading() {
  const [activeGeneration, setActiveGeneration] = useState(1);
  const pathname = usePathname();

  useEffect(() => {
    // Extract the generation number from the URL
    const pathSegments = pathname.split("/");
    setActiveGeneration(validateGeneration(pathSegments[2]));
  }, [pathname]);

  return (
    <>
      <GenerationTabList params={{ generation: activeGeneration }} />
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </>
  );
}
