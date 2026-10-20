/*
  Data latihan Lughati.
  Tambahkan materi baru dengan menyalin salah satu objek latihan di bawah ini.
  correct adalah nomor indeks jawaban yang benar, dimulai dari 0.
*/
window.LUGHATI_EXERCISES = [
  {
    id: 'listen-campus', type: 'listening', category: 'Dialog', level: 'Pemula', duration: '4 menit', icon: '🎓', art: 'mint',
    title: 'Percakapan di Kampus', arabicTitle: 'في الجامعة',
    description: 'Dua mahasiswa membicarakan jadwal kuliah dan ruang kelas.',
    audioText: 'السَّلَامُ عَلَيْكِ يَا مَرْيَمُ. وَعَلَيْكَ السَّلَامُ يَا أَحْمَدُ. هَلْ عِنْدَنَا مُحَاضَرَةٌ الْيَوْمَ؟ نَعَمْ، عِنْدَنَا مُحَاضَرَةُ اللُّغَةِ الْعَرَبِيَّةِ فِي السَّاعَةِ التَّاسِعَةِ صَبَاحًا، فِي الْفَصْلِ الثَّانِي.',
    translation: '“Assalamu’alaikum, Maryam.” “Wa’alaikumussalam, Ahmad.” “Apakah kita ada kuliah hari ini?” “Ya, kita ada kuliah Bahasa Arab pukul sembilan pagi di ruang kelas dua.”',
    questions: [
      { prompt: 'Di manakah percakapan tersebut kemungkinan terjadi?', options: ['Di pasar', 'Di kampus', 'Di rumah sakit', 'Di restoran'], correct: 1, explanation: 'Percakapan membahas kuliah, mata kuliah Bahasa Arab, dan ruang kelas. Kata مُحَاضَرَةٌ berarti kuliah.' },
      { prompt: 'Mata kuliah apa yang akan mereka ikuti?', options: ['Bahasa Inggris', 'Matematika', 'Bahasa Arab', 'Ilmu Pengetahuan'], correct: 2, explanation: 'Dalam audio disebutkan مُحَاضَرَةُ اللُّغَةِ الْعَرَبِيَّةِ, yang berarti kuliah Bahasa Arab.' },
      { prompt: 'Pukul berapa kuliah dimulai?', options: ['Pukul tujuh pagi', 'Pukul delapan pagi', 'Pukul sembilan pagi', 'Pukul sepuluh pagi'], correct: 2, explanation: 'Ungkapan السَّاعَةِ التَّاسِعَةِ صَبَاحًا berarti pukul sembilan pagi.' }
    ]
  },
  {
    id: 'listen-market', type: 'listening', category: 'Dialog', level: 'Pemula', duration: '4 menit', icon: '🛍️', art: 'peach',
    title: 'Berbelanja di Pasar', arabicTitle: 'في السوق',
    description: 'Seorang pembeli bertanya harga buah kepada penjual.',
    audioText: 'صَبَاحُ الْخَيْرِ. كَمْ سِعْرُ التُّفَّاحِ؟ سِعْرُ الْكِيلُو عَشَرَةُ آلَافِ رُوبِيَّةٍ. أُرِيدُ كِيلُو وَاحِدًا مِنَ التُّفَّاحِ وَنِصْفَ كِيلُو مِنَ الْمَوْزِ، مِنْ فَضْلِكَ.',
    translation: '“Selamat pagi. Berapa harga apel?” “Harga satu kilogram sepuluh ribu rupiah.” “Saya ingin satu kilogram apel dan setengah kilogram pisang, tolong.”',
    questions: [
      { prompt: 'Apa yang ingin diketahui pembeli?', options: ['Warna buah', 'Harga apel', 'Nama penjual', 'Lokasi kebun'], correct: 1, explanation: 'Pembeli bertanya كَمْ سِعْرُ التُّفَّاحِ؟ yang berarti “Berapa harga apel?”' },
      { prompt: 'Berapa harga satu kilogram apel?', options: ['Lima ribu rupiah', 'Delapan ribu rupiah', 'Sepuluh ribu rupiah', 'Dua puluh ribu rupiah'], correct: 2, explanation: 'Penjual menyebutkan عَشَرَةُ آلَافِ رُوبِيَّةٍ, yaitu sepuluh ribu rupiah.' },
      { prompt: 'Buah apa saja yang dibeli?', options: ['Apel dan pisang', 'Jeruk dan mangga', 'Apel dan anggur', 'Pisang dan kurma'], correct: 0, explanation: 'Pembeli ingin membeli التُّفَّاحِ (apel) dan الْمَوْزِ (pisang).' }
    ]
  },
  {
    id: 'listen-health', type: 'listening', category: 'Informatif', level: 'Pemula', duration: '5 menit', icon: '💧', art: 'blue',
    title: 'Kebiasaan Hidup Sehat', arabicTitle: 'حياة صحية',
    description: 'Pesan singkat tentang minum air, olahraga, dan tidur.',
    audioText: 'الصِّحَّةُ مُهِمَّةٌ فِي حَيَاتِنَا. يَجِبُ أَنْ نَشْرَبَ الْمَاءَ كُلَّ يَوْمٍ، وَنُمَارِسَ الرِّيَاضَةَ، وَنَنَامَ مُبَكِّرًا. هَذِهِ الْعَادَاتُ تُسَاعِدُنَا عَلَى الْحِفَاظِ عَلَى الصِّحَّةِ.',
    translation: 'Kesehatan penting dalam kehidupan kita. Kita harus minum air setiap hari, berolahraga, dan tidur lebih awal. Kebiasaan-kebiasaan ini membantu kita menjaga kesehatan.',
    questions: [
      { prompt: 'Apa gagasan utama audio tersebut?', options: ['Cara berlibur', 'Pentingnya menjaga kesehatan', 'Kegiatan di sekolah', 'Cara memasak makanan'], correct: 1, explanation: 'Audio membahas beberapa kebiasaan untuk menjaga kesehatan, seperti minum air, olahraga, dan tidur cukup.' },
      { prompt: 'Apa yang dianjurkan dalam audio?', options: ['Tidur larut malam', 'Tidak berolahraga', 'Minum air setiap hari', 'Makan sekali sehari'], correct: 2, explanation: 'Kalimat يَجِبُ أَنْ نَشْرَبَ الْمَاءَ كُلَّ يَوْمٍ berarti kita harus minum air setiap hari.' },
      { prompt: 'Apa makna kata الصِّحَّةُ?', options: ['Kesehatan', 'Perjalanan', 'Perpustakaan', 'Pekerjaan'], correct: 0, explanation: 'Kata الصِّحَّةُ berarti kesehatan.' }
    ]
  },
  {
    id: 'read-library', type: 'reading', category: 'Deskriptif', level: 'Pemula', duration: '4 menit', icon: '📚', art: 'lilac',
    title: 'Perpustakaan Sekolah', arabicTitle: 'مكتبة المدرسة',
    description: 'Deskripsi perpustakaan, koleksi buku, dan kegiatan siswa.',
    passage: 'مَكْتَبَةُ مَدْرَسَتِي كَبِيرَةٌ وَنَظِيفَةٌ. فِيهَا كَثِيرٌ مِنَ الْكُتُبِ وَالْمَجَلَّاتِ. يَذْهَبُ الطُّلَّابُ إِلَى الْمَكْتَبَةِ بَعْدَ الدَّرْسِ لِلْقِرَاءَةِ وَاسْتِعَارَةِ الْكُتُبِ. أَمِينُ الْمَكْتَبَةِ يُسَاعِدُ الطُّلَّابَ فِي اخْتِيَارِ الْكُتُبِ.',
    translation: 'Perpustakaan sekolahku besar dan bersih. Di dalamnya terdapat banyak buku dan majalah. Para siswa pergi ke perpustakaan setelah pelajaran untuk membaca dan meminjam buku. Pustakawan membantu siswa memilih buku.',
    questions: [
      { prompt: 'Apa yang dideskripsikan dalam teks?', options: ['Kantin sekolah', 'Perpustakaan sekolah', 'Taman kota', 'Ruang olahraga'], correct: 1, explanation: 'Kalimat pertama menyebutkan مَكْتَبَةُ مَدْرَسَتِي, artinya perpustakaan sekolahku.' },
      { prompt: 'Kapan siswa pergi ke perpustakaan?', options: ['Sebelum matahari terbit', 'Saat tengah malam', 'Setelah pelajaran', 'Saat libur panjang saja'], correct: 2, explanation: 'Frasa بَعْدَ الدَّرْسِ berarti setelah pelajaran.' },
      { prompt: 'Apa makna kata نَظِيفَةٌ dalam teks?', options: ['Bersih', 'Jauh', 'Ramai', 'Mahal'], correct: 0, explanation: 'Kata نَظِيفَةٌ berarti bersih. Kata ini menerangkan keadaan perpustakaan.' }
    ]
  },
  {
    id: 'read-clean-school', type: 'reading', category: 'Informatif', level: 'Pemula', duration: '5 menit', icon: '🌿', art: 'mint',
    title: 'Kebersihan di Sekolah', arabicTitle: 'النظافة في المدرسة',
    description: 'Teks informatif tentang menjaga ruang kelas dan lingkungan.',
    passage: 'النَّظَافَةُ مُهِمَّةٌ فِي الْمَدْرَسَةِ. يَجِبُ عَلَى كُلِّ طَالِبٍ أَنْ يَرْمِيَ النُّفَايَاتِ فِي سَلَّةِ الْمُهْمَلَاتِ. يَنْظُفُ الطُّلَّابُ الْفَصْلَ كُلَّ صَبَاحٍ، وَيَسْقُونَ النَّبَاتَاتِ فِي الْحَدِيقَةِ. الْمَدْرَسَةُ النَّظِيفَةُ تُسَاعِدُ عَلَى التَّعَلُّمِ بِرَاحَةٍ.',
    translation: 'Kebersihan penting di sekolah. Setiap siswa harus membuang sampah ke tempat sampah. Para siswa membersihkan kelas setiap pagi dan menyiram tanaman di taman. Sekolah yang bersih membantu proses belajar menjadi nyaman.',
    questions: [
      { prompt: 'Apa tujuan utama teks tersebut?', options: ['Mengajak menjaga kebersihan sekolah', 'Menjelaskan cara membeli buku', 'Menceritakan liburan siswa', 'Mendeskripsikan pasar'], correct: 0, explanation: 'Teks menjelaskan kebiasaan menjaga kebersihan dan manfaat lingkungan sekolah yang bersih.' },
      { prompt: 'Di mana siswa harus membuang sampah?', options: ['Di halaman', 'Di bawah meja', 'Di tempat sampah', 'Di dalam tas'], correct: 2, explanation: 'Frasa فِي سَلَّةِ الْمُهْمَلَاتِ berarti di tempat sampah.' },
      { prompt: 'Kapan siswa membersihkan kelas?', options: ['Setiap malam', 'Setiap pagi', 'Setiap hari Minggu saja', 'Setiap akhir semester'], correct: 1, explanation: 'Ungkapan كُلَّ صَبَاحٍ berarti setiap pagi.' }
    ]
  },
  {
    id: 'read-beach-trip', type: 'reading', category: 'Cerita', level: 'Pemula', duration: '5 menit', icon: '🏝️', art: 'blue',
    title: 'Liburan ke Pantai', arabicTitle: 'رحلة إلى الشاطئ',
    description: 'Cerita pendek tentang keluarga yang berlibur pada hari Jumat.',
    passage: 'ذَهَبَتْ أُسْرَتِي إِلَى الشَّاطِئِ يَوْمَ الْجُمُعَةِ. خَرَجْنَا مِنَ الْبَيْتِ فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا. لَعِبَ أَخِي بِالْكُرَةِ، وَجَمَعَتْ أُخْتِي الأَصْدَافَ. أَمَّا أَنَا فَسَبَحْتُ مَعَ أَبِي. عُدْنَا إِلَى الْبَيْتِ قَبْلَ الْمَغْرِبِ وَنَحْنُ سُعَدَاءُ.',
    translation: 'Keluargaku pergi ke pantai pada hari Jumat. Kami berangkat dari rumah pukul tujuh pagi. Adikku bermain bola dan saudara perempuanku mengumpulkan kerang. Aku berenang bersama ayah. Kami pulang sebelum matahari terbenam dalam keadaan bahagia.',
    questions: [
      { prompt: 'Kapan keluarga dalam cerita pergi ke pantai?', options: ['Hari Senin', 'Hari Rabu', 'Hari Jumat', 'Hari Minggu'], correct: 2, explanation: 'Teks menyebutkan يَوْمَ الْجُمُعَةِ, yang berarti hari Jumat.' },
      { prompt: 'Pukul berapa mereka berangkat dari rumah?', options: ['Pukul enam pagi', 'Pukul tujuh pagi', 'Pukul sembilan pagi', 'Pukul dua siang'], correct: 1, explanation: 'Frasa فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا berarti pukul tujuh pagi.' },
      { prompt: 'Apa yang dilakukan tokoh “aku” di pantai?', options: ['Mengumpulkan kerang', 'Bermain bola', 'Membeli makanan', 'Berenang bersama ayah'], correct: 3, explanation: 'Kalimat سَبَحْتُ مَعَ أَبِي berarti “aku berenang bersama ayah”.' }
    ]
  }
];
