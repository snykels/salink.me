import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, MessageSquare, FileText, Home } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import { Link } from "react-router-dom";

const Help = () => {
  const { t } = useTranslation();
  const [isSubdomain, setIsSubdomain] = useState(false);
  
  // التحقق مما إذا كان المستخدم في النطاق الفرعي help.salink.me
  useEffect(() => {
    const hostname = window.location.hostname;
    setIsSubdomain(hostname === 'help.salink.me');
  }, []);
  
  // عرض واجهة مختلفة للنطاق الفرعي
  if (isSubdomain) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950 dark:bg-gray-950">
        {/* شريط تنقل مبسط للنطاق الفرعي */}
        <header className="bg-gray-900 dark:bg-gray-950 border-b border-gray-800 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://i.postimg.cc/Wb9qKg7Y/logo.png" 
                  alt="Salink Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-white text-xl font-semibold mr-2">{t('help.title')}</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Link to="/" className="text-gray-300 hover:text-green-400 flex items-center">
                <Home className="h-5 w-5 ml-2" />
                {t('common.home')}
              </Link>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          <div className="py-20 bg-gray-950 dark:bg-gray-950 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('help.title')}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
              {t('help.subtitle')}
            </p>
            
            <div className="max-w-2xl mx-auto px-4 relative">
              <Input 
                placeholder={t('help.searchPlaceholder')}
                className="bg-gray-900 border-gray-700 h-12 pl-12 text-white"
              />
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div className="container mx-auto px-4 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 text-center hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('help.supportOptions.chat.title')}</h3>
                <p className="text-gray-400 mb-6">{t('help.supportOptions.chat.description')}</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {t('help.supportOptions.chat.cta')}
                </Button>
              </div>
              
              <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 text-center hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('help.supportOptions.email.title')}</h3>
                <p className="text-gray-400 mb-6">{t('help.supportOptions.email.description')}</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {t('help.supportOptions.email.cta')}
                </Button>
              </div>
              
              <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 border border-gray-800 text-center hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('help.supportOptions.docs.title')}</h3>
                <p className="text-gray-400 mb-6">{t('help.supportOptions.docs.description')}</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {t('help.supportOptions.docs.cta')}
                </Button>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('help.faq.title')}</h2>
              
              <Accordion type="single" collapsible className="bg-gray-900 dark:bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <AccordionItem value="item-1" className="border-b border-gray-800">
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                    {t('help.faq.questions.createAccount.question')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">
                    {t('help.faq.questions.createAccount.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-b border-gray-800">
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                    {t('help.faq.questions.createShortLink.question')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">
                    {t('help.faq.questions.createShortLink.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-b border-gray-800">
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                    {t('help.faq.questions.customizeButtons.question')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">
                    {t('help.faq.questions.customizeButtons.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-b border-gray-800">
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                    {t('help.faq.questions.integratePayments.question')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">
                    {t('help.faq.questions.integratePayments.answer')}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                    {t('help.faq.questions.accessAnalytics.question')}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">
                    {t('help.faq.questions.accessAnalytics.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
  
  // عرض الواجهة العادية للموقع الرئيسي
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 dark:bg-gray-950">
      <Navbar />
      
      <main className="flex-1">
        <div className="py-20 bg-gray-950 dark:bg-gray-950 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('help.title')}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
            {t('help.subtitle')}
          </p>
          
          <div className="max-w-2xl mx-auto px-4 relative">
            <Input 
              placeholder={t('help.searchPlaceholder')}
              className="bg-gray-900 border-gray-700 h-12 pl-12 text-white"
            />
            <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">الدردشة المباشرة</h3>
              <p className="text-gray-400 mb-6">تحدث مع فريق الدعم الفني مباشرة للحصول على مساعدة فورية</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                ابدأ الدردشة
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-400 mb-6">أرسل لنا بريدًا إلكترونيًا وسنرد عليك في غضون 24 ساعة</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                أرسل بريدًا إلكترونيًا
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(43,187,87,0.15)] transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">التوثيق</h3>
              <p className="text-gray-400 mb-6">استكشف دليل المستخدم المفصل والأدلة التقنية</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                عرض التوثيق
              </Button>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">الأسئلة الشائعة</h2>
            
            <Accordion type="single" collapsible className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <AccordionItem value="item-1" className="border-b border-gray-800">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                  كيف يمكنني إنشاء حساب جديد؟
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  يمكنك إنشاء حساب جديد بالنقر على زر "إنشاء حساب" في الصفحة الرئيسية. ستحتاج إلى تقديم بريدك الإلكتروني وإنشاء كلمة مرور. بعد ذلك، ستتلقى رسالة تأكيد على بريدك الإلكتروني لتفعيل حسابك.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b border-gray-800">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                  كيف يمكنني إنشاء رابط مختصر؟
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  بعد تسجيل الدخول إلى حسابك، انتقل إلى لوحة التحكم والنقر على "إنشاء رابط جديد". أدخل الرابط الأصلي واختر اسمًا مخصصًا إذا كنت ترغب في ذلك. يمكنك أيضًا تنظيم الروابط في مجلدات هرمية لسهولة الإدارة.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-b border-gray-800">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                  كيف يمكنني تخصيص أزرار الروابط؟
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  في لوحة التحكم، حدد الرابط الذي ترغب في تخصيصه وانقر على "تخصيص". يمكنك اختيار من بين مجموعة متنوعة من الأنماط والألوان والتأثيرات لتخصيص مظهر الزر. يمكنك أيضًا إضافة أيقونات وتغيير الخطوط لتتناسب مع هويتك البصرية.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border-b border-gray-800">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                  كيف يمكنني دمج المدفوعات مع روابطي؟
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  يتطلب دمج المدفوعات الاشتراك في خطة الاحترافي أو المؤسسات. بعد الترقية، انتقل إلى إعدادات الرابط وقم بتفعيل خيار "دمج المدفوعات". يمكنك بعد ذلك ربط حسابك ببوابات الدفع المدعومة مثل مدى وأبل باي وماي فاتورة، وتحديد المبلغ والعملة ووصف المنتج.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-green-400">
                  كيف يمكنني الوصول إلى تحليلات الروابط؟
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  يمكنك الوصول إلى تحليلات الروابط من خلال لوحة التحكم بالنقر على علامة التبويب "التحليلات". ستجد هناك إحصاءات مفصلة حول عدد النقرات والموقع الجغرافي للزوار والأجهزة المستخدمة ومعلومات عن المدفوعات إذا كنت قد قمت بتفعيل هذه الميزة.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
