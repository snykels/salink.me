import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const handleSignupSubmit = (values: any) => {
    console.log("Signup submitted:", values);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2" style={{ wordSpacing: isRTL ? '0.1em' : 'normal' }}>
              {t('auth.signup.title')}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400" style={{ wordSpacing: isRTL ? '0.1em' : 'normal' }}>
              {t('auth.signup.subtitle')}
            </p>
          </div>
          
          <div className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6 shadow-sm">
            <SignupForm onSubmit={handleSignupSubmit} />
            
            <div className={`mt-6 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-muted-foreground dark:text-gray-400" style={{ wordSpacing: isRTL ? '0.1em' : 'normal' }}>
                {t('auth.signup.haveAccount')}{" "}
                <a 
                  href="/login" 
                  className="text-primary dark:text-green-400 hover:text-primary/80 dark:hover:text-green-300 hover:underline"
                >
                  {t('auth.signup.login')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
