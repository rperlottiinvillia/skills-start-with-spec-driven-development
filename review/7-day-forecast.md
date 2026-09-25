# Review: previsão de 7 dias

## Achados

- `<achado relevante com severidade e path, ou "Nenhum achado bloqueante">`

## Matriz de rastreabilidade

| Âncora | Planejamento | Implementação e evidência | Status |
|---|---|---|---|
| Intenção: selecionar cidade e ver 7 dias | `intentions/7-day-forecast.md` | `specs/weather-app-spec.md` | `<status>` |
| CA5.1: exatamente 7 dias | `plans/weather-app-plan.md`, T9–T11 | `src/services/weather.test.ts`, `src/components/WeatherCard.test.tsx`, `e2e/search.spec.ts` | `<status>` |
| CA5.2: máxima e mínima por dia | `plans/weather-app-plan.md`, T9–T11 | `src/services/weather.ts`, `src/components/WeatherCard.tsx` e testes F5 | `<status>` |
| CA5.3: condição WMO por dia | `plans/weather-app-plan.md`, T9–T11 | `src/components/WeatherCard.tsx` e testes F5 | `<status>` |
| F1–F4 preservadas | Baseline da spec e T1–T8 | Testes baseline unitários, de componente e E2E | `<status>` |
| Loop de validação | Regra de replanejamento | `feedback/7-day-forecast-loop.md` | `<status>` |

## Resumo

`<declare se a mudança está pronta para PR, quais validações passaram e quais
riscos residuais permanecem>`