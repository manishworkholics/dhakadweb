import { getSeo } from "@/lib/getSeo";
import HomeClient from "./HomeClient";

export async function generateMetadata() {

  return await getSeo("home");

}

export default function Page(){
  return <HomeClient/>
}