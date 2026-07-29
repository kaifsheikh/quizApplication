/* =========================================================
   FINAL script.js – with Login + One‑attempt logic
   ========================================================= */
const TOTAL_SECONDS = 30 * 60; // overall quiz timer: 30 minutes

const state = {
  index: 0,
  score: 0,
  answers: [],
  overallTimeLeft: TOTAL_SECONDS,
  overallInterval: null,
  locked: false,
  userName: ""          // stores user's name (comes from login)
};

const card = document.getElementById('card');
const brandStatus = document.getElementById('brandStatus');
const overallTimerEl = document.getElementById('overallTimer');
const overallTimerText = document.getElementById('overallTimerText');
const letters = ['A','B','C','D','E','F'];

/* ---------- Helper ---------- */
function formatTime(sec){
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ---------- Login screen ---------- */
function renderLogin(errorMsg = '') {
  brandStatus.textContent = 'Login';
  overallTimerEl.classList.remove('active');
  clearInterval(state.overallInterval);

  card.innerHTML = `
    <div class="login-box">
      <h2>Quiz Login</h2>
      ${errorMsg ? `<p class="login-error">${errorMsg}</p>` : ''}
      <input type="text" id="loginUsername" placeholder="Username" autocomplete="off">
      <input type="password" id="loginPassword" placeholder="Password">
      <button class="btn" id="loginBtn">Login</button>
    </div>
  `;

// Inside renderLogin() – button click handler mein yeh badlega:
document.getElementById('loginBtn').addEventListener('click', async () => {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!username || !password) {
    renderLogin('Please fill both fields.');
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (data.success) {
      // Check already completed
      if (localStorage.getItem(`quizCompleted_${username}`)) {
        renderLogin('You have already completed the quiz. Contact your teacher.');
        return;
      }
      // Login success
      sessionStorage.setItem('loggedInUser', username);
      state.userName = username;
      renderStart();
    } else {
      renderLogin('Invalid username or password.');
    }
  } catch (err) {
    renderLogin('Error connecting to server. Try again.');
  }
});
}

/* ---------- Start screen (after login) ---------- */
function renderStart(){
  brandStatus.textContent = 'Ready';
  overallTimerEl.classList.remove('active','warn','danger');
  clearInterval(state.overallInterval);

  const q = QUIZ_DATA.questions.length;
  card.innerHTML = `
    <div class="start">
      <div class="eyebrow">Timed Assessment</div>
      <h1>${escapeHtml(QUIZ_DATA.title)}</h1>
      <p>${escapeHtml(QUIZ_DATA.subtitle)}</p>
      <div class="meta-row">
        <div class="meta-chip">⟡ <b>${q}</b>&nbsp;questions</div>
        <div class="meta-chip">⏱ <b>30 min</b>&nbsp;total time</div>
        <div class="meta-chip">◆ Real-time&nbsp;scoring</div>
      </div>
      <p style="margin-top:12px; color:var(--muted);">Logged in as <b>${escapeHtml(state.userName)}</b></p>
      <button class="btn" id="startBtn">Start Quiz →</button>
    </div>
  `;

  document.getElementById('startBtn').addEventListener('click', () => {
    startQuiz();
  });
}

function startQuiz(){
  state.index = 0;
  state.score = 0;
  state.answers = [];
  state.overallTimeLeft = TOTAL_SECONDS;

  overallTimerEl.classList.add('active');
  overallTimerText.textContent = formatTime(state.overallTimeLeft);
  clearInterval(state.overallInterval);
  state.overallInterval = setInterval(tickOverall, 1000);

  renderQuestion();
}

function tickOverall(){
  state.overallTimeLeft--;
  overallTimerText.textContent = formatTime(state.overallTimeLeft);
  overallTimerEl.classList.remove('warn','danger');
  if(state.overallTimeLeft <= 60) overallTimerEl.classList.add('danger');
  else if(state.overallTimeLeft <= 300) overallTimerEl.classList.add('warn');

  if(state.overallTimeLeft <= 0){
    clearInterval(state.overallInterval);
    forceFinishOnTimeout();
  }
}

function forceFinishOnTimeout(){
  const total = QUIZ_DATA.questions.length;
  for(let i = state.answers.length; i < total; i++){
    const q = QUIZ_DATA.questions[i];
    state.answers.push({
      question: q.question,
      options: q.options,
      selected: null,
      correctIndex: q.correct,
      isCorrect: false,
      timedOut: true,
      difficulty: q.difficulty
    });
  }
  renderResult();
}

