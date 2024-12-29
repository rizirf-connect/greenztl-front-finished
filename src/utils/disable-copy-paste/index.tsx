"use client";
import { useEffect } from "react";

const DisableCopyPaste = () => {
  useEffect(() => {
    const disableShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.key === "c") ||
        (e.ctrlKey && e.key === "v") ||
        (e.metaKey && e.key === "c") ||
        (e.metaKey && e.key === "v")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", disableShortcuts);

    return () => {
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  return null;
};

export default DisableCopyPaste;
