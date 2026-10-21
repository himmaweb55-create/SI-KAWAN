import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Key, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types/posyandu';
import { SAMPLE_USERS } from '../../data/masterPosyandu';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('kader_sengguruh');
  const [password, setPassword] = useState('********');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!username.trim()) {
      setErrorMsg('Silakan masukkan ID Pengguna yang terdaftar.');
      return;
    }

    // Default to kader or match role
    const matchedUser = SAMPLE_USERS.find(
      (u) => u.name.toLowerCase().includes(username.toLowerCase()) || u.role.toLowerCase() === username.toLowerCase()
    ) || SAMPLE_USERS[0];

    onLoginSuccess(matchedUser);
  };

  const handleQuickSelectRole = (user: UserProfile) => {
    onLoginSuccess(user);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-[#D9E2DD] relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-sm font-mono"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E7F4F]" />
            <span className="text-[11px] font-mono font-bold text-[#145A38] uppercase">
              PORTAL OPERASIONAL SI-KAWAN POSYANDU
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#14211B]">
            Masuk Akun Petugas & Kader
          </h2>
          <p className="text-xs text-[#4B5B53]">
            Akses dibatasi berbasis peran operasional (RBAC) dan wilayah penugasan di Kecamatan Kepanjen.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Manual Credentials Form */}
        <form onSubmit={handleManualLogin} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-[#14211B] block mb-1">
              ID Pengguna / Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8A9A92] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Contoh: kader_sengguruh / 19850220..."
                className="w-full h-11 bg-white border border-[#D9E2DD] rounded-lg pl-9 pr-3 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#14211B]">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => alert('Sesuai SOP PRD F-01: Silakan hubungi Koordinator Kader Desa atau Admin Puskesmas Kepanjen untuk verifikasi reset sandi.')}
                className="text-[11px] text-[#1E7F4F] hover:underline"
              >
                Lupa sandi?
              </button>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 text-[#8A9A92] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 bg-white border border-[#D9E2DD] rounded-lg pl-9 pr-3 text-xs text-[#14211B] focus:outline-none focus:ring-2 focus:ring-[#1E7F4F]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-[#1E7F4F] hover:bg-[#145A38] text-white font-semibold text-xs md:text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Masuk ke Dashboard Operasional</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Role Switcher */}
        <div className="pt-4 border-t border-[#D9E2DD] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-[#4B5B53] uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#1E7F4F]" />
              Pilih Cepat Peran Operasional (Simulasi Demo):
            </span>
            <span className="text-[10px] text-[#8A9A92]">7 Peran PRD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_USERS.map((usr) => (
              <button
                key={usr.id}
                type="button"
                onClick={() => handleQuickSelectRole(usr)}
                className="p-2.5 rounded-xl border border-[#D9E2DD] bg-[#F6F8F7] hover:bg-[#E6F4EC] hover:border-[#1E7F4F] text-left transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-[#14211B] group-hover:text-[#145A38]">
                    {usr.name}
                  </div>
                  <div className="text-[10px] text-[#4B5B53]">
                    {usr.roleTitle}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8A9A92] group-hover:text-[#1E7F4F] shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-[#8A9A92] text-center pt-2">
          Data kesehatan sasaran dilindungi UU PDP No. 27/2022. Pembatasan akses diterapkan di sisi server.
        </div>
      </div>
    </div>
  );
};
