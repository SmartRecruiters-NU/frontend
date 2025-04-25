"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setJobs, Job } from "@/store/slices/job/jobSlice";
import Header from "@/components/client/Header";
import mockJobs from "@/mock/mock-job.json";

function JobDataInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setJobs(mockJobs));
  }, [dispatch]);

  return <>{children}</>;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JobDataInitializer>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow p-4">{children}</div>
      </main>
    </JobDataInitializer>
  );
}
