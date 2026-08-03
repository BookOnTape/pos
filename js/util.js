/* ------------------------------------------------------------------
   Small helpers: money, DOM, sound, speech, confetti
   ------------------------------------------------------------------ */

export const money = (cents) => `$${(cents / 100).toFixed(2)}`;

/* say it out loud the way a kid would read it: "three dollars and fifty cents" */
export const moneyWords = (cents) => {
  const d = Math.floor(cents / 100);
  const c = cents % 100;
  const dollars = `${d} dollar${d === 1 ? '' : 's'}`;
  if (!c) return dollars;
  if (!d) return `${c} cent${c === 1 ? '' : 's'}`;
  return `${dollars} and ${c} cent${c === 1 ? '' : 's'}`;
};

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

/* tiny element factory: h('div', {class:'x', onclick:fn}, 'text' | node | []) */
export function h(tag, props = {}, kids = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of [].concat(kids)) {
    if (kid === null || kid === undefined || kid === false) continue;
    node.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return node;
}

export const $ = (sel, root = document) => root.querySelector(sel);

/* ----------------------------- SOUND ----------------------------- */
let audioCtx = null;
const ctx = () => {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
};

const TONES = {
  tap: [[660, 0.05, 0]],
  add: [[720, 0.08, 0], [960, 0.1, 0.07]],
  back: [[420, 0.07, 0]],
  cash: [[880, 0.08, 0], [1180, 0.09, 0.08], [1480, 0.16, 0.16]],
  done: [[660, 0.1, 0], [830, 0.1, 0.09], [990, 0.1, 0.18], [1320, 0.26, 0.27]],
  nope: [[220, 0.16, 0]],
};

let soundOn = true;
export const setSound = (on) => { soundOn = on; };

export function play(name) {
  if (!soundOn) return;
  const spec = TONES[name];
  const ac = ctx();
  if (!spec || !ac) return;
  for (const [freq, dur, delay] of spec) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t0 = ac.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.18, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }
}

/* ----------------------------- SPEECH ----------------------------- */
let speechOn = true;
export const setSpeech = (on) => {
  speechOn = on;
  if (!on && window.speechSynthesis) window.speechSynthesis.cancel();
};

let voice = null;
function pickVoice() {
  if (!window.speechSynthesis) return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const en = voices.filter((v) => /^en/i.test(v.lang));
  const nice = en.find((v) => /samantha|karen|moira|google us english|zira|aria|jenny/i.test(v.name));
  return nice || en[0] || voices[0];
}
if (window.speechSynthesis) {
  voice = pickVoice();
  speechSynthesis.addEventListener?.('voiceschanged', () => { voice = pickVoice(); });
}

export function say(text, { now = true } = {}) {
  if (!speechOn || !text || !window.speechSynthesis) return;
  try {
    if (now) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.rate = 0.92;
    u.pitch = 1.05;
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  } catch { /* speech is a nice-to-have */ }
}

/* ---------------------------- CONFETTI ---------------------------- */
const CONFETTI_COLORS = ['#f0b429', '#4f9d7d', '#b8546b', '#4a86c4', '#c8813a', '#8a5a33'];

export function confetti(count = 60) {
  const host = document.getElementById('confetti');
  if (!host) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const bit = document.createElement('i');
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    bit.style.animationDuration = `${1.6 + Math.random() * 1.6}s`;
    bit.style.animationDelay = `${Math.random() * 0.5}s`;
    bit.style.transform = `rotate(${Math.random() * 360}deg)`;
    frag.append(bit);
  }
  host.append(frag);
  setTimeout(() => { host.innerHTML = ''; }, 4200);
}

/* ---------------------------- STORAGE ---------------------------- */
const KEY = 'sunny-pos-v1';

export function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch { /* private mode — the register still works, it just forgets */ }
}

/* make change with the fewest bills and coins */
export function makeChange(amount, denominations) {
  const out = [];
  let left = amount;
  for (const d of denominations) {
    const n = Math.floor(left / d.value);
    if (n > 0) {
      out.push({ ...d, count: n });
      left -= n * d.value;
    }
  }
  return out;
}
