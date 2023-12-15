import zod from "zod";
export const userSchema = zod.object({
  uuid: zod.string().uuid(),
  email: zod.string().email({ message: "Неправильно указана почта" }),
});
export const userDataSchema = userSchema
  .omit({ uuid: true })
  .extend({ phone: zod.string().optional(), city: zod.string().optional() });
const confirmPasswordSchema = zod.object({
  password: zod.string().min(4, { message: "Пароль должен состоять минимум из 4 символов" }),
  confirmPassword: zod.string().min(4, { message: "Пароль должен состоять минимум из 4 символов" }),
});
export const userDataCardSchema = userDataSchema.extend({
  createdAt: zod.date(),
});
export const setPasswordSchema = confirmPasswordSchema.extend({
  uuid: zod.string().uuid(),
  originalPassword: zod.string().min(4),
});
export const signUpSchema = userSchema
  .omit({ uuid: true })
  .merge(confirmPasswordSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
  });
export const signInSchema = zod.object({
  email: zod.string().email({ message: "Неправильно указана почта" }),
  password: zod.string().min(4, { message: "Пароль должен состоять минимум из 4 символов" }),
});