function renderQuestion(){
  brandStatus.textContent = `Q${state.index+1} of ${QUIZ_DATA.questions.length}`;
  state.locked = false;
  const total = QUIZ_DATA.questions.length;
  const q = QUIZ_DATA.questions[state.index];

  const segs = QUIZ_DATA.questions.map((_, i) => {
    if(i < state.index) return `<div class="seg done"></div>`;
    if(i === state.index) return `<div class="seg current"></div>`;
    return `<div class="seg"></div>`;
  }).join('');

  card.innerHTML = `
    <div class="progress-track">${segs}</div>
    <div class="qhead">
      <div class="qcount">QUESTION <b>${String(state.index+1).padStart(2,'0')}</b> / ${String(total).padStart(2,'0')}${q.difficulty ? `<span class="badge ${q.difficulty}">${q.difficulty}</span>` : ''}</div>
    </div>
    <div class="question">${escapeHtml(q.question)}</div>
    <div class="options" id="optionsWrap">
      ${q.options.map((opt, i) => `
        <button class="option" data-i="${i}">
          <span class="letter">${letters[i]}</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `).join('')}
    </div>
    <div class="footer-row">
      <div class="score-preview">SCORE&nbsp;<b>${state.score}</b>&nbsp;/&nbsp;${total}</div>
      <button class="btn" id="nextBtn" disabled>Next →</button>
    </div>
  `;

  document.querySelectorAll('.option').forEach(btn=>{
    btn.addEventListener('click', () => selectOption(parseInt(btn.dataset.i)));
  });
  document.getElementById('nextBtn').addEventListener('click', goNext);
}

function selectOption(i){
  if(state.locked) return;
  state.locked = true;

  const q = QUIZ_DATA.questions[state.index];
  const correctIndex = q.correct;
  const isCorrect = i === correctIndex;
  if(isCorrect) state.score++;

  state.answers.push({
    question: q.question,
    options: q.options,
    selected: i,
    correctIndex,
    isCorrect,
    timedOut: false,
    difficulty: q.difficulty
  });

  document.querySelectorAll('.option').forEach((btn, idx)=>{
    btn.disabled = true;
    if(idx === correctIndex) btn.classList.add('correct');
    if(idx === i && i !== correctIndex) btn.classList.add('incorrect');
    if(idx === i) btn.classList.add('selected');
  });

  document.querySelector('.score-preview').innerHTML =
    `SCORE&nbsp;<b>${state.score}</b>&nbsp;/&nbsp;${QUIZ_DATA.questions.length}`;

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = false;
  nextBtn.textContent = (state.index === QUIZ_DATA.questions.length - 1) ? 'See Result →' : 'Next →';
}

function goNext(){
  if(state.index < QUIZ_DATA.questions.length - 1){
    state.index++;
    renderQuestion();
  } else {
    clearInterval(state.overallInterval);
    renderResult();
  }
}

