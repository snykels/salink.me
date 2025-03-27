import React, { useState, useEffect } from "react";
import { Link, Globe, Edit, Save, Trash2, Plus, Eye } from "lucide-react";
import LinkPreview from "./LinkPreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import ButtonCustomizer from "./ButtonCustomizer";
import PaymentIntegration from "./PaymentIntegration";

interface LinkEditorProps {
  linkData?: LinkData;
  onSave?: (data: LinkData) => void;
}

interface LinkData {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  buttonStyle?: any;
  paymentSettings?: any;
}

const defaultLinkData: LinkData = {
  originalUrl: "",
  shortUrl: "",
  title: "My Link",
  description: "Click here to visit my link",
  isActive: true,
};

const LinkEditor = ({
  linkData = defaultLinkData,
  onSave = () => {},
}: LinkEditorProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [showPreview, setShowPreview] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(linkData.buttonStyle || {});
  const [paymentSettings, setPaymentSettings] = useState(
    linkData.paymentSettings || {},
  );

  const form = useForm<LinkData>({
    defaultValues: linkData,
  });

  const handleSave = (data: LinkData) => {
    const updatedData = {
      ...data,
      buttonStyle,
      paymentSettings,
    };
    onSave(updatedData);
  };

  const handleButtonStyleSave = (style: any) => {
    setButtonStyle(style);
  };

  const handlePaymentSettingsSave = (settings: any) => {
    setPaymentSettings(settings);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Link Editor</CardTitle>
            <CardDescription>
              Create or edit your tree-structured link
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 mr-2"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "إخفاء المعاينة" : "معاينة"}
            </Button>
            <span className="text-sm text-gray-500">
              {form.watch("isActive") ? "Active" : "Inactive"}
            </span>
            <Switch
              checked={form.watch("isActive")}
              onCheckedChange={(checked) => form.setValue("isActive", checked)}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className={`grid ${showPreview ? 'grid-cols-2 gap-6' : 'grid-cols-1'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Payment</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="originalUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the full URL you want to shorten
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Short URL</FormLabel>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">
                          treelink.pro/
                        </div>
                        <FormControl>
                          <Input placeholder="my-custom-link" {...field} />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Customize your short URL (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My Link Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        A title for your link that will be displayed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a description for your link"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description of your link (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <ButtonCustomizer
              onSave={handleButtonStyleSave}
              initialStyle={buttonStyle}
            />
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <PaymentIntegration
              enabled={paymentSettings?.enabled || false}
              selectedGateway={paymentSettings?.gateway || ""}
              products={paymentSettings?.products || []}
              onSave={handlePaymentSettingsSave}
            />
          </TabsContent>
        </Tabs>
        
        {showPreview && (
          <div className="h-full">
            <LinkPreview 
              title={form.watch("title")}
              url={form.watch("originalUrl")}
              description={form.watch("description")}
              buttonStyle={buttonStyle}
              tags={[]}
            />
          </div>
        )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={form.handleSubmit(handleSave)}
          >
            <Save className="h-4 w-4" /> Save Link
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LinkEditor;
