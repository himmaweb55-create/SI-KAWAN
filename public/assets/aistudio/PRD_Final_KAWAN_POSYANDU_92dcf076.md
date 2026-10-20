# PRD FINAL — KAWAN POSYANDU

*Kolaborasi Administrasi, Wawasan, Akses, dan Navigasi Informasi bagi Kader Posyandu Bidang Kesehatan di Kecamatan Kepanjen*

Jargon: **Saling Hadir, Bantu, dan Tumbuh Bersama** · Tagline: **Teman Kader untuk Belajar dan Melayani**

Versi 1.0 · 18 Oktober 2026 · Platform: Google Apps Script (GAS), Google Sheets, Google Drive

## 1. Judul & Ringkasan Eksekutif

KAWAN POSYANDU adalah aplikasi web berbasis Google Apps Script untuk mendigitalkan pencatatan dan pelaporan Posyandu Bidang Kesehatan, sekaligus memperkuat akses informasi, pembelajaran, koordinasi, dan pemantauan kegiatan kader. Cakupan awal: **108 Posyandu di 18 desa/kelurahan, Kecamatan Kepanjen, Kabupaten Malang**.

Aplikasi menyatukan data yang kini tersebar di berbagai spreadsheet, tautan, dan media digital ke satu sistem dengan satu sumber data. Dari sumber yang sama dihasilkan formulir, rekapitulasi, dashboard, PDF, dan ekspor, sehingga angka tidak berbeda antar tampilan.

**Ringkasan keputusan utama**

- Tujuh peran operasional (Kader Posyandu, Koordinator Kader, Petugas Pustu/Ponkesdes, Puskesmas, Pemerintah Desa/Kelurahan, Pemerintah Kecamatan, Admin Operasional) ditambah akun teknis *superadmin* yang bukan peran operasional.
- Akses dibatasi berdasarkan **peran dan wilayah penugasan**, diterapkan di sisi server.
- Login dengan **ID pengguna dan kata sandi**, tanpa pendaftaran mandiri dan tanpa bergantung pada akun Google. Ada halaman informasi publik terbatas tanpa login.
- Data sasaran dikelompokkan dalam **lima kelompok siklus hidup**.
- Pencatatan **hasil pelayanan Posyandu** dan **hasil kunjungan rumah** menjadi sumber capaian; progres bulanan diambil dari catatan tersimpan, bukan diinput ulang.
- Tampilan **mobile-first**, modern, bersih, dengan mode terang dan gelap.
- Pengembangan **bertahap**: formulir yang berfungsi, pelaporan akurat, pemeriksaan data, dan dashboard kelengkapan lebih dulu; analisis tren dan indikator kompleks menyusul setelah data tervalidasi.

## 2. Latar Belakang & Tujuan Produk

### 2.1 Latar belakang

Pencatatan, pelaporan, dokumentasi, dan pemantauan Posyandu saat ini tersebar di banyak spreadsheet, tautan, dan media digital. Akibatnya kader dan petugas sulit mencari informasi, memantau kelengkapan laporan, dan memastikan data dapat dipakai untuk tindak lanjut pelayanan.

### 2.2 Masalah yang diselesaikan

| No | Masalah | Dampak |
| --- | --- | --- |
| 1 | Pencatatan dan pelaporan tersebar (pelayanan, kunjungan rumah, progres bulanan belum terintegrasi) | Rekap manual, rawan selisih angka |
| 2 | Pemantauan belum optimal; petugas memeriksa banyak sumber terpisah | Status pelaporan dan tindak lanjut sulit dipantau |
| 3 | Data sasaran (individu, keluarga, kelompok siklus hidup) perlu dimutakhirkan dan divalidasi bertahap | Risiko data usang atau hilangnya riwayat berguna |
| 4 | Akses materi edukasi, panduan, dan administrasi belum terpusat | Kader kesulitan menemukan informasi sesuai tugasnya |
| 5 | Tindak lanjut data belum konsisten | Kebutuhan tindak lanjut sulit diidentifikasi |
| 6 | Koordinasi lintas tingkat perlu diperkuat | Setiap tingkat butuh informasi sesuai perannya |

### 2.3 Tujuan produk

