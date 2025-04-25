"use client";

import { useAppSelector } from "@/store/hooks";

export default function JobDetailCard() {
  const job = useAppSelector((state) => state.job.selectedJob);

  if (!job) return <p className="text-gray-500">No job selected.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold">{job.title}</h2>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-green-600 font-medium">{job.salary}</p>
          <p className="text-gray-500">{job.location}</p>
        </div>
      </div>

      <div className="border p-4 rounded-lg bg-gray-50 mb-4">
        <p className="font-medium text-gray-800">Job Description</p>
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {job.description}
        </p>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Status: <span className="font-medium text-black">{job.status}</span>
      </div>
    </div>
  );
}
