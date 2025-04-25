"use client";

import { useRouter } from "next/navigation";
import { User } from "@/store/slices/allUserSlice";

interface Props {
  applicants: User[];
  jobId: string;
}

export default function ApplicantList({ applicants, jobId }: Props) {
  const router = useRouter();

  if (!applicants?.length) {
    return (
      <div className="mt-6 text-sm text-gray-500 italic">
        No applicants yet.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-800">Заявки</h3>
        <span
          className="text-sm text-blue-600 cursor-pointer hover:underline"
          role="button"
          aria-label="Show all applicants"
          onClick={() => router.push(`/hr/MyVacancies/${jobId}`)}
        >
          Show all ({applicants.length})
        </span>
      </div>

      <div className="space-y-2">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{applicant.name}</p>
              <p className="text-sm text-gray-500">{applicant.position}</p>
            </div>
            <button
              onClick={() => router.push(`/hr/AllUsers/${applicant.id}`)}
              className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
