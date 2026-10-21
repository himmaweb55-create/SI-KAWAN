/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PublicPortal } from './components/public/PublicPortal';
import { LoginModal } from './components/auth/LoginModal';
import { OperationalShell } from './components/operational/OperationalShell';
import { DashboardView } from './components/operational/DashboardView';
import { PelayananFormView } from './components/operational/PelayananFormView';
import { KunjunganRumahView } from './components/operational/KunjunganRumahView';
import { LaporanBulananView } from './components/operational/LaporanBulananView';
import { MasterPosyanduView } from './components/operational/MasterPosyanduView';
import { PustakaMateriView } from './components/operational/PustakaMateriView';
import { AuditLogView } from './components/operational/AuditLogView';
import { 
  UserProfile, 
  CatatanPelayanan, 
  CatatanKunjunganRumah, 
  LaporanBulanan, 
  AuditLogItem 
} from './types/posyandu';
import { 
  MASTER_108_POSYANDU, 
  SAMPLE_USERS, 
  INITIAL_PELAYANAN, 
  INITIAL_KUNJUNGAN, 
  INITIAL_LAPORAN_BULANAN 
} from './data/masterPosyandu';

export default function App() {
  // Navigation State
  const [viewMode, setViewMode] = useState<'public' | 'operational'>('public');
  const [operationalTab, setOperationalTab] = useState<
    'dashboard' | 'pelayanan' | 'kunjungan' | 'laporan' | 'master' | 'materi' | 'audit'
  >('dashboard');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPelayananModalOpen, setIsPelayananModalOpen] = useState(false);

  // Authenticated User State
  const [currentUser, setCurrentUser] = useState<UserProfile>(SAMPLE_USERS[0]);

  // Operational Datasets (with LocalStorage persistence)
  const [pelayananList, setPelayananList] = useState<CatatanPelayanan[]>(() => {
    try {
      const saved = localStorage.getItem('sikawan_pelayanan');
      return saved ? JSON.parse(saved) : INITIAL_PELAYANAN;
    } catch {
      return INITIAL_PELAYANAN;
    }
  });

  const [kunjunganList, setKunjunganList] = useState<CatatanKunjunganRumah[]>(() => {
    try {
      const saved = localStorage.getItem('sikawan_kunjungan');
      return saved ? JSON.parse(saved) : INITIAL_KUNJUNGAN;
    } catch {
      return INITIAL_KUNJUNGAN;
    }
  });

  const [laporanList, setLaporanList] = useState<LaporanBulanan[]>(() => {
    try {
      const saved = localStorage.getItem('sikawan_laporan');
      return saved ? JSON.parse(saved) : INITIAL_LAPORAN_BULANAN;
    } catch {
      return INITIAL_LAPORAN_BULANAN;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => [
    {
      id: 'log-01',
      timestamp: new Date().toISOString(),
      userName: 'Ibu Sri Wahyuni',
      userRole: 'KADER',
      action: 'Catat Pelayanan',
      entityType: 'PELAYANAN',
      description: 'Pencatatan pemeriksaan 3 sasaran pada Posyandu Melati 01.',
    },
    {
      id: 'log-02',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      userName: 'dr. Hendra Prasetyo, M.Kes',
      userRole: 'PUSKESMAS',
      action: 'Verifikasi Laporan',
      entityType: 'LAPORAN',
      description: 'Verifikasi pengesahan laporan bulanan Posyandu Mawar 01.',
    },
  ]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sikawan_pelayanan', JSON.stringify(pelayananList));
      localStorage.setItem('sikawan_kunjungan', JSON.stringify(kunjunganList));
      localStorage.setItem('sikawan_laporan', JSON.stringify(laporanList));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  }, [pelayananList, kunjunganList, laporanList]);

  // Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    setViewMode('operational');
    setOperationalTab('dashboard');

    // Add audit log
    const loginLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: user.name,
      userRole: user.role,
      action: 'Masuk Sesi (Login)',
      entityType: 'AUTH',
      description: `Autentikasi berhasil sebagai ${user.roleTitle} (${user.desaKelurahan}).`,
    };
    setAuditLogs((prev) => [loginLog, ...prev]);
  };

  const handleLogout = () => {
    setViewMode('public');
  };

  const handleAddPelayanan = (newRecord: CatatanPelayanan) => {
    setPelayananList((prev) => [newRecord, ...prev]);

    // Audit log
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'Catat Pelayanan Baru',
      entityType: 'PELAYANAN',
      description: `Pencatatan pelayanan ${newRecord.siklus} untuk ${newRecord.wargaNama} (NIK: ${newRecord.nik}).`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleAddKunjungan = (newKunjungan: CatatanKunjunganRumah) => {
    setKunjunganList((prev) => [newKunjungan, ...prev]);

    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'Catat Kunjungan Rumah',
      entityType: 'KUNJUNGAN',
      description: `Kunjungan rumah ${newKunjungan.jenisKunjungan} ke KK ${newKunjungan.namaKepalaKeluarga} (${newKunjungan.alamat}).`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateLaporanStatus = (
    laporanId: string,
    newStatus: 'TERVERIFIKASI' | 'PERLU_PERBAIKAN',
    catatan: string
  ) => {
    setLaporanList((prev) =>
      prev.map((lap) => {
        if (lap.id === laporanId) {
          return {
            ...lap,
            status: newStatus,
            pemeriksaNama: currentUser.name,
            tglPemeriksaan: new Date().toISOString(),
            catatanPemeriksa: catatan,
            riwayatKeputusan: [
              ...lap.riwayatKeputusan,
              {
                tanggal: new Date().toISOString(),
                oleh: currentUser.name,
                role: currentUser.role,
                aksi: newStatus === 'TERVERIFIKASI' ? 'Disetujui / Terverifikasi' : 'Dikembalikan untuk Perbaikan',
                catatan,
              },
            ],
          };
        }
        return lap;
      })
    );

    // Audit log
    const auditLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.role,
      action: `Pemeriksaan Laporan: ${newStatus}`,
      entityType: 'LAPORAN',
      description: `Keputusan ${newStatus} untuk ${laporanId} oleh ${currentUser.name} (${currentUser.role}). Catatan: ${catatan}`,
    };
    setAuditLogs((prev) => [auditLog, ...prev]);
  };

  return (
    <>
      {/* 1. Public Citizen Portal (matching screen_88e9cae2.png) */}
      {viewMode === 'public' && (
        <PublicPortal
          posyanduList={MASTER_108_POSYANDU}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      )}

      {/* 2. Operational Portal (matching PRD & Civic Health Design System) */}
      {viewMode === 'operational' && (
        <OperationalShell
          currentUser={currentUser}
          activeTab={operationalTab}
          setActiveTab={setOperationalTab}
          onLogout={handleLogout}
          onSwitchUser={(user) => setCurrentUser(user)}
          onBackToPublic={() => setViewMode('public')}
        >
          {operationalTab === 'dashboard' && (
            <DashboardView
              currentUser={currentUser}
              pelayananList={pelayananList}
              kunjunganList={kunjunganList}
              laporanList={laporanList}
              onNavigate={(tab) => setOperationalTab(tab)}
              onOpenNewPelayanan={() => {
                setOperationalTab('pelayanan');
                setIsPelayananModalOpen(true);
              }}
            />
          )}

          {operationalTab === 'pelayanan' && (
            <PelayananFormView
              currentUser={currentUser}
              pelayananList={pelayananList}
              onAddPelayanan={handleAddPelayanan}
              isModalOpen={isPelayananModalOpen}
              setIsModalOpen={setIsPelayananModalOpen}
            />
          )}

          {operationalTab === 'kunjungan' && (
            <KunjunganRumahView
              currentUser={currentUser}
              kunjunganList={kunjunganList}
              onAddKunjungan={handleAddKunjungan}
            />
          )}

          {operationalTab === 'laporan' && (
            <LaporanBulananView
              currentUser={currentUser}
              laporanList={laporanList}
              onUpdateStatus={handleUpdateLaporanStatus}
              onSubmitLaporan={(id) => {
                setLaporanList((prev) =>
                  prev.map((l) => (l.id === id ? { ...l, status: 'MENUNGGU_PEMERIKSAAN' } : l))
                );
              }}
            />
          )}

          {operationalTab === 'master' && (
            <MasterPosyanduView posyanduList={MASTER_108_POSYANDU} />
          )}

          {operationalTab === 'materi' && <PustakaMateriView />}

          {operationalTab === 'audit' && <AuditLogView logs={auditLogs} />}
        </OperationalShell>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
