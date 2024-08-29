"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

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

        <button className="bg-blue-200 p-2 rounded-sm uppercase font-semibold mt-2">
          Login
        </button>
        {/* {error && (
        <span className="relative bg-red-800 text-sm rounded-sm text-white p-2">
          {error}
        </span>
      )} */}
      </form>
    </section>
  );
};

export default FormLogin;
