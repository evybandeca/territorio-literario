// TERRITÓRIO LITERÁRIO — índice de lugares.
// O Atlas inverte a Biblioteca: em vez de "obra → lugares", construímos
// "lugar → obras" a partir dos mesmos dados, agrupando por nome exato do lugar.
// Isto NÃO é geocodificação real (não fundimos lugares com nomes diferentes
// mesmo que próximos no mapa) — é deliberadamente conservador: só une o que
// já escrevemos como o mesmo nome. (Evolução futura documentada em data.js:
// place_id + canonical_name + aliases, quando isso passar a valer a pena.)

// Quando um lugar reúne mais de um "tipo" (ex.: histórico numa obra,
// narrativo em outra), o Atlas precisa mostrar UM tipo principal — mas nunca
// pela ordem em que os dados foram inseridos. Esta é a hierarquia editorial
// explícita: um lugar onde a ação de fato acontece (narrativo) pesa mais que
// um pano de fundo histórico, que pesa mais que um vínculo biográfico do
// autor, e assim por diante. Mudar esta ordem é uma decisão editorial, não
// um acidente de código.
const ORDEM_TIPOS = ["narrativo", "historico", "biografico", "mencionado", "ficcional"];

function tipoPrincipalDe(tipos) {
  for (const t of ORDEM_TIPOS) {
    if (tipos.has(t)) return t;
  }
  return "mencionado";
}

function construirIndiceLugares() {
  const porNome = new Map();
  OBRAS.forEach((obra) => {
    (obra.lugares || []).forEach((lugar) => {
      const chave = lugar.nome;
      if (!porNome.has(chave)) {
        porNome.set(chave, { nome: lugar.nome, lat: lugar.lat, lon: lugar.lon, tipos: new Set(), certezas: new Set(), obras: [] });
      }
      const entrada = porNome.get(chave);
      entrada.tipos.add(lugar.tipo);
      entrada.certezas.add(lugar.certeza);
      if (!entrada.obras.some((o) => o.id === obra.id)) {
        entrada.obras.push({ id: obra.id, titulo: obra.titulo, autor: obra.autor, ano: obra.anoLabel || obra.ano });
      }
    });
  });
  return Array.from(porNome.values()).map((l) => ({
    ...l,
    tipos: Array.from(l.tipos),
    tipoPrincipal: tipoPrincipalDe(l.tipos),
    certezaPrincipal: Array.from(l.certezas).every((c) => c === "identificado") ? "identificado" : "ilustrativo",
  })).sort((a, b) => b.obras.length - a.obras.length);
}

function estatisticasAcervo() {
  const lugares = construirIndiceLugares();
  const autores = new Set(OBRAS.map((o) => o.autor));
  return {
    obras: OBRAS.length,
    autores: autores.size,
    lugaresUnicos: lugares.length,
    citacoesDeLugar: OBRAS.reduce((soma, o) => soma + (o.lugares ? o.lugares.length : 0), 0),
  };
}
