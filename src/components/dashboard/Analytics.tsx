import React, { useState } from "react";
import AnalyticsCharts from "./AnalyticsCharts";
import AnalyticsTable from "./AnalyticsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Calendar,
  Download,
  Filter,
  PieChart,
  BarChart,
  LineChart,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AnalyticsProps {
  data?: {
    clickStats: {
      daily: number[];
      weekly: number[];
      monthly: number[];
      labels: string[];
    };
    geoData: {
      country: string;
      count: number;
    }[];
    deviceData: {
      device: string;
      count: number;
    }[];
    conversionData: {
      linkId: string;
      linkName: string;
      clicks: number;
      conversions: number;
      rate: number;
    }[];
    tableData: {
      id: string;
      url: string;
      clicks: number;
      location: string;
      device: string;
      browser: string;
      date: string;
      conversion: boolean;
      revenue?: number;
    }[];
  };
}

const Analytics = ({
  data = {
    clickStats: {
      daily: [12, 32, 27, 45, 21, 33, 25, 15, 28, 33, 42, 30],
      weekly: [120, 180, 150, 210, 160, 190, 140, 170, 130, 220, 200, 180],
      monthly: [450, 620, 580, 700, 540, 800, 750, 680, 720, 810, 760, 850],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    geoData: [
      { country: "Saudi Arabia", count: 450 },
      { country: "UAE", count: 230 },
      { country: "Kuwait", count: 180 },
      { country: "Qatar", count: 120 },
      { country: "Bahrain", count: 90 },
    ],
    deviceData: [
      { device: "Mobile", count: 680 },
      { device: "Desktop", count: 320 },
      { device: "Tablet", count: 120 },
    ],
    conversionData: [
      {
        linkId: "1",
        linkName: "Product A",
        clicks: 1200,
        conversions: 320,
        rate: 26.7,
      },
      {
        linkId: "2",
        linkName: "Product B",
        clicks: 850,
        conversions: 210,
        rate: 24.7,
      },
      {
        linkId: "3",
        linkName: "Service C",
        clicks: 620,
        conversions: 180,
        rate: 29.0,
      },
      {
        linkId: "4",
        linkName: "Landing Page D",
        clicks: 1500,
        conversions: 390,
        rate: 26.0,
      },
    ],
    tableData: [
      {
        id: "1",
        url: "treelink.pro/marketing-campaign",
        clicks: 1245,
        location: "Riyadh, SA",
        device: "Mobile",
        browser: "Chrome",
        date: "2023-06-15",
        conversion: true,
        revenue: 450,
      },
      {
        id: "2",
        url: "treelink.pro/summer-sale",
        clicks: 876,
        location: "Jeddah, SA",
        device: "Desktop",
        browser: "Safari",
        date: "2023-06-14",
        conversion: false,
      },
      {
        id: "3",
        url: "treelink.pro/new-product",
        clicks: 532,
        location: "Dammam, SA",
        device: "Tablet",
        browser: "Firefox",
        date: "2023-06-13",
        conversion: true,
        revenue: 275,
      },
      {
        id: "4",
        url: "treelink.pro/webinar-signup",
        clicks: 1023,
        location: "Mecca, SA",
        device: "Mobile",
        browser: "Chrome",
        date: "2023-06-12",
        conversion: true,
        revenue: 180,
      },
      {
        id: "5",
        url: "treelink.pro/ebook-download",
        clicks: 421,
        location: "Medina, SA",
        device: "Desktop",
        browser: "Edge",
        date: "2023-06-11",
        conversion: false,
      },
    ],
  },
}: AnalyticsProps) => {
  const [activeView, setActiveView] = useState<"charts" | "table">("charts");
  const [dateRange, setDateRange] = useState("30days");

  const handleExportData = () => {
    console.log("Exporting analytics data...");
    // In a real implementation, this would generate and download a CSV/Excel file
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    console.log("Applying filters:", filters);
    // In a real implementation, this would update the data based on filters
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track and analyze your link performance and conversions.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <Tabs
              value={activeView}
              onValueChange={(value) =>
                setActiveView(value as "charts" | "table")
              }
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Charts</span>
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Table View</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={handleExportData}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24,532</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unique Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18,453</div>
              <p className="text-xs text-muted-foreground mt-1">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">26.4%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">SAR 12,845</div>
              <p className="text-xs text-muted-foreground mt-1">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="mt-6">
          <Tabs value={activeView} className="w-full">
            <TabsContent value="charts">
              <AnalyticsCharts
                data={{
                  clickStats: data.clickStats,
                  geoData: data.geoData,
                  deviceData: data.deviceData,
                  conversionData: data.conversionData,
                }}
              />
            </TabsContent>
            <TabsContent value="table">
              <AnalyticsTable
                data={data.tableData}
                onExport={handleExportData}
                onFilter={handleFilterChange}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
