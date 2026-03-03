import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { GraduationCap, School, UserPlus, LogIn, Lock } from "lucide-react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "../lib/firebase";

const auth = getAuth(app);
const db = getDatabase(app);

type AuthMode = "login" | "register";

export default function Login() {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [mode, setMode] = useState<AuthMode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classPassword, setClassPassword] = useState("");
  const [requireClassPassword, setRequireClassPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useStore((state) => state.login);
  const loadProgress = useStore((state) => state.loadProgress);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (role === "teacher") {
        // Teacher Login
        await signInWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser;
        if (user) {
          // Fetch teacher profile from DB
          const snapshot = await get(child(ref(db), `users/${user.uid}`));
          let teacherName = "Guru";

          if (snapshot.exists()) {
            const userData = snapshot.val();
            teacherName = userData.name || "Guru";
          } else {
            // If teacher doesn't exist in DB but exists in Auth (e.g. manually created), create a default profile
            // or just use default name. Ideally we should save it.
            await set(ref(db, `users/${user.uid}`), {
              name: "Guru Baru",
              email: user.email,
              role: "teacher",
              joinedAt: new Date().toISOString(),
            });
            teacherName = "Guru Baru";
          }

          login({
            id: user.uid,
            name: teacherName,
            role: "teacher",
            email: user.email || "",
          });
          navigate("/teacher-dashboard");
        }
      } else {
        // Student Auth
        if (mode === "register") {
          if (!name || !studentClass) {
            throw new Error("Nama Lengkap dan Kelas wajib diisi.");
          }

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;

          // Save user data to Realtime DB
          await set(ref(db, "users/" + user.uid), {
            name,
            email,
            role: "student",
            studentClass, // Saved here
            joinedAt: new Date().toISOString(),
          });

          login({ id: user.uid, name, role: "student", studentClass, email });
          navigate("/dashboard");
        } else {
          // Student Login
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;

          // Fetch user data
          const snapshot = await get(child(ref(db), `users/${user.uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            login({
              id: user.uid,
              name: userData.name,
              role: "student",
              classCode: userData.classCode,
              studentClass: userData.studentClass,
              email,
            });
            await loadProgress(user.uid);
            navigate("/dashboard");
          } else {
            // Fallback if data missing
            login({
              id: user.uid,
              name: user.email || "Student",
              role: "student",
              email: user.email || "",
            });
            navigate("/dashboard");
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/too-many-requests") {
        setError(
          "Terlalu banyak percobaan login gagal. Silakan coba lagi nanti.",
        );
      } else if (err.code === "auth/invalid-credential") {
        setError("Email atau password salah.");
      } else {
        setError(err.message.replace("Firebase: ", ""));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-primary">StoichMind</h1>
          <p className="text-slate-500 mt-2">
            Metacognitive Learning for Stoichiometry
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => {
              setRole("student");
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === "student" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Siswa
          </button>
          <button
            onClick={() => {
              setRole("teacher");
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === "teacher" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Guru
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {/* Mode Switcher for Students */}
          {role === "student" && (
            <div className="flex justify-center gap-4 mb-4 text-sm">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`pb-1 border-b-2 transition-colors ${mode === "login" ? "border-primary text-primary font-bold" : "border-transparent text-slate-400"}`}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`pb-1 border-b-2 transition-colors ${mode === "register" ? "border-primary text-primary font-bold" : "border-transparent text-slate-400"}`}
              >
                Daftar Baru
              </button>
            </div>
          )}

          {mode === "register" && role === "student" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Kelas
                </label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none"
                  placeholder="Contoh: X IPA 1"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none"
              placeholder="email@sekolah.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-light disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {isLoading
              ? "Memproses..."
              : mode === "login"
                ? "Masuk"
                : "Daftar Sekarang"}
            {mode === "login" ? <LogIn size={18} /> : <UserPlus size={18} />}
          </button>

          {role === "teacher" && (
            <div className="text-center text-xs text-slate-400 mt-4 bg-slate-50 p-2 rounded-lg">
              <p>Gunakan akun khusus guru yang telah disediakan.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
