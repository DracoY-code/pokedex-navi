import Link from "next/link";
import { toRomanNumeral } from "../lib/utils";

export default function GenerationTabList({
  params,
}: {
  params: { generation: number };
}) {
  return (
    <>
      <div
        role="tablist"
        className={`tabs tabs-bordered text-nowrap lg:w-full
          sm:overflow-x-auto bg-gray-300 dark:bg-gray-700
          dark:text-white sticky top-0 z-20`}
        style={{
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {Array.from({ length: 9 }, (_, index) => (
          <Link
            role="tab"
            key={index}
            href={`/pokemon/${index + 1}`}
            className={`tab ${
              index + 1 === params.generation ? "tab-active" : ""
            }`}
            aria-label={`Tab for Generation ${index + 1}`}
          >
            Generation {toRomanNumeral(index + 1)}
          </Link>
        ))}
      </div>
    </>
  );
}
