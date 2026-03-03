import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Stage3Content } from '../../data/chapterContent';

interface Props {
  onComplete: (data: any) => void;
  content: Stage3Content;
  initialData?: any;
}

export default function Stage3Decision({ onComplete, content, initialData }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState<any[]>(initialData?.answers || []);

  // Handle legacy content (single question) vs new content (multiple questions)
  // Fallback to empty array if neither exists to prevent crash, though data should be valid.
  const questions = (content.questions && content.questions.length > 0) ? content.questions : [
    {
      id: 1,
      caseStudy: content.caseStudy || 'Data studi kasus tidak ditemukan.',
      options: content.options || []
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Safety check
  if (!currentQuestion || !currentQuestion.options) {
    return <div className="p-8 text-center text-red-500">Error: Data soal tidak lengkap.</div>;
  }

  const handleSelect = (id: 'A' | 'B') => {
    if (showFeedback) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const option = currentQuestion.options.find(opt => opt.id === selectedOption);
    const correct = option?.isCorrect || false;
    
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    const newAnswers = [
        ...answers,
        {
            questionId: currentQuestion.id,
            selectedOption,
            isCorrect
        }
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      onComplete({ answers: newAnswers });
    } else {
      // Reset state for next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">{content.title}</h2>
        <p className="text-slate-500">
          {content.description}
        </p>
        {questions.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {questions.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 w-8 rounded-full transition-colors ${
                  idx === currentQuestionIndex ? 'bg-accent' : 
                  idx < currentQuestionIndex ? 'bg-emerald-400' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
      >
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 flex gap-4 items-start">
          <HelpCircle className="text-blue-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-blue-900 mb-2">Studi Kasus {questions.length > 1 ? `#${currentQuestionIndex + 1}` : ''}</h3>
            <p className="text-blue-800 italic text-lg leading-relaxed">
              {currentQuestion.caseStudy}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showFeedback}
              className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                selectedOption === option.id
                  ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              } ${showFeedback && option.isCorrect ? 'border-emerald-500 bg-emerald-50' : ''} 
                ${showFeedback && selectedOption === option.id && !option.isCorrect ? 'border-red-500 bg-red-50' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`font-bold text-xl ${selectedOption === option.id ? 'text-accent' : 'text-slate-400'}`}>
                  {option.id}
                </span>
                {showFeedback && option.isCorrect && <CheckCircle className="text-emerald-500" />}
                {showFeedback && selectedOption === option.id && !option.isCorrect && <XCircle className="text-red-500" />}
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{option.title}</h4>
              <p className="text-sm text-slate-500">{option.description}</p>
            </button>
          ))}
        </div>

        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-8 p-6 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}
          >
            <h4 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
              {isCorrect ? "🎉 Keputusan Tepat!" : "🤔 Kurang Tepat"}
            </h4>
            <p className="text-slate-700">
              {currentQuestion.options.find(opt => opt.id === selectedOption)?.feedback}
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="flex justify-end pt-8 gap-4">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
          >
            Cek Keputusan
          </button>
        ) : (
          <>
            {!isCorrect && (
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setSelectedOption(null);
                }}
                className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 px-8 py-4 rounded-xl font-bold transition-all"
              >
                Coba Lagi
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isCorrect} // Must get it right to proceed
              className="bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              {isLastQuestion ? 'Lanjut ke Latihan' : 'Soal Selanjutnya'} <ArrowRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
