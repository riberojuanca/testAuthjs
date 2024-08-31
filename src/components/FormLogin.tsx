"use client";
import { loginAction, LoginResponse } from "@/actions/auth-actions";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Inputs } from "./FormRegister";

const FormLogin = ({ isVerified }: { isVerified: boolean }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    setError(null);
    startTransition(async () => {
      const response: LoginResponse = await loginAction(data);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    });
  }

  return (
    <section>
      <h1>LoginPage</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-2 min-w-72 w-1/6"
      >
        <h1 className="text-xl font-bold uppercase">Login 🔐</h1>

        <label htmlFor="email" className="text-gray-500">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
        />
        {errors.email && (
          <span className="w-full flex justify-end text-xs text-red-600">
            {errors.email.message}
          </span>
        )}

        <label htmlFor="password" className="text-gray-500">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password && (
          <span className="w-full flex justify-end text-xs text-red-600">
            {errors.password.message}
          </span>
        )}

        <button
          disabled={isPending}
          className="bg-blue-200 p-2 rounded-sm uppercase font-semibold mt-2"
        >
          Login
        </button>
        {error && (
          <span className="relative bg-red-800 text-sm rounded-sm text-white p-2">
            {error}
          </span>
        )}
        {isVerified && (
          <span className="relative bg-green-800 text-sm rounded-sm text-white p-2">
            Your email now is verified!
          </span>
        )}
      </form>
    </section>
  );
};

export default FormLogin;
