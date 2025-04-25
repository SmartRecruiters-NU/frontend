"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMyVacancies } from "@/store/slices/myVacancySlice";
import { Job } from "@/store/slices/job/jobSlice";
import { useRouter } from "next/navigation";

export default function MyVacanciesPage() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.job.jobs);
  const currentUser = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (jobs.length > 0 && currentUser?.email) {
      const filteredVacancies = jobs
        .filter((job) => job.createdBy === currentUser.email)
        .map((job: Job) => ({
          ...job,
          applicants: job.appliedBy || [],
          createdBy: job.createdBy || "",
        }));

      if (filteredVacancies.length > 0) {
        dispatch(setMyVacancies(filteredVacancies));
      } else {
        console.log("No matching vacancies for this user.");
      }
    }
  }, [jobs, currentUser, dispatch]);

  const handleViewDetails = (vacancyId: string) => {
    router.push(`/vacancies/${vacancyId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Vacancies</h2>

      <div className="space-y-3">
        {jobs.length === 0 && <p>No vacancies found.</p>}

        {jobs.map((vac) => (
          <div
            key={vac.id}
            className="border p-4 rounded-md hover:shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{vac.title}</h3>
              <p className="text-sm text-gray-500">
                {vac.company} · {vac.location}
              </p>
              <p className="text-xs text-gray-600">{vac.salary}</p>
            </div>

            <button
              onClick={() => handleViewDetails(vac.id)}
              className="text-blue-600 hover:underline ml-4"
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
