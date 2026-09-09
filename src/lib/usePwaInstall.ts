"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// Global cached prompt so that if the event fired before component mounted, it is preserved
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
let promptListeners: Array<(prompt: BeforeInstallPromptEvent | null) => void> = [];

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((fn) => fn(globalDeferredPrompt));
  });

  window.addEventListener("appinstalled", () => {
    globalDeferredPrompt = null;
    promptListeners.forEach((fn) => fn(null));
  });
}

export function usePwaInstall() {
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsInstalled(isStandalone);

    if (isStandalone) {
      setCanInstall(false);
      return;
    }

    if (globalDeferredPrompt) {
      setCanInstall(true);
    }

    const onPromptChange = (prompt: BeforeInstallPromptEvent | null) => {
      setCanInstall(!!prompt);
    };

    promptListeners.push(onPromptChange);

    return () => {
      promptListeners = promptListeners.filter((fn) => fn !== onPromptChange);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!globalDeferredPrompt) {
      return false;
    }

    try {
      await globalDeferredPrompt.prompt();
      const choice = await globalDeferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        globalDeferredPrompt = null;
        setCanInstall(false);
        return true;
      }
    } catch (err) {
      console.warn("[PWA] Installation prompt error:", err);
    }
    return false;
  };

  return { canInstall, isInstalled, installApp };
}
