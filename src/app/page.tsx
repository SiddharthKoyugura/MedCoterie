import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <div className="">Hello world</div>
    </HydrateClient>
  );
}
