import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email ou senha inválidos");
      return;
    }

    setIsLoading(true);

    // TODO: Integrar com Supabase Auth
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // Após login, buscar role do usuário e redirecionar:
    // CHAMADOR → /chamador
    // TRIADOR → /triagem
    // PAINEL → /painel

    setTimeout(() => {
      setIsLoading(false);
      setError("Email ou senha inválidos");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 animate-fade-in">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-primary">
            Chamador de Senhas
          </h1>
        </div>

        {/* Título */}
        <h2 className="text-center text-lg font-semibold text-foreground mb-6 tracking-wide">
          ACESSAR O SISTEMA
        </h2>

        {/* Card de Login */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-300 focus-visible:ring-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 transition-all duration-300 focus-visible:ring-primary"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center animate-fade-in">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full min-h-[48px] text-base font-semibold mt-2 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Painel de Atendimento
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
