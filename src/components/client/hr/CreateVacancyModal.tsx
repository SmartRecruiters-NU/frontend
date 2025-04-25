"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMyVacancy } from "@/store/slices/myVacancySlice";

const schema = yup.object({
  title: yup.string().required("Введите название вакансии"),
  company: yup.string().required("Введите компанию"),
  location: yup.string().required("Введите локацию"),
  salary: yup.string().required("Введите зарплату"),
  description: yup.string().required("Введите описание вакансии"),
});

type VacancyFormData = yup.InferType<typeof schema>;

interface Props {
  onClose: () => void;
}

export default function CreateVacancyModal({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacancyFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: VacancyFormData) => {
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    const newVacancy = {
      ...data,
      id: Date.now().toString(),
      createdBy: currentUser.email,
      applicants: [],
    };

    dispatch(addMyVacancy(newVacancy));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-lg w-96"
      >
        <h3 className="text-lg font-semibold mb-4">Создать новую вакансию</h3>

        <label className="text-sm mb-1 block">Название вакансии</label>
        <input
          {...register("title")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <label className="text-sm mb-1 block">Компания</label>
        <input
          {...register("company")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.company && (
          <p className="text-red-500 text-sm">{errors.company.message}</p>
        )}

        <label className="text-sm mb-1 block">Локация</label>
        <input
          {...register("location")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}

        <label className="text-sm mb-1 block">Зарплата</label>
        <input
          {...register("salary")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.salary && (
          <p className="text-red-500 text-sm">{errors.salary.message}</p>
        )}

        <label className="text-sm mb-1 block">Описание</label>
        <textarea
          {...register("description")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:underline"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
