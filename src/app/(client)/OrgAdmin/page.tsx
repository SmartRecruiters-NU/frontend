"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useState, useEffect } from "react";
import { HR, setHRs } from "@/store/slices/hrManaSlice";
import HRCard from "@/components/client/OrgAdmin/HRcard";
import HRModal from "@/components/client/OrgAdmin/HRModal";

const mockHRs = [
  {
    id: "1",
    name: "Mark Aurelius",
    email: "dogplayavsdeti@gmail.com",
  },
  {
    id: "2",
    name: "Mark Aurelius",
    email: "dogplayavsdeti@gmail.com",
  },
];

export default function HRPage() {
  const dispatch = useAppDispatch();
  const hrList = useAppSelector((state) => state.hrManager.hrs);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (hrList.length === 0) {
      dispatch(setHRs(mockHRs));
    }
  }, [dispatch, hrList.length]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">HR, recruiters</h2>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            + Добавить
          </button>
        </div>

        <div className="space-y-3">
          {hrList.map((hr: HR) => (
            <HRCard key={hr.id} hr={hr} />
          ))}
        </div>
      </div>

      {showModal && <HRModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
