/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Toaster, toast } from 'react-hot-toast'; 

const Table = () => {
    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
        verified: boolean;
    }

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/auth/get-all-users');
                const jobSeekers = response.data.filter((user: User) => user.role === 'jobSeeker');
                setData(jobSeekers);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/auth/get-all-users?id=${id}`);
            setData(prevData => prevData.filter(user => user.id !== id));
            toast.success("User deleted successfully!"); 
        } catch (err) {
            console.error("Failed to delete user:", err);
            toast.error("Failed to delete user!"); 
        }
    };

    const handleVerify = async (id: number) => {
        const updatedUsers = data.map(user => 
            user.id === id ? { ...user, verified: true } : user
        );
        setData(updatedUsers);

        try {
            await axios.put(`/api/auth/get-all-users?id=${id}`, { verified: true });
            toast.success("User verified successfully!");
        } catch (err) {
            console.error("Failed to verify user:", err);
            toast.error("Failed to verify user!");
            setData(data); 
        }
    };

    const columns = [
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
            accessorKey: 'verified',
            header: () => <span>Verified</span>,
            cell: ({ row }: { row: any }) => (
                <span>{row.getValue('verified') ? 'Yes' : 'No'}</span>
            ),
        },
        {
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row }: { row: any }) => (
                <div className="flex space-x-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                        onClick={() => alert(`Viewing user: ${row.getValue('name')}`)} // Replace with navigation to the view page
                    >
                        View
                    </button>
                    {!row.getValue('verified') && (
                        <button
                            className="bg-green-500 text-white px-4 py-1 rounded"
                            onClick={() => handleVerify(row.original.id)}
                        >
                            Verify
                        </button>
                    )}
                    <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        Delete
                    </button>
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
        <div className="flex">
            <div className="flex-1 p-6 overflow-hidden">
                <h1 className="text-2xl font-bold mb-4">Job Seekers List</h1>
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
            <Toaster /> 
        </div>
    );
};

export default Table;
