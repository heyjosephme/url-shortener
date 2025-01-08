import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QRCodeProps {
  url: string;
  title?: string;
  showStyled?: boolean;
  showAdvanced?: boolean;
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({
  url,
  title = "QR Code Generator",
  showStyled = true,
  showAdvanced = true,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic QR Code */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Basic QR Code</p>
            <QRCodeSVG value={url} size={128} />
          </div>

          {/* Styled QR Code */}
          {showStyled && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Styled QR Code</p>
              <QRCodeSVG
                value={url}
                size={128}
                fgColor="#4F46E5"
                bgColor="#F8FAFC"
                level="H"
                includeMargin={true}
              />
            </div>
          )}

          {/* Advanced QR Code with Error Correction */}
          {showAdvanced && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                High Error Correction QR Code
              </p>
              <QRCodeSVG
                value={url}
                size={128}
                level="H"
                imageSettings={{
                  src: "/api/placeholder/32/32",
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
