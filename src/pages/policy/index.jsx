import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PolicyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <main className="min-h-screen bg-muted text-muted-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("aup.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t("aup.lastUpdated", { date: today })}
          </p>
        </header>

        <section className="prose prose-gray max-w-none">
          <h2>{t("aup.scope.title")}</h2>
          <p>{t("aup.scope.p1")}</p>

          <h2>{t("aup.responsibleUse.title")}</h2>
          <p>{t("aup.responsibleUse.p1")}</p>

          <h2>{t("aup.prohibited.title")}</h2>
          <p>{t("aup.prohibited.p1")}</p>
          <ul>
            <li>{t("aup.prohibited.li1")}</li>
            <li>{t("aup.prohibited.li2")}</li>
            <li>{t("aup.prohibited.li3")}</li>
            <li>{t("aup.prohibited.li4")}</li>
            <li>{t("aup.prohibited.li5")}</li>
            <li>{t("aup.prohibited.li6")}</li>
          </ul>

          <h2>{t("aup.security.title")}</h2>
          <p>{t("aup.security.p1")}</p>

          <h2>{t("aup.rates.title")}</h2>
          <p>{t("aup.rates.p1")}</p>

          <h2>{t("aup.dataPrivacy.title")}</h2>
          <p>{t("aup.dataPrivacy.p1")}</p>

          <h2>{t("aup.content.title")}</h2>
          <p>{t("aup.content.p1")}</p>

          <h2>{t("aup.enforcement.title")}</h2>
          <p>{t("aup.enforcement.p1")}</p>

          <h2>{t("aup.reporting.title")}</h2>
          <p>{t("aup.reporting.p1")}</p>

          <h2>{t("aup.children.title")}</h2>
          <p>{t("aup.children.p1")}</p>

          <h2>{t("aup.changes.title")}</h2>
          <p>{t("aup.changes.p1")}</p>

          <h2>{t("aup.contact.title")}</h2>
          <p>{t("aup.contact.p1")}</p>

          <hr />
          <p className="text-sm text-gray-500">{t("aup.note")}</p>
        </section>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-5 cursor-pointer right-5 bg-background text-foreground p-3 rounded-full shadow-lg border hover:opacity-80 transition-opacity"
        aria-label="Voltar"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
    </main>
  );
}
