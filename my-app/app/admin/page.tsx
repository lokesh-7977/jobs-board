/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [jobsPosted, setJobsPosted] = useState<any[]>([]);
  const [jobsApplied, setJobsApplied] = useState<any[]>([]);

  useEffect(() => {
    const storedOrganizations = [
      { id: '1', name: 'Tech Solutions', paid: true, verified: false },
      { id: '2', name: 'Creative Agency', paid: false, verified: false },
      { id: '3', name: 'Health Inc.', paid: true, verified: true },
    ];

    const storedProfiles = [
      { id: '1', name: 'John Doe', email: 'john@example.com', paid: true, verified: false },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', paid: false, verified: false },
      { id: '3', name: 'Alice Johnson', email: 'alice@example.com', paid: true, verified: true },
    ];

    const dummyJobsPosted = [
      { id: '1', organizationId: '1', title: 'Frontend Developer', description: 'Looking for a frontend developer with React skills.', status: 'Open' },
      { id: '2', organizationId: '2', title: 'Graphic Designer', description: 'Seeking a talented graphic designer.', status: 'Open' },
      { id: '3', organizationId: '3', title: 'Project Manager', description: 'Need an experienced project manager for our team.', status: 'Closed' },
    ];

    const dummyJobsApplied = [
      { id: '1', profileId: '1', jobId: '1', status: 'Applied' },
      { id: '2', profileId: '2', jobId: '2', status: 'Pending' },
      { id: '3', profileId: '3', jobId: '3', status: 'Rejected' },
    ];

    setOrganizations(storedOrganizations);
    setProfiles(storedProfiles);
    setJobsPosted(dummyJobsPosted);
    setJobsApplied(dummyJobsApplied);
  }, []);

  const verifyEmail = (id: string, type: 'organization' | 'profile') => {
    console.log(`Email for ${type} with ID ${id} verified.`);
    if (type === 'organization') {
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === id ? { ...org, verified: true } : org
        )
      );
    } else {
      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === id ? { ...profile, verified: true } : profile
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Organizations</h2>
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Organization Name</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Paid Status</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Verify Email</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{org.name}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">
                    {org.paid ? <Badge variant="outline">Paid</Badge> : <Badge variant="destructive">Not Paid</Badge>}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">
                    {org.paid && !org.verified ? (
                      <Button
                        className="bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => verifyEmail(org.id, 'organization')}
                      >
                        Verify
                      </Button>
                    ) : org.verified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Profiles Table */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Profiles</h2>
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Profile Name</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Email</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Verify Email</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{profile.name}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{profile.email}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">
                    {profile.paid && !profile.verified ? (
                      <Button
                        className="bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => verifyEmail(profile.id, 'profile')}
                      >
                        Verify
                      </Button>
                    ) : profile.verified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Jobs Posted and Applied Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Jobs Posted Section */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Jobs Posted</h2>
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Job Title</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Organization</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsPosted.map((job) => (
                <tr key={job.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{job.title}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{organizations.find((org) => org.id === job.organizationId)?.name}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Jobs Applied Section */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Jobs Applied</h2>
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Profile Name</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Job Title</th>
                <th className="py-3 px-4 border-b text-gray-600 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((jobApp) => (
                <tr key={jobApp.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{profiles.find((profile) => profile.id === jobApp.profileId)?.name}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{jobsPosted.find((job) => job.id === jobApp.jobId)?.title}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-300">{jobApp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
