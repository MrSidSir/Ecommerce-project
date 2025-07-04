// 📁 frontend/src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Contact": "Contact",
          "About": "About",
          "Sign Up": "Sign Up",
          "Summer Sale": "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
          "Shop Now": "Shop Now",
          "What are you looking for?": "What are you looking for?",
          // ✅ Add all keys for navbar and homepage
        }
      },
      hi: {
        translation: {
          "Home": "होम",
          "Contact": "संपर्क",
          "About": "के बारे में",
          "Sign Up": "साइन अप",
          "Summer Sale": "सभी स्विम सूट पर गर्मी की सेल और फ्री एक्सप्रेस डिलीवरी - 50% छूट!",
          "Shop Now": "अभी खरीदें",
          "What are you looking for?": "आप क्या ढूंढ रहे हैं?",
        }
      },
      ur: {
        translation: {
          "Home": "ہوم",
          "Contact": "رابطہ",
          "About": "کے بارے میں",
          "Sign Up": "سائن اپ",
          "Summer Sale": "تمام سوئمنگ سوٹس پر سمر سیل اور مفت ایکسپریس ڈلیوری - 50% آف!",
          "Shop Now": "ابھی خریدیں",
          "What are you looking for?": "آپ کیا تلاش کر رہے ہیں؟",
        }
      },
      ar: {
        translation: {
          "Home": "الصفحة الرئيسية",
          "Contact": "اتصل",
          "About": "حول",
          "Sign Up": "اشتراك",
          "Summer Sale": "تخفيضات الصيف لجميع ملابس السباحة وتوصيل سريع مجاني - خصم 50٪!",
          "Shop Now": "تسوق الآن",
          "What are you looking for?": "ماذا تبحث عن؟",
        }
      },
      fr: {
        translation: {
          "Home": "Accueil",
          "Contact": "Contact",
          "About": "À propos",
          "Sign Up": "S'inscrire",
          "Summer Sale": "Soldes d'été sur tous les maillots de bain et livraison express gratuite - 50% de réduction!",
          "Shop Now": "Acheter maintenant",
          "What are you looking for?": "Que recherchez-vous?",
        }
      },
      // ➕ Add Arabic, French similarly
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
