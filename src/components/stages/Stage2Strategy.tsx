import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'motion/react';
import { ArrowRight, ArrowDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { Stage2Content } from '../../data/chapterContent';

interface Props {
  onComplete: (data: any) => void;
  content: Stage2Content;
  initialData?: any;
}

export default function Stage2Strategy({ onComplete, content, initialData }: Props) {
  // Initialize items with a shuffled version of correct items or initial data
  const [items, setItems] = useState<string[]>([]);
  const [explanation, setExplanation] = useState(initialData?.explanation || '');
  const [isExplanationSubmitted, setIsExplanationSubmitted] = useState(!!initialData?.explanation);
  const [isExplanationCorrect, setIsExplanationCorrect] = useState(!!initialData?.explanation);

  useEffect(() => {
    if (initialData?.flowchartOrder) {
        setItems(initialData.flowchartOrder);
    } else {
        // Shuffle items on mount
        const shuffled = [...content.flowchartItems].sort(() => Math.random() - 0.5);
        setItems(shuffled);
    }
  }, [content, initialData]);

  const correctOrder = content.flowchartItems;
  const isOrderCorrect = JSON.stringify(items) === JSON.stringify(correctOrder);
  
  const handleExplanationSubmit = () => {
    if (explanation.trim().length < 5) return;
    
    setIsExplanationSubmitted(true);
    
    const lowerExplanation = explanation.toLowerCase();
    const hasKeyword = content.reflectionKeywords.some(keyword => 
      lowerExplanation.includes(keyword.toLowerCase())
    );
    
    setIsExplanationCorrect(hasKeyword);
  };

  const isComplete = isOrderCorrect && isExplanationCorrect;

  const handleComplete = () => {
    onComplete({
      flowchartOrder: items,
      explanation
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

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
        <h3 className="font-bold text-blue-900 mb-2">Studi Kasus:</h3>
        <p className="text-blue-800 text-lg">
          {content.caseStudy}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Flowchart Area */}
        <div>
          <h3 className="font-bold text-primary mb-4">Susun Alur Pikir (Drag & Drop)</h3>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 min-h-[300px] flex flex-col items-center justify-center relative">
             <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4 w-full">
              {items.map((item) => (
                <Reorder.Item key={item} value={item}>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing flex items-center justify-between group hover:border-accent transition-colors">
                    <span className="font-medium text-slate-700">{item}</span>
                    <div className="text-slate-300 group-hover:text-accent">:::</div>
                  </div>
                  {/* Visual Arrow except for last item */}
                  {item !== items[items.length - 1] && (
                     <div className="flex justify-center py-2">
                        <ArrowDown className="text-slate-300" size={20} />
                     </div>
                  )}
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
          {isOrderCorrect && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg"
            >
                ✅ Urutan Logis Tepat!
            </motion.div>
          )}
        </div>

        {/* Explanation Area */}
        <div className="space-y-6">
          <h3 className="font-bold text-primary mb-4">Pemahaman Proses</h3>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              {content.reflectionQuestion}
            </label>
            <div className="relative">
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className={`w-full p-4 rounded-xl border focus:ring-2 outline-none min-h-[120px] ${
                    isExplanationSubmitted 
                        ? (isExplanationCorrect ? 'border-emerald-500 bg-emerald-50 focus:ring-emerald-500' : 'border-red-500 bg-red-50 focus:ring-red-500')
                        : 'border-slate-200 focus:ring-accent'
                  }`}
                  placeholder="Jelaskan alasanmu di sini..."
                  disabled={isExplanationCorrect}
                />
                
                {!isExplanationCorrect && (
                    <button 
                        onClick={handleExplanationSubmit}
                        disabled={explanation.length < 5}
                        className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-primary-light transition-colors"
                    >
                        Cek Jawaban
                    </button>
                )}
            </div>
            
            {isExplanationSubmitted && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mt-4 p-4 rounded-lg text-sm ${isExplanationCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
                >
                    <div className="flex items-start gap-2">
                        {isExplanationCorrect ? <CheckCircle2 size={16} className="mt-0.5" /> : <AlertCircle size={16} className="mt-0.5" />}
                        <div>
                            <p className="font-bold mb-1">{isExplanationCorrect ? 'Penjelasan Bagus!' : 'Kurang Tepat'}</p>
                            <p>{isExplanationCorrect ? content.reflectionFeedbackCorrect : content.reflectionFeedbackIncorrect}</p>
                        </div>
                    </div>
                </motion.div>
            )}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-sm text-slate-500 uppercase mb-2">Highlight Konsep</h4>
            <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 font-mono text-sm">{content.conceptHighlight.start}</div>
                <ArrowRight className="text-slate-400" />
                <div className="bg-accent/10 text-accent px-4 py-2 rounded-lg border border-accent/20 font-bold text-sm">{content.conceptHighlight.middle}</div>
                <ArrowRight className="text-slate-400" />
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 font-mono text-sm">{content.conceptHighlight.end}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <button
          onClick={handleComplete}
          disabled={!isComplete}
          className="bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          Lanjut ke Keputusan <ArrowRight />
        </button>
      </div>
    </div>
  );
}
