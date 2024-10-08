"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, count, icon, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-5 flex items-center justify-between cursor-pointer hover:shadow-xl transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="text-2xl text-gray-700 mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-500">{count} Total</p>
        </div>
      </div>
    </div>
  );
};

const DashboardCards: React.FC = () => {
  const [jobsPosted, setJobsPosted] = useState<number | null>(null);
  const [allUsers, setAllUsers] = useState<number | null>(null);
  const [verifiedEmails, setVerifiedEmails] = useState<number | null>(null);
  const [unverifiedEmails, setUnverifiedEmails] = useState<number | null>(null);
  const [organizationsRegistered, setOrganizationsRegistered] = useState<number | null>(null);

  const handleCardClick = (title: string) => {
    console.log(`${title} card clicked`);
  };

  const fetchJobsData = async () => {
    try {
      const jobsPostedRes = await axios.get('/api/jobs');
      const jobsCount = jobsPostedRes.data.length;
      setJobsPosted(jobsCount);
    } catch (error) {
      console.error('Error fetching jobs data:', error);
    }
  };

  const fetchUsersData = async () => {
    try {
      const usersRes = await axios.get('/api/auth/get-all-users');
      const users = usersRes.data;

      setAllUsers(users.length);

      const verifiedCount = users.filter((user: { verifyEmail: boolean }) => user.verifyEmail).length;
      const unverifiedCount = users.length - verifiedCount; 

      setVerifiedEmails(verifiedCount);
      setUnverifiedEmails(unverifiedCount);  
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const fetchOrganizationsData = async () => {
    try {
      const organizationsRes = await axios.get('/api/auth/get-all-users'); 
      const organizations = organizationsRes.data;

      const employerCount = organizations.filter((user: { role: string }) => user.role === 'employer').length;
      setOrganizationsRegistered(employerCount);
    } catch (error) {
      console.error('Error fetching organizations data:', error);
    }
  };

  useEffect(() => {
    fetchJobsData();
    fetchUsersData();
    fetchOrganizationsData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card
        title="Jobs Posted"
        count={jobsPosted !== null ? jobsPosted : 0}
        icon={<i className="fas fa-briefcase"></i>}
        onClick={() => handleCardClick("Jobs Posted")}
      />
      <Card
        title="All Users"
        count={allUsers !== null ? allUsers : 0}
        icon={<i className="fas fa-users"></i>}
        onClick={() => handleCardClick("All Users")}
      />
      <Card
        title="Verified Emails"
        count={verifiedEmails !== null ? verifiedEmails : 0}
        icon={<i className="fas fa-check-circle"></i>}
        onClick={() => handleCardClick("Verified Emails")}
      />
      <Card
        title="Unverified Emails"
        count={unverifiedEmails !== null ? unverifiedEmails : 0}
        icon={<i className="fas fa-exclamation-circle"></i>}
        onClick={() => handleCardClick(" Emails")}
      />
      <Card
        title="Organizations Registered"
        count={organizationsRegistered !== null ? organizationsRegistered : 0}
        icon={<i className="fas fa-building"></i>}
        onClick={() => handleCardClick("Organizations Registered")}
      />
    </div>
  );
};

export default DashboardCards;
