import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { 
  Plus, 
  Search, 
  Filter, 
  Link as LinkIcon, 
  Calendar, 
  Tag, 
  Lock, 
  Globe, 
  Smartphone, 
  Code, 
  Trash2, 
  Edit, 
  Copy, 
  BarChart2, 
  Eye, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
  tags: string[];
  status: "active" | "expired" | "scheduled";
  isPasswordProtected: boolean;
  isGeoTargeted: boolean;
  isDeviceTargeted: boolean;
  isOneTimeUse: boolean;
  order?: number;
}

const MyLinks = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newLinkData, setNewLinkData] = useState({
    title: "",
    url: "",
    expiresAt: "",
    tags: "",
    isPasswordProtected: false,
    isGeoTargeted: false,
    isDeviceTargeted: false,
    isOneTimeUse: false,
  });

  // User data
  const user = {
    name: "Mohammed Otaibi",
    email: "mohammed@salink.me",
    username: "mohammed",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
  };

  // Drag and drop refs
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLinkId, setDraggedLinkId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Sample links data
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "1",
      title: "Personal Website",
      url: "https://mohammedotaibi.com",
      clicks: 1245,
      createdAt: "2025-02-15",
      tags: ["personal", "portfolio"],
      status: "active",
      isPasswordProtected: false,
      isGeoTargeted: false,
      isDeviceTargeted: false,
      isOneTimeUse: false,
    },
    {
      id: "2",
      title: "Twitter Profile",
      url: "https://twitter.com/mohammed",
      clicks: 876,
      createdAt: "2025-02-20",
      tags: ["social", "twitter"],
      status: "active",
      isPasswordProtected: false,
      isGeoTargeted: false,
      isDeviceTargeted: false,
      isOneTimeUse: false,
    },
    {
      id: "3",
      title: "Latest Blog Post",
      url: "https://mohammedotaibi.com/blog/latest",
      clicks: 432,
      createdAt: "2025-03-01",
      tags: ["blog", "content"],
      status: "active",
      isPasswordProtected: false,
      isGeoTargeted: false,
      isDeviceTargeted: false,
      isOneTimeUse: false,
    },
    {
      id: "4",
      title: "Limited Time Offer",
      url: "https://store.example.com/special-offer",
      clicks: 289,
      createdAt: "2025-03-10",
      expiresAt: "2025-04-10",
      tags: ["promotion", "limited"],
      status: "active",
      isPasswordProtected: true,
      isGeoTargeted: true,
      isDeviceTargeted: false,
      isOneTimeUse: false,
    },
    {
      id: "5",
      title: "Exclusive Content",
      url: "https://mohammedotaibi.com/exclusive",
      clicks: 156,
      createdAt: "2025-03-15",
      tags: ["exclusive", "premium"],
      status: "active",
      isPasswordProtected: true,
      isGeoTargeted: false,
      isDeviceTargeted: false,
      isOneTimeUse: false,
    },
    {
      id: "6",
      title: "Mobile App Download",
      url: "https://play.google.com/store/apps/myapp",
      clicks: 723,
      createdAt: "2025-03-05",
      tags: ["app", "mobile"],
      status: "active",
      isPasswordProtected: false,
      isGeoTargeted: false,
      isDeviceTargeted: true,
      isOneTimeUse: false,
    },
    {
      id: "7",
      title: "One-time Access Link",
      url: "https://mohammedotaibi.com/one-time-access",
      clicks: 1,
      createdAt: "2025-03-20",
      tags: ["secure", "one-time"],
      status: "expired",
      isPasswordProtected: false,
      isGeoTargeted: false,
      isDeviceTargeted: false,
      isOneTimeUse: true,
    },
  ]);

  // All unique tags from links
  const allTags = Array.from(new Set(links.flatMap(link => link.tags)));

  // Handle functions
  const handleLogout = () => {
    alert("Logged out successfully");
  };

  const handleCreateLink = () => {
    const newLink: LinkItem = {
      id: `${links.length + 1}`,
      title: newLinkData.title,
      url: newLinkData.url,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: newLinkData.expiresAt || undefined,
      tags: newLinkData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: "active",
      isPasswordProtected: newLinkData.isPasswordProtected,
      isGeoTargeted: newLinkData.isGeoTargeted,
      isDeviceTargeted: newLinkData.isDeviceTargeted,
      isOneTimeUse: newLinkData.isOneTimeUse,
    };

    setLinks([newLink, ...links]);
    setIsCreateDialogOpen(false);
    setNewLinkData({
      title: "",
      url: "",
      expiresAt: "",
      tags: "",
      isPasswordProtected: false,
      isGeoTargeted: false,
      isDeviceTargeted: false,
      isOneTimeUse: false,
    });
  };

  const handleDeleteLink = (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(`https://salink.me/${url}`);
    alert("Link copied to clipboard!");
  };

  const handleViewLink = (url: string) => {
    window.open(`https://salink.me/${url}`, "_blank");
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number, link: LinkItem) => {
    dragItem.current = index;
    setIsDragging(true);
    setDraggedLinkId(link.id);
    
    // Set drag image
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", link.id);
    }
    
    // Show preview
    setShowPreview(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
    
    // Update preview position
    if (previewRef.current && dragItem.current !== null && dragOverItem.current !== null) {
      const cards = document.querySelectorAll('.link-card');
      if (cards[dragOverItem.current]) {
        const rect = cards[dragOverItem.current].getBoundingClientRect();
        previewRef.current.style.top = `${rect.top}px`;
        previewRef.current.style.left = `${rect.left}px`;
        previewRef.current.style.width = `${rect.width}px`;
        previewRef.current.style.height = `${rect.height}px`;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedLinkId(null);
    setShowPreview(false);
    
    // Reorder links
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const _links = [...links];
      const draggedItemContent = _links[dragItem.current];
      _links.splice(dragItem.current, 1);
      _links.splice(dragOverItem.current, 0, draggedItemContent);
      
      // Update order property
      const reorderedLinks = _links.map((link, index) => ({
        ...link,
        order: index
      }));
      
      setLinks(reorderedLinks);
      
      // Show toast notification
      toast({
        title: "تم إعادة ترتيب الروابط",
        description: "تم حفظ الترتيب الجديد للروابط بنجاح",
      });
    }
    
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Filter links based on search query, selected tags, and status
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         link.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => link.tags.includes(tag));
    
    const matchesStatus = selectedStatus === "all" || link.status === selectedStatus;
    
    return matchesSearch && matchesTags && matchesStatus;
  });

  // Get links for the active tab
  const getTabLinks = () => {
    switch (activeTab) {
      case "active":
        return filteredLinks.filter(link => link.status === "active");
      case "expired":
        return filteredLinks.filter(link => link.status === "expired");
      case "scheduled":
        return filteredLinks.filter(link => link.status === "scheduled");
      default:
        return filteredLinks;
    }
  };

  const tabLinks = getTabLinks();

  return (
    <div className="flex h-screen w-full bg-background">
      <Toaster />
      {/* Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{t("dashboard.myLinks.title")}</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4" />
                  {t("dashboard.myLinks.createNewLink")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New Link</DialogTitle>
                  <DialogDescription>
                    Create a new shortened link with custom options.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newLinkData.title}
                      onChange={(e) => setNewLinkData({...newLinkData, title: e.target.value})}
                      className="col-span-3"
                      placeholder="My Awesome Link"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      URL
                    </Label>
                    <Input
                      id="url"
                      value={newLinkData.url}
                      onChange={(e) => setNewLinkData({...newLinkData, url: e.target.value})}
                      className="col-span-3"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiresAt" className="text-right">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiresAt"
                      type="date"
                      value={newLinkData.expiresAt}
                      onChange={(e) => setNewLinkData({...newLinkData, expiresAt: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tags" className="text-right">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      value={newLinkData.tags}
                      onChange={(e) => setNewLinkData({...newLinkData, tags: e.target.value})}
                      className="col-span-3"
                      placeholder="personal, social, blog (comma separated)"
                    />
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isPasswordProtected" 
                        checked={newLinkData.isPasswordProtected}
                        onCheckedChange={(checked) => 
                          setNewLinkData({...newLinkData, isPasswordProtected: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="isPasswordProtected"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Password Protected
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isGeoTargeted" 
                        checked={newLinkData.isGeoTargeted}
                        onCheckedChange={(checked) => 
                          setNewLinkData({...newLinkData, isGeoTargeted: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="isGeoTargeted"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Geo Targeting
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isDeviceTargeted" 
                        checked={newLinkData.isDeviceTargeted}
                        onCheckedChange={(checked) => 
                          setNewLinkData({...newLinkData, isDeviceTargeted: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="isDeviceTargeted"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Device Targeting
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isOneTimeUse" 
                        checked={newLinkData.isOneTimeUse}
                        onCheckedChange={(checked) => 
                          setNewLinkData({...newLinkData, isOneTimeUse: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="isOneTimeUse"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        One-time Use
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateLink}>Create Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-gray-100" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-md mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status-filter" className="block mb-2">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block mb-2">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge 
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Links</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {tabLinks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <LinkIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No links found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery || selectedTags.length > 0 || selectedStatus !== "all" 
                      ? "Try adjusting your search or filters"
                      : "Create your first link to get started"}
                  </p>
                  {searchQuery || selectedTags.length > 0 || selectedStatus !== "all" ? (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedTags([]);
                        setSelectedStatus("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  ) : (
                    <DialogTrigger asChild>
                      <Button>Create Link</Button>
                    </DialogTrigger>
                  )}
                </div>
              ) : (
                <div className="space-y-4 relative">
                  {showPreview && (
                    <div 
                      ref={previewRef}
                      className="absolute border-2 border-dashed border-green-500 rounded-md bg-green-50/30 z-10 pointer-events-none"
                    />
                  )}
                  {tabLinks.map((link, index) => (
                    <Card 
                      key={link.id} 
                      className={`overflow-hidden link-card transition-all ${isDragging && draggedLinkId === link.id ? 'opacity-50' : 'opacity-100'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index, link)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-medium truncate">{link.title}</h3>
                              {link.isPasswordProtected && (
                                <span title="Password Protected">
                                  <Lock className="h-4 w-4 text-amber-500" />
                                </span>
                              )}
                              {link.isGeoTargeted && (
                                <span title="Geo Targeted">
                                  <Globe className="h-4 w-4 text-blue-500" />
                                </span>
                              )}
                              {link.isDeviceTargeted && (
                                <span title="Device Targeted">
                                  <Smartphone className="h-4 w-4 text-purple-500" />
                                </span>
                              )}
                              {link.isOneTimeUse && (
                                <span title="One-time Use">
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate mb-2">
                              <span className="font-medium">salink.me/</span>
                              {link.url.replace(/^https?:\/\//, '').split('/')[0]}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {link.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-100">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <BarChart2 className="h-4 w-4" />
                                <span>{link.clicks} clicks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Created {link.createdAt}</span>
                              </div>
                              {link.expiresAt && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Expires {link.expiresAt}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                              onClick={() => handleCopyLink(link.url.replace(/^https?:\/\//, '').split('/')[0])}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                              onClick={() => handleViewLink(link.url.replace(/^https?:\/\//, '').split('/')[0])}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                            >
                              <BarChart2 className="h-4 w-4 mr-1" />
                              Stats
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                              onClick={() => handleDeleteLink(link.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyLinks;
