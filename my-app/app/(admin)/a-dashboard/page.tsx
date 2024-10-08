import React from 'react';
import Sidebar from './-components/sidebar';
import Cards from './-components/cards';
import Navbar from '@/components/custom/Navbar';

const Page: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-5 transition-all duration-300 ml-64">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <Cards />
      </div>
    </div>
    </>
  );
};

export default Page;
