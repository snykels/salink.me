import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void;
  onForgotPassword?: () => void;
}

const LoginForm = ({
  onSubmit = () => {},
  onForgotPassword = () => {},
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values);
  };

  return (
    <div className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
        {t('auth.login.formTitle')}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">
                  {t('auth.login.email')}
                </FormLabel>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 h-4 w-4 text-gray-400`} />
                  <FormControl>
                    <Input
                      placeholder={t('auth.login.emailPlaceholder')}
                      className={isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      {...field}
                    />
                  </FormControl>
                </div>
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
                  {t('auth.login.password')}
                </FormLabel>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 h-4 w-4 text-gray-400`} />
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.login.passwordPlaceholder')}
                      className={isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-2.5 text-gray-400`}
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

          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className={`flex flex-row items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} space-y-0`}>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      {t('auth.login.rememberMe')}
                    </Label>
                  </FormItem>
                )}
              />
            </div>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-medium text-primary dark:text-green-400 hover:text-primary/80 dark:hover:text-green-300"
            >
              {t('auth.login.forgotPassword')}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 dark:bg-green-600 dark:hover:bg-green-700 text-white"
          >
            {t('auth.login.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
