import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  Home,
  Link as LinkIcon,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  User,
  FormInput,
  Scissors,
  Palette,
  CreditCard,
  LineChart,
  KeyRound,
  Menu,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout?: () => void;
}

const Sidebar = ({
  user = {
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "",
  },
  onLogout = () => console.log("Logout clicked"),
}: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const navSections = [
    {
      title: t("dashboard.sidebar.overview"),
      items: [
        {
          name: t("dashboard.sidebar.overview"),
          path: "/dashboard",
          icon: <Home className="h-5 w-5" />,
        },
      ],
    },
    {
      title: t("dashboard.sidebar.linkManagement"),
      items: [
        {
          name: t("dashboard.sidebar.myLinks"),
          path: "/mylinks",
          icon: <LinkIcon className="h-5 w-5" />,
        },
        {
          name: t("dashboard.sidebar.formBuilder"),
          path: "/dashboard/form-builder",
          icon: <FormInput className="h-5 w-5" />,
        },
        {
          name: t("dashboard.sidebar.linkShortener"),
          path: "/dashboard/link-shortener",
          icon: <Scissors className="h-5 w-5" />,
        },
        {
          name: t("dashboard.sidebar.pageCustomizer"),
          path: "/dashboard/page-customizer",
          icon: <Palette className="h-5 w-5" />,
        },
      ],
    },
    {
      title: t("dashboard.sidebar.insights"),
      items: [
        {
          name: t("dashboard.sidebar.analytics"),
          path: "/dashboard/analytics",
          icon: <LineChart className="h-5 w-5" />,
        },
      ],
    },
    {
      title: t("dashboard.sidebar.settings"),
      items: [
        {
          name: t("dashboard.sidebar.settings"),
          path: "/dashboard/settings",
          icon: <Settings className="h-5 w-5" />,
        },
        {
          name: t("dashboard.sidebar.apiSettings"),
          path: "/dashboard/api-settings",
          icon: <KeyRound className="h-5 w-5" />,
        },
        {
          name: t("dashboard.sidebar.paymentGateways"),
          path: "/dashboard/payment-gateways",
          icon: <CreditCard className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <div className={cn(
      "flex h-full flex-col bg-background border-r p-4 transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[280px]"
    )}>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="min-w-8 min-h-8 flex items-center justify-center">
            <img src="/favicon.png" alt="SaLink Logo" className="h-8 w-8 object-contain" />
          </div>
          {!collapsed && <h1 className="text-xl font-bold">SaLink.me</h1>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <Separator className="my-4" />

      <nav className="space-y-6 flex-1 mt-4">
        {navSections.map((section, index) => (
          <div key={index} className="space-y-1">
            {!collapsed && (
              <h2 className="text-xs uppercase font-semibold text-muted-foreground px-3 mb-2">
                {section.title}
              </h2>
            )}
            {section.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md py-2 text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-2" : "gap-3 px-3",
                  currentPath === item.path
                    ? "bg-green-100 text-green-800"
                    : "text-muted-foreground hover:bg-green-50 hover:text-green-700",
                )}
                title={collapsed ? item.name : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <Separator className="my-4" />

      <div className="mt-auto">
        <TooltipProvider>
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Account options</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{user.name}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
