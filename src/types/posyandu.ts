export type UserRole = 
  | 'KADER' 
  | 'KOORDINATOR' 
  | 'PUSTU' 
  | 'PUSKESMAS' 
  | 'DESA' 
  | 'KECAMATAN' 
  | 'ADMIN' 
  | 'SUPERADMIN';

export type SiklusHidup = 
  | 'IBU_HAMIL' 
  | 'BAYI_BALITA' 
  | 'REMAJA' 
  | 'DEWASA' 
  | 'LANSIA';

export type StatusLaporan = 
  | 'DRAF' 
  | 'DALAM_PROSES' 
  | 'MENUNGGU_PEMERIKSAAN' 
  | 'PERLU_PERBAIKAN' 
  | 'TERVERIFIKASI';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  posyanduId?: string;
  posyanduName?: string;
  desaKelurahan: string;
  avatarUrl?: string;
}

export interface MasterPosyandu {
  id: string; // e.g. KPN-001
  kode: string;
  nama: string;
  desaKelurahan: string;
  dusunRwRt: string;
  alamat: string;
  statusOperasional: 'Aktif' | 'Nonaktif';
  jumlahKader: number;
  jumlahSasaranKK: number;
  bidanPendamping: string;
  hariJadwal: string;
  jamLayanan: string;
  siklusTersedia: SiklusHidup[];
}

export interface SasaranWarga {
  id: string;
  nik: string;
  nama: string;
  tanggalLahir: string;
  usiaBulan: number;
  usiaTahun: number;
  jenisKelamin: 'L' | 'P';
  siklus: SiklusHidup;
  namaKK: string;
  noKK: string;
  posyanduId: string;
  desaKelurahan: string;
  alamatRwRt: string;
  noTelepon?: string;
}

export interface CatatanPelayanan {
  id: string;
  tanggal: string;
  posyanduId: string;
  posyanduNama: string;
  wargaId: string;
  wargaNama: string;
  nik: string;
  siklus: SiklusHidup;
  // Pengukuran Biometrik
  beratBadanKg?: number;
  tinggiBadanCm?: number;
  lilaCm?: number; // Lingkar Lengan Atas
  lingkarPerutCm?: number;
  tekananDarahSistol?: number;
  tekananDarahDiastol?: number;
  gulaDarahMgDl?: number;
  hemoglobin?: number;
  statusGizi: string; // e.g. "Normal", "Gizi Kurang (Wasting)", "Risiko KEK", "Normal", "Hipertensi Derajat 1"
  imunisasiDiberikan?: string;
  vitaminObatDiberikan?: string;
  edukasiKonseling: string;
  tindakLanjut: string;
  perluRujukan: boolean;
  alasanRujukan?: string;
  faskesRujukan?: string;
  kaderPencatat: string;
  status: 'DRAF' | 'TERCATAT';
  createdAt: string;
}

export interface CatatanKunjunganRumah {
  id: string;
  tanggal: string;
  posyanduId: string;
  posyanduNama: string;
  noKK: string;
  namaKepalaKeluarga: string;
  alamat: string;
  desaKelurahan: string;
  kaderNama: string;
  jenisKunjungan: 'RUTIN_TAHUNAN' | 'KHUSUS' | 'TINDAK_LANJUT';
  anggotaDikunjungi: {
    wargaId: string;
    nama: string;
    siklus: SiklusHidup;
    kondisi: string;
    edukasi: string;
    rujukan: boolean;
  }[];
  temuanKesehatan: string;
  tindakLanjut: string;
  status: 'DRAF' | 'SELESAI';
  createdAt: string;
}

export interface LaporanBulanan {
  id: string;
  periodeBulan: string; // e.g. "Oktober 2026"
  tahun: number;
  bulan: number;
  posyanduId: string;
  posyanduNama: string;
  desaKelurahan: string;
  jumlahSasaranTerlayani: number;
  capaianPerSiklus: {
    ibuHamil: number;
    bayiBalita: number;
    remaja: number;
    dewasa: number;
    lansia: number;
  };
  totalKunjunganRumah: number;
  status: StatusLaporan;
  tglKirim?: string;
  tglPemeriksaan?: string;
  pemeriksaNama?: string;
  catatanPemeriksa?: string;
  fileDokumentasiUrl?: string;
  riwayatKeputusan: {
    tanggal: string;
    oleh: string;
    role: string;
    aksi: string;
    catatan: string;
  }[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: 'PELAYANAN' | 'KUNJUNGAN' | 'LAPORAN' | 'MASTER' | 'AUTH';
  description: string;
  ipAddress?: string;
}
