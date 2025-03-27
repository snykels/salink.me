import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Sparkles, Type, Layers, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ButtonCustomizerProps {
  onSave?: (buttonStyle: ButtonStyle) => void;
  initialStyle?: ButtonStyle;
}

interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
  borderWidth: number;
  borderColor: string;
  animation: string;
  gradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  shadow: boolean;
  shadowSize: string;
}

const defaultButtonStyle: ButtonStyle = {
  backgroundColor: "#3b82f6",
  textColor: "#ffffff",
  borderRadius: 8,
  fontSize: 16,
  fontFamily: "Inter",
  borderWidth: 0,
  borderColor: "#000000",
  animation: "none",
  gradient: false,
  gradientFrom: "#3b82f6",
  gradientTo: "#8b5cf6",
  shadow: true,
  shadowSize: "md",
};

const ButtonCustomizer = ({
  onSave = () => {},
  initialStyle = defaultButtonStyle,
}: ButtonCustomizerProps) => {
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>(initialStyle);
  const [activeTab, setActiveTab] = useState("colors");

  const handleStyleChange = (property: keyof ButtonStyle, value: any) => {
    setButtonStyle((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const getButtonStyles = () => {
    const styles: React.CSSProperties = {
      backgroundColor: buttonStyle.gradient
        ? "transparent"
        : buttonStyle.backgroundColor,
      color: buttonStyle.textColor,
      borderRadius: `${buttonStyle.borderRadius}px`,
      fontSize: `${buttonStyle.fontSize}px`,
      fontFamily: buttonStyle.fontFamily,
      border:
        buttonStyle.borderWidth > 0
          ? `${buttonStyle.borderWidth}px solid ${buttonStyle.borderColor}`
          : "none",
      position: "relative",
      overflow: "hidden",
      boxShadow: buttonStyle.shadow
        ? buttonStyle.shadowSize === "sm"
          ? "0 1px 2px rgba(0, 0, 0, 0.05)"
          : buttonStyle.shadowSize === "md"
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        : "none",
    };

    if (buttonStyle.gradient) {
      styles.background = `linear-gradient(to right, ${buttonStyle.gradientFrom}, ${buttonStyle.gradientTo})`;
    }

    return styles;
  };

  const getAnimationClass = () => {
    switch (buttonStyle.animation) {
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      case "spin":
        return "animate-spin";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Button Customizer</CardTitle>
        <CardDescription>
          Design your button with custom styles and animations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview Section */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Button Preview
            </h3>
            <motion.div
              className={`${getAnimationClass()} flex items-center justify-center w-full h-32`}
            >
              <button
                style={getButtonStyles()}
                className="px-6 py-3 font-medium transition-all duration-200"
              >
                Click Me
              </button>
            </motion.div>
          </div>

          {/* Customization Section */}
          <div className="w-full lg:w-2/3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Colors</span>
                </TabsTrigger>
                <TabsTrigger
                  value="typography"
                  className="flex items-center gap-2"
                >
                  <Type className="h-4 w-4" />
                  <span className="hidden sm:inline">Typography</span>
                </TabsTrigger>
                <TabsTrigger
                  value="borders"
                  className="flex items-center gap-2"
                >
                  <Layers className="h-4 w-4" />
                  <span className="hidden sm:inline">Borders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="animations"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">Effects</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Background Color
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={buttonStyle.backgroundColor}
                        onChange={(e) =>
                          handleStyleChange("backgroundColor", e.target.value)
                        }
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input
                        type="text"
                        value={buttonStyle.backgroundColor}
                        onChange={(e) =>
                          handleStyleChange("backgroundColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text Color</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={buttonStyle.textColor}
                        onChange={(e) =>
                          handleStyleChange("textColor", e.target.value)
                        }
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input
                        type="text"
                        value={buttonStyle.textColor}
                        onChange={(e) =>
                          handleStyleChange("textColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Use Gradient</label>
                    <input
                      type="checkbox"
                      checked={buttonStyle.gradient}
                      onChange={(e) =>
                        handleStyleChange("gradient", e.target.checked)
                      }
                      className="h-4 w-4"
                    />
                  </div>

                  {buttonStyle.gradient && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Gradient From
                        </label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={buttonStyle.gradientFrom}
                            onChange={(e) =>
                              handleStyleChange("gradientFrom", e.target.value)
                            }
                            className="w-12 h-8 p-0 overflow-hidden"
                          />
                          <Input
                            type="text"
                            value={buttonStyle.gradientFrom}
                            onChange={(e) =>
                              handleStyleChange("gradientFrom", e.target.value)
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Gradient To
                        </label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={buttonStyle.gradientTo}
                            onChange={(e) =>
                              handleStyleChange("gradientTo", e.target.value)
                            }
                            className="w-12 h-8 p-0 overflow-hidden"
                          />
                          <Input
                            type="text"
                            value={buttonStyle.gradientTo}
                            onChange={(e) =>
                              handleStyleChange("gradientTo", e.target.value)
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Font Size ({buttonStyle.fontSize}px)
                  </label>
                  <Slider
                    value={[buttonStyle.fontSize]}
                    min={12}
                    max={24}
                    step={1}
                    onValueChange={(value) =>
                      handleStyleChange("fontSize", value[0])
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Font Family</label>
                  <Select
                    value={buttonStyle.fontFamily}
                    onValueChange={(value) =>
                      handleStyleChange("fontFamily", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="borders" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Border Radius ({buttonStyle.borderRadius}px)
                  </label>
                  <Slider
                    value={[buttonStyle.borderRadius]}
                    min={0}
                    max={24}
                    step={1}
                    onValueChange={(value) =>
                      handleStyleChange("borderRadius", value[0])
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Border Width ({buttonStyle.borderWidth}px)
                  </label>
                  <Slider
                    value={[buttonStyle.borderWidth]}
                    min={0}
                    max={5}
                    step={1}
                    onValueChange={(value) =>
                      handleStyleChange("borderWidth", value[0])
                    }
                  />
                </div>
                {buttonStyle.borderWidth > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Border Color</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={buttonStyle.borderColor}
                        onChange={(e) =>
                          handleStyleChange("borderColor", e.target.value)
                        }
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input
                        type="text"
                        value={buttonStyle.borderColor}
                        onChange={(e) =>
                          handleStyleChange("borderColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="animations" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Animation</label>
                  <Select
                    value={buttonStyle.animation}
                    onValueChange={(value) =>
                      handleStyleChange("animation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="spin">Spin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Add Shadow</label>
                    <input
                      type="checkbox"
                      checked={buttonStyle.shadow}
                      onChange={(e) =>
                        handleStyleChange("shadow", e.target.checked)
                      }
                      className="h-4 w-4"
                    />
                  </div>

                  {buttonStyle.shadow && (
                    <div className="mt-2">
                      <label className="text-sm font-medium">Shadow Size</label>
                      <Select
                        value={buttonStyle.shadowSize}
                        onValueChange={(value) =>
                          handleStyleChange("shadowSize", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shadow size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">Small</SelectItem>
                          <SelectItem value="md">Medium</SelectItem>
                          <SelectItem value="lg">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => onSave(buttonStyle)}
          className="flex items-center gap-2"
        >
          Save Button Style <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ButtonCustomizer;
