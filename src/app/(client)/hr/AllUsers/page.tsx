"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUsers } from "@/store/slices/allUserSlice";
import mockUsers from "@/mock/mock-users.json";

export default function AllUserPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(setUsers(mockUsers));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.position}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                Смотреть CV
              </button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                Контакты
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