/* ========== PRINT TO PDF REPORT ========== */
function downloadReport() {
  const total = QUIZ_DATA.questions.length;
  const timeUsed = TOTAL_SECONDS - Math.max(state.overallTimeLeft, 0);
  const pct = Math.round((state.score / total) * 100);

  const reportHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quiz Report - ${escapeHtml(state.userName)}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', sans-serif;
          padding: 40px;
          color: #111;
          background: #fff;
          max-width: 720px;
          margin: 0 auto;
        }
        h1 { font-size: 28px; margin-bottom: 4px; }
        .meta { color: #555; margin-bottom: 20px; font-size: 14px; }
        .score-box {
          display: flex; gap: 20px;
          background: #f4f4f4; padding: 16px; border-radius: 8px;
          margin-bottom: 28px;
          font-size: 14px;
        }
        .score-box div span { font-weight: 700; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 13px; }
        th { background: #f9f9f9; }
        .correct { color: #2e7d32; font-weight: 600; }
        .wrong { color: #c62828; font-weight: 600; }
        .timeout { color: #e65100; font-weight: 600; }
        .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          background: #eee;
          margin-left: 6px;
        }
      </style>
    </head>
    <body>
      <h1>📋 Python Quiz Report</h1>
      <div class="meta">
        <strong>Name:</strong> ${escapeHtml(state.userName)}<br/>
        <strong>Date:</strong> ${new Date().toLocaleString()}<br/>
        <strong>Time Used:</strong> ${formatTime(timeUsed)}
      </div>
      <div class="score-box">
        <div>✅ Correct: <span>${state.score}</span></div>
        <div>❌ Wrong: <span>${state.answers.filter(a => !a.isCorrect && !a.timedOut).length}</span></div>
        <div>⏭️ Skipped: <span>${state.answers.filter(a => a.selected === null).length}</span></div>
        <div>📊 Score: <span>${pct}% (${state.score}/${total})</span></div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          ${state.answers.map((a, i) => {
            const answer = a.selected === null ? '— no answer —' : a.options[a.selected];
            const correct = a.options[a.correctIndex];
            let resultClass = '';
            let resultText = '';
            if (a.timedOut) {
              resultClass = 'timeout';
              resultText = 'Time out';
            } else if (a.isCorrect) {
              resultClass = 'correct';
              resultText = 'Correct';
            } else {
              resultClass = 'wrong';
              resultText = 'Wrong';
            }
            return `
              <tr>
                <td>${i+1}</td>
                <td>${escapeHtml(a.question)} <span class="badge">${a.difficulty}</span></td>
                <td>${escapeHtml(answer)}</td>
                <td>${escapeHtml(correct)}</td>
                <td class="${resultClass}">${resultText}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">Generated by Python Quiz App</p>
      <script>
        window.onload = () => window.print();
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) {
    alert('Please allow pop-ups for this site to download the report.');
    return;
  }
  printWindow.document.write(reportHTML);
  printWindow.document.close();
}

function renderResult(){
  brandStatus.textContent = 'Complete';
  overallTimerEl.classList.remove('active');
  clearInterval(state.overallInterval);

  // ⛔ Mark this user as completed – prevents reattempt
  const user = state.userName;
  localStorage.setItem(`quizCompleted_${user}`, 'true');

  const total = QUIZ_DATA.questions.length;
  const pct = Math.round((state.score / total) * 100);
  const wrong = state.answers.filter(a => !a.isCorrect && !a.timedOut).length;
  const skipped = state.answers.filter(a => a.selected === null).length;
  const timeUsed = TOTAL_SECONDS - Math.max(state.overallTimeLeft, 0);

  let verdict;
  if(pct === 100) verdict = "Perfect score. Nothing got past you.";
  else if(pct >= 80) verdict = "Strong result — solid Python fundamentals.";
  else if(pct >= 50) verdict = "Decent — a few gaps worth revisiting.";
  else verdict = "Rough round. Worth another attempt.";

  const R = 78;
  const circumference = 2 * Math.PI * R;
  const offset = circumference * (1 - state.score/total);

  card.innerHTML = `
    <div class="result">
      <div class="ring-big">
        <svg width="172" height="172" viewBox="0 0 172 172">
          <circle class="track" cx="86" cy="86" r="${R}"></circle>
          <circle class="fill" cx="86" cy="86" r="${R}"
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"></circle>
        </svg>
        <div class="ring-center">
          <div class="pct">${pct}%</div>
          <div class="frac mono">${state.score} / ${total} correct</div>
        </div>
      </div>
      <h2>Quiz complete</h2>
      <div class="verdict">${verdict} <span class="mono" style="color:var(--muted); font-size:12px;">· time used ${formatTime(timeUsed)}</span></div>
      <div class="stat-row">
        <div class="stat ok"><div class="n">${state.score}</div><div class="l">Correct</div></div>
        <div class="stat bad"><div class="n">${wrong}</div><div class="l">Wrong</div></div>
        <div class="stat skip"><div class="n">${skipped}</div><div class="l">Not answered</div></div>
      </div>
      <div class="review">
        ${state.answers.map((a, i) => `
          <div class="review-item ${a.isCorrect ? 'ok' : 'bad'}">
            <div class="rq">${i+1}. ${escapeHtml(a.question)}${a.difficulty ? `<span class="badge ${a.difficulty}">${a.difficulty}</span>` : ''}</div>
            <div class="ra">
              Your answer: <b>${a.selected === null ? '— no answer (time up)' : escapeHtml(a.options[a.selected])}</b>
              ${a.isCorrect ? '' : `&nbsp;·&nbsp;Correct: <b>${escapeHtml(a.options[a.correctIndex])}</b>`}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="actions">
        <button class="btn ghost" id="downloadBtn">📥 Download Report</button>
        <button class="btn ghost" id="logoutBtn">🔒 Logout</button>
      </div>
    </div>
  `;

  document.getElementById('downloadBtn').addEventListener('click', downloadReport);
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser');
    window.location.reload();  // goes back to login
  });
  // ❌ Restart button completely removed – student cannot retake
}

/* ==========================================
   Entry point – page load
   ========================================== */
if(typeof QUIZ_DATA === 'undefined'){
  brandStatus.textContent = 'Error';
  card.innerHTML = `<div class="error-state">Could not find questions.js — make sure it is saved in the same folder as this file.</div>`;
} else {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) {
    // Check if already completed
    if (localStorage.getItem(`quizCompleted_${loggedInUser}`)) {
      // Show completed message – cannot retake
      brandStatus.textContent = 'Completed';
      card.innerHTML = `
        <div class="login-box">
          <h2>Quiz Already Submitted</h2>
          <p>Hello <b>${escapeHtml(loggedInUser)}</b>, you have already completed the quiz.</p>
          <p style="color:var(--muted);">Contact your teacher if you think this is a mistake.</p>
          <button class="btn ghost" id="forceLogoutBtn">🔒 Logout</button>
        </div>
      `;
      document.getElementById('forceLogoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.reload();
      });
    } else {
      // Not yet completed, set name and go to start screen
      state.userName = loggedInUser;
      renderStart();
    }
  } else {
    // No login session – show login screen
    renderLogin();
  }
}