1. Mengintegrasikan pencatatan dan pelaporan dalam satu sistem.
2. Membuat proses pemantauan lebih transparan dan terlacak (siapa, kapan, status).
3. Mempermudah akses materi dan panduan kader.
4. Menjadikan data lebih bermanfaat untuk pembinaan dan peningkatan kualitas pelayanan.
5. Melindungi data kesehatan individu dengan pembatasan akses berbasis peran dan wilayah.

### 2.4 Di luar cakupan versi awal

- Diagnosis otomatis atau penetapan ambang klinis tanpa dasar resmi yang sah.
- Pendaftaran akun mandiri.
- Integrasi otomatis ke sistem eksternal yang belum diimplementasikan dan diuji; tautan eksternal (formulir, folder dokumentasi) tetap boleh dipakai sementara dan hanya ditandai berdasarkan konfirmasi pengguna.
- Impor data keluarga, NIK, dan data kesehatan individu pada tahap PRD awal; ditangani di tahap berikutnya melalui impor dan validasi dengan pembatasan akses.

## 3. Target Pengguna & Matriks Hak Akses (RBAC)

### 3.1 Peran pengguna

| No | Peran | Fungsi utama | Cakupan data |
| --- | --- | --- | --- |
| 1 | Kader Posyandu | Mencatat pelayanan dan kunjungan rumah, mengisi progres, mengirim laporan, belajar materi | Posyandu penugasannya; data individu sesuai hak akses |
| 2 | Koordinator Kader | Memantau kelengkapan, pemeriksaan administratif, umpan balik, koordinasi kader | Posyandu binaannya |
| 3 | Petugas Pustu/Ponkesdes | Pendampingan, pemeriksaan sesuai kewenangan, tindak lanjut | Wilayah kerja yang ditugaskan |
| 4 | Puskesmas | Pemantauan, evaluasi, pembinaan, analisis capaian, tindak lanjut program | Seluruh Posyandu di Kepanjen sesuai kewenangan |
| 5 | Pemerintah Desa/Kelurahan | Memantau agregat wilayah untuk koordinasi dan pemberdayaan | Agregat desa/kelurahan sendiri |
| 6 | Pemerintah Kecamatan | Memantau rekap agregat lintas desa/kelurahan | Agregat kecamatan dan per desa/kelurahan |
| 7 | Admin Operasional | Kelola akun, penugasan wilayah, data master, materi, impor | Data master dan operasional sesuai kewenangan |
| — | Superadmin (akun teknis) | Pengelolaan, konfigurasi, dan pemeliharaan sistem | Teknis; tidak otomatis melihat data kesehatan individu |

### 3.2 Matriks hak akses

Rancangan awal; perlu dikonfirmasi terhadap SOP dan pembagian kewenangan yang berlaku. **L** = lihat, **I** = isi, **U** = ubah, **H** = hapus, **P** = periksa/setujui, **K** = kembalikan untuk perbaikan.

| Fungsi | Kader | Koord. | Pustu/Ponkesdes | Puskesmas | Desa/Kel. | Kecamatan | Admin |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Data individu/sasaran | L, I (wilayahnya) | L (sesuai hak) | L (sesuai hak) | L (sesuai kewenangan) | Tidak | Tidak | Kelola master; data kesehatan individu tidak otomatis |
| Hasil pelayanan | L, I, U (draf/dikembalikan) | L | L, catatan | L | Agregat | Agregat | Tidak otomatis |
| Kunjungan rumah | L, I, U (draf/dikembalikan) | L | L, catatan | L | Agregat | Agregat | Tidak otomatis |
| Progres bulanan | L, I, kirim | L, P administratif, K | L, P sesuai kewenangan | L, P tahap Puskesmas | Agregat | Agregat | L |
| Rekap dan dashboard | Posyandunya | Binaannya | Wilayah tugasnya | Seluruh kecamatan | Desa sendiri | Kecamatan | Operasional |
| Materi pembelajaran | L | L | L | L, I (jika ditugaskan) | L | L | Kelola |
| Akun dan penugasan | Tidak | Tidak | Tidak | Tidak | Tidak | Tidak | Kelola |
| Ekspor/unduhan | Sesuai hak | Sesuai hak | Sesuai hak | Sesuai hak | Agregat | Agregat | Sesuai kewenangan |

**Aturan umum hak akses**

