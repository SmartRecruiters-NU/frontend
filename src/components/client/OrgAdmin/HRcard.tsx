"use client";

import { HR, deleteHR } from "@/store/slices/hrManaSlice";
import { useAppDispatch } from "@/store/hooks";

interface Props {
  hr: HR;
}

export default function HRCard({ hr }: Props) {
  const dispatch = useAppDispatch();

  const handleCopy = () => {
    navigator.clipboard.writeText(hr.email);
  };

  return (
    <div className="border p-4 rounded flex justify-between items-center bg-white">
      <div>
        <h4 className="font-semibold">{hr.name}</h4>
        <p className="text-sm text-gray-500">{hr.email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
        >
          Copy
        </button>
        <button
          onClick={() => dispatch(deleteHR(hr.id))}
          className="text-sm bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
