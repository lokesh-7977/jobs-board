"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBuilding, faBriefcase, faPlus, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    signOut();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed h-full bg-gray-800 text-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-5 border-b border-gray-700 flex items-center justify-between">
        <Button onClick={toggleSidebar} className="text-xl" title="Toggle Sidebar">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </Button>
      </div>
      <ul className="mt-5">
        <li
          className={`flex items-center p-4 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-300 ${pathname === '/admin/all-users' ? 'bg-gray-700' : ''}`}
          onClick={() => handleNavigation('/a-all-users')}
        >
          <FontAwesomeIcon icon={faUsers} className="mr-3 text-xl" />
          {isOpen && "All Users"}
        </li>

        <li
          className={`flex items-center p-4 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-300 ${pathname === '/orgs' ? 'bg-gray-700' : ''}`}
          onClick={() => handleNavigation('/orgs')}
        >
          <FontAwesomeIcon icon={faBuilding} className="mr-3 text-xl" />
          {isOpen && "Organizations"}
        </li>
        <li
          className={`flex items-center p-4 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-300 ${pathname === '/jobs' ? 'bg-gray-700' : ''}`}
          onClick={() => handleNavigation('/jobs')}
        >
          <FontAwesomeIcon icon={faBriefcase} className="mr-3 text-xl" />
          {isOpen && "Jobs"}
        </li>
        <li
          className={`flex items-center p-4 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-300 ${pathname === '/mems' ? 'bg-gray-700' : ''}`}
          onClick={() => handleNavigation('/mems')}
        >
          <FontAwesomeIcon icon={faUsers} className="mr-3 text-xl" />
          {isOpen && "Job Seekers"} 
        </li>
        <li
          className={`flex items-center p-4 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-300 ${pathname === '/a-jobs' ? 'bg-gray-700' : ''}`}
          onClick={() => handleNavigation('/a-jobs')}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-3 text-xl" />
          {isOpen && "Post Job"}
        </li>
      </ul>
      <div className="mt-auto p-4">
        <button
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition duration-300"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          {isOpen && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
