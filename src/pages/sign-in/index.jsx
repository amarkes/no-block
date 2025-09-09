import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginImageComponent from "./image";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import PoliceComponent from "@/components/police";

export default function LoginPage({ className, ...props }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signInEmail, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  const onLogin = async () => {
    const { error } = await signInEmail(email, password);
    setErr(error ?? null);
    if (error) {
      toast.error(error);
    }
  };


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
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">{t("login.password")}</Label>
                      <a
                        onClick={() => navigate("/forgot")}
                        className="ml-auto text-sm underline-offset-2 hover:underline cursor-pointer"
                      >
                        {t("login.forgot")}
                      </a>
                    </div>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {err && <div style={{ color:'#dc2626', fontSize:12 }}>{err}</div>}
                  <Button disabled={loading} onClick={() => onLogin()} className="w-full cursor-pointer">
                    {loading ? t("login.wait") : t("login.button")}
                  </Button>
                  <div className="text-center text-sm">
                    {t("login.signUp")}{" "}
                    <a onClick={() => navigate("/sign-up")} className="underline underline-offset-4 cursor-pointer">
                      {t("login.signUpButton")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-muted relative hidden md:block">
                <LoginImageComponent />
              </div>
            </CardContent>
          </Card>
          <PoliceComponent />
        </div>
      </div>
    </div>
  );
}
