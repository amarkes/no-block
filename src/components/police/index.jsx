import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PoliceComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      {t("login.info")}{" "}
      <a onClick={() => navigate("/terms")} className="cursor-pointer">
        {t("login.info1")}
      </a>{" "}
      {t("login.info2")}{" "}
      <a onClick={() => navigate("/policy")} className="cursor-pointer">
        {t("login.info3")}
      </a>
      .
    </div>
  );
}
