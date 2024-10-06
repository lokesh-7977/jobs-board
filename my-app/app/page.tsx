"use client"
import CategoryContainer from "@/components/custom/Category";
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import Jobs from "@/components/custom/Jobs";
import Navbar from "@/components/custom/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import Hire from "@/components/custom/Hire";

export default function Home() {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Hero />
      <CategoryContainer />
      <Hire />
      <Jobs />
      <Footer />
    </>
  );
}
