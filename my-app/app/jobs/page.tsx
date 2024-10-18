/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./_components/job-card";
import Link from "next/link";
import { useSession } from "next-auth/react"; 
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa";

interface IJobCardProps {
  id: string;
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
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jobData: any[] = await response.json(); 
        const transformedJobs: IJobCardProps[] = jobData.map((job) => ({
          id: job.id, 
          logo: job.logo || "", 
          organization: job.name || "Unknown Organization", 
          province: job.location || "",
          city: job.location || "", 
          title: job.title,
          type: job.employmentType || "Full-time", 
          description: job.description,
          salary: job.salary || 0, 
          salaryType: "month", 
          level: job.jobLevel || "Entry-level", 
        }));

        setJobs(transformedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (session) {
        try {
          const response = await fetch("/api/auth/get-all-users");
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          const currentUser = userData.find((user: any) => user.email === session.user.email);
          if (currentUser && currentUser.verifyEmail === true) {
            setEmailVerified(true);
          } else {
            setEmailVerified(false);
          }
        } catch (error) {
          console.error("Error checking email verification:", error);
        }
      }
    };

    checkEmailVerification();
  }, [session]);

  return (
    <>
      <Navbar />
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
            <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {jobs.map((job) => (
                <div key={job.id} className="relative">
                  {!session ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 text-white rounded-md transition-opacity duration-300 ease-in-out opacity-100">
                      <FaLock className="text-4xl mb-2 animate-pulse" />
                      <span className="text-lg font-semibold">
                        Please log in to view the job.
                      </span>
                    </div>
                  ) : !emailVerified ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 text-white rounded-md transition-opacity duration-300 ease-in-out opacity-100">
                      <FaLock className="text-4xl mb-2 animate-pulse" />
                      <span className="text-lg font-semibold text-center">
                        We are verifying your UTR to access this job.
                      </span>
                    </div>
                  ) : (
                    <Link href={`/jobs/${job.id}`} passHref>
                      <JobCard
                            id={job.id}
                            logo={job.logo}
                            organization={job.organization}
                            title={job.title}
                            type={job.type}
                            description={job.description}
                            salary={job.salary}
                            salaryType={job.salaryType} image={""} location={""} employmentType={""} jobLevel={""}                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {session && emailVerified && (
          <Link href="/jobs">
            <Button className="border-2 border-blue-500 text-blue-500 rounded-full mb-10 px-6 py-2 transition-colors hover:bg-blue-100">
              Find More Jobs
            </Button>
          </Link>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
