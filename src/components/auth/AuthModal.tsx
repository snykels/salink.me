import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: "login" | "signup";
  onLoginSuccess?: (userData: any) => void;
  onSignupSuccess?: (userData: any) => void;
  onForgotPassword?: () => void;
}

const AuthModal = ({
  isOpen = true,
  onOpenChange = () => {},
  defaultTab = "login",
  onLoginSuccess = () => {},
  onSignupSuccess = () => {},
  onForgotPassword = () => {},
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);

  const handleLoginSubmit = (values: any) => {
    // This would typically include API calls for authentication
    console.log("Login submitted:", values);
    onLoginSuccess(values);
  };

  const handleSignupSubmit = (values: any) => {
    // This would typically include API calls for registration
    console.log("Signup submitted:", values);
    onSignupSuccess(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={defaultTab}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <LoginForm
              onSubmit={handleLoginSubmit}
              onForgotPassword={onForgotPassword}
            />
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <SignupForm onSubmit={handleSignupSubmit} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