1. Akun bersifat individual, dibuat oleh pihak berwenang; tidak ada pendaftaran mandiri.
2. Pembatasan diterapkan di sisi server (termasuk akses langsung ke URL, unduhan, ekspor, dan berkas), bukan hanya menyembunyikan menu.
3. Desa/kelurahan dan kecamatan hanya memakai data agregat; tidak mendapat akses otomatis ke NIK, data individu, atau riwayat kesehatan per anggota keluarga.
4. Tidak ada peran yang menghapus permanen data yang sudah dikirim atau diverifikasi; koreksi lewat mekanisme tercatat (pengguna, waktu, alasan).
5. Kader tidak menyetujui laporannya sendiri sebagai final. Pemeriksaan administratif tidak menggantikan verifikasi klinis tenaga kesehatan dan tidak boleh menghambat rujukan atau penanganan yang perlu segera.
6. Admin dan superadmin tidak otomatis berwenang melihat atau menyetujui isi pelayanan kesehatan.
7. Ekspor dan unduhan mengikuti pembatasan yang sama dengan tampilan data.
8. Rincian akses dan tahap persetujuan diselaraskan dengan SOP Kecamatan Kepanjen.

## 4. Arsitektur Data (Google Sheets & Google Drive) serta Integrasi Workspace

### 4.1 Prinsip data

- **Satu sumber data**: laporan, dashboard, PDF, dan ekspor memakai tabel sumber yang sama.
- **ID Posyandu yang sudah ditetapkan dipertahankan** persis seperti pada master (contoh format pada berkas contoh: `KPN - 001`), agar konsisten dengan sumber dan riwayat.
- **Master 108 Posyandu adalah referensi awal**, belum otomatis tervalidasi; struktur dan keterkaitannya diperiksa sebelum dipakai.
- Bedakan eksplisit status: **kosong, nol, belum diverifikasi, belum dilaporkan**. Data tidak lengkap atau belum tervalidasi tidak boleh tampil sebagai capaian final.
- Data lama dimigrasikan bertahap (impor, pemeriksaan, rekonsiliasi); sistem tidak menghapus data lama hanya karena kolom impor kosong.
- Setiap tabel punya kolom pengelolaan: ID unik, dibuat oleh/pada, diubah oleh/pada, status, versi.

### 4.2 Rancangan tabel (Google Sheets)

| Kelompok | Tabel | Isi utama |
| --- | --- | --- |
| Master | `MASTER_POSYANDU`, `WILAYAH` | ID Posyandu, desa/kelurahan, nama, alamat, RW/RT, status operasional, wilayah kerja, jumlah kader, jumlah KK |
| Kader | `KADER`, `PENUGASAN` | Kader dan koordinator, penugasan wilayah, riwayat penugasan |
| Sasaran | `KELUARGA`, `ANGGOTA`, `SASARAN` | KK, anggota, tanggal lahir/usia, kelompok siklus hidup, status validasi, riwayat perubahan (tahap berikutnya, akses terbatas) |
| Pelayanan | `PELAYANAN` + detail per kelompok siklus hidup | Tanggal, Posyandu, siklus, anggota, pendaftaran, pengukuran, hasil, pelayanan, edukasi, tindak lanjut, rujukan, status |
| Kunjungan | `KUNJUNGAN`, `KUNJUNGAN_ANGGOTA` | Tanggal, Posyandu, RW/RT, KK, kader, jenis (rutin tahunan / khusus / tindak lanjut), beberapa anggota per kunjungan, hasil, temuan, rujukan, status |
| Pelaporan | `PROGRES_BULANAN`, `LAPORAN`, `PEMERIKSAAN`, `TINDAK_LANJUT` | Status per bulan, rekap triwulan, pengiriman, hasil pemeriksaan, catatan perbaikan, penanggung jawab |
| Berkas | `BERKAS` | Jenis, tanggal unggah, pengunggah, Posyandu/wilayah, periode, status pemeriksaan, ID berkas Drive |
| Informasi | `MATERI`, `PENGUMUMAN` | Materi edukasi, panduan, jadwal pembinaan, status publikasi (publik/internal) |
| Akun dan audit | `PENGGUNA`, `SESI`, `AUDIT_LOG`, `NOTIFIKASI`, `IMPOR_LOG` | Akun, peran, wilayah, status akun, sesi, riwayat perubahan, log akses, notifikasi, hasil impor |
| Referensi | `REF_INDIKATOR` | Definisi indikator, sumber data, periode, rumus, penyebut |

