import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BarChart, LineChart, PieChart, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsChartsProps {
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
  };
}

const AnalyticsCharts = ({
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
  },
}: AnalyticsChartsProps) => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "monthly",
  );

  return (
    <div className="w-full space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select defaultValue="30days">
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
      </div>

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

      <Tabs defaultValue="traffic">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="traffic" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Traffic</span>
          </TabsTrigger>
          <TabsTrigger value="geography" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            <span>Geography</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Devices</span>
          </TabsTrigger>
          <TabsTrigger value="conversions" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Conversions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Traffic Overview</CardTitle>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTimeRange("daily")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md",
                      timeRange === "daily"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setTimeRange("weekly")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md",
                      timeRange === "weekly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeRange("monthly")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md",
                      timeRange === "monthly"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <CardDescription>Click traffic over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                {/* Placeholder for actual chart */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-end justify-between px-4">
                    {data.clickStats[timeRange].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-primary w-12 rounded-t-md"
                          style={{
                            height: `${(value / Math.max(...data.clickStats[timeRange])) * 250}px`,
                          }}
                        />
                        <span className="text-xs mt-1">
                          {data.clickStats.labels[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Click distribution by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* Placeholder for actual chart */}
                <div className="space-y-4">
                  {data.geoData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-36 text-sm">{item.country}</div>
                      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(item.count / Math.max(...data.geoData.map((d) => d.count))) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="w-16 text-right text-sm ml-4">
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Traffic by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                {/* Placeholder for actual chart */}
                <div className="w-64 h-64 rounded-full border-8 border-muted relative">
                  {data.deviceData.map((item, index) => {
                    const total = data.deviceData.reduce(
                      (sum, d) => sum + d.count,
                      0,
                    );
                    const percentage = Math.round((item.count / total) * 100);

                    // Simple visual representation of pie chart segments
                    const colors = [
                      "bg-primary",
                      "bg-blue-400",
                      "bg-green-400",
                    ];
                    return (
                      <div key={index} className="flex items-center mt-4">
                        <div
                          className={`w-4 h-4 ${colors[index]} rounded-sm mr-2`}
                        />
                        <span className="text-sm">{item.device}</span>
                        <span className="text-sm ml-auto">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Performance</CardTitle>
              <CardDescription>Conversion rates by link</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* Placeholder for actual table */}
                <div className="w-full">
                  <div className="grid grid-cols-4 font-medium text-sm py-2 border-b">
                    <div>Link Name</div>
                    <div className="text-right">Clicks</div>
                    <div className="text-right">Conversions</div>
                    <div className="text-right">Rate</div>
                  </div>
                  {data.conversionData.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 text-sm py-3 border-b border-muted"
                    >
                      <div>{item.linkName}</div>
                      <div className="text-right">
                        {item.clicks.toLocaleString()}
                      </div>
                      <div className="text-right">
                        {item.conversions.toLocaleString()}
                      </div>
                      <div className="text-right font-medium">{item.rate}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsCharts;
