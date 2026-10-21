import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  ArrowRight,
  Heart,
  Baby,
  Activity,
  FileText
} from 'lucide-react';
import { CatatanPelayanan, SiklusHidup, UserProfile } from '../../types/posyandu';

interface PelayananFormViewProps {
  currentUser: UserProfile;
  pelayananList: CatatanPelayanan[];
  onAddPelayanan: (catatan: CatatanPelayanan) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const PelayananFormView: React.FC<PelayananFormViewProps> = ({
  currentUser,
  pelayananList,
  onAddPelayanan,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [filterSiklus, setFilterSiklus] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemDetail, setSelectedItemDetail] = useState<CatatanPelayanan | null>(null);

  // Form State
  const [wargaNama, setWargaNama] = useState('');
  const [nik, setNik] = useState('');
  const [siklus, setSiklus] = useState<SiklusHidup>('BAYI_BALITA');
  const [bb, setBb] = useState<number | ''>(11.5);
  const [tb, setTb] = useState<number | ''>(85);
  const [lila, setLila] = useState<number | ''>(14.5);
  const [lp, setLp] = useState<number | ''>('');
  const [tensiSistol, setTensiSistol] = useState<number | ''>('');
  const [tensiDiastol, setTensiDiastol] = useState<number | ''>('');
  const [statusGizi, setStatusGizi] = useState('Gizi Baik (Normal)');
  const [edukasi, setEdukasi] = useState('Edukasi variasi MP-ASI kaya protein hewani telur dan ikan.');
  const [perluRujukan, setPerluRujukan] = useState(false);
  const [alasanRujukan, setAlasanRujukan] = useState('');

  const filtered = pelayananList.filter((item) => {
    const matchSiklus = filterSiklus === 'SEMUA' || item.siklus === filterSiklus;
    const matchSearch =
      searchQuery === '' ||
      item.wargaNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nik.includes(searchQuery);
    return matchSiklus && matchSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wargaNama.trim() || !nik.trim()) {
      alert('Mohon lengkapi Nama Sasaran dan NIK.');
      return;
    }

    const newRecord: CatatanPelayanan = {
      id: `pel-${Date.now()}`,
      tanggal: new Date().toISOString().split('T')[0],
      posyanduId: currentUser.posyanduId || 'KPN - 001',
      posyanduNama: currentUser.posyanduName || 'Posyandu Melati 01',
      wargaId: `warga-${Date.now()}`,
      wargaNama,
      nik,
      siklus,
      beratBadanKg: typeof bb === 'number' ? bb : undefined,
      tinggiBadanCm: typeof tb === 'number' ? tb : undefined,
      lilaCm: typeof lila === 'number' ? lila : undefined,
      lingkarPerutCm: typeof lp === 'number' ? lp : undefined,
      tekananDarahSistol: typeof tensiSistol === 'number' ? tensiSistol : undefined,
      tekananDarahDiastol: typeof tensiDiastol === 'number' ? tensiDiastol : undefined,
      statusGizi,
      edukasiKonseling: edukasi,
      tindakLanjut: perluRujukan ? `Rujukan ke ${alasanRujukan || 'Pustu/Puskesmas'}` : 'Kontrol rutin bulan depan',
      perluRujukan,
      alasanRujukan: perluRujukan ? alasanRujukan : undefined,
      faskesRujukan: perluRujukan ? 'Pustu / Ponkesdes Sengguruh' : undefined,
      kaderPencatat: currentUser.name,
      status: 'TERCATAT',
      createdAt: new Date().toISOString(),
    };

    onAddPelayanan(newRecord);
    setIsModalOpen(false);
    // Reset
    setWargaNama('');
    setNik('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#14211B]">
            Pencatatan Hasil Pelayanan 5 Siklus Posyandu
          </h2>
          <p className="text-xs text-[#4B5B53]">
            Satu sumber data antropometri & skrining kesehatan primer (ILP Kemenkes RI).
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Pelayanan Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#D9E2DD] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8A9A92] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari NIK / Nama Sasaran..."
            className="w-full bg-[#F6F8F7] border border-[#D9E2DD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
          />
        </div>

        {/* Siklus Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'SEMUA', label: 'Semua' },
            { id: 'IBU_HAMIL', label: 'Bumil' },
            { id: 'BAYI_BALITA', label: 'Balita' },
            { id: 'REMAJA', label: 'Remaja' },
            { id: 'DEWASA', label: 'Dewasa' },
            { id: 'LANSIA', label: 'Lansia' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterSiklus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterSiklus === tab.id
                  ? 'bg-[#1E7F4F] text-white'
                  : 'bg-[#F6F8F7] text-[#4B5B53] hover:bg-[#E6F4EC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-[#D9E2DD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F7] border-b border-[#D9E2DD] text-[#4B5B53] font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Nama Sasaran / NIK</th>
                <th className="p-3.5">Kelompok Siklus</th>
                <th className="p-3.5">Hasil Pengukuran</th>
                <th className="p-3.5">Status Gizi & Tensi</th>
                <th className="p-3.5">Rujukan</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E2DD]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F6F8F7] transition-colors">
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">
                    {item.tanggal}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#14211B]">{item.wargaNama}</div>
                    <div className="text-[10px] text-[#4B5B53] font-mono">NIK: {item.nik}</div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.siklus === 'IBU_HAMIL'
                          ? 'bg-[#F17079]/15 text-[#F17079]'
                          : item.siklus === 'BAYI_BALITA'
                          ? 'bg-[#4C94B3]/15 text-[#4C94B3]'
                          : item.siklus === 'REMAJA'
                          ? 'bg-[#15AB9D]/15 text-[#15AB9D]'
                          : item.siklus === 'DEWASA'
                          ? 'bg-[#F6D44B]/30 text-[#854d0e]'
                          : 'bg-[#FBB03F]/25 text-[#9a3412]'
                      }`}
                    >
                      {item.siklus}
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-[#14211B]">
                    {item.beratBadanKg ? `BB: ${item.beratBadanKg} kg` : ''}
                    {item.tinggiBadanCm ? ` • TB: ${item.tinggiBadanCm} cm` : ''}
                    {item.tekananDarahSistol ? ` • TD: ${item.tekananDarahSistol}/${item.tekananDarahDiastol}` : ''}
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-[#145A38]">{item.statusGizi}</span>
                  </td>
                  <td className="p-3.5">
                    {item.perluRujukan ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                        Rujukan FKTP
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#8A9A92]">Tidak</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedItemDetail(item)}
                      className="px-2.5 py-1 rounded bg-[#E6F4EC] text-[#145A38] font-semibold text-xs hover:bg-[#d4ecdd] transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Form Catat Pelayanan Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-[#D9E2DD] relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-sm font-mono"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#1E7F4F] uppercase">
                FORMULIR PELAYANAN POSYANDU TERPADU
              </span>
              <h3 className="text-xl font-bold text-[#14211B]">
                Catat Pelayanan & Skrining Biometrik
              </h3>
              <p className="text-xs text-[#4B5B53]">
                Posyandu: {currentUser.posyanduName || 'Posyandu Melati 01'} • Petugas: {currentUser.name}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-[#14211B] block mb-1">
                    Nama Sasaran Warga *
                  </label>
                  <input
                    type="text"
                    required
                    value={wargaNama}
                    onChange={(e) => setWargaNama(e.target.value)}
                    placeholder="Nama lengkap..."
                    className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#14211B] block mb-1">
                    NIK (Nomor Induk Kependudukan) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="16 digit NIK..."
                    className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Kelompok Siklus Hidup (ILP Kemenkes)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'IBU_HAMIL', label: '1. Bumil' },
                    { id: 'BAYI_BALITA', label: '2. Balita' },
                    { id: 'REMAJA', label: '3. Remaja' },
                    { id: 'DEWASA', label: '4. Dewasa' },
                    { id: 'LANSIA', label: '5. Lansia' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSiklus(s.id as SiklusHidup)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                        siklus === s.id
                          ? 'bg-[#1E7F4F] text-white border-[#1E7F4F]'
                          : 'bg-[#F6F8F7] text-[#4B5B53] border-[#D9E2DD] hover:bg-[#E6F4EC]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biometrics Input Section */}
              <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#D9E2DD] space-y-3">
                <div className="text-xs font-bold text-[#145A38] uppercase font-mono">
                  Pengukuran Antropometri & Tanda Vital
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-[#4B5B53] block mb-1">BB (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={bb}
                      onChange={(e) => setBb(parseFloat(e.target.value) || '')}
                      className="w-full h-9 bg-white border border-[#D9E2DD] rounded-md px-2 text-xs font-bold text-[#14211B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#4B5B53] block mb-1">TB / PB (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={tb}
                      onChange={(e) => setTb(parseFloat(e.target.value) || '')}
                      className="w-full h-9 bg-white border border-[#D9E2DD] rounded-md px-2 text-xs font-bold text-[#14211B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#4B5B53] block mb-1">LiLA (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={lila}
                      onChange={(e) => setLila(parseFloat(e.target.value) || '')}
                      placeholder="Untuk Bumil/Balita"
                      className="w-full h-9 bg-white border border-[#D9E2DD] rounded-md px-2 text-xs font-bold text-[#14211B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#4B5B53] block mb-1">Lingkar Perut</label>
                    <input
                      type="number"
                      value={lp}
                      onChange={(e) => setLp(parseFloat(e.target.value) || '')}
                      placeholder="Untuk Dewasa"
                      className="w-full h-9 bg-white border border-[#D9E2DD] rounded-md px-2 text-xs font-bold text-[#14211B]"
                    />
                  </div>
                </div>

                {/* Tensi for Adult/Elderly/Bumil */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#D9E2DD]">
                  <div>
                    <label className="text-[11px] text-[#4B5B53] block mb-1">Tensi Sistol (mmHg)</label>
                    <input
                      type="number"
                      value={tensiSistol}
                      onChange={(e) => setTensiSistol(parseInt(e.target.value) || '')}
                      placeholder="120"
                      className="w-full h-9 bg-white border border-[#D9E2DD] rounded-md px-2 text-xs text-[#14211B]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#4B5B53] block mb-1">Tensi Diastol (mmHg)</label>
                    <input
                      type="number"
                      value={tensiDiastol}
                      onChange={(e) => setTensiDiastol(parseInt(e.target.value) || '')}
                      placeholder="80"
                      className="w-full h-9 bg-white border border-[#D9E2DD] rounded-md px-2 text-xs text-[#14211B]"
                    />
                  </div>
                </div>
              </div>

              {/* Status Gizi & Edukasi */}
              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Status Gizi / Hasil Skrining
                </label>
                <select
                  value={statusGizi}
                  onChange={(e) => setStatusGizi(e.target.value)}
                  className="w-full h-10 bg-white border border-[#D9E2DD] rounded-lg px-3 text-xs text-[#14211B]"
                >
                  <option value="Gizi Baik (Normal)">Gizi Baik (Normal)</option>
                  <option value="Risiko KEK (LiLA < 23.5 cm)">Risiko KEK (LiLA &lt; 23.5 cm)</option>
                  <option value="Gizi Kurang (Wasting)">Gizi Kurang (Wasting)</option>
                  <option value="Pendek / Sangat Pendek (Stunting)">Pendek / Sangat Pendek (Stunting)</option>
                  <option value="Gizi Lebih / Obesitas">Gizi Lebih / Obesitas</option>
                  <option value="Tensi Normal">Tensi Normal</option>
                  <option value="Pre-Hipertensi">Pre-Hipertensi</option>
                  <option value="Hipertensi Derajat 1 / 2">Hipertensi Derajat 1 / 2</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#14211B] block mb-1">
                  Edukasi & Konseling yang Diberikan
                </label>
                <textarea
                  rows={2}
                  value={edukasi}
                  onChange={(e) => setEdukasi(e.target.value)}
                  className="w-full bg-white border border-[#D9E2DD] rounded-lg p-2.5 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
                />
              </div>

              {/* Rujukan Checkbox */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-900">
                  <input
                    type="checkbox"
                    checked={perluRujukan}
                    onChange={(e) => setPerluRujukan(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1E7F4F]"
                  />
                  <span>Perlu Tindak Lanjut Rujukan ke Tenaga Kesehatan / Puskesmas</span>
                </label>
                {perluRujukan && (
                  <input
                    type="text"
                    value={alasanRujukan}
                    onChange={(e) => setAlasanRujukan(e.target.value)}
                    placeholder="Alasan rujukan (contoh: Tensi tinggi menetap > 140/90, atau gizi kurang)..."
                    className="w-full h-9 bg-white border border-amber-300 rounded-md px-2.5 text-xs text-[#14211B]"
                  />
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#D9E2DD] text-xs font-semibold text-[#4B5B53] hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#1E7F4F] hover:bg-[#145A38] text-white text-xs font-bold shadow-md transition-colors"
                >
                  Simpan Catatan Pelayanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#D9E2DD] relative">
            <button
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-mono"
            >
              ✕
            </button>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E6F4EC] text-[#145A38]">
              {selectedItemDetail.siklus}
            </span>
            <h3 className="text-lg font-bold text-[#14211B]">
              {selectedItemDetail.wargaNama}
            </h3>
            <div className="p-3 bg-[#F6F8F7] rounded-xl border border-[#D9E2DD] space-y-1.5 text-xs">
              <div>NIK: <strong>{selectedItemDetail.nik}</strong></div>
              <div>Tanggal: <strong>{selectedItemDetail.tanggal}</strong></div>
              <div>Posyandu: <strong>{selectedItemDetail.posyanduNama}</strong></div>
              <div>Status: <strong>{selectedItemDetail.statusGizi}</strong></div>
              <div>Edukasi: <em>"{selectedItemDetail.edukasiKonseling}"</em></div>
              <div>Tindak Lanjut: <strong>{selectedItemDetail.tindakLanjut}</strong></div>
              <div>Kader Pencatat: <strong>{selectedItemDetail.kaderPencatat}</strong></div>
            </div>
            <button
              onClick={() => setSelectedItemDetail(null)}
              className="w-full py-2 bg-[#1E7F4F] text-white font-semibold text-xs rounded-lg hover:bg-[#145A38]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
