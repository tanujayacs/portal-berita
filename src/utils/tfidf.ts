// tfidf.ts (HYBRID RECOMMENDATION VERSION)

export function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function termFrequency(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1;
  });
  const total = tokens.length;
  Object.keys(tf).forEach(token => {
    tf[token] /= total;
  });
  return tf;
}

function inverseDocumentFrequency(docs: string[][]): Record<string, number> {
  const idf: Record<string, number> = {};
  const totalDocs = docs.length;
  const tokenDocCount: Record<string, number> = {};

  docs.forEach(doc => {
    const seen = new Set<string>();
    doc.forEach(token => {
      if (!seen.has(token)) {
        tokenDocCount[token] = (tokenDocCount[token] || 0) + 1;
        seen.add(token);
      }
    });
  });

  Object.keys(tokenDocCount).forEach(token => {
    idf[token] = Math.log(totalDocs / (tokenDocCount[token] || 1));
  });

  return idf;
}

function computeTfIdf(tokens: string[], idf: Record<string, number>): Record<string, number> {
  const tf = termFrequency(tokens);
  const tfidf: Record<string, number> = {};
  Object.keys(tf).forEach(token => {
    tfidf[token] = tf[token] * (idf[token] || 0);
  });
  return tfidf;
}

function cosineSimilarity(a: Record<string, number>, b: Record<string, number>): number {
  const allTokens = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0, normA = 0, normB = 0;

  allTokens.forEach(token => {
    const valA = a[token] || 0;
    const valB = b[token] || 0;
    dot += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  });

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// HYBRID RECOMMENDATION SYSTEM
export function getTopKRecommendationsHybrid(
  inputIndex: number,
  articles: { id: string; judul: string; deskripsi: string; kategori: string }[],
  topK = 3,
  searchQuery: string = ''
): { id: string; judul: string; similarity: number }[] {
  const docs = articles.map(article => normalize(`${article.judul} ${article.deskripsi}`));
  const idf = inverseDocumentFrequency(docs);
  const tfidfVectors = docs.map(doc => computeTfIdf(doc, idf));

  const inputVec = tfidfVectors[inputIndex];
  const inputCategory = articles[inputIndex].kategori.toLowerCase();
  const searchTokens = normalize(searchQuery);

  const scores = tfidfVectors.map((vec, i) => {
    const contentScore = cosineSimilarity(inputVec, vec);
    const isSameCategory = articles[i].kategori.toLowerCase() === inputCategory;
    const categoryBoost = isSameCategory ? 0.15 : 0;

    const keywordScore = searchTokens.length > 0 ? searchTokens.reduce((acc, word) => {
      return acc + (articles[i].judul.toLowerCase().includes(word) ? 0.05 : 0);
    }, 0) : 0;

    return {
      id: articles[i].id,
      judul: articles[i].judul,
      similarity: contentScore + categoryBoost + keywordScore,
    };
  });

  return scores
    .filter((_, i) => i !== inputIndex)
    .sort((a, b) => b.similarity - a.similarity)
    .filter(item => item.similarity >= 0.2)
    .slice(0, topK);
}
