import React from 'react';
import { 
  Users, 
  ClipboardCheck, 
  Home, 
  AlertCircle, 
  FileCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Baby, 
  Sparkles, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { UserProfile, CatatanPelayanan, CatatanKunjunganRumah, LaporanBulanan } from '../../types/posyandu';

interface DashboardViewProps {
  currentUser: UserProfile;
  pelayananList: CatatanPelayanan[];
  kunjunganList: CatatanKunjunganRumah[];
  laporanList: LaporanBulanan[];
  onNavigate: (tab: 'pelayanan' | 'kunjungan' | 'laporan' | 'master' | 'materi' | 'audit') => void;
  onOpenNewPelayanan: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  pelayananList,
  kunjunganList,
  laporanList,
  onNavigate,
  onOpenNewPelayanan,
}) => {
  const totalPelayanan = pelayananList.length;
  const totalKunjungan = kunjunganList.length;
  const laporanMenunggu = laporanList.filter((l) => l.status === 'MENUNGGU_PEMERIKSAAN').length;
  const kasusRujukan = pelayananList.filter((p) => p.perluRujukan).length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner based on Role */}
      <div className="bg-white rounded-2xl p-6 border border-[#D9E2DD] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E7F4F]" />
            <span className="text-[11px] font-mono font-bold text-[#145A38] uppercase">
              SI-KAWAN POSYANDU • KECAMATAN KEPANJEN
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#14211B]">
            Selamat Bertugas, {currentUser.name}
          </h1>
          <p className="text-xs text-[#4B5B53]">
            Peran: <strong>{currentUser.roleTitle}</strong> • Wilayah: <strong>Desa {currentUser.desaKelurahan}</strong>
            {currentUser.posyanduName ? ` • ${currentUser.posyanduName}` : ''}
          </p>
        </div>

        {/* Quick Action Button for Kader/Petugas */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewPelayanan}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold text-xs transition-all shadow-md shadow-[#1E7F4F]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Pelayanan Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#4B5B53] uppercase font-mono">
              SASARAN TERLAYANI
            </div>
            <div className="text-2xl font-extrabold text-[#14211B] mt-1 tabular-nums">
              {totalPelayanan + 45}
            </div>
            <div className="text-[11px] text-[#1E7F4F] flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Bulan Oktober 2026</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E6F4EC] text-[#1E7F4F] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#4B5B53] uppercase font-mono">
              KUNJUNGAN RUMAH
            </div>
            <div className="text-2xl font-extrabold text-[#14211B] mt-1 tabular-nums">
              {totalKunjungan + 13} KK
            </div>
            <div className="text-[11px] text-[#2B7BB9] flex items-center gap-1 mt-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bebas Double-Count</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2B7BB9] flex items-center justify-center">
            <Home className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#4B5B53] uppercase font-mono">
              ANTREAN PERIKSA
            </div>
            <div className="text-2xl font-extrabold text-[#854d0e] mt-1 tabular-nums">
              {laporanMenunggu} Laporan
            </div>
            <button
              onClick={() => onNavigate('laporan')}
              className="text-[11px] text-[#854d0e] hover:underline flex items-center gap-1 mt-1 font-medium"
            >
              <span>Verifikasi Berjenjang →</span>
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D9E2DD] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#4B5B53] uppercase font-mono">
              KASUS RUJUKAN
            </div>
            <div className="text-2xl font-extrabold text-rose-700 mt-1 tabular-nums">
              {kasusRujukan} Sasaran
            </div>
            <div className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Perlu Pemantauan FKTP</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 5 Siklus Hidup Capaian Progress Overview */}
      <div className="bg-white rounded-2xl p-6 border border-[#D9E2DD] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#14211B]">
              Distribusi Pelayanan 5 Kelompok Siklus Hidup (ILP Kemenkes)
            </h3>
            <p className="text-xs text-[#4B5B53]">
              Capaian riil berdasarkan pencatatan hasil skrining kesehatan dan antropometri.
            </p>
          </div>
          <button
            onClick={() => onNavigate('pelayanan')}
            className="text-xs text-[#1E7F4F] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Buka Detail Pelayanan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {/* Siklus 1 */}
          <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F17079]/15 text-[#F17079]">
                Siklus 1
              </span>
              <span className="text-xs font-bold text-[#14211B] tabular-nums">8 Bumil</span>
            </div>
            <div className="text-xs font-semibold text-[#14211B] truncate">Ibu Hamil & Nifas</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#F17079] h-full rounded-full" style={{ width: '80%' }} />
            </div>
            <div className="text-[10px] text-[#4B5B53]">Target: 10 bumil (80%)</div>
          </div>

          {/* Siklus 2 */}
          <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#4C94B3]/15 text-[#4C94B3]">
                Siklus 2
              </span>
              <span className="text-xs font-bold text-[#14211B] tabular-nums">24 Balita</span>
            </div>
            <div className="text-xs font-semibold text-[#14211B] truncate">Bayi & Balita</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#4C94B3] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <div className="text-[10px] text-[#4B5B53]">Target: 26 balita (92%)</div>
          </div>

          {/* Siklus 3 */}
          <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#15AB9D]/15 text-[#15AB9D]">
                Siklus 3
              </span>
              <span className="text-xs font-bold text-[#14211B] tabular-nums">6 Remaja</span>
            </div>
            <div className="text-xs font-semibold text-[#14211B] truncate">Remaja Sekolah</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#15AB9D] h-full rounded-full" style={{ width: '60%' }} />
            </div>
            <div className="text-[10px] text-[#4B5B53]">Target: 10 remaja (60%)</div>
          </div>

          {/* Siklus 4 */}
          <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F6D44B]/30 text-[#854d0e]">
                Siklus 4
              </span>
              <span className="text-xs font-bold text-[#14211B] tabular-nums">7 Dewasa</span>
            </div>
            <div className="text-xs font-semibold text-[#14211B] truncate">Usia Produktif</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#d97706] h-full rounded-full" style={{ width: '70%' }} />
            </div>
            <div className="text-[10px] text-[#4B5B53]">Target: 10 dewasa (70%)</div>
          </div>

          {/* Siklus 5 */}
          <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FBB03F]/25 text-[#9a3412]">
                Siklus 5
              </span>
              <span className="text-xs font-bold text-[#14211B] tabular-nums">3 Lansia</span>
            </div>
            <div className="text-xs font-semibold text-[#14211B] truncate">Usia Lanjut</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#ea580c] h-full rounded-full" style={{ width: '60%' }} />
            </div>
            <div className="text-[10px] text-[#4B5B53]">Target: 5 lansia (60%)</div>
          </div>
        </div>
      </div>

      {/* Grid: Antrean Tugas & Riwayat Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Antrean Tugas & Tindak Lanjut Mendesak */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9E2DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm text-[#14211B]">
                Tugas & Tindak Lanjut Mendesak
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">
              2 Perhatian
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <div className="space-y-0.5 text-xs">
                <div className="font-semibold text-[#14211B]">
                  Rujukan Tensi Pre-Hipertensi (Bpk. Joko Prasetyo)
                </div>
                <p className="text-[11px] text-[#4B5B53]">
                  Hasil tensi 142/90 mmHg pada tanggal 14 Oktober. Segera konfirmasi pendampingan rujukan ke Pustu Sengguruh.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <div className="space-y-0.5 text-xs">
                <div className="font-semibold text-[#14211B]">
                  Pemeriksaan Administratif Laporan Oktober (Posyandu Melati 01)
                </div>
                <p className="text-[11px] text-[#4B5B53]">
                  Status: Menunggu Pemeriksaan oleh Koordinator Kader Desa Sengguruh.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan Catatan Pelayanan Terakhir */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9E2DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-[#1E7F4F]" />
              <h3 className="font-bold text-sm text-[#14211B]">
                Catatan Pelayanan Terkini
              </h3>
            </div>
            <button
              onClick={() => onNavigate('pelayanan')}
              className="text-xs text-[#1E7F4F] font-semibold hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-2.5">
            {pelayananList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-[#D9E2DD] bg-[#F6F8F7] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#14211B]">{item.wargaNama}</div>
                  <div className="text-[10px] text-[#4B5B53] font-mono">
                    NIK: {item.nik} • {item.siklus}
                  </div>
                  <div className="text-[11px] text-[#145A38] font-medium mt-0.5">
                    {item.statusGizi}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EC] text-[#145A38]">
                    {item.status}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {item.tanggal}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
