import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Tablet,
  RefreshCw
} from "lucide-react";

interface LinkPreviewProps {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  buttonStyle?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    fontSize?: string;
    padding?: string;
    icon?: string;
  };
}

const LinkPreview: React.FC<LinkPreviewProps> = ({
  title,
  url,
  description = "",
  tags = [],
  buttonStyle = {
    backgroundColor: "#4CAF50",
    textColor: "#FFFFFF",
    borderRadius: "4px",
    fontSize: "16px",
    padding: "10px 20px",
  },
}) => {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading when device changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeDevice]);

  const getDeviceWidth = () => {
    switch (activeDevice) {
      case "desktop":
        return "100%";
      case "tablet":
        return "768px";
      case "mobile":
        return "375px";
      default:
        return "100%";
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">معاينة مباشرة</h3>
        <div className="flex items-center gap-2">
          <Tabs value={activeDevice} onValueChange={(value) => setActiveDevice(value as any)}>
            <TabsList>
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline-block">سطح المكتب</span>
              </TabsTrigger>
              <TabsTrigger value="tablet">
                <Tablet className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline-block">لوحي</span>
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline-block">جوال</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden border border-gray-200">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col h-full">
            {/* Preview Header */}
            <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center">
              <div className="flex space-x-2 ml-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-sm text-gray-500 truncate">
                salink.me/{url.replace(/^https?:\/\//, '').split('/')[0]}
              </div>
            </div>

            {/* Preview Content */}
            <div 
              className="flex-1 bg-white p-6 overflow-auto transition-all duration-300 flex flex-col items-center justify-center"
              style={{ 
                maxWidth: getDeviceWidth(),
                margin: "0 auto",
                width: "100%"
              }}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">جاري تحميل المعاينة...</p>
                </div>
              ) : (
                <div className="w-full max-w-md mx-auto text-center">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  
                  {description && (
                    <p className="text-gray-600 mb-6">{description}</p>
                  )}
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    className="flex items-center justify-center gap-2 mx-auto"
                    style={{
                      backgroundColor: buttonStyle.backgroundColor,
                      color: buttonStyle.textColor,
                      borderRadius: buttonStyle.borderRadius,
                      fontSize: buttonStyle.fontSize,
                      padding: buttonStyle.padding,
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    فتح الرابط
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkPreview;
