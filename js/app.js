(() => {
  'use strict';

  const EXERCISES = window.LUGHATI_EXERCISES || [];
  const STORAGE_KEY = 'lughati-progress-v1';
  const LETTERS = ['A', 'B', 'C', 'D'];
  const state = {
    view: 'home',
    search: '',
    category: 'Semua',
    activeExercise: null,
    questionIndex: 0,
    answers: [],
    feedbackVisible: false,
    showTranslation: false,
    sessionResult: null
  };

  let progress = loadProgress();
  let toastTimeout;

  const appView = document.getElementById('appView');
  const pageTitle = document.getElementById('pageTitle');
  document.getElementById('yearNow').textContent = new Date().getFullYear();

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        attempts: Array.isArray(saved.attempts) ? saved.attempts : [],
        bestScores: saved.bestScores && typeof saved.bestScores === 'object' ? saved.bestScores : {}
      };
    } catch (error) {
      return { attempts: [], bestScores: {} };
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      showToast('Progres belum dapat disimpan di browser ini. Kamu masih bisa melanjutkan latihan.');
    }
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function getExercise(id) {
    return EXERCISES.find((exercise) => exercise.id === id);
  }

  function getCompletedCount() {
    return new Set(progress.attempts.map((attempt) => attempt.exerciseId)).size;
  }

  function getAverageScore() {
    if (!progress.attempts.length) return 0;
    const total = progress.attempts.reduce((sum, attempt) => sum + Number(attempt.score || 0), 0);
    return Math.round(total / progress.attempts.length);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3300);
  }

  function setPageTitle() {
    const titles = {
      home: 'Selamat datang di Lughati',
      listening: 'Latihan Menyimak',
      reading: 'Latihan Membaca',
      progress: 'Progres Belajar',
      quiz: state.activeExercise ? state.activeExercise.title : 'Latihan',
      result: 'Hasil Latihan'
    };
    pageTitle.textContent = titles[state.view] || 'Lughati';
  }

  function updateNavigation() {
    document.querySelectorAll('[data-view]').forEach((button) => {
      const buttonView = button.dataset.view;
      let active = buttonView === state.view;
      if (state.view === 'quiz' || state.view === 'result') {
        active = buttonView === (state.activeExercise ? state.activeExercise.type : 'home');
      }
      button.classList.toggle('active', active);
    });
  }

  function render() {
    setPageTitle();
    updateNavigation();
    if (state.view === 'home') appView.innerHTML = renderHome();
    else if (state.view === 'listening') appView.innerHTML = renderCatalog('listening');
    else if (state.view === 'reading') appView.innerHTML = renderCatalog('reading');
    else if (state.view === 'progress') appView.innerHTML = renderProgress();
    else if (state.view === 'quiz') appView.innerHTML = renderQuiz();
    else if (state.view === 'result') appView.innerHTML = renderResult();
    else appView.innerHTML = renderHome();
  }

  function renderHome() {
    const completed = getCompletedCount();
    const average = getAverageScore();
    const latest = [...progress.attempts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const latestExercise = latest ? getExercise(latest.exerciseId) : null;
    return `
      <section class="hero">
        <div class="hero-copy">
          <div class="hero-kicker"><span>✦</span> BELAJAR BAHASA ARAB DENGAN CARA BARU</div>
          <h2>Dengarkan. Baca. <span>Pahami.</span></h2>
          <p>Asah kemampuan menyimak dan membaca Bahasa Arab melalui materi singkat, percakapan, serta kuis dengan pembahasan yang mudah dipahami.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-view="listening">Mulai menyimak <span>↗</span></button>
            <button class="btn btn-light" data-view="reading">Jelajahi bacaan</button>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="art-orbit"></div>
          <div class="art-card"><div class="art-arabic">لُغَتِي</div><div class="art-caption">LEARN · PRACTICE</div></div>
          <div class="float-note note-one"><span class="float-symbol">♫</span> Latihan audio</div>
          <div class="float-note note-two"><span class="float-symbol">✓</span> Pahami konteks</div>
        </div>
      </section>

      <section class="stats-grid" aria-label="Ringkasan progres belajar">
        <div class="stat-card"><div class="stat-icon green">▤</div><div><strong class="stat-number">${completed}<span style="font-size:13px;color:#92777F;font-weight:500">/${EXERCISES.length}</span></strong><span class="stat-label">Materi diselesaikan</span></div></div>
        <div class="stat-card"><div class="stat-icon yellow">✦</div><div><strong class="stat-number">${average}%</strong><span class="stat-label">Rata-rata nilai latihan</span></div></div>
        <div class="stat-card"><div class="stat-icon blue">◷</div><div><strong class="stat-number">${progress.attempts.length}</strong><span class="stat-label">Total latihan dikerjakan</span></div></div>
      </section>

      <section>
        <div class="section-heading"><div><h2>Pilih cara belajarmu</h2><p>Latih dua keterampilan utama Bahasa Arab.</p></div></div>
        <div class="mode-grid">
          <article class="mode-card"><div class="mode-art listening">🎧</div><div><h3>Menyimak · الاستماع</h3><p>Dengarkan percakapan, tangkap informasi, lalu jawab pertanyaan.</p><button class="text-link" data-view="listening">Lihat latihan <span>→</span></button></div></article>
          <article class="mode-card"><div class="mode-art reading">📖</div><div><h3>Membaca · القراءة</h3><p>Pahami bacaan Arab, temukan ide pokok, dan pelajari kosakata.</p><button class="text-link" data-view="reading">Lihat bacaan <span>→</span></button></div></article>
        </div>
      </section>

      <section>
        <div class="section-heading"><div><h2>Mulai dari materi pilihan</h2><p>Materi singkat dengan konteks yang dekat dengan keseharian.</p></div><button class="text-link" data-view="home-catalog">Semua materi <span>→</span></button></div>
        <div class="exercise-grid">${EXERCISES.slice(0, 3).map(renderExerciseCard).join('')}</div>
      </section>
      ${latestExercise ? `<section class="progress-panel" style="margin-top:20px"><h2>Latihan terakhir</h2><p>Kamu terakhir mengerjakan “${escapeHTML(latestExercise.title)}” dengan nilai ${latest.score}%.</p><button class="btn btn-outline" data-action="start-exercise" data-id="${escapeHTML(latest.exerciseId)}">Ulangi latihan <span>↻</span></button></section>` : ''}
    `;
  }

  function renderCatalog(type) {
    const isListening = type === 'listening';
    const title = isListening ? 'Latihan Menyimak' : 'Latihan Membaca';
    const subtitle = isListening
      ? 'Latih telinga untuk menangkap informasi penting dari percakapan dan audio berbahasa Arab.'
      : 'Baca teks berbahasa Arab, temukan gagasan utama, dan pahami makna kata sesuai konteks.';
    const symbol = isListening ? '🎧' : '📖';
    return `
      <section class="catalog-head"><div><p class="eyebrow">KATALOG LATIHAN</p><h2>${title}</h2><p>${subtitle}</p></div><div class="catalog-symbol" aria-hidden="true">${symbol}</div></section>
      <section class="catalog-tools">
        <label class="search-box"><span aria-hidden="true">⌕</span><input id="searchInput" type="search" value="${escapeHTML(state.search)}" placeholder="Cari judul atau topik materi…" autocomplete="off" aria-label="Cari materi"></label>
        <div class="filter-row" aria-label="Filter kategori">${['Semua', 'Dialog', 'Cerita', 'Deskriptif', 'Informatif'].map((category) => `<button class="filter-chip ${state.category === category ? 'active' : ''}" data-category="${category}">${category}</button>`).join('')}</div>
      </section>
      <p class="result-count" id="resultCount"></p>
      <div class="exercise-grid" id="exerciseGrid">${renderCatalogGrid(type)}</div>
    `;
  }

  function renderCatalogGrid(type) {
    const query = state.search.trim().toLocaleLowerCase('id');
    const filtered = EXERCISES.filter((exercise) => {
      const matchesType = exercise.type === type;
      const matchesCategory = state.category === 'Semua' || exercise.category === state.category;
      const haystack = `${exercise.title} ${exercise.arabicTitle} ${exercise.description} ${exercise.category}`.toLocaleLowerCase('id');
      return matchesType && matchesCategory && (!query || haystack.includes(query));
    });
    const countLabel = `${filtered.length} materi tersedia`;
    const countElement = document.getElementById('resultCount');
    if (countElement) countElement.textContent = countLabel;
    if (!filtered.length) return `<div class="empty-state"><div class="empty-icon">⌕</div><strong>Materi belum ditemukan</strong><p>Coba kata kunci atau kategori lain.</p></div>`;
    return filtered.map(renderExerciseCard).join('');
  }

  function renderExerciseCard(exercise) {
    const completed = progress.attempts.some((attempt) => attempt.exerciseId === exercise.id);
    const questionCount = exercise.questions.length;
    return `
      <article class="exercise-card">
        <div class="exercise-art ${escapeHTML(exercise.art)}">
          <span class="exercise-type">${escapeHTML(exercise.category.toUpperCase())}</span>
          ${completed ? '<span class="completed-tag">✓ Pernah dicoba</span>' : ''}
          <div class="exercise-emoji" aria-hidden="true">${escapeHTML(exercise.icon)}</div>
        </div>
        <div class="exercise-body">
          <div class="exercise-meta"><span><i class="level-dot"></i>${escapeHTML(exercise.level)}</span><span>◷ ${escapeHTML(exercise.duration)}</span></div>
          <h3>${escapeHTML(exercise.title)}</h3>
          <span class="arabic-title" lang="ar" dir="rtl">${escapeHTML(exercise.arabicTitle)}</span>
          <p>${escapeHTML(exercise.description)}</p>
          <div class="exercise-bottom"><span class="question-count">${questionCount} pertanyaan</span><button class="btn btn-green" data-action="start-exercise" data-id="${escapeHTML(exercise.id)}">Mulai <span>→</span></button></div>
        </div>
      </article>
    `;
  }

  function renderQuiz() {
    const exercise = state.activeExercise;
    if (!exercise) return renderHome();
    const question = exercise.questions[state.questionIndex];
    const total = exercise.questions.length;
    const progressPercent = ((state.questionIndex + (state.feedbackVisible ? 1 : 0)) / total) * 100;
    const selected = state.answers[state.questionIndex];
    const isListening = exercise.type === 'listening';
    const mediaBlock = isListening ? `
      <div class="audio-panel">
        <button class="audio-play" data-action="play-audio" aria-label="Putar audio Bahasa Arab">▶</button>
        <div class="audio-copy"><strong>Dengarkan percakapan</strong><span>Tekan tombol putar. Kamu boleh mendengarkan lebih dari sekali.</span></div>
        <div class="audio-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>
      <p class="quiz-intro">Fokus pada kata kunci seperti nama orang, tempat, waktu, dan informasi yang disebutkan.</p>
    ` : `
      <div class="passage-card">
        <div class="passage-label"><span>TEKS BACAAN</span><button class="small-toggle" data-action="toggle-translation">${state.showTranslation ? 'Sembunyikan arti' : 'Lihat arti teks'}</button></div>
        <p class="arabic-passage" lang="ar" dir="rtl">${escapeHTML(exercise.passage)}</p>
        ${state.showTranslation ? `<div class="translation"><strong>Terjemahan Indonesia</strong>${escapeHTML(exercise.translation)}</div>` : ''}
      </div>
      <p class="quiz-intro">Baca teks dengan saksama. Perhatikan informasi utama dan kata-kata yang membantu menemukan jawaban.</p>
    `;

    const options = question.options.map((option, index) => {
      let className = 'option-button';
      if (selected === index) className += ' selected';
      if (state.feedbackVisible && index === question.correct) className += ' correct';
      if (state.feedbackVisible && selected === index && selected !== question.correct) className += ' incorrect';
      return `<button class="${className}" data-action="choose-option" data-option-index="${index}" ${state.feedbackVisible ? 'disabled' : ''} aria-pressed="${selected === index}"><span class="option-letter">${LETTERS[index] || index + 1}</span><span>${escapeHTML(option)}</span></button>`;
    }).join('');

    const feedback = state.feedbackVisible ? `
      <div class="answer-feedback ${selected === question.correct ? 'correct' : 'incorrect'}">
        <strong>${selected === question.correct ? '✓ Jawaban kamu benar!' : '↗ Belum tepat, pelajari pembahasannya.'}</strong>
        ${escapeHTML(question.explanation)}
      </div>
    ` : '';
    const actionButton = state.feedbackVisible
      ? (state.questionIndex < total - 1
        ? `<button class="btn btn-green" data-action="next-question">Pertanyaan berikutnya <span>→</span></button>`
        : `<button class="btn btn-green" data-action="finish-quiz">Lihat hasil latihan <span>→</span></button>`)
      : `<button class="btn btn-green" data-action="check-answer" ${selected === null || selected === undefined ? 'disabled' : ''}>Periksa jawaban <span>✓</span></button>`;

    return `
      <div class="quiz-topline"><button class="back-button" data-action="exit-quiz"><span>←</span> Kembali ke materi</button><span class="quiz-step">Pertanyaan ${state.questionIndex + 1} dari ${total}</span></div>
      <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${progressPercent}%"></div></div>
      <div class="quiz-layout">
        <section class="quiz-main-card">
          <div class="quiz-label"><span>${isListening ? '♫' : '▤'}</span> ${isListening ? 'LATIHAN MENYIMAK' : 'LATIHAN MEMBACA'}</div>
          <h2>${escapeHTML(exercise.title)}</h2>
          ${mediaBlock}
          <p class="question-number">PERTANYAAN ${String(state.questionIndex + 1).padStart(2, '0')}</p>
          <p class="question-text">${escapeHTML(question.prompt)}</p>
          <div class="options-list">${options}</div>
          ${feedback}
          <div class="quiz-actions"><span class="hint">${state.feedbackVisible ? 'Baca pembahasan sebelum melanjutkan.' : 'Pilih satu jawaban yang paling tepat.'}</span>${actionButton}</div>
        </section>
        <aside class="quiz-side-card">
          <h3 class="quiz-side-title">Panduan latihan</h3>
          <div class="quiz-side-art">${escapeHTML(exercise.icon)}</div>
          <h3>${escapeHTML(exercise.title)}</h3>
          <p>${escapeHTML(exercise.description)}</p>
          <div class="side-info"><div class="side-info-row"><span>Jenis materi</span><strong>${escapeHTML(exercise.category)}</strong></div><div class="side-info-row"><span>Tingkat</span><strong>${escapeHTML(exercise.level)}</strong></div><div class="side-info-row"><span>Jumlah soal</span><strong>${total} soal</strong></div></div>
        </aside>
      </div>
    `;
  }

  function finishQuiz() {
    const exercise = state.activeExercise;
    const total = exercise.questions.length;
    const correctCount = exercise.questions.reduce((count, question, index) => count + (state.answers[index] === question.correct ? 1 : 0), 0);
    const score = Math.round((correctCount / total) * 100);
    const attempt = {
      exerciseId: exercise.id,
      score,
      correctCount,
      total,
      date: new Date().toISOString()
    };
    progress.attempts.unshift(attempt);
    progress.attempts = progress.attempts.slice(0, 100);
    progress.bestScores[exercise.id] = Math.max(Number(progress.bestScores[exercise.id] || 0), score);
    saveProgress();
    state.sessionResult = attempt;
    state.view = 'result';
    render();
    appView.focus({ preventScroll: true });
  }

  function renderResult() {
    const exercise = state.activeExercise;
    const result = state.sessionResult;
    if (!exercise || !result) return renderHome();
    const message = result.score >= 85 ? 'Hebat! Pemahamanmu sangat baik.' : result.score >= 60 ? 'Bagus, terus berlatih agar semakin mantap.' : 'Jangan menyerah. Pelajari pembahasan lalu coba lagi.';
    const review = exercise.questions.map((question, index) => {
      const chosen = state.answers[index];
      const chosenText = chosen === null || chosen === undefined ? 'Tidak dijawab' : question.options[chosen];
      return `<article class="review-card"><h3>${index + 1}. ${escapeHTML(question.prompt)}</h3><p class="review-line"><strong>Jawaban kamu:</strong> ${escapeHTML(chosenText)}</p><p class="review-line"><strong>Kunci jawaban:</strong> ${escapeHTML(question.options[question.correct])}</p><p class="review-explanation"><strong>Pembahasan:</strong> ${escapeHTML(question.explanation)}</p></article>`;
    }).join('');
    const transcript = exercise.type === 'listening' ? `<section class="passage-card" style="margin-top:18px"><div class="passage-label"><span>TRANSKRIP AUDIO</span></div><p class="arabic-passage" lang="ar" dir="rtl">${escapeHTML(exercise.audioText)}</p><div class="translation"><strong>Terjemahan Indonesia</strong>${escapeHTML(exercise.translation)}</div></section>` : '';
    return `
      <section class="result-hero"><div><p class="result-kicker">LATIHAN SELESAI</p><h2>${result.score >= 85 ? 'مُمْتَاز! Luar biasa!' : result.score >= 60 ? 'أَحْسَنْتَ! Kerja bagus!' : 'تَعَلَّمْ وَتَقَدَّمْ'}</h2><p>${message} Kamu menjawab ${result.correctCount} dari ${result.total} pertanyaan dengan benar.</p></div><div class="score-circle"><strong>${result.score}</strong><span>SKOR</span></div></section>
      <section class="result-stats"><div class="result-stat"><span>Jawaban benar</span><strong>${result.correctCount}/${result.total}</strong></div><div class="result-stat"><span>Jawaban salah</span><strong>${result.total - result.correctCount}</strong></div><div class="result-stat"><span>Nilai akhir</span><strong>${result.score}%</strong></div></section>
      <section><div class="section-heading"><div><h2>Kunci jawaban & pembahasan</h2><p>Tinjau setiap jawaban untuk memahami alasan yang tepat.</p></div></div><div class="review-list">${review}</div>${transcript}<div class="result-actions"><button class="btn btn-green" data-action="retry-quiz">Ulangi latihan <span>↻</span></button><button class="btn btn-outline" data-action="back-to-catalog">Pilih materi lain <span>→</span></button><button class="btn btn-muted" data-view="progress">Lihat progres belajar</button></div></section>
    `;
  }

  function renderProgress() {
    const completed = getCompletedCount();
    const average = getAverageScore();
    const percent = Math.round((completed / Math.max(EXERCISES.length, 1)) * 100);
    const attempts = progress.attempts;
    const rows = attempts.length ? attempts.map((attempt) => {
      const exercise = getExercise(attempt.exerciseId);
      const date = new Date(attempt.date);
      const formattedDate = Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      return `<tr><td>${escapeHTML(exercise ? exercise.title : 'Materi tidak ditemukan')}</td><td>${escapeHTML(formattedDate)}</td><td>${attempt.correctCount}/${attempt.total}</td><td><span class="score-badge">${attempt.score}%</span></td></tr>`;
    }).join('') : `<tr><td colspan="4" style="text-align:center;padding:28px;color:#92777F">Belum ada latihan yang selesai. Mulai latihan pertama untuk mengisi riwayatmu.</td></tr>`;
    return `
      <section class="catalog-head"><div><p class="eyebrow">PERJALANAN BELAJARMU</p><h2>Progres Belajar</h2><p>Lihat materi yang sudah dicoba, rata-rata nilai, dan riwayat latihanmu.</p></div><div class="catalog-symbol">📈</div></section>
      <section class="progress-summary">
        <div class="progress-panel"><h2>Perkembangan materi</h2><p>Setiap materi yang kamu selesaikan akan tercatat di browser ini.</p><div class="progress-big"><strong>${percent}%</strong><span>${completed} dari ${EXERCISES.length} materi pernah dikerjakan</span></div><div class="progress-bar"><span style="width:${percent}%"></span></div><div class="progress-legend"><span>Mulai belajar</span><span>Target semua materi</span></div></div>
        <div class="progress-panel"><h2>Ringkasan latihan</h2><p>Catatan performa dari semua percobaan latihan.</p><div class="progress-mini-grid"><div class="progress-mini"><span>Total percobaan</span><strong>${attempts.length}</strong></div><div class="progress-mini"><span>Rata-rata nilai</span><strong>${average}%</strong></div><div class="progress-mini"><span>Nilai tertinggi</span><strong>${attempts.length ? Math.max(...attempts.map((attempt) => attempt.score)) : 0}%</strong></div><div class="progress-mini"><span>Materi dicoba</span><strong>${completed}/${EXERCISES.length}</strong></div></div></div>
      </section>
      <section class="progress-panel"><h2>Riwayat latihan</h2><p>Riwayat tersimpan secara lokal di browser dan tidak dikirim ke server.</p><div style="overflow-x:auto"><table class="history-table"><thead><tr><th>Materi</th><th>Tanggal</th><th>Benar</th><th>Nilai</th></tr></thead><tbody>${rows}</tbody></table></div></section>
      <div class="result-actions"><button class="btn btn-green" data-view="listening">Latihan menyimak</button><button class="btn btn-outline" data-view="reading">Latihan membaca</button><button class="btn btn-muted" data-action="reset-progress">Hapus riwayat lokal</button></div>
    `;
  }

  function startExercise(id) {
    const exercise = getExercise(id);
    if (!exercise) return showToast('Materi tidak ditemukan.');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    state.activeExercise = exercise;
    state.questionIndex = 0;
    state.answers = Array(exercise.questions.length).fill(null);
    state.feedbackVisible = false;
    state.showTranslation = false;
    state.sessionResult = null;
    state.view = 'quiz';
    render();
    appView.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function playAudio() {
    const exercise = state.activeExercise;
    if (!exercise || !exercise.audioText) return;
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      showToast('Browser ini belum mendukung pemutaran suara otomatis. Coba gunakan Chrome atau Edge versi terbaru.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(exercise.audioText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.78;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.onerror = () => showToast('Audio tidak dapat diputar. Periksa dukungan suara Bahasa Arab di perangkatmu.');
    window.speechSynthesis.speak(utterance);
    if (!arabicVoice) showToast('Audio diputar menggunakan suara yang tersedia. Jika pelafalan kurang tepat, aktifkan suara Bahasa Arab di pengaturan perangkat.');
  }

  document.addEventListener('click', (event) => {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) {
      const requestedView = viewButton.dataset.view;
      if (requestedView === 'home-catalog') {
        state.view = 'listening';
        state.category = 'Semua';
        state.search = '';
      } else {
        state.view = requestedView;
        if (['home', 'listening', 'reading', 'progress'].includes(requestedView)) {
          state.category = 'Semua';
          state.search = '';
        }
      }
      render();
      if (state.view === 'home-catalog') showToast('Pilih salah satu kategori latihan untuk mulai.');
      return;
    }

    const categoryButton = event.target.closest('[data-category]');
    if (categoryButton) {
      state.category = categoryButton.dataset.category;
      render();
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.action;

    if (action === 'start-exercise') startExercise(actionButton.dataset.id);
    else if (action === 'play-audio') playAudio();
    else if (action === 'toggle-translation') { state.showTranslation = !state.showTranslation; render(); }
    else if (action === 'choose-option') {
      if (!state.feedbackVisible) {
        state.answers[state.questionIndex] = Number(actionButton.dataset.optionIndex);
        render();
      }
    }
    else if (action === 'check-answer') {
      if (state.answers[state.questionIndex] === null || state.answers[state.questionIndex] === undefined) return showToast('Pilih satu jawaban terlebih dahulu.');
      state.feedbackVisible = true;
      render();
    }
    else if (action === 'next-question') {
      state.questionIndex += 1;
      state.feedbackVisible = false;
      state.showTranslation = false;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else if (action === 'finish-quiz') finishQuiz();
    else if (action === 'exit-quiz') {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      state.view = state.activeExercise ? state.activeExercise.type : 'home';
      state.search = '';
      state.category = 'Semua';
      render();
    }
    else if (action === 'retry-quiz') startExercise(state.activeExercise.id);
    else if (action === 'back-to-catalog') {
      state.view = state.activeExercise.type;
      state.search = '';
      state.category = 'Semua';
      render();
    }
    else if (action === 'reset-progress') {
      const confirmed = window.confirm('Hapus semua riwayat dan nilai latihan yang tersimpan di browser ini?');
      if (confirmed) {
        progress = { attempts: [], bestScores: {} };
        saveProgress();
        render();
        showToast('Riwayat latihan lokal telah dihapus.');
      }
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target && event.target.id === 'searchInput') {
      state.search = event.target.value;
      const type = state.view === 'reading' ? 'reading' : 'listening';
      const grid = document.getElementById('exerciseGrid');
      if (grid) grid.innerHTML = renderCatalogGrid(type);
    }
  });

  window.addEventListener('beforeunload', () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });

  render();
})();
