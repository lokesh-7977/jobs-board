"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

interface Job {
  title: string;
  description: string;
  location: string;
  salary: string;
  employmentType: string;
  jobLevel: string;
  skills: string[];
  category: string;
}

const JobDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return; 
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.get(`/api/jobs/get-job?id=${id}`); 
        setJob(response.data.job); 
      } catch (error) {
        setError("Failed to fetch job details. Please try again later.");
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!job) return <p>No job found.</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <p className="mt-2 text-gray-700">{job.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Details</h3>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Employment Type:</strong> {job.employmentType}</p>
          <p><strong>Job Level:</strong> {job.jobLevel}</p>
          <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
          <p><strong>Category:</strong> {job.category}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
