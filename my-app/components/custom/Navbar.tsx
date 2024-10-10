"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { data: session } = useSession();

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpenSidebar(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [openSidebar]);

  return (
    <div className="flex items-center justify-between gap-10 lg:px-16 pl-4 pr-7 z-[999] py-3 bg-[#504ED7] sticky top-0 shadow-lg">
      <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
        <h1 className="text-2xl font-bold text-white">Career Connect</h1>
      </div>

      <div onClick={() => setOpenSidebar(true)} className="lg:hidden block">
        <GiHamburgerMenu className="text-2xl cursor-pointer" />
      </div>

      <div
        ref={sidebarRef}
        className={`lg:static fixed top-0 ${openSidebar ? "right-0" : "-right-[3000px]"} transition-all bottom-0 lg:shadow-none shadow-xl lg:w-auto w-[250px] lg:p-0 p-7 bg-[#504ED7] lg:flex lg:flex-1`}
      >
        <AiOutlineClose
          onClick={() => setOpenSidebar(false)}
          className="float-right text-2xl mb-5 lg:hidden cursor-pointer"
        />
        <div className="clear-both" />

        <div className="flex-1 lg:flex-row flex-col flex lg:items-center items-start text-sm lg:gap-7 gap-4">
          
        </div>

        <div className="text-sm flex lg:flex-row flex-col lg:items-center items-start lg:gap-8 gap-4 mt-10 lg:mt-0">
          {session ? (
            <>
              <p className="navbar-link text-white font-semibold">Hey, {session.user?.name}</p>
              <Link href="/profile">
                <p className="px-4 py-2 rounded-lg text-white hover:bg-[#504ED7] hover:text-white transition duration-300">
                  My Profile
                </p>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/job-seeker">
                <p className={`px-4 py-2 rounded-lg text-white hover:bg-[#504ED7] hover:text-white transition duration-300 ${pathname === "/login" ? "bg-[#504ED7] text-white" : ""}`}>
                  Looking For Job
                </p>
              </Link>
              <Link href="/organisation">
                <p className={`px-4 py-2 rounded-lg text-white hover:bg-[#504ED7] hover:text-white transition duration-300 ${pathname === "/register" ? "bg-[#504ED7] text-white" : ""}`}>
                  Looking For Hire
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
