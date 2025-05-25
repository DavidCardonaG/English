import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Extended mapping of IPA symbols to pronounceable text and descriptions
const ipaSymbolMap: Record<string, { text: string; description: string; example: string }> = {
  'iː': { text: "ee", description: "Close front unrounded long vowel", example: "as in 'see'" },
  'ɪ': { text: "ih", description: "Near-close near-front unrounded short vowel", example: "as in 'sit'" },
  'ʊ': { text: "oo", description: "Near-close near-back rounded vowel", example: "as in 'foot'" },
  'uː': { text: "oo", description: "Close back rounded long vowel", example: "as in 'food'" },
  'e': { text: "eh", description: "Close-mid front unrounded vowel", example: "as in 'bed'" },
  'ə': { text: "uh", description: "Schwa - mid-central vowel", example: "as in 'about'" },
  'ɜː': { text: "er", description: "Mid-central unrounded long vowel", example: "as in 'bird'" },
  'ɔː': { text: "aw", description: "Open-mid back rounded long vowel", example: "as in 'thought'" },
  'æ': { text: "a", description: "Near-open front unrounded vowel", example: "as in 'cat'" },
  'ʌ': { text: "uh", description: "Open-mid central unrounded vowel", example: "as in 'cup'" },
  'ɑː': { text: "ah", description: "Open back unrounded long vowel", example: "as in 'father'" },
  'ɒ': { text: "o", description: "Open back rounded vowel", example: "as in 'hot'" },
  'p': { text: "p", description: "Voiceless bilabial plosive", example: "as in 'pen'" },
  'b': { text: "b", description: "Voiced bilabial plosive", example: "as in 'bad'" },
  't': { text: "t", description: "Voiceless alveolar plosive", example: "as in 'tea'" },
  'd': { text: "d", description: "Voiced alveolar plosive", example: "as in 'did'" },
  'k': { text: "k", description: "Voiceless velar plosive", example: "as in 'cat'" },
  'g': { text: "g", description: "Voiced velar plosive", example: "as in 'get'" },
  'f': { text: "f", description: "Voiceless labiodental fricative", example: "as in 'fall'" },
  'v': { text: "v", description: "Voiced labiodental fricative", example: "as in 'voice'" },
  'θ': { text: "th", description: "Voiceless dental fricative", example: "as in 'thing'" },
  'ð': { text: "th", description: "Voiced dental fricative", example: "as in 'this'" },
  's': { text: "s", description: "Voiceless alveolar fricative", example: "as in 'see'" },
  'z': { text: "z", description: "Voiced alveolar fricative", example: "as in 'zoo'" },
  'ʃ': { text: "sh", description: "Voiceless postalveolar fricative", example: "as in 'she'" },
  'ʒ': { text: "zh", description: "Voiced postalveolar fricative", example: "as in 'measure'" },
  'h': { text: "h", description: "Voiceless glottal fricative", example: "as in 'hat'" },
  'tʃ': { text: "ch", description: "Voiceless postalveolar affricate", example: "as in 'church'" },
  'dʒ': { text: "j", description: "Voiced postalveolar affricate", example: "as in 'judge'" },
  'm': { text: "m", description: "Voiced bilabial nasal", example: "as in 'man'" },
  'n': { text: "n", description: "Voiced alveolar nasal", example: "as in 'no'" },
  'ŋ': { text: "ng", description: "Voiced velar nasal", example: "as in 'sing'" },
  'l': { text: "l", description: "Voiced alveolar approximant", example: "as in 'leg'" },
  'r': { text: "r", description: "Voiced postalveolar approximant", example: "as in 'red'" },
  'j': { text: "y", description: "Voiced palatal approximant", example: "as in 'yes'" },
  'w': { text: "w", description: "Voiced labio-velar approximant", example: "as in 'we'" },
};

const phoneticSymbols = [
  ['iː', 'ɪ', 'ʊ', 'uː'],
  ['e', 'ə', 'ɜː', 'ɔː'],
  ['æ', 'ʌ', 'ɑː', 'ɒ'],
  ['p', 'b', 't', 'd'],
  ['k', 'g', 'f', 'v'],
  ['θ', 'ð', 's', 'z'],
  ['ʃ', 'ʒ', 'h', 'tʃ'],
  ['dʒ', 'm', 'n', 'ŋ'],
  ['l', 'r', 'j', 'w']
];

const PhoneticKeyboard = () => {
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const englishVoice = availableVoices.find(v => v.lang.includes('en')) || null;
      setSelectedVoice(englishVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakPhonetic = (symbol: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Your browser doesn't support speech synthesis. Try Chrome or Edge.");
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(false);

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = ipaSymbolMap[symbol]?.text || symbol;
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setCurrentSymbol(symbol);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSound = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceName = e.target.value;
    const voice = voices.find(v => v.name === voiceName) || null;
    setSelectedVoice(voice);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Interactive Phonetic Keyboard</h3>

      {/* Voice selector */}
      <div className="mb-6">
        <label htmlFor="voice-select" className="block text-sm font-medium text-gray-300 mb-2">
          Select a voice:
        </label>
        <select
          id="voice-select"
          value={selectedVoice?.name || ''}
          onChange={handleVoiceChange}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full"
          disabled={voices.length === 0}
        >
          {voices.length === 0 ? (
            <option>Loading voices...</option>
          ) : (
            voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang}) {voice.default && '• Default'}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Phonetic keyboard */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {phoneticSymbols.flat().map((symbol) => (
          <motion.button
            key={symbol}
            onClick={() => speakPhonetic(symbol)}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg text-xl font-medium transition ${
              currentSymbol === symbol && isPlaying
                ? 'bg-blue-700 scale-105'
                : 'bg-gray-700 hover:bg-blue-600 hover:scale-105'
            }`}
          >
            {symbol}
          </motion.button>
        ))}
      </div>

      {/* Info panel */}
      {currentSymbol && (
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-3xl font-bold mb-2">{currentSymbol}</h4>
              <p className="text-gray-300 mb-1">{ipaSymbolMap[currentSymbol]?.description}</p>
              <p className="text-blue-300">Example: {ipaSymbolMap[currentSymbol]?.example}</p>
            </div>
            <button
              onClick={isPlaying ? stopSound : () => speakPhonetic(currentSymbol)}
              className={`p-3 rounded-full ${
                isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              } transition`}
            >
              {isPlaying ? 'Stop' : 'Play'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneticKeyboard;
