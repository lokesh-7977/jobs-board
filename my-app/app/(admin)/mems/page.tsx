/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Toaster, toast } from 'react-hot-toast'; 
import Navbar from '@/components/custom/Navbar';
import Sidebar from './../a-dashboard/-components/sidebar'; 

const Table = () => {
    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
    }

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/auth/get-all-users');
                const employers = response.data.filter((user: User) => user.role === 'jobSeeker');
                setData(employers);
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
        <>
        <Navbar />
        <div className="flex">
            {/* Fixed Sidebar */}
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Table container */}
            <div className="ml-64 flex-1 p-6 flex justify-center items-center">
                <div className="w-full max-w-6xl">
                    <h1 className="text-2xl font-bold mb-4 text-center">Employers List</h1>
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
        </div>
        </>
    );
};

export default Table;
