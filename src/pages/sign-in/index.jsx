import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginImageComponent from "./image";

export default function LoginPage({ className, ...props }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{t("login.title")}</h1>
                    <p className="text-muted-foreground text-balance text-sm">
                      {t("login.description")}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">{t("login.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">{t("login.password")}</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        {t("login.forgot")}
                      </a>
                    </div>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="w-full cursor-pointer">
                    {t("login.forgot")}
                  </Button>
                  {/* <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="bg-muted relative hidden md:block">
                <LoginImageComponent />
              </div>
            </CardContent>
          </Card>
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
        </div>
      </div>
    </div>
  );
}
