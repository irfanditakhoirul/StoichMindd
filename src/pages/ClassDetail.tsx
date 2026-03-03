import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import {
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Lock,
  Copy,
  Settings,
  ArrowLeft,
  User,
  Eye,
  EyeOff,
  FileText,
  Trash2,
} from "lucide-react";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import { app } from "../lib/firebase";
import StudentDetailModal from "../components/StudentDetailModal";
import { chapters } from "../data/chapters";

const db = getDatabase(app);

interface StudentData {
  id: string;
  name: string;
  classCode: string;
  studentClass?: string;
  progress: any;
  joinedAt: string;
}

interface ClassData {
  id: string;
  name: string;
  code: string;
  password?: string;
  teacherId: string;
  studentCount: number;
  teacherProfile?: {
    name: string;
    subject: string;
    bio: string;
  };
}

function ClassSettings({
  classData,
  onUpdate,
  onDelete,
}: {
  classData: ClassData;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(classData.teacherProfile?.name || "");
  const [subject, setSubject] = useState(
    classData.teacherProfile?.subject || "Kimia",
  );
  const [bio, setBio] = useState(classData.teacherProfile?.bio || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await update(ref(db, `classes/${classData.id}/teacherProfile`), {
        name,
        subject,
        bio,
      });
      onUpdate();
      alert("Profil guru untuk kelas ini berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan profil.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClass = async () => {
    setIsDeleting(true);
    try {
      await remove(ref(db, `classes/${classData.id}`));
      setShowDeleteConfirm(false);
      alert(`Kelas "${classData.name}" berhasil dihapus.`);
      onDelete();
    } catch (err) {
      console.error("Failed to delete class:", err);
      alert("Gagal menghapus kelas. Coba lagi.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
        <User className="text-primary" size={20} /> Profil Guru (Kelas Ini)
      </h3>
      <p className="text-slate-500 text-sm mb-6">
        Informasi ini akan ditampilkan kepada siswa yang tergabung dalam kelas{" "}
        <strong>{classData.name}</strong>.
      </p>

      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Nama Tampilan
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Contoh: Pak Budi, S.Pd."
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Mata Pelajaran
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Contoh: Kimia Dasar"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Pesan / Bio Singkat
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none h-24 resize-none"
            placeholder="Pesan penyemangat untuk siswa..."
          />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all disabled:opacity-70"
        >
          {isSaving ? "Menyimpan..." : "Simpan Profil"}
        </button>
      </form>

      {/* Delete Class Section */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h4 className="font-bold text-slate-800 mb-2 text-sm text-red-600">
          Zona Berbahaya
        </h4>
        <p className="text-slate-500 text-sm mb-4">
          Menghapus kelas bersifat permanen dan tidak dapat dibatalkan.
        </p>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all flex items-center gap-2 text-sm"
        >
          <Trash2 size={16} /> Hapus Kelas
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 bg-red-50">
              <h3 className="font-bold text-lg text-red-600 flex items-center gap-2">
                <AlertCircle size={18} /> Hapus Kelas?
              </h3>
            </div>

            <div className="p-6">
              <p className="text-slate-600 mb-6">
                Apakah Anda yakin ingin menghapus kelas{" "}
                <strong className="text-slate-800">"{classData.name}"</strong>?
                <br />
                <br />
                <span className="text-sm text-red-600 font-semibold">
                  ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data kelas dan
                  riwayat pembelajaran siswa akan dihapus secara permanen.
                </span>
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
                <p className="text-xs text-red-700">
                  <strong>Kode Kelas:</strong> {classData.code}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteClass}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Trash2 size={18} /> {isDeleting ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { user } = useStore();

  const [classData, setClassData] = useState<ClassData | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const fetchClassData = async () => {
    if (!classId) return;
    try {
      const snapshot = await get(ref(db, `classes/${classId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const cls = { id: classId, ...data };
        setClassData(cls);

        // Only auto-authenticate if class has no password
        if (!cls.password) {
          setIsAuthenticated(true);
          fetchStudents(cls.code);
        }
      } else {
        alert("Kelas tidak ditemukan");
        navigate("/teacher-dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async (code: string) => {
    try {
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const studentList: StudentData[] = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((u) => u.role === "student" && u.classCode === code);
        setStudents(studentList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [classId]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if class has password
    if (classData?.password) {
      if (classData.password === passwordInput) {
        setIsAuthenticated(true);
        fetchStudents(classData.code);
      } else {
        setError("Password salah! Silakan coba lagi.");
        setPasswordInput("");
      }
    } else {
      // If no password, just allow access (though this case should be handled by auto-auth logic usually)
      setIsAuthenticated(true);
      fetchStudents(classData!.code);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!classData) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-6">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="text-primary w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Akses Terbatas
            </h2>
            <p className="text-slate-500 mt-2">
              Masukkan password untuk mengakses kelas{" "}
              <strong>{classData.name}</strong>
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3 rounded-xl border ${error ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-primary"} focus:ring-2 outline-none text-center tracking-widest font-bold text-lg transition-all`}
                placeholder="Password Kelas"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/teacher-dashboard")}
                className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
              >
                Masuk Kelas
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Difficult Materials
  const difficultChapters = chapters
    .map((chapter) => {
      let totalQuizScore = 0;
      let studentCountWithQuiz = 0;

      students.forEach((student) => {
        const chapterProgress = student.progress?.[chapter.id];
        if (
          chapterProgress?.quizCompleted &&
          chapterProgress.quizScore !== undefined
        ) {
          totalQuizScore += chapterProgress.quizScore;
          studentCountWithQuiz++;
        }
      });

      const avgScore =
        studentCountWithQuiz > 0 ? totalQuizScore / studentCountWithQuiz : 0;

      return {
        ...chapter,
        avgScore,
        studentCount: studentCountWithQuiz,
      };
    })
    .filter((c) => c.studentCount > 0 && c.avgScore < 60);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate("/teacher-dashboard")}
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Detail Kelas</h1>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-row justify-between items-center gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
                  {classData.name}
                </h2>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 shrink-0">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-6 text-slate-500 overflow-x-auto">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs sm:text-sm font-medium">Kode:</span>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono font-bold text-xs">
                    {classData.code}
                  </code>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(classData.code)
                    }
                    className="text-slate-400 hover:text-primary transition-colors shrink-0"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-colors ${activeTab === "overview" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-bold text-sm transition-colors ${activeTab === "settings" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        </div>

        {activeTab === "overview" ? (
          <>
            {/* Difficult Materials Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="text-red-500" size={20} />
                Materi Sulit Dipelajari
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Materi berikut memiliki rata-rata nilai kuis di bawah 60. Siswa
                mungkin memerlukan penjelasan tambahan.
              </p>

              {difficultChapters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {difficultChapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-4"
                    >
                      <div className="text-3xl">{chapter.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {chapter.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                            Rata-rata: {Math.round(chapter.avgScore)}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({chapter.studentCount} Siswa)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  <p className="text-slate-500 font-medium">
                    Tidak ada materi yang terdeteksi sulit saat ini. 🎉
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Semua materi memiliki rata-rata nilai di atas 60.
                  </p>
                </div>
              )}
            </div>

            {/* Student Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} />
                  Daftar Siswa
                </h3>
                <button
                  onClick={() => fetchStudents(classData.code)}
                  className="p-2 text-slate-400 hover:text-primary transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {students.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-slate-300" />
                  </div>
                  <h4 className="font-bold text-slate-600 mb-1">
                    Belum ada siswa
                  </h4>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">
                    Bagikan kode kelas{" "}
                    <span className="font-mono font-bold text-slate-600">
                      {classData.code}
                    </span>{" "}
                    kepada siswa Anda untuk mulai memantau progress mereka.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                      <tr>
                        <th className="px-6 py-4">Nama Siswa</th>
                        <th className="px-6 py-4">Kelas Siswa</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Total Skor</th>
                        <th className="px-6 py-4">Progress</th>
                        <th className="px-6 py-4">Kesulitan yang Dilaporkan</th>
                        <th className="px-6 py-4">Bergabung</th>
                        <th className="px-6 py-4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((student) => {
                        const progressList = student.progress
                          ? Object.values(student.progress)
                          : [];
                        const totalScore = progressList.reduce(
                          (acc: any, curr: any) => acc + (curr.score || 0),
                          0,
                        );
                        const completedChapters = progressList.filter(
                          (p: any) => p.completed,
                        ).length;
                        const joinDate = student.joinedAt
                          ? new Date(student.joinedAt).toLocaleDateString(
                              "id-ID",
                              { day: "numeric", month: "short" },
                            )
                          : "-";

                        // Get student difficulties from all chapters
                        const difficulties =
                          student.progress &&
                          typeof student.progress === "object"
                            ? Object.entries(student.progress)
                                .map(
                                  ([, chp]: [string, any]) =>
                                    chp.studentDifficulty,
                                )
                                .filter((d) => d)
                                .sort(
                                  (a, b) =>
                                    new Date(b.timestamp).getTime() -
                                    new Date(a.timestamp).getTime(),
                                )
                            : [];
                        const latestDifficulty =
                          difficulties.length > 0 ? difficulties[0] : null;

                        return (
                          <tr
                            key={student.id}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-700">
                                {student.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {student.id.substring(0, 6)}...
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                {student.studentClass || "-"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                  progressList.length > 0
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                    : "bg-slate-50 text-slate-500 border-slate-100"
                                }`}
                              >
                                {progressList.length > 0
                                  ? "Aktif"
                                  : "Terdaftar"}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono font-medium text-slate-600">
                              {totalScore}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-primary h-full rounded-full"
                                    style={{
                                      width: `${(completedChapters / 5) * 100}%`,
                                    }} // Assuming 5 chapters max for demo
                                  ></div>
                                </div>
                                <span className="text-xs text-slate-500">
                                  {completedChapters} Bab
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {latestDifficulty ? (
                                <div className="max-w-xs">
                                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs">
                                    <p className="text-yellow-800 font-semibold mb-1">
                                      {latestDifficulty.difficulty.substring(
                                        0,
                                        80,
                                      )}
                                      {latestDifficulty.difficulty.length > 80
                                        ? "..."
                                        : ""}
                                    </p>
                                    <p className="text-yellow-600 text-[10px]">
                                      {new Date(
                                        latestDifficulty.timestamp,
                                      ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-slate-400 text-xs italic">
                                  Belum ada laporan
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              {joinDate}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedStudent(student)}
                                className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <FileText size={14} /> Detail
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <ClassSettings
            classData={classData}
            onUpdate={fetchClassData}
            onDelete={() => navigate("/teacher-dashboard")}
          />
        )}
      </div>

      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
