/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';

interface Applicant {
  id: string;
  name: string;
  email: string;
  resumeLink: string;
}

const Applicants = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId') || ''; // Default to an empty string
  console.log('Search Params:', searchParams.toString()); // Log search params
  console.log('Job ID:', jobId);

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true); 

  const fetchApplicants = async () => {
    if (!jobId) {
      console.warn('Job ID is empty. Skipping fetch.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/applicants?jobId=${jobId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApplicants(data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Applicants for Job ID: {jobId || 'N/A'}</h2>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No applicants for this job.</p>
          </div>
        ) : (
          <div className="overflow-auto max-h-64">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Resume</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="py-3 px-6">{applicant.name}</td>
                    <td className="py-3 px-6">{applicant.email}</td>
                    <td className="py-3 px-6">
                      <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Resume</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <br /><br /><br /><b><br /></b>
      <Footer />
    </div>
  );
};

export default Applicants;
