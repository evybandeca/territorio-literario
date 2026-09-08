# Work Agent Runbook — Expansão sucessiva do leitor integrado

Objetivo: expandir o `READER_REGISTRY` e a leitura integral hospedada, obra por obra, sem regressões e sem alterar o corpus literário-cartográfico.

## Fila obrigatória

1. Dom Casmurro
2. O Cortiço
3. Triste Fim de Policarpo Quaresma
4. O Guarani
5. Iracema

A próxima obra não deve ser escolhida manualmente. Execute:

```bash
node scripts/reader-work-queue.mjs
```

Use `NEXT_READER`, `NEXT_TITLE` e `SUGGESTED_BRANCH` como fonte de verdade para a próxima iteração.

## Loop autônomo

Repita este ciclo até `READER_EXPANSION_COMPLETE=true` ou até surgir um bloqueio externo real:

1. Sincronize com `main` e confirme que o working tree está limpo.
2. Execute `node scripts/reader-work-queue.mjs`.
3. Crie branch isolada usando `SUGGESTED_BRANCH`.
4. Leia a entrada correspondente no manifest de direitos/proveniência e confirme que a obra e a edição podem ser usadas.
5. Escolha uma fonte integral pública e estável. Registre provider, URL, edição-base e checksum SHA-256 esperado. Não dependa de conteúdo remoto em runtime.
6. Faça TDD obrigatório: primeiro amplie o reader QA para a nova obra e confirme a falha esperada.
7. Implemente apenas o necessário para:
   - entrada no `READER_REGISTRY`;
   - vendoring/build da edição integral;
   - segmentação de capítulos compatível com a edição;
   - CTA interno `Ler esta obra`;
   - anterior/próximo e índice;
   - busca dentro da obra;
   - persistência do último capítulo;
   - canonical e JSON-LD `Book` + `Chapter`;
   - integração contextual com Atlas quando existirem menções do capítulo;
   - comportamento mobile e acessível.
8. Preserve o lazy loading por obra. O leitor não pode obrigar o carregamento de todos os corpora.
9. Execute os gates completos: verify, browser QA, SEO runtime QA, reader runtime QA e Lighthouse.
10. Abra PR pequeno e legível. Inspecione todos os review threads e comentários automatizados.
11. Corrija regressões e repita os gates. Nunca faça merge com check pendente, falho ou review thread relevante sem tratamento.
12. Faça merge somente após evidência fresca de todos os gates verdes.
13. Confirme o deploy e o smoke de produção, incluindo que o arquivo integral é servido pelo mesmo domínio do Território Literário.
14. Volte ao passo 1 e avance para a próxima obra.

## Guardrails inegociáveis

- Não editar `CORPUS_PROFUNDO`, entidades, ocorrências, coordenadas, evidências ou proveniência cartográfica como efeito colateral da expansão do leitor.
- Não inventar edição, capítulo, coordenada, autoria, data ou direito de uso.
- Não remover a fonte externa de proveniência editorial; ela deve permanecer documentada mesmo com o texto hospedado localmente.
- Não carregar texto integral de terceiros em runtime. O conteúdo deve ser preparado no build/deploy e servido localmente.
- Não enfraquecer checks existentes para obter CI verde.
- Não fazer refatorações amplas sem necessidade direta para a obra atual.
- Não fundir lugares por fuzzy match automático.
- Não declarar conclusão sem verificação fresca.

## Tratamento de bloqueios

Se a edição integral adequada não puder ser obtida de forma legal, estável e reproduzível:

1. documente o bloqueio no PR ou em issue;
2. não use uma fonte duvidosa como atalho;
3. feche ou mantenha o PR sem merge conforme apropriado;
4. execute novamente `node scripts/reader-work-queue.mjs` somente depois de registrar explicitamente o bloqueio;
5. avance para outra tarefa segura apenas se isso não violar a ordem editorial definida.

Se um gate falhar, diagnostique a causa antes de editar código. Nunca contorne o teste.

## Critério de conclusão

A expansão está concluída somente quando:

- `node scripts/reader-work-queue.mjs` retornar `READER_EXPANSION_COMPLETE=true`;
- todas as cinco obras estiverem no `READER_REGISTRY`;
- cada uma tiver texto integral same-domain no ambiente publicado;
- navegação, busca, progresso, SEO, Atlas, mobile e acessibilidade tiverem cobertura de QA;
- o último deploy tiver smoke de produção e Lighthouse aprovados.

## Próximo objetivo após a fila

Depois das cinco obras profundas, não habilite automaticamente as seis obras v0.1. Primeiro reavalie direitos, estrutura editorial e capacidade de segmentação de cada uma, preservando a distinção entre profundidade editorial e mera disponibilidade de texto integral.
