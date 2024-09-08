import { redirect } from "next/navigation";

export default function PokémonDefaultListPage() {
  // Redirect from /pokemon to /pokemon/1
  redirect("/pokemon/1");
}