Berkas contoh yang sudah ada (master Posyandu, data bulanan, monitoring, rekap desa, rekap bulanan, rekap siklus, dashboard, dan format rekap kunjungan per Posyandu) menjadi acuan struktur kolom dan harus diperiksa: misalnya kolom desa pada rekap desa saat ini menampilkan galat rumus `#NAME?` dan tidak boleh terbawa ke sistem.

### 4.3 Google Drive

- Struktur folder per jenis berkas dan per periode; hak akses folder dikunci, tidak publik.
- Jenis berkas: foto dokumentasi kegiatan, dokumen laporan pendukung, PDF panduan, berkas impor, keluaran laporan.
- Berkas berisi data kesehatan individu dilindungi; tautan tidak boleh dapat dibuka bebas hanya karena alamatnya diketahui. Unduhan lewat lapisan aplikasi yang memeriksa peran dan wilayah.
- Dokumentasi dengan tautan eksternal tetap dipakai pada tahap awal; integrasi otomatis dianggap tersedia hanya jika sudah diimplementasikan dan diuji.

### 4.4 Integrasi Workspace

- **Gmail**: notifikasi di dalam aplikasi lebih dulu. Email otomatis menjadi fitur pendukung jika alamat email tersedia, kebijakan penggunaan disepakati, dan konfigurasi GAS memungkinkan. Sistem tidak menganggap email terkirim jika pengiriman gagal.
- **Pembuatan PDF** dari data tersimpan dan tervalidasi, mencantumkan identitas, periode, tanggal pembuatan, dan status data yang belum terverifikasi.
- **Ekspor spreadsheet** dibatasi peran dan wilayah.

## 5. Persyaratan Fungsional (User Stories & Acceptance Criteria)

