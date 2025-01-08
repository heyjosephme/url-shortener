"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink } from "lucide-react";
import QRCodeGenerator from "./QRCodeGenerator";

const URLShortenerQR = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to validate URL
  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to generate short URL (mock implementation)
  const generateShortUrl = (longUrl: string) => {
    // In a real implementation, this would call your backend API
    // For demo, we'll create a simple hash
    const hash = Math.random().toString(36).substring(2, 8);
    return `https://short.url/${hash}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!isValidUrl(url)) {
        throw new Error("Please enter a valid URL");
      }

      const shortened = generateShortUrl(url);
      setShortUrl(shortened);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 mt-24">
      <Card>
        <CardHeader>
          <CardTitle>URL Shortener & QR Code Generator</CardTitle>
          <CardDescription>
            Enter a long URL to get a shortened version and QR codes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter your long URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Generate"}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {shortUrl && (
              <div className="space-y-8 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Original URL QR Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Original URL QR</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <QRCodeGenerator
                        url={url}
                        title=""
                        showStyled={false}
                        showAdvanced={false}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(url)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Original URL
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Shortened URL QR Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Shortened URL QR
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <QRCodeGenerator
                        url={shortUrl}
                        title=""
                        showStyled={false}
                        showAdvanced={false}
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(shortUrl)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Short URL
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(shortUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {/* Original URL display */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          Original URL:
                        </p>
                        <p className="text-sm font-mono mt-1 break-all">
                          {url}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url)}
                        className="ml-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Shortened URL display */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          Shortened URL:
                        </p>
                        <p className="text-sm font-mono mt-1 break-all">
                          {shortUrl}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(shortUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(shortUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default URLShortenerQR;
