import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Download, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  Baby, 
  Sparkles, 
  UserCheck, 
  Activity, 
  AlertTriangle,
  ArrowRight,
  Lock,
  Building2,
  CheckCircle2,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { MasterPosyandu, SiklusHidup } from '../../types/posyandu';
import { DAFTAR_DESA_KEPANJEN } from '../../data/masterPosyandu';

interface PublicPortalProps {
  posyanduList: MasterPosyandu[];
  onOpenLogin: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({
  posyanduList,
  onOpenLogin,
}) => {
  const [selectedDesa, setSelectedDesa] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPosyanduDetail, setSelectedPosyanduDetail] = useState<MasterPosyandu | null>(null);

  // Filter Posyandu
  const filteredPosyandu = posyanduList.filter((p) => {
    const matchDesa = selectedDesa === 'Semua' || p.desaKelurahan === selectedDesa;
    const matchSearch =
      searchQuery === '' ||
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desaKelurahan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDesa && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#14211B] flex flex-col font-sans">
      {/* Top Banner Tagline */}
      <div className="bg-[#E6F4EC] border-b border-[#D9E2DD] px-4 py-2 text-center text-xs text-[#145A38] font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1E7F4F] animate-pulse" />
        <span>Saling Hadir, Bantu, dan Tumbuh Bersama • Teman Kader untuk Belajar dan Melayani</span>
      </div>

      {/* Main Public Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#D9E2DD] px-4 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E7F4F] flex items-center justify-center text-white font-bold shadow-md shadow-[#1E7F4F]/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#145A38] tracking-tight">
                  KAWAN POSYANDU
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#145A38] text-[11px] font-semibold border border-[#1E7F4F]/30">
                  Kecamatan Kepanjen
                </span>
              </div>
              <p className="text-[11px] text-[#4B5B53] hidden sm:block">
                Sistem Layanan Terpadu 5 Siklus Hidup
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[#4B5B53]">
            <a href="#beranda" className="px-3 py-1.5 rounded-lg text-[#145A38] font-semibold bg-[#E6F4EC]">
              Beranda
            </a>
            <a href="#jadwal" className="px-3 py-1.5 rounded-lg hover:text-[#145A38] hover:bg-slate-100 transition-colors">
              Jadwal 108 Posyandu
            </a>
            <a href="#5siklus" className="px-3 py-1.5 rounded-lg hover:text-[#145A38] hover:bg-slate-100 transition-colors">
              Informasi 5 Siklus
            </a>
            <a href="#edukasi" className="px-3 py-1.5 rounded-lg hover:text-[#145A38] hover:bg-slate-100 transition-colors">
              Edukasi Publik
            </a>
            <a href="#kontak" className="px-3 py-1.5 rounded-lg hover:text-[#145A38] hover:bg-slate-100 transition-colors">
              Kontak & Bantuan
            </a>
          </nav>

          {/* Login Action Button */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white text-xs md:text-sm font-semibold transition-all shadow-md shadow-[#1E7F4F]/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4" />
            <span>Masuk Petugas / Kader</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14211B] tracking-tight leading-tight">
                Pusat Informasi & Jadwal Layanan <span className="text-[#1E7F4F]">108 Posyandu</span> Se-Kecamatan Kepanjen
              </h1>
              <p className="text-sm md:text-base text-[#4B5B53] leading-relaxed max-w-2xl">
                Portal resmi keterbukaan informasi pelayanan kesehatan primer terintegrasi (ILP) 5 siklus hidup bagi warga masyarakat di 18 desa dan kelurahan wilayah kerja Kecamatan Kepanjen, Kabupaten Malang.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#jadwal"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold text-sm transition-all shadow-md shadow-[#1E7F4F]/20"
              >
                <span>Cari Jadwal Posyandu Anda</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#5siklus"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E6F4EC] hover:bg-[#d7ecdf] text-[#145A38] font-semibold text-sm transition-all"
              >
                <span>Pelajari 5 Siklus Layanan ILP</span>
              </a>
            </div>

            {/* Compliance & Puskesmas tags */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#4B5B53]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1E7F4F]" />
                Terhubung Puskesmas Kepanjen
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1E7F4F]" />
                Kepatuhan UU PDP No. 27/2022
              </span>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D9E2DD] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Pelayanan Posyandu Kepanjen"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#1E7F4F] text-white font-bold w-fit mb-1.5">
                  GERAKAN KEPANJEN SEHAT 2026
                </span>
                <h3 className="font-bold text-lg leading-snug">
                  Integrasi Layanan Primer (ILP)
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Dari janin, balita, remaja, dewasa hingga lansia.
                </p>

                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#F6D44B]" />
                    <span>Putaran Serentak Pekan Ini: 34 Posyandu Buka</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-semibold text-[10px]">
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#14211B] tabular-nums">18</div>
              <div className="text-xs text-[#4B5B53] font-medium">Desa & Kelurahan</div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#14211B] tabular-nums">108</div>
              <div className="text-xs text-[#4B5B53] font-medium">Posyandu Aktif</div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#14211B] tabular-nums">5 Siklus</div>
              <div className="text-xs text-[#4B5B53] font-medium">Tahapan Hidup Lengkap</div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#14211B] tabular-nums">100% Bebas</div>
              <div className="text-xs text-[#4B5B53] font-medium">Layanan Tanpa Biaya</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Cari Jadwal & Lokasi Posyandu */}
      <section id="jadwal" className="bg-white border-y border-[#D9E2DD] py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#1E7F4F] tracking-wider uppercase font-mono">
                • AKSES TERBUKA WARGA
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#14211B] mt-1">
                Cari Jadwal & Lokasi Posyandu Terdekat
              </h2>
              <p className="text-xs md:text-sm text-[#4B5B53] mt-1">
                Silakan pilih desa tempat tinggal Anda untuk memeriksa tanggal hari buka dan titik balai posyandu.
              </p>
            </div>

            <div className="text-xs text-[#4B5B53] flex items-center gap-1.5 font-medium bg-[#F6F8F7] px-3 py-1.5 rounded-lg border border-[#D9E2DD]">
              <Calendar className="w-4 h-4 text-[#1E7F4F]" />
              <span>Jadwal Sinkron: Pekan II November 2026</span>
            </div>
          </div>

          {/* Search Filters Toolbar */}
          <div className="bg-[#F6F8F7] p-4 rounded-xl border border-[#D9E2DD] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-4">
              <label className="text-[11px] font-semibold text-[#4B5B53] block mb-1">
                Desa / Kelurahan
              </label>
              <select
                value={selectedDesa}
                onChange={(e) => setSelectedDesa(e.target.value)}
                className="w-full h-11 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs font-medium text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
              >
                <option value="Semua">Semua 18 Desa/Kelurahan</option>
                {DAFTAR_DESA_KEPANJEN.map((desa) => (
                  <option key={desa} value={desa}>
                    Desa/Kel. {desa}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-6">
              <label className="text-[11px] font-semibold text-[#4B5B53] block mb-1">
                Pencarian Nama Posyandu / Dusun
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#8A9A92] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Misal: Posyandu Melati 03, Balai RW..."
                  className="w-full h-11 bg-white border border-[#D9E2DD] rounded-lg pl-9 pr-3 text-xs text-[#14211B] placeholder:text-[#8A9A92] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
                />
              </div>
            </div>

            <div className="sm:col-span-2 pt-5">
              <button
                type="button"
                onClick={() => {}}
                className="w-full h-11 bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Temukan</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Posyandu Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosyandu.slice(0, 9).map((pos) => (
              <div
                key={pos.id}
                className="bg-white rounded-xl border border-[#D9E2DD] p-4 hover:border-[#1E7F4F] transition-all hover:shadow-md flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#145A38]">
                      Desa {pos.desaKelurahan}
                    </span>
                    <span className="text-[11px] font-mono text-[#8A9A92]">
                      {pos.dusunRwRt}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#14211B] group-hover:text-[#1E7F4F] transition-colors">
                    {pos.nama}
                  </h3>
                  <p className="text-xs text-[#4B5B53] mt-1 line-clamp-1">
                    {pos.alamat}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD]/70 space-y-1.5 text-xs text-[#14211B]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#1E7F4F]" />
                    <span className="font-medium">{pos.hariJadwal}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#4B5B53]">
                    <Clock className="w-3.5 h-3.5 text-[#8A9A92]" />
                    <span>{pos.jamLayanan}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D9E2DD] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#4B5B53]">
                    Didampingi {pos.bidanPendamping}
                  </span>
                  <button
                    onClick={() => setSelectedPosyanduDetail(pos)}
                    className="text-[#1E7F4F] font-semibold hover:underline flex items-center gap-0.5 text-xs"
                  >
                    <span>Detail Balai</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-[#4B5B53]">
              Menampilkan {Math.min(9, filteredPosyandu.length)} dari total {filteredPosyandu.length} Posyandu di filter ini
            </span>
          </div>
        </div>
      </section>

      {/* Section: 5 Siklus Hidup Layanan Posyandu (ILP) */}
      <section id="5siklus" className="max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E7F4F] uppercase tracking-wider font-mono">
            • TRANSFORMASI INTEGRASI LAYANAN PRIMER (KEMENKES RI)
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#14211B]">
            Layanan Posyandu Kini Hadir untuk Seluruh Tahapan Hidup Keluarga
          </h2>
          <p className="text-xs md:text-sm text-[#4B5B53] leading-relaxed">
            Posyandu bukan lagi sekadar tempat penimbangan balita. Melalui kerangka ILP, seluruh anggota keluarga—mulai dari ibu hamil, bayi, remaja, usia produktif, hingga lansia—memiliki hak skrining kesehatan berkala.
          </p>
        </div>

        {/* 5 Siklus Cards with Exact Visual Identity Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Siklus 1: Ibu Hamil */}
          <div className="bg-white rounded-xl border border-[#D9E2DD] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F17079]/15 text-[#F17079]">
                  Siklus 1
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#14211B] leading-snug">
                Ibu Hamil, Bersalin & Menyusui
              </h3>
              <ul className="text-xs text-[#4B5B53] space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F17079] shrink-0 mt-0.5" />
                  <span>Pengukuran lingkar lengan atas (LiLA) & tensi</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F17079] shrink-0 mt-0.5" />
                  <span>Pemantauan gizi bumil KEK & suplemen TTD</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F17079] shrink-0 mt-0.5" />
                  <span>Konseling ASI eksklusif & paket PMT lokal</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#D9E2DD] text-[10px] font-semibold text-[#F17079]">
              Fokus: Pencegahan Stunting 1000 HPK
            </div>
          </div>

          {/* Siklus 2: Bayi & Balita */}
          <div className="bg-white rounded-xl border border-[#D9E2DD] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4C94B3]/15 text-[#4C94B3]">
                  Siklus 2
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#14211B] leading-snug">
                Bayi, Balita & Prasekolah
              </h3>
              <ul className="text-xs text-[#4B5B53] space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4C94B3] shrink-0 mt-0.5" />
                  <span>Antropometri digital (TB/PB & BB terstandar)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4C94B3] shrink-0 mt-0.5" />
                  <span>Imunisasi rutin lengkap & vitamin A</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4C94B3] shrink-0 mt-0.5" />
                  <span>Stimulasi deteksi dini tumbuh kembang (SDIDTK)</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#D9E2DD] text-[10px] font-semibold text-[#4C94B3]">
              Fokus: Gizi & Protein Hewani
            </div>
          </div>

