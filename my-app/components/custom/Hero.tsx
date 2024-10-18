"use client";

import { getSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineGlobal } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSubmit } from "../../app/types/interface";
import { Session } from "next-auth";

const registerSchema = z.object({
  accountType: z.enum(["jobseeker", "organization"], {
    errorMap: () => ({ message: "Please select an account type." }),
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Hero = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const {
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    router.push(`/jobs?q=${search}&location=${location}`);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false);
    };
    fetchSession();
  }, []);


  return (
    <>
      {session ? (
        <div className="pb-20 pt-14 px-10 md:px-0 bg-gradient-to-r from-blue-100 to-white">
          <h1 className="md:text-4xl text-4xl text-center font-bold text-gray-800 mb-4">
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
                  className="outline-none h-full pl-10 pr-4 w-full text-sm rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 placeholder-gray-400 transition-all duration-300 ease-in-out"
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#504ED7")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#504ED7")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm px-6 py-2 rounded-full shadow-lg"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="pt-8 pb-[18px] px-10 md:px-0 bg-gradient-to-r from-blue-100 to-white h-full grid place-content-center">
          <div className="w-full max-w-[800px] text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Career Connects!
            </h1>
            <p className="text-sm mb-10">First, tell us what you want to do:</p>

            <div className="flex items-center gap-8 md:flex-row flex-col">
              <div className="group bg-white flex-1 py-10 px-5 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <Label className="block">
                  <h1 className="text-2xl font-bold group-hover:text-[#504ED7] transition-colors">
                    I am looking for work
                  </h1>
                  <p className="text-sm mt-5 mb-10 text-gray-600">
                    Create a <strong>jobseeker</strong> account.
                  </p>
                  <Link href="/job-seeker">
                    <Button
                      className="bg-[#504ED7] hover:bg-[#2825C2] transition-[background] px-5 py-3 rounded-md text-sm text-white shadow-md"
                    >
                      START LOOKING FOR JOBS
                    </Button>
                  </Link>
                </Label>
              </div>

              <strong className="text-gray-500">OR</strong>

              <div className="group bg-white flex-1 py-10 px-5 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <Label className="block">
                  <h1 className="text-2xl font-bold group-hover:text-green-600 transition-colors">
                    I am looking to hire
                  </h1>
                  <p className="text-sm mt-5 mb-10 text-gray-600">
                    Create an <strong>organization</strong> account.
                  </p>
                  <Link href="/organisation">
                    <Button
                      className="bg-green-600 hover:bg-green-700 transition-[background] px-5 py-3 rounded-md text-sm text-white shadow-md"
                    >
                      START LOOKING FOR CANDIDATES
                    </Button>
                  </Link>
                </Label>
              </div>
            </div>

            {errors.accountType && (
              <p className="text-red-500 text-sm mt-2">
                {errors.accountType.message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
