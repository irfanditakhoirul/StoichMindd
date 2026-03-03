export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterQuiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export const quizzes: Record<string, ChapterQuiz> = {
  "mole-concept": {
    id: "mole-concept",
    title: "Latihan Soal: Konsep Mol",
    questions: [
      {
        id: 1,
        question: "Berapa jumlah partikel yang terdapat dalam 2 mol besi?",
        options: [
          "3,01 × 10²³ atom",
          "6,02 × 10²³ atom",
          "12,04 × 10²³ atom",
          "1,204 × 10²⁴ atom",
        ],
        correctIndex: 3,
        explanation:
          "Jumlah Partikel = Mol × L = 2 × 6,02×10²³ = 12,04×10²³ = 1,204×10²⁴ atom.",
      },
      {
        id: 2,
        question: "Volume dari 0,5 mol gas CO₂ pada keadaan STP adalah...",
        options: ["11,2 Liter", "22,4 Liter", "44,8 Liter", "5,6 Liter"],
        correctIndex: 0,
        explanation: "Volume STP = Mol × 22,4 = 0,5 × 22,4 = 11,2 Liter.",
      },
      {
        id: 3,
        question: "Massa dari 0,1 mol CaCO₃ (Ar Ca=40, C=12, O=16) adalah...",
        options: ["100 gram", "10 gram", "50 gram", "1 gram"],
        correctIndex: 1,
        explanation:
          "Mr CaCO₃ = 40 + 12 + (3×16) = 100. Massa = Mol × Mr = 0,1 × 100 = 10 gram.",
      },
      {
        id: 4,
        question: "Manakah pernyataan yang BENAR tentang Massa Molar?",
        options: [
          "Massa Molar selalu sama dengan Nomor Atom",
          "Massa Molar adalah massa satu molekul zat",
          "Massa Molar nilainya sama dengan Ar atau Mr, satuannya gram/mol",
          "Massa Molar bergantung pada suhu dan tekanan",
        ],
        correctIndex: 2,
        explanation:
          "Massa Molar (Mm) secara angka sama dengan Ar/Mr, tetapi memiliki satuan gram/mol.",
      },
      {
        id: 5,
        question:
          "Jika diketahui massa 1 mol gas X adalah 32 gram, maka gas X tersebut kemungkinan adalah... (Ar O=16, N=14, C=12, H=1)",
        options: ["O₂", "N₂", "CH₄", "CO"],
        correctIndex: 0,
        explanation:
          "Mr O₂ = 2×16 = 32. Mr N₂ = 28. Mr CH₄ = 16. Mr CO = 28. Jadi yang massanya 32 gram/mol adalah O₂.",
      },
    ],
  },
  nomenclature: {
    id: "nomenclature",
    title: "Latihan Soal: Tata Nama",
    questions: [
      {
        id: 1,
        question: "Nama senyawa N₂O₃ adalah...",
        options: [
          "Nitrogen Oksida",
          "Dinitrogen Trioksida",
          "Nitrogen Trioksida",
          "Dinitrogen Oksida",
        ],
        correctIndex: 1,
        explanation:
          "Senyawa kovalen (Non-logam + Non-logam) menggunakan awalan Yunani. 2=Di, 3=Tri.",
      },
      {
        id: 2,
        question: "Rumus kimia dari Besi(III) Sulfat adalah...",
        options: ["FeSO₄", "Fe₂(SO₄)₃", "Fe₃(SO₄)₂", "FeS"],
        correctIndex: 1,
        explanation:
          "Besi(III) = Fe³⁺. Sulfat = SO₄²⁻. Disilangkan muatannya menjadi Fe₂(SO₄)₃.",
      },
      {
        id: 3,
        question: "Nama senyawa PCl₅ adalah...",
        options: [
          "Fosfor Klorida",
          "Fosfor Pentaklorida",
          "Monofosfor Klorida",
          "Fosfor Triklorida",
        ],
        correctIndex: 1,
        explanation:
          "P = Fosfor, Cl = Klorida. Jumlah Cl ada 5 (Penta). Jadi Fosfor Pentaklorida.",
      },
      {
        id: 4,
        question: "Rumus kimia dari Kalsium Karbonat adalah...",
        options: ["CaCO₃", "Ca₂CO₃", "Ca(CO₃)₂", "K₂CO₃"],
        correctIndex: 0,
        explanation:
          "Kalsium = Ca²⁺, Karbonat = CO₃²⁻. Muatan sama (+2 dan -2), jadi langsung gabung: CaCO₃.",
      },
      {
        id: 5,
        question: "Nama senyawa Mg(OH)₂ adalah...",
        options: [
          "Magnesium Hidrida",
          "Magnesium Oksida",
          "Magnesium Hidroksida",
          "Mangan Hidroksida",
        ],
        correctIndex: 2,
        explanation:
          "Mg = Magnesium, OH⁻ = Ion Hidroksida. Jadi Magnesium Hidroksida.",
      },
    ],
  },
  equations: {
    id: "equations",
    title: "Latihan Soal: Persamaan Reaksi",
    questions: [
      {
        id: 1,
        question:
          "Agar reaksi C₃H₈ + O₂ → CO₂ + H₂O setara, koefisien O₂ adalah...",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        explanation:
          "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Jumlah O di kanan = (3x2) + (4x1) = 10. Maka di kiri butuh 5 O₂.",
      },
      {
        id: 2,
        question:
          "Hukum dasar kimia yang mendasari penyetaraan reaksi adalah...",
        options: [
          "Hukum Proust",
          "Hukum Lavoisier",
          "Hukum Dalton",
          "Hukum Avogadro",
        ],
        correctIndex: 1,
        explanation:
          "Hukum Lavoisier (Kekekalan Massa) menyatakan massa zat sebelum dan sesudah reaksi sama, yang berarti jumlah atom harus sama.",
      },
      {
        id: 3,
        question: "Manakah persamaan reaksi yang SUDAH setara?",
        options: [
          "H₂ + O₂ → H₂O",
          "N₂ + 3H₂ → 2NH₃",
          "Mg + HCl → MgCl₂ + H₂",
          "C + O₂ → CO",
        ],
        correctIndex: 1,
        explanation: "N₂ + 3H₂ → 2NH₃. Kiri: 2 N, 6 H. Kanan: 2 N, 6 H. Pas!",
      },
      {
        id: 4,
        question: "Arti simbol (aq) dalam persamaan reaksi adalah...",
        options: [
          "Padatan (Solid)",
          "Cairan murni (Liquid)",
          "Gas",
          "Larutan dalam air (Aqueous)",
        ],
        correctIndex: 3,
        explanation:
          "(aq) singkatan dari Aqueous, artinya zat terlarut dalam air.",
      },
      {
        id: 5,
        question: "Jumlah atom Oksigen dalam 3 molekul Ca(NO₃)₂ adalah...",
        options: ["6", "12", "18", "9"],
        correctIndex: 2,
        explanation:
          "Dalam 1 molekul Ca(NO₃)₂ ada 2x3 = 6 atom O. Jika ada 3 molekul (koefisien 3), maka 3 x 6 = 18 atom O.",
      },
    ],
  },
  "basic-laws": {
    id: "basic-laws",
    title: "Latihan Soal: Hukum Dasar Kimia",
    questions: [
      {
        id: 1,
        question:
          'Pernyataan "Massa zat sebelum dan sesudah reaksi adalah tetap" dikemukakan oleh...',
        options: ["Dalton", "Gay-Lussac", "Lavoisier", "Proust"],
        correctIndex: 2,
        explanation: "Antoine Lavoisier adalah penemu Hukum Kekekalan Massa.",
      },
      {
        id: 2,
        question:
          "Perbandingan massa H : O dalam air adalah 1 : 8. Jika 4 gram Hidrogen direaksikan dengan 40 gram Oksigen, berapa gram air yang terbentuk?",
        options: ["44 gram", "36 gram", "9 gram", "45 gram"],
        correctIndex: 1,
        explanation:
          "H : O = 1 : 8. Jika H = 4g, butuh O = 4x8 = 32g. Oksigen tersedia 40g (berlebih). Air = H + O bereaksi = 4 + 32 = 36 gram.",
      },
      {
        id: 3,
        question:
          "Hukum Perbandingan Berganda (Dalton) berlaku untuk pasangan senyawa...",
        options: ["H₂O dan H₂S", "CO dan CO₂", "NaCl dan KCl", "O₂ dan O₃"],
        correctIndex: 1,
        explanation:
          "Hukum Dalton berlaku untuk dua unsur yang sama membentuk senyawa berbeda. C dan O membentuk CO dan CO₂.",
      },
      {
        id: 4,
        question:
          "Jika pembakaran kertas dilakukan di wadah terbuka, massa abu lebih ringan dari kertas. Hal ini karena...",
        options: [
          "Hukum Lavoisier tidak berlaku",
          "Ada massa yang hilang musnah",
          "Gas hasil pembakaran lepas ke udara",
          "Massa abu memang selalu lebih ringan",
        ],
        correctIndex: 2,
        explanation:
          "Hukum Lavoisier tetap berlaku. Massa berkurang karena produk gas (CO₂, H₂O) terbang ke udara.",
      },
      {
        id: 5,
        question:
          "Senyawa XY mengandung 40% X. Senyawa XY₂ mengandung 25% X. Data ini sesuai dengan hukum...",
        options: ["Lavoisier", "Proust", "Dalton", "Avogadro"],
        correctIndex: 2,
        explanation:
          "Dua unsur (X dan Y) membentuk lebih dari satu senyawa (XY dan XY₂). Ini ciri khas Hukum Dalton.",
      },
    ],
  },
  "chemical-formulas": {
    id: "chemical-formulas",
    title: "Latihan Soal: Rumus Kimia",
    questions: [
      {
        id: 1,
        question: "Rumus Empiris dari glukosa (C₆H₁₂O₆) adalah...",
        options: ["CHO", "CH₂O", "C₆H₁₂O₆", "C₂H₄O₂"],
        correctIndex: 1,
        explanation:
          "Bagi semua indeks dengan FPB-nya (6). C:6/6=1, H:12/6=2, O:6/6=1. Jadi CH₂O.",
      },
      {
        id: 2,
        question:
          "Suatu senyawa memiliki Rumus Empiris CH₂ dan Mr = 42. Rumus Molekulnya adalah... (Ar C=12, H=1)",
        options: ["C₂H₄", "C₃H₆", "C₄H₈", "CH₂"],
        correctIndex: 1,
        explanation:
          "Mr RE (CH₂) = 12 + 2 = 14. n = Mr RM / Mr RE = 42 / 14 = 3. RM = (CH₂)₃ = C₃H₆.",
      },
      {
        id: 3,
        question: "Rumus kimia garam dapur adalah...",
        options: ["H₂O", "NaCl", "NaOH", "HCl"],
        correctIndex: 1,
        explanation: "Garam dapur adalah Natrium Klorida (NaCl).",
      },
      {
        id: 4,
        question:
          "Berapa Massa Molekul Relatif (Mr) dari H₂SO₄? (Ar H=1, S=32, O=16)",
        options: ["98", "49", "50", "100"],
        correctIndex: 0,
        explanation: "Mr = (2x1) + 32 + (4x16) = 2 + 32 + 64 = 98.",
      },
      {
        id: 5,
        question: "Senyawa CuSO₄ · 5H₂O disebut senyawa...",
        options: ["Anhidrat", "Hidrat", "Asam", "Basa"],
        correctIndex: 1,
        explanation: "Senyawa kristal padat yang mengikat air disebut Hidrat.",
      },
    ],
  },
  "limiting-reagent": {
    id: "limiting-reagent",
    title: "Latihan Soal: Pereaksi Pembatas",
    questions: [
      {
        id: 1,
        question: "Pereaksi Pembatas adalah pereaksi yang...",
        options: [
          "Memiliki massa paling kecil",
          "Memiliki koefisien paling besar",
          "Habis bereaksi lebih dulu",
          "Sisa setelah reaksi selesai",
        ],
        correctIndex: 2,
        explanation:
          "Definisi Pereaksi Pembatas adalah zat yang habis duluan dan membatasi jumlah produk.",
      },
      {
        id: 2,
        question:
          "Reaksi: N₂ + 3H₂ → 2NH₃. Jika direaksikan 1 mol N₂ dan 1 mol H₂, siapa pembatasnya?",
        options: ["N₂", "H₂", "NH₃", "Tidak ada"],
        correctIndex: 1,
        explanation:
          "N₂: 1/1 = 1. H₂: 1/3 = 0,33. Karena 0,33 < 1, maka H₂ adalah pembatas.",
      },
      {
        id: 3,
        question:
          "Dalam pembuatan sandwich (2 Roti + 1 Daging), jika ada 10 Roti dan 3 Daging, berapa sandwich terbentuk?",
        options: ["3 Sandwich", "5 Sandwich", "10 Sandwich", "13 Sandwich"],
        correctIndex: 0,
        explanation:
          "Daging (3) membatasi. 10 Roti butuh 5 Daging. Kita cuma punya 3. Jadi cuma jadi 3 Sandwich.",
      },
      {
        id: 4,
        question: "Jika pereaksi pembatas habis, maka reaksi akan...",
        options: [
          "Berjalan lebih cepat",
          "Berhenti",
          "Menghasilkan produk lebih banyak",
          "Meledak",
        ],
        correctIndex: 1,
        explanation:
          "Reaksi berhenti segera setelah salah satu pereaksi habis.",
      },
      {
        id: 5,
        question:
          "Reaksi A + B → AB. Mula-mula 5 mol A dan 3 mol B. Berapa mol A yang bersisa?",
        options: ["0 mol", "2 mol", "3 mol", "5 mol"],
        correctIndex: 1,
        explanation:
          "B adalah pembatas (3 mol). A yang bereaksi juga 3 mol (koefisien 1:1). Sisa A = 5 - 3 = 2 mol.",
      },
    ],
  },
  "stoichiometry-integration": {
    id: "stoichiometry-integration",
    title: "Latihan Soal: Integrasi Stoikiometri",
    questions: [
      {
        id: 1,
        question:
          "Berapa mol NaCl (Ar Na=23, Cl=35.5) yang terdapat dalam 58.5 gram?",
        options: ["0.5 mol", "1 mol", "2 mol", "10 mol"],
        correctIndex: 1,
        explanation:
          "Mr NaCl = 23 + 35.5 = 58.5. Mol = Gram / Mr = 58.5 / 58.5 = 1 mol.",
      },
      {
        id: 2,
        question:
          "Reaksi: 2H₂ + O₂ → 2H₂O. Jika 4 mol H₂ bereaksi dengan 3 mol O₂, manakah pereaksi pembatas?",
        options: ["H₂", "O₂", "Keduanya habis bersamaan", "Tidak ada pembatas"],
        correctIndex: 1,
        explanation:
          "H₂: 4/2 = 2. O₂: 3/1 = 3. Yang terkecil adalah H₂ (2 < 3)? Salah! Maksimal H₂ dapat bereaksi adalah 4 mol (habis), maksimal O₂ dapat bereaksi adalah 2 mol. Jadi O₂ adalah pembatas.",
      },
      {
        id: 3,
        question: "Nama senyawa CaCO₃ adalah... (Ar: Ca=40, C=12, O=16)",
        options: [
          "Kalsium Karbon Oksida",
          "Kalsium Karbonat",
          "Kalsium Karbon Trioksida",
          "Kalsium Karbonil",
        ],
        correctIndex: 1,
        explanation:
          "CaCO₃ adalah senyawa ionik dari Kalsium (Ca) dan ion Karbonat (CO₃²⁻). Nama yang benar adalah Kalsium Karbonat.",
      },
      {
        id: 4,
        question:
          "Persamaan reaksi: CaCO₃ → CaO + CO₂. Jika 100 gram CaCO₃ (Mr=100) terdekomposisi sempurna, berapa mol CaO yang dihasilkan?",
        options: ["0.5 mol", "1 mol", "2 mol", "10 mol"],
        correctIndex: 1,
        explanation:
          "Mol CaCO₃ = 100/100 = 1 mol. Dari reaksi: 1 mol CaCO₃ → 1 mol CaO. Jadi CaO yang dihasilkan = 1 mol.",
      },
      {
        id: 5,
        question:
          "Dalam reaksi 2Fe + 3Cl₂ → 2FeCl₃, jika 5.6 gram Fe (Ar=56) bereaksi dengan Cl₂ berlebih, berapa gram FeCl₃ yang dihasilkan? (Mr Fe=56, Cl=35.5, FeCl₃=162.5)",
        options: ["8.125 gram", "16.25 gram", "32.5 gram", "65 gram"],
        correctIndex: 1,
        explanation:
          "Mol Fe = 5.6/56 = 0.1 mol. Dari reaksi: 2 Fe → 2 FeCl₃ (rasio 1:1). Mol FeCl₃ = 0.1 mol. Massa FeCl₃ = 0.1 × 162.5 = 16.25 gram.",
      },
      {
        id: 6,
        question:
          "Masalah stoikiometri yang kompleks biasanya memerlukan pemahaman tentang konsep... (Pilih LEBIH dari satu jika diperlukan)",
        options: [
          "Tata nama senyawa untuk mengidentifikasi zat dengan benar",
          "Konsep mol untuk konversi antar satuan",
          "Pereaksi pembatas untuk menentukan hasil maksimal",
          "Semua di atas",
        ],
        correctIndex: 3,
        explanation:
          "Masalah stoikiometri yang kompleks mengintegrasikan semua konsep: tata nama (identifikasi zat), konsep mol (satuan), dan pereaksi pembatas (strategi perhitungan).",
      },
    ],
  },
};
