import React from 'react';
import { ShieldCheck, Clock, User, FileText, CheckCircle2 } from 'lucide-react';
import { AuditLogItem } from '../../types/posyandu';

interface AuditLogViewProps {
  logs: AuditLogItem[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#14211B]">
          Jejak Audit & Log Integritas Sistem (PRD F-20)
        </h2>
        <p className="text-xs text-[#4B5B53]">
          Setiap entri pelayanan, pengiriman laporan, dan persetujuan diverifikasi dan tercatat dengan penanda waktu permanen.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#D9E2DD] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F6F8F7] border-b border-[#D9E2DD] text-[#4B5B53] font-mono text-[11px] uppercase">
            <tr>
              <th className="p-3.5">Waktu Pencatatan</th>
              <th className="p-3.5">Petugas / Pengguna</th>
              <th className="p-3.5">Peran</th>
              <th className="p-3.5">Aksi / Entitas</th>
              <th className="p-3.5">Keterangan Aktivitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9E2DD]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#F6F8F7] transition-colors">
                <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString('id-ID')}
                </td>
                <td className="p-3.5 font-semibold text-[#14211B]">
                  {log.userName}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E6F4EC] text-[#145A38]">
                    {log.userRole}
                  </span>
                </td>
                <td className="p-3.5 font-medium text-[#145A38]">
                  {log.action}
                </td>
                <td className="p-3.5 text-xs text-[#4B5B53]">
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
