import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ThemeToggle from "@/components/toogle-theme";
import { useTranslation } from "react-i18next";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  return (
    <div className="fixed md:top-1/2 top-1/5 right-0 transform -translate-y-1/2 flex items-center">
      <div
        className={`flex items-center gap-2 bg-background border border-border rounded-l-full px-2 py-1 shadow-lg transition-all duration-300 ${
          open
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => i18n.changeLanguage("pt")}
          aria-label="Português"
        >
          🇧🇷
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => i18n.changeLanguage("en")}
          aria-label="English"
        >
          🇺🇸
        </Button>
        <div className="mx-1 h-4 w-px bg-border" />
        <ThemeToggle />
      </div>

      <Button
        size="icon"
        className={`${
          open ? "rounded-none" : "rounded-r-none rounded-l-full"
        } shadow-lg h-11`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar" : "Abrir"}
      >
        {open ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
