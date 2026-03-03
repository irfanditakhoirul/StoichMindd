export interface Stage1Content {
  title: string;
  description: string;
  reflectionQuestion: string;
  checklistItems: string[];
  quizQuestion: string;
  quizAnswer: boolean;
  quizFeedbackCorrect: string;
  quizFeedbackIncorrect: string;
}

export interface Stage2Content {
  title: string;
  description: string;
  caseStudy: string;
  flowchartItems: string[]; // The correct order
  conceptHighlight: {
    start: string;
    middle: string;
    end: string;
  };
  reflectionQuestion: string;
  reflectionKeywords: string[]; // Keywords to check in the user's answer
  reflectionFeedbackCorrect: string;
  reflectionFeedbackIncorrect: string;
}

export interface Stage3Content {
  title: string;
  description: string;
  questions?: {
    id: number;
    caseStudy: string;
    options: {
      id: "A" | "B";
      title: string;
      description: string;
      feedback: string;
      isCorrect: boolean;
    }[];
    requiresInput?: boolean;
    inputLabel?: string;
    correctInputKeywords?: string[];
    inputFeedbackCorrect?: string;
    inputFeedbackIncorrect?: string;
  }[];
  // Legacy support for existing chapters (will be migrated or handled in component)
  caseStudy?: string;
  options?: {
    id: "A" | "B";
    title: string;
    description: string;
    feedback: string;
    isCorrect: boolean;
  }[];
}

