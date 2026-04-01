import { useState, useCallback } from "react";
import { Volume2, VolumeX, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SenhaInfo {
  codigo: string;
  sala: string;
}

const Painel = () => {
  const [senhaAtual, setSenhaAtual] = useState<SenhaInfo | null>(null);
  const [historico, setHistorico] = useState<SenhaInfo[]>([]);
  const [somAtivo, setSomAtivo] = useState(false);

  // TODO: integrar com Supabase realtime para ouvir mudanças nas senhas

  const chamarNovaSenha = useCallback((novaSenha: SenhaInfo) => {
    setSenhaAtual((anterior) => {
      if (anterior) {
        setHistorico((prev) => {
          const semDuplicata = prev.filter((item) => item.codigo !== anterior.codigo);
          return [anterior, ...semDuplicata].slice(0, 10);
        });
      }
      return novaSenha;
    });

    // TODO: tocar som ao chamar nova senha
    if (somAtivo) {
      console.log("Som ativado — tocar alerta sonoro");
    }
  }, [somAtivo]);

  // TODO: remover ao integrar com Supabase realtime
  const simularChamada = () => {
    const tipos = Math.random() > 0.3 ? "N" : "P";
    const numero = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
    const sala = `SALA ${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`;
    chamarNovaSenha({ codigo: `${tipos}${numero}`, sala });
  };

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#f0f2f5" }}>
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4" style={{ backgroundColor: "#1a4b8c" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Monitor className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-white">CHAMADOR DE SENHAS</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSomAtivo(!somAtivo)}
            className="text-white hover:bg-white/20"
          >
            {somAtivo ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            <span className="ml-1 text-xs">{somAtivo ? "Som Ativo" : "Som Desativado"}</span>
          </Button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-1 flex-col gap-6 p-6 lg:flex-row">
        {/* Coluna esquerda — Histórico */}
        <section className="flex w-full flex-col lg:w-[35%]">
          <h2
            className="mb-4 rounded-t-lg px-4 py-3 text-center text-lg font-bold tracking-wider text-white"
            style={{ backgroundColor: "#1a4b8c" }}
          >
            SENHAS ANTERIORES
          </h2>
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto rounded-b-lg bg-white p-3 shadow-md">
            {historico.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma senha anterior</p>
            ) : (
              historico.map((item, index) => (
                <div
                  key={`${item.codigo}-${index}`}
                  className="flex items-center justify-between rounded-lg border px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <span className="text-xl font-bold" style={{ color: "#1a4b8c" }}>
                    {item.codigo}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">{item.sala}</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Coluna direita — Senha Atual */}
        <section className="flex w-full flex-col lg:w-[65%]">
          <h2
            className="mb-4 rounded-t-lg px-4 py-3 text-center text-lg font-bold tracking-wider text-white"
            style={{ backgroundColor: "#1a4b8c" }}
          >
            SENHA ATUAL
          </h2>
          <div className="flex flex-1 flex-col items-center justify-center rounded-b-lg bg-white p-8 shadow-md">
            {senhaAtual ? (
              <div key={senhaAtual.codigo} className="animate-scale-in text-center">
                <p
                  className="font-black leading-none"
                  style={{ fontSize: "clamp(5rem, 12vw, 10rem)", color: "#1a4b8c" }}
                >
                  {senhaAtual.codigo}
                </p>
                <p className="mt-4 text-2xl font-semibold text-muted-foreground lg:text-3xl">
                  {senhaAtual.sala}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-muted-foreground">AGUARDANDO CHAMADA...</p>
            )}
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer
        className="flex flex-col items-center justify-between gap-2 px-6 py-3 text-white sm:flex-row"
        style={{ backgroundColor: "#1a4b8c" }}
      >
        <span className="text-xs opacity-75">Painel desenvolvido por @realfelipew</span>
        <span className="text-sm font-semibold tracking-wide">AGUARDE SUA SENHA SER CHAMADA</span>
      </footer>

      {/* Botão de simulação — apenas em desenvolvimento */}
      {/* TODO: remover ao integrar com Supabase realtime */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-16 right-4">
          <Button onClick={simularChamada} variant="outline" size="sm" className="shadow-lg">
            Simular Chamada
          </Button>
        </div>
      )}
    </div>
  );
};

export default Painel;
