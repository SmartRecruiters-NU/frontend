"use client";

import { useAppSelector } from "@/store/hooks";
import VacancyCard from "@/components/client/vacancies/VacancyCard";

export default function VacanciesPage() {
  const jobs = useAppSelector((state) => state.job.jobs);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Open Vacancies</h2>
      {jobs.map((job) => (
        <VacancyCard key={job.id} vacancy={job} />
      ))}
    </div>
  );
}
