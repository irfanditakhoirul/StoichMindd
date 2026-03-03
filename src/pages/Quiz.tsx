import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { quizzes } from '../data/quizContent';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submitQuizScore } = useStore();
  const quiz = quizzes[id || ''] || quizzes['mole-concept'];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === quiz.questions.length - 1;

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 0 : 0)) / quiz.questions.length) * 100);
      // Note: score state hasn't updated for the last question yet in this render cycle if we just clicked, 
      // but we already updated it in handleAnswer? No, React state updates are batched.
      // Actually, easier logic: calculate final score based on correct answers count.
      // Let's fix the score logic.
      
      setShowResult(true);
      submitQuizScore(id || 'mole-concept', finalScore);
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  if (showResult) {
    const finalScore = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-200"
        >
          <div className="mb-6 flex justify-center">
            {finalScore >= 70 ? (
              <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                <Award size={48} />
              </div>
            ) : (
              <div className="bg-orange-100 p-4 rounded-full text-orange-600">
                <RotateCcw size={48} />
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-primary mb-2">Quiz Selesai!</h2>
          <p className="text-slate-500 mb-6">Kamu telah menyelesaikan latihan soal {quiz.title}.</p>
          
          <div className="text-5xl font-bold text-primary mb-2">{finalScore}</div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">Nilai Akhir</p>

          <div className="space-y-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-bold transition-colors"
            >
              Kembali ke Dashboard
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold transition-colors"
            >
              Ulangi Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-primary">{quiz.title}</h1>
          <div className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
            Soal {currentQuestionIdx + 1} / {quiz.questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIdx) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <motion.div 
          key={currentQuestionIdx}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-6"
        >
          <h2 className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let stateStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50";
              
              if (isAnswered) {
                if (idx === currentQuestion.correctIndex) {
                  stateStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500";
                } else if (idx === selectedOption) {
                  stateStyle = "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500";
                } else {
                  stateStyle = "border-slate-100 opacity-50";
                }
              } else if (selectedOption === idx) {
                stateStyle = "border-accent bg-accent/5 ring-1 ring-accent";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center ${stateStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQuestion.correctIndex && <CheckCircle size={20} className="text-emerald-500" />}
                  {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <XCircle size={20} className="text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-sm"
            >
              <span className="font-bold block mb-1">Pembahasan:</span>
              {currentQuestion.explanation}
            </motion.div>
          )}
        </motion.div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            {isLastQuestion ? 'Selesai & Lihat Nilai' : 'Soal Selanjutnya'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
