"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface IProps {
    id: string | null | undefined;
    logo: string;
    organization: string;
    province: string;
    city: string;
    title: string;
    type: string;
    description: string;
    salary: number;
    salaryType: string;
}

const JobCard = ({
    id,
    logo,
    organization,
    province,
    city,
    title,
    type,
    description,
    salary,
    salaryType
}: IProps) => {
    const [provinceDetail, setProvinceDetail] = useState('');
    const [cityDetail, setCityDetail] = useState('');
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getProvinceData = async () => {
            try {
                const res = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${province}`);
                const data = await res.json();
                setProvinceDetail(data.nama || 'Unknown Province');
            } catch (error) {
                console.error('Error fetching province data:', error);
            } finally {
                setLoading(false);
            }
        };

        getProvinceData();
    }, [province]);

    useEffect(() => {
        const getCityData = async () => {
            try {
                const res = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota/${city}`);
                const data = await res.json();
                setCityDetail(data.nama || 'Unknown City');
            } catch (error) {
                console.error('Error fetching city data:', error);
            } finally {
                setLoading(false);
            }
        };

        getCityData();
    }, [city]);

    const toINRCurrency = (salary: number): string => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(salary);
    };

    if (loading) return <p>Loading...</p>; // Simple loading state

    return (
        <div
            onClick={() => router.push(`/job/${id}`)}
            className="hover:border-2 border hover:border-[#504ED7] border-gray-200 shadow-md p-5 hover:scale-105 rounded-md transition-[transform] cursor-pointer"
            role="button"
            aria-label={`View details for ${title} at ${organization}`} // Accessibility
        >
            <div className="flex items-center gap-2">
                <Image src={logo} alt={organization} className="rounded-full object-cover" width={48} height={48} />
            </div>
            <div>
                <h1 className="font-medium">{organization}</h1>
                <p className="mt-2 text-xs text-gray-500">{provinceDetail}, {cityDetail}</p>
            </div>

            <div className="mb-10 mt-6">
                <h1 className="font-semibold text-xl">{title}</h1>
                <p className="font-medium text-gray-500 text-sm mt-1">
                    {type === 'fullTime'
                        ? 'Full Time'
                        : type === 'partTime'
                        ? 'Part Time'
                        : type === 'freelance'
                        ? 'Freelance'
                        : 'Contractual'}
                </p>
                <div className="mt-3 text-gray-400 text-sm">{description.slice(0, 30)}...</div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <p className="font-semibold text-xl">{toINRCurrency(salary)}</p>
                    <sub className="text-xs text-gray-500 font-medium">/{salaryType}</sub>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
