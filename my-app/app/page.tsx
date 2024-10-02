// import Image from "next/image";
import React from 'react';
import Navbar from '@/components/custom/Navbar';
import Hero from '@/components/custom/Hero';
import Category from '@/components/custom/Category'
import Testimonials from '@/components/custom/Testimonials';

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Category/>
    <Testimonials/>
    </>
  );
}
