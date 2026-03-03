import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Star, Trophy, Clock, HelpCircle, User, Award, X, Lock, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import UserGuideModal from '../components/UserGuideModal';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import { app } from '../lib/firebase';
import { chapters } from '../data/chapters';

const db = getDatabase(app);

export default function Dashboard() {
  const { user, progress, login, logout } = useStore();
  const navigate = useNavigate();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [teacherName, setTeacherName] = useState<string>('-');
  
  // Join Class State
  const [joinCode, setJoinCode] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [requireJoinPassword, setRequireJoinPassword] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);

  // Calculate overall progress
  const totalChapters = chapters.length;
  const completedChaptersCount = chapters.filter(ch => progress[ch.id]?.completed).length;
  const overallProgressPercent = Math.round((completedChaptersCount / totalChapters) * 100);

  // Calculate specific mole concept progress for the hero section (or change hero to be generic)
  const nextChapter = chapters.find(ch => !progress[ch.id]?.completed) || chapters[0];

  useEffect(() => {
    const fetchTeacher = async () => {
      if (user?.classCode) {
        try {
          // Find class to get teacherId
          const classesRef = ref(db, 'classes');
          const snapshot = await get(classesRef);
          if (snapshot.exists()) {
            const classes = snapshot.val();
            const myClass = Object.values(classes).find((c: any) => c.code === user.classCode) as any;
            
            if (myClass) {
              // Check for class-specific teacher profile first
              if (myClass.teacherProfile?.name) {
                setTeacherName(myClass.teacherProfile.name);
              } else if (myClass.teacherId) {
                // Fallback to global user profile
                const teacherSnapshot = await get(child(ref(db), `users/${myClass.teacherId}`));
                if (teacherSnapshot.exists()) {
                  setTeacherName(teacherSnapshot.val().name);
                }
              }
            }
          }
        } catch (err) {
          console.error("Error fetching teacher:", err);
        }
      }
    };
    fetchTeacher();
  }, [user?.classCode]);

  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError('');
    setJoinLoading(true);

    try {
        const classesRef = ref(db, 'classes');
        const snapshot = await get(classesRef);
        let foundClass: any = null;
        
        if (snapshot.exists()) {
            const classes = snapshot.val();
            foundClass = Object.values(classes).find((c: any) => c.code === joinCode.toUpperCase());
        }

        if (!foundClass) {
            throw new Error("Kode Kelas tidak ditemukan.");
        }

        // Check Class Password
        if (foundClass.password && !requireJoinPassword) {
            setRequireJoinPassword(true);
            setJoinLoading(false);
            return; 
        }

        if (foundClass.password && requireJoinPassword) {
            if (joinPassword !== foundClass.password) {
                throw new Error("Password kelas salah.");
            }
        }

        // Update User Profile
        if (user?.id) {
            await update(ref(db, `users/${user.id}`), {
                classCode: joinCode.toUpperCase()
            });
            
            // Update local store
            login({ ...user, classCode: joinCode.toUpperCase() });
            
            setJoinCode('');
            setJoinPassword('');
            setRequireJoinPassword(false);
            alert("Berhasil bergabung ke kelas!");
        }

    } catch (err: any) {
        setJoinError(err.message);
    } finally {
        setJoinLoading(false);
    }
  };

  // Calculate achievements
  const achievements = [];
  if (user?.classCode) achievements.push({ id: 1, title: 'Siswa Teladan', desc: 'Bergabung dalam kelas', icon: '🎓' });
  
  const completedChapters = Object.values(progress).filter(p => p.completed).length;
  if (completedChapters >= 1) achievements.push({ id: 2, title: 'Pemula Stoikiometri', desc: 'Menyelesaikan 1 bab', icon: '🌱' });
  if (completedChapters >= 3) achievements.push({ id: 3, title: 'Ahli Kimia', desc: 'Menyelesaikan 3 bab', icon: '🧪' });
  if (completedChapters === totalChapters) achievements.push({ id: 4, title: 'Master Stoikiometri', desc: 'Menuntaskan semua bab', icon: '🏆' });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <UserGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-primary p-6 text-white relative">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full"
                >
                  <X size={20} />
                </button>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <User size={40} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-primary-light text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                
                {/* Class Info or Join Class */}
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Kelas</p>
                        <p className="font-mono font-bold text-slate-700 text-lg">{user?.studentClass || '-'}</p>
                    </div>

                    {user?.classCode ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Kode Kelas</p>
                                <p className="font-mono font-bold text-slate-700 text-lg">{user.classCode}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Guru</p>
                                <p className="font-bold text-slate-700 truncate" title={teacherName}>{teacherName}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <LogIn size={18} className="text-primary" /> Gabung Kelas Guru
                            </h3>
                            <p className="text-xs text-slate-500 mb-3">Masukkan kode kelas dari guru Anda untuk terhubung ke dashboard guru.</p>
                            <form onSubmit={handleJoinClass} className="space-y-3">
                            <div>
                                <input 
                                    type="text" 
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                    placeholder="Masukkan Kode Kelas"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none font-mono uppercase"
                                    required
                                />
                            </div>
                            
                            {requireJoinPassword && (
                                <div className="animate-in fade-in slide-in-from-top-2">
                                    <input 
                                        type="password" 
                                        value={joinPassword}
                                        onChange={(e) => setJoinPassword(e.target.value)}
                                        placeholder="Password Kelas"
                                        className="w-full px-4 py-2 rounded-lg border border-primary ring-1 ring-primary/20 outline-none"
                                        autoFocus
                                        required
                                    />
                                </div>
                            )}

                            {joinError && <p className="text-xs text-red-500">{joinError}</p>}

                            <button 
                                type="submit"
                                disabled={joinLoading}
                                className="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-primary-light transition-colors shadow-lg shadow-primary/10"
                            >
                                {joinLoading ? 'Memproses...' : 'Gabung Sekarang'}
                            </button>
                        </form>
                    </div>
                )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Award className="text-accent" size={18} /> Pencapaian
                  </h3>
                  <div className="space-y-3">
                    {achievements.length === 0 ? (
                      <p className="text-slate-400 text-sm italic text-center py-4">Belum ada pencapaian. Ayo mulai belajar!</p>
                    ) : (
                      achievements.map(ach => (
                        <div key={ach.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                          <div className="text-2xl">{ach.icon}</div>
                          <div>
                            <h4 className="font-bold text-slate-700 text-sm">{ach.title}</h4>
                            <p className="text-xs text-slate-500">{ach.desc}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                    <button 
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="w-full flex items-center justify-center gap-2 text-red-500 font-bold py-3 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut size={20} /> Keluar Akun
                    </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="mb-12 flex flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-500">Ready to continue your metacognitive journey?</p>
        </div>
        <div className="flex gap-3 w-auto shrink-0">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 hover:bg-slate-50 transition-colors hidden sm:flex"
            >
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <HelpCircle size={18} />
                </div>
                <div className="text-left">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Bantuan</p>
                    <p className="font-bold text-primary text-xs">Panduan</p>
                </div>
            </button>

            <button
              onClick={() => setIsGuideOpen(true)}
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors sm:hidden"
              title="Panduan"
            >
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <HelpCircle size={18} />
                </div>
            </button>

            <button 
              onClick={() => setIsProfileOpen(true)}
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 hover:bg-slate-50 transition-colors hidden sm:flex"
            >
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                    <User size={18} />
                </div>
                <div className="text-left">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Profil</p>
                    <p className="font-bold text-primary text-xs">Siswa</p>
                </div>
            </button>

            <button 
              onClick={() => setIsProfileOpen(true)}
              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors sm:hidden"
              title="Profil"
            >
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                    <User size={18} />
                </div>
            </button>
        </div>
      </header>

      {/* Overall Progress */}
      <section className="mb-12">
        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-slate-300 mb-6 max-w-md">
                You've completed {completedChaptersCount} of {totalChapters} chapters. Keep up the great work!
              </p>
              <button 
                onClick={() => navigate(`/chapter/${nextChapter.id}`)}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                Continue Learning: {nextChapter.title} <ChevronRight size={18} />
              </button>
            </div>
            <div className="w-32 h-32 relative flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                 <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="transparent" 
                    className="text-accent" 
                    strokeDasharray={351.86} 
                    strokeDashoffset={351.86 - (351.86 * overallProgressPercent) / 100} 
                    strokeLinecap="round" 
                 />
               </svg>
               <span className="absolute text-2xl font-bold">{overallProgressPercent}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section>
        <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <BookOpen className="text-accent" /> Learning Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const chapterProgress = progress[chapter.id] || { stage: 0, completed: false, score: 0, quizCompleted: false, quizScore: 0 };
            const progressPercent = (chapterProgress.stage / 5) * 100;

            return (
            <motion.div
              key={chapter.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 cursor-pointer"
              onClick={() => navigate(`/chapter/${chapter.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{chapter.icon}</div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</div>
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">{chapter.title}</h4>
              <p className="text-slate-500 text-sm mb-6">{chapter.description}</p>
              
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-accent h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              
              {chapterProgress?.quizCompleted && (
                <div className="flex items-center justify-between text-xs font-medium bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
                  <span>Nilai Quiz:</span>
                  <span className="font-bold text-sm">{chapterProgress.quizScore}</span>
                </div>
              )}
            </motion.div>
          )})}
        </div>
      </section>
    </div>
  );
}
