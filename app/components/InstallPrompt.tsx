"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("pwa-install-dismissed");
    if (isDismissed) {
      setDismissed(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => {
        setShowInstallButton(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleDismiss = () => {
    setShowInstallButton(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  if (dismissed || !showInstallButton) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50"
        style={{ fontFamily: 'var(--font-figtree)' }}
      >
        <div className="bg-[#1a1a1a] text-[#ffffeb] border-2 border-[#1a1a1a] rounded-[24px] p-5 relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-[#8a8a80] hover:text-[#ffffeb] transition-colors"
            aria-label="Dismiss install prompt"
          >
            ✕
          </button>

          <div className="flex items-start gap-3.5 pr-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-lg">
              📱
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-[#ffffeb] text-base font-semibold" style={{ fontFamily: 'var(--font-eb-garamond)' }}>
                Install Portfolio Web App
              </h4>
              <p className="text-xs text-[#8a8a80] leading-normal mb-3">
                Enable offline caching and instant desktop access.
              </p>
              <button
                onClick={handleInstallClick}
                className="btn-primary text-xs w-full text-center justify-center"
                style={{ padding: '8px 16px' }}
              >
                Install Application →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
