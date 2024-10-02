/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import Footer from "../../components/custom/Footer";
import Navbar from "../../components/custom/Navbar";
import JobCard from "./_components/job-card";
import Filter from "./_components/filter"; // Adjust the import path as needed
import { data as jobData } from "../data/index";

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
  const [selectedJobLevel, setSelectedJobLevel] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState<number>(0);

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

  const handleFilter = () => {
    // Filter logic based on selectedJobLevel, selectedEmploymentType, and minSalary
    const filteredJobs = jobData.filter(job => {
      const salaryMatch = job.salary.match(/Rp\s([\d.,]+)\s\/\s(\w+)/);
      let salaryNumber = 0;

      if (salaryMatch) {
        const salaryStr = salaryMatch[1].replace(/\./g, '').replace(/,/g, '');
        salaryNumber = parseInt(salaryStr, 10);
      }

      const matchesJobLevel = selectedJobLevel.length === 0 || selectedJobLevel.includes(job.level || ''); // Ensure job level is in job data
      const matchesEmploymentType = selectedEmploymentType.length === 0 || selectedEmploymentType.includes(job.type); // Ensure employment type is in job data
      const matchesSalary = salaryNumber >= minSalary;

      return matchesJobLevel && matchesEmploymentType && matchesSalary;
    });

    const transformedFilteredJobs: IJobCardProps[] = filteredJobs.map((job) => {
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
        type: 'fullTime', // Default type
        description: job.jobOverview,
        salary: salaryNumber,
        salaryType: salaryType,
        level: job.level || '',
      };
    });

    setJobs(transformedFilteredJobs);
  };

  return (
    <>
      <Navbar />
      {/* Search Bar */}
      <div className="py-10 px-5">
        <div className="w-full m-auto bg-white shadow-xl border border-gray-200 rounded-full h-16 py-0 px-4">
          <form className="flex justify-between items-center h-full gap-3">
            <div className="flex w-full items-center gap-3">
              <AiOutlineSearch className="text-xl text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or keyword"
                className="outline-none h-full px-2 w-full text-sm"
              />
            </div>
            <button className="bg-[#504ED7] hover:bg-[#2825C2] text-white text-sm px-6 py-2 rounded-full">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Filter Component */}
      <Filter
        selectedJobLevel={selectedJobLevel}
        setSelectedJobLevel={setSelectedJobLevel}
        selectedEmploymentType={selectedEmploymentType}
        setSelectedEmploymentType={setSelectedEmploymentType}
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        handleFilter={handleFilter}
      />

      <div className="bg-gray-100 py-10 px-5">
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
      <Footer />
    </>
  );
};

export default Jobs;
