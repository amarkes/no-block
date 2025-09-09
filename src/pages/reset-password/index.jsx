// src/pages/reset-password/index.jsx
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginImageComponent from './image';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

export default function ResetPasswordPage({ className, ...props }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updatePassword, loading } = useAuth();

  const [sp] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState(null);

  // Verifica token na query: ?token=...&type=recovery
  useEffect(() => {
    const token = sp.get('token');
    const type = sp.get('type');

    async function verify() {
      try {
        // Se veio token de recuperação, troca por sessão de recuperação
        if (token && type === 'recovery') {
          const { error } = await supabase.auth.verifyOtp({ token, type: 'recovery' });
          if (error) {
            setErr(`Falha ao validar link: ${error.message}`);
            setVerified(false);
          } else {
            setVerified(true);
          }
        } else {
          // Pode ter vindo via hash access_token; se não houver token, permite continuar
          setVerified(true);
        }
      } catch (e) {
        setErr(`Falha ao validar link: ${e.message ?? e}`);
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    }

    verify();
  }, [sp]);

  const onSubmit = async () => {
    if (!verified) {
      toast.error('Link não verificado. Reabra o link do email.');
      return;
    }
    if (pw1.length < 6) {
      setErr('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (pw1 !== pw2) {
      setErr('As senhas não conferem.');
      return;
    }

    const { error } = await updatePassword(pw1);
    if (error) {
      toast.error(error);
      setErr(`Erro: ${error}`);
      return;
    }

    setErr(null);
    toast.success('Senha alterada com sucesso!');
    navigate('/login', { replace: true });
  };

  if (verifying) {
    return <div className="p-6">Validando link…</div>;
  }

  if (!verified) {
    return <div className="p-6 text-red-600">{err || 'Link inválido ou expirado.'}</div>;
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{t('forgot.title')}</h1>
                    <p className="text-muted-foreground text-balance text-sm">
                      {t('forgot.description')}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="password">{t('forgot.password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={pw1}
                      onChange={(e) => setPw1(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="re-password">{t('forgot.re-password')}</Label>
                    <Input
                      id="re-password"
                      type="password"
                      value={pw2}
                      onChange={(e) => setPw2(e.target.value)}
                    />
                  </div>

                  {err && <div className="text-sm text-red-600">{err}</div>}

                  <Button disabled={loading} onClick={onSubmit} className="w-full cursor-pointer">
                    {loading ? t('forgot.wait') : t('forgot.button')}
                  </Button>

                  <div className="text-center text-sm">
                    {t('forgot.signIn')}{' '}
                    <a onClick={() => navigate('/sign-up')} className="cursor-pointer underline underline-offset-4">
                      {t('forgot.signInButton')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-muted relative hidden md:block">
                <LoginImageComponent />
              </div>
            </CardContent>
          </Card>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            {t('login.info')}{' '}
            <a onClick={() => navigate('/terms')} className="cursor-pointer">
              {t('login.info1')}
            </a>{' '}
            {t('login.info2')}{' '}
            <a onClick={() => navigate('/policy')} className="cursor-pointer">
              {t('login.info3')}
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
