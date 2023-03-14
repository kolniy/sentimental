import aposToLexForm from "apos-to-lex-form";
import natural from "natural";
import SpellCorrector from "spelling-corrector";
import stopWord from "stopword";

const { WordTokenizer, SentimentAnalyzer, PorterStemer } = natural;

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
const analyzer = new SentimentAnalyzer("English", PorterStemer, "afinn");
spellCorrector.loadDictionary();

const getSentiment = (text) => {
  if (!text.trim()) {
    return 0;
  }

  const lexed = aposToLexForm(text)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");
  const tokenized = tokenizer.tokenize(lexed);
  const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));
  const stopWordsRemoved = stopWord.removeStopwords(fixedSpelling);
  const analyzed = analyzer.getSentiment(stopWordsRemoved);
  if (analyzed >= 1) return 1;
  if (analyzed === 0) return 0;
  return -1;
};

export default getSentiment;
