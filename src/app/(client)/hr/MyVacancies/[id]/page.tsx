"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import ApplicantList from "@/components/client/hr/ApplicantList";
import { User } from "@/store/slices/allUserSlice";

export default function HRJobDetailsPage() {
  const { id } = useParams() as { id: string };

  const job = useAppSelector((state) =>
    state.job.jobs.find((j) => j.id === id)
  );

  const allUsers = useAppSelector((state) => state.user.users);

  const applicants: User[] = Array.isArray(job?.appliedBy)
    ? job.appliedBy
        .map((email: string) => allUsers.find((u) => u.email === email))
        .filter((u): u is User => Boolean(u))
    : [];

  if (!job) return <p className="p-6">Job not found</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">{job.title}</h2>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
          Delete
        </button>
      </div>

      <ApplicantList applicants={applicants} jobId={job.id} />

      <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 text-sm text-gray-600">
        <div>
          <p className="text-gray-400">Salary (USD)</p>
          <p className="text-green-600 font-semibold">{job.salary}</p>
        </div>
        <div>
          <p className="text-gray-400">Job Location</p>
          <p>{job.location}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Job Description</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {job.description}
        </p>
      </div>
    </div>
  );
}
