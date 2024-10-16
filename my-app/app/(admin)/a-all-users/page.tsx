/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';
import Sidebar from '../a-dashboard/-components/sidebar'; // Import Sidebar

interface User {
  id: string; // Assuming user ID is a string
  name: string;
  email: string;
  role: string;
  verifiedEmail: boolean; // This property should match the backend response
}

const Table = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null); // Track the user being updated

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/auth/get-all-users/post');
      console.log(response.data); // Log the response data to verify structure
      const formattedData = response.data.map((user: any) => ({
        ...user,
        verifiedEmail: user.verifyEmail === true, // Adjust this based on your actual backend response
      }));
      setData(formattedData);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to fetch data');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/auth/get-all-users?id=${id}`);
      setData(prevData => prevData.filter(user => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user!");
    }
  };

  const handleVerifyEmail = async (id: string, verified: boolean) => {
    try {
      setUpdating(id); // Set the user being updated
      const newVerificationStatus = !verified; // Toggle the verification status
      await axios.put(`/api/auth/get-all-users?id=${id}`, { verifyEmail: newVerificationStatus });
      setData(prevData =>
        prevData.map(user =>
          user.id === id ? { ...user, verifiedEmail: newVerificationStatus } : user
        )
      );
      toast.success(newVerificationStatus ? "Email verified successfully!" : "Email unverified successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update email verification status!");
    } finally {
      setUpdating(null); // Reset updating state
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: () => <span>Name</span>,
    },
    {
      accessorKey: 'email',
      header: () => <span>Email</span>,
    },
    {
      accessorKey: 'role',
      header: () => <span>Role</span>,
    },
    {
      accessorKey: 'verifiedEmail',
      header: () => <span>Verified Email</span>,
      cell: ({ row }) => (
        <span>{row.original.verifiedEmail ? 'True' : 'False'}</span> // Display "True" or "False"
      ),
    },
    {
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={() => alert(`Viewing user: ${row.getValue('name')}`)}
          >
            View
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </button>
          {!row.original.verifiedEmail && ( // Only show the button if the email is not verified
            <button
              className={`bg-green-500 text-white px-4 py-1 rounded ${updating === row.original.id ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button while updating
              onClick={() => handleVerifyEmail(row.original.id, row.original.verifiedEmail)}
              disabled={updating === row.original.id} // Disable button if updating
            >
              Verify
            </button>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="flex bg-fixed">
        <Sidebar /> 
        <div className="flex-1 flex flex-col ml-96 pt-4 overflow-y-auto h-screen">
          <h1 className="text-2xl font-bold mb-4">Users List</h1>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="border-b p-4 text-left text-gray-600">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50 transition duration-200">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="border-b p-4 text-gray-800">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Table;
