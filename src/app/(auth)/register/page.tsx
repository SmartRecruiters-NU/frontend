"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const schema = yup.object({
  fullName: yup.string().required("Введите ФИО"),
  position: yup.string().required("Введите должность"),
  phone: yup.string().required("Введите номер телефона"),
  email: yup.string().email("Неверный email").required("Введите email"),
  file: yup.mixed().required("Загрузите файл"),
});

export default function RegisterInfoPage() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("Submitted:", data);
    router.push("/dashboard");
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-sm max-w-full p-8 mx-auto">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Заполните данные
        </h2>
        <p className="text-gray-500 text-center">Заполните информацию о себе</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md mx-auto"
      >
        {/* Text inputs */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">ФИО</label>
          <input
            {...register("fullName")}
            className="w-full p-2 border rounded-md border-gray-300"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Должность</label>
          <input
            {...register("position")}
            className="w-full p-2 border rounded-md border-gray-300"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Телефон</label>
          <input
            {...register("phone")}
            className="w-full p-2 border rounded-md border-gray-300"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <Controller
          name="file"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <div className="flex flex-col">
              <label className="font-medium mb-1">Загрузите файл (CV)</label>

              <div
                className={`w-full p-6 border-2 border-dashed rounded-xl text-center transition cursor-pointer ${
                  dragOver ? "border-black bg-gray-100" : "border-gray-300"
                }`}
                onClick={() => document.getElementById("fileInput")?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    onChange(file);
                    setFileName(file.name);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                {fileName ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-800">{fileName}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(null);
                        setFileName(null);
                      }}
                      className="ml-4 text-red-500 text-sm hover:underline cursor-pointer"
                    >
                      Удалить
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <ArrowUpTrayIcon className="w-6 h-6" />
                    <span>Кликните или перетащите файл сюда</span>
                  </div>
                )}
              </div>

              <input
                id="fileInput"
                type="file"
                ref={ref}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                    setFileName(file.name);
                  }
                }}
                className="hidden"
              />

              {errors.file && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.file.message as string}
                </p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md mt-4 cursor-pointer"
        >
          Завершить регистрацию
        </button>
      </form>
    </div>
  );
}
