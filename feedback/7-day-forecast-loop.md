# Loop de feedback: previsão de 7 dias

## Comandos e estados

| Comando | Estado |
|---|---|
| `pnpm lint` | `<verde ou vermelho>` |
| `pnpm build` | `<verde ou vermelho>` |
| `pnpm test` | `<verde ou vermelho>` |
| `pnpm test:e2e` | `<verde ou vermelho>` |

## Evidências

- `<resumo verificável da saída de lint e build>`
- `<quantidade de testes Vitest aprovados ou mensagem da falha>`
- `<quantidade de testes Playwright aprovados ou mensagem da falha>`

## Critérios afetados

`<CA5.1, CA5.2, CA5.3 ou nenhum; explique a relação com eventual falha>`

## Decisão de planejamento

`<seguir sem mudança porque tudo passou, ou registrar o diagnóstico e o
ajuste mínimo que precisa entrar primeiro no Plan>`

## Artefatos alterados

`<nenhum, ou paths alterados após o replanejamento>`

## Resultado da revalidação

`<comandos repetidos, estados finais e evidência de que o loop terminou>`