| ID | User story | Acceptance criteria |
| --- | --- | --- |
| F-01 | Sebagai pengguna, saya ingin login dengan ID dan kata sandi | Akun dibuat pihak berwenang; tidak ada pendaftaran mandiri; kata sandi tersimpan dalam bentuk hash; ada pengaturan ulang kata sandi; percobaan gagal berulang dibatasi; sesi kedaluwarsa otomatis |
| F-02 | Sebagai pengunjung, saya ingin membuka halaman informasi publik | Hanya memuat profil, info umum, materi yang disetujui publik, dan kontak terverifikasi; tidak ada data individu, keluarga, kesehatan, laporan internal, atau tautan dibatasi |
| F-03 | Sebagai pengguna, saya ingin beranda sesuai peran | Menampilkan cakupan wilayah, progres bulan berjalan, status laporan, daftar tugas, dan notifikasi; data tanpa sumber/valid tampil sebagai status, tidak berupa angka karangan |
| F-04 | Sebagai Admin, saya ingin mengelola master Posyandu dan wilayah | 108 Posyandu dengan ID unik terjaga; perubahan master tercatat; hubungan Posyandu-wilayah-penugasan dapat diperiksa |
| F-05 | Sebagai Admin, saya ingin mengelola akun, peran, dan penugasan wilayah | Akun dapat dibuat, dinonaktifkan, diubah peran/wilayahnya; setiap perubahan masuk audit log; superadmin bukan peran operasional |
| F-06 | Sebagai petugas berwenang, saya ingin mengimpor data dari spreadsheet | Ada pratinjau, deteksi duplikasi, laporan kesalahan, dan pilihan tambah/perbarui/lewati; kolom kosong tidak menghapus data lama; data impor berstatus belum tervalidasi sampai diperiksa |
| F-07 | Sebagai kader, saya ingin mencatat hasil pelayanan Posyandu per kelompok siklus hidup | Mengikuti alur pendaftaran, pengukuran, pencatatan hasil, pelayanan, dan edukasi; terhubung ke tanggal, Posyandu, siklus, dan anggota; tersedia draf, tindak lanjut, dan rujukan; tidak ada diagnosis atau ambang klinis otomatis tanpa dasar resmi |
| F-08 | Sebagai kader, saya ingin kelompok siklus hidup terisi otomatis | Penentuan otomatis dari usia/status setelah aturan klasifikasi disepakati; koreksi hanya oleh yang berwenang dan punya riwayat perubahan |
| F-09 | Sebagai kader, saya ingin mencatat kunjungan rumah | Pilih wilayah, KK, dan anggota sesuai penugasan; satu kunjungan memuat beberapa anggota; jenis kunjungan wajib dipilih; simpan sebagai draf lalu kirim untuk diperiksa |
| F-10 | Sebagai sistem, saya ingin menghitung kunjungan tanpa ganda | Kunjungan rutin maksimal sekali per KK per tahun untuk capaian rutin; kunjungan khusus dan tindak lanjut tetap tersimpan tetapi tidak menambah capaian rutin; ketentuan final diselaraskan dengan SOP |
| F-11 | Sebagai kader, saya ingin progres bulanan terisi dari catatan yang ada | Progres pelayanan dan kunjungan ditarik otomatis; kader tidak input ulang; dokumentasi eksternal ditandai berdasarkan konfirmasi pengguna, bukan dianggap terverifikasi otomatis |
| F-12 | Sebagai kader, saya ingin mengirim laporan bulanan | Status: belum dimulai, dalam proses, menunggu pemeriksaan, perlu perbaikan, selesai; laporan terkirim terkunci dari penghapusan; perubahan lewat koreksi tercatat |
| F-13 | Sebagai koordinator/petugas/Puskesmas, saya ingin memeriksa laporan | Alur: kader kirim, koordinator periksa administratif, Pustu/Ponkesdes periksa sesuai kewenangan, Puskesmas pantau dan evaluasi; dapat memberi catatan, mengembalikan, atau menandai selesai; riwayat keputusan tersimpan |
| F-14 | Sebagai pengguna, saya ingin mengunggah dokumentasi dan dokumen pendukung | Jenis berkas, pengunggah, tanggal, wilayah, periode, dan status pemeriksaan tersimpan; akses mengikuti peran dan wilayah |
| F-15 | Sebagai pengguna, saya ingin notifikasi tugas | Notifikasi dalam aplikasi untuk laporan belum dikirim, menunggu pemeriksaan, perlu perbaikan, selesai diperiksa, dan tindak lanjut terbuka |
| F-16 | Sebagai pengguna berwenang, saya ingin dashboard grafik dan tabel | Kartu indikator, batang, garis, dan lingkaran/batang bertumpuk; setiap grafik memuat judul, periode, satuan, sumber, dan penyebut untuk persentase; kunjungan berulang tidak dihitung sebagai individu unik |
| F-17 | Sebagai pengguna, saya ingin tabel yang bisa dicari dan disaring | Cari nama/ID Posyandu; filter desa/kelurahan, Posyandu, bulan, tahun, triwulan, siklus, status; urut; penanda laporan tidak lengkap; akses riwayat pemeriksaan sesuai kewenangan |
| F-18 | Sebagai pengguna berwenang, saya ingin laporan PDF dan ekspor | Tujuh jenis rekap (pelayanan, kunjungan rumah, progres bulanan, kelengkapan, pemeriksaan, tindak lanjut, agregat kecamatan); mengikuti hak akses, filter, dan periode; ekspor data terbatas tercatat di audit log |
| F-19 | Sebagai kader, saya ingin mengakses materi pembelajaran | Materi, panduan pencatatan, panduan aplikasi, kapasitas kader, pengumuman; dikelola admin/petugas yang ditugaskan; ada penanda publik atau internal |
| F-20 | Sebagai auditor/admin, saya ingin jejak audit | Perubahan penting, pengiriman, pemeriksaan, koreksi, pengelolaan akun, dan akses penting tercatat dengan pengguna, waktu, dan alasan; data terverifikasi tidak diubah diam-diam |

Setiap indikator di dashboard wajib terdaftar di `REF_INDIKATOR` (definisi, sumber data, periode, aturan perhitungan, penyebut) dan baru ditampilkan setelah rumusnya diuji.

## 6. Persyaratan Non-Fungsional & Keterbatasan Spesifik GAS

### 6.1 Persyaratan non-fungsional

