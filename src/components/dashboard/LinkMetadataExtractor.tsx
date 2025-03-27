import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ExternalLink, Check, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LinkMetadataExtractorProps {
  onExtract: (metadata: LinkMetadata) => void;
}

export interface LinkMetadata {
  title: string;
  description: string;
  image?: string;
  favicon?: string;
  tags?: string[];
}

const LinkMetadataExtractor: React.FC<LinkMetadataExtractorProps> = ({ onExtract }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);

  const extractMetadata = async () => {
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setMetadata(null);

    try {
      // في بيئة حقيقية، هذا سيكون طلب API لخدمة استخراج البيانات الوصفية
      // هنا نقوم بمحاكاة استجابة API بعد تأخير قصير
      await new Promise(resolve => setTimeout(resolve, 1500));

      // محاكاة استجابة API
      const mockResponse: LinkMetadata = {
        title: url.includes("twitter") 
          ? "Twitter - Social Media Platform" 
          : url.includes("github") 
            ? "GitHub: Where the world builds software" 
            : `${url.split("//")[1].split(".")[0].charAt(0).toUpperCase() + url.split("//")[1].split(".")[0].slice(1)} - Website`,
        description: url.includes("twitter") 
          ? "Twitter is a social media platform where users post and interact with messages known as tweets." 
          : url.includes("github") 
            ? "GitHub is where over 100 million developers shape the future of software, together." 
            : "This is a website description that would be extracted from the meta tags.",
        image: url.includes("twitter") 
          ? "https://abs.twimg.com/responsive-web/client-web/icon-default.77d25eba.png" 
          : url.includes("github") 
            ? "https://github.githubassets.com/assets/github-logo-55c5b9a1fe52.png" 
            : undefined,
        favicon: url.includes("twitter") 
          ? "https://abs.twimg.com/favicons/twitter.2.ico" 
          : url.includes("github") 
            ? "https://github.githubassets.com/favicons/favicon.svg" 
            : undefined,
        tags: url.includes("twitter") 
          ? ["social", "twitter", "media"] 
          : url.includes("github") 
            ? ["development", "code", "git"] 
            : ["website"],
      };

      setMetadata(mockResponse);
      onExtract(mockResponse);
    } catch (err) {
      setError(t("linkMetadataExtractor.extractionError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (metadata) {
      onExtract(metadata);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t("linkMetadataExtractor.urlPlaceholder")}
            disabled={isLoading}
          />
        </div>
        <Button 
          onClick={extractMetadata} 
          disabled={!url || isLoading}
          className={isLoading ? "opacity-80" : ""}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("linkMetadataExtractor.extracting")}
            </>
          ) : (
            t("linkMetadataExtractor.extract")
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {metadata && (
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">{t("linkMetadataExtractor.extractedInfo")}</h3>
                <p className="text-sm text-gray-500">{t("linkMetadataExtractor.extractedInfoDesc")}</p>
              </div>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleApply}
              >
                <Check className="mr-2 h-4 w-4" />
                {t("linkMetadataExtractor.apply")}
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-sm text-gray-500">{t("linkMetadataExtractor.title")}</Label>
                <p className="font-medium">{metadata.title}</p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">{t("linkMetadataExtractor.description")}</Label>
                <p className="text-sm">{metadata.description}</p>
              </div>
              
              {metadata.tags && metadata.tags.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-500">{t("linkMetadataExtractor.tags")}</Label>
                  <p className="text-sm">{metadata.tags.join(", ")}</p>
                </div>
              )}
              
              {metadata.image && (
                <div>
                  <Label className="text-sm text-gray-500">{t("linkMetadataExtractor.image")}</Label>
                  <div className="mt-1 border rounded-md overflow-hidden w-32 h-32 bg-white flex items-center justify-center">
                    <img 
                      src={metadata.image} 
                      alt={metadata.title} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LinkMetadataExtractor;
