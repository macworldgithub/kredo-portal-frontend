"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  id?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 160,
  className = "",
  id,
}) => {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (!value) return;
    let isMounted = true;
    QRCode.toDataURL(value, {
      width: size * 2, // High resolution for crisp rendering
      margin: 1,
      color: {
        dark: "#0a1926",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (isMounted) setDataUrl(url);
      })
      .catch((err) => {
        console.error("Failed to generate QR code", err);
      });

    return () => {
      isMounted = false;
    };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        id={id}
        className={`flex items-center justify-center bg-slate-100 rounded-lg animate-pulse ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[10px] text-slate-400 font-mono">Generating QR...</span>
      </div>
    );
  }

  return (
    <img
      id={id}
      src={dataUrl}
      alt={`QR Code for ${value}`}
      width={size}
      height={size}
      className={`block rounded-lg object-contain ${className}`}
    />
  );
};