- **Keamanan dan privasi**: otorisasi di server untuk setiap permintaan data, unduhan, ekspor, dan berkas; kata sandi di-hash dengan garam; pembatasan percobaan masuk; sesi dengan masa berlaku; data kesehatan individu dilindungi khusus; prinsip hak akses minimum.
- **Auditabilitas**: log perubahan dan akses penting; data terverifikasi tidak dapat diubah atau dihapus diam-diam.
- **Integritas data**: validasi masukan di sisi klien dan server; pencegahan duplikasi; penguncian saat penulisan bersamaan; status validasi pada setiap data.
- **Kinerja dan kapasitas**: jumlah akun aktif harian dan pengguna bersamaan **belum ditetapkan** dan tidak boleh dijadikan fakta. Rancang untuk penggunaan bersamaan lintas Posyandu; uji kapasitas setelah akun dan pola kegiatan terpetakan, termasuk ukuran berkas dokumentasi dan puncak aktivitas.
- **Keandalan**: pencadangan berkala data Sheets dan Drive; draf tersimpan agar kerja tidak hilang; pesan galat jelas bagi kader.
- **Kegunaan dan aksesibilitas**: mobile-first, tombol besar, kontras memadai, informasi tidak hanya dibedakan lewat warna.
- **Kualitas data**: pembedaan kosong, nol, belum diverifikasi, dan belum dilaporkan di seluruh tampilan dan laporan.

### 6.2 Keterbatasan GAS dan mitigasinya

Angka kuota GAS dapat berubah; **verifikasi pada dokumentasi resmi Google saat implementasi**.

| Keterbatasan | Dampak | Mitigasi |
| --- | --- | --- |
| Batas waktu eksekusi per proses dan kuota harian | Impor besar atau laporan berat bisa terpotong | Impor dan pembuatan laporan dipecah per bagian, berjalan bertahap dengan penanda kemajuan |
| Google Sheets sebagai basis data (bukan database relasional) | Lambat jika baca-tulis sering; batas ukuran sel/lembar | Baca/tulis dalam batch, cache untuk data referensi, indeks sederhana, arsip periode lama, tabel per fungsi |
| Penulisan bersamaan | Data bisa bertabrakan | Penguncian (lock) saat menulis dan ID unik per catatan |
| Tidak ada sistem login bawaan untuk ID/kata sandi sendiri | Keamanan harus dibangun di aplikasi | Modul autentikasi sendiri: hash, token sesi berumur terbatas, pembatasan percobaan, audit log |
| Kuota pengiriman email | Notifikasi email tidak dapat tanpa batas | Notifikasi dalam aplikasi sebagai utama; email opsional dengan pencatatan status kirim |
| Pengelolaan hak berkas Drive | Tautan bisa bocor | Folder terkunci, unduhan lewat aplikasi yang memeriksa hak, tanpa tautan terbuka |
| Pembuatan PDF/Excel berukuran besar | Waktu dan memori | Batasi cakupan per ekspor, filter wajib untuk data besar |
| Data kesehatan individu di Sheets | Risiko paparan jika file diakses langsung | Batasi pemilik/editor Sheets pada akun teknis, pisahkan tabel sensitif, nonaktifkan berbagi tautan |

## 7. Spesifikasi Antarmuka (Frontend) & Alur Kerja Client-Server

### 7.1 Prinsip tampilan

Modern, bersih, sederhana, profesional, ramah pengguna, untuk kader dengan kemampuan digital beragam.

- **Mobile-first dan responsif**: HP prioritas utama (saat kegiatan dan kunjungan rumah); tetap nyaman di komputer untuk pemeriksaan dan analisis.
- **Mudah dipahami**: navigasi sederhana, tombol besar, formulir tidak membingungkan, petunjuk pengisian jelas.
- **Konsisten**: struktur menu, istilah, status, ikon, dan warna seragam.
- **Berorientasi tugas**: tugas, progres, dan tindak lanjut tampak langsung di beranda.
- **Aksesibel**: teks terbaca, kontras memadai, label teks/ikon selain warna.
- **Mode terang dan gelap** dengan keterbacaan terjaga.

### 7.2 Warna dan identitas visual

Hijau utama `#1E7F4F` (kesehatan, pertumbuhan, kolaborasi), putih dan abu-abu netral untuk latar dan kartu, aksen biru medis dan teal.