export interface Stage4Content {
  title: string;
  description: string;
  problem: string;
  concepts: { value: string; label: string }[];
  strategies: { value: string; label: string }[];
  correctAnswer: string[]; // Array of acceptable string answers
  correctConcept: string;
  correctStrategy: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface ChapterContent {
  id: string;
  title: string;
  stage1: Stage1Content;
  stage2: Stage2Content;
  stage3: Stage3Content;
  stage4: Stage4Content;
}

export const chapterContents: Record<string, ChapterContent> = {
  "mole-concept": {
    id: "mole-concept",
    title: "Konsep Mol",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description:
        "Mol adalah jembatan penghubung dunia mikroskopis (atom) dengan dunia makroskopis (gram, liter). Sebelum kita menyeberang, mari cek bekalmu!",
      reflectionQuestion:
        "Tuliskan apa perbedaan Ar (Massa Atom Relatif) dan Mr (Massa Molekul Relatif) menurut bahasamu sendiri!",
      checklistItems: [
        "Saya tahu nilai tetapan Avogadro (6.02 x 10²³)",
        "Saya tahu apa itu keadaan STP (0°C, 1 atm)",
        "Saya paham arti Molaritas (M)",
      ],
      quizQuestion: "1 Mol air dan 1 Mol besi memiliki massa yang sama.",
      quizAnswer: false,
      quizFeedbackCorrect:
        "Tepat! Massanya berbeda tergantung Mr/Ar-nya, tapi jumlah partikelnya sama!",
      quizFeedbackIncorrect:
        "Ingat, 1 mol itu jumlah partikelnya sama, tapi massanya tergantung Ar/Mr zat tersebut.",
    },
    stage2: {
      title: "Strategi Penyelesaian",
      description:
        "Susun langkah-langkah yang logis untuk menyelesaikan masalah di bawah ini.",
      caseStudy: "Berapa volume 8 gram gas CH4 pada STP? (Ar C=12, H=1).",
      flowchartItems: [
        "Cari Mol dari Massa (Gram / Mr)",
        "Gunakan Mol yang didapat",
        "Hitung Volume (Mol x 22.4)",
      ],
      conceptHighlight: {
        start: "Gram",
        middle: "DIBAGI Mr",
        end: "Mol",
      },
      reflectionQuestion:
        "Mengapa pada langkah pertama kamu membagi massa dengan Mr?",
      reflectionKeywords: ["mol", "jumlah", "partikel"],
      reflectionFeedbackCorrect:
        "Tepat! Kita harus mengubah satuan massa (gram) menjadi satuan jumlah zat (mol) agar bisa dihitung secara kimia.",
      reflectionFeedbackIncorrect:
        'Kata kuncinya adalah "Mol". Dalam kimia, mol adalah mata uang utama perhitungan.',
    },
    stage3: {
      title: "Pengambilan Keputusan",
      description:
        "Kondisi soal menentukan rumus yang dipakai. Jangan terjebak hafalan!",
      caseStudy:
        '"Kamu diminta mencari volume dari 0.5 mol NaCl dalam larutan dengan konsentrasi 2 M. Strategi mana yang kamu pilih?"',
      options: [
        {
          id: "A",
          title: "Gunakan Rumus STP",
          description: "Volume = Mol × 22,4",
          feedback:
            "Tunggu dulu! Apakah NaCl berwujud gas pada suhu 0°C (STP)? Tidak! Rumus 22,4 hanya untuk GAS pada STP. Gunakan rumus larutan!",
          isCorrect: false,
        },
        {
          id: "B",
          title: "Gunakan Rumus Molaritas",
          description: "Volume = Mol / Molaritas",
          feedback:
            "Analisis Tepat! Karena konteksnya adalah larutan ber-Molaritas, bukan gas.",
          isCorrect: true,
        },
      ],
    },
    stage4: {
      title: "Latihan Terintegrasi",
      description:
        "Terapkan konsep dan strategi yang sudah dipelajari. Jangan lupa tag metakognitifmu!",
      problem:
        "Berapa massa molekul relatif (Mr) dari gas X jika 5,6 Liter gas tersebut pada keadaan STP memiliki massa 11 gram?",
      concepts: [
        { value: "avogadro", label: "Hukum Avogadro" },
        { value: "stp", label: "Konsep Mol Gas STP" },
        { value: "molaritas", label: "Konsep Molaritas" },
      ],
      strategies: [
        { value: "vol_to_mol", label: "Ubah Volume ke Mol dulu, lalu cari Mr" },
        {
          value: "mass_to_mol",
          label: "Ubah Massa ke Mol dulu, lalu cari Volume",
        },
      ],
      correctAnswer: ["44"],
      correctConcept: "stp",
      correctStrategy: "vol_to_mol",
      feedbackCorrect:
        "Luar biasa! Kamu berhasil menghubungkan konsep Volume STP ke Mol, lalu menggunakannya untuk mencari Mr.",
      feedbackIncorrect:
        "Coba cek lagi. Ingat: Mol = Volume / 22.4. Setelah dapat Mol, gunakan rumus Mol = Massa / Mr untuk mencari Mr.",
    },
  },
  nomenclature: {
    id: "nomenclature",
    title: "Tata Nama",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description:
        "Nama senyawa adalah identitasnya. Salah nama, salah zat! Mari cek pemahaman dasar tentang jenis ikatan.",
      reflectionQuestion:
        "Apa perbedaan mendasar antara senyawa Ionik dan Kovalen dalam hal penamaan?",
      checklistItems: [
        "Saya bisa membedakan Logam dan Non-Logam",
        "Saya tahu kapan menggunakan angka Romawi (misal: Besi(II))",
        "Saya hafal awalan Yunani (mono, di, tri, dst)",
      ],
      quizQuestion: "Nama senyawa NaCl adalah Natrium Klorida.",
      quizAnswer: true,
      quizFeedbackCorrect:
        "Benar! Logam (Natrium) + Non-Logam (Klor) + akhiran ida.",
      quizFeedbackIncorrect:
        "Salah. NaCl adalah garam dapur, nama kimianya Natrium Klorida.",
    },
    stage2: {
      title: "Strategi Penamaan",
      description: "Tentukan jenis senyawanya dulu, baru terapkan aturannya.",
      caseStudy: "Berikan nama untuk senyawa P2O5.",
      flowchartItems: [
        "Identifikasi Unsur (P=Non-logam, O=Non-logam)",
        "Tentukan Jenis (Kovalen Biner)",
        "Gunakan Awalan Yunani (Di-fosfor Penta-oksida)",
      ],
      conceptHighlight: {
        start: "Non-Logam + Non-Logam",
        middle: "PAKAI AWALAN",
        end: "Nama Senyawa",
      },
      reflectionQuestion:
        'Mengapa kita menggunakan awalan "Di-" dan "Penta-" pada senyawa ini?',
      reflectionKeywords: ["kovalen", "non", "bukan"],
      reflectionFeedbackCorrect:
        "Benar! Karena ini adalah senyawa Kovalen (Non-logam + Non-logam), jumlah atom harus disebutkan dengan awalan Yunani.",
      reflectionFeedbackIncorrect:
        "Ingat jenis ikatannya. Logam tidak pakai awalan, tapi Non-logam (Kovalen) pakai awalan.",
    },
    stage3: {
      title: "Jebakan Logam Transisi",
      description: "Hati-hati dengan logam yang punya banyak biloks!",
      caseStudy:
        '"Kamu diminta menamai Fe2O3. Temanmu menjawab Besi Oksida. Apa pendapatmu?"',
      options: [
        {
          id: "A",
          title: "Setuju",
          description: "Namanya Besi Oksida",
          feedback:
            "Kurang tepat! Besi (Fe) adalah logam transisi yang punya biloks +2 dan +3. Harus spesifik!",
          isCorrect: false,
        },
        {
          id: "B",
          title: "Tidak Setuju",
          description: "Harusnya Besi(III) Oksida",
          feedback:
            "Tepat! Karena muatan Fe disini adalah +3 (dari 2x + 3(-2) = 0), maka harus ditulis Besi(III).",
          isCorrect: true,
        },
      ],
    },
    stage4: {
      title: "Latihan Mandiri",
      description: "Coba namai senyawa berikut dengan teliti.",
      problem: "Tuliskan nama senyawa dari N2O4.",
      concepts: [
        { value: "ionik", label: "Tata Nama Ionik" },
        { value: "kovalen", label: "Tata Nama Kovalen" },
        { value: "polyatomic", label: "Ion Poliatomik" },
      ],
      strategies: [
        { value: "check_metal", label: "Cek Logam/Non-Logam dulu" },
        { value: "check_biloks", label: "Hitung Biloks dulu" },
      ],
      correctAnswer: ["dinitrogen tetraoksida", "dinitrogen tetra oksida"],
      correctConcept: "kovalen",
      correctStrategy: "check_metal",
      feedbackCorrect:
        "Bagus! Non-logam + Non-logam menggunakan awalan Yunani.",
      feedbackIncorrect:
        "Ingat awalan Yunani: 2 = di, 4 = tetra. Jangan lupa akhiran -ida.",
    },
  },
  equations: {
    id: "equations",
    title: "Persamaan Reaksi",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description:
        "Reaksi kimia adalah resep masakan alam semesta. Jumlah atom kiri harus sama dengan kanan.",
      reflectionQuestion:
        "Mengapa kita tidak boleh mengubah angka indeks (angka kecil di bawah) saat menyetarakan reaksi?",
      checklistItems: [
        "Saya tahu beda Koefisien dan Indeks",
        "Saya tahu arti fase (s), (l), (g), (aq)",
        "Saya paham hukum kekekalan massa",
      ],
      quizQuestion:
        "Mengubah indeks rumus kimia diperbolehkan untuk menyetarakan reaksi.",
      quizAnswer: false,
      quizFeedbackCorrect:
        "Betul! Mengubah indeks berarti mengubah zatnya. Hanya koefisien yang boleh diubah.",
      quizFeedbackIncorrect:
        "Salah besar! Mengubah indeks (misal H2O jadi H2O2) mengubah air menjadi hidrogen peroksida. Zatnya beda!",
    },
    stage2: {
      title: "Strategi Penyetaraan (KAHO)",
      description: "Gunakan urutan KAHO: Kation, Anion, Hidrogen, Oksigen.",
      caseStudy: "Setarakan: C3H8 + O2 -> CO2 + H2O",
      flowchartItems: [
        "Setarakan C (3 di kanan)",
        "Setarakan H (4 di kanan karena H2)",
        "Setarakan O (Total kanan 10, jadi 5 di kiri)",
      ],
      conceptHighlight: {
        start: "Belum Setara",
        middle: "URUTAN KAHO",
        end: "Setara",
      },
      reflectionQuestion: "Mengapa Oksigen disetarakan paling terakhir?",
      reflectionKeywords: ["banyak", "terakhir", "kompleks", "sendiri"],
      reflectionFeedbackCorrect:
        "Cerdas! Oksigen sering muncul di banyak senyawa atau dalam bentuk unsur bebas (O2), jadi paling mudah disesuaikan di akhir.",
      reflectionFeedbackIncorrect:
        "Pikirkan tentang fleksibilitas. Oksigen (O2) adalah unsur bebas, mengubah koefisiennya tidak mengganggu unsur lain.",
    },
    stage3: {
      title: "Keputusan Koefisien",
      description: "Pilih langkah yang paling efisien.",
      caseStudy:
        '"Untuk reaksi Al + HCl -> AlCl3 + H2, langkah mana yang kamu ambil duluan?"',
      options: [
        {
          id: "A",
          title: "Setarakan H dulu",
          description: "Langsung kasih koefisien di H2",
          feedback:
            "Nanti dulu. Cl berubah jadi 3, H jadi pecahan. Lebih baik ikut urutan Logam (Al) -> Non-Logam (Cl) -> H.",
          isCorrect: false,
        },
        {
          id: "B",
          title: "Setarakan Cl dulu",
          description: "Beri koefisien 3 pada HCl",
          feedback:
            "Cerdas! Dengan mengunci Cl, kita bisa melihat jumlah H yang dibutuhkan lebih jelas.",
          isCorrect: true,
        },
      ],
    },
    stage4: {
      title: "Latihan Penyetaraan",
      description: "Tentukan koefisien yang tepat.",
      problem:
        "Berapa koefisien O2 agar reaksi ini setara: CH4 + ...O2 -> CO2 + 2H2O",
      concepts: [
        { value: "conservation", label: "Kekekalan Massa" },
        { value: "combustion", label: "Reaksi Pembakaran" },
      ],
      strategies: [
        { value: "kaho", label: "Metode KAHO" },
        { value: "algebra", label: "Metode Aljabar (a,b,c)" },
      ],
      correctAnswer: ["2"],
      correctConcept: "conservation",
      correctStrategy: "kaho",
      feedbackCorrect:
        "Tepat! Di kanan ada 2 O (dari CO2) + 2 O (dari 2H2O) = 4 atom O. Maka di kiri butuh 2 O2.",
      feedbackIncorrect:
        "Hitung total atom O di kanan. CO2 punya 2, 2H2O punya 2. Total 4. Berapa kali 2 supaya jadi 4?",
    },
  },
  "basic-laws": {
    id: "basic-laws",
    title: "Hukum Dasar Kimia",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description: "Hukum dasar adalah pondasi perhitungan kimia.",
      reflectionQuestion:
        "Jelaskan dengan kata-katamu sendiri apa itu Hukum Kekekalan Massa (Lavoisier)!",
      checklistItems: [
        "Saya tahu Hukum Lavoisier",
        "Saya tahu Hukum Proust",
        "Saya tahu Hukum Dalton",
      ],
      quizQuestion:
        "Massa abu hasil pembakaran kertas lebih ringan dari kertasnya, berarti hukum Lavoisier salah.",
      quizAnswer: false,
      quizFeedbackCorrect:
        "Benar! Hukum Lavoisier tetap berlaku. Massa berkurang karena ada gas (asap) yang lepas ke udara.",
      quizFeedbackIncorrect:
        'Salah. Hukum Lavoisier selalu benar. Massa "hilang" itu sebenarnya berubah jadi gas yang terbang.',
    },
    stage2: {
      title: "Strategi Analisis Data",
      description: "Lihat pola angka untuk menentukan hukum yang berlaku.",
      caseStudy:
        "Data: 1g H bereaksi dengan 8g O membentuk 9g air. 2g H dengan 16g O membentuk 18g air.",
      flowchartItems: [
        "Bandingkan massa unsur pembentuk",
        "Lihat rasio massa (1:8 vs 2:16)",
        "Simpulkan Rasio Tetap (Proust)",
      ],
      conceptHighlight: {
        start: "Data Percobaan",
        middle: "CARI RASIO",
        end: "Hukum Proust",
      },
      reflectionQuestion:
        "Apa yang terjadi jika kita mereaksikan 1g H dengan 10g O? Apakah semua O habis?",
      reflectionKeywords: ["sisa", "tidak", "lebih"],
      reflectionFeedbackCorrect:
        "Analisis tepat! Karena rasionya 1:8, maka 10g O itu berlebih. Akan ada sisa 2g Oksigen.",
      reflectionFeedbackIncorrect:
        "Ingat rasio 1:8. Kalau H cuma 1g, dia cuma butuh 8g O. Kalau dikasih 10g, sisanya kemana?",
    },
    stage3: {
      title: "Membedakan Hukum Dasar",
      description:
        "Pilih hukum yang tepat berdasarkan data percobaan yang diberikan.",
      questions: [
        {
          id: 1,
          caseStudy:
            'Kasus 1: "Sebuah lilin dibakar dalam wadah tertutup rapat. Setelah pembakaran selesai, massa total wadah dan isinya ditimbang kembali. Ternyata massanya SAMA PERSIS dengan sebelum dibakar."',
          options: [
            {
              id: "A",
              title: "Hukum Lavoisier",
              description: "Kekekalan Massa",
              feedback:
                "Tepat! Dalam sistem tertutup, massa zat sebelum dan sesudah reaksi tidak berubah.",
              isCorrect: true,
            },
            {
              id: "B",
              title: "Hukum Proust",
              description: "Perbandingan Tetap",
              feedback:
                "Kurang tepat. Ini tentang total massa, bukan perbandingan unsur dalam senyawa.",
              isCorrect: false,
            },
          ],
        },
        {
          id: 2,
          caseStudy:
            'Kasus 2: "Analisis terhadap air sungai dan air laut menunjukkan bahwa keduanya mengandung Hidrogen dan Oksigen dengan perbandingan massa 1 : 8."',
          options: [
            {
              id: "A",
              title: "Hukum Dalton",
              description: "Perbandingan Berganda",
              feedback:
                "Salah. Dalton bicara tentang DUA senyawa berbeda (misal CO dan CO2). Ini hanya SATU senyawa (Air).",
              isCorrect: false,
            },
            {
              id: "B",
              title: "Hukum Proust",
              description: "Perbandingan Tetap",
              feedback:
                "Benar! Senyawa yang sama (Air), dari mana pun asalnya, selalu punya komposisi massa yang tetap.",
              isCorrect: true,
            },
          ],
        },
        {
          id: 3,
          caseStudy:
            'Kasus 3: "Unsur A dan B membentuk dua senyawa. Senyawa I: 50% A, 50% B. Senyawa II: 40% A, 60% B. Jika massa A dibuat sama, perbandingan massa B adalah bulat sederhana."',
          options: [
            {
              id: "A",
              title: "Hukum Dalton",
              description: "Perbandingan Berganda",
              feedback:
                "Tepat! Dua unsur membentuk LEBIH DARI SATU senyawa dengan rasio sederhana. Ini ciri khas Dalton.",
              isCorrect: true,
            },
            {
              id: "B",
              title: "Hukum Lavoisier",
              description: "Kekekalan Massa",
              feedback:
                "Kurang tepat. Ini bicara tentang rasio unsur dalam dua senyawa berbeda, bukan total massa reaksi.",
              isCorrect: false,
            },
          ],
        },
      ],
    },
    stage4: {
      title: "Hitungan Hukum Dasar",
      description: "Gunakan rasio massa.",
      problem:
        "Perbandingan massa C : O dalam CO2 adalah 3 : 8. Jika tersedia 6 gram C dan 20 gram O, berapa gram CO2 yang terbentuk?",
      concepts: [
        { value: "lavoisier", label: "Hukum Lavoisier" },
        { value: "proust", label: "Hukum Proust" },
      ],
      strategies: [
        { value: "limiting", label: "Cari Pereaksi Pembatas" },
        { value: "direct", label: "Langsung Jumlahkan" },
      ],
      correctAnswer: ["22"],
      correctConcept: "proust",
      correctStrategy: "limiting",
      feedbackCorrect:
        "Benar! C pembatas (6g habis). O yang bereaksi = (8/3)x6 = 16g. Sisa O = 4g. CO2 = 6+16 = 22g.",
      feedbackIncorrect:
        "Cek rasio 3:8. Kalau C ada 6 (2x lipat), butuh O berapa? (2x8=16). O tersedia 20. Berarti O sisa. Yang terbentuk = C + O yang bereaksi.",
    },
  },
  "chemical-formulas": {
    id: "chemical-formulas",
    title: "Rumus Kimia",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description:
        "Rumus Empiris (RE) vs Rumus Molekul (RM). Sederhana vs Sebenarnya.",
      reflectionQuestion:
        "Apa bedanya Rumus Empiris dan Rumus Molekul? Berikan contoh!",
      checklistItems: [
        "Saya bisa menghitung Mr",
        "Saya paham konsep persentase massa",
        "Saya tahu hubungan RM = (RE)n",
      ],
      quizQuestion: "Rumus Empiris dari C6H12O6 adalah CH2O.",
      quizAnswer: true,
      quizFeedbackCorrect: "Betul! Semua indeks dibagi 6 (FPB-nya).",
      quizFeedbackIncorrect:
        "Salah. Coba bagi C6H12O6 dengan faktor persekutuan terbesarnya (6).",
    },
    stage2: {
      title: "Alur Menentukan Rumus",
      description: "Dari persen massa ke rumus molekul.",
      caseStudy: "Suatu zat mengandung 40% C, 6.7% H, 53.3% O. Mr = 180.",
      flowchartItems: [
        "Ubah % ke Gram (anggap 100g total)",
        "Bagi Gram dengan Ar masing-masing (Cari Mol)",
        "Bandingkan Mol (Dapat RE)",
        "Cari n (Mr RM / Mr RE)",
      ],
      conceptHighlight: {
        start: "% Massa",
        middle: "BANDINGKAN MOL",
        end: "Rumus Empiris",
      },
      reflectionQuestion:
        "Mengapa kita perlu menganggap total massa 100 gram di awal?",
      reflectionKeywords: ["mudah", "gampang", "persen", "hitung"],
      reflectionFeedbackCorrect:
        "Betul! Dengan asumsi 100g, angka persen langsung berubah jadi gram tanpa perlu hitungan rumit.",
      reflectionFeedbackIncorrect:
        "Pikirkan tentang kemudahan. 40% dari 100 adalah 40. Kalau 40% dari x, kita harus hitung dulu.",
    },
    stage3: {
      title: "Keputusan Pembulatan",
      description: "Apa yang harus dilakukan jika hasil mol pecahan?",
      questions: [
        {
          id: 1,
          caseStudy:
            "Hasil perhitungan perbandingan mol C : H : O adalah 1 : 2.5 : 1.",
          options: [
            {
              id: "A",
              title: "Bulatkan H jadi 3",
              description: "Menjadi C1 H3 O1",
              feedback:
                "Salah. Pembulatan 2.5 ke 3 terlalu jauh. Hasilnya jadi tidak akurat.",
              isCorrect: false,
            },
            {
              id: "B",
              title: "Kalikan Semua dengan 2",
              description: "Menjadi C2 H5 O2",
              feedback:
                "Tepat! Mengalikan dengan 2 menghilangkan pecahan 0.5 menjadi bilangan bulat.",
              isCorrect: true,
            },
          ],
          requiresInput: true,
          inputLabel: "Tuliskan Rumus Empiris akhirnya:",
          correctInputKeywords: ["C2H5O2", "C2 H5 O2"],
          inputFeedbackCorrect: "Bagus! Rumusnya adalah C2H5O2.",
          inputFeedbackIncorrect:
            "Setelah dikali 2, C jadi 2, H jadi 5, O jadi 2. Tuliskan rumusnya.",
        },
      ],
    },
    stage4: {
      title: "Mencari Nilai n",
      description: "Tentukan rumus molekulnya.",
      problem:
        "Rumus Empiris suatu senyawa adalah CH2 (Mr = 14). Jika Mr senyawa sebenarnya adalah 56, berapa jumlah atom C dalam rumus molekulnya?",
      concepts: [
        { value: "re_rm", label: "Hubungan RE dan RM" },
        { value: "mr", label: "Perhitungan Mr" },
      ],
      strategies: [
        { value: "factor_n", label: "Cari faktor n" },
        { value: "trial", label: "Coba-coba" },
      ],
      correctAnswer: ["4"],
      correctConcept: "re_rm",
      correctStrategy: "factor_n",
      feedbackCorrect:
        "Benar! n = 56/14 = 4. Maka RM = (CH2)4 = C4H8. Jumlah C adalah 4.",
      feedbackIncorrect:
        "Hitung n = Mr RM / Mr RE. Lalu kalikan n ke indeks C.",
    },
  },
  "limiting-reagent": {
    id: "limiting-reagent",
    title: "Pereaksi Pembatas",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description: "Siapa yang habis duluan, dia yang pegang kendali.",
      reflectionQuestion:
        "Ibarat membuat roti (1 roti = 2 tepung + 1 telur). Jika kamu punya 10 tepung tapi cuma 3 telur, berapa roti yang bisa dibuat? Siapa pembatasnya?",
      checklistItems: [
        "Saya bisa menyetarakan reaksi",
        "Saya bisa mengubah gram ke mol",
        "Saya paham konsep sisa reaksi",
      ],
      quizQuestion:
        "Zat dengan massa paling sedikit pasti jadi pereaksi pembatas.",
      quizAnswer: false,
      quizFeedbackCorrect:
        "Tepat! Massa sedikit belum tentu mol-nya sedikit (tergantung Mr), dan belum tentu habis duluan (tergantung koefisien).",
      quizFeedbackIncorrect:
        "Salah. Jangan lihat massa! Lihat perbandingan Mol dibagi Koefisien.",
    },
    stage2: {
      title: "Strategi Menentukan Pembatas",
      description: "Jangan tebak-tebakan. Hitung rasionya.",
      caseStudy: "Reaksi: N2 + 3H2 -> 2NH3. Tersedia 2 mol N2 dan 3 mol H2.",
      flowchartItems: [
        "Bagi Mol N2 dengan koefisiennya (2/1 = 2)",
        "Bagi Mol H2 dengan koefisiennya (3/3 = 1)",
        "Pilih hasil bagi terkecil (H2 adalah pembatas)",
      ],
      conceptHighlight: {
        start: "Mol Mula-mula",
        middle: "BAGI KOEFISIEN",
        end: "Pembatas",
      },
      reflectionQuestion:
        "Mengapa kita harus membagi mol dengan koefisien reaksi?",
      reflectionKeywords: ["adil", "rasio", "banding", "setara", "koefisien"],
      reflectionFeedbackCorrect:
        'Tepat! Koefisien menunjukkan "paket" yang dibutuhkan. Membagi dengan koefisien menyamakan "level" mereka untuk dibandingkan.',
      reflectionFeedbackIncorrect:
        "Bayangkan resep. Kalau butuh 2 roti tapi cuma punya 1, itu beda dengan butuh 1 daging punya 1. Kita harus menormalkan jumlahnya dulu.",
    },
    stage3: {
      title: "Keputusan Produk",
      description: "Pilih zat mana yang dijadikan patokan perhitungan produk.",
      questions: [
        {
          id: 1,
          caseStudy:
            "Reaksi: 2H2 + O2 -> 2H2O. Mula-mula ada 2 mol H2 dan 2 mol O2. H2 habis bereaksi (Pembatas), O2 bersisa 1 mol.",
          options: [
            {
              id: "A",
              title: "Gunakan Mol H2 (Pembatas)",
              description: "Hitung produk berdasarkan zat yang habis.",
              feedback: "Benar! Produk dibatasi oleh zat yang habis duluan.",
              isCorrect: true,
            },
            {
              id: "B",
              title: "Gunakan Mol O2 (Sisa)",
              description: "Hitung produk berdasarkan zat yang sisa.",
              feedback:
                "Salah. Zat sisa tidak ikut membentuk produk lagi karena pasangannya sudah habis.",
              isCorrect: false,
            },
          ],
          requiresInput: true,
          inputLabel: "Berapa mol H2O yang terbentuk?",
          correctInputKeywords: ["2", "dua"],
          inputFeedbackCorrect:
            "Tepat! Koefisien H2O sama dengan H2 (2:2), jadi mol-nya sama (2 mol).",
          inputFeedbackIncorrect:
            "Coba lihat koefisiennya. H2 : H2O = 2 : 2. Jika H2 yang bereaksi 2 mol, maka H2O...?",
        },
      ],
    },
    stage4: {
      title: "Hitungan Sisa",
      description: "Berapa yang tidak bereaksi?",
      problem:
        "Reaksi: 2A + B -> A2B. Mula-mula 4 mol A dan 4 mol B bereaksi. Berapa mol B yang SISA?",
      concepts: [
        { value: "limiting", label: "Pereaksi Pembatas" },
        { value: "stoichiometry", label: "Stoikiometri Reaksi" },
      ],
      strategies: [
        { value: "mrs", label: "Tabel Mula-mula, Bereaksi, Sisa" },
        { value: "ratio", label: "Perbandingan Koefisien" },
      ],
      correctAnswer: ["2"],
      correctConcept: "limiting",
      correctStrategy: "mrs",
      feedbackCorrect:
        "Tepat! Pembatas adalah A (4/2=2 vs 4/1=4). A habis. B bereaksi = 1/2 x Mol A = 2 mol. Sisa B = 4 - 2 = 2 mol.",
      feedbackIncorrect:
        "Cek pembatasnya. A: 4/2=2. B: 4/1=4. A lebih kecil -> A habis. B yang bereaksi setengah dari A (lihat koefisien 2:1).",
    },
  },
  "stoichiometry-integration": {
    id: "stoichiometry-integration",
    title: "Integrasi Stoikiometri",
    stage1: {
      title: "Aktivasi Pengetahuan",
      description:
        'Sebelum menjadi "Ahli Stoikiometri", mari kita lihat bagaimana semua konsep yang sudah dipelajari saling terhubung dalam masalah nyata.',
      reflectionQuestion:
        "Sebutkan 5 konsep yang sudah kamu pelajari dan jelaskan bagaimana mereka saling berhubungan!",
      checklistItems: [
        "Saya bisa menamai senyawa dengan benar",
        "Saya paham struktur rumus kimia",
        "Saya bisa menyetarakan persamaan reaksi",
        "Saya menguasai konsep mol dan konversi antar satuan",
        "Saya memahami pereaksi pembatas",
      ],
      quizQuestion:
        "Stoikiometri hanya tentang menghafal rumus dan hitungan angka.",
      quizAnswer: false,
      quizFeedbackCorrect:
        "Benar! Stoikiometri adalah seni memahami hubungan antara berbagai kuantitas dalam reaksi kimia.",
      quizFeedbackIncorrect:
        "Salah. Stoikiometri lebih dari sekedar hitungan—ini tentang MEMAHAMI hubungan antara semua konsep kimia.",
    },
    stage2: {
      title: "Strategi Integrasi Konsep",
      description:
        "Peta jalan menyelesaikan masalah stoikiometri kompleks yang melibatkan banyak konsep sekaligus.",
      caseStudy:
        "Industri memproduksi Kalsium Oksida (CaO) dengan memanaskan Kalsium Karbonat (CaCO₃). Jika tersedia 250 gram CaCO₃ dengan kemurnian 80%, berapa gram CaO yang dihasilkan?",
      flowchartItems: [
        "Mulai dari nama senyawa → cari rumus kimia & Mr",
        "Baca persamaan reaksi → setarakan jika perlu",
        "Hitung mol pereaksi awal (dari gram & kemurnian)",
        "Gunakan stoikiometri reaksi untuk cari mol produk",
        "Konversi mol produk → gram (gunakan Mr)",
      ],
      conceptHighlight: {
        start: "Tata Nama Senyawa",
        middle: "Koneksi Semua Konsep",
        end: "Hasil Perhitungan",
      },
      reflectionQuestion:
        "Urutan langkah mana yang paling krusial dan mengapa? Apa akibatnya jika langkah tersebut salah?",
      reflectionKeywords: ["urutan", "penting", "langkah", "kesalahan"],
      reflectionFeedbackCorrect:
        "Tepat! Setiap langkah membangun di atas langkah sebelumnya. Satu kesalahan di awal akan merambat ke hasil akhir.",
      reflectionFeedbackIncorrect:
        "Pikirkan alur logis: nama → rumus → persamaan → perhitungan mol → konversi satuan. Setiap tahap penting!",
    },
    stage3: {
      title: "Pengambilan Keputusan Strategis",
      description:
        "Dalam soal kompleks, kamu harus memilih pendekatan yang paling efisien.",
      caseStudy:
        "Diberikan persamaan: 2Fe + 3Cl₂ → 2FeCl₃. Jika 5,6 gram Fe bereaksi dengan 8,48 gram Cl₂ (Ar Fe=56, Cl=35.5), kamu diminta menentukan hasil reaksi. Strategi mana yang PALING TEPAT?",
      options: [
        {
          id: "A",
          title:
            "Langsung hitung FeCl₃ dari Fe (asumsikan Fe yang bereaksi semua)",
          description:
            "Menghitung FeCl₃ menggunakan Fe, tanpa cek pereaksi pembatas",
          feedback:
            "Kurang teliti! Ketika diberikan dua pereaksi, harus dicek dulu siapa yang pembatas. Jika kamu asumsikan Fe yang bereaksi semua padahal Cl₂ yang pembatas, hasilnya salah besar!",
          isCorrect: false,
        },
        {
          id: "B",
          title:
            "Cek pembatas: hitung mol masing-masing, bandingkan dengan koefisien",
          description:
            "Menentukan pereaksi pembatas terlebih dahulu, baru menghitung produk",
          feedback:
            "Strategi sempurna! Ini adalah pendekatan profesional dalam kimia industri. Pastikan kamu identifikasi pembatas, lalu hitung dari pereaksi pembatas.",
          isCorrect: true,
        },
      ],
    },
    stage4: {
      title: "Latihan Terintegrasi",
      description:
        "Terapkan semua konsep dalam satu masalah kompleks. Pilih konsep dan strategi yang tepat!",
      problem:
        "Dalam industri, natrium nitrat (NaNO₃) dihasilkan dari reaksi: NaCl + HNO₃ → NaNO₃ + HCl. Jika 58,5 gram NaCl bereaksi dengan 126 gram HNO₃, berapa massa HCl yang dihasilkan? (Ar: Na=23, Cl=35.5, H=1, N=14, O=16. Asumsikan reaksi sempurna)",
      concepts: [
        { value: "naming", label: "Pemahaman Tata Nama Senyawa" },
        { value: "molar", label: "Konsep Mol & Konversi" },
        { value: "limiting", label: "Pereaksi Pembatas" },
        { value: "equation", label: "Persamaan Reaksi" },
      ],
      strategies: [
        { value: "direct", label: "Hitung langsung dari pereaksi pertama" },
        { value: "check_limiting", label: "Cek pereaksi pembatas dulu" },
        { value: "compare_all", label: "Bandingkan semua kemungkinan hasil" },
      ],
      correctAnswer: ["36.5", "36,5"],
      correctConcept: "limiting",
      correctStrategy: "check_limiting",
      feedbackCorrect:
        "Luar biasa! Kamu berhasil mengintegrasikan semua konsep. HCl yang dihasilkan adalah 36,5 gram (dari pereaksi pembatas NaCl yang hanya menghasilkan 1 mol HCl per mol NaCl).",
      feedbackIncorrect:
        "Coba ulangi: 1) Hitung mol NaCl & HNO₃. 2) Cek pembatas (NaCl: 58.5/58.5=1 mol; HNO₃: 126/63=2 mol). 3) Gunakan NaCl yang pembatas. 4) Mr HCl = 36.5, jadi 1 mol HCl = 36.5 gram.",
    },
  },
};
