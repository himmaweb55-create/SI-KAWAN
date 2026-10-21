import React, { useState } from 'react';
import { 
  FileCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Check, 
  X, 
  Clock, 
  MessageSquare,
  Lock,
  ArrowRight
} from 'lucide-react';
import { LaporanBulanan, UserProfile } from '../../types/posyandu';

interface LaporanBulananViewProps {
  currentUser: UserProfile;
  laporanList: LaporanBulanan[];
  onUpdateStatus: (
    laporanId: string, 
    newStatus: 'TERVERIFIKASI' | 'PERLU_PERBAIKAN', 
    catatan: string
  ) => void;
  onSubmitLaporan: (laporanId: string) => void;
}

export const LaporanBulananView: React.FC<LaporanBulananViewProps> = ({
  currentUser,
  laporanList,
  onUpdateStatus,
  onSubmitLaporan,
}) => {
  const [selectedLaporan, setSelectedLaporan] = useState<LaporanBulanan | null>(laporanList[0] || null);
  const [reviewCatatan, setReviewCatatan] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<'TERVERIFIKASI' | 'PERLU_PERBAIKAN'>('TERVERIFIKASI');

  // Can the current user review?
  const canReview = ['KOORDINATOR', 'PUSTU', 'PUSKESMAS', 'ADMIN', 'SUPERADMIN'].includes(currentUser.role);

  const handleOpenReview = (laporan: LaporanBulanan, decision: 'TERVERIFIKASI' | 'PERLU_PERBAIKAN') => {
    setSelectedLaporan(laporan);
    setReviewDecision(decision);
    setReviewCatatan(
      decision === 'TERVERIFIKASI'
        ? 'Data pelayanan dan kunjungan rumah telah diverifikasi lengkap dan valid.'
        : 'Perlu melengkapi catatan pemantauan balita gizi kurang sebelum disahkan.'
    );
    setShowReviewModal(true);
  };

  const handleConfirmReview = () => {
    if (!selectedLaporan) return;
    onUpdateStatus(selectedLaporan.id, reviewDecision, reviewCatatan);
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#14211B]">
          Rekapitulasi & Alur Pemeriksaan Laporan Bulanan
        </h2>
        <p className="text-xs text-[#4B5B53]">
          Otomatis terisi dari catatan pelayanan & kunjungan rumah. Verifikasi berjenjang dari Koordinator, Pustu hingga Puskesmas.
        </p>
      </div>

      {/* Grid: Laporan List & Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of Reports */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-[#4B5B53] uppercase font-mono">
            Daftar Berkas Laporan Posyandu
          </div>

          {laporanList.map((lap) => {
            const isSelected = selectedLaporan?.id === lap.id;
            return (
              <div
                key={lap.id}
                onClick={() => setSelectedLaporan(lap)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#1E7F4F] shadow-md ring-2 ring-[#1E7F4F]/20'
                    : 'bg-white border-[#D9E2DD] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-[#14211B]">{lap.posyanduNama}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lap.status === 'TERVERIFIKASI'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lap.status === 'MENUNGGU_PEMERIKSAAN'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {lap.status === 'TERVERIFIKASI'
                      ? 'Terverifikasi'
                      : lap.status === 'MENUNGGU_PEMERIKSAAN'
                      ? 'Menunggu Periksa'
                      : 'Perlu Perbaikan'}
                  </span>
                </div>

                <div className="text-xs text-[#4B5B53] space-y-1">
                  <div>Desa {lap.desaKelurahan} • Periode {lap.periodeBulan}</div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                    <span>{lap.jumlahSasaranTerlayani} Terlayani</span>
                    <span>•</span>
                    <span>{lap.totalKunjunganRumah} Kunjungan KK</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Inspection & Decision Card */}
        {selectedLaporan && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D9E2DD] p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#D9E2DD]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1E7F4F] uppercase">
                  LEMBAR VERIFIKASI RESMI
                </span>
                <h3 className="text-lg font-bold text-[#14211B]">
                  {selectedLaporan.posyanduNama} ({selectedLaporan.periodeBulan})
                </h3>
                <p className="text-xs text-[#4B5B53]">
                  Desa {selectedLaporan.desaKelurahan} • Wilayah Kerja Puskesmas Kepanjen
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">Status Laporan</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 inline-block mt-0.5">
                  {selectedLaporan.status}
                </span>
              </div>
            </div>

            {/* Breakdown Capaian 5 Siklus */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#14211B] uppercase font-mono">
                Rekap Sasaran Terlayani Per Siklus
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD]">
                  <div className="text-[10px] text-[#F17079] font-bold">1. Bumil</div>
                  <div className="font-bold text-sm mt-1">{selectedLaporan.capaianPerSiklus.ibuHamil}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD]">
                  <div className="text-[10px] text-[#4C94B3] font-bold">2. Balita</div>
                  <div className="font-bold text-sm mt-1">{selectedLaporan.capaianPerSiklus.bayiBalita}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD]">
                  <div className="text-[10px] text-[#15AB9D] font-bold">3. Remaja</div>
                  <div className="font-bold text-sm mt-1">{selectedLaporan.capaianPerSiklus.remaja}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD]">
                  <div className="text-[10px] text-[#854d0e] font-bold">4. Dewasa</div>
                  <div className="font-bold text-sm mt-1">{selectedLaporan.capaianPerSiklus.dewasa}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD]">
                  <div className="text-[10px] text-[#ea580c] font-bold">5. Lansia</div>
                  <div className="font-bold text-sm mt-1">{selectedLaporan.capaianPerSiklus.lansia}</div>
                </div>
              </div>
            </div>

            {/* Verification History / Decision Trail */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#14211B] uppercase font-mono">
                Riwayat Jejak Verifikasi & Catatan
              </span>
              <div className="space-y-2">
                {selectedLaporan.riwayatKeputusan.map((rk, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#145A38]">{rk.oleh} ({rk.role})</span>
                      <span className="font-mono text-slate-400">{rk.tanggal.split('T')[0]}</span>
                    </div>
                    <div className="font-medium text-[#14211B]">Tindakan: {rk.aksi}</div>
                    <p className="text-[11px] text-[#4B5B53] italic">"{rk.catatan}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for Reviewer (Koordinator / Pustu / Puskesmas) */}
            {canReview && selectedLaporan.status === 'MENUNGGU_PEMERIKSAAN' && (
              <div className="pt-4 border-t border-[#D9E2DD] flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => handleOpenReview(selectedLaporan, 'PERLU_PERBAIKAN')}
                  className="px-4 py-2.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Kembalikan untuk Perbaikan</span>
                </button>

                <button
                  onClick={() => handleOpenReview(selectedLaporan, 'TERVERIFIKASI')}
                  className="px-5 py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Setujui & Verifikasi Laporan</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedLaporan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#D9E2DD] relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-mono"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-[#14211B]">
              Konfirmasi Keputusan Pemeriksaan Laporan
            </h3>
            <p className="text-xs text-[#4B5B53]">
              Pemeriksa: <strong>{currentUser.name}</strong> ({currentUser.roleTitle})
            </p>

            <div>
              <label className="text-xs font-semibold text-[#14211B] block mb-1">
                Catatan Resmi Pemeriksa (Tercatat di Jejak Audit):
              </label>
              <textarea
                rows={3}
                value={reviewCatatan}
                onChange={(e) => setReviewCatatan(e.target.value)}
                className="w-full bg-[#F6F8F7] border border-[#D9E2DD] rounded-lg p-2.5 text-xs text-[#14211B]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 rounded-lg border border-[#D9E2DD] text-xs font-semibold text-[#4B5B53]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReview}
                className={`px-5 py-2 rounded-lg text-white font-bold text-xs shadow-md ${
                  reviewDecision === 'TERVERIFIKASI' ? 'bg-[#1E7F4F]' : 'bg-rose-600'
                }`}
              >
                Simpan Keputusan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
