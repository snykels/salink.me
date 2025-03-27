import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection 
          title="نظام Salink لإدارة الروابط"
          subtitle="الحل الأمثل لاختصار الروابط وتنظيمها بشكل هرمي مع إمكانيات تخصيص متقدمة"
          ctaPrimaryText="ابدأ الآن"
          ctaSecondaryText="المزيد من المعلومات"
        />
        
        <FeatureSection />
      </main>

      <Footer />
    </div>
  )
}

export default Home
