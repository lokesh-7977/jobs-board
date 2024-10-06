"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./Cards"; 
import Link from "next/link";
import { useSession } from "next-auth/react"; 

interface IJobData {
  id: number;
  companyLogo: string;
  name: string;
  companyLocation: {
    province: string;
    city: string;
  };
  position: string;
  type: string;
  jobOverview: string;
  salary: string;
  level: string;
}

interface IJobCardProps {
  id: number;
  logo: string;
  organization: string;
  province: string;
  city: string;
  title: string;
  type: string;
  description: string;
  salary: number;
  level: string;
  salaryType: "month" | "year";
}

const Jobs: React.FC = () => {
  const { data: session } = useSession(); 
  const [jobs, setJobs] = useState<IJobCardProps[]>([]);
  const [hoveredJobId, setHoveredJobId] = useState<number | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jobData: IJobData[] = await response.json();

        const transformedJobs: IJobCardProps[] = jobData.map((job) => {
          const salaryMatch = job.salary.match(/Rp\s([\d.,]+)\s\/\s(\w+)/);
          let salaryNumber = 0;
          let salaryType: "month" | "year" = "month";

          if (salaryMatch) {
            const salaryStr = salaryMatch[1].replace(/\./g, "").replace(/,/g, "");
            salaryNumber = parseInt(salaryStr, 10);
            salaryType = salaryMatch[2].toLowerCase() === "year" ? "year" : "month";
          }

          return {
            id: job.id,
            logo: job.companyLogo || "https://dummyimage.com/100x100/000/fff", // Fallback logo if missing
            organization: job.name,
            province: job.companyLocation.province,
            city: job.companyLocation.city,
            title: job.position,
            type: job.type,
            description: job.jobOverview,
            salary: salaryNumber,
            salaryType: salaryType,
            level: job.level || "",
          };
        });

        setJobs(transformedJobs);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full ml-3 md:ml-0">
      <div className="py-10 px-5">
        <div className="flex items-center justify-center w-full mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-5">
            <span className="text-violet-600 mr-3">Latest</span>Jobs
          </h1>
        </div>
        {jobs.length === 0 ? (
          <div className="bg-red-500 text-center text-white rounded-md py-3">
            There&apos;s no job available.
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="relative"
                onMouseEnter={() => setHoveredJobId(job.id)}
                onMouseLeave={() => setHoveredJobId(null)}
              >
                <Link href={`/jobs/${job.id}`} passHref>
                  <JobCard
                    id={job.id}
                    logo={job.logo}
                    organization={job.organization}
                    province={job.province}
                    city={job.city}
                    title={job.title}
                    type={job.type}
                    description={job.description}
                    salary={job.salary}
                    salaryType={job.salaryType}
                    level={job.level}
                  />
                </Link>
                {!session && hoveredJobId === job.id && (
                  <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 text-white rounded-md">
                    <span>🔒 Locked - Please log in to view details</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {session && (
        <Link href="/jobs">
          <button className="border-2 border-blue-500 text-blue-500 rounded-full mb-10 px-6 py-2 transition-colors hover:bg-blue-100">
            Find More Jobs
          </button>
        </Link>
      )}
    </div>
  );
};

export default Jobs;
