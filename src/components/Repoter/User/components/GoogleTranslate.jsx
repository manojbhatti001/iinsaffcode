import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize the Google Translate element
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" }, // Default language is English
        "google_translate_element"
      );

      // Wait for a short time to ensure elements are rendered
      setTimeout(() => {
        // Remove text nodes from "skiptranslate" elements
        const skipElements = document.getElementsByClassName("skiptranslate");
        Array.from(skipElements).forEach((element) => {
          Array.from(element.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              node.nodeValue = ""; // Remove the text content
            }
          });
        });

        // Modify the first option of "goog-te-combo"
        const selectElement = document.querySelector(".goog-te-combo");
        if (selectElement) {
          const firstOption = selectElement.options[0];
          if (firstOption) {
            firstOption.value = "abc"; // Set custom value
            firstOption.textContent = "Select Language"; // Set custom text
          }
        }
      }, 500); // Adjust the delay as needed
    };

    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
