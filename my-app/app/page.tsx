"use client"
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import Jobs from "@/components/custom/Jobs";
import Navbar from "@/components/custom/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Hero />
      <Jobs />
      <Footer />
    </>
  );
}
