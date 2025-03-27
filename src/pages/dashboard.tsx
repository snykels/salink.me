import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Link as LinkIcon, LineChart, Users, DollarSign } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import LinkManager from "@/components/dashboard/LinkManager";
import Analytics from "@/components/dashboard/Analytics";
import AccountSettings from "@/components/dashboard/AccountSettings";

const Dashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  // User data
  const user = {
    name: "محمد العتيبي",
    email: "mohammed@salink.me",
    username: "mohammed",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
  };

  // Dashboard data
  const dashboardData = {
    totalLinks: 24,
    totalClicks: 1248,
    activeLinks: 18,
    revenue: "SAR 450",
    recentLinks: [
      {
        id: "1",
        title: "إطلاق منتج جديد",
        url: "salink.me/product",
        clicks: 342,
        daysAgo: 3,
        tags: ["تسويق", "منتجات"],
        status: "نشط"
      },
      {
        id: "2",
        title: "عروض رمضان",
        url: "salink.me/ramadan",
        clicks: 528,
        daysAgo: 1,
        tags: ["مبيعات", "عروض"],
        status: "نشط"
      },
      {
        id: "3",
        title: "التسجيل في الندوة",
        url: "salink.me/webinar",
        clicks: 189,
        daysAgo: 5,
        tags: ["تعليم", "ندوات"],
        status: "نشط"
      },
      {
        id: "4",
        title: "استبيان رضا العملاء",
        url: "salink.me/survey",
        clicks: 97,
        daysAgo: 2,
        tags: ["استبيان", "عملاء"],
        status: "نشط"
      },
      {
        id: "5",
        title: "تحميل الكتاب الإلكتروني",
        url: "salink.me/ebook",
        clicks: 92,
        daysAgo: 4,
        tags: ["محتوى", "تحميلات"],
        status: "نشط"
      }
    ],
  };

  // Handle functions
  const handleLogout = () => {
    alert("تم تسجيل الخروج بنجاح");
  };

  const handleCreateLink = () => {
    alert("تم فتح نافذة إنشاء رابط جديد");
  };

  const handleEditLink = (id: string) => {
    alert(`تم فتح محرر الرابط رقم ${id}`);
  };

  const handleViewStats = (id: string) => {
    alert(`تم فتح إحصائيات الرابط رقم ${id}`);
  };

  const handleViewAllLinks = () => {
    setActiveTab("links");
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full h-full"
        >
          <TabsContent value="overview" className="h-full m-0 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{t("dashboard.overview.title")}</h1>
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700" onClick={handleCreateLink}>
                  <Plus className="h-4 w-4" />
                  إنشاء رابط جديد
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-green-100">
                  <CardContent className="p-6 flex flex-col">
                    <div className="text-sm text-muted-foreground mb-2">{t("dashboard.overview.totalLinks")}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold">{dashboardData.totalLinks}</div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <LinkIcon className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6 flex flex-col">
                    <div className="text-sm text-muted-foreground mb-2">{t("dashboard.overview.totalClicks")}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold">{dashboardData.totalClicks}</div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <LineChart className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6 flex flex-col">
                    <div className="text-sm text-muted-foreground mb-2">{t("dashboard.overview.activeLinks")}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold">{dashboardData.activeLinks}</div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6 flex flex-col">
                    <div className="text-sm text-muted-foreground mb-2">{t("dashboard.overview.revenue")}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold">{dashboardData.revenue}</div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Links */}
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{t("dashboard.overview.recentLinks")}</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={handleViewAllLinks}
                    >
                      {t("dashboard.overview.viewAll")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {dashboardData.recentLinks.map((link) => (
                      <div key={link.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                          <div className="font-medium">{link.title}</div>
                          <div className="text-sm text-muted-foreground">{link.url}</div>
                          <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-2">
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs flex items-center gap-1 rtl:flex-row-reverse">
                              <span>{link.clicks}</span>
                              <span>{t("dashboard.overview.clicks")}</span>
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs flex items-center gap-1 rtl:flex-row-reverse">
                              <span>{link.daysAgo}</span>
                              <span>{t("dashboard.overview.daysAgo")}</span>
                            </span>
                            {link.tags.map((tag, index) => (
                              <span key={index} className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs">
                              {link.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                            onClick={() => handleEditLink(link.id)}
                          >
                            {t("dashboard.overview.edit")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                            onClick={() => handleViewStats(link.id)}
                          >
                            {t("dashboard.overview.stats")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="links" className="h-full m-0 p-0">
            <LinkManager />
          </TabsContent>

          <TabsContent value="analytics" className="h-full m-0 p-0">
            <Analytics />
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0 p-0">
            <AccountSettings
              user={{
                name: user.name,
                email: user.email,
                username: user.username,
                avatar: user.avatarUrl || "",
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