| Kelompok siklus hidup | Warna panduan |
| --- | --- |
| Ibu hamil, bersalin/nifas, menyusui | Coral pink `#F17079` |
| Bayi, balita, anak prasekolah (Apras) | Biru `#4C94B3` |
| Usia sekolah dan remaja | Teal `#15AB9D` |
| Usia dewasa | Kuning `#F6D44B` |
| Usia lanjut (lansia) | Oranye `#FBB03F` |

Warna ini panduan desain aplikasi, **bukan klaim standar resmi Kementerian Kesehatan**. Setiap kelompok wajib punya label teks dan/atau ikon agar tetap terbedakan saat warna tak terlihat jelas atau laporan dicetak hitam-putih.

### 7.3 Struktur halaman dan prioritas per peran

| Peran | Tampilan paling penting |
| --- | --- |
| Kader | Formulir pelayanan dan kunjungan rumah, progres bulanan, status laporan, tugas belum selesai |
| Koordinator Kader | Laporan Posyandu binaan, kelengkapan, antrean pemeriksaan, catatan perbaikan |
| Petugas Pustu/Ponkesdes | Data wilayah tugas, laporan yang perlu diperiksa, pemantauan pelayanan, tindak lanjut |
| Puskesmas | Dashboard 108 Posyandu, kelengkapan dan status laporan, capaian, tren bulanan/triwulanan, distribusi lima siklus hidup, tindak lanjut |
| Pemerintah Desa/Kelurahan | Ringkasan agregat wilayahnya, progres pelaporan, kebutuhan dukungan; tanpa data individual |
| Pemerintah Kecamatan | Agregat 18 desa/kelurahan, perbandingan antarwilayah, tren pelaporan, isu koordinasi |
| Admin Operasional | Status akun, penugasan wilayah, master data, kendala pengisian, kelengkapan administrasi |
| Superadmin | Kesehatan teknis sistem, konfigurasi, pemeliharaan, audit teknis |

Menu dikelompokkan menurut alur kerja: Beranda, Data Master & Sasaran, Pelayanan Posyandu, Kunjungan Rumah, Progres Bulanan, Pemeriksaan, Rekap & Laporan, Pembelajaran, Dokumentasi & Notifikasi, Administrasi Akun. Halaman publik terpisah dari area login.

### 7.4 Dashboard, grafik, dan tabel

- **Kartu indikator**: jumlah Posyandu, laporan masuk, laporan terverifikasi, laporan perlu perbaikan.
- **Batang**: kelengkapan antar desa/kelurahan atau Posyandu. **Garis**: perkembangan bulanan. **Lingkaran/batang bertumpuk**: komposisi status atau siklus hidup bila penyebut jelas.
- **Tabel**: pencarian, filter, urut, penanda belum lengkap, riwayat pemeriksaan, ekspor sesuai hak.
- Setiap grafik memuat judul, periode, satuan, sumber data, dan penyebut; data belum tersedia tampil sebagai status, bukan angka pengganti.

Pertanyaan yang harus bisa dijawab layar: (1) Apa yang sudah dikerjakan? (2) Apa yang belum lengkap atau butuh perhatian? (3) Apa tindak lanjutnya dan siapa penanggung jawabnya?

### 7.5 Alur kerja client-server

1. **Login**: klien kirim ID dan kata sandi; server memverifikasi hash, menerbitkan token sesi berumur terbatas, mencatat log.
2. **Setiap permintaan data**: klien kirim token dan parameter; server memeriksa sesi, peran, dan wilayah, lalu mengembalikan hanya data yang berhak.
3. **Simpan draf / kirim**: klien validasi awal, server validasi ulang, kunci tulis, simpan, catat audit, kembalikan status.
4. **Pemeriksaan**: pemeriksa memberi catatan atau mengembalikan; status berubah sesuai alur; notifikasi dibuat.
5. **Impor**: unggah, pratinjau, validasi dan deteksi duplikasi, konfirmasi pengguna, penulisan bertahap, laporan hasil.
6. **Rekap dan ekspor**: server menghitung dari tabel sumber, menerapkan filter dan hak akses, menghasilkan tampilan, PDF, atau spreadsheet, dan mencatat ekspor data terbatas.

Antarmuka berbentuk aplikasi satu halaman (SPA) yang responsif. Cara penyajian (melalui HtmlService GAS atau frontend terpisah dengan GAS sebagai API) diputuskan pada tahap pembangunan; keduanya wajib mengikuti aturan otorisasi sisi server di atas.

