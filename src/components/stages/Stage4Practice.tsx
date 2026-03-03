import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Stage4Content } from '../../data/chapterContent';

interface Props {
  onComplete: (data: any) => void;
  content: Stage4Content;
  initialData?: any;
}

export default function Stage4Practice({ onComplete, content, initialData }: Props) {
  const [concept, setConcept] = useState(initialData?.concept || '');
  const [strategy, setStrategy] = useState(initialData?.strategy || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [submitted, setSubmitted] = useState(!!initialData);
  const [validation, setValidation] = useState({
    concept: !!initialData,
    strategy: !!initialData,
    answer: !!initialData
  });

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Check Concept
    const isConceptCorrect = concept === content.correctConcept;
    
    // Check Strategy
    const isStrategyCorrect = strategy === content.correctStrategy;

    // Check Answer (case-insensitive)
    const normalizedAnswer = answer.trim().toLowerCase();
    const isAnswerCorrect = content.correctAnswer.some(
      ans => ans.toLowerCase() === normalizedAnswer
    );
    
    setValidation({
      concept: isConceptCorrect,
      strategy: isStrategyCorrect,
      answer: isAnswerCorrect
    });
  };

  const isAllCorrect = validation.concept && validation.strategy && validation.answer;

  const handleComplete = () => {
    onComplete({
      concept,
      strategy,
      answer
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">{content.title}</h2>
        <p className="text-slate-500">
          {content.description}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Soal Level Sedang</span>
        </div>
        <h3 className="text-xl font-medium text-primary leading-relaxed mb-8">
          {content.problem}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Tag size={16} className="text-accent" /> Konsep yang dipakai
                    </label>
                    <select 
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                        className={`w-full p-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-accent outline-none ${
                          submitted 
                            ? (validation.concept ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50') 
                            : 'border-slate-200'
                        }`}
                        disabled={submitted && validation.concept}
                    >
                        <option value="">Pilih Konsep...</option>
                        {content.concepts.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                    {submitted && !validation.concept && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> Konsep kurang tepat
                      </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Tag size={16} className="text-accent" /> Strategi
                    </label>
                    <select 
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        className={`w-full p-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-accent outline-none ${
                          submitted 
                            ? (validation.strategy ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50') 
                            : 'border-slate-200'
                        }`}
                        disabled={submitted && validation.strategy}
                    >
                        <option value="">Pilih Strategi...</option>
                        {content.strategies.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                    {submitted && !validation.strategy && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> Strategi kurang tepat
                      </p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Jawaban Akhir</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-accent outline-none text-lg font-mono ${
                              submitted 
                                ? (validation.answer ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50') 
                                : 'border-slate-200'
                            }`}
                            placeholder="Tulis jawabanmu..."
                            disabled={submitted && validation.answer}
                        />
                         {submitted && !validation.answer && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> Jawaban salah
                          </p>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {(!submitted || !isAllCorrect) && (
            <button 
                onClick={handleSubmit}
                disabled={!concept || !strategy || !answer}
                className="mt-8 w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all"
            >
                {submitted ? 'Cek Lagi' : 'Cek Jawaban'}
            </button>
        )}

        {submitted && isAllCorrect && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 p-6 rounded-xl border bg-emerald-50 border-emerald-200"
            >
                <h4 className="font-bold text-lg mb-2 text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 /> 🎉 Jawaban Benar!
                </h4>
                <p className="text-slate-700 mb-4">
                    {content.feedbackCorrect}
                </p>
            </motion.div>
        )}
        
        {submitted && !isAllCorrect && (
             <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 p-6 rounded-xl border bg-red-50 border-red-200"
            >
                <h4 className="font-bold text-lg mb-2 text-red-800 flex items-center gap-2">
                    <AlertCircle /> 🤔 Masih ada yang kurang tepat
                </h4>
                <p className="text-slate-700 mb-4">
                    {content.feedbackIncorrect}
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-100">
                    <label className="block text-sm font-bold text-red-700 mb-2">Refleksi Kesalahan:</label>
                    <textarea 
                        className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                        placeholder="Bagian mana yang membuatmu bingung? Konsepnya, strateginya, atau hitungannya?"
                    />
                </div>
            </motion.div>
        )}
      </div>

      <div className="flex justify-end pt-8">
        <button
          onClick={handleComplete}
          disabled={!isAllCorrect}
          className="bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          Lanjut ke Refleksi <ArrowRight />
        </button>
      </div>
    </div>
  );
}
