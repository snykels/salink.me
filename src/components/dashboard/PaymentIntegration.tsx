import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CreditCard, DollarSign, Plus, Trash2 } from "lucide-react";

interface PaymentGateway {
  id: string;
  name: string;
  logo: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
}

interface PaymentIntegrationProps {
  enabled?: boolean;
  selectedGateway?: string;
  products?: Product[];
  onSave?: (data: any) => void;
}

const PaymentIntegration = ({
  enabled = false,
  selectedGateway = "",
  products = [
    { id: "1", name: "Basic Access", price: 9.99, currency: "SAR" },
    { id: "2", name: "Premium Access", price: 19.99, currency: "SAR" },
  ],
  onSave = () => {},
}: PaymentIntegrationProps) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [gateway, setGateway] = useState(selectedGateway);
  const [productList, setProductList] = useState<Product[]>(products);

  const paymentGateways: PaymentGateway[] = [
    {
      id: "myfatoorah",
      name: "My Fatoorah",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=myfatoorah",
    },
    {
      id: "applepay",
      name: "Apple Pay",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=applepay",
    },
    {
      id: "mada",
      name: "Mada",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=mada",
    },
  ];

  const handleAddProduct = () => {
    const newProduct = {
      id: `${Date.now()}`,
      name: "New Product",
      price: 0,
      currency: "SAR",
    };
    setProductList([...productList, newProduct]);
  };

  const handleRemoveProduct = (id: string) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  const handleProductChange = (
    id: string,
    field: keyof Product,
    value: string | number,
  ) => {
    setProductList(
      productList.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleSave = () => {
    onSave({
      enabled: isEnabled,
      gateway,
      products: productList,
    });
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Integration</CardTitle>
            <CardDescription>
              Configure payment options for this link
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {isEnabled ? "Enabled" : "Disabled"}
            </span>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </div>
      </CardHeader>

      {isEnabled && (
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select Payment Gateway</h3>
            <Select value={gateway} onValueChange={setGateway}>
              <SelectTrigger>
                <SelectValue placeholder="Select a payment gateway" />
              </SelectTrigger>
              <SelectContent>
                {paymentGateways.map((pg) => (
                  <SelectItem key={pg.id} value={pg.id}>
                    <div className="flex items-center gap-2">
                      <img
                        src={pg.logo}
                        alt={pg.name}
                        className="w-5 h-5 rounded-full"
                      />
                      {pg.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Products & Pricing</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            <div className="space-y-3">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 border rounded-md bg-gray-50"
                >
                  <div className="flex-1">
                    <Input
                      placeholder="Product name"
                      value={product.name}
                      onChange={(e) =>
                        handleProductChange(product.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center w-48 gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "price",
                          parseFloat(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className="w-20">
                    <Select
                      value={product.currency}
                      onValueChange={(value) =>
                        handleProductChange(product.id, "currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">SAR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {gateway && (
            <div className="p-4 border rounded-md bg-blue-50 border-blue-100">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 mt-0.5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-blue-700">
                    Payment Gateway Configuration
                  </h4>
                  <p className="text-sm text-blue-600">
                    Additional configuration for{" "}
                    {paymentGateways.find((pg) => pg.id === gateway)?.name} will
                    be required in your account settings.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      )}

      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>Save Payment Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentIntegration;
