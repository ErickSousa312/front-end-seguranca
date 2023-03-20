import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CustomRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/views/privateArea2ss");
  });

  return <div>Redirecionando...</div>;
}
