import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { motion } from "framer-motion";
import { ArrowRight, Link as LinkIcon, Layers, Palette, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  ctaPrimaryText,
  ctaSecondaryText,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // استخدام الوظائف المخصصة إذا تم تمريرها، وإلا استخدام الوظائف الافتراضية
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      navigate('/signup');
    }
  };
  
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      navigate('/features');
    }
  };
  
  // استخدام الترجمات إذا لم يتم تمرير النصوص
  const heroTitle = title || t('hero.title');
  const heroSubtitle = subtitle || t('hero.subtitle');
  const heroPrimaryText = ctaPrimaryText || t('common.getStarted');
  const heroSecondaryText = ctaSecondaryText || t('common.learnMore');

  // تحديث اتجاه النص بناءً على اللغة الحالية
  const isRTL = i18n.dir() === 'rtl';
  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2bbb57_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Green accent glow */}
      <div className="absolute top-20 -left-24 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container relative mx-auto px-4 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-8 text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={isRTL ? "text-right" : "text-left"}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {heroTitle}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl" style={{ wordSpacing: isRTL ? '0.1em' : 'normal' }}>
              {heroSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              onClick={handlePrimaryClick}
              className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
              {heroPrimaryText}
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleSecondaryClick}
              className="border-green-600 text-green-400 hover:bg-green-900/20"
            >
              {heroSecondaryText}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-end gap-8 pt-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">دمج مدفوعات</span>
              <CreditCard className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">أزرار مخصصة</span>
              <Palette className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">هيكل هرمي</span>
              <Layers className="h-5 w-5 text-green-400" />
            </div>
          </motion.div>
        </div>

        {/* Right side - Visual representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 relative min-h-[500px] w-full"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Tree structure visualization */}
            <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-800 shadow-[0_0_15px_rgba(43,187,87,0.15)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-right">
                  <h3 className="font-medium text-white">روابط هرمية</h3>
                  <p className="text-sm text-gray-400">
                    تنظيم هرمي للروابط
                  </p>
                </div>
              </div>

              {/* Sample tree structure */}
              <div className="space-y-3 text-right">
                <div className="pr-0 py-2 border-r-2 border-green-500/20">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="font-medium text-white">رابط رئيسي</span>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pr-6 py-2 border-r-2 border-green-500/20">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-gray-300">رابط فرعي 1</span>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pr-6 py-2 border-r-2 border-green-500/20">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-gray-300">رابط فرعي 2</span>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="pr-6 mt-3">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm text-gray-400">رابط متداخل</span>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="pr-0 py-2 border-r-2 border-green-500/20">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="font-medium text-white">رابط رئيسي آخر</span>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              
              {/* Button preview */}
              <div className="mt-8 border-t border-gray-800 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Palette className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium text-white">أزرار مخصصة</h3>
                    <p className="text-sm text-gray-400">
                      تصميم فريد لكل رابط
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-end">
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm">
                    زر مخصص 1
                  </button>
                  <button className="px-4 py-2 rounded-md bg-gray-800 border border-green-500/50 text-green-400 text-sm">
                    زر مخصص 2
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white text-sm shadow-[0_0_10px_rgba(43,187,87,0.3)]">
                    زر مخصص 3
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