## 8. Rencana Deployment & Pengujian

### 8.1 Tahapan pengembangan

| Tahap | Cakupan | Keluaran |
| --- | --- | --- |
| 0. Persiapan | Periksa dan bersihkan master 108 Posyandu; sepakati SOP alur pemeriksaan, aturan klasifikasi siklus, definisi indikator; petakan akun pengguna | Master tervalidasi, daftar akun, dokumen aturan |
| 1. Fondasi | Autentikasi, peran dan wilayah, master, pengelolaan akun, audit log, halaman publik | Login dan manajemen akses berfungsi |
| 2. Pencatatan | Pelayanan lima siklus hidup, kunjungan rumah, berkas, draf dan pengiriman | Kader dapat mencatat dan mengirim |
| 3. Pelaporan dan pemeriksaan | Progres bulanan otomatis, alur pemeriksaan, notifikasi dalam aplikasi | Alur laporan end-to-end |
| 4. Dashboard dan laporan | Dashboard kelengkapan, tabel filter, PDF dan ekspor | Pemantauan Puskesmas dan kecamatan |
| 5. Migrasi data sasaran | Impor, validasi, rekonsiliasi bertahap dengan akses terbatas | Data sasaran tervalidasi bertahap |
| 6. Perluasan | Email otomatis, analisis tren dan indikator lanjutan setelah data tervalidasi | Fitur lanjutan |

### 8.2 Strategi pengujian

- **Uji akses (prioritas tertinggi)**: setiap peran dan wilayah diuji, termasuk akses langsung ke URL, unduhan, ekspor, dan berkas; desa/kelurahan dan kecamatan tidak dapat melihat data individu.
- **Uji fungsional**: seluruh user story dan acceptance criteria di Bagian 5.
- **Uji data**: impor dengan duplikasi, kolom kosong, galat rumus; aturan kunjungan rutin vs khusus; pembedaan kosong, nol, belum diverifikasi; kecocokan angka antara formulir, dashboard, PDF, dan ekspor.
- **Uji penggunaan bersamaan dan kapasitas**: simulasi banyak Posyandu menulis bersamaan, berkas dokumentasi berukuran nyata.
- **Uji perangkat**: HP berbagai ukuran, jaringan lambat, mode terang/gelap, cetak hitam-putih.
- **Uji penerimaan pengguna (UAT)**: percontohan pada beberapa Posyandu dari desa berbeda bersama koordinator, Pustu/Ponkesdes, dan Puskesmas sebelum diperluas ke 108 Posyandu.

### 8.3 Deployment

- Lingkungan uji terpisah dari produksi (salinan Sheets dan Drive terpisah).
- Versi dan catatan rilis; cadangan data sebelum setiap rilis.
- Akun awal dibuat Admin; pelatihan singkat dan panduan penggunaan untuk kader.
- Pemantauan awal pasca-rilis: kendala pengisian, galat, dan umpan balik pengguna.

### 8.4 Hal yang masih perlu ditetapkan

1. SOP final alur pemeriksaan dan tahap persetujuan laporan.
2. Aturan klasifikasi kelompok siklus hidup dan sumber format resmi pelayanan.
3. Definisi, rumus, dan penyebut setiap indikator.
4. Kebijakan penggunaan email dan ketersediaan alamat email pengguna.
5. Jumlah akun aktif dan pola penggunaan untuk uji kapasitas.
6. Kebijakan pelindungan data individu untuk tahap impor NIK dan data keluarga.

---

### 🎨 Tahapan Khusus: Penentuan Visual UI/UX

1. **Unggah Referensi:** Silakan unggah referensi gambaran aplikasi, skema warna, dan karakteristik UI/UX yang diinginkan untuk website ini.
2. **Jika Belum Ada Gambaran:**
   - **COPY** seluruh teks dokumen PRD FINAL di atas.
   - Buka **Google Stitch**, lalu **PASTE** hasil PRD tadi ke dalamnya.
   - Cek dan unduh hasil visualisasi UI/UX yang dibuat Google Stitch.
   - Unggah kembali file gambar hasil UI/UX tersebut ke percakapan ini untuk dibedah dan diterapkan model desainnya.
