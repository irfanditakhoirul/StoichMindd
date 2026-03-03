export interface LKPDContent {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  content: {
    objectives: string[];
    theory: string;
    stages: {
      activation: {
        title: string;
        description: string;
        questions: string[];
      };
      strategy: {
        title: string;
        description: string;
        steps: string[];
      };
      decision: {
        title: string;
        caseStudy: string;
        question: string;
      };
      practice: {
        title: string;
        questions: string[];
      };
      reflection: {
        title: string;
        questions: string[];
      };
    };
  };
}

export const lkpdList: LKPDContent[] = [
  {
    id: "nomenclature",
    title: "LKPD: Tata Nama Senyawa",
    description: "Latihan penamaan senyawa ionik dan kovalen biner.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Membedakan senyawa ionik dan kovalen.",
        "Menuliskan nama senyawa biner.",
        "Menuliskan rumus kimia dari nama senyawa.",
      ],
      theory:
        "Tata nama kimia adalah aturan penamaan senyawa kimia yang disusun secara sistematis oleh IUPAC. Senyawa biner adalah senyawa yang terbentuk dari dua jenis unsur.",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi",
          description: "Identifikasi jenis ikatan pada senyawa berikut.",
          questions: [
            "Kelompokkan senyawa berikut ke dalam Ionik atau Kovalen: NaCl, CO2, H2O, KBr, PCl5.",
            "Apa perbedaan mendasar antara ikatan ion dan kovalen?",
          ],
        },
        strategy: {
          title: "Tahap 2: Strategi",
          description: "Langkah-langkah memberi nama senyawa biner.",
          steps: [
            "Identifikasi unsur penyusun (Logam+Nonlogam atau Nonlogam+Nonlogam).",
            'Jika Ionik: Sebut nama kation lalu anion + akhiran "ida".',
            "Jika Kovalen: Gunakan awalan Yunani (mono, di, tri...) untuk jumlah atom.",
            "Cek muatan logam transisi jika perlu (gunakan angka Romawi).",
          ],
        },
        decision: {
          title: "Tahap 3: Keputusan",
          caseStudy:
            'Kamu menemukan botol bahan kimia dengan rumus FeCl3. Temanmu menamainya "Besi Klorida".',
          question:
            "Apakah nama tersebut sudah tepat dan lengkap? Jika belum, apa nama yang seharusnya dan mengapa?",
        },
        practice: {
          title: "Tahap 4: Latihan",
          questions: [
            "Tuliskan nama IUPAC untuk N2O5.",
            "Tuliskan rumus kimia untuk Kalsium Sulfida.",
            "Apa nama senyawa PCl3?",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi",
          questions: [
            "Bagian mana dari tata nama senyawa yang paling sulit kamu pahami dan ingin didiskusikan lebih lanjut?",
          ],
        },
      },
    },
  },
  {
    id: "chemical-formulas",
    title: "LKPD: Rumus Kimia",
    description:
      "Menentukan Rumus Empiris dan Rumus Molekul dari data persen massa.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Menghitung persentase massa unsur dalam senyawa.",
        "Menentukan rumus empiris dan rumus molekul.",
      ],
      theory:
        "Rumus Empiris adalah perbandingan terkecil atom-atom penyusun senyawa. Rumus Molekul adalah jumlah atom sebenarnya dalam satu molekul.",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi",
          description: "Memahami komposisi zat.",
          questions: [
            "Glukosa memiliki rumus C6H12O6. Apa perbandingan paling sederhana dari atom C:H:O?",
            "Apa bedanya cuka (CH3COOH) dengan rumus empirisnya?",
          ],
        },
        strategy: {
          title: "Tahap 2: Strategi",
          description: "Langkah menentukan Rumus Empiris.",
          steps: [
            "Ubah persen massa menjadi gram (asumsikan total 100g).",
            "Konversi gram ke mol menggunakan Ar masing-masing unsur.",
            "Bandingkan nilai mol semua unsur.",
            "Bagi semua nilai mol dengan angka terkecil untuk dapat rasio bulat sederhana.",
          ],
        },
        decision: {
          title: "Tahap 3: Keputusan",
          caseStudy:
            "Analisis senyawa X menunjukkan rumus empiris CH2O. Massa molekul relatif (Mr) senyawa tersebut adalah 180.",
          question:
            "Tentukan rumus molekul senyawa X! Apakah senyawa tersebut Glukosa atau Asam Asetat?",
        },
        practice: {
          title: "Tahap 4: Latihan",
          questions: [
            "Suatu senyawa mengandung 40% C, 6.6% H, 53.4% O. Tentukan Rumus Empirisnya! (Ar C=12, H=1, O=16)",
            "Jika Mr senyawa tersebut 60, apa Rumus Molekulnya?",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi",
          questions: [
            "Langkah mana dalam menentukan rumus empiris dan molekul yang paling sulit kamu pahami?",
          ],
        },
      },
    },
  },
  {
    id: "equations",
    title: "LKPD: Persamaan Reaksi",
    description:
      "Latihan menyetarakan persamaan reaksi kimia sederhana dan kompleks.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Menjelaskan hukum kekekalan massa dalam reaksi kimia.",
        "Menyetarakan persamaan reaksi kimia sederhana.",
      ],
      theory:
        "Persamaan reaksi menggambarkan perubahan kimia dari reaktan menjadi produk. Jumlah atom tiap unsur di ruas kiri (reaktan) harus sama dengan di ruas kanan (produk).",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi",
          description: "Visualisasi reaksi kimia.",
          questions: [
            "Gambarkan molekul CH4 dan O2 sebelum bereaksi.",
            "Mengapa jumlah atom sebelum dan sesudah reaksi harus sama?",
          ],
        },
        strategy: {
          title: "Tahap 2: Strategi",
          description: "Tips menyetarakan reaksi.",
          steps: [
            "Tulis kerangka reaksi (rumus kimia reaktan dan produk).",
            "Setarakan atom logam terlebih dahulu.",
            "Setarakan atom non-logam selain H dan O.",
            "Setarakan atom H, lalu terakhir atom O.",
            "Cek kembali jumlah atom di kedua ruas.",
          ],
        },
        decision: {
          title: "Tahap 3: Keputusan",
          caseStudy:
            "Diberikan reaksi: Al + O2 -> Al2O3. Seorang siswa menuliskan koefisien 2, 3, 2.",
          question:
            "Cek apakah koefisien tersebut benar (2 Al + 3 O2 -> 2 Al2O3). Jika salah, bagaimana perbaikannya?",
        },
        practice: {
          title: "Tahap 4: Latihan",
          questions: [
            "Setarakan: N2 + H2 -> NH3",
            "Setarakan: C3H8 + O2 -> CO2 + H2O",
            "Setarakan: Fe + O2 -> Fe2O3",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi",
          questions: [
            "Jenis reaksi atau langkah mana yang paling sulit kamu pahami dalam penyetaraan persamaan reaksi?",
          ],
        },
      },
    },
  },
  {
    id: "basic-laws",
    title: "LKPD: Hukum Dasar Kimia",
    description:
      "Eksperimen semu dan analisis data hukum Lavoisier, Proust, dan Dalton.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Menganalisis data percobaan untuk membuktikan hukum Lavoisier.",
        "Menerapkan hukum Proust dalam perhitungan.",
      ],
      theory:
        "Hukum dasar kimia meliputi Hukum Kekekalan Massa (Lavoisier), Hukum Perbandingan Tetap (Proust), Hukum Perbandingan Berganda (Dalton), dll.",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi",
          description: "Pengamatan fenomena.",
          questions: [
            "Jika kayu dibakar menjadi abu, apakah massanya berkurang? Ke mana perginya massa yang hilang?",
            "Bagaimana jika pembakaran dilakukan di wadah tertutup rapat?",
          ],
        },
        strategy: {
          title: "Tahap 2: Strategi",
          description: "Menganalisis data percobaan.",
          steps: [
            "Perhatikan massa reaktan sebelum reaksi.",
            "Perhatikan massa produk dan sisa setelah reaksi.",
            "Bandingkan total massa sebelum dan sesudah.",
            "Hitung perbandingan massa unsur dalam senyawa.",
          ],
        },
        decision: {
          title: "Tahap 3: Keputusan",
          caseStudy:
            "Data percobaan pembentukan air: 1g H + 8g O -> 9g Air. Percobaan kedua: 2g H + 8g O -> ...",
          question:
            "Berapa gram air yang terbentuk pada percobaan kedua? Apakah ada sisa reaktan? Hukum apa yang berlaku?",
        },
        practice: {
          title: "Tahap 4: Latihan",
          questions: [
            "Belerang bereaksi dengan Oksigen membentuk SO2 dengan perbandingan massa 1:1. Jika 5g Belerang direaksikan dengan 10g Oksigen, berapa SO2 terbentuk?",
            "Sebutkan bunyi Hukum Lavoisier!",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi",
          questions: [
            "Hukum dasar kimia mana (Lavoisier, Proust, atau Dalton) yang paling sulit kamu pahami? Jelaskan kesulitannya.",
          ],
        },
      },
    },
  },
  {
    id: "mole-concept",
    title: "LKPD: Konsep Mol",
    description:
      "Lembar Kerja Peserta Didik untuk materi Konsep Mol, mencakup hubungan Mol dengan Massa, Volume, dan Jumlah Partikel.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Peserta didik dapat menjelaskan konsep mol sebagai satuan jumlah zat.",
        "Peserta didik dapat menghitung hubungan antara mol, massa molar, dan jumlah partikel.",
        "Peserta didik dapat menerapkan konsep mol dalam perhitungan kimia sederhana.",
      ],
      theory:
        "Mol adalah satuan pengukuran dalam Sistem Satuan Internasional (SI) untuk jumlah zat. Satu mol mengandung persis 6.022 x 10^23 entitas dasar (atom, molekul, ion, dll). Angka ini dikenal sebagai bilangan Avogadro.",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi (Pengetahuan Awal)",
          description:
            "Mari kita hubungkan pengetahuan sehari-hari dengan konsep kimia.",
          questions: [
            "Jika 1 lusin = 12 buah, dan 1 kodi = 20 buah, bagaimana kita menghitung jumlah atom yang sangat banyak?",
            "Bayangkan 1 mol beras. Jika 1 butir beras memiliki massa 0.02 gram, hitunglah massa 1 mol beras!",
          ],
        },
        strategy: {
          title: "Tahap 2: Strategi (Alur Berpikir)",
          description:
            "Susunlah langkah-langkah untuk mengkonversi massa ke jumlah partikel.",
          steps: [
            "Tentukan massa zat yang diketahui (gram).",
            "Cari Massa Molar (Mr/Ar) dari tabel periodik.",
            "Hitung mol dengan rumus: Mol = Massa / Mr.",
            "Kalikan mol dengan Bilangan Avogadro (6.02 x 10^23) untuk mendapatkan jumlah partikel.",
          ],
        },
        decision: {
          title: "Tahap 3: Keputusan (Studi Kasus)",
          caseStudy:
            "Seorang laboran perlu mereaksikan tepat 0.5 mol gas Oksigen. Di laboratorium hanya tersedia timbangan digital.",
          question:
            "Keputusan apa yang harus diambil laboran? Apakah menimbang gas tersebut atau mengukur volumenya? Jelaskan alasannya dan hitung nilainya jika diukur pada STP.",
        },
        practice: {
          title: "Tahap 4: Latihan (Penerapan)",
          questions: [
            "Hitung Mr dari CO2 (Ar C=12, O=16).",
            "Berapa mol dalam 22 gram CO2?",
            "Berapa volume 22 gram CO2 pada STP?",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi (Evaluasi Diri)",
          questions: [
            "Konsep apa dalam mol yang paling sulit kamu pahami dan ingin mendapatkan bantuan lebih lanjut?",
          ],
        },
      },
    },
  },
  {
    id: "limiting-reagent",
    title: "LKPD: Pereaksi Pembatas",
    description:
      "Latihan menentukan pereaksi pembatas dan menghitung hasil reaksi.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Menentukan pereaksi pembatas dalam suatu reaksi.",
        "Menghitung massa produk yang terbentuk.",
        "Menghitung massa zat sisa.",
      ],
      theory:
        "Pereaksi pembatas adalah reaktan yang habis bereaksi lebih dulu dan membatasi jumlah produk yang terbentuk.",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi",
          description: "Analogi sehari-hari.",
          questions: [
            "Kamu punya 10 lembar roti dan 3 lembar keju. Berapa sandwich keju (2 roti + 1 keju) yang bisa dibuat?",
            "Apa yang tersisa? Apa yang membatasi jumlah sandwich?",
          ],
        },
        strategy: {
          title: "Tahap 2: Strategi",
          description: "Cara menentukan pereaksi pembatas.",
          steps: [
            "Setarakan persamaan reaksi.",
            "Hitung mol mula-mula semua reaktan.",
            "Bagi mol mula-mula dengan koefisien reaksinya.",
            "Hasil bagi terkecil adalah Pereaksi Pembatas.",
            "Gunakan mol pereaksi pembatas untuk menghitung produk.",
          ],
        },
        decision: {
          title: "Tahap 3: Keputusan",
          caseStudy:
            "Reaksi: N2 + 3H2 -> 2NH3. Tersedia 2 mol N2 dan 3 mol H2.",
          question:
            "Manakah yang akan habis bereaksi? Berapa mol NH3 yang dihasilkan? Jelaskan perhitunganmu.",
        },
        practice: {
          title: "Tahap 4: Latihan",
          questions: [
            "5.6g Besi (Ar=56) direaksikan dengan 6.4g Belerang (Ar=32) membentuk FeS. Tentukan pereaksi pembatas!",
            "Berapa gram FeS yang terbentuk?",
            "Zat apa yang sisa dan berapa massanya?",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi",
          questions: [
            "Bagian mana dari konsep pereaksi pembatas yang paling membuat kamu bingung dan memerlukan penjelasan lebih lanjut?",
          ],
        },
      },
    },
  },
  {
    id: "stoichiometry-integration",
    title: "LKPD: Integrasi Stoikiometri - Praktik Laboratorium Terintegrasi",
    description:
      "Soal komprehensif yang mengintegrasikan semua konsep stoikiometri dalam satu proyek praktik.",
    downloadUrl: "#",
    content: {
      objectives: [
        "Mengintegrasikan konsep tata nama, rumus kimia, persamaan reaksi, konsep mol, dan pereaksi pembatas",
        "Menyelesaikan masalah stoikiometri kompleks dengan multi-tahap",
        "Menganalisis hasil reaksi dalam konteks praktik industri",
        "Mengembangkan kemampuan problem-solving dan critical thinking",
      ],
      theory:
        "Stoikiometri adalah kajian tentang hubungan kuantitatif antara reaktan dan produk dalam reaksi kimia. Dalam praktik nyata, masalah stoikiometri jarang berdiri sendiri—mereka memerlukan integrasi dari berbagai konsep untuk mencapai solusi yang akurat dan bermakna.",
      stages: {
        activation: {
          title: "Tahap 1: Aktivasi dan Refleksi Awal",
          description:
            "Sebelum memulai proyek integrasi, pastikan kamu siap dengan semua konsep.",
          questions: [
            "Tulislah 5 konsep yang sudah kamu pelajari dan jelaskan hubungan antara mereka dalam 3-5 kalimat.",
            "Bayangkan bekerja di pabrik kimia. Masalah apa yang mungkin kamu hadapi yang memerlukan pemahaman stoikiometri? Berikan 2 contoh.",
            "Apa akibat dari kesalahan dalam setiap tahap perhitungan stoikiometri? Jelaskan untuk 3 tahap berbeda.",
          ],
        },
        strategy: {
          title: "Tahap 2: Peta Strategi Penyelesaian",
          description:
            "Rancang strategi sistematis untuk menyelesaikan masalah stoikiometri kompleks.",
          steps: [
            "✓ IDENTIFIKASI: Baca soal dengan cermat dan identifikasi informasi yang diberikan (nama zat, data, konteks)",
            "✓ TATA NAMA: Jika diberikan nama, tulis rumus kimia dengan benar. Tentukan Ar/Mr.",
            "✓ PERSAMAAN: Tulis persamaan reaksi dan setarakan dengan benar. Pahami arti koefisien.",
            "✓ KONVERSI MOL: Ubah semua data awal (gram, liter, persen) menjadi mol.",
            "✓ CEK PEMBATAS: Jika ada 2+ pereaksi, tentukan yang pembatas dengan metode pembagian.",
            "✓ HITUNG PRODUK: Gunakan pereaksi pembatas & koefisien untuk cari mol produk.",
            "✓ KONVERSI KEMBALI: Ubah mol produk ke satuan yang diminta.",
            "✓ VERIFIKASI: Cek kembali apakah jawaban masuk akal (tidak terlalu besar/kecil)",
          ],
        },
        decision: {
          title: "Tahap 3: Studi Kasus - Keputusan Strategis",
          caseStudy:
            "Pabrik akan memproduksi amoniak (NH₃) dari nitrogen dan hidrogen dengan reaksi: N₂ + 3H₂ → 2NH₃. Mereka memiliki 28 gram N₂ dan 36 gram H₂. Namun, terdapat dua strategi:\nStrategi A: Gunakan N₂ sepenuhnya dan harapkan H₂ berlebih.\nStrategi B: Cek dulu mana yang pembatas sebelum memulai produksi.",
          question:
            "Strategi mana yang lebih profesional dan mengapa? Jelaskan dengan perhitungan! Berapa gram NH₃ yang akan dihasilkan? (Ar: N=14, H=1, Mr NH₃=17)",
        },
        practice: {
          title: "Tahap 4: Latihan Komprehensif",
          questions: [
            "PROYEK 1 - Produksi Batu Kapur:\n- Perusahaan memanaskan 500 kg batu kapur mentah (CaCO₃ berkadar 80%) dengan persamaan: CaCO₃ → CaO + CO₂\n- Tanya: a) Berapa mol CaCO₃ murni?\n        b) Berapa gram CaO yang dihasilkan?\n        c) Berapa liter CO₂ pada STP yang dihasilkan?\n(Ar: Ca=40, C=12, O=16; Mr CaCO₃=100, CaO=56, CO₂=44)",

            "PROYEK 2 - Penetralan Asam:\n- 146 gram asam sulfat (H₂SO₄) direaksikan dengan larutan natrium hidroksida (NaOH) dengan persamaan: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n- Tanya: a) Berapa mol H₂SO₄ yang bereaksi?\n        b) Berapa mol NaOH yang diperlukan?\n        c) Berapa gram Na₂SO₄ yang terbentuk?\n(Ar: H=1, S=32, O=16, Na=23; Mr H₂SO₄=98, NaOH=40, Na₂SO₄=142)",

            "PROYEK 3 - Masalah Pereaksi Pembatas (Kontextual):\n- 11.2 L gas Cl₂ (pada STP) bereaksi dengan 23 gram Na dengan persamaan: 2Na + Cl₂ → 2NaCl\n- Tanya: a) Manakah pereaksi pembatas?\n        b) Berapa gram NaCl yang dihasilkan?\n        c) Berapa gram pereaksi yang berlebih habis (jika relevan)?\n(Ar: Na=23, Cl=35.5, Mr NaCl=58.5)",
          ],
        },
        reflection: {
          title: "Tahap 5: Refleksi dan Metakognisi",
          questions: [
            "Dari semua konsep stoikiometri yang telah dipelajari (tata nama, rumus kimia, persamaan reaksi, konsep mol, pereaksi pembatas), konsep mana yang paling sulit dipahami dan ingin mendapatkan penjelasan lebih mendalam?",
          ],
        },
      },
    },
  },
];
