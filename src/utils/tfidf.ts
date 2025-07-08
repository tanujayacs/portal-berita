export function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

// 2. Hitung TF (Term Frequency)
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

// 3. Hitung IDF (Inverse Document Frequency)
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

// 4. Hitung TF-IDF Vector
function computeTfIdf(tokens: string[], idf: Record<string, number>): Record<string, number> {
  const tf = termFrequency(tokens);
  const tfidf: Record<string, number> = {};
  Object.keys(tf).forEach(token => {
    tfidf[token] = tf[token] * (idf[token] || 0);
  });
  return tfidf;
}

// 5. Cosine Similarity antar dua vektor
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

// 6. Fungsi utama: rekomendasi berita mirip
export function getTopKRecommendations(
  inputIndex: number,
  articles: { id: string; judul: string; deskripsi: string }[],
  topK = 3
): { id: string; judul: string; similarity: number }[] {
  const docs = articles.map(article => normalize(`${article.judul} ${article.deskripsi}`));
  const idf = inverseDocumentFrequency(docs);
  const tfidfVectors = docs.map(doc => computeTfIdf(doc, idf));

  const inputVec = tfidfVectors[inputIndex];
  const scores = tfidfVectors.map((vec, i) => {
    return {
      id: articles[i].id,
      judul: articles[i].judul,
      similarity: cosineSimilarity(inputVec, vec),
    };
  });

  return scores
    .filter((_, i) => i !== inputIndex)
    .sort((a, b) => b.similarity - a.similarity)
    .filter(item => item.similarity >= 0.4) // kamu bisa adjust threshold ini
    .slice(0, topK);
}
