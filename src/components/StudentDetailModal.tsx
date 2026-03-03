import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { chapters } from '../data/chapters';

interface StudentDetailModalProps {
  student: any;
  onClose: () => void;
}

export default function StudentDetailModal({ student, onClose }: StudentDetailModalProps) {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  if (!student) return null;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const renderStageData = (stageId: number, data: any) => {
    if (!data) return <p className="text-slate-400 italic text-sm">Belum ada data.</p>;

    switch (stageId) {
      case 1: // Activation
        return (
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-bold text-slate-600">Refleksi:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1">{data.reflection}</p>
            </div>
            <div>
              <span className="font-bold text-slate-600">Checklist:</span>
              <ul className="list-disc list-inside text-slate-500 ml-2">
                {data.checklist?.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-600">Kuis Awal:</span>
              <span className={`ml-2 font-bold ${data.quizAnswer === true ? 'text-green-600' : 'text-red-600'}`}>
                {data.quizAnswer ? 'Benar' : 'Salah'}
              </span>
            </div>
          </div>
        );
      case 2: // Strategy
        return (
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-bold text-slate-600">Urutan Flowchart:</span>
              <ol className="list-decimal list-inside text-slate-500 ml-2 bg-slate-50 p-2 rounded border border-slate-100 mt-1">
                {data.flowchartOrder?.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ol>
            </div>
            <div>
              <span className="font-bold text-slate-600">Penjelasan:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1">{data.explanation}</p>
            </div>
          </div>
        );
      case 3: // Decision
        return (
          <div className="space-y-2 text-sm">
             {data.answers?.map((ans: any, idx: number) => (
                 <div key={idx} className="mb-2 border-b border-slate-100 pb-2 last:border-0">
                     <div className="flex justify-between">
                        <span className="font-bold text-slate-600">Soal #{idx + 1}:</span>
                        <span className={ans.isCorrect ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                            {ans.isCorrect ? "Benar" : "Salah"}
                        </span>
                     </div>
                     <p className="text-slate-500">Pilihan: {ans.selectedOption}</p>
                 </div>
             ))}
             {!data.answers && <p className="text-slate-400">Data format lama atau kosong.</p>}
          </div>
        );
      case 4: // Practice
        return (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <span className="font-bold text-slate-600 block">Konsep:</span>
                    <span className="text-slate-500 bg-slate-50 px-2 py-1 rounded block">{data.concept}</span>
                </div>
                <div>
                    <span className="font-bold text-slate-600 block">Strategi:</span>
                    <span className="text-slate-500 bg-slate-50 px-2 py-1 rounded block">{data.strategy}</span>
                </div>
            </div>
            <div>
              <span className="font-bold text-slate-600">Jawaban Akhir:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1 font-mono">{data.answer}</p>
            </div>
          </div>
        );
      case 5: // Reflection
        return (
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-bold text-slate-600 block">Konsep Terbesar:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1">{data.concept}</p>
            </div>
            <div>
              <span className="font-bold text-slate-600 block">Kesulitan:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1">{data.difficulty}</p>
            </div>
            <div>
              <span className="font-bold text-slate-600 block">Strategi Membantu:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1">{data.strategy}</p>
            </div>
            <div>
              <span className="font-bold text-slate-600 block">Catatan Masa Depan:</span>
              <p className="bg-slate-50 p-2 rounded border border-slate-100 mt-1">{data.future}</p>
            </div>
          </div>
        );
      default:
        return <p>Unknown Stage</p>;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-primary text-white p-6 flex justify-between items-center shrink-0">
            <div>
                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="text-primary-light text-sm">Detail Jawaban & Progress</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
            {chapters.map((chapter) => {
                const chapterProgress = student.progress?.[chapter.id];
                const isCompleted = chapterProgress?.completed;
                const score = chapterProgress?.score || 0;
                const stagesData = chapterProgress?.stages || {};

                return (
                    <div key={chapter.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <button 
                            onClick={() => toggleChapter(chapter.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">{chapter.icon}</div>
                                <div className="text-left">
                                    <h3 className="font-bold text-slate-800">{chapter.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        {isCompleted ? (
                                            <span className="text-emerald-600 flex items-center gap-1 font-bold"><CheckCircle size={12} /> Selesai</span>
                                        ) : (
                                            <span className="text-slate-400 flex items-center gap-1"><Circle size={12} /> Belum Selesai</span>
                                        )}
                                        <span>•</span>
                                        <span>Skor: {score}</span>
                                    </div>
                                </div>
                            </div>
                            {expandedChapter === chapter.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                        </button>

                        <AnimatePresence>
                            {expandedChapter === chapter.id && (
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4">
                                        {[1, 2, 3, 4, 5].map(stageId => {
                                            const stageData = stagesData[stageId];
                                            const hasData = !!stageData;
                                            
                                            return (
                                                <div key={stageId} className="bg-white p-4 rounded-lg border border-slate-200">
                                                    <h4 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${hasData ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                            {stageId}
                                                        </span>
                                                        Stage {stageId}
                                                        {!hasData && <span className="text-xs font-normal text-slate-400 italic ml-2">(Belum dikerjakan)</span>}
                                                    </h4>
                                                    {hasData && (
                                                        <div className="pl-8">
                                                            {renderStageData(stageId, stageData)}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
