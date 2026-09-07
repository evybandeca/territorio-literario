# Rights and Provenance Gate Implementation Plan

**Goal:** Impedir que um corpus público seja registrado sem documentação mínima de autoria, prazo patrimonial no Brasil, edição-fonte e política de reutilização.

**Architecture:** Um manifest JSON versionado cobre as 12 obras fundadoras. O gate de CI cruza todas as obras publicadas no `CORPUS_REGISTRY` com o manifest e com `corpus.edicao`. Obras planejadas podem ter autoria elegível, mas permanecem bloqueadas até a seleção/congelamento da edição exata.

**Legal posture:** Este é um controle editorial/operacional baseado na Lei 9.610/1998, não um parecer jurídico. Edições, traduções, aparato crítico, imagens e transcrições digitais podem ter direitos/licenças próprios e são tratados separadamente da duração patrimonial do texto autoral.

### Task 1 — manifest
- Create `data/rights-provenance.json`.
- Registrar base legal, política Wikisource, autores, datas/fontes e status das 12 obras fundadoras.

### Task 2 — gate automático
- Create `scripts/validate-rights-provenance.mjs`.
- Exigir cobertura de todo corpus publicado.
- Recalcular data de entrada em domínio público pelo Art. 41.
- Exigir `corpus.edicao` completo e URL HTTPS para obras publicadas.
- Bloquear publicação se a edição estiver pendente.

### Task 3 — documentação pública interna
- Create `docs/RIGHTS_AND_PROVENANCE.md`.
- Explicar distinção entre texto autoral, edição, transcrição digital, imagens e citações.

### Task 4 — CI/readiness
- Integrar gate em `.github/workflows/quality.yml`.
- Atualizar production readiness.
- PR, CI, squash merge e Pages.
