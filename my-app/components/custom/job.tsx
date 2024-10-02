/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import Footer from "../../components/custom/Footer";
import Navbar from "../../components/custom/Navbar";
import JobCard from "./jobcard";
 // Adjust the import path as needed
import { data as jobData } from "../../app/data/index";
import Link from "next/link";

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
  level: string
  salaryType: 'month' | 'year';
  
}

const Jobs: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [jobs, setJobs] = useState<IJobCardProps[]>([]);
  useEffect(() => {
    // Transform data to IJobCardProps format
    const transformedJobs: IJobCardProps[] = jobData.map((job) => {
      const salaryMatch = job.salary.match(/Rp\s([\d.,]+)\s\/\s(\w+)/);
      let salaryNumber = 0;
      let salaryType: 'month' | 'year' = 'month';

      if (salaryMatch) {
        const salaryStr = salaryMatch[1].replace(/\./g, '').replace(/,/g, '');
        salaryNumber = parseInt(salaryStr, 10);
        salaryType = salaryMatch[2].toLowerCase() === 'year' ? 'year' : 'month';
      }

      return {
        id: job.id,
        logo: "/path-to-logo-placeholder.png", // Replace with actual logo path
        organization: job.name,
        province: job.companyLocation.province,
        city: job.companyLocation.city,
        title: job.position,
        type: job.type, // Default type
        description: job.jobOverview,
        salary: salaryNumber,
        salaryType: salaryType,
        level: job.level || '',
      };
    });

    setJobs(transformedJobs);
  }, []);

  
  return (
    <>
     
      

      
       <div className="flex flex-col justify-center items-center w-full ml-3 md:ml-0 "> 
      <div className=" py-10 px-5 ">
        <div className="flex items-center justify-center w-full mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-5"><span className="text-violet-600 mr-3">Latest</span>Jobs</h1>
        </div>
        {jobs.length === 0 ? (
          <div className="bg-red-500 text-center text-white rounded-md py-3">
            There's no job available.
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
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
    </>
  );
};

export default Jobs;
