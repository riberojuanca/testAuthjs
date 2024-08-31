"use client";

import { registerAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormRegister = () => {
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
      const response = await registerAction(data);
      console.log(response);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/login");
      }
    });
  }

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-2 min-w-72 w-1/6"
      >
        <h1 className="text-xl font-bold uppercase">Register</h1>
        <label htmlFor="name" className="text-gray-500">
          Name
        </label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
        />
        {errors.name && (
          <span className="w-full flex justify-end text-xs text-red-600">
            {errors.name.message}
          </span>
        )}

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

        <label htmlFor="confirmPassword" className="text-gray-500">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Please, need confirm password",
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="w-full flex justify-end text-xs text-red-600">
            {errors.confirmPassword.message}
          </span>
        )}
        <button className="bg-blue-200 p-2 rounded-sm uppercase font-semibold mt-2">
          Register
        </button>
        {error && <span>{error}</span>}
      </form>
    </section>
  );
};

export default FormRegister;
