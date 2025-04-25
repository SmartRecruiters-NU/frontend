"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import mockUsers from "@/mock/mock-users.json";

const schema = yup.object({
  login: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
});

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    const user = mockUsers.find((u) => u.email === data.login);

    if (!user || user.password !== data.password) {
      setError("login", {
        type: "manual",
        message: "Неверный логин или пароль",
      });
      setError("password", {
        type: "manual",
        message: "Неверный логин или пароль",
      });
      return;
    }

    dispatch(
      login({ email: user.email, token: "mock-token", role: user.role })
    );

    document.cookie = `token=mock-token; path=/`;
    document.cookie = `role=${user.role}; path=/`;

    const redirectTo = "/vacancies";
    router.push(redirectTo);
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-md max-w-full px-2 py-6 mx-auto min-w-sm">
      <div className="px-6 mb-6">
        <div className=" text-5xl mb-6 text-center">👤</div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Добро пожаловать
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Войдите в учётную запись
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full px-4"
      >
        <div className="flex flex-col">
          <label className=" font-medium mb-2">Логин</label>
          <input
            {...register("login")}
            className="w-full mb-2 p-2 border rounded-md border-gray-300"
          />
          {errors.login && (
            <p className="text-red-500 text-sm mb-2">{errors.login.message}</p>
          )}
        </div>

        <div>
          <label className=" font-medium mb-2">Пароль</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mb-2 p-2 border rounded-md border-gray-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-center text-sm font-medium mb-4">
          <button
            type="button"
            className="mt-1 cursor-pointer"
            onClick={() => router.push("/setup-password")}
          >
            Забыли пароль?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Авторизоваться
        </button>
      </form>
    </div>
  );
}
