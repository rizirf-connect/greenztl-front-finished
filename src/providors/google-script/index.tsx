"use client";
import { useEffect } from "react";

const GoogleAnalyticsScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-ETR4TBZJMN";
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "G-ETR4TBZJMN");
    };
  }, []);

  return null;
};

export default GoogleAnalyticsScript;
