import { PokémonAbility } from "../lib/interfaces";
import { toTitleCase } from "../lib/utils";

// Function to add a notifier to hidden abilities
function addHiddenAbilityTag(
  abilityName: string,
  isHidden: boolean
): JSX.Element {
  return isHidden ? (
    <span
      className="underline tooltip tooltip-bottom cursor-pointer"
      data-tip="This is a hidden ability!"
    >
      {abilityName}
    </span>
  ) : (
    <>{abilityName}</>
  );
}

export default function PokémonAbilityLister({
  params,
}: {
  params: { abilities: PokémonAbility[] };
}) {
  return (
    <>
      {params.abilities.map((ability, index) => (
        <span key={index}>
          {addHiddenAbilityTag(
            toTitleCase(ability.ability.name, "-"),
            ability.is_hidden
          )}
          {index < params.abilities.length - 1 && ", "}
        </span>
      ))}
    </>
  );
}
