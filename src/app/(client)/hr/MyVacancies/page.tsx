"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMyVacancies, deleteMyVacancy } from "@/store/slices/myVacancySlice";
import { Job } from "@/store/slices/job/jobSlice"; // Assuming Job is the job slice
import { useRouter } from "next/navigation";

export default function MyVacanciesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Fetching vacancies from the store
  const jobs = useAppSelector((state) => state.job.jobs);
  const currentUser = useAppSelector((state) => state.auth.user);
  const myVacancies = useAppSelector((state) => state.myVacancy.myVacancies);

  // Filter vacancies based on the logged-in user
  useEffect(() => {
    if (jobs.length > 0 && currentUser?.email) {
      const filteredVacancies = jobs
        .filter((job) => job.createdBy === currentUser.email)
        .map((job: Job) => ({
          ...job,
          applicants: job.appliedBy || [],
          createdBy: job.createdBy || "", // Ensure createdBy is always a string
        }));

      if (filteredVacancies.length > 0) {
        dispatch(setMyVacancies(filteredVacancies));
      } else {
        console.log("No matching vacancies for this user.");
      }
    }
  }, [jobs, currentUser, dispatch]);

  // Handle the removal of a job
  const handleRemoveJob = (jobId: string) => {
    dispatch(deleteMyVacancy(jobId));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Vacancies</h2>

      <div className="space-y-3">
        {myVacancies.length === 0 && <p>No vacancies found.</p>}

        {myVacancies.map((vac) => (
          <div
            key={vac.id}
            className="border p-4 rounded-md hover:shadow flex flex-col space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold">{vac.title}</h3>
              <p className="text-sm text-gray-500">
                {vac.company} · {vac.location}
              </p>
              <p className="text-xs text-gray-600">{vac.salary}</p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => router.push(`/vacancies/${vac.id}`)}
                className="text-blue-600 hover:underline"
              >
                Подробнее
              </button>

              {currentUser?.role === "HR" && (
                <button
                  onClick={() => handleRemoveJob(vac.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
