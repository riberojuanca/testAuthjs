"use server";

import { signIn } from "@/auth";
import { Inputs } from "@/components/FormRegister";
import { prisma } from "@/prisma";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { Router } from "lucide-react";
import { useRouter } from "next/router";

export interface LoginResponse {
  success?: boolean;
  error?: string;
}

export const loginAction = async (data: Inputs): Promise<LoginResponse> => {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export interface RegisterResponse {
  success?: boolean;
  error?: string;
}

export const registerAction = async (data: Inputs) => {
  if (!data) {
    return {
      error: "Invalid data",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      return {
        error: "Email already exists",
      };
    }

    //Hash del password
    const passwordHash = await bcrypt.hash(data.password, 10);

    const matchPassword = await bcrypt.compare(
      data.confirmPassword,
      passwordHash
    );

    if (!matchPassword) {
      return {
        error: "Passwords do not match",
      };
    }

    //Crear el usuario
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passwordHash,
      },
    });

    return { succes: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};
