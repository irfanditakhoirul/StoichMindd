import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Stage1Content } from '../../data/chapterContent';

interface Props {
  onComplete: (data: any) => void;
  content: Stage1Content;
  initialData?: any;
}

export default function Stage1Activation({ onComplete, content, initialData }: Props) {
  const [reflection, setReflection] = useState(initialData?.reflection || '');
  const [checklist, setChecklist] = useState<string[]>(initialData?.checklist || []);
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(initialData?.quizAnswer ?? null);
  const [showFeedback, setShowFeedback] = useState(!!initialData);

  const handleCheck = (item: string) => {
    setChecklist(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleQuiz = (answer: boolean) => {
    setQuizAnswer(answer);
    setShowFeedback(true);
  };

  const isComplete = reflection.length > 10 && checklist.length > 0 && quizAnswer !== null;
  const isCorrect = quizAnswer === content.quizAnswer;

  const handleComplete = () => {
    onComplete({
      reflection,
      checklist,
      quizAnswer
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">{content.title}</h2>
        <p className="text-slate-500 text-lg">
          "{content.description}"
        </p>
      </div>

      {/* Reflection Section */}
      <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
          Refleksi Awal
        </h3>
        <label className="block text-sm text-slate-600 mb-2">
          {content.reflectionQuestion}
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none min-h-[100px]"
          placeholder="Tulis pemahamanmu di sini..."
        />
      </section>

      {/* Checklist Section */}
      <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
          Checklist Pengetahuan
        </h3>
        <div className="space-y-3">
          {content.checklistItems.map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-accent transition-colors">
              <input 
                type="checkbox" 
                checked={checklist.includes(item)}
                onChange={() => handleCheck(item)}
                className="w-5 h-5 rounded text-accent focus:ring-accent"
              />
              <span className="text-slate-700">{item}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Quick Quiz */}
      <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
          Kuis Cepat
        </h3>
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <p className="text-lg font-medium text-primary mb-6">
            "{content.quizQuestion}"
          </p>
          
          {!showFeedback ? (
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => handleQuiz(true)}
                className="px-8 py-3 rounded-xl border-2 border-slate-200 hover:border-green-500 hover:text-green-600 font-bold transition-all"
              >
                BENAR
              </button>
              <button 
                onClick={() => handleQuiz(false)}
                className="px-8 py-3 rounded-xl border-2 border-slate-200 hover:border-red-500 hover:text-red-600 font-bold transition-all"
              >
                SALAH
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
            >
              <div className="font-bold text-lg mb-1">
                {isCorrect ? "✅ Tepat Sekali!" : "❌ Kurang Tepat"}
              </div>
              <p>
                {isCorrect 
                  ? content.quizFeedbackCorrect 
                  : content.quizFeedbackIncorrect}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleComplete}
          disabled={!isComplete}
          className="bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          Lanjut ke Strategi <ArrowRight />
        </button>
      </div>
    </div>
  );
}
