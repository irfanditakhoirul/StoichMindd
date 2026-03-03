import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen } from 'lucide-react';
import { ChapterMaterial } from '../data/materials';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: ChapterMaterial;
}

export default function MaterialModal({ isOpen, onClose, material }: MaterialModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-xl font-bold">{material.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50">
              {material.sections.map((section, idx) => (
                <section key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-4 border-b border-slate-100 pb-2">
                    {section.heading}
                  </h3>
                  <div 
                    className="prose prose-slate max-w-none text-slate-600"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-white shrink-0 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-medium transition-colors"
              >
                Tutup Materi
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
