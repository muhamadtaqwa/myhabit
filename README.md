# MyHabit

> **Mobile-First Daily Habit & Task Tracker**  
> Dibangun dengan arsitektur modern **Laravel 12**, **Inertia.js v2**, **React 19**, dan **Tailwind CSS**.

Aplikasi pelacak kebiasaan dan tugas harian yang dirancang khusus untuk kenyamanan penggunaan smartphone (*thumb-friendly*), cepat, bebas emoji (*clean Lucide vector icons*), serta mengusung palet warna *Sky/Royal Blue* modern.

---

## Fitur Utama

### 1. 📅 Hari Ini (Daily Habit Tracker)
* **Status Seketika**: Menjawab langsung pertanyaan *"Hari ini sudah ngapain aja dan harus apa aja"* lewat tombol filter cepat **Belum** vs **Selesai**.
* **Progress Card Melayang**: Visualisasi persentase penyelesaian kebiasaan harian dengan gradasi biru modern.
* **Filter Waktu**: Pilah kebiasaan berdasarkan waktu (*Semua*, *Pagi*, *Siang*, *Malam*).
* **Date Strip 7 Hari**: Navigasi tanggal berbentuk kapsul interaktif.

### 2. 📝 Manajemen Tugas (To-Do List)
* Halaman khusus to-do list harian dengan pemisahan status pengerjaan.
* Tingkat prioritas (*Tinggi*, *Sedang*, *Rendah*) dengan badge warna dinamis.
* Pengaturan tenggat waktu (*due date*) dan pencatatan waktu selesai otomatis.

### 3. 📊 Statistik & Grafik Visual (Native SVG)
* **Grafik Batang Interaktif 7 Hari (*Weekly Bar Chart*)**: Menampilkan persentase pencapaian per hari, rata-rata mingguan, dan detail saat batang hari diketuk.
* **Grafik Donut Kategori (*Category Donut Chart*)**: Visualisasi proporsi kebiasaan per kategori.
* **Performa Tugas**: Ringkasan persentase dan rasio tugas selesai vs tertunda.
* **Kalkulasi Streak Otomatis**: Melacak *streak* aktif saat ini dan rekor *longest streak* sepanjang masa.

### 4. ⚙️ Manajemen Kebiasaan (Kelola)
* Buat, edit, arsip, dan pulihkan kebiasaan dengan aman.
* Dialog formulir *bottom-drawer* modern untuk kemudahan penggunaan satu tangan.

### 5. 🌓 Mode Gelap & Terang (Dual Theme)
* Switch instan tema Gelap (*Dark Mode*) dan Terang (*Light Mode*) dengan penyimpanan preferensi otomatis di browser.

### 6. 🔔 Notifikasi Bersih (react-hot-toast)
* Umpan balik notifikasi melayang dengan ikon vektor Lucide (100% tanpa emoji).

---

## Tech Stack

* **Backend**: Laravel 12.x (PHP 8.2+), Eloquent ORM, MariaDB / MySQL
* **Frontend**: Inertia.js v2, React 19, Tailwind CSS v3
* **Komponen & UI**: Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`), Lucide React
* **Notifikasi**: `react-hot-toast`
* **Build Tool**: Vite 7

---

## Panduan Instalasi & Menjalankan Lokal

### 1. Clone & Masuk ke Folder Proyek
```bash
git clone <URL_REPOSITORY>
cd myhabit
```

### 2. Instal Dependensi
```bash
composer install
npm install
```

### 3. Konfigurasi Lingkungan (.env)
Salin file `.env.example` menjadi `.env`, lalu sesuaikan konfigurasi database:
```bash
cp .env.example .env
php artisan key:generate
```
Pastikan database MySQL/MariaDB bernama `myhabit` telah dibuat, lalu jalankan migrasi & seeder:
```bash
php artisan migrate --seed
```

### 4. Build Aset Frontend
```bash
npm run build
# Atau untuk mode development:
npm run dev
```

### 5. Jalankan Server
```bash
# Akses lokal laptop:
php artisan serve

# Atau akses dari HP (satu jaringan Wi-Fi):
php artisan serve --host=0.0.0.0 --port=8000
```

---

## Akun Demo Bawaan
* **Email**: `taqwa@myhabit.test`
* **Password**: `password123`

---

## Pengujian Otomatis (Automated Tests)
Proyek ini dilengkapi dengan 47 pengujian fitur dan unit komprehensif (142 asersi) mencakup alur autentikasi, manajemen habit, kalkulasi streak, to-do list, dan keamanan isolasi data antar pengguna:
```bash
php artisan test
```

---

## Lisensi
Proyek ini bersifat *open-source* di bawah lisensi [MIT](LICENSE).
