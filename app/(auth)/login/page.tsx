import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export default function login() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )

}