const TOTAL_SECONDS = 30 * 60; // overall quiz timer: 30 minutes

const state = {
  index: 0,
  score: 0,
  answers: [],
  overallTimeLeft: TOTAL_SECONDS,
  overallInterval: null,
  locked: false
};

const card = document.getElementById('card');
const brandStatus = document.getElementById('brandStatus');
const overallTimerEl = document.getElementById('overallTimer');
const overallTimerText = document.getElementById('overallTimerText');
const letters = ['A','B','C','D','E','F'];

function formatTime(sec){
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

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
      <button class="btn" id="startBtn">Start Quiz →</button>
    </div>
  `;
  document.getElementById('startBtn').addEventListener('click', startQuiz);
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
  // Mark current question as unanswered if not yet locked, then
  // mark every remaining question as not-attempted (ran out of time).
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

function renderResult(){
  brandStatus.textContent = 'Complete';
  overallTimerEl.classList.remove('active');
  clearInterval(state.overallInterval);

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
        <button class="btn ghost" id="restartBtn">Restart</button>
      </div>
    </div>
  `;
  document.getElementById('restartBtn').addEventListener('click', renderStart);
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

if(typeof QUIZ_DATA === 'undefined'){
  brandStatus.textContent = 'Error';
  card.innerHTML = `<div class="error-state">Could not find questions.js — make sure it is saved in the same folder as this file.</div>`;
}else{
  renderStart();
}