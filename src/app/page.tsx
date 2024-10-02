// "use client"

import { Suspense, use } from "react";
import User from "./components/user/user";
import { getUser } from "./components/user/actions";

export default function Home() {
  // const user = use(getUser())

  return (
    <div>
      <Suspense fallback={<p>Carregando...</p>}>
        <User />
      </Suspense>
    </div>
  );
}
