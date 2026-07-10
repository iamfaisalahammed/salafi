import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import Swal from "sweetalert2";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);


  useEffect(() => {

    // Check App Installed
    const checkInstalled = () => {
      const installed =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      if (installed) {
        setIsInstalled(true);
      }
    };


    checkInstalled();


    // Android Install Prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };


    window.addEventListener(
      "beforeinstallprompt",
      handler
    );


    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);



  const handleInstall = async () => {

    // Check iOS
    const isIOS =
      /iphone|ipad|ipod/i.test(
        window.navigator.userAgent
      );


    // Already installed
    if (isInstalled) {
      Swal.fire({
        icon: "info",
        title: "App Already Installed",
        text: "This app is already installed on your device.",
        confirmButtonText: "OK",
      });

      return;
    }



    // iOS install instruction
    if (isIOS) {

      Swal.fire({
        icon: "info",
        title: "Install HIKMAH App",
        text:
          "Tap Share button ⬆️ then select 'Add to Home Screen' to install this app.",
        confirmButtonText: "OK",
      });

      return;
    }



    // Android install unavailable
    if (!deferredPrompt) {

      Swal.fire({
        icon: "info",
        title: "Install Option Not Ready",
        text:
          "Please open this app in Google Chrome and wait a few seconds.",
        confirmButtonText: "OK",
      });

      return;
    }



    setIsInstalling(true);


    deferredPrompt.prompt();


    const result = await deferredPrompt.userChoice;


    if (result.outcome === "accepted") {

      setIsInstalled(true);

      Swal.fire({
        icon: "success",
        title: "Installation Completed",
        text: "App installed successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

    }



    setIsInstalling(false);
    setDeferredPrompt(null);

  };



  return (
    <a
      onClick={handleInstall}
      className="navbar-end flex items-center gap-1 cursor-pointer text-white hover:text-gray-300 transition"
    >

      {isInstalled ? (
        <>✓ App Installed</>
      ) : (
        <>
          <FaDownload
            className={
              isInstalling
                ? "animate-bounce"
                : ""
            }
          />

          {isInstalling
            ? "Installing..."
            : "Download App"
          }

        </>
      )}

    </a>
  );
};


export default InstallApp;