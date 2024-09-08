import { redirect } from "next/navigation";

export default function Home() {
  // Redirect from / to /pokemon/1
  redirect("/pokemon/1");
}
