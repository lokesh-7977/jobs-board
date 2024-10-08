/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Navbar from '@/components/custom/Navbar';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/custom/Footer';
import { useSession } from "next-auth/react"; 
import React, { useEffect, useState } from 'react';

interface Job {
  position: string;
  name: string;
  jobOverview: string;
  skills: string[];
  requirements: {
    education: string;
    experience: string;
    skills: string[];
  };
  salary: string;
  companyOverview: {
    focus: string;
    goals: string;
  };
  companyLocation: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  employeeCount: number;
}

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession(); 
  const jobId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!session) {
        router.push('/login'); 
        return; 
      }

      const dummyJobData: Job = {
        position: "Software Engineer",
        name: "Tech Company",
        jobOverview: "We are looking for a Software Engineer to join our team.",
        skills: ["JavaScript", "React", "Node.js", "CSS"],
        requirements: {
          education: "Bachelor's degree in Computer Science",
          experience: "2+ years of software development experience",
          skills: ["Problem-solving", "Teamwork", "Communication"]
        },
        salary: "$80,000 - $100,000",
        companyOverview: {
          focus: "We focus on developing innovative software solutions.",
          goals: "Our goal is to enhance user experience and productivity."
        },
        companyLocation: {
          address: "123 Tech Lane",
          city: "Tech City",
          province: "CA",
          postalCode: "12345"
        },
        employeeCount: 150
      };

      setTimeout(() => {
        setJob(dummyJobData);
        setLoading(false);
      }, 1000);
    };

    fetchJobDetails();
  }, [jobId, session, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>No job found.</div>;

  return (
    <>
      <Navbar/>

      <div className="flex w-full pl-0 md:pl-20 min-h-screen">
        <div className="p-2 md:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">NB</span>
              </div>
              <div className="relative"> 
                <h1 className="text-2xl font-semibold">{job.position}</h1>
                <p className="text-gray-500">{job.name}</p>
              </div>
            </div>

            <button
              className="bg-blue-700 text-white py-2 px-4 w-20 rounded hover:bg-blue-900 transition duration-200"
              onClick={() => alert('Application submitted!')} 
            >
              Apply
            </button>
          </div>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Job Overview</h2>
            <p className="text-gray-700 mt-2">{job.jobOverview}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Skills and Expertise</h2>
            <div className="flex flex-col md:flex-row gap-2 mt-2 items-start">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Requirements</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>{job.requirements.education}</li>
              <li>{job.requirements.experience}</li>
              {job.requirements.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Salary</h2>
            <p className="text-gray-700 mt-2">{job.salary}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Company Overview</h2>
            <p className="text-gray-700 mt-2">{job.companyOverview.focus}</p>
            <p className="text-gray-700 mt-1">{job.companyOverview.goals}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Company Location</h2>
            <p className="text-gray-700 mt-2">
              {job.companyLocation.address}, {job.companyLocation.city}, {job.companyLocation.province}, {job.companyLocation.postalCode}
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Estimated Company Total Employees</h2>
            <p className="text-gray-700 mt-2">{job.employeeCount} people</p>
          </section>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default JobDetails;
