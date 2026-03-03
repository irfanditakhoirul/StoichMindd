import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import {
  ChevronLeft,
  CheckCircle,
  Brain,
  Settings,
  Scale,
  PenTool,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { materials } from "../data/materials";
import { chapterContents } from "../data/chapterContent";
import MaterialModal from "../components/MaterialModal";

// Stages Components
import Stage1Activation from "../components/stages/Stage1Activation";
import Stage2Strategy from "../components/stages/Stage2Strategy";
import Stage3Decision from "../components/stages/Stage3Decision";
import Stage4Practice from "../components/stages/Stage4Practice";
import Stage5Reflection from "../components/stages/Stage5Reflection";

const stages = [
  {
    id: 1,
    title: "Aktivasi",
    icon: Brain,
    color: "text-blue-500",
    label: "Deklaratif",
  },
  {
    id: 2,
    title: "Strategi",
    icon: Settings,
    color: "text-purple-500",
    label: "Prosedural",
  },
  {
    id: 3,
    title: "Keputusan",
    icon: Scale,
    color: "text-orange-500",
    label: "Kondisional",
  },
  {
    id: 4,
    title: "Latihan",
    icon: PenTool,
    color: "text-emerald-500",
    label: "Praktik",
  },
  {
    id: 5,
    title: "Refleksi",
    icon: Lightbulb,
    color: "text-yellow-500",
    label: "Metakognisi",
  },
];

export default function Chapter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, updateProgress, saveStageData } = useStore();
  const [currentStage, setCurrentStage] = useState(1);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  const chapterId = id || "mole-concept";
  const chapterProgress = progress[chapterId] || {
    stage: 0,
    completed: false,
    score: 0,
    stages: {},
  };
  const currentMaterial = materials[chapterId] || materials["mole-concept"];
  const currentContent =
    chapterContents[chapterId] || chapterContents["mole-concept"];

  useEffect(() => {
    if (chapterProgress.stage > 0) {
      setCurrentStage(Math.min(chapterProgress.stage + 1, 5));
    }
  }, []);

  const handleStageComplete = (data?: any) => {
    if (data) {
      saveStageData(chapterId, currentStage, data);
    }
    updateProgress(chapterId, currentStage);
    if (currentStage < 5) {
      setCurrentStage(currentStage + 1);
    }
  };

  const renderStage = () => {
    const stageData = chapterProgress.stages?.[currentStage];

    switch (currentStage) {
      case 1:
        return (
          <Stage1Activation
            onComplete={handleStageComplete}
            content={currentContent.stage1}
            initialData={stageData}
          />
        );
      case 2:
        return (
          <Stage2Strategy
            onComplete={handleStageComplete}
            content={currentContent.stage2}
            initialData={stageData}
          />
        );
      case 3:
        return (
          <Stage3Decision
            onComplete={handleStageComplete}
            content={currentContent.stage3}
            initialData={stageData}
          />
        );
      case 4:
        return (
          <Stage4Practice
            onComplete={handleStageComplete}
            content={currentContent.stage4}
            initialData={stageData}
          />
        );
      case 5:
        return (
          <Stage5Reflection
            onComplete={handleStageComplete}
            topicTitle={currentContent.title}
            initialData={stageData}
            chapterId={chapterId}
          />
        );
      default:
        return <div>Unknown Stage</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        material={currentMaterial}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="font-bold text-primary text-lg">
              {currentMaterial.title.replace("Materi Lengkap: ", "")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMaterialOpen(true)}
              className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            >
              <BookOpen size={18} />
              Buka Materi
            </button>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-slate-500 hidden sm:block">
                Progress:
              </div>
              <div className="w-24 sm:w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${(chapterProgress.stage / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm font-bold text-primary">
                {(chapterProgress.stage / 5) * 100}%
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Learning Path
            </h3>
            <div className="space-y-2">
              {stages.map((stage) => {
                const isActive = currentStage === stage.id;
                const isCompleted = chapterProgress.stage >= stage.id;
                const isLocked =
                  chapterProgress.stage < stage.id - 1 && !isActive;

                return (
                  <button
                    key={stage.id}
                    onClick={() => !isLocked && setCurrentStage(stage.id)}
                    disabled={isLocked}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "hover:bg-slate-50 text-slate-600",
                      isLocked &&
                        "opacity-50 cursor-not-allowed hover:bg-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        isActive ? "bg-white/10" : "bg-slate-100",
                        isCompleted &&
                          !isActive &&
                          "bg-emerald-100 text-emerald-600",
                      )}
                    >
                      {isCompleted && !isActive ? (
                        <CheckCircle size={16} />
                      ) : (
                        <stage.icon size={16} />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{stage.title}</div>
                      <div
                        className={cn(
                          "text-xs opacity-80",
                          isActive ? "text-slate-300" : "text-slate-400",
                        )}
                      >
                        {stage.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile/Sidebar Material Button */}
            <button
              onClick={() => setIsMaterialOpen(true)}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-bold hover:bg-blue-100 transition-colors md:hidden"
            >
              <BookOpen size={20} />
              Buka Materi Lengkap
            </button>

            {/* Quiz Button (Only if completed) */}
            {chapterProgress.completed && (
              <button
                onClick={() => navigate(`/quiz/${chapterId}`)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <PenTool size={20} />
                Latihan Soal Akhir
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 min-h-[600px] p-8 relative"
            >
              {/* In-stage Material Button (Floating top-right for easy access) */}
              <button
                onClick={() => setIsMaterialOpen(true)}
                className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-full transition-colors"
                title="Buka Materi"
              >
                <BookOpen size={20} />
              </button>

              {renderStage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setIsMaterialOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center md:hidden z-40 hover:bg-blue-700 transition-colors"
      >
        <BookOpen size={24} />
      </button>
    </div>
  );
}
