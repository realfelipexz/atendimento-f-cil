

## Criação do Painel de Senhas com todos os refinamentos incorporados

### Contexto
`Painel.tsx` ainda não existe — rota `/painel` usa placeholder. Este plano cria a tela completa já com todos os refinamentos (animação via `key`, deduplicação de histórico, estado vazio, controle de som).

### Arquivo: `src/pages/Painel.tsx` (criar)

**Layout (baseado na imagem de referência aprovada):**
- Header: logo + "Chamador de Senhas"
- Coluna esquerda (~35%): "SENHAS ANTERIORES" — lista de cards (Senha + Sala), até 10 itens
- Coluna direita (~65%): "SENHA ATUAL" — código muito grande (8-10rem), sala abaixo
- Rodapé: "AGUARDE SUA SENHA SER CHAMADA"

**Estados:**
- `senhaAtual: { codigo, sala } | null` — inicia `null`
- `historico: { codigo, sala }[]` — máx 10, mais recente primeiro
- `somAtivo: boolean` — toggle via botão "Ativar Som"

**Refinamentos já incorporados:**

| Item | Implementação |
|---|---|
| Animação | `key={senhaAtual?.codigo}` no container da senha para forçar re-render + animação CSS |
| Deduplicação | Antes de adicionar ao histórico, filtrar itens com mesmo `codigo` |
| Estado vazio | Se `senhaAtual === null`, exibir "AGUARDANDO CHAMADA..." centralizado |
| Som | Estado `somAtivo` + botão toggle + `// TODO: tocar som ao chamar nova senha` |
| Botão simulação | Visível apenas em dev (`import.meta.env.DEV`), com `// TODO: remover ao integrar com Supabase realtime` |
| Realtime | `// TODO: integrar com Supabase realtime para ouvir mudanças nas senhas` |

### Arquivo: `src/App.tsx` (modificar)
- Importar `Painel` e substituir placeholder na rota `/painel`

### Detalhes técnicos
- Cores: `#1a4b8c`, `#f0f2f5`, cards brancos
- Tipografia extra-large para leitura à distância
- Responsivo: empilha em mobile
- Animação: keyframe `scale-in` + `fade-in` aplicada via classe quando `key` muda

