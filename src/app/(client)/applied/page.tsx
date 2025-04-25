"use client";

import { useAppSelector } from "@/store/hooks";
import VacancyCard from "@/components/client/vacancies/VacancyCard";

export default function AppliedPage() {
  const jobs = useAppSelector((state) => state.job.jobs);
  const currentUser = useAppSelector((state) => state.auth.user);

  const appliedJobs = jobs.filter(
    (job) =>
      currentUser?.email && (job.appliedBy ?? []).includes(currentUser.email)
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Applied Vacancies</h2>
      {appliedJobs.map((job) => (
        <VacancyCard key={job.id} vacancy={job} />
      ))}
    </div>
  );
}
