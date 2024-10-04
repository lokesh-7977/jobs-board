/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Footer from "../../components/custom/Footer";
import Navbar from "../../components/custom/Navbar";
import JobCard from "./_components/job-card";
import { useSession } from "next-auth/react";

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
  salaryType: 'month' | 'year';
}

const jobData = [
  {
    id: 1,
    name: "Tech Corp",
    companyLocation: {
      province: "California",
      city: "San Francisco"
    },
    position: "Software Engineer",
    type: "Full-Time",
    jobOverview: "Develop and maintain software applications.",
    salary: "Rp 15,000,000 / month",
    level: "Mid-Level",
    logo : "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    id: 2,
    name: "Design Studio",
    companyLocation: {
      province: "New York",
      city: "New York"
    },
    position: "UI/UX Designer",
    type: "Part-Time",
    jobOverview: "Create user-friendly designs.",
    salary: "Rp 8,000,000 / month",
    level: "Junior",
    logo : "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    id: 3,
    name: "Finance Inc",
    companyLocation: {
      province: "Texas",
      city: "Austin"
    },
    position: "Financial Analyst",
    type: "Contract",
    jobOverview: "Analyze financial data and provide insights.",
    salary: "Rp 20,000,000 / year",
    level: "Senior",
    logo : "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    id: 4,
    name: "Marketing Solutions",
    companyLocation: {
      province: "Florida",
      city: "Miami"
    },
    position: "Marketing Manager",
    type: "Full-Time",
    jobOverview: "Manage marketing campaigns.",
    salary: "Rp 25,000,000 / month",
    level: "Lead",
    logo : "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
];

const Jobs: React.FC = () => {
  const { data: session } = useSession(); // Get the current session
  const [search, setSearch] = useState<string>("");
  const [jobs, setJobs] = useState<IJobCardProps[]>([]);

  useEffect(() => {
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
        logo: job.logo,
        organization: job.name,
        province: job.companyLocation.province,
        city: job.companyLocation.city,
        title: job.position,
        type: job.type,
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
      <Navbar />
      {session ? (
        <div className="py-10 px-5">
          <div className="w-full m-auto bg-white shadow-xl border border-gray-200 rounded-full h-16 py-0 px-4 flex items-center mb-5">
            <form className="flex justify-between items-center w-full gap-3">
              <div className="flex w-full items-center gap-3">
                <AiOutlineSearch className="text-xl text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Job title or keyword"
                  className="outline-none h-full px-2 w-full text-sm rounded-lg border border-gray-300 focus:border-blue-500"
                />
              </div>
              <button className="bg-[#504ED7] hover:bg-[#2825C2] text-white text-sm px-6 py-2 rounded-full transition duration-300">
                Search
              </button>
            </form>
          </div>

          <div className="bg-gray-100 py-10 px-5">
            {jobs.length === 0 ? (
              <div className="bg-red-500 text-center text-white rounded-md py-3">
                There are no jobs available.
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
        </div>
      ) : (
        <div className="py-10 text-center">
          <h2 className="text-xl font-bold">Please log in to view job listings.</h2>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Jobs;
