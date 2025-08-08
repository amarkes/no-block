import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <main className="bg-muted text-muted-foreground min-h-screen bg-">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("terms.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t("terms.lastUpdated", { date: today })}
          </p>
        </header>

        <section className="prose prose-gray max-w-none">
          <h2>{t("terms.acceptance.title")}</h2>
          <p>{t("terms.acceptance.p1")}</p>

          <h2>{t("terms.eligibility.title")}</h2>
          <p>{t("terms.eligibility.p1")}</p>

          <h2>{t("terms.permittedUse.title")}</h2>
          <p>{t("terms.permittedUse.p1")}</p>
          <ul>
            <li>{t("terms.permittedUse.li1")}</li>
            <li>{t("terms.permittedUse.li2")}</li>
            <li>{t("terms.permittedUse.li3")}</li>
            <li>{t("terms.permittedUse.li4")}</li>
            <li>{t("terms.permittedUse.li5")}</li>
          </ul>

          <h2>{t("terms.billing.title")}</h2>
          <p>{t("terms.billing.p1")}</p>

          <h2>{t("terms.cancellation.title")}</h2>
          <p>{t("terms.cancellation.p1")}</p>

          <h2>{t("terms.ip.title")}</h2>
          <p>{t("terms.ip.p1")}</p>

          <h2>{t("terms.ugc.title")}</h2>
          <p>{t("terms.ugc.p1")}</p>

          <h2>{t("terms.privacy.title")}</h2>
          <p>{t("terms.privacy.p1")}</p>

          <h2>{t("terms.availability.title")}</h2>
          <p>{t("terms.availability.p1")}</p>

          <h2>{t("terms.disclaimer.title")}</h2>
          <p>{t("terms.disclaimer.p1")}</p>

          <h2>{t("terms.indemnity.title")}</h2>
          <p>{t("terms.indemnity.p1")}</p>

          <h2>{t("terms.links.title")}</h2>
          <p>{t("terms.links.p1")}</p>

          <h2>{t("terms.comms.title")}</h2>
          <p>{t("terms.comms.p1")}</p>

          <h2>{t("terms.changes.title")}</h2>
          <p>{t("terms.changes.p1")}</p>

          <h2>{t("terms.law.title")}</h2>
          <p>{t("terms.law.p1")}</p>

          <h2>{t("terms.contact.title")}</h2>
          <p>{t("terms.contact.p1")}</p>

          <hr />
          <p className="text-sm text-gray-500">{t("terms.note")}</p>
        </section>
        <button
          onClick={() => navigate(-1)}
          className="fixed bottom-5 cursor-pointer right-5 bg-background text-foreground p-3 rounded-full shadow-lg border hover:opacity-80 transition-opacity"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}
