import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Download, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  FileSpreadsheet
} from 'lucide-react';
import { MasterPosyandu } from '../../types/posyandu';
import { DAFTAR_DESA_KEPANJEN } from '../../data/masterPosyandu';

interface MasterPosyanduViewProps {
  posyanduList: MasterPosyandu[];
}

export const MasterPosyanduView: React.FC<MasterPosyanduViewProps> = ({
  posyanduList,
}) => {
  const [selectedDesa, setSelectedDesa] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posyanduList.filter((p) => {
    const matchDesa = selectedDesa === 'Semua' || p.desaKelurahan === selectedDesa;
    const matchSearch =
      searchQuery === '' ||
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDesa && matchSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Kode Posyandu', 'Nama Posyandu', 'Desa/Kelurahan', 'RW/RT', 'Alamat', 'Jumlah Kader', 'Sasaran KK', 'Bidan Pendamping', 'Jadwal Buka'];
    const rows = filtered.map((p) => [
      `"${p.kode}"`,
      `"${p.nama}"`,
      `"${p.desaKelurahan}"`,
      `"${p.dusunRwRt}"`,
      `"${p.alamat}"`,
      p.jumlahKader,
      p.jumlahSasaranKK,
      `"${p.bidanPendamping}"`,
      `"${p.hariJadwal} ${p.jamLayanan}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Master_108_Posyandu_Kepanjen_${selectedDesa}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#14211B]">
            Direktori Master 108 Posyandu Se-Kecamatan Kepanjen
          </h2>
          <p className="text-xs text-[#4B5B53]">
            Format ID unik baku KPN-001 s/d KPN-108 tersebar di 18 desa/kelurahan binaan Puskesmas Kepanjen.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#D9E2DD] hover:bg-[#E6F4EC] text-[#145A38] font-semibold text-xs shadow-xs transition-all self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#1E7F4F]" />
          <span>Ekspor Data (.CSV)</span>
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
            placeholder="Cari Kode ID / Nama Posyandu..."
            className="w-full bg-[#F6F8F7] border border-[#D9E2DD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={selectedDesa}
            onChange={(e) => setSelectedDesa(e.target.value)}
            className="w-full h-10 bg-[#F6F8F7] border border-[#D9E2DD] rounded-lg px-3 text-xs font-medium text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
          >
            <option value="Semua">Semua 18 Desa/Kelurahan</option>
            {DAFTAR_DESA_KEPANJEN.map((d) => (
              <option key={d} value={d}>Desa/Kel. {d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Master Posyandu Table */}
      <div className="bg-white rounded-2xl border border-[#D9E2DD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F7] border-b border-[#D9E2DD] text-[#4B5B53] font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3.5">ID Posyandu</th>
                <th className="p-3.5">Nama Posyandu</th>
                <th className="p-3.5">Desa / Kelurahan</th>
                <th className="p-3.5">RW / Dusun</th>
                <th className="p-3.5">Bidan Pendamping</th>
                <th className="p-3.5">Kader / Sasaran</th>
                <th className="p-3.5">Jadwal Hari Buka</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E2DD]">
              {filtered.map((pos) => (
                <tr key={pos.id} className="hover:bg-[#F6F8F7] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#145A38]">
                    {pos.kode}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#14211B]">{pos.nama}</div>
                    <div className="text-[10px] text-[#4B5B53] truncate max-w-xs">{pos.alamat}</div>
                  </td>
                  <td className="p-3.5 font-medium text-[#14211B]">
                    {pos.desaKelurahan}
                  </td>
                  <td className="p-3.5 text-[#4B5B53] font-mono">
                    {pos.dusunRwRt}
                  </td>
                  <td className="p-3.5 text-xs text-[#14211B]">
                    {pos.bidanPendamping}
                  </td>
                  <td className="p-3.5 font-mono text-slate-500">
                    {pos.jumlahKader} Kader • {pos.jumlahSasaranKK} KK
                  </td>
                  <td className="p-3.5 text-xs text-[#145A38]">
                    {pos.hariJadwal}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EC] text-[#145A38]">
                      {pos.statusOperasional}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
