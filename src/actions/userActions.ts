"use server";
import { cookies } from "next/headers";
import prisma from "../../db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import zod from "zod";
import { signInSchema, signUpSchema } from "./userSchemas";

export const verifyToken = async () => {
  const secret = process.env.SECRET!;
  const token = cookies().get("token")?.value;
  if (token) {
    try {
      const uuid = jwt.verify(token, secret) as string;

      if (uuid) {
        const foundUser = await prisma.user.findFirst({
          where: {
            uuid: uuid,
          },
        });
        if (foundUser !== null) return uuid;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return false;
};

export const fetchUser = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const user = await prisma.user.findFirst({
      where: {
        uuid,
      },
    });
    if (user) {
      return true;
    }
  }
  return false;
};

export const createUser = async (userData: zod.infer<typeof signUpSchema>) => {
  const validateUser = signUpSchema.safeParse(userData);
  if (validateUser.success) {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: validateUser.data.email,
      },
    });
    if (!foundUser)
      try {
        const hash = (await argon2.hash(validateUser.data.password)) as string;
        const { confirmPassword, ...pushUser } = validateUser.data;
        const createdUser = await prisma.user.create({
          data: {
            ...pushUser,
            password: hash,
          },
          select: {
            uuid: true,
            email: true,
          },
        });
        const secret = process.env.SECRET!;
        const token = jwt.sign(createdUser.uuid, secret);
        Object.keys(createdUser).forEach((key) => {
          cookies().set(key, createdUser[key as keyof typeof createdUser]);
        });

        cookies().set("token", token, {
          sameSite: "strict",
        });
        return createdUser;
      } catch (err) {
        console.log(err);
      }
    else return "К почте существует уже привязанный аккаунт";
  } else return validateUser.error.issues[0].message;
};

export const signUser = async (userData: zod.infer<typeof signInSchema>) => {
  const validate = signInSchema.safeParse(userData);
  if (validate.success) {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (foundUser !== null && (await argon2.verify(foundUser.password, userData.password))) {
      const { password, createdAt, ...returnUser } = foundUser;
      const secret = process.env.SECRET!;
      const token = jwt.sign(returnUser.uuid, secret);
      cookies().set("token", token, { sameSite: "strict" });
      return returnUser;
    } else return "Неправильный пароль. Попробуйте еще раз.";
  } else return validate.error.issues[0].message;
};
export const signUserOut = () => {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
};
