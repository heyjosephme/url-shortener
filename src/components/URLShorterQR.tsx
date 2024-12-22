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
import { QrCode, Copy, ExternalLink } from "lucide-react";

const URLShortenerQR = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to validate URL
  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to generate short URL (mock implementation)
  const generateShortUrl = (longUrl) => {
    // In a real implementation, this would call your backend API
    // For demo, we'll create a simple hash
    const hash = Math.random().toString(36).substring(2, 8);
    return `https://short.url/${hash}`;
  };

  // Function to generate QR code SVG
  const generateQRCode = (data) => {
    // This is a simplified QR code representation
    // In a real app, you'd want to use a proper QR code library
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="black" />
        <text x="50" y="50" text-anchor="middle" font-size="8">QR: ${data.substring(0, 10)}...</text>
      </svg>
    `;
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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Original URL QR Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Original URL QR</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div
                        className="w-48 h-48 border rounded p-2"
                        dangerouslySetInnerHTML={{
                          __html: generateQRCode(url),
                        }}
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
                      <div
                        className="w-48 h-48 border rounded p-2"
                        dangerouslySetInnerHTML={{
                          __html: generateQRCode(shortUrl),
                        }}
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

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">Your shortened URL:</p>
                  <p className="text-sm font-mono mt-1">{shortUrl}</p>
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
