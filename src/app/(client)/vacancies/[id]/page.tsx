"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function JobDetailsPage() {
  const params = useParams();
  const id = params?.id; // Make sure id is a string

  const job = useAppSelector((state) =>
    state.job.jobs?.find(
      (j: { id: string | string[] | undefined }) => j.id === id
    )
  );

  if (!job) return <p>Job not found</p>;
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
      <p className="text-gray-500 mb-4">{job.company}</p>

      <div className="flex justify-between items-center p-4 border rounded-md mb-4">
        <div>
          <h3 className="text-sm text-gray-400">Salary (USD)</h3>
          <p className="text-green-600 font-semibold">{job.salary}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-400">Job Location</h3>
          <p>{job.location}</p>
        </div>
      </div>

      {job.status === "APPLIED" && (
        <div className="mb-4 p-4 border border-yellow-300 rounded text-yellow-700">
          <p>🟡 Submitted — HR department has received your resume.</p>
        </div>
      )}
      {job.status === "SCREENING" && (
        <div className="mb-4 p-4 border border-purple-300 rounded text-purple-700">
          <p>🟣 CV Screening — HR department is screening your CV.</p>
        </div>
      )}
      {job.status === "INTERVIEW" && (
        <div className="mb-4 border p-4 rounded text-blue-700 border-blue-300">
          <p>🔵 Interview Scheduled</p>
          <p className="mt-2">System Design Interview</p>
          <p>Date: 30.01.2025, 18:00</p>
          <p>
            Link:{" "}
            <a
              href="https://www.tasdas.asdasd.com"
              className="text-blue-500 underline"
            >
              Join Interview
            </a>
          </p>
        </div>
      )}
      {job.status === "OFFER" && (
        <div className="mb-4 border p-4 rounded text-green-700 border-green-300">
          <p>✅ You got an offer!</p>
          <div className="mt-2 flex gap-4">
            <button className="bg-red-100 text-red-600 px-4 py-1 rounded hover:bg-red-200">
              Reject
            </button>
            <button className="bg-green-100 text-green-600 px-4 py-1 rounded hover:bg-green-200">
              Accept
            </button>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-2">Job Description</h3>
      <p className="text-sm text-gray-700 whitespace-pre-line">
        {job.description}
      </p>
    </div>
  );
}
