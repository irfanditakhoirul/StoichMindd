import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import {
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
  FileText,
  Download,
  Plus,
  Copy,
  RefreshCw,
  Lock,
  User,
  LogOut,
  Settings,
  ChevronRight,
  Shield,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lkpdList } from "../data/lkpdContent";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  set,
  push,
  update,
  remove,
} from "firebase/database";
import { app } from "../lib/firebase";
import { getAuth, signOut } from "firebase/auth";

const db = getDatabase(app);
const auth = getAuth(app);

interface StudentData {
  id: string;
  name: string;
  classCode: string;
  studentClass?: string; // "Kelas" entered by student
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
}: {
  classData: ClassData;
  onUpdate: () => void;
}) {
  const [name, setName] = useState(classData.teacherProfile?.name || "");
  const [subject, setSubject] = useState(
    classData.teacherProfile?.subject || "Kimia",
  );
  const [bio, setBio] = useState(classData.teacherProfile?.bio || "");
  const [isSaving, setIsSaving] = useState(false);

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
    </div>
  );
}

export default function TeacherDashboard() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview",
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [classToDelete, setClassToDelete] = useState<ClassData | null>(null);

  // New Class Form
  const [newClassName, setNewClassName] = useState("");
  const [newClassCode, setNewClassCode] = useState("");
  const [newClassPassword, setNewClassPassword] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    navigate("/");
  };

  const [allClasses, setAllClasses] = useState<ClassData[]>([]);
  const [classPasswordInput, setClassPasswordInput] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingClass, setPendingClass] = useState<ClassData | null>(null);

  const fetchClasses = async () => {
    try {
      const classesRef = ref(db, "classes");
      const snapshot = await get(classesRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const classList: ClassData[] = Object.keys(data).map((key) => {
          const cls = data[key];
          const isOwner = cls.teacherId === user?.id;
          // Sanitize password for non-owners to protect confidentiality
          // We keep a flag or just check if password existed, but we don't store the actual password string in state
          const hasPassword = !!cls.password;

          return {
            id: key,
            ...cls,
            password: isOwner
              ? cls.password
              : hasPassword
                ? "***LOCKED***"
                : undefined,
          };
        });
        setAllClasses(classList);
      } else {
        setAllClasses([]);
      }
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const usersRef = ref(db, "users");
      // Client-side filtering to avoid "Index not defined" error
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const studentList: StudentData[] = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((u) => u.role === "student"); // Client-side filter

        setStudents(studentList);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const handleClassClick = (cls: ClassData) => {
    // Navigate to class detail page
    // The ClassDetail page will handle authentication (password check)
    navigate(`/class/${cls.id}`);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingClass && pendingClass.password === classPasswordInput) {
      setSelectedClass(pendingClass);
      setActiveTab("overview");
      setShowPasswordModal(false);
      setPendingClass(null);
    } else {
      alert("Password kelas salah!");
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const newClassRef = push(ref(db, "classes"));
      await set(newClassRef, {
        name: newClassName,
        code: newClassCode.toUpperCase(),
        password: newClassPassword,
        teacherId: user.id,
        createdAt: new Date().toISOString(),
      });

      setNewClassName("");
      setNewClassCode("");
      setNewClassPassword("");
      setIsCreatingClass(false);
      fetchClasses();
    } catch (err) {
      console.error("Failed to create class:", err);
      alert("Gagal membuat kelas. Coba lagi.");
    }
  };

  const handleDeleteClass = async () => {
    if (!classToDelete) return;

    try {
      await remove(ref(db, `classes/${classToDelete.id}`));
      setShowDeleteConfirm(false);
      setClassToDelete(null);
      if (selectedClass?.id === classToDelete.id) {
        setSelectedClass(null);
        setActiveTab("overview");
      }
      fetchClasses();
      alert(`Kelas "${classToDelete.name}" berhasil dihapus.`);
    } catch (err) {
      console.error("Failed to delete class:", err);
      alert("Gagal menghapus kelas. Coba lagi.");
    }
  };

  // Filter students belonging to the selected class
  const filteredStudents = selectedClass
    ? students.filter((s) => s.classCode === selectedClass.code)
    : [];

  // Calculate stats
  const totalStudents = filteredStudents.length;
  const avgScore =
    totalStudents > 0
      ? Math.round(
          filteredStudents.reduce((acc, curr) => {
            const scores = curr.progress
              ? Object.values(curr.progress).reduce(
                  (a: any, b: any) => a + (b.score || 0),
                  0,
                )
              : 0;
            return acc + (scores as number);
          }, 0) / totalStudents,
        )
      : 0;
  const needHelpCount = filteredStudents.filter((s) => {
    const totalScore = s.progress
      ? Object.values(s.progress).reduce(
          (a: any, b: any) => a + (b.score || 0),
          0,
        )
      : 0;
    return (totalScore as number) < 50;
  }).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-800">Teacher Portal</h1>
            <p className="text-xs text-slate-500">StoichMind Administration</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-700">
                {user?.name || "Guru Kimia"}
              </p>
              <p className="text-xs text-slate-500">
                {user?.email || "gurukimia@gmail.com"}
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
              <User className="text-slate-500 w-5 h-5" />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Keluar"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Class Management */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-700 flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                Daftar Kelas
              </h2>
              <button
                onClick={() => setIsCreatingClass(true)}
                className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                title="Buat Kelas Baru"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {allClasses.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Belum ada kelas.
                  <br />
                  Buat kelas baru untuk mulai.
                </div>
              ) : (
                allClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className={`p-4 rounded-xl border transition-all group relative overflow-hidden ${
                      selectedClass?.id === cls.id
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "bg-white text-slate-600 border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <button
                      onClick={() => handleClassClick(cls)}
                      className="w-full text-left"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold truncate">{cls.name}</span>
                        {cls.password && (
                          <Lock
                            size={14}
                            className={
                              selectedClass?.id === cls.id
                                ? "text-white/70"
                                : "text-slate-400"
                            }
                          />
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs opacity-80">
                        <span className="font-mono">{cls.code}</span>
                        <span className="flex items-center gap-1">
                          {cls.teacherId === user?.id ? (
                            <span className="bg-white/20 px-1.5 rounded text-[10px] font-bold uppercase tracking-wide">
                              Owner
                            </span>
                          ) : (
                            <span className="text-[10px] italic">Locked</span>
                          )}
                        </span>
                      </div>
                    </button>

                    {/* Delete button - only for owner */}
                    {cls.teacherId === user?.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setClassToDelete(cls);
                          setShowDeleteConfirm(true);
                        }}
                        className={`absolute top-2 right-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${
                          selectedClass?.id === cls.id
                            ? "bg-white/20 text-white hover:bg-white/30"
                            : "bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                        title="Hapus kelas"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* LKPD Download Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-slate-700 flex items-center gap-2 mb-6">
              <FileText size={18} className="text-primary" />
              Download LKPD
            </h2>
            <div className="space-y-4">
              {lkpdList.map((lkpd) => (
                <div
                  key={lkpd.id}
                  className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">
                      {lkpd.title}
                    </h3>
                    <button
                      onClick={() => {
                        // In a real app, this would trigger a file download
                        // For now, we'll just alert or open a new window with the content
                        const newWindow = window.open("", "_blank");
                        if (newWindow) {
                          newWindow.document.write(`
                                <html>
                                <head>
                                    <title>${lkpd.title}</title>
                                    <style>
                                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
                                        
                                        body { 
                                            font-family: 'Inter', sans-serif; 
                                            padding: 40px; 
                                            line-height: 1.6; 
                                            color: #000;
                                            max-width: 800px;
                                            margin: 0 auto;
                                        }
                                        
                                        h1 { 
                                            font-size: 24px;
                                            font-weight: 800;
                                            border-bottom: 2px solid #000; 
                                            padding-bottom: 16px; 
                                            margin-bottom: 24px;
                                            text-transform: uppercase;
                                            letter-spacing: -0.02em;
                                        }
                                        
                                        h2 { 
                                            font-size: 16px;
                                            font-weight: 700;
                                            margin-top: 32px; 
                                            margin-bottom: 16px;
                                            text-transform: uppercase;
                                            letter-spacing: 0.05em;
                                            border-left: 4px solid #000;
                                            padding-left: 12px;
                                        }

                                        p {
                                            margin-bottom: 16px;
                                            text-align: justify;
                                        }
                                        
                                        .section { margin-bottom: 24px; }
                                        
                                        .box { 
                                            border: 1px solid #000; 
                                            padding: 20px; 
                                            border-radius: 0; 
                                            margin-bottom: 20px; 
                                        }

                                        .checkbox-list {
                                            list-style: none;
                                            padding: 0;
                                        }

                                        .checkbox-list li {
                                            display: flex;
                                            align-items: flex-start;
                                            gap: 12px;
                                            margin-bottom: 12px;
                                        }

                                        .checkbox {
                                            width: 16px;
                                            height: 16px;
                                            border: 1px solid #000;
                                            flex-shrink: 0;
                                            margin-top: 4px;
                                        }

                                        .line-input {
                                            display: block;
                                            width: 100%;
                                            border-bottom: 1px dashed #000;
                                            margin-top: 8px;
                                            height: 24px;
                                        }

                                        .meta-info {
                                            display: flex;
                                            justify-content: space-between;
                                            margin-bottom: 32px;
                                            font-family: 'JetBrains Mono', monospace;
                                            font-size: 12px;
                                            border-bottom: 1px solid #eee;
                                            padding-bottom: 8px;
                                        }

                                        ul, ol { margin-left: 24px; margin-bottom: 16px; }
                                        li { margin-bottom: 8px; }

                                        @media print {
                                            body { padding: 0; }
                                            button { display: none; }
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="meta-info">
                                        <span>STOICHMIND CHEMISTRY</span>
                                        <span>LEMBAR KERJA PESERTA DIDIK</span>
                                    </div>

                                    <h1>${lkpd.title}</h1>
                                    
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; font-size: 14px;">
                                        <div>
                                            <p style="margin:0"><strong>Nama:</strong> _______________________</p>
                                        </div>
                                        <div>
                                            <p style="margin:0"><strong>Kelas:</strong> _______________________</p>
                                        </div>
                                    </div>

                                    <p><strong>Deskripsi:</strong> ${lkpd.description}</p>
                                    
                                    <div class="section">
                                        <h2>Tujuan Pembelajaran</h2>
                                        <ul class="checkbox-list">
                                            ${lkpd.content.objectives
                                              .map(
                                                (o) => `
                                                <li>
                                                    <div class="checkbox"></div>
                                                    <span>${o}</span>
                                                </li>
                                            `,
                                              )
                                              .join("")}
                                        </ul>
                                    </div>

                                    <div class="section">
                                        <h2>Teori Dasar</h2>
                                        <p>${lkpd.content.theory}</p>
                                    </div>

                                    <!-- STAGE 1: ACTIVATION -->
                                    <div class="section">
                                        <h2>${lkpd.content.stages.activation.title}</h2>
                                        <p>${lkpd.content.stages.activation.description}</p>
                                        <div class="box">
                                            ${lkpd.content.stages.activation.questions
                                              .map(
                                                (q) => `
                                                <div style="margin-bottom: 24px;">
                                                    <p style="font-weight: 600; margin-bottom: 8px;">${q}</p>
                                                    <div class="line-input"></div>
                                                    <div class="line-input"></div>
                                                </div>
                                            `,
                                              )
                                              .join("")}
                                        </div>
                                    </div>

                                    <!-- STAGE 2: STRATEGY -->
                                    <div class="section">
                                        <h2>${lkpd.content.stages.strategy.title}</h2>
                                        <p>${lkpd.content.stages.strategy.description}</p>
                                        <div class="box">
                                            <ul class="checkbox-list">
                                                ${lkpd.content.stages.strategy.steps
                                                  .map(
                                                    (s) => `
                                                    <li>
                                                        <div class="checkbox"></div>
                                                        <span>${s}</span>
                                                    </li>
                                                `,
                                                  )
                                                  .join("")}
                                            </ul>
                                        </div>
                                    </div>

                                    <!-- STAGE 3: DECISION -->
                                    <div class="section">
                                        <h2>${lkpd.content.stages.decision.title}</h2>
                                        <div class="box">
                                            <p style="font-style: italic; margin-bottom: 16px;">"${lkpd.content.stages.decision.caseStudy}"</p>
                                            <p><strong>Pertanyaan:</strong> ${lkpd.content.stages.decision.question}</p>
                                            <div class="line-input"></div>
                                            <div class="line-input"></div>
                                            <div class="line-input"></div>
                                        </div>
                                    </div>

                                    <!-- STAGE 4: PRACTICE -->
                                    <div class="section">
                                        <h2>${lkpd.content.stages.practice.title}</h2>
                                        <ol>
                                            ${lkpd.content.stages.practice.questions
                                              .map(
                                                (q) => `
                                                <li style="margin-bottom: 24px;">
                                                    <span>${q}</span>
                                                    <div class="line-input"></div>
                                                    <div class="line-input"></div>
                                                </li>
                                            `,
                                              )
                                              .join("")}
                                        </ol>
                                    </div>

                                    <!-- STAGE 5: REFLECTION -->
                                    <div class="section">
                                        <h2>${lkpd.content.stages.reflection.title}</h2>
                                        <div class="box">
                                            ${lkpd.content.stages.reflection.questions
                                              .map(
                                                (q) => `
                                                <div style="margin-bottom: 24px;">
                                                    <p style="margin-bottom: 8px;">${q}</p>
                                                    <div class="line-input"></div>
                                                </div>
                                            `,
                                              )
                                              .join("")}
                                        </div>
                                    </div>
                                    
                                    <div style="margin-top: 50px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; border-top: 1px solid #000; padding-top: 20px;">
                                        StoichMind Chemistry Learning Module
                                    </div>
                                    <script>window.print();</script>
                                </body>
                                </html>
                            `);
                          newWindow.document.close();
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Download / Print"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {lkpd.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-8">
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <BookOpen size={32} className="text-primary/40" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              Pilih atau Buat Kelas
            </h3>
            <p className="text-slate-500 max-w-md">
              Pilih kelas dari menu di sebelah kiri untuk melihat detail siswa,
              atau buat kelas baru untuk memulai.
            </p>
            <button
              onClick={() => setIsCreatingClass(true)}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all flex items-center gap-2"
            >
              <Plus size={20} /> Buat Kelas Baru
            </button>
          </div>
        </main>
      </div>

      {/* Access Password Modal */}
      {showPasswordModal && pendingClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Lock size={18} className="text-primary" /> Akses Kelas
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <LogOut size={20} className="rotate-45" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4">
                Masukkan password untuk mengakses kelas{" "}
                <strong>{pendingClass.name}</strong>.
              </p>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  value={classPasswordInput}
                  onChange={(e) => setClassPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none text-center tracking-widest font-bold"
                  placeholder="Password Kelas"
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
                >
                  Buka Kelas
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {isCreatingClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">
                Buat Kelas Baru
              </h3>
              <button
                onClick={() => setIsCreatingClass(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <LogOut size={20} className="rotate-45" />{" "}
                {/* Using LogOut as Close icon rotated */}
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nama Kelas
                </label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Contoh: X IPA 1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Kode Kelas (Unik)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newClassCode}
                    onChange={(e) =>
                      setNewClassCode(e.target.value.toUpperCase())
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none uppercase font-mono tracking-wider"
                    placeholder="KIMIA-X1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setNewClassCode(
                        "KIMIA-" + Math.floor(Math.random() * 10000),
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:underline"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-2">
                  Password Kelas <Lock size={12} />
                </label>
                <input
                  type="text"
                  value={newClassPassword}
                  onChange={(e) => setNewClassPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Opsional (untuk keamanan)"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Jika diisi, siswa harus memasukkan password ini saat
                  bergabung.
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingClass(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
                >
                  Buat Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Class Confirmation Modal */}
      {showDeleteConfirm && classToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-red-50">
              <h3 className="font-bold text-lg text-red-600 flex items-center gap-2">
                <AlertCircle size={18} /> Hapus Kelas?
              </h3>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setClassToDelete(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <LogOut size={20} className="rotate-45" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-slate-600 mb-6">
                Apakah Anda yakin ingin menghapus kelas{" "}
                <strong className="text-slate-800">
                  "{classToDelete.name}"
                </strong>
                ?
                <br />
                <br />
                <span className="text-sm text-red-600 font-semibold">
                  ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data kelas akan
                  dihapus secara permanen.
                </span>
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
                <p className="text-xs text-red-700">
                  <strong>Kode Kelas:</strong> {classToDelete.code}
                  <br />
                  <strong>Jumlah Siswa:</strong>{" "}
                  {classToDelete.studentCount || 0} siswa
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setClassToDelete(null);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteClass}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
