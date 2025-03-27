import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Layers,
  Palette,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index: number;
  onClick?: () => void;
}

const FeatureCard = ({
  icon,
  title,
  description,
  className = "",
  index,
  onClick,
}: FeatureCardProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={cn(
        "flex flex-col items-start p-6 bg-gray-900 dark:bg-gray-950 rounded-xl border border-gray-800 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300",
        className,
      )}
    >
      <div className="p-3 mb-4 rounded-lg bg-green-500/10 text-green-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <Button 
        variant="ghost" 
        className="group mt-auto p-0 h-auto text-green-400 hover:text-green-300"
        onClick={onClick}
      >
        {t('common.more')}{" "}
        <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
};

interface FeatureSectionProps {
  className?: string;
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const FeatureSection = ({
  className = "",
  features,
}: FeatureSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // استخدام الترجمات إذا لم يتم تمرير الميزات
  const defaultFeatures = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: t('features.hierarchicalLinks.title'),
      description: t('features.hierarchicalLinks.description'),
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: t('features.buttonCustomization.title'),
      description: t('features.buttonCustomization.description'),
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: t('features.paymentIntegration.title'),
      description: t('features.paymentIntegration.description'),
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('features.advancedAnalytics.title'),
      description: t('features.advancedAnalytics.description'),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('features.integratedProtection.title'),
      description: t('features.integratedProtection.description'),
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('features.superiorPerformance.title'),
      description: t('features.superiorPerformance.description'),
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: t('features.multiLanguageSupport.title'),
      description: t('features.multiLanguageSupport.description'),
    },
  ];
  
  const featuresToRender = features || defaultFeatures;
  return (
    <section className={cn("py-24 bg-gray-950 relative overflow-hidden", className)}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#2bbb57_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10"></div>
      <div className="absolute top-40 -right-40 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('features.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('features.sectionSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresToRender.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              onClick={() => navigate('/features')}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Button 
            size="lg" 
            className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white border-0"
            onClick={() => navigate('/signup')}
          >
            {t('common.startFree')}
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
