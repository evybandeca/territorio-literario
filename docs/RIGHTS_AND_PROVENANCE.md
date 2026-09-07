# Direitos, edição e proveniência — Território Literário

## Finalidade

Este documento define o controle editorial mínimo antes de uma obra entrar no corpus público do Território Literário. Ele é um mecanismo operacional de redução de risco e **não constitui parecer jurídico**.

## Camadas que devem ser verificadas separadamente

1. **Texto autoral original.** No Brasil, a regra geral usada pelo projeto é o art. 41 da Lei 9.610/1998: direitos patrimoniais por 70 anos contados de 1º de janeiro do ano subsequente ao falecimento do autor.
2. **Edição.** Prefácios, notas, estabelecimento de texto, organização, aparato crítico e outros elementos editoriais podem possuir proteção própria mesmo quando o texto autoral já está em domínio público.
3. **Tradução ou adaptação.** São obras derivadas e possuem autoria própria; não herdam automaticamente o status do original.
4. **Transcrição digital.** A plataforma que hospeda uma transcrição pode impor licença/termos sobre contribuições editoriais e conteúdo produzido por colaboradores.
5. **Imagens, mapas e ilustrações.** Devem ter proveniência e licença verificadas individualmente; o domínio público do romance não libera automaticamente seus elementos visuais modernos.
6. **Metadados, referência bibliográfica e links.** O portal atual trabalha prioritariamente com estes elementos e com pequenas evidências/citações justificadas, apontando para a fonte externa em vez de republicar a íntegra da transcrição.

## Política atual do portal

- `reuse_mode = metadata_citation_and_external_links` para obras publicadas.
- O texto integral não é copiado para o repositório como parte do corpus atual.
- Cada ocorrência geográfica mantém URL de evidência para a fonte consultada.
- A edição-base utilizada na auditoria fica registrada em `corpus.edicao`.
- Nenhuma obra pode entrar no `CORPUS_REGISTRY` sem registro correspondente em `data/rights-provenance.json`.
- A inclusão no registry exige `publication_status = published`, `edition_status = frozen_in_corpus` e `review_status = documented_for_beta`.
- Obras futuras podem ter o prazo patrimonial do autor documentado antecipadamente, mas permanecem bloqueadas enquanto a edição exata estiver pendente.

## Obras fundadoras: situação autoral

O manifest cobre as 12 obras fundadoras. Na data de avaliação (07/09/2026), os prazos patrimoniais de autoria registrados para todos os 12 autores estão expirados segundo o cálculo operacional do art. 41. Isso **não equivale a liberar qualquer edição moderna, transcrição, tradução ou imagem**.

Em particular, `Macunaíma` e `Vidas Secas` deixam de ser classificados como dúvida sobre o prazo patrimonial do autor e passam a ser classificados corretamente como **pendentes de seleção e verificação da edição/fonte exata** antes de qualquer corpus público.

## Fontes normativas e institucionais

- Lei 9.610/1998, Presidência da República: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm?locale-attribute=pt_BR
- Política de direitos autorais do Wikisource em português: https://pt.wikisource.org/wiki/Wikisource:Direitos_de_autor
- As fontes biográficas institucionais de cada autor são registradas individualmente no manifest.

## Gate automático

`scripts/validate-rights-provenance.mjs`:

- exige 12 obras no manifest fundador;
- recalcula a data de domínio público a partir do ano de falecimento;
- exige fonte biográfica HTTPS;
- impede obra planejada de parecer publicada sem edição selecionada;
- exige que toda obra presente no `CORPUS_REGISTRY` esteja marcada como publicada;
- carrega o corpus real e exige `edicao.titulo`, `edicao.autor`, `edicao.ano`, `edicao.fonte` e `edicao.url`;
- cruza o autor da edição com o autor documentado no manifest.

A regra é deliberadamente conservadora: **na dúvida sobre edição, licença ou proveniência, a obra fica fora do corpus público até a pendência ser resolvida.**
