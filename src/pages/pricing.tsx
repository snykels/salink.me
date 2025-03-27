import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  isPopular = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  isPopular?: boolean;
}) => {
  return (
    <div className={`rounded-xl border ${isPopular ? 'border-green-500 shadow-[0_0_15px_rgba(43,187,87,0.15)]' : 'border-gray-800'} bg-gray-900 p-6 relative`}>
      {isPopular && (
        <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          الأكثر شعبية
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">{price}</span>
        {price !== "مجاني" && <span className="text-gray-400 mr-1">/ شهرياً</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full ${isPopular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
        {buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      
      <main className="flex-1">
        <div className="py-20 bg-gray-950 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">خطط الأسعار</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            اختر الخطة المناسبة لاحتياجاتك مع إمكانية الترقية في أي وقت
          </p>
        </div>
        
        <div className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="المجاني"
              price="مجاني"
              description="مثالي للاستخدام الشخصي والمشاريع الصغيرة"
              features={[
                "ما يصل إلى 50 رابط",
                "تنظيم هرمي أساسي",
                "تخصيص محدود للأزرار",
                "إحصائيات أساسية",
                "دعم البريد الإلكتروني"
              ]}
              buttonText="ابدأ مجاناً"
            />
            
            <PricingCard 
              title="الاحترافي"
              price="٣٩ ريال"
              description="للشركات الصغيرة والمؤثرين"
              features={[
                "روابط غير محدودة",
                "تنظيم هرمي متقدم",
                "تخصيص كامل للأزرار",
                "تحليلات متقدمة",
                "دمج المدفوعات",
                "دعم فني على مدار الساعة"
              ]}
              buttonText="اشترك الآن"
              isPopular={true}
            />
            
            <PricingCard 
              title="المؤسسات"
              price="٩٩ ريال"
              description="للشركات والمؤسسات الكبيرة"
              features={[
                "كل ميزات الخطة الاحترافية",
                "واجهة برمجة التطبيقات API",
                "تكامل مع أنظمة الشركة",
                "مدير حساب مخصص",
                "تدريب فريق العمل",
                "تقارير مخصصة"
              ]}
              buttonText="تواصل معنا"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
