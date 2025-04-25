"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  addOrganization,
  updateOrganization,
  Organization,
} from "@/store/slices/organizationSlice";

const schema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required("Введите название"),
  city: yup.string().required("Введите город"),
  email: yup.string().email("Неверный формат email").required("Введите email"),
});

interface Props {
  onClose: () => void;
  initialData?: Organization | null;
}

export default function OrganizationModal({ onClose, initialData }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Organization>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      id: "",
      name: "",
      city: "",
      email: "",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = (data: Organization) => {
    const finalData: Organization = {
      ...data,
      id: initialData ? initialData.id : Date.now().toString(),
    };

    if (initialData) {
      dispatch(updateOrganization(finalData));
    } else {
      dispatch(addOrganization(finalData));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-lg w-96"
      >
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Редактировать организацию" : "Добавить организацию"}
        </h3>

        <label className="text-sm mb-1 block">Название</label>
        <input
          {...register("name")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <label className="text-sm mb-1 block">Город</label>
        <input
          {...register("city")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}

        <label className="text-sm mb-1 block">E-mail</label>
        <input
          {...register("email")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
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
