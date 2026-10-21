import React, { useState } from 'react';
import { 
  Home, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { CatatanKunjunganRumah, UserProfile } from '../../types/posyandu';

interface KunjunganRumahViewProps {
  currentUser: UserProfile;
  kunjunganList: CatatanKunjunganRumah[];
  onAddKunjungan: (kunjungan: CatatanKunjunganRumah) => void;
}

export const KunjunganRumahView: React.FC<KunjunganRumahViewProps> = ({
  currentUser,
  kunjunganList,
  onAddKunjungan,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [namaKK, setNamaKK] = useState('');
  const [noKK, setNoKK] = useState('');
  const [alamat, setAlamat] = useState('RT 03 / RW 04, Dusun Krajan');
  const [jenisKunjungan, setJenisKunjungan] = useState<'RUTIN_TAHUNAN' | 'KHUSUS' | 'TINDAK_LANJUT'>('RUTIN_TAHUNAN');
  const [temuan, setTemuan] = useState('Semua anggota keluarga sehat, sanitasi jamban sehat memenuhi syarat.');
  const [tindakLanjut, setTindakLanjut] = useState('Ingatkan jadwal Posyandu pekan depan.');

  const filtered = kunjunganList.filter((k) => 
    k.namaKepalaKeluarga.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.noKK.includes(searchQuery) ||
    k.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKK.trim() || !noKK.trim()) {
      alert('Mohon isi Nama Kepala Keluarga dan No. KK.');
      return;
    }

    const newKunjungan: CatatanKunjunganRumah = {
      id: `kunj-${Date.now()}`,
      tanggal: new Date().toISOString().split('T')[0],
      posyanduId: currentUser.posyanduId || 'KPN - 001',
      posyanduNama: currentUser.posyanduName || 'Posyandu Melati 01',
      noKK,
      namaKepalaKeluarga: namaKK,
      alamat,
      desaKelurahan: currentUser.desaKelurahan,
      kaderNama: currentUser.name,
      jenisKunjungan,
      anggotaDikunjungi: [
        {
          wargaId: `warga-${Date.now()}`,
          nama: namaKK,
          siklus: 'DEWASA',
          kondisi: 'Sehat',
          edukasi: 'Edukasi PHBS',
          rujukan: false,
        },
      ],
      temuanKesehatan: temuan,
      tindakLanjut,
      status: 'SELESAI',
      createdAt: new Date().toISOString(),
    };

    onAddKunjungan(newKunjungan);
    setIsModalOpen(false);
    setNamaKK('');
    setNoKK('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#14211B]">
            Pencatatan Logbook Kunjungan Rumah Kader
          </h2>
          <p className="text-xs text-[#4B5B53]">
            Kunjungan rumah berkala ke seluruh keluarga (KK) di wilayah kerja Posyandu.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Kunjungan Baru</span>
        </button>
      </div>

      {/* PRD Rule F-10 Explanation Card */}
      <div className="p-4 rounded-xl bg-[#E6F4EC] border border-[#1E7F4F]/30 flex items-start gap-3 text-xs text-[#145A38]">
        <ShieldCheck className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold">Ketentuan Capaian Kunjungan Rumah (SOP Bebas Double-Count)</div>
          <p className="text-[11px] text-[#4B5B53]">
            Sesuai PRD F-10: Kunjungan Rutin dihitung maksimal 1x per KK per tahun untuk capaian agregat rutin. Kunjungan khusus (sweeping balita sakit, pendampingan TBC, pemantauan bumil KEK) dan kunjungan tindak lanjut tetap tersimpan di riwayat keluarga tanpa menduplikasi capaian rutin tahunan.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#D9E2DD] shadow-xs">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-[#8A9A92] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Kepala Keluarga / No. KK..."
            className="w-full bg-[#F6F8F7] border border-[#D9E2DD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
          />
        </div>
      </div>

      {/* Kunjungan List Table */}
      <div className="bg-white rounded-2xl border border-[#D9E2DD] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F6F8F7] border-b border-[#D9E2DD] text-[#4B5B53] font-mono text-[11px] uppercase">
            <tr>
              <th className="p-3.5">Tanggal</th>
              <th className="p-3.5">Kepala Keluarga / No. KK</th>
              <th className="p-3.5">Alamat / RT RW</th>
              <th className="p-3.5">Jenis Kunjungan</th>
              <th className="p-3.5">Temuan & Tindak Lanjut</th>
              <th className="p-3.5">Kader Pencatat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9E2DD]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#F6F8F7] transition-colors">
                <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">
                  {item.tanggal}
                </td>
                <td className="p-3.5">
                  <div className="font-bold text-[#14211B]">{item.namaKepalaKeluarga}</div>
                  <div className="text-[10px] text-[#4B5B53] font-mono">KK: {item.noKK}</div>
                </td>
                <td className="p-3.5 text-xs text-[#4B5B53]">
                  {item.alamat}
                </td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.jenisKunjungan === 'RUTIN_TAHUNAN'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.jenisKunjungan === 'KHUSUS'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.jenisKunjungan === 'RUTIN_TAHUNAN'
                      ? 'Rutin Tahunan'
                      : item.jenisKunjungan === 'KHUSUS'
                      ? 'Khusus'
                      : 'Tindak Lanjut'}
                  </span>
                </td>
                <td className="p-3.5 max-w-xs">
                  <div className="font-medium text-[#14211B] truncate">{item.temuanKesehatan}</div>
                  <div className="text-[10px] text-[#4B5B53] truncate">{item.tindakLanjut}</div>
                </td>
                <td className="p-3.5 text-xs text-[#4B5B53]">
                  {item.kaderNama}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Form Kunjungan Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#D9E2DD] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-mono"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#1E7F4F] uppercase">
                LOGBOOK KUNJUNGAN RUMAH KADER
              </span>
              <h3 className="text-lg font-bold text-[#14211B]">
                Catat Kunjungan Keluarga Baru
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Nama Kepala Keluarga *
                </label>
                <input
                  type="text"
                  required
                  value={namaKK}
                  onChange={(e) => setNamaKK(e.target.value)}
                  placeholder="Contoh: Bpk. Sugeng Wibowo"
                  className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Nomor Kartu Keluarga (KK) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={noKK}
                  onChange={(e) => setNoKK(e.target.value)}
                  placeholder="16 digit No. KK..."
                  className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Alamat / RT RW
                </label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Jenis Kunjungan
                </label>
                <select
                  value={jenisKunjungan}
                  onChange={(e) => setJenisKunjungan(e.target.value as any)}
                  className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B]"
                >
                  <option value="RUTIN_TAHUNAN">Rutin Tahunan (Menambah Capaian Tahunan)</option>
                  <option value="KHUSUS">Khusus (Sweeping balita/bumil sakit)</option>
                  <option value="TINDAK_LANJUT">Tindak Lanjut / Pendampingan Rujukan</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Temuan Kesehatan Keluarga
                </label>
                <textarea
                  rows={2}
                  value={temuan}
                  onChange={(e) => setTemuan(e.target.value)}
                  className="w-full bg-white border border-[#D9E2DD] rounded-lg p-2.5 text-xs text-[#14211B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Rencana Tindak Lanjut
                </label>
                <input
                  type="text"
                  value={tindakLanjut}
                  onChange={(e) => setTindakLanjut(e.target.value)}
                  className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#D9E2DD] text-xs font-semibold text-[#4B5B53]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white text-xs font-bold"
                >
                  Simpan Kunjungan Rumah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
