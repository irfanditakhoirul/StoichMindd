import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  HelpCircle,
  BookOpen,
  Brain,
  Settings,
  Scale,
  PenTool,
  Lightbulb,
} from "lucide-react";

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserGuideModal({
  isOpen,
  onClose,
}: UserGuideModalProps) {
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
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-xl font-bold">
                  Panduan Pengguna (User Guide)
                </h2>
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
              {/* Introduction */}
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-primary mb-2">
                  Selamat Datang di StoichMind! 👋
                </h3>
                <p className="text-slate-600">
                  Aplikasi ini dirancang untuk membantumu memahami Stoikiometri
                  bukan dengan menghafal rumus, tapi dengan memahami{" "}
                  <strong>KAPAN</strong> dan <strong>MENGAPA</strong> rumus itu
                  digunakan (Metakognisi).
                </p>
              </section>

              {/* Learning Stages */}
              <section>
                <h3 className="text-lg font-bold text-primary mb-4">
                  5 Tahapan Belajar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <Brain size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        1. Aktivasi (Deklaratif)
                      </h4>
                      <p className="text-sm text-slate-500">
                        Cek apa yang sudah kamu tahu. Mengingat kembali konsep
                        dasar.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        2. Strategi (Prosedural)
                      </h4>
                      <p className="text-sm text-slate-500">
                        Belajar langkah-langkah penyelesaian masalah secara
                        urut.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                      <Scale size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        3. Keputusan (Kondisional)
                      </h4>
                      <p className="text-sm text-slate-500">
                        Memilih rumus yang tepat sesuai kondisi soal (jangan
                        terjebak!).
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                      <PenTool size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        4. Latihan (Praktik)
                      </h4>
                      <p className="text-sm text-slate-500">
                        Mengerjakan soal dengan menandai konsep & strategi yang
                        dipakai.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 md:col-span-2">
                    <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        5. Refleksi (Metakognisi)
                      </h4>
                      <p className="text-sm text-slate-500">
                        Merenungkan apa yang sudah dipelajari agar masuk ke
                        ingatan jangka panjang.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-primary">
                  Fitur Penting
                </h3>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Materi Lengkap</h4>
                    <p className="text-sm text-slate-600">
                      Klik tombol <strong>"Buka Materi"</strong> di pojok kanan
                      atas (atau tombol biru melayang di HP) kapan saja kamu
                      lupa rumus atau konsep. Materinya sangat lengkap!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg shrink-0">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Simpan Progress Otomatis
                    </h4>
                    <p className="text-sm text-slate-600">
                      Setiap kali kamu menyelesaikan satu tahap, progressmu
                      tersimpan otomatis. Kamu bisa lanjut belajar kapan saja.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-white shrink-0 flex justify-end">
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20"
              >
                Saya Mengerti, Ayo Mulai!
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
