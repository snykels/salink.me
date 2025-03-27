import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureSection from "@/components/landing/FeatureSection";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      
      <main className="flex-1">
        <div className="py-20 bg-gray-950 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">مميزات Salink</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            اكتشف كل المميزات القوية التي يقدمها Salink لإدارة روابطك بكفاءة
          </p>
        </div>
        
        <FeatureSection />
      </main>

      <Footer />
    </div>
  );
};

export default Features;
