export interface ChapterMaterial {
  title: string;
  sections: {
    heading: string;
    content: string; // HTML string for rich text
  }[];
}

export const materials: Record<string, ChapterMaterial> = {
  "mole-concept": {
    title: "Materi Lengkap: Konsep Mol",
    sections: [
      {
        heading: "1. Apa itu Mol? (Analogi Sederhana)",
        content: `
          <p>Bayangkan kamu mau membeli beras. Apakah kamu menghitung butiran berasnya satu per satu? Tentu tidak! Kamu membelinya dalam satuan <strong>Kilogram</strong> atau <strong>Liter</strong>.</p>
          <p>Sama halnya dengan atom. Atom itu sangat kecil dan jumlahnya buanyak sekali. Para ahli kimia malas menghitung atom satu per satu, jadi mereka membuat satuan paket bernama <strong>MOL</strong>.</p>
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
            <p class="font-bold text-lg text-blue-900 mb-2">📦 Analogi Paket:</p>
            <ul class="list-disc pl-5 space-y-1 text-blue-800">
              <li>1 Lusin = 12 buah</li>
              <li>1 Kodi = 20 buah</li>
              <li>1 Rim = 500 lembar</li>
              <li><strong>1 Mol = 6,02 × 10²³ partikel</strong></li>
            </ul>
          </div>
          <p>Angka <strong>6,02 × 10²³</strong> ini disebut <strong>Bilangan Avogadro (L)</strong>. Ini angka yang sangaaat besar! Kalau kamu punya 1 mol kelereng, tumpukannya bisa menutupi seluruh permukaan bumi setinggi beberapa kilometer!</p>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Hitung jumlah partikel dari:</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li>2 mol Besi (Fe)</li>
                <li>0,5 mol Air (H₂O)</li>
                <li>10 mol Gas Oksigen (O₂)</li>
              </ol>
            </div>
          </div>
        `,
      },
      {
        heading: "2. Massa Molar (Mr): Beratnya 1 Paket Mol",
        content: `
          <p>Kalau 1 lusin telur beratnya beda dengan 1 lusin gajah, maka 1 mol air juga beratnya beda dengan 1 mol besi.</p>
          <p>Berat 1 mol zat disebut <strong>Massa Molar (Mm)</strong>. Satuannya <strong>gram/mol</strong>.</p>
          <p>Nilainya SAMA PERSIS dengan Ar (untuk unsur) atau Mr (untuk senyawa) yang ada di tabel periodik.</p>
          <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-200 my-4">
            <p class="font-bold text-emerald-900">Contoh Perhitungan:</p>
            <p>Ar C = 12, Ar O = 16.</p>
            <p>Berapa berat 1 mol CO₂?</p>
            <p class="font-mono mt-2">Mr CO₂ = Ar C + (2 × Ar O)</p>
            <p class="font-mono">       = 12 + (2 × 16)</p>
            <p class="font-mono">       = 12 + 32 = 44 gram/mol</p>
            <p class="mt-2">Artinya: <strong>1 mol gas CO₂ beratnya 44 gram.</strong></p>
          </div>
          <p class="font-bold text-center bg-slate-100 p-2 rounded">Rumus Sakti: Massa (gram) = Mol × Mr</p>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Hitung massa dari:</p>
              <p class="text-xs text-slate-500 mb-2">(Ar H=1, C=12, O=16, S=32)</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li>2 mol H₂O</li>
                <li>0,1 mol H₂SO₄</li>
                <li>5 mol C</li>
              </ol>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Volume Molar Gas (STP)",
        content: `
          <p>Khusus untuk <strong>GAS</strong>, ada keajaiban! Pada suhu 0°C dan tekanan 1 atm (disebut keadaan STP / Standar), 1 mol gas apa saja volumenya SELALU SAMA.</p>
          <div class="bg-orange-50 p-6 rounded-lg border border-orange-200 my-4 text-center">
            <h3 class="text-2xl font-bold text-orange-600 mb-2">22,4 Liter</h3>
            <p class="text-orange-800">Volume 1 mol gas apapun pada STP</p>
          </div>
          <p>Jadi, kalau kamu punya:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>1 mol gas Oksigen (O₂) di STP = 22,4 Liter</li>
            <li>1 mol gas Helium (He) di STP = 22,4 Liter</li>
            <li>0,5 mol gas Nitrogen (N₂) di STP = 11,2 Liter (setengahnya)</li>
          </ul>
          <p class="text-sm text-red-500 mt-2 italic">*Ingat: Ini hanya berlaku untuk GAS dan pada suhu 0°C (STP). Kalau larutan atau padatan, beda lagi ceritanya!</p>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Hitung volume (STP) dari:</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li>2 mol gas O₂</li>
                <li>0,5 mol gas N₂</li>
                <li>10 mol gas CO₂</li>
              </ol>
            </div>
          </div>
        `,
      },
      {
        heading: "5. Jembatan Mol (The Mole Bridge)",
        content: `
          <p>Bingung mau pakai rumus yang mana? Tenang, semua jalan menuju Roma, semua rumus bermuara ke <strong>MOL</strong>.</p>
          <p>Bayangkan <strong>MOL</strong> adalah terminal pusat. Kamu bisa pergi ke mana saja asalkan mampir ke terminal Mol dulu.</p>
          
          <div class="my-8 flex flex-col items-center justify-center gap-4">
            <!-- Top: Massa -->
            <div class="flex flex-col items-center">
              <div class="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-xl font-bold border-2 border-emerald-200 shadow-sm w-48 text-center">
                MASSA (gram)
              </div>
              <div class="flex items-center h-16 relative">
                <div class="border-l-2 border-slate-300 h-full absolute left-1/2 -translate-x-1/2"></div>
                <div class="bg-white px-2 py-1 text-xs font-mono text-slate-500 z-10 border border-slate-200 rounded">
                  x Mr (turun) / : Mr (naik)
                </div>
              </div>
            </div>

            <!-- Center: MOL -->
            <div class="flex items-center gap-4 w-full justify-center">
              <!-- Left: Volume -->
              <div class="flex items-center">
                <div class="bg-orange-100 text-orange-800 px-4 py-3 rounded-xl font-bold border-2 border-orange-200 shadow-sm w-32 text-center text-sm">
                  VOLUME STP (Liter)
                </div>
                <div class="w-16 h-0.5 bg-slate-300 relative">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[10px] font-mono text-slate-500 border border-slate-200 rounded whitespace-nowrap">
                    : 22.4 &rarr;
                  </div>
                </div>
              </div>

              <!-- Main Hub -->
              <div class="bg-primary text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-xl shadow-xl z-20 ring-4 ring-white">
                MOL (n)
              </div>

              <!-- Right: Partikel -->
              <div class="flex items-center">
                <div class="w-16 h-0.5 bg-slate-300 relative">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[10px] font-mono text-slate-500 border border-slate-200 rounded whitespace-nowrap">
                    &larr; : 6.02x10²³
                  </div>
                </div>
                <div class="bg-blue-100 text-blue-800 px-4 py-3 rounded-xl font-bold border-2 border-blue-200 shadow-sm w-32 text-center text-sm">
                  PARTIKEL (X)
                </div>
              </div>
            </div>

            <!-- Bottom: Molaritas -->
            <div class="flex flex-col items-center">
              <div class="flex items-center h-16 relative">
                <div class="border-l-2 border-slate-300 h-full absolute left-1/2 -translate-x-1/2"></div>
                <div class="bg-white px-2 py-1 text-xs font-mono text-slate-500 z-10 border border-slate-200 rounded">
                  x Vol (naik) / : Vol (turun)
                </div>
              </div>
              <div class="bg-purple-100 text-purple-800 px-6 py-3 rounded-xl font-bold border-2 border-purple-200 shadow-sm w-48 text-center">
                MOLARITAS (M)
              </div>
            </div>
          </div>

          <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
            <p class="font-bold mb-2">Cara Membaca Jembatan:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Kalau mau mencari <strong>MOL</strong> (menuju pusat), kamu harus <strong>MEMBAGI</strong>.
                <ul class="list-circle pl-4 text-slate-500">
                  <li>Dari Gram ke Mol &rarr; Bagi Mr</li>
                  <li>Dari Liter ke Mol &rarr; Bagi 22,4</li>
                  <li>Dari Partikel ke Mol &rarr; Bagi 6,02×10²³</li>
                </ul>
              </li>
              <li>Kalau sudah punya <strong>MOL</strong> dan mau mencari yang lain (keluar pusat), kamu harus <strong>MENGALI</strong>.
                <ul class="list-circle pl-4 text-slate-500">
                  <li>Dari Mol ke Gram &rarr; Kali Mr</li>
                  <li>Dari Mol ke Liter &rarr; Kali 22,4</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan Konversi:</p>
              <p>Diketahui <strong>3,01 × 10²³ molekul gas CO₂</strong> (Mr=44). Hitunglah:</p>
              <ol class="list-decimal pl-5 space-y-1 mt-2">
                <li>Jumlah mol CO₂</li>
                <li>Massa CO₂ (gram)</li>
                <li>Volume CO₂ pada STP (Liter)</li>
              </ol>
            </div>
          </div>
        `,
      },
    ],
  },
  nomenclature: {
    title: "Materi Lengkap: Tata Nama Senyawa",
    sections: [
      {
        heading: "1. Kenalan Dulu: Logam vs Non-Logam",
        content: `
          <p>Sebelum memberi nama, kamu WAJIB tahu siapa yang bereaksi. Cek tabel periodikmu!</p>
          <div class="grid grid-cols-2 gap-4 my-4">
            <div class="bg-slate-100 p-3 rounded">
              <strong>Logam (Kiri Tabel)</strong><br/>
              Na, K, Mg, Ca, Al, Fe, Cu...
            </div>
            <div class="bg-slate-100 p-3 rounded">
              <strong>Non-Logam (Kanan Tabel)</strong><br/>
              O, Cl, F, N, S, C...
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tentukan apakah unsur berikut Logam atau Non-Logam:</p>
              <ul class="grid grid-cols-2 gap-2 text-center">
                <li class="bg-white p-2 rounded border border-yellow-100">Kalium (K)</li>
                <li class="bg-white p-2 rounded border border-yellow-100">Sulfur (S)</li>
                <li class="bg-white p-2 rounded border border-yellow-100">Barium (Ba)</li>
                <li class="bg-white p-2 rounded border border-yellow-100">Fosfor (P)</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        heading: "2. Senyawa Ion (Logam + Non-Logam)",
        content: `
          <p>Aturannya simpel: <strong>Sebut Nama Logam + Nama Non-Logam + akhiran "-ida"</strong>.</p>
          <p>JANGAN pakai awalan angka (mono, di, tri) di sini!</p>
          <ul class="list-disc pl-5 mt-2 space-y-2">
            <li><strong>NaCl</strong>: Natrium Klorida (Bukan Natrium Monoklorida!)</li>
            <li><strong>MgCl₂</strong>: Magnesium Klorida (Bukan Magnesium Diklorida!)</li>
            <li><strong>Al₂O₃</strong>: Aluminium Oksida</li>
          </ul>
          
          <h4 class="font-bold mt-4 text-blue-600">Pengecualian: Logam Transisi (Punya Banyak Wajah)</h4>
          <p>Beberapa logam seperti Besi (Fe), Tembaga (Cu), Timbal (Pb) bisa punya muatan beda-beda. Kita harus kasih nomor punggung (angka Romawi).</p>
          <ul class="list-disc pl-5 mt-2">
            <li>FeCl₂ (Fe muatan +2) -> Besi(II) Klorida</li>
            <li>FeCl₃ (Fe muatan +3) -> Besi(III) Klorida</li>
          </ul>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Beri nama senyawa ion berikut:</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li><strong>KBr</strong></li>
                <li><strong>CaS</strong></li>
                <li><strong>Na₂O</strong></li>
                <li><strong>CuCl₂</strong> (Ingat Tembaga logam transisi!)</li>
              </ol>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Senyawa Kovalen (Non-Logam + Non-Logam)",
        content: `
          <p>Nah, kalau sesama Non-Logam, barulah kita pakai <strong>Awalan Yunani</strong> untuk menyebut jumlah atomnya.</p>
          <div class="bg-yellow-50 p-3 rounded border border-yellow-200 my-2 text-sm font-mono">
            1=Mono, 2=Di, 3=Tri, 4=Tetra, 5=Penta, 6=Heksa
          </div>
          <p>Aturan main:</p>
          <ul class="list-disc pl-5 mt-2">
            <li>Awalan "Mono" TIDAK dipakai untuk unsur pertama.</li>
            <li>Awalan "Mono" BOLEH dipakai untuk unsur kedua.</li>
          </ul>
          <p class="font-bold mt-2">Contoh:</p>
          <ul class="list-disc pl-5">
            <li><strong>CO</strong>: Karbon Monoksida (Bukan Monokarbon Monoksida)</li>
            <li><strong>CO₂</strong>: Karbon Dioksida</li>
            <li><strong>N₂O₅</strong>: Dinitrogen Pentaoksida</li>
          </ul>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Beri nama senyawa kovalen berikut:</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li><strong>SO₂</strong></li>
                <li><strong>PCl₅</strong></li>
                <li><strong>CCl₄</strong></li>
                <li><strong>N₂O</strong></li>
              </ol>
            </div>
          </div>
        `,
      },
    ],
  },
  equations: {
    title: "Materi Lengkap: Persamaan Reaksi",
    sections: [
      {
        heading: "1. Bedah Anatomi Persamaan Reaksi",
        content: `
          <p>Sebelum mulai masak, kita harus kenal alat-alatnya dulu. Perhatikan persamaan reaksi pembentukan air ini:</p>
          
          <div class="bg-white p-6 rounded-xl border-2 border-slate-200 my-4 text-center shadow-sm">
            <div class="text-3xl font-mono font-bold text-slate-800 mb-4 tracking-wider">
              <span class="text-red-600">2</span>H<span class="text-blue-600 text-xl">₂</span><span class="text-slate-400 text-lg">(g)</span> + O<span class="text-blue-600 text-xl">₂</span><span class="text-slate-400 text-lg">(g)</span> &rarr; <span class="text-red-600">2</span>H<span class="text-blue-600 text-xl">₂</span>O<span class="text-slate-400 text-lg">(l)</span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-left text-sm">
              <div class="bg-red-50 p-2 rounded border border-red-100">
                <strong class="text-red-700">Angka Besar (Koefisien)</strong>
                <p>Menyatakan jumlah paket/molekul. <strong>INI BOLEH DIUBAH</strong> saat menyetarakan.</p>
              </div>
              <div class="bg-blue-50 p-2 rounded border border-blue-100">
                <strong class="text-blue-700">Angka Kecil (Indeks)</strong>
                <p>Menyatakan jumlah atom dalam 1 molekul. <strong>HARAM DIUBAH!</strong> Mengubah ini = mengubah zat.</p>
              </div>
              <div class="bg-slate-50 p-2 rounded border border-slate-200">
                <strong class="text-slate-700">Huruf (s, l, g, aq)</strong>
                <p>Wujud zat: Solid (padat), Liquid (cair), Gas, Aqueous (larut air).</p>
              </div>
              <div class="bg-slate-50 p-2 rounded border border-slate-200">
                <strong class="text-slate-700">Tanda Panah (&rarr;)</strong>
                <p>Artinya "Bereaksi Menjadi". Memisahkan Reaktan (kiri) dan Produk (kanan).</p>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Identifikasi Reaktan dan Produk dari reaksi berikut:</p>
              <p class="font-mono bg-white p-2 rounded border border-yellow-100 mb-2 text-center">Mg(s) + 2HCl(aq) &rarr; MgCl₂(aq) + H₂(g)</p>
              <ul class="list-disc pl-5">
                <li>Zat Reaktan: ...</li>
                <li>Zat Produk: ...</li>
                <li>Koefisien HCl: ...</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        heading: "2. Tutorial Langkah Demi Langkah (Metode KAHO)",
        content: `
          <p>Menyetarakan reaksi itu seperti main puzzle. Jangan acak! Gunakan urutan sakti <strong>KAHO</strong>:</p>
          <ul class="list-none space-y-2 mb-6">
            <li class="flex items-center gap-2"><span class="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded">K</span> <strong>Kation (Logam)</strong>: Na, K, Mg, Al, Fe, dll.</li>
            <li class="flex items-center gap-2"><span class="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded">A</span> <strong>Anion (Non-Logam)</strong>: C, N, S, Cl, P (selain H dan O).</li>
            <li class="flex items-center gap-2"><span class="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded">H</span> <strong>Hidrogen</strong></li>
            <li class="flex items-center gap-2"><span class="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded">O</span> <strong>Oksigen</strong></li>
          </ul>

          <div class="bg-blue-50 p-5 rounded-lg border border-blue-300 mb-6">
            <h4 class="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span class="text-xl">💡</span> Mengapa Urutan KAHO Harus Diikuti?
            </h4>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded border-l-4 border-blue-500">
                <p class="font-bold text-blue-800 mb-2">1️⃣ Kation (atau Logam) Didahulukan → MUDAH DIHITUNG</p>
                <p class="text-slate-700 text-sm mb-2">Kation adalah unsur yang paling mudah diidentifikasi dan biasanya muncul dalam jumlah terbatas. Dengan mensetarakan kation terlebih dahulu, kita sudah menentukan struktur dasar senyawa. Logam jarang membentuk rantai (seperti karbon), jadi angka yang kita berikan tidak akan mengubah banyak hal lain.</p>
                <p class="text-xs text-blue-600 italic">Contoh: Jika Al ada 2 di produk, kita langsung tahu harus beri koefisien 2 di reaktan Al.</p>
              </div>

              <div class="bg-white p-4 rounded border-l-4 border-blue-500">
                <p class="font-bold text-blue-800 mb-2">2️⃣ Anion Kedua → BAGIAN DARI SENYAWA KOMPLEKS</p>
                <p class="text-slate-700 text-sm mb-2">Anion sering membentuk kelompok yang tidak berubah (seperti SO₄²⁻ atau NO₃⁻). Dengan mensetarakan anion SETELAH kation, kita bisa menghitung paket-paket ini secara bulat. Jangan ubah urutan ini, karena bisa jadi koefisien kation harus disesuaikan lagi (panik!).</p>
                <p class="text-xs text-blue-600 italic">Contoh: Paket SO₄²⁻ adalah satu unit. Jika kanan ada 3 paket, kiri harus ada 3 paket juga.</p>
              </div>

              <div class="bg-white p-4 rounded border-l-4 border-blue-500">
                <p class="font-bold text-blue-800 mb-2">3️⃣ Hidrogen Ketiga → SERING MUNCUL DIKOMBINASI</p>
                <p class="text-slate-700 text-sm mb-2">Hidrogen adalah unsur yang PALING MUDAH BERUBAH. Dia bisa hadir di banyak tempat: dalam air (H₂O), dalam asam (H₂SO₄), dalam basa (NaOH), bahkan dalam gas H₂. Jika kita setarakan H lebih dulu, nanti saat setarakan oksigen, angka H mungkin berubah lagi! Makanya H harus ditunda sampai sini.</p>
                <p class="text-xs text-blue-600 italic">Contoh: Saat setarakan O, mungkin kita tambah air (H₂O), yang tiba-tiba H juga bertambah. Kalau sudah disetarakan H, akan berantakan.</p>
              </div>

              <div class="bg-white p-4 rounded border-l-4 border-blue-500">
                <p class="font-bold text-blue-800 mb-2">4️⃣ Oksigen Terakhir → UNSUR PALING SERING MUNCUL</p>
                <p class="text-slate-700 text-sm mb-2">Oksigen adalah unsur PALING FLEKSIBEL dalam reaksi kimia. Dia muncul hampir di semua senyawa (oksida, air, asam, basa, dll). Jika kita setarakan O duluan, saat setarakan unsur lain, o akan berubah. Dengan menunda O sampai akhir, unsur lain sudah stabil, dan O tinggal "mengikuti" apa yang sudah ada.</p>
                <p class="text-xs text-blue-600 italic">Contoh: Reaksi pembakaran, O ada di O₂, CO₂, dan H₂O semua. Makanya O diseimbangkan paling akhir!</p>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p class="font-bold text-yellow-900 mb-2">Contoh Kasus: Al + H₂SO₄ &rarr; Al₂(SO₄)₃ + H₂</p>
            
            <div class="space-y-4">
              <div class="bg-white p-3 rounded border border-yellow-100">
                <p class="font-bold text-purple-700">Langkah 1: Kation (Al)</p>
                <p>Kiri: 1, Kanan: 2. &rarr; Beri koefisien <strong>2</strong> di kiri.</p>
                <p class="font-mono text-sm mt-1"><strong>2</strong>Al + H₂SO₄ &rarr; Al₂(SO₄)₃ + H₂</p>
              </div>

              <div class="bg-white p-3 rounded border border-yellow-100">
                <p class="font-bold text-purple-700">Langkah 2: Anion (S atau satu paket SO₄)</p>
                <p>Kiri: 1 paket SO₄, Kanan: 3 paket SO₄. &rarr; Beri koefisien <strong>3</strong> di H₂SO₄.</p>
                <p class="font-mono text-sm mt-1">2Al + <strong>3</strong>H₂SO₄ &rarr; Al₂(SO₄)₃ + H₂</p>
              </div>

              <div class="bg-white p-3 rounded border border-yellow-100">
                <p class="font-bold text-purple-700">Langkah 3: Hidrogen (H)</p>
                <p>Kiri: 3 x 2 = 6 atom H. Kanan: baru 2. &rarr; Supaya jadi 6, kalikan <strong>3</strong>.</p>
                <p class="font-mono text-sm mt-1">2Al + 3H₂SO₄ &rarr; Al₂(SO₄)₃ + <strong>3</strong>H₂</p>
              </div>

              <div class="bg-white p-3 rounded border border-yellow-100">
                <p class="font-bold text-purple-700">Langkah 4: Oksigen (O)</p>
                <p>Cek saja. Kiri: 3 x 4 = 12. Kanan: 3 x 4 = 12. <strong>SUDAH SETARA!</strong> 🎉</p>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Setarakan reaksi berikut (Gunakan metode KAHO):</p>
              <p class="font-mono bg-white p-2 rounded border border-yellow-100 text-center">NaOH + H₂SO₄ &rarr; Na₂SO₄ + H₂O</p>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Tips Pro: Menghadapi Pecahan",
        content: `
          <p>Kadang saat menyetarakan reaksi pembakaran, kita ketemu angka ganjil.</p>
          <p>Contoh: C₂H₆ + O₂ &rarr; CO₂ + H₂O</p>
          <ol class="list-decimal pl-5 space-y-1 mt-2">
            <li>Setarakan C: C₂H₆ + O₂ &rarr; <strong>2</strong>CO₂ + H₂O</li>
            <li>Setarakan H: C₂H₆ + O₂ &rarr; 2CO₂ + <strong>3</strong>H₂O</li>
            <li>Setarakan O: Kanan ada (2x2) + 3 = 7. Kiri ada 2. Berapa kali 2 biar jadi 7? Jawabannya <strong>3,5</strong> (atau 7/2).</li>
          </ol>
          <p class="mt-2 font-mono bg-slate-100 p-2 rounded">C₂H₆ + <strong>3,5</strong> O₂ &rarr; 2CO₂ + 3H₂O</p>
          <p class="mt-2">Koefisien tidak boleh pecahan! Solusinya? <strong>Kalikan SEMUA koefisien dengan 2.</strong></p>
          <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-2 font-bold text-center text-emerald-800">
            2C₂H₆ + 7O₂ &rarr; 4CO₂ + 6H₂O
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Setarakan reaksi pembakaran butana berikut:</p>
              <p class="font-mono bg-white p-2 rounded border border-yellow-100 text-center mt-2">C₄H₁₀ + O₂ &rarr; CO₂ + H₂O</p>
              <p class="text-xs text-slate-500 mt-1 italic">Tips: Jika ketemu pecahan, kalikan 2 semua koefisien!</p>
            </div>
          </div>
        `,
      },
    ],
  },
  "basic-laws": {
    title: "Materi Lengkap: Hukum Dasar Kimia",
    sections: [
      {
        heading: "1. Hukum Lavoisier (Kekekalan Massa)",
        content: `
          <div class="bg-slate-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <p class="font-serif italic text-lg text-center">"Dalam sistem tertutup, massa zat sebelum dan sesudah reaksi adalah sama."</p>
            <p class="text-right text-sm mt-2 text-slate-400">- Antoine Lavoisier (1789)</p>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
            <h4 class="font-bold text-blue-900 mb-2">🔥 Analogi Kayu Bakar</h4>
            <p class="mb-2">Kalau kamu membakar 1 kg kayu, abunya pasti ringan sekali (mungkin cuma 100 gram). Apakah Hukum Lavoisier salah? Apakah massanya hilang?</p>
            <p class="font-bold text-blue-800">TIDAK!</p>
            <p>Massa yang "hilang" itu sebenarnya berubah menjadi asap (gas CO₂) dan uap air yang terbang ke udara. Kalau kita tangkap semua asapnya dan ditimbang bersama abu, totalnya pasti tetap 1 kg (+ massa oksigen yang bereaksi).</p>
          </div>

          <div class="bg-white p-4 rounded-lg border-l-4 border-primary shadow-sm">
            <p class="font-bold mb-1">Syarat Penting:</p>
            <p>Hukum ini paling mudah diamati dalam <strong>Sistem Tertutup</strong> (wadah tertutup rapat), di mana tidak ada gas yang bisa kabur.</p>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Sebanyak 10 gram logam Magnesium dibakar dengan 5 gram Oksigen dalam wadah tertutup menghasilkan Magnesium Oksida. Berapakah massa Magnesium Oksida yang terbentuk?</p>
            </div>
          </div>
        `,
      },
      {
        heading: "2. Hukum Proust (Perbandingan Tetap)",
        content: `
          <div class="bg-slate-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <p class="font-serif italic text-lg text-center">"Perbandingan massa unsur-unsur penyusun suatu senyawa adalah tertentu dan tetap."</p>
            <p class="text-right text-sm mt-2 text-slate-400">- Joseph Louis Proust (1799)</p>
          </div>
          
          <div class="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-6">
            <h4 class="font-bold text-orange-900 mb-2">🍰 Analogi Resep Kue</h4>
            <p class="mb-2">Untuk membuat 1 kue yang enak, resepnya mutlak: <strong>2 Telur : 100g Tepung</strong>.</p>
            <ul class="list-disc pl-5 space-y-1 text-sm text-orange-800">
              <li>Punya 4 Telur + 200g Tepung &rarr; Jadi 2 Kue (Pas!)</li>
              <li>Punya 4 Telur + <strong>500g Tepung</strong> &rarr; Tetap jadi 2 Kue. Sisa 300g Tepung terbuang.</li>
            </ul>
            <p class="mt-2">Senyawa kimia juga begitu! Air (H₂O) selalu punya perbandingan massa <strong>Hidrogen : Oksigen = 1 : 8</strong>.</p>
          </div>

          <h4 class="font-bold text-slate-800 mb-2">Contoh Perhitungan Air (1 : 8)</h4>
          <table class="w-full text-sm text-left border-collapse mb-4">
            <thead class="bg-slate-100 text-slate-700">
              <tr>
                <th class="p-2 border">Massa H</th>
                <th class="p-2 border">Massa O</th>
                <th class="p-2 border">Air Terbentuk</th>
                <th class="p-2 border">Sisa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-2 border">1 gram</td>
                <td class="p-2 border">8 gram</td>
                <td class="p-2 border font-bold text-emerald-600">9 gram</td>
                <td class="p-2 border text-slate-400">-</td>
              </tr>
              <tr>
                <td class="p-2 border">2 gram</td>
                <td class="p-2 border">8 gram</td>
                <td class="p-2 border font-bold text-emerald-600">9 gram</td>
                <td class="p-2 border text-red-500">Sisa 1g H</td>
              </tr>
              <tr>
                <td class="p-2 border">1 gram</td>
                <td class="p-2 border">10 gram</td>
                <td class="p-2 border font-bold text-emerald-600">9 gram</td>
                <td class="p-2 border text-red-500">Sisa 2g O</td>
              </tr>
            </tbody>
          </table>
          <p class="text-sm italic text-slate-500">Lihat? Walaupun bahan dilebihkan, yang bereaksi tetap sesuai rasio 1:8.</p>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Perbandingan massa Karbon : Oksigen dalam CO₂ adalah <strong>3 : 8</strong>.</p>
              <p>Jika 6 gram Karbon direaksikan dengan 20 gram Oksigen, berapa gram CO₂ yang terbentuk dan zat apa yang bersisa?</p>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Hukum Dalton (Perbandingan Berganda)",
        content: `
          <div class="bg-slate-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <p class="font-serif italic text-lg text-center">"Jika dua unsur dapat membentuk lebih dari satu senyawa, maka perbandingan massa unsur yang satu, yang bersenyawa dengan sejumlah massa yang sama dari unsur yang lain, adalah sebagai bilangan bulat dan sederhana."</p>
            <p class="text-right text-sm mt-2 text-slate-400">- John Dalton (1803)</p>
          </div>
          
          <p class="mb-4">Contoh paling klasik: <strong>Karbon (C)</strong> dan <strong>Oksigen (O)</strong>.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-100 p-4 rounded-xl border border-slate-200">
              <h4 class="font-bold text-slate-800">Senyawa I: CO</h4>
              <p class="text-sm text-slate-600">(Karbon Monoksida)</p>
              <div class="mt-2 text-sm">
                Massa C : Massa O<br/>
                <strong>12g : 16g</strong>
              </div>
            </div>
            <div class="bg-slate-100 p-4 rounded-xl border border-slate-200">
              <h4 class="font-bold text-slate-800">Senyawa II: CO₂</h4>
              <p class="text-sm text-slate-600">(Karbon Dioksida)</p>
              <div class="mt-2 text-sm">
                Massa C : Massa O<br/>
                <strong>12g : 32g</strong>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 class="font-bold text-purple-900 mb-2">🔍 Cara Cek Hukum Dalton:</h4>
            <ol class="list-decimal pl-5 space-y-2 text-purple-800">
              <li>Pastikan massa salah satu unsur SAMA (Di contoh atas, C sama-sama 12g).</li>
              <li>Bandingkan massa unsur yang satunya (Oksigen).</li>
              <li>Rasio Oksigen = 16g : 32g = <strong>1 : 2</strong>.</li>
            </ol>
            <p class="mt-4 font-bold">Kesimpulan:</p>
            <p>Karena rasionya Bulat dan Sederhana (1:2), maka berlakulah Hukum Dalton.</p>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Unsur X dan Y membentuk dua senyawa:</p>
              <ul class="list-disc pl-5 mb-2">
                <li>Senyawa I: 40% X</li>
                <li>Senyawa II: 50% X</li>
              </ul>
              <p>Tunjukkan bahwa kedua senyawa memenuhi Hukum Dalton!</p>
            </div>
          </div>
        `,
      },
    ],
  },
  "chemical-formulas": {
    title: "Materi Lengkap: Rumus Kimia",
    sections: [
      {
        heading: "1. Apa itu Rumus Kimia? (Definisi & Analogi)",
        content: `
          <div class="bg-slate-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <p class="font-serif italic text-lg text-center">"Rumus Kimia adalah notasi yang menggunakan lambang unsur dan angka indeks untuk menyatakan jenis dan jumlah atom penyusun suatu zat."</p>
          </div>

          <p><strong>Analogi Sederhana:</strong></p>
          <p>Bayangkan Rumus Kimia seperti <strong>KTP (Kartu Tanda Penduduk)</strong> bagi setiap zat. KTP memberitahu kita identitas pemiliknya. Begitu juga Rumus Kimia, ia memberitahu kita:</p>
          <ul class="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Jenis Unsur:</strong> Siapa saja penyusunnya? (Dilambangkan dengan huruf, misal C, H, O)</li>
            <li><strong>Jumlah Atom:</strong> Ada berapa banyak? (Dilambangkan dengan angka indeks kecil di bawah)</li>
          </ul>
          
          <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 my-4 flex items-center gap-4">
            <div class="text-4xl font-bold text-blue-800">H₂O</div>
            <div>
              <p class="font-bold text-blue-900">Artinya secara ilmiah:</p>
              <p class="text-sm text-blue-800">Satu molekul air tersusun atas <strong>2 atom Hidrogen</strong> dan <strong>1 atom Oksigen</strong> yang terikat secara kimia.</p>
            </div>
          </div>
          <p class="text-sm italic text-slate-500">*Catatan: Jika tidak ada angka indeks, artinya jumlah atom tersebut adalah 1.</p>
          
          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tentukan jumlah atom masing-masing unsur dalam rumus kimia berikut:</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li><strong>H₂SO₄</strong> (Asam Sulfat)</li>
                <li><strong>Ca(OH)₂</strong> (Kalsium Hidroksida)</li>
                <li><strong>C₆H₁₂O₆</strong> (Glukosa)</li>
              </ol>
              <p class="mt-3 text-xs text-slate-500 italic">Tips: Angka di luar kurung mengalikan semua atom di dalam kurung.</p>
            </div>
          </div>
        `,
      },
      {
        heading: "2. Rumus Empiris (RE) vs Rumus Molekul (RM)",
        content: `
          <p>Dalam kimia, kita mengenal dua jenis rumus yang sering membingungkan siswa. Mari kita bedah perbedaannya.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div class="bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm">
              <h4 class="font-bold text-slate-800 text-lg mb-2">Rumus Molekul (RM)</h4>
              <p class="text-sm font-bold text-slate-500 uppercase mb-2">Definisi Ilmiah</p>
              <p class="text-slate-700 mb-4">Rumus yang menyatakan <strong>jumlah atom sebenarnya</strong> yang menyusun satu molekul senyawa.</p>
              <div class="bg-slate-100 p-3 rounded text-center">
                <p class="text-xs text-slate-500">Contoh Glukosa:</p>
                <p class="font-bold text-xl text-slate-800">C₆H₁₂O₆</p>
              </div>
            </div>
            
            <div class="bg-white p-4 rounded-xl border-2 border-emerald-200 shadow-sm">
              <h4 class="font-bold text-emerald-800 text-lg mb-2">Rumus Empiris (RE)</h4>
              <p class="text-sm font-bold text-emerald-500 uppercase mb-2">Definisi Ilmiah</p>
              <p class="text-emerald-900 mb-4">Rumus yang menyatakan <strong>perbandingan terkecil (paling sederhana)</strong> dari atom-atom penyusun senyawa.</p>
              <div class="bg-emerald-50 p-3 rounded text-center">
                <p class="text-xs text-emerald-600">Rasio C:H:O = 6:12:6 disederhanakan jadi 1:2:1</p>
                <p class="font-bold text-xl text-emerald-800">CH₂O</p>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p class="font-bold text-orange-900 mb-2">🏫 Analogi Kelas Siswa:</p>
            <p class="text-sm text-orange-800 mb-2">Di kelas X-1 ada <strong>20 Siswa Laki-laki (L)</strong> dan <strong>10 Siswa Perempuan (P)</strong>.</p>
            <ul class="list-disc pl-5 text-sm text-orange-800">
              <li><strong>Rumus Molekul (Keadaan Nyata):</strong> L₂₀P₁₀ (Ada 20 L dan 10 P).</li>
              <li><strong>Rumus Empiris (Rasio):</strong> L₂P₁ (Setiap 2 Laki-laki ada 1 Perempuan).</li>
            </ul>
          </div>

          <p class="font-bold text-center mt-6">Hubungan Matematis:</p>
          <div class="text-center bg-slate-800 text-white p-3 rounded-lg font-mono text-lg my-2">
            RM = (RE)n
          </div>
          <p class="text-center text-sm">dimana <strong>n</strong> adalah bilangan bulat positif (1, 2, 3, ...).</p>
          
          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Kelompokkan rumus berikut ke dalam Rumus Empiris (RE) atau Rumus Molekul (RM):</p>
              <ul class="grid grid-cols-2 gap-2">
                <li class="bg-white p-2 rounded border border-yellow-100 text-center">H₂O₂</li>
                <li class="bg-white p-2 rounded border border-yellow-100 text-center">NaCl</li>
                <li class="bg-white p-2 rounded border border-yellow-100 text-center">C₂H₆</li>
                <li class="bg-white p-2 rounded border border-yellow-100 text-center">CH₄</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Menentukan Rumus Empiris (Metode Ilmiah)",
        content: `
          <p>Untuk menentukan Rumus Empiris dari data percobaan (biasanya persen massa), kita menggunakan prinsip <strong>Hukum Perbandingan Tetap (Proust)</strong>. Kita harus mencari perbandingan mol atom-atomnya.</p>
          
          <div class="space-y-4 mt-6">
            <div class="flex gap-4">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h4 class="font-bold text-slate-800">Konversi Massa ke Gram</h4>
                <p class="text-sm text-slate-600">Jika data dalam persen (%), asumsikan total massa sampel adalah 100 gram. Maka nilai persen sama dengan massa dalam gram.</p>
                <p class="text-xs bg-slate-100 p-1 rounded mt-1 inline-block font-mono">40% C &rarr; 40 gram C</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h4 class="font-bold text-slate-800">Konversi Gram ke Mol</h4>
                <p class="text-sm text-slate-600"><strong>Ini langkah krusial!</strong> Reaksi kimia terjadi pada tingkat partikel (mol), bukan massa. Bagi massa setiap unsur dengan Massa Atom Relatif (Ar)-nya.</p>
                <p class="text-xs bg-slate-100 p-1 rounded mt-1 inline-block font-mono">Mol = Massa / Ar</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h4 class="font-bold text-slate-800">Cari Perbandingan Terkecil</h4>
                <p class="text-sm text-slate-600">Bandingkan nilai mol semua unsur. Bagi semua nilai dengan angka mol yang <strong>paling kecil</strong> untuk mendapatkan rasio bilangan bulat.</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <h4 class="font-bold text-slate-800">Bulatkan Rasio</h4>
                <p class="text-sm text-slate-600">Jika hasilnya pecahan sederhana, kalikan dengan bilangan bulat agar menjadi bilangan bulat.</p>
                <ul class="list-disc pl-5 text-xs text-slate-500 mt-1">
                  <li>1.5 &rarr; Kalikan 2 (jadi 3)</li>
                  <li>1.33 &rarr; Kalikan 3 (jadi 4)</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Suatu senyawa hidrokarbon mengandung <strong>80% Karbon</strong> dan <strong>20% Hidrogen</strong>. Tentukan Rumus Empirisnya!</p>
              <p class="text-xs text-slate-500 mt-2">(Diketahui Ar C = 12, H = 1)</p>
            </div>
          </div>
        `,
      },
      {
        heading: "4. Menentukan Rumus Molekul (RM)",
        content: `
          <p>Rumus Empiris hanya memberi tahu rasio. Untuk tahu rumus aslinya (RM), kita butuh data tambahan yaitu <strong>Massa Molekul Relatif (Mr)</strong> senyawa tersebut.</p>
          
          <div class="bg-white p-4 rounded-xl border-l-4 border-purple-500 shadow-sm my-4">
            <h4 class="font-bold text-purple-800 mb-2">Prinsip Dasar:</h4>
            <p class="text-sm text-slate-700">Massa Rumus Molekul adalah kelipatan bilangan bulat (n) dari Massa Rumus Empiris.</p>
            <div class="bg-slate-100 p-3 rounded mt-3 font-mono text-center font-bold text-slate-800">
              Mr(RM) = n × Mr(RE)
            </div>
          </div>

          <p class="font-bold text-sm text-slate-500 uppercase">Contoh Penerapan:</p>
          <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2 text-sm">
            <ul class="space-y-2">
              <li><span class="font-semibold">Diketahui:</span> RE = CH₂O dan Mr senyawa = 180.</li>
              <li><span class="font-semibold">Langkah 1:</span> Hitung Mr dari RE (CH₂O). <br/>(1×12) + (2×1) + (1×16) = <strong>30</strong>.</li>
              <li><span class="font-semibold">Langkah 2:</span> Cari nilai n.<br/>180 = n × 30 &rarr; <strong>n = 6</strong>.</li>
              <li><span class="font-semibold">Langkah 3:</span> Kalikan RE dengan n.<br/>(CH₂O)₆ &rarr; <strong>C₆H₁₂O₆</strong>.</li>
            </ul>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Diketahui Rumus Empiris suatu senyawa adalah <strong>CH₂</strong>. Jika massa molekul relatif (Mr) senyawa tersebut adalah <strong>56</strong>, tentukan Rumus Molekulnya!</p>
              <p class="text-xs text-slate-500 mt-2">(Diketahui Ar C = 12, H = 1)</p>
            </div>
          </div>
        `,
      },
      {
        heading: "5. Air Kristal (Hidrat)",
        content: `
          <div class="bg-slate-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <p class="font-serif italic text-lg text-center">"Hidrat adalah senyawa padat (biasanya garam) yang mengikat sejumlah molekul air dalam struktur kristalnya."</p>
          </div>

          <p>Meskipun mengandung air, senyawa ini tampak kering padat. Molekul air ini disebut <strong>Air Kristal</strong>.</p>
          
          <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 my-4 flex items-center gap-4">
            <div class="text-2xl font-bold text-blue-800 font-mono">CuSO₄ · 5H₂O</div>
            <div>
              <p class="font-bold text-blue-900">Tembaga(II) Sulfat Pentahidrat</p>
              <p class="text-sm text-blue-800">Tanda titik (·) artinya "mengikat". Jadi, 1 molekul CuSO₄ mengikat 5 molekul air.</p>
            </div>
          </div>

          <p class="font-bold mt-4">Bagaimana cara mencari jumlah air (x)?</p>
          <p>Prinsipnya sama dengan mencari Rumus Empiris. Kita membandingkan <strong>Mol Garam Anhidrat</strong> (garam tanpa air) dengan <strong>Mol Air</strong> yang menguap saat dipanaskan.</p>
          
          <div class="text-center bg-slate-100 text-slate-800 p-3 rounded mt-2 font-mono border border-slate-300">
            x = Mol H₂O / Mol Garam
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan:</p>
              <p>Jika perbandingan mol MgSO₄ : H₂O adalah <strong>1 : 7</strong>, tuliskan rumus kimia garam hidrat tersebut!</p>
            </div>
          </div>
        `,
      },
    ],
  },
  "limiting-reagent": {
    title: "Materi Lengkap: Pereaksi Pembatas",
    sections: [
      {
        heading: "1. Definisi & Konsep Dasar",
        content: `
          <div class="bg-slate-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <p class="font-serif italic text-lg text-center">"Pereaksi Pembatas adalah zat pereaksi yang habis bereaksi lebih dulu, sehingga membatasi jumlah produk yang dapat terbentuk."</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 class="font-bold text-red-900 mb-1">Pereaksi Pembatas</h4>
              <p class="text-sm text-red-800">Zat yang <strong>HABIS</strong> duluan. Dia adalah "bos" yang menentukan kapan reaksi berhenti dan berapa banyak produk yang dihasilkan.</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-bold text-blue-900 mb-1">Pereaksi Sisa</h4>
              <p class="text-sm text-blue-800">Zat yang masih <strong>BERSISA</strong> setelah reaksi selesai. Jumlahnya berlebih dari yang dibutuhkan.</p>
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Jawablah dengan kata-kata sendiri:</p>
              <p>Mengapa reaksi kimia akan berhenti jika salah satu pereaksi habis, meskipun pereaksi lain masih banyak?</p>
            </div>
          </div>
        `,
      },
      {
        heading: "2. Analogi Sandwich (Paham Konsep)",
        content: `
          <div class="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-6">
            <h4 class="font-bold text-orange-900 mb-4 text-lg">🍔 Resep Sandwich Spesial</h4>
            <p class="mb-2 font-medium">Rumus Resep:</p>
            <div class="bg-white p-3 rounded-lg border border-orange-100 text-center font-bold text-orange-800 mb-4 text-xl">
              2 Roti + 1 Daging &rarr; 1 Sandwich
            </div>
            
            <p class="mb-2">Bayangkan di dapur kamu punya stok:</p>
            <ul class="grid grid-cols-2 gap-4 mb-4">
              <li class="bg-white p-3 rounded border text-center">
                <span class="block text-2xl mb-1">🍞</span>
                <strong>10 Lembar Roti</strong>
              </li>
              <li class="bg-white p-3 rounded border text-center">
                <span class="block text-2xl mb-1">🥩</span>
                <strong>3 Lembar Daging</strong>
              </li>
            </ul>

            <p class="font-bold text-slate-800 mb-2">Analisis:</p>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
              <li>10 Roti cukup untuk 5 Sandwich (10 ÷ 2).</li>
              <li>3 Daging cukup untuk 3 Sandwich (3 ÷ 1).</li>
            </ul>
            
            <div class="mt-4 bg-white p-4 rounded-lg border-l-4 border-orange-500">
              <p class="font-bold text-orange-800">Kesimpulan:</p>
              <p>Kamu cuma bisa buat <strong>3 Sandwich</strong>. Kenapa? Karena <strong>Dagingnya habis duluan!</strong></p>
              <p class="mt-2">Dalam kimia, Daging ini disebut <strong>Pereaksi Pembatas</strong>. Roti adalah <strong>Pereaksi Sisa</strong> (sisa 4 lembar).</p>
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Analogi Sepeda:</p>
              <p>Untuk merakit 1 sepeda butuh: <strong>1 Rangka + 2 Roda</strong>.</p>
              <p>Jika di gudang ada <strong>5 Rangka</strong> dan <strong>8 Roda</strong>:</p>
              <ul class="list-disc pl-5 mt-1">
                <li>Berapa sepeda yang bisa dibuat?</li>
                <li>Apa yang jadi pembatas (habis duluan)?</li>
                <li>Apa yang sisa? Berapa sisanya?</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Cara Menentukan Pembatas (Langkah Sakti)",
        content: `
          <p class="mb-4 text-lg">Jangan pakai feeling! Ikuti 3 langkah pasti ini:</p>
          
          <div class="space-y-4">
            <div class="flex gap-4 items-start bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h4 class="font-bold text-slate-800">Ubah ke Mol</h4>
                <p class="text-slate-600 text-sm">Kalau soal kasih gram, bagi dengan Ar/Mr. Kalau liter (STP), bagi 22,4.</p>
              </div>
            </div>

            <div class="flex gap-4 items-start bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h4 class="font-bold text-slate-800">Bagi dengan Koefisien</h4>
                <p class="text-slate-600 text-sm">Ambil mol masing-masing zat, lalu bagi dengan angka koefisien di persamaan reaksi.</p>
                <p class="text-xs text-slate-400 mt-1 italic">(Hasil bagi ini cuma buat nentuin siapa pemenangnya, jangan dipakai buat hitungan lanjut!)</p>
              </div>
            </div>

            <div class="flex gap-4 items-start bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div class="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h4 class="font-bold text-slate-800">Pilih yang Paling Kecil</h4>
                <p class="text-slate-600 text-sm">Hasil bagi terkecil = <strong>Pereaksi Pembatas</strong>. Dia yang akan habis bereaksi dan menentukan jumlah produk.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tentukan Pereaksi Pembatas:</p>
              <p class="font-mono bg-white p-2 rounded border border-yellow-100 text-center mb-2">N₂ + 3H₂ &rarr; 2NH₃</p>
              <p>Jika direaksikan <strong>4 mol N₂</strong> dengan <strong>9 mol H₂</strong>, siapakah pembatasnya?</p>
            </div>
          </div>
        `,
      },
      {
        heading: "4. Contoh Soal & Pembahasan",
        content: `
          <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <p class="font-mono text-sm bg-slate-200 p-2 rounded mb-4 inline-block">N₂ + 3H₂ &rarr; 2NH₃</p>
            <p class="mb-4">Tersedia <strong>2 mol N₂</strong> dan <strong>3 mol H₂</strong>. Siapa pembatasnya?</p>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-white p-3 rounded border text-center">
                <p class="font-bold text-purple-700">Tes N₂</p>
                <p class="text-2xl font-bold my-2">2 <span class="text-sm font-normal text-slate-400">mol</span> / 1 <span class="text-sm font-normal text-slate-400">koef</span></p>
                <p class="text-xl font-bold text-slate-700">= 2</p>
              </div>
              <div class="bg-white p-3 rounded border text-center ring-2 ring-emerald-400">
                <p class="font-bold text-emerald-700">Tes H₂</p>
                <p class="text-2xl font-bold my-2">3 <span class="text-sm font-normal text-slate-400">mol</span> / 3 <span class="text-sm font-normal text-slate-400">koef</span></p>
                <p class="text-xl font-bold text-emerald-600">= 1 <span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full ml-2">Kecil!</span></p>
              </div>
            </div>

            <p class="font-bold text-slate-800">Kesimpulan:</p>
            <p class="text-slate-700 mb-2">Karena hasil bagi H₂ lebih kecil (1 < 2), maka <strong>H₂ adalah Pereaksi Pembatas</strong>.</p>
            <p class="text-slate-700">Artinya: H₂ akan habis total. N₂ akan bersisa.</p>
          </div>

          <div class="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
              Latihan Individu
            </h4>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
              <p class="font-semibold mb-2">Tantangan Akhir:</p>
              <p>Sebanyak 5,6 gram besi (Ar=56) direaksikan dengan 6,4 gram belerang (Ar=32) membentuk besi(II) sulfida sesuai reaksi:</p>
              <p class="font-mono bg-white p-2 rounded border border-yellow-100 text-center my-2">Fe + S &rarr; FeS</p>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Tentukan pereaksi pembatas!</li>
                <li>Hitung massa FeS yang terbentuk!</li>
              </ol>
            </div>
          </div>
        `,
      },
    ],
  },
  "stoichiometry-integration": {
    title: "Materi Lengkap: Integrasi Stoikiometri",
    sections: [
      {
        heading: '1. Memahami "Koneksi Besar" dalam Stoikiometri',
        content: `
          <p>Sejauh ini kamu sudah mempelajari:</p>
          <ul class="list-disc pl-5 space-y-2 my-4">
            <li><strong>Tata Nama Senyawa</strong>: Cara memberi nama dengan benar</li>
            <li><strong>Rumus Kimia</strong>: Dari nama → rumus, dari data empiris → rumus molekul</li>
            <li><strong>Persamaan Reaksi</strong>: Menyetarakan reaksi dan memahami koefisien</li>
            <li><strong>Hukum Dasar</strong>: Prinsip-prinsip yang mengatur perubahan kimia</li>
            <li><strong>Konsep Mol</strong>: Jembatan antara dunia atom dan dunia gram/liter</li>
            <li><strong>Pereaksi Pembatas</strong>: Menentukan zat yang habis dan hasil maksimal</li>
          </ul>
          
          <p class="mt-6 text-lg font-bold bg-blue-50 border-l-4 border-blue-600 p-4">
            Pertanyaan besar: <strong>Bagaimana semua konsep ini saling terhubung dalam masalah nyata?</strong>
          </p>
          
          <p class="mt-4">Inilah esensi stoikiometri: tidak ada konsep yang berdiri sendiri. Mereka semua saling mendukung untuk memecahkan masalah kimia yang kompleks.</p>
        `,
      },
      {
        heading: "2. Peta Jalan Penyelesaian Masalah Stoikiometri Kompleks",
        content: `
          <h4 class="font-bold text-slate-800 mb-4 text-lg">Langkah demi Langkah:</h4>
          
          <div class="space-y-6">
            <div class="bg-linear-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h5 class="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                PAHAMI MASALAHNYA
              </h5>
              <p class="text-sm text-blue-800">Baca soal dengan teliti. Identifikasi:</p>
              <ul class="list-disc pl-5 text-sm text-blue-800 mt-2">
                <li>Senyawa apa (nama/rumus)?</li>
                <li>Data apa yang diberikan (gram, liter, mol, persen, kemurnian)?</li>
                <li>Apa yang dicari?</li>
              </ul>
            </div>
            
            <div class="bg-linear-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h5 class="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span class="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                CARI RUMUS & PERSAMAAN
              </h5>
              <p class="text-sm text-purple-800">Gunakan kemampuan Tata Nama dan Rumus Kimia:</p>
              <ul class="list-disc pl-5 text-sm text-purple-800 mt-2">
                <li>Dari nama → tulis rumus kimia yang benar</li>
                <li>Cari Ar/Mr masing-masing unsur & senyawa</li>
                <li>Tulis persamaan reaksi & setarakan dengan benar</li>
              </ul>
            </div>
            
            <div class="bg-linear-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
              <h5 class="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <span class="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                KONVERSI KE MOL
              </h5>
              <p class="text-sm text-emerald-800">Gunakan pemahaman Konsep Mol:</p>
              <ul class="list-disc pl-5 text-sm text-emerald-800 mt-2">
                <li>Dari gram → mol (Mol = Gram / Mr)</li>
                <li>Dari volume gas STP → mol (Mol = Volume / 22.4)</li>
                <li>Perhatikan kemurnian/persentase jika ada!</li>
              </ul>
            </div>
            
            <div class="bg-linear-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <h5 class="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <span class="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                CEK PEREAKSI PEMBATAS
              </h5>
              <p class="text-sm text-orange-800">Gunakan Pereaksi Pembatas jika ada 2+ pereaksi:</p>
              <ul class="list-disc pl-5 text-sm text-orange-800 mt-2">
                <li>Bagi mol setiap pereaksi dengan koefisiennya</li>
                <li>Yang terkecil = pereaksi pembatas</li>
                <li>Gunakan pereaksi pembatas untuk hitung produk!</li>
              </ul>
            </div>
            
            <div class="bg-linear-to-r from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
              <h5 class="font-bold text-pink-900 mb-2 flex items-center gap-2">
                <span class="bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                HITUNG HASIL
              </h5>
              <p class="text-sm text-pink-800">Gunakan koefisien reaksi untuk cari mol produk, lalu konversi ke satuan yang diminta (gram/liter)</p>
            </div>
          </div>
        `,
      },
      {
        heading: "3. Contoh Soal Terintegrasi Lengkap",
        content: `
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <p class="font-bold text-blue-900 mb-3">Soal:</p>
            <p class="text-sm text-blue-800 mb-3">Industri memproduksi etanol (C₂H₅OH) dengan fermentasi glukosa. Reaksi:</p>
            <p class="font-mono bg-white p-2 rounded text-center text-blue-700 font-bold my-2">C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂</p>
            <p class="text-sm text-blue-800 mb-2">Jika 180 gram glukosa (Ar: C=12, H=1, O=16) difermentasi dengan efisiensi 80%, berapa gram etanol yang dihasilkan?</p>
          </div>
          
          <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <div class="font-mono text-sm">
              <p class="font-bold text-slate-800">Penyelesaian:</p>
              
              <p class="mt-3 text-slate-700"><span class="font-bold">Langkah 1:</span> Cari Mr Glukosa & Etanol</p>
              <p class="text-slate-600 ml-4">Mr C₆H₁₂O₆ = (6×12) + (12×1) + (6×16) = 72 + 12 + 96 = 180</p>
              <p class="text-slate-600 ml-4">Mr C₂H₅OH = (2×12) + (6×1) + (1×16) = 24 + 6 + 16 = 46</p>
              
              <p class="mt-3 text-slate-700"><span class="font-bold">Langkah 2:</span> Ubah gram glukosa → mol</p>
              <p class="text-slate-600 ml-4">Mol glukosa = 180 / 180 = 1 mol</p>
              
              <p class="mt-3 text-slate-700"><span class="font-bold">Langkah 3:</span> Gunakan koefisien reaksi</p>
              <p class="text-slate-600 ml-4">Dari reaksi: 1 mol glukosa → 2 mol etanol</p>
              <p class="text-slate-600 ml-4">Maka: 1 mol glukosa → 2 mol etanol</p>
              
              <p class="mt-3 text-slate-700"><span class="font-bold">Langkah 4:</span> Hitung dengan efisiensi 80%</p>
              <p class="text-slate-600 ml-4">Mol etanol teoritis = 2 mol</p>
              <p class="text-slate-600 ml-4">Mol etanol aktual = 2 × 80% = 1,6 mol</p>
              
              <p class="mt-3 text-slate-700"><span class="font-bold">Langkah 5:</span> Konversi mol → gram</p>
              <p class="text-slate-600 ml-4">Massa etanol = 1,6 × 46 = 73,6 gram</p>
              
              <p class="mt-4 font-bold text-green-700 bg-green-50 p-2 rounded">✓ Jawaban: 73,6 gram etanol</p>
            </div>
          </div>
        `,
      },
      {
        heading: "4. Tips dan Trik dari Praktisi Kimia",
        content: `
          <div class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p class="font-bold text-yellow-900 mb-2">💡 Tip 1: Jangan Terburu-buru</p>
              <p class="text-sm text-yellow-800">Salah tata nama pada awal akan merambat ke seluruh perhitungan. Periksa rumus 2-3 kali!</p>
            </div>
            
            <div class="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
              <p class="font-bold text-cyan-900 mb-2">💡 Tip 2: Tulis Satuan & Mr</p>
              <p class="text-sm text-cyan-800">Selalu tulis Mr setiap senyawa yang kamu gunakan. Ini memudahkan koreksi jika ada kesalahan.</p>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <p class="font-bold text-purple-900 mb-2">💡 Tip 3: Cek Pereaksi Pembatas Terlebih Dahulu</p>
              <p class="text-sm text-purple-800">Jangan langsung hitung dari pereaksi pertama. Cek dulu siapa yang pembatas!</p>
            </div>
            
            <div class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
              <p class="font-bold text-pink-900 mb-2">💡 Tip 4: Luangkan Waktu untuk Refleksi</p>
              <p class="text-sm text-pink-800">Setelah dapat jawaban, tanyakan: "Apakah jawaban ini masuk akal? Apakah hasilnya terlalu besar/kecil?"</p>
            </div>
          </div>
        `,
      },
    ],
  },
};
