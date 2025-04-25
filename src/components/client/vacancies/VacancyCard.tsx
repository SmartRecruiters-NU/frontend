"use client";
import { useRouter } from "next/navigation";

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
}

interface VacancyCardProps {
  vacancy: Vacancy;
}

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/vacancies/${vacancy.id}`);
  };

  return (
    <article
      className="border rounded-xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">{vacancy.title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          {vacancy.company} · {vacancy.location}
        </p>
        <p className="text-sm text-gray-500">
          {vacancy.type} {vacancy.salary && `· ${vacancy.salary}`}
        </p>
      </div>
      <div className="ml-4">
        <span className="text-blue-600 font-medium text-sm">Подробнее</span>
      </div>
    </article>
  );
}
