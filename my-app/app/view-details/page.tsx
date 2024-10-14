"use client";
import { useEffect, useState, Suspense } from "react";
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

const JobDetailContent = () => {
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

  if (loading) return <p className="text-center">Loading job details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!job) return <p className="text-center">No job found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-4xl font-bold mb-4">{job.title}</h2>
      <p className="mt-2 text-gray-700">{job.description}</p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Job Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Employment Type:</strong> {job.employmentType}</p>
          <p><strong>Job Level:</strong> {job.jobLevel}</p>
          <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
          <p><strong>Category:</strong> {job.category}</p>
        </div>
      </div>
    </div>
  );
};

const JobDetail = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <JobDetailContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default JobDetail;
