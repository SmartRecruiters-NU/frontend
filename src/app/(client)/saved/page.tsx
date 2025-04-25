"use client";

import { useAppSelector } from "@/store/hooks";
import VacancyCard from "@/components/client/vacancies/VacancyCard";

export default function SavedPage() {
  const jobs = useAppSelector((state) => state.job.jobs);
  const currentUser = useAppSelector((state) => state.auth.user);

  const savedJobs = jobs.filter(
    (job) => currentUser && (job.savedBy?.includes(currentUser.email) ?? false)
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Saved Vacancies</h2>
      {savedJobs.map((job) => (
        <VacancyCard key={job.id} vacancy={job} />
      ))}
    </div>
  );
}
