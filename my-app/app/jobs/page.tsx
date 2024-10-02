/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { FormSubmit, IJob } from "./../types/interface";
import Footer from "./../../components/custom/Footer";
import Navbar from "../../components/custom/Navbar";
import JobCard from "./_components/job-card";
import Filter from "./_components/filter";

interface IProps {
  data: IJob[];
}


const Jobs = ({ data }: IProps) => {
  const [search, setSearch] = useState("");
  const [selectedJobLevel, setSelectedJobLevel] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<
    string[]
  >([]);
  const [minSalary, setMinSalary] = useState(0);

  const router = useRouter();
  const [jobs, setJobs] = useState<IJob[]>([]);

  // Function to handle filters and redirect with query params
  const handleFilter = (e?: FormSubmit) => {
    e?.preventDefault();
    const queryParams = new URLSearchParams();

    if (search) queryParams.append("q", search);
    if (selectedJobLevel.length > 0)
      queryParams.append("jobLevel", selectedJobLevel.join(","));
    if (selectedEmploymentType.length > 0)
      queryParams.append("employmentType", selectedEmploymentType.join(","));
    if (minSalary > 0) queryParams.append("salary", minSalary.toString());

    router.push(`/jobs?${queryParams.toString()}`);
  };

  useEffect(() => {
    setJobs(data);
  }, [data]);

  useEffect(() => {
    const jobLevelQuery = router.query.jobLevel;
    const employmentTypeQuery = router.query.employmentType;
    const salary = router.query.salary;

    if (jobLevelQuery) {
      setSelectedJobLevel(
        Array.isArray(jobLevelQuery) ? jobLevelQuery : [jobLevelQuery]
      );
    }

    if (employmentTypeQuery) {
      setSelectedEmploymentType(
        Array.isArray(employmentTypeQuery)
          ? employmentTypeQuery
          : [employmentTypeQuery]
      );
    }

    if (salary) {
      setMinSalary(parseInt(salary as string, 10));
    }
  }, [router.query]);

  return (
    <>
      <Navbar />
      <div className="md:py-10 py-7 md:px-16 px-5">
        <div className="w-full m-auto bg-white shadow-xl border border-gray-200 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4">
          <form
            onSubmit={handleFilter}
            className="flex md:flex-row flex-col justify-between items-center h-full gap-3"
          >
            <div className="flex w-full items-center gap-3 md:mb-0 mb-5 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1">
              <AiOutlineSearch className="text-xl text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or keyword"
                className="outline-0 h-full px-2 w-full text-sm"
              />
            </div>
            <button className="bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0">
              Search
            </button>
          </form>
        </div>
      </div>
      <Filter
        selectedJobLevel={selectedJobLevel}
        setSelectedJobLevel={setSelectedJobLevel}
        selectedEmploymentType={selectedEmploymentType}
        setSelectedEmploymentType={setSelectedEmploymentType}
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        handleFilter={handleFilter}
      />
      <div className="bg-gray-100 pt-10 pb-7 md:px-16 px-5">
        {jobs.length === 0 ? (
          <div className="bg-red-500 text-center text-white rounded-md py-3">
            There&apos;s no job available.
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {jobs.map((job) => (
              <JobCard key={job.id} item={job} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
