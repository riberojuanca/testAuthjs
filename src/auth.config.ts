import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { sendEmailVerification } from "./lib/mail";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!userFound) throw new Error("User not found");
        console.log(userFound);

        const matchPassword = await bcrypt.compare(
          credentials.password as string,
          userFound.password as string
        );

        if (!matchPassword) throw new Error("Wrong password");

        //Verificación de email
        if (!userFound.emailVerified) {
          const verifyTokenExits = await prisma.verificationToken.findFirst({
            where: {
              identifier: userFound.email,
            },
          });

          //Si existe un token lo eliminamos
          if (verifyTokenExits?.identifier) {
            await prisma.verificationToken.delete({
              where: {
                identifier_token: {
                  identifier: userFound.email,
                  token: verifyTokenExits.token,
                },
              },
            });
          }

          const token = nanoid();

          await prisma.verificationToken.create({
            data: {
              identifier: userFound.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          });

          //Enviar email de verificación
          const response = sendEmailVerification(userFound.email, token);

          throw new Error("Please, check email send verification");
        }

        return userFound;
      },
    }),
  ],
} satisfies NextAuthConfig;
