"use client";
import { User } from "@/store/slices/allUserSlice";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4">
      <div className="flex items-center gap-4">
        <img
          src={user.avatarUrl}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.position}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="border px-3 py-1 rounded-md text-sm">
          Смотреть CV
        </button>
        <button className="border px-3 py-1 rounded-md text-sm">
          📞 Контакты
        </button>
      </div>
    </div>
  );
}
