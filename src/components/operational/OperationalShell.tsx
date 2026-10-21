import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Home, 
  FileCheck, 
  Building2, 
  BookOpen, 
  ShieldAlert, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  User, 
  Bell, 
  Calendar,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types/posyandu';
import { SAMPLE_USERS } from '../../data/masterPosyandu';

interface OperationalShellProps {
  currentUser: UserProfile;
  activeTab: 'dashboard' | 'pelayanan' | 'kunjungan' | 'laporan' | 'master' | 'materi' | 'audit';
  setActiveTab: (tab: 'dashboard' | 'pelayanan' | 'kunjungan' | 'laporan' | 'master' | 'materi' | 'audit') => void;
  onLogout: () => void;
  onSwitchUser: (user: UserProfile) => void;
  onBackToPublic: () => void;
  children: React.ReactNode;
}

export const OperationalShell: React.FC<OperationalShellProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onLogout,
  onSwitchUser,
  onBackToPublic,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Beranda & Capaian', icon: LayoutDashboard },
    { id: 'pelayanan', label: 'Pelayanan 5 Siklus', icon: ClipboardList },
    { id: 'kunjungan', label: 'Kunjungan Rumah', icon: Home },
    { id: 'laporan', label: 'Laporan & Verifikasi', icon: FileCheck },
    { id: 'master', label: 'Master 108 Posyandu', icon: Building2 },
    { id: 'materi', label: 'Pustaka Materi Kader', icon: BookOpen },
    { id: 'audit', label: 'Jejak Audit & Log', icon: ShieldAlert },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col lg:flex-row font-sans text-[#14211B]">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#145A38] text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-[#1E7F4F]">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <div className="font-bold text-sm leading-tight">SI-KAWAN POSYANDU</div>
            <div className="text-[10px] text-emerald-200">{currentUser.roleTitle}</div>
          </div>
        </div>

        <button
          onClick={onBackToPublic}
          className="text-xs px-2.5 py-1 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors flex items-center gap-1"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Warga</span>
        </button>
      </div>

      {/* Desktop Sidebar Rail (#145A38 Deep Forest Green) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#145A38] text-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:w-64 shrink-0 shadow-xl`}
      >
        {/* Top Brand & Profile */}
        <div className="p-5 space-y-5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E7F4F] flex items-center justify-center text-white font-bold text-base shadow">
              KP
            </div>
            <div>
              <div className="font-bold text-base leading-tight tracking-tight">
                SI-KAWAN
              </div>
              <div className="text-[10px] text-emerald-200 uppercase font-mono">
                Kec. Kepanjen • Malang
              </div>
            </div>
          </div>

          {/* User Badge Card with Role Switcher */}
          <div className="p-3 bg-black/20 rounded-xl border border-white/10 space-y-2 relative">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white truncate max-w-[150px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-emerald-300 leading-tight">
                  {currentUser.roleTitle}
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1E7F4F] text-white shrink-0">
                {currentUser.role}
              </span>
            </div>

            {/* Quick Switch Role Dropdown Trigger */}
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="w-full text-left text-[11px] text-emerald-200 hover:text-white pt-1.5 border-t border-white/10 flex items-center justify-between font-mono"
            >
              <span>Ganti Peran (Simulasi)</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Role Switcher Menu */}
            {showRoleMenu && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white text-[#14211B] rounded-xl shadow-2xl border border-slate-200 py-1 z-50 max-h-56 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-mono text-slate-400 font-bold uppercase border-b">
                  Pilih Akun Peran:
                </div>
                {SAMPLE_USERS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#E6F4EC] transition-colors flex items-center justify-between ${
                      currentUser.id === u.id ? 'bg-[#E6F4EC] font-bold text-[#145A38]' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-[10px] text-slate-500">{u.roleTitle}</div>
                    </div>
                    {currentUser.id === u.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7F4F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1E7F4F] text-white shadow-md'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onBackToPublic}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>Lihat Portal Warga</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-900/40 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white border-b border-[#D9E2DD] sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-base text-[#14211B]">
              Portal Operasional Posyandu
            </span>
            <span className="text-xs text-[#8A9A92]">•</span>
            <span className="text-xs text-[#4B5B53] font-medium">
              Wilayah: <strong>Kecamatan Kepanjen</strong> ({currentUser.desaKelurahan})
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F6F8F7] border border-[#D9E2DD] text-[#4B5B53] font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#1E7F4F]" />
              <span>Periode: Oktober 2026</span>
            </div>

            <button
              onClick={onBackToPublic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9E2DD] text-[#145A38] font-semibold hover:bg-[#E6F4EC] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portal Publik Warga</span>
            </button>
          </div>
        </header>

        {/* Viewport Children */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
