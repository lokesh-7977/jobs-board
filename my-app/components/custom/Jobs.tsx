"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./Cards";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaLock } from "react-icons/fa"; // Import a lock icon from react-icons

const Jobs: React.FC = () => {
  interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    employmentType: string;
    image: string | null;
    jobLevel: string;
  }

  const { data: session } = useSession(); // Check for session (user login)
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null); // Track hovered job

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jobData = await response.json();
        setJobs(jobData);
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
            <span className="text-violet-600 mr-3">Latest</span> Jobs
          </h1>
        </div>
        {jobs.length === 0 ? (
          <div className="bg-red-500 text-center text-white rounded-md py-3">
            There&apos;s no job available.
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="relative group transition-all duration-200"
                onMouseEnter={() => setHoveredJobId(job.id)}
                onMouseLeave={() => setHoveredJobId(null)}
              >
                <Link href={`/jobs/${job.id}`} passHref>
                  <JobCard
                    id={job.id}
                    title={job.title}
                    description={job.description}
                    location={job.location}
                    salary={job.salary}
                    employmentType={job.employmentType}
                    image={job.image || null}
                    jobLevel={job.jobLevel}
                  />
                </Link>

                {/* Lock overlay with improved design */}
                {!session && hoveredJobId === job.id && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 text-white rounded-md transition-opacity duration-300 ease-in-out opacity-100">
                    <FaLock className="text-4xl mb-2 animate-pulse" />
                    <span className="text-lg font-semibold">Please log in to view</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/jobs">
        <button className="border-2 border-blue-500 text-blue-500 rounded-full mb-10 px-6 py-2 transition-colors hover:bg-blue-100">
          Find More Jobs
        </button>
      </Link>
    </div>
  );
};

export default Jobs;
