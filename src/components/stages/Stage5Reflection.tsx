import React, { useState } from "react";
import { motion } from "motion/react";
import { Save, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";

interface Props {
  onComplete: (data?: any) => void;
  topicTitle: string;
  initialData?: any;
  chapterId?: string;
}

export default function Stage5Reflection({
  onComplete,
  topicTitle,
  initialData,
  chapterId,
}: Props) {
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "");
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const { saveDifficulty, user } = useStore();

  const isFormValid = difficulty.length > 5;

  const handleFinish = () => {
    setIsFinished(true);
    // Save difficulty to store and Firebase
    if (chapterId && user?.id) {
      saveDifficulty(chapterId, difficulty);
    }
    onComplete({ difficulty });
  };

  if (isFinished) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-yellow-100 p-8 rounded-full mb-8"
        >
          <Award size={64} className="text-yellow-600" />
        </motion.div>
        <h2 className="text-4xl font-bold text-primary mb-4">
          Master of {topicTitle}!
        </h2>
        <p className="text-slate-500 text-lg max-w-md mb-8">
          Selamat! Kamu telah menyelesaikan sub-bab {topicTitle} dengan
          pendekatan metakognitif yang lengkap.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Refleksi Pembelajaran
        </h2>
        <p className="text-slate-500">
          Ceritakan kesulitan yang kamu hadapi agar guru dapat membantumu lebih
          baik.
        </p>
      </div>

      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 max-w-2xl mx-auto">
        <label className="block font-bold text-primary mb-4 text-lg">
          {topicTitle}: Kesulitan atau Pertanyaan?
        </label>
        <textarea
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none h-40 resize-none"
          placeholder="Jelaskan bagian mana yang paling sulit kamu pahami dan apa yang membuat kamu bingung..."
        />
        <div className="mt-3 text-sm text-slate-500">
          {difficulty.length} / 500 karakter
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleFinish}
          disabled={!isFormValid}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-accent/20"
        >
          <Save size={20} /> Simpan & Selesaikan Bab
        </button>
      </div>
    </div>
  );
}
