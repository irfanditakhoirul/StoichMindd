import { create } from "zustand";
import {
  getDatabase,
  ref,
  set,
  update,
  get as firebaseGet,
  child,
} from "firebase/database";
import { app } from "../lib/firebase";

const db = getDatabase(app);

export type UserRole = "student" | "teacher";

interface User {
  id: string;
  name: string;
  role: UserRole;
  classCode?: string;
  studentClass?: string; // "Kelas" entered by student (e.g. X IPA 1)
  email?: string;
}

interface ChapterProgress {
  chapterId: string;
  stage: number; // 0-5 (0 = not started, 5 = completed)
  completed: boolean;
  score: number;
  quizScore?: number; // Score for the final quiz (0-100)
  quizCompleted?: boolean;
  stages?: Record<number, any>; // Store detailed answers for each stage
  studentDifficulty?: {
    timestamp: string; // Waktu siswa mengisi refleksi
    difficulty: string; // Kesulitan yang dilaporkan siswa
  };
}

interface AppState {
  user: User | null;
  progress: Record<string, ChapterProgress>;
  login: (user: User) => void;
  logout: () => void;
  updateProgress: (chapterId: string, stage: number, score?: number) => void;
  saveStageData: (chapterId: string, stage: number, data: any) => void;
  submitQuizScore: (chapterId: string, score: number) => void;
  saveDifficulty: (chapterId: string, difficulty: string) => void;
  loadProgress: (userId: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  progress: {},
  login: (user) => set({ user }),
  logout: () => set({ user: null, progress: {} }),

  loadProgress: async (userId) => {
    try {
      const snapshot = await firebaseGet(
        child(ref(db), `users/${userId}/progress`),
      );
      if (snapshot.exists()) {
        set({ progress: snapshot.val() });
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  },

  updateProgress: (chapterId, stage, score) => {
    const state = get();
    const currentChapter = state.progress[chapterId] || {
      chapterId,
      stage: 0,
      completed: false,
      score: 0,
    };

    const newProgress = {
      ...state.progress,
      [chapterId]: {
        ...currentChapter,
        stage: Math.max(currentChapter.stage, stage),
        score: score !== undefined ? score : currentChapter.score || 0,
        completed: stage === 5,
      },
    };

    set({ progress: newProgress });

    // Sync with Firebase
    if (state.user?.id) {
      update(ref(db, `users/${state.user.id}/progress`), newProgress).catch(
        console.error,
      );
    }
  },

  saveStageData: (chapterId, stage, data) => {
    const state = get();
    const currentChapter = state.progress[chapterId] || {
      chapterId,
      stage: 0,
      completed: false,
      score: 0,
    };

    const newProgress = {
      ...state.progress,
      [chapterId]: {
        ...currentChapter,
        stages: {
          ...currentChapter.stages,
          [stage]: data,
        },
      },
    };

    set({ progress: newProgress });

    // Sync with Firebase
    if (state.user?.id) {
      update(
        ref(db, `users/${state.user.id}/progress/${chapterId}/stages/${stage}`),
        data,
      ).catch(console.error);
    }
  },

  submitQuizScore: (chapterId, score) => {
    const state = get();
    const currentChapter = state.progress[chapterId] || {
      chapterId,
      stage: 0,
      completed: false,
      score: 0,
    };

    const newProgress = {
      ...state.progress,
      [chapterId]: {
        ...currentChapter,
        quizScore: score,
        quizCompleted: true,
        score: score,
      },
    };

    set({ progress: newProgress });

    // Sync with Firebase
    if (state.user?.id) {
      update(ref(db, `users/${state.user.id}/progress`), newProgress).catch(
        console.error,
      );
    }
  },

  saveDifficulty: (chapterId, difficulty) => {
    const state = get();
    const currentChapter = state.progress[chapterId] || {
      chapterId,
      stage: 0,
      completed: false,
      score: 0,
    };

    const newProgress = {
      ...state.progress,
      [chapterId]: {
        ...currentChapter,
        studentDifficulty: {
          timestamp: new Date().toISOString(),
          difficulty: difficulty,
        },
      },
    };

    set({ progress: newProgress });

    // Sync with Firebase
    if (state.user?.id) {
      update(ref(db, `users/${state.user.id}/progress/${chapterId}`), {
        studentDifficulty: {
          timestamp: new Date().toISOString(),
          difficulty: difficulty,
        },
      }).catch(console.error);
    }
  },
}));
