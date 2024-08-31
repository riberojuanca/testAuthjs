import FormLogin from "@/components/FormLogin";
import React from "react";

function Login({ searchParams }: { searchParams: { verified: string } }) {
  const isVerified = searchParams.verified === "true";

  return <FormLogin isVerified={isVerified} />;
}

export default Login;
