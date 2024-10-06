"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineGlobal } from "react-icons/ai"; // Importing icons
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "../../app/types/interface";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(""); 
  const router = useRouter();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    router.push(`/jobs?q=${search}&location=${location}`); 
  };

  return (
    <div className="pb-20 pt-14 px-10 md:px-0 bg-gradient-to-r from-blue-100 to-white">
      <h1 className="md:text-6xl text-4xl text-center font-bold text-gray-800 mb-7">
        Find Your Dream Job with Career Connects
      </h1>

      <div className="w-full max-w-[800px] m-auto bg-white shadow-lg border border-gray-200 rounded-xl md:h-16 h-auto py-6 px-6 mt-12 transition-shadow hover:shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="flex md:flex-row flex-col justify-between items-center h-full gap-4"
        >
          <div className="relative flex w-full items-center gap-3 flex-1">
            <AiOutlineSearch className="absolute left-3 text-gray-500" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title or keyword"
              aria-label="Job title or keyword"
              className="outline-none h-full pl-10 pr-4 w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 placeholder-gray-400 transition-all duration-300 ease-in-out"
              onFocus={(e) => e.currentTarget.style.borderColor = '#504ED7'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>
          <div className="relative flex w-full items-center gap-3 flex-1">
            <AiOutlineGlobal className="absolute left-3 text-gray-500" />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              aria-label="Location"
              className="outline-none h-full pl-10 pr-4 w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 placeholder-gray-400 transition-all duration-300 ease-in-out"
              onFocus={(e) => e.currentTarget.style.borderColor = '#504ED7'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm px-6 py-2 rounded-full shadow-lg">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
