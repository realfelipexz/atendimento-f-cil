

## Tela do Chamador — Criação com lógica probabilística de senhas

### Contexto
O componente `Chamador.tsx` ainda não existe. Este plano cria a tela completa com a lógica de geração de senhas usando probabilidade (70% Normal / 30% Prioridade) em vez de alternância fixa.

### Arquivo: `src/pages/Chamador.tsx` (criar)

**Estados:**
- `sala: string` — editável, obrigatória para chamar senha
- `senhaAtual: { codigo, tipo, horarioInicio?, horarioFim? } | null` — inicia `null`
- `statusAtual: "SEM_SENHA" | "CHAMANDO" | "ATENDENDO"` — inicia `"SEM_SENHA"`
- `historico: array` — máx 10, mais recente no topo
- `contadorNormal` e `contadorPrioridade` — contadores independentes
- `loading: boolean`

**Geração de senha (ajuste principal):**
- `Math.random() > 0.3` → NORMAL (N001, N002...) usando `contadorNormal`
- Caso contrário → PRIORIDADE (P001, P002...) usando `contadorPrioridade`

**Botões e regras (mesmas do plano anterior):**

| Botão | Habilitado quando | Ação |
|---|---|---|
| CHAMAR PRÓXIMA | `senhaAtual === null` e `sala` preenchida | Gera senha probabilística, status → CHAMANDO |
| INICIAR ATENDIMENTO | status === CHAMANDO | Registra hora início, status → ATENDENDO |
| FINALIZAR | status === ATENDENDO | Hora fim, "ATENDIDA" no histórico, limpa senha, → SEM_SENHA |
| PULAR | CHAMANDO ou ATENDENDO | "PULADA" no histórico, limpa senha, → SEM_SENHA |
| RECHAMAR | CHAMANDO | Feedback visual (toast), sem mudança de estado |

**Layout:** Duas colunas (esquerda: senha atual + botões, direita: histórico). Responsivo. Design institucional (#1a4b8c, #f0f2f5).

### Arquivo: `src/App.tsx` (modificar)
- Substituir placeholder de `/chamador` pelo import de `Chamador`

