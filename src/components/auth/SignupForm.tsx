import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit?: (values: SignupFormValues) => void;
  isLoading?: boolean;
}

const SignupForm = ({
  onSubmit = () => {},
  isLoading = false,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const handleSubmit = (values: SignupFormValues) => {
    onSubmit(values);
  };

  return (
    <div className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
        {t('auth.signup.formTitle')}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">
                  {t('auth.signup.email')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('auth.signup.emailPlaceholder')}
                    type="email"
                    className={isRTL ? 'text-right' : 'text-left'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">
                  {t('auth.signup.username')}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('auth.signup.usernamePlaceholder')} 
                    className={isRTL ? 'text-right' : 'text-left'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">
                  {t('auth.signup.password')}
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder={t('auth.signup.passwordPlaceholder')}
                      type={showPassword ? "text" : "password"}
                      className={isRTL ? 'text-right' : 'text-left'}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-2.5 text-gray-400`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">
                  {t('auth.signup.confirmPassword')}
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                      type={showConfirmPassword ? "text" : "password"}
                      className={isRTL ? 'text-right' : 'text-left'}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-2.5 text-gray-400`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className={`flex flex-row items-start ${isRTL ? 'space-x-reverse' : ''} space-x-3 space-y-0 rounded-md p-4`}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="dark:text-gray-200">
                    {t('auth.signup.acceptTerms')}
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 dark:bg-green-600 dark:hover:bg-green-700 text-white" 
            disabled={isLoading}
          >
            {isLoading ? t('auth.signup.submitting') : t('auth.signup.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
