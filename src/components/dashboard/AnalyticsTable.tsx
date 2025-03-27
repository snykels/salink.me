import React, { useState } from "react";
import { Download, Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsData {
  id: string;
  url: string;
  clicks: number;
  location: string;
  device: string;
  browser: string;
  date: string;
  conversion: boolean;
  revenue?: number;
}

interface AnalyticsTableProps {
  data?: AnalyticsData[];
  onExport?: () => void;
  onFilter?: (filters: Record<string, any>) => void;
}

const AnalyticsTable = ({
  data = [
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
  onExport = () => console.log("Exporting data..."),
  onFilter = (filters) => console.log("Filtering with:", filters),
}: AnalyticsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [sortColumn, setSortColumn] = useState<keyof AnalyticsData>("clicks");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter data based on search term and date range
  const filteredData = data.filter((item) => {
    const matchesSearch = item.url
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (dateRange === "all") return matchesSearch;

    const itemDate = new Date(item.date);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (dateRange === "week" && itemDate >= weekAgo) return matchesSearch;
    if (dateRange === "month" && itemDate >= monthAgo) return matchesSearch;

    return false;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn === "clicks" || sortColumn === "revenue") {
      const aValue = a[sortColumn] || 0;
      const bValue = b[sortColumn] || 0;
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      const aValue = String(a[sortColumn] || "");
      const bValue = String(b[sortColumn] || "");
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  // Calculate totals for footer
  const totalClicks = filteredData.reduce((sum, item) => sum + item.clicks, 0);
  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + (item.revenue || 0),
    0,
  );
  const conversionRate = Math.round(
    (filteredData.filter((item) => item.conversion).length /
      filteredData.length) *
      100,
  );

  const handleSort = (column: keyof AnalyticsData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilter({ searchTerm, dateRange })}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableCaption>
            Analytics data for your TreeLink Pro links
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("url")}
                >
                  URL
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("clicks")}
                >
                  Clicks
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  Location
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("device")}
                >
                  Device
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("conversion")}
                >
                  Conversion
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("revenue")}
                >
                  Revenue
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.url}</TableCell>
                  <TableCell>{row.clicks.toLocaleString()}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.device}</TableCell>
                  <TableCell>
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${row.conversion ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {row.conversion ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {row.revenue ? `$${row.revenue.toLocaleString()}` : "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Totals</TableCell>
              <TableCell>{totalClicks.toLocaleString()}</TableCell>
              <TableCell colSpan={3}></TableCell>
              <TableCell>{conversionRate}%</TableCell>
              <TableCell>${totalRevenue.toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default AnalyticsTable;
