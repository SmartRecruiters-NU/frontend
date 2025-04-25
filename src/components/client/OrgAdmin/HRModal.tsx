"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/store/hooks";
import { addHR } from "@/store/slices/hrManaSlice";

const schema = yup.object({
  name: yup.string().required("Введите имя"),
  email: yup.string().email("Неверный email").required("Введите email"),
});

type HRFormData = yup.InferType<typeof schema>;

interface Props {
  onClose: () => void;
}

export default function HRModal({ onClose }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HRFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: HRFormData) => {
    dispatch(addHR({ ...data, id: Date.now().toString() }));
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-lg w-96"
      >
        <h3 className="text-lg font-semibold mb-4">Добавить сотрудника</h3>

        <label className="text-sm block mb-1">Имя</label>
        <input
          {...register("name")}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <label className="text-sm block mb-1">E-mail</label>
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
