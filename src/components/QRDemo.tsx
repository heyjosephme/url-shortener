import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QRProps {
  value: string; // The value to encode in the QR code
  size?: number; // Size of the QR code (default: 128)
  level?: string; // Error correction level: 'L', 'M', 'Q', 'H' (default: 'L')
  includeMargin?: boolean; // Include quiet zone margin (default: false)
  renderAs?: string; // 'canvas' or 'svg' (default: 'canvas')
}

interface QRStyleProps {
  fgColor?: string; // Foreground color
  bgColor?: string; // Background color
  style?: object; // Additional CSS styles
  className?: string; // CSS class name
}

interface QRImageSettings {
  src: string; // URL of the center image
  height: number; // Height of the image
  width: number; // Width of the image
  excavate: boolean; // Clear the QR code behind the image
  x?: number; // X position of the image
  y?: number; // Y position of the image
}

const QRDemo = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Samples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic QR Code */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Basic QR Code</p>
            <QRCodeSVG value="https://example.com" size={128} />
          </div>

          {/* Styled QR Code */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Styled QR Code</p>
            <QRCodeSVG
              value="https://example.com"
              size={128}
              fgColor="#4F46E5"
              bgColor="#F8FAFC"
              level="H"
              includeMargin={true}
            />
          </div>

          {/* QR Code with High Error Correction */}
          <div className="space-y-2">
            <p className="text-sm font-medium">High Error Correction QR Code</p>
            <QRCodeSVG
              value="https://example.com"
              size={128}
              level="H"
              imageSettings={{
                src: "/api/placeholder/32/32",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRDemo;
