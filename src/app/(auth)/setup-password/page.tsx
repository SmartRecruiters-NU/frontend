"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
  password: yup.string().required("Введите пароль"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

export default function SetupPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => router.push("/register-info");

  return (
    <div className="bg-white text-black rounded-2xl shadow-md max-w-full px-8 py-8 mx-auto min-w-sm">
      <div className="flex  mb-6 flex-col items-start">
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Придумайте пароль
        </h2>
        <p className=" text-gray-500 text-center">Придумайте пароль для себя</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full "
      >
        <div className="flex flex-col">
          <label className="font-medium mb-1">Пароль</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mb-2 p-2 border rounded-md border-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Повторите пароль</label>
          <input
            type="password"
            {...register("confirm")}
            className="w-full mb-2 p-2 border rounded-md border-gray-300"
          />
          {errors.confirm && (
            <p className="text-red-500 text-sm mb-2">
              {errors.confirm.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md cursor-pointer"
          >
            Подтвердить
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full border border-gray-300 py-2 rounded-md cursor-pointer"
          >
            Назад
          </button>
        </div>
      </form>
    </div>
  );
}
