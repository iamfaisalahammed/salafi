
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import Swal from "sweetalert2";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia(
      "(display-mode: standalone)"
    );

    const checkInstalled = () => {
      const installed =
        standalone.matches ||
        window.navigator.standalone === true;

      setIsInstalled(installed);
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstalling(false);
    };

    standalone.addEventListener("change", checkInstalled);

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      standalone.removeEventListener("change", checkInstalled);

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const handleInstall = async () => {
    const isIOS = /iphone|ipad|ipod/i.test(
      window.navigator.userAgent
    );

    if (isInstalled) return;

    if (isIOS) {
      Swal.fire({
        icon: "info",
        title: "Install HIKMAH App",
        text: "Tap the Share button, then select 'Add to Home Screen' to install this app.",
        confirmButtonText: "OK",
      });

      return;
    }

    if (!deferredPrompt) {
      Swal.fire({
        icon: "info",
        title: "Install Option Not Ready",
        text: "Please open this website in a supported browser, such as Google Chrome. The install option may not be available yet.",
        confirmButtonText: "OK",
      });

      return;
    }

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      if (result.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error("App installation failed:", error);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  // Hide the button after installation
  if (isInstalled) return null;

  return (
    <button
      type="button"
      onClick={handleInstall}
      disabled={isInstalling}
      aria-label="Download HIKMAH app"
      title="Download App"
      className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:cursor-wait disabled:opacity-70"
    >
      <FaDownload
        className={isInstalling ? "animate-bounce" : ""}
      />

      <span className="hidden sm:inline">
        {isInstalling ? "Installing..." : "Download App"}
      </span>
    </button>
  );
};

export default InstallApp;
