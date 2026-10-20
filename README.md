# Lughati — Latihan Bahasa Arab

Aplikasi latihan Bahasa Arab untuk keterampilan menyimak (الاستماع) dan membaca (القراءة). Dibangun menggunakan HTML, CSS, dan JavaScript murni, sehingga tidak memerlukan Node.js atau proses build.

## Fitur
- Beranda dengan ringkasan progres.
- Katalog latihan menyimak dan membaca.
- Materi dialog, cerita, deskriptif, dan informatif.
- Soal pilihan ganda dengan pemeriksaan jawaban dan pembahasan.
- Audio Bahasa Arab menggunakan Speech Synthesis yang tersedia di browser/perangkat.
- Terjemahan bacaan dan transkrip audio pada halaman hasil.
- Riwayat latihan disimpan di `localStorage` browser.
- Tampilan responsif untuk laptop dan ponsel.

## Menjalankan di komputer
1. Ekstrak file ZIP.
2. Buka folder `lughati-arabic-learning`.
3. Klik dua kali `index.html`, atau buka melalui browser Chrome/Edge.
4. Untuk mengedit kode, buka folder proyek menggunakan Visual Studio Code.

Tidak ada `npm install` atau build command yang diperlukan.

## Upload ke GitHub
1. Masuk ke https://github.com dan buat repository baru, misalnya `lughati-arabic-learning`.
2. Ekstrak ZIP ini di komputer.
3. Di halaman repository GitHub, pilih **Add file → Upload files**.
4. Unggah isi folder proyek (termasuk `index.html`, `css`, `js`, `assets`, dan `README.md`).
5. Klik **Commit changes**.

## Deploy ke Netlify
1. Masuk ke https://app.netlify.com dan hubungkan akun GitHub.
2. Pilih **Add new site → Import an existing project**.
3. Pilih repository `lughati-arabic-learning`.
4. Karena aplikasi ini HTML statis, biarkan **Build command** kosong.
5. Isi **Publish directory** dengan `.` (titik) jika diminta.
6. Klik **Deploy site** dan tunggu sampai selesai.
7. Netlify akan memberikan alamat website yang bisa dibuka secara online.

Setiap perubahan yang di-push atau di-commit ke repository GitHub yang terhubung biasanya akan memicu deploy baru di Netlify.

## Menambah materi latihan
Edit file `js/exercises.js`. Salin salah satu objek latihan dan ubah `id` agar unik. Gunakan:
- `type`: `listening` atau `reading`.
- `category`: `Dialog`, `Cerita`, `Deskriptif`, atau `Informatif`.
- `audioText`: teks Arab yang dibacakan untuk latihan menyimak.
- `passage`: teks Arab untuk latihan membaca.
- `translation`: terjemahan bahasa Indonesia.
- `questions`: daftar soal; `correct` adalah indeks jawaban benar, dimulai dari `0`.

## Catatan audio
Audio awal menggunakan fitur text-to-speech browser. Suara dan kualitas pelafalan bergantung pada browser serta paket suara di perangkat. Untuk kualitas audio yang konsisten, langkah berikutnya adalah menambahkan rekaman MP3 asli ke `assets/audio` dan mengganti pemutarnya agar menggunakan file tersebut.

## Catatan penyimpanan
Riwayat disimpan di browser yang digunakan (`localStorage`), bukan pada akun atau server. Riwayat tidak otomatis tersinkronisasi antara perangkat yang berbeda.
