/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./_components/job-card"; // Ensure correct import of JobCard component
import Link from "next/link";
import { useSession } from "next-auth/react"; // Importing useSession

interface IJobCardProps {
  id: string; // Changed to string to match your job data
  logo: string;
  organization: string;
  province: string;
  city: string;
  title: string;
  type: string;
  description: string;
  salary: number;
  salaryType: "month" | "year";
  level: string;
}

const Jobs: React.FC = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<IJobCardProps[]>([]);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null); // Changed to string

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jobData = await response.json(); // Assuming the response is in JSON format
        const transformedJobs: IJobCardProps[] = jobData.map((job: any) => {
          return {
            id: job.id, // Ensure you're using the correct property name
            logo: job.logo || "", // Ensure this matches your data structure
            organization: job.userId, // Update based on your API response
            province: job.location || "", // Update based on your API response
            city: job.location || "", // Update based on your API response
            title: job.title,
            type: job.employmentType || "Full-time", // Provide a default type
            description: job.description,
            salary: job.salary || 0, // Fallback to 0 if salary is not present
            salaryType: "month", // Adjust as per your salary data
            level: job.jobLevel || "Entry-level", // Default level if not provided
          };
        });

        setJobs(transformedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
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
          <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
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