          {/* Siklus 3: Usia Sekolah & Remaja */}
          <div className="bg-white rounded-xl border border-[#D9E2DD] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#15AB9D]/15 text-[#15AB9D]">
                  Siklus 3
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#14211B] leading-snug">
                Usia Sekolah & Remaja
              </h3>
              <ul className="text-xs text-[#4B5B53] space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15AB9D] shrink-0 mt-0.5" />
                  <span>Skrining anemia rematri (cek Hb & TTD gratis)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15AB9D] shrink-0 mt-0.5" />
                  <span>Pengukuran Indeks Massa Tubuh (IMT) remaja</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15AB9D] shrink-0 mt-0.5" />
                  <span>Konseling kespro, gizi & bahaya rokok</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#D9E2DD] text-[10px] font-semibold text-[#15AB9D]">
              Fokus: Generasi Muda Bebas Anemia
            </div>
          </div>

          {/* Siklus 4: Usia Dewasa / Produktif */}
          <div className="bg-white rounded-xl border border-[#D9E2DD] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F6D44B]/30 text-[#854d0e]">
                  Siklus 4
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#14211B] leading-snug">
                Usia Produktif (15 - 59 Thn)
              </h3>
              <ul className="text-xs text-[#4B5B53] space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span>Deteksi dini Penyakit Tidak Menular (PTM)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span>Pemeriksaan tensi & skrining lingkar perut</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span>Tes gula darah sewaktu & konseling gaya hidup</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#D9E2DD] text-[10px] font-semibold text-[#854d0e]">
              Fokus: Cegah Hipertensi & Diabetes
            </div>
          </div>

          {/* Siklus 5: Lansia */}
          <div className="bg-white rounded-xl border border-[#D9E2DD] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FBB03F]/25 text-[#9a3412]">
                  Siklus 5
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#14211B] leading-snug">
                Usia Lanjut (Geriatri ≥60)
              </h3>
              <ul className="text-xs text-[#4B5B53] space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                  <span>Pemeriksaan Activity of Daily Living (ADL)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                  <span>Skrining kemandirian & pencegahan risiko jatuh</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                  <span>Senam bugar lansia & pemantauan kognitif</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#D9E2DD] text-[10px] font-semibold text-[#9a3412]">
              Fokus: Lansia Mandiri & Sehat
            </div>
          </div>
        </div>
      </section>

      {/* Section: Materi Edukasi & Panduan Kesehatan Keluarga */}
      <section id="edukasi" className="bg-white border-y border-[#D9E2DD] py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#1E7F4F] uppercase tracking-wider font-mono">
                • PUSTAKA KESEHATAN WARGA
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#14211B] mt-1">
                Materi Edukasi & Panduan Kesehatan Keluarga
              </h2>
              <p className="text-xs md:text-sm text-[#4B5B53]">
                Unduh gratis materi resmi yang disusun oleh Tim Gizi & Promkes Puskesmas Kepanjen bersama Dinas Kesehatan Malang.
              </p>
            </div>
            <button
              onClick={() => alert('Seluruh dokumen panduan dapat diunduh langsung atau dibagikan ke warga.')}
              className="text-[#1E7F4F] font-semibold text-xs hover:underline flex items-center gap-1"
            >
              <span>Buka Semua Dokumen Edukasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-[#D9E2DD] bg-[#F6F8F7] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#1E7F4F] font-semibold uppercase">
                  PEDOMAN GIZI BALITA
                </span>
                <h4 className="font-bold text-sm text-[#14211B]">
                  Panduan MP-ASI Bergizi Kaya Protein Hewani Cegah Stunting
                </h4>
                <p className="text-xs text-[#4B5B53] line-clamp-3">
                  Resep lokal mudah dibuat (telur, lele, hati ayam) sesuai takaran kebutuhan gizi usia 6-24 bulan.
                </p>
              </div>
              <div className="pt-2 border-t border-[#D9E2DD] flex items-center justify-between text-xs text-[#4B5B53]">
                <span>PDF • 3.2 MB</span>
                <button
                  onClick={() => alert('Mengunduh Panduan MP-ASI Bergizi...')}
                  className="px-3 py-1 rounded bg-white border border-[#D9E2DD] text-[#145A38] font-semibold hover:bg-[#E6F4EC] transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Unduh</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D9E2DD] bg-[#F6F8F7] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#2B7BB9] font-semibold uppercase">
                  JADWAL IMUNISASI
                </span>
                <h4 className="font-bold text-sm text-[#14211B]">
                  Jadwal Imunisasi Lengkap Bayi & Anak Rekomendasi 2026
                </h4>
                <p className="text-xs text-[#4B5B53] line-clamp-3">
                  Tabel urutan vaksin wajib (BCG, Polio, DPT-HB-Hib, PCV, Rotavirus, Campak Rubella) siap disimpan di HP.
                </p>
              </div>
              <div className="pt-2 border-t border-[#D9E2DD] flex items-center justify-between text-xs text-[#4B5B53]">
                <span>JPG • 1.8 MB</span>
                <button
                  onClick={() => alert('Mengunduh Jadwal Imunisasi...')}
                  className="px-3 py-1 rounded bg-white border border-[#D9E2DD] text-[#145A38] font-semibold hover:bg-[#E6F4EC] transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D9E2DD] bg-[#F6F8F7] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#F17079] font-semibold uppercase">
                  KESEHATAN IBU
                </span>
                <h4 className="font-bold text-sm text-[#14211B]">
                  Tanda Bahaya Kehamilan & Prosedur Rujukan Desa Siaga
                </h4>
                <p className="text-xs text-[#4B5B53] line-clamp-3">
                  Panduan bagi suami dan keluarga mengenali tanda genting seperti pendarahan, kejang, dan bengkak mendadak.
                </p>
              </div>
              <div className="pt-2 border-t border-[#D9E2DD] flex items-center justify-between text-xs text-[#4B5B53]">
                <span>PDF • 2.1 MB</span>
                <button
                  onClick={() => alert('Mengunduh Panduan Rujukan Bumil...')}
                  className="px-3 py-1 rounded bg-white border border-[#D9E2DD] text-[#145A38] font-semibold hover:bg-[#E6F4EC] transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Unduh</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D9E2DD] bg-[#F6F8F7] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#d97706] font-semibold uppercase">
                  CEK MANDIRI USIA DEWASA
                </span>
                <h4 className="font-bold text-sm text-[#14211B]">
                  Lembar Skrining Mandiri Faktor Risiko Hipertensi & Diabetes
                </h4>
                <p className="text-xs text-[#4B5B53] line-clamp-3">
                  Kuesioner 10 pertanyaan praktis untuk mendeteksi risiko dini sebelum berkonsultasi di Posyandu Prima.
                </p>
              </div>
              <div className="pt-2 border-t border-[#D9E2DD] flex items-center justify-between text-xs text-[#4B5B53]">
                <span>PDF • 1.4 MB</span>
                <button
                  onClick={() => alert('Mengunduh Lembar Skrining...')}
                  className="px-3 py-1 rounded bg-white border border-[#D9E2DD] text-[#145A38] font-semibold hover:bg-[#E6F4EC] transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Unduh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Puskesmas Pembina & Posko Kontak */}
      <section id="kontak" className="max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-mono font-bold text-[#1E7F4F] uppercase">
            LAYANAN RUJUKAN & KONSULTASI
          </span>
          <h2 className="text-2xl font-bold text-[#14211B]">
            Puskesmas Pembina & Posko Informasi Kepanjen
          </h2>
          <p className="text-xs text-[#4B5B53]">
            Butuh konfirmasi rujukan, informasi imunisasi lanjutan, atau ingin mengajukan kunjungan rumah kader? Hubungi saluran resmi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[#D9E2DD] bg-white space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#14211B]">Puskesmas Kepanjen</h4>
                <p className="text-[11px] text-[#4B5B53]">Fasilitas Pelayanan Kesehatan Tingkat Pertama (FKTP)</p>
              </div>
            </div>
            <p className="text-xs text-[#4B5B53] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#8A9A92] shrink-0 mt-0.5" />
              <span>Jl. Raya Kepanjen No. 18, Kepanjen, Kabupaten Malang, Jawa Timur 65163</span>
            </p>
            <p className="text-xs text-[#4B5B53] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8A9A92] shrink-0" />
              <span>(0341) 395 119 / (0341) 395 120</span>
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#D9E2DD] bg-white space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#14211B]">Layanan WhatsApp Publik</h4>
                <p className="text-[11px] text-[#4B5B53]">Konsultasi jadwal posyandu & panduan kesehatan</p>
              </div>
            </div>
            <div className="p-3 bg-[#F6F8F7] rounded-lg border border-[#D9E2DD] text-xs space-y-1">
              <div className="font-bold text-emerald-800 text-sm">0888-9924-444</div>
              <div className="text-[11px] text-[#4B5B53]">Senin - Sabtu: 08.00 - 15.00 WIB</div>
            </div>
            <button
              onClick={() => window.open('https://wa.me/628889924444', '_blank')}
              className="w-full py-2 rounded-lg bg-[#E6F4EC] text-[#145A38] font-semibold text-xs hover:bg-[#d5ecde] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Kirim Pesan WhatsApp</span>
            </button>
          </div>

          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-rose-900">Saluran Kegawatdaruratan</h4>
                <p className="text-[11px] text-rose-700">Ambulans desa & penanganan persalinan darurat 24 Jam</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs space-y-1">
              <div className="text-[10px] font-mono text-rose-600 uppercase font-semibold">
                CALL CENTER SIAGA 24 JAM
              </div>
              <div className="font-extrabold text-rose-700 text-base">
                119 / 0811-360-119
              </div>
              <div className="text-[11px] text-slate-500">Siaga Unit Ambulans PSC 119 Kab. Malang</div>
            </div>
            <button
              onClick={() => alert('Menghubungi Hotline Darurat PSC 119 Kab. Malang...')}
              className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Panggil Ambulans Darurat (119)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Banner Callout: Akses Khusus Kader & Petugas */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-12 w-full">
        <div className="rounded-2xl p-6 sm:p-8 bg-[#145A38] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 uppercase text-emerald-200">
              Akses Khusus Kader & Tenaga Kesehatan
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Apakah Anda Kader Posyandu atau Petugas Puskesmas?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Masuk ke Portal Operasional SI-KAWAN POSYANDU untuk memulai pelayanan Posyandu, melakukan pencatatan skrining pada 5 siklus hidup, mengisi logbook kunjungan rumah, serta melakukan sinkronisasi laporan bulanan secara terintegrasi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white text-[#145A38] font-bold text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Masuk ke Akun KAWAN POSYANDU</span>
            </button>
            <button
              onClick={() => alert('Untuk bantuan lupa kata sandi atau kendala penugasan wilayah, hubungi Admin Operasional Puskesmas Kepanjen melalui nomor WhatsApp pembina.')}
              className="w-full sm:w-auto px-4 py-3 rounded-lg bg-[#1E7F4F] text-white font-semibold text-sm hover:bg-[#196b42] transition-colors text-center"
            >
              Bantuan Akun / Lupa Sandi
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D9E2DD] py-8 px-4 lg:px-8 text-xs text-[#4B5B53]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1E7F4F] text-white flex items-center justify-center text-[10px] font-bold">
              KP
            </div>
            <span>© 2026 SI-KAWAN POSYANDU Kecamatan Kepanjen, Kabupaten Malang. Hak Cipta Dilindungi.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hover:underline cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Syarat Layanan</span>
            <span>•</span>
            <span onClick={onOpenLogin} className="text-[#1E7F4F] font-bold hover:underline cursor-pointer">
              Akses SI-KADER
            </span>
          </div>
        </div>
      </footer>

      {/* Detail Posyandu Modal */}
      {selectedPosyanduDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#D9E2DD] relative">
            <button
              onClick={() => setSelectedPosyanduDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-mono"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E6F4EC] text-[#145A38]">
                {selectedPosyanduDetail.kode}
              </span>
              <span className="text-xs text-[#4B5B53] font-medium">
                Desa {selectedPosyanduDetail.desaKelurahan}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#14211B]">
              {selectedPosyanduDetail.nama}
            </h3>

            <div className="p-3.5 bg-[#F6F8F7] rounded-xl border border-[#D9E2DD] space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span>{selectedPosyanduDetail.alamat}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1E7F4F] shrink-0" />
                <span>Jadwal Buka: <strong>{selectedPosyanduDetail.hariJadwal}</strong> ({selectedPosyanduDetail.jamLayanan})</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#1E7F4F] shrink-0" />
                <span>Bidan Desa: <strong>{selectedPosyanduDetail.bidanPendamping}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1E7F4F] shrink-0" />
                <span>Kader Aktif: <strong>{selectedPosyanduDetail.jumlahKader} orang</strong> • Sasaran: <strong>{selectedPosyanduDetail.jumlahSasaranKK} KK</strong></span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-[#4B5B53] block mb-2">
                Siklus Layanan yang Dilayani di Balai Ini:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#F17079]/15 text-[#F17079] text-[11px] font-semibold">
                  Ibu Hamil & Menyusui
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#4C94B3]/15 text-[#4C94B3] text-[11px] font-semibold">
                  Bayi, Balita & Apras
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#15AB9D]/15 text-[#15AB9D] text-[11px] font-semibold">
                  Remaja
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F6D44B]/30 text-[#854d0e] text-[11px] font-semibold">
                  Usia Produktif
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FBB03F]/25 text-[#9a3412] text-[11px] font-semibold">
                  Lansia
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPosyanduDetail(null)}
              className="w-full py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white text-xs font-semibold transition-colors mt-2"
            >
              Tutup Informasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
