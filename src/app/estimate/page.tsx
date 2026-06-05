import { redirect } from "next/navigation";

export default function EstimatePage() {
  redirect("/start?step=scope");
}
