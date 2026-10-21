import React from 'react';
import { BookOpen, Download, FileText, CheckCircle2, Award, ExternalLink, Bookmark } from 'lucide-react';

export const PustakaMateriView: React.FC = () => {
  const materiList = [
    {
      id: 'm-1',
      kategori: 'KOMPETENSI KADER',
      judul: 'Buku Panduan 25 Keterampilan Dasar Kader Posyandu (Purwa, Madya, Utama)',
      deskripsi: 'Standar kompetensi kader dalam penimbangan, pengukuran LiLA, pencatatan KMS digital, dan konseling PMT lokal.',
      format: 'PDF • 4.8 MB',
      updated: 'Oktober 2026',
    },
    {
      id: 'm-2',
      kategori: 'STANDAR KEMENKES',
      judul: 'Petunjuk Teknis Integrasi Pelayanan Primer (ILP) di Posyandu',
      deskripsi: 'Alur kerja 5 langkah posyandu terintegrasi 5 siklus hidup dan prosedur rujukan ke Pustu/Puskesmas.',
      format: 'PDF • 5.2 MB',
      updated: 'September 2026',
    },
    {
      id: 'm-3',
      kategori: 'GIZI & STUNTING',
      judul: 'Modul Pelatihan Pemberian Makanan Tambahan (PMT) Berbahan Pangan Lokal',
      deskripsi: 'Resep standar kaya protein hewani untuk balita berat badan kurang (weight faltering) dan ibu hamil KEK.',
      format: 'PDF • 3.5 MB',
      updated: 'Agustus 2026',
    },
    {
      id: 'm-4',
      kategori: 'SKRINING PTM & LANSIA',
      judul: 'Formulir Skrining Mandiri Faktor Risiko PTM & Instrumen ADL Lansia',
      deskripsi: 'Panduan pengukuran tensi darah, interpretasi lingkar perut, serta deteksi dini penurunan kognitif lansia.',
      format: 'PDF • 2.1 MB',
      updated: 'Oktober 2026',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#14211B]">
          Pustaka Materi & Panduan Pembelajaran Kader
        </h2>
        <p className="text-xs text-[#4B5B53]">
          Materi resmi pembinaan Puskesmas Kepanjen untuk penguatan kapasitas kader posyandu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materiList.map((m) => (
          <div
            key={m.id}
            className="p-5 bg-white rounded-2xl border border-[#D9E2DD] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1E7F4F] transition-all"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#1E7F4F] px-2 py-0.5 rounded bg-[#E6F4EC]">
                {m.kategori}
              </span>
              <h3 className="font-bold text-sm text-[#14211B] leading-snug">
                {m.judul}
              </h3>
              <p className="text-xs text-[#4B5B53] leading-relaxed">
                {m.deskripsi}
              </p>
            </div>

            <div className="pt-3 border-t border-[#D9E2DD] flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{m.format}</span>
              <button
                onClick={() => alert(`Mengunduh berkas: ${m.judul}`)}
                className="px-3 py-1.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Berkas</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
