"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <section>
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-2 min-w-72 w-1/6"
      >
        <h1 className="text-xl font-bold uppercase">Register</h1>
        <label htmlFor="username" className="text-gray-500">
          Username
        </label>
        <input
          type="text"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        {errors.username && (
          <span className="w-full flex justify-end text-xs text-red-600">
            {errors.username.message}
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
      </form>
    </section>
  );
};

export default FormRegister;
