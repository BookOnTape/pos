/* ==================================================================
   Sunny Morning — Kid POS
   A pretend register: build a drink, ring it up, take the money,
   make change, and call the order out.
   ================================================================== */

import {
  SHOP, CATEGORIES, ITEMS, TEMPS, GROUPS, MONEY, stepKeysFor,
} from './menu.js';

import {
  money, moneyWords, esc, h, $, play, say, setSound, setSpeech,
  confetti, load, save, makeChange, englishVoices, setVoice, setRate, onVoicesReady,
} from './util.js';

/* ============================== STATE ============================== */

const saved = load();

const state = {
  cat: CATEGORIES[0].id,
  cart: [],
  seq: saved.seq || 1,
  orders: saved.orders || [],
  settings: Object.assign(
    { speech: true, sound: true, prices: true, voice: null, rate: 0.92 },
    saved.settings || {},
  ),
  builder: null,
  pay: null,
  customer: '',
};

setSpeech(state.settings.speech);
setSound(state.settings.sound);
setVoice(state.settings.voice);
setRate(state.settings.rate);

function persist() {
  save({ seq: state.seq, orders: state.orders, settings: state.settings });
}

const isPhone = () => window.matchMedia('(max-width: 900px)').matches;
const todayKey = () => new Date().toDateString();

/* ============================== SHEETS ============================== */

const overlay = $('#overlay');
const sheetHost = $('#sheet-host');
let overlayHandler = null;

function showOverlay(onClick) {
  overlayHandler = onClick;
  overlay.hidden = false;
}
function hideOverlay() {
  overlayHandler = null;
  overlay.hidden = true;
}
overlay.addEventListener('click', () => overlayHandler && overlayHandler());

function openSheet(node, { onClose } = {}) {
  closeCart();
  sheetHost.innerHTML = '';
  sheetHost.append(node);
  sheetHost.hidden = false;
  showOverlay(() => { if (onClose !== false) closeSheet(); });
}

/* the settings sheet subscribes to the device's voice list */
let voiceUnsub = null;

function closeSheet() {
  sheetHost.hidden = true;
  sheetHost.innerHTML = '';
  hideOverlay();
  voiceUnsub?.();
  voiceUnsub = null;
  state.builder = null;
  state.pay = null;
}

/** standard sheet shell */
function sheet({ emoji, title, sub, body, foot, wide, dots, closable = true }) {
  const head = h('div', { class: 'sheet-head' }, [
    emoji ? h('span', { class: 'h-emoji' }, emoji) : null,
    h('div', { class: 'h-text' }, [
      h('h2', {}, title),
      sub ? h('p', {}, sub) : null,
    ]),
    closable ? h('button', { class: 'x-btn', 'aria-label': 'Close', onclick: () => { play('back'); closeSheet(); } }, '✕') : null,
  ]);

  return h('div', { class: `sheet${wide ? ' wide' : ''}` }, [
    head,
    dots || null,
    h('div', { class: 'sheet-body' }, body),
    foot ? h('div', { class: 'sheet-foot' }, foot) : null,
  ]);
}

function bigBtn(label, emoji, onclick, opts = {}) {
  return h('button', {
    class: `big-btn${opts.variant ? ' ' + opts.variant : ''}${opts.narrow ? ' narrow' : ''}`,
    disabled: opts.disabled || false,
    onclick,
  }, [
    emoji ? h('span', { class: 'big-btn-emoji' }, emoji) : null,
    h('span', {}, label),
  ]);
}

/* ============================ MENU RENDER ============================ */

const catsEl = $('#cats');
const menuEl = $('#menu');

function renderCats() {
  catsEl.innerHTML = '';
  for (const c of CATEGORIES) {
    catsEl.append(h('button', {
      class: `cat ${c.color}`,
      role: 'tab',
      'aria-selected': String(state.cat === c.id),
      onclick: () => {
        state.cat = c.id;
        play('tap');
        say(c.name);
        renderCats();
        renderMenu();
        menuEl.scrollTop = 0;
      },
    }, [h('span', { class: 'e' }, c.emoji), h('span', {}, c.name)]));
  }
}

function renderMenu() {
  const cat = CATEGORIES.find((c) => c.id === state.cat);
  menuEl.innerHTML = '';
  for (const item of ITEMS.filter((i) => i.cat === state.cat)) {
    menuEl.append(h('button', {
      class: `tile ${cat.color}`,
      onclick: () => openBuilder(item),
    }, [
      h('span', { class: 'e' }, item.emoji),
      h('span', { class: 'n' }, item.name),
      state.settings.prices ? h('span', { class: 'p' }, money(item.price)) : null,
    ]));
  }
}

/* ============================== CART ============================== */

const cartLinesEl = $('#cart-lines');
const cartTotalEl = $('#cart-total');
const payBtn = $('#btn-pay');
const clearBtn = $('#btn-clear');
const fab = $('#fab');

const cartTotal = () => state.cart.reduce((sum, l) => sum + l.unit * l.qty, 0);
const cartCount = () => state.cart.reduce((sum, l) => sum + l.qty, 0);

function renderCart() {
  cartLinesEl.innerHTML = '';

  if (!state.cart.length) {
    cartLinesEl.append(h('div', { class: 'cart-empty' }, [
      h('div', { class: 'e' }, '🧺'),
      h('div', { class: 't' }, 'Tap a picture to start the order'),
    ]));
  }

  for (const line of state.cart) {
    cartLinesEl.append(h('div', { class: 'line' }, [
      h('span', { class: 'line-emoji' }, line.emoji),
      h('div', { class: 'line-body' }, [
        h('div', { class: 'line-name' }, line.name),
        line.opts.length ? h('div', { class: 'line-opts' }, line.opts.join(' · ')) : null,
      ]),
      h('div', { class: 'line-right' }, [
        h('div', { class: 'line-price' }, money(line.unit * line.qty)),
        h('button', {
          class: 'qty-btn remove', 'aria-label': `Take off the ${line.name}`,
          onclick: () => removeLine(line),
        }, '✕'),
      ]),
    ]));
  }

  const total = cartTotal();
  cartTotalEl.textContent = money(total);
  payBtn.disabled = !state.cart.length;
  clearBtn.hidden = !state.cart.length;

  $('#fab-count').textContent = String(cartCount());
  fab.querySelector('.fab-total').textContent = money(total);
  fab.hidden = !(isPhone() && state.cart.length);
}

function removeLine(line) {
  state.cart = state.cart.filter((l) => l !== line);
  play('back');
  renderCart();
}

/* Every order gets its own line, even two identical ones — so three
   people ordering the same drink read as three drinks, not "3 ×". */
function addToCart(line) {
  state.cart.push(line);
  renderCart();
}

function openCart() {
  if (!isPhone()) return;
  document.body.classList.add('cart-open');
  showOverlay(closeCart);
}
function closeCart() {
  document.body.classList.remove('cart-open');
  if (overlayHandler === closeCart) hideOverlay();
}

/* ============================= BUILDER ============================= */

/* Each item names a template in menu.js listing the questions it asks,
   so a juice never gets offered coffee syrup. */
function buildSteps(item) {
  const steps = [];

  for (const key of stepKeysFor(item)) {
    const group = GROUPS[key];
    if (!group) continue;

    const options = typeof group.options === 'function' ? group.options(item) : group.options;
    if (!options || !options.length) continue;
    // one temperature means there's nothing to ask — it gets preselected
    if (key === 'temp' && options.length < 2) continue;

    steps.push({
      key,
      q: group.q,
      sub: group.sub,
      multi: group.multi,
      required: group.required,
      when: group.when,
      options,
    });
  }

  steps.push({ key: 'review' });
  return steps;
}

function openBuilder(item) {
  const sel = {};
  if (item.temps && item.temps.length === 1) sel.temp = TEMPS[item.temps[0]];

  state.builder = { item, sel, steps: buildSteps(item), idx: 0, first: true };
  play('tap');
  renderBuilder();
}

const stepVisible = (step, sel) => !step.when || step.when(sel);

/* If a choice stops applying — going back and switching Iced to Hot, say —
   drop what was picked for it so it can't ride along on the ticket. */
function pruneHidden(b) {
  for (const s of b.steps) {
    if (s.when && !stepVisible(s, b.sel)) delete b.sel[s.key];
  }
}

function builderPrice(b) {
  let total = b.item.price;
  for (const v of Object.values(b.sel)) {
    for (const o of [].concat(v)) total += o.price || 0;
  }
  return total;
}

/* Read the answers back in the order they were asked. */
function builderOptionLabels(b) {
  const labels = [];
  const keys = ['temp', ...b.steps.map((s) => s.key)];
  for (const key of [...new Set(keys)]) {
    const v = b.sel[key];
    if (!v) continue;
    for (const o of [].concat(v)) labels.push(o.name);
  }
  return labels;
}

function moveTo(dir) {
  const b = state.builder;
  let i = b.idx + dir;
  while (i >= 0 && i < b.steps.length && !stepVisible(b.steps[i], b.sel)) i += dir;
  if (i < 0) { closeSheet(); return; }         // backed out of the first question
  b.idx = Math.min(i, b.steps.length - 1);
  renderBuilder();
}

function renderBuilder() {
  const b = state.builder;
  if (!b) return;
  const step = b.steps[b.idx];

  /* progress dots over the steps that actually apply */
  const visible = b.steps.filter((s) => stepVisible(s, b.sel));
  const pos = visible.indexOf(step);
  const dots = h('div', { class: 'steps' },
    visible.map((s, i) => h('span', { class: `dot${i < pos ? ' done' : ''}${i === pos ? ' now' : ''}` })));

  const spoken = [];
  if (b.first) spoken.push(b.item.name);

  let body, foot;

  if (step.key === 'review') {
    const labels = builderOptionLabels(b);
    const price = builderPrice(b);
    body = h('div', {}, [
      h('div', { class: 'done-hero' }, [
        h('div', { class: 'e' }, b.item.emoji),
        h('div', { class: 't' }, b.item.name),
        labels.length ? h('div', { class: 's' }, labels.join(' · ')) : null,
      ]),
      state.settings.prices ? h('div', { class: 'pay-total' }, [
        h('div', { class: 'lbl' }, 'That costs'),
        h('div', { class: 'amt' }, money(price)),
      ]) : null,
    ]);
    foot = [
      bigBtn('Back', '⬅️', () => { play('back'); moveTo(-1); }, { variant: 'secondary', narrow: true }),
      bigBtn('Add to Order', '✅', () => finishBuilder(), { variant: 'warm' }),
    ];
    spoken.push(`All done! ${b.item.name}. ${state.settings.prices ? moneyWords(price) : ''}`);
  } else {
    const chosen = b.sel[step.key];
    const isChosen = (o) => step.multi
      ? (chosen || []).some((c) => c.id === o.id)
      : chosen && chosen.id === o.id;

    body = h('div', {}, [
      h('div', { class: 'q' }, [step.q, step.sub ? h('small', {}, step.sub) : null]),
      h('div', { class: 'opts' }, step.options.map((o) => h('button', {
        class: 'opt',
        'aria-pressed': String(!!isChosen(o)),
        onclick: (ev) => pick(step, o, ev.currentTarget),
      }, [
        h('span', { class: 'e' }, o.emoji),
        h('span', { class: 'n' }, o.name),
        o.note ? h('span', { class: 'p' }, o.note) : null,
        o.price && state.settings.prices ? h('span', { class: 'p' }, `+${money(o.price)}`) : null,
      ]))),
    ]);

    const canGo = step.multi || !step.required || !!chosen;
    const nextBtn = bigBtn('Next', '➡️', () => { play('tap'); moveTo(1); }, { disabled: !canGo });
    b.nextBtn = nextBtn;
    foot = [
      bigBtn('Back', '⬅️', () => { play('back'); moveTo(-1); }, { variant: 'secondary', narrow: true }),
      nextBtn,
    ];
    spoken.push(step.q);
  }

  const node = sheet({
    emoji: b.item.emoji,
    title: b.item.name,
    sub: step.key === 'review' ? 'Check the order' : `Step ${pos + 1} of ${visible.length}`,
    dots,
    body,
    foot,
  });

  openSheet(node);
  say(spoken.join('. '));
  b.first = false;
}

/* Selecting patches the buttons in place — re-rendering the whole sheet
   would replay the pop-in animation on every tap. */
function pick(step, option, btn) {
  const b = state.builder;
  play('tap');
  say(option.name);

  if (step.multi) {
    const list = b.sel[step.key] || [];
    const on = list.some((c) => c.id === option.id);
    b.sel[step.key] = on ? list.filter((c) => c.id !== option.id) : [...list, option];
    btn.setAttribute('aria-pressed', String(!on));
    return;
  }

  b.sel[step.key] = option;
  pruneHidden(b);
  for (const other of btn.parentElement.children) other.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-pressed', 'true');
  if (b.nextBtn) b.nextBtn.disabled = false;

  // small pause so the checkmark is visible before moving on
  setTimeout(() => {
    if (state.builder === b && b.steps[b.idx] === step) moveTo(1);
  }, 420);
}

function finishBuilder() {
  const b = state.builder;
  addToCart({
    uid: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    itemId: b.item.id,
    name: b.item.name,
    emoji: b.item.emoji,
    opts: builderOptionLabels(b),
    unit: builderPrice(b),
    qty: 1,
  });

  play('add');
  say('Added to the order!');
  closeSheet();
  if (isPhone()) openCart();
}

/* ============================ NAME ENTRY ============================ */

const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

function openNameSheet() {
  state.customer = '';

  const display = h('div', { class: 'name-display' });
  const update = () => { display.textContent = state.customer; };

  const letterKey = (L) => h('button', {
    class: 'key',
    onclick: () => {
      if (state.customer.length >= 12) return;
      state.customer += L;
      play('tap');
      say(L);
      update();
    },
  }, L);

  const keys = h('div', { class: 'keys' }, [
    ...KEY_ROWS.map((row, i) => h('div', {
      class: 'keyrow',
      style: `--n:${row.length}`,
      dataset: { row: String(i) },
    }, row.split('').map(letterKey))),

    h('div', { class: 'keyrow actions', style: '--n:2' }, [
      h('button', {
        class: 'key',
        onclick: () => { if (state.customer) { state.customer += ' '; update(); } },
      }, 'Space'),
      h('button', {
        class: 'key',
        onclick: () => { state.customer = state.customer.slice(0, -1); play('back'); update(); },
      }, '⌫ Back'),
    ]),
  ]);

  openSheet(sheet({
    emoji: '🙋',
    title: 'Who is it for?',
    sub: 'Type their name, or skip it',
    body: h('div', {}, [display, keys]),
    foot: [
      bigBtn('Skip', '⏭️', () => { state.customer = ''; play('tap'); openPayChoice(); }, { variant: 'secondary', narrow: true }),
      bigBtn('Next', '➡️', () => { play('tap'); openPayChoice(); }, { variant: 'warm' }),
    ],
    wide: true,
  }));

  say('Who is this order for? Type their name.');
}

/* ============================== PAYMENT ============================== */

function openPayChoice() {
  const total = cartTotal();
  openSheet(sheet({
    emoji: '💰',
    title: 'Time to pay',
    sub: state.customer ? `Order for ${state.customer}` : 'How would they like to pay?',
    body: h('div', {}, [
      h('div', { class: 'pay-total' }, [
        h('div', { class: 'lbl' }, 'Total'),
        h('div', { class: 'amt' }, money(total)),
      ]),
      h('div', { class: 'pay-choice' }, [
        bigBtn('Cash', '💵', () => openCash(), { variant: 'warm' }),
        bigBtn('Card', '💳', () => openCard()),
      ]),
    ]),
    foot: [bigBtn('Back to Order', '⬅️', () => { play('back'); closeSheet(); }, { variant: 'secondary' })],
  }));
  say(`The total is ${moneyWords(total)}. Cash or card?`);
}

function openCash() {
  const total = cartTotal();
  state.pay = { total, given: [] };
  play('tap');
  renderCash();
  say(`Cash. They owe ${moneyWords(total)}. Tap the money.`);
}

function givenTotal() {
  return state.pay.given.reduce((s, m) => s + m.value, 0);
}

function renderCash() {
  const p = state.pay;

  const amtEl = h('div', { class: 'amt' });
  const hintEl = h('div', { class: 'hint' });
  const stackEl = h('div', { class: 'change-list' });
  const tender = h('div', { class: 'tender' }, [
    h('div', { class: 'lbl' }, 'Money on the counter'),
    amtEl, hintEl, stackEl,
  ]);

  const undoBtn = bigBtn('Undo', '↩️', () => {
    if (!p.given.length) return;
    p.given.pop();
    play('back');
    refresh();
  }, { variant: 'secondary', narrow: true });

  const changeBtn = bigBtn('Give Change', '✅', () => showChange(), { variant: 'warm' });

  /* patch the counter in place so tapping money doesn't rebuild the sheet */
  function refresh() {
    const given = givenTotal();
    const enough = given >= p.total;
    tender.className = `tender ${enough ? 'enough' : 'short'}`;
    amtEl.textContent = money(given);
    hintEl.textContent = enough
      ? (given === p.total ? 'Exactly right! 🎉' : `Give back ${money(given - p.total)}`)
      : `Still needs ${money(p.total - given)}`;
    undoBtn.disabled = !p.given.length;
    changeBtn.disabled = !enough;
    changeBtn.querySelector('span:last-child').textContent =
      given === p.total ? 'All Paid!' : 'Give Change';

    /* show what they handed over, so it can be counted again */
    stackEl.innerHTML = '';
    for (const m of MONEY) {
      const n = p.given.filter((g) => g.id === m.id).length;
      if (!n) continue;
      stackEl.append(h('span', { class: 'change-pill' }, `${m.emoji} ${n} × ${m.name}`));
    }
  }

  const grid = h('div', { class: 'money-grid' }, MONEY.map((m) => h('button', {
    class: `money ${m.kind}`,
    onclick: () => {
      p.given.push(m);
      play('tap');
      say(m.name);
      refresh();
    },
  }, [
    h('span', { class: 'e' }, m.emoji),
    h('span', { class: 'n' }, m.name),
    m.sub ? h('span', { class: 'p' }, m.sub) : null,
  ])));

  openSheet(sheet({
    emoji: '💵',
    title: `Total ${money(p.total)}`,
    sub: 'Tap the bills and coins they hand you',
    body: h('div', {}, [tender, grid]),
    foot: [undoBtn, changeBtn],
    wide: true,
  }));

  refresh();
}

function showChange() {
  const p = state.pay;
  const given = givenTotal();
  const change = given - p.total;
  const parts = makeChange(change, MONEY);
  play('cash');

  openSheet(sheet({
    emoji: '🪙',
    title: change ? 'Count the change' : 'Exact change!',
    sub: change ? `${money(given)} − ${money(p.total)}` : 'No change needed',
    body: h('div', {}, [
      h('div', { class: 'pay-total' }, [
        h('div', { class: 'lbl' }, 'Change back'),
        h('div', { class: 'amt' }, money(change)),
      ]),
      parts.length ? h('div', { class: 'change-list' }, parts.map((c) => h('span', { class: 'change-pill' }, [
        h('span', {}, c.emoji),
        h('span', {}, `${c.count} × ${c.name}`),
      ]))) : null,
    ]),
    foot: [
      bigBtn('Back', '⬅️', () => { play('back'); renderCash(); }, { variant: 'secondary', narrow: true }),
      bigBtn('Hand It Over', '🤝', () => completeOrder('Cash', given, change), { variant: 'warm' }),
    ],
  }));

  say(change
    ? `Give back ${moneyWords(change)}. ${parts.map((c) => `${c.count} ${c.name}`).join(', ')}`
    : 'Exact change. Nice counting!');
}

function openCard() {
  const total = cartTotal();
  play('tap');

  openSheet(sheet({
    emoji: '💳',
    title: 'Tap the card',
    sub: money(total),
    body: h('div', { class: 'card-anim' }, [
      h('div', { class: 'card' }, '💳'),
      h('div', { class: 'done-hero' }, [h('div', { class: 's' }, 'Waiting for the card…')]),
    ]),
    foot: [bigBtn('Cancel', '⬅️', () => { play('back'); openPayChoice(); }, { variant: 'secondary' })],
  }));
  say(`Tap the card to pay ${moneyWords(total)}`);

  setTimeout(() => {
    if (!sheetHost.querySelector('.card-anim')) return; // they backed out
    play('cash');
    openSheet(sheet({
      emoji: '✅',
      title: 'Approved!',
      sub: `${money(total)} paid by card`,
      body: h('div', { class: 'done-hero' }, [
        h('div', { class: 'e' }, '🎉'),
        h('div', { class: 't' }, 'Card approved'),
        h('div', { class: 's' }, 'No change needed'),
      ]),
      foot: [bigBtn('Finish Order', '🧾', () => completeOrder('Card', total, 0), { variant: 'warm' })],
    }));
    say('Approved! No change needed.');
  }, 1900);
}

/* ============================ ORDER DONE ============================ */

function completeOrder(method, paid, change) {
  const order = {
    no: state.seq,
    name: state.customer || '',
    items: state.cart.map((l) => ({ name: l.name, emoji: l.emoji, opts: l.opts, unit: l.unit, qty: l.qty })),
    total: cartTotal(),
    method,
    paid,
    change,
    at: new Date().toISOString(),
    day: todayKey(),
    status: 'new',
  };

  state.orders.unshift(order);
  state.seq += 1;
  state.cart = [];
  state.customer = '';
  persist();
  renderCart();
  updateOrdersBadge();

  play('done');
  confetti();
  showReceipt(order);
}

function receiptNode(order) {
  return h('div', { class: 'receipt' }, [
    h('h3', {}, SHOP.name),
    h('div', { class: 'sub' }, `${SHOP.tagline} · Order #${order.no}${order.name ? ` · ${esc(order.name)}` : ''}`),
    ...order.items.map((it) => h('div', { class: 'r-line' }, [
      h('span', {}, [
        h('span', {}, `${it.emoji} ${it.qty > 1 ? `${it.qty} × ` : ''}${it.name}`),
        it.opts.length ? h('span', { class: 'opts' }, it.opts.join(' · ')) : null,
      ]),
      h('span', {}, money(it.unit * it.qty)),
    ])),
    h('div', { class: 'r-tot' }, [h('span', {}, 'Total'), h('span', {}, money(order.total))]),
    h('div', { class: 'r-sub' }, [h('span', {}, `Paid (${order.method})`), h('span', {}, money(order.paid))]),
    order.change ? h('div', { class: 'r-sub' }, [h('span', {}, 'Change'), h('span', {}, money(order.change))]) : null,
  ]);
}

function showReceipt(order) {
  openSheet(sheet({
    emoji: '🧾',
    title: 'Order complete!',
    sub: `Order #${order.no}`,
    body: h('div', {}, [
      h('div', { class: 'done-hero' }, [
        h('div', { class: 'e' }, '🎉'),
        h('div', { class: 't' }, order.name ? `Thanks, ${esc(order.name)}!` : 'Thank you!'),
        h('div', { class: 's' }, 'Here is the receipt'),
      ]),
      receiptNode(order),
    ]),
    foot: [
      bigBtn('Orders', '📋', () => openOrders(), { variant: 'secondary', narrow: true }),
      bigBtn('Next Customer', '👋', () => { play('tap'); closeSheet(); }, { variant: 'warm' }),
    ],
  }));

  say(`Order number ${order.no} is ready to make${order.name ? ` for ${order.name}` : ''}. Thank you!`);
}

/* ============================== ORDERS ============================== */

const ordersCountEl = $('#orders-count');

function activeOrders() {
  return state.orders.filter((o) => o.status !== 'done');
}

function updateOrdersBadge() {
  const n = activeOrders().length;
  ordersCountEl.textContent = String(n);
  ordersCountEl.hidden = n === 0;
}

function openOrders() {
  const today = state.orders.filter((o) => o.day === todayKey());
  const sales = today.reduce((s, o) => s + o.total, 0);
  const active = activeOrders();

  const stats = h('div', { class: 'day-stats' }, [
    h('div', { class: 'stat' }, [h('div', { class: 'k' }, 'Orders today'), h('div', { class: 'v' }, String(today.length))]),
    h('div', { class: 'stat' }, [h('div', { class: 'k' }, 'Money made'), h('div', { class: 'v' }, money(sales))]),
  ]);

  const list = h('div', { class: 'ticket-list' }, active.length ? active.map((o) => h('div', {
    class: `ticket${o.status === 'ready' ? ' ready' : ''}`,
  }, [
    h('div', { class: 'ticket-top' }, [
      h('div', { class: 'ticket-no' }, `#${o.no}`),
      h('div', { class: 'ticket-who' }, o.name ? esc(o.name) : 'Walk-in'),
      h('div', { class: 'ticket-when' }, new Date(o.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })),
    ]),
    h('div', { class: 'ticket-items' }, o.items.map((it) => h('div', {}, [
      h('span', {}, `${it.emoji} ${it.qty > 1 ? `${it.qty} × ` : ''}${it.name}`),
      it.opts.length ? h('div', { class: 'o' }, it.opts.join(' · ')) : null,
    ]))),
    h('div', { class: 'ticket-foot' }, [
      o.status === 'new'
        ? bigBtn('Made It!', '✅', () => { o.status = 'ready'; play('add'); say(`Order ${o.no} is ready`); persist(); openOrders(); }, { variant: 'warm' })
        : bigBtn('Picked Up', '🤝', () => { o.status = 'done'; play('done'); persist(); updateOrdersBadge(); openOrders(); }),
    ]),
  ])) : [h('div', { class: 'cart-empty' }, [
    h('div', { class: 'e' }, '☀️'),
    h('div', { class: 't' }, 'No orders waiting. Nice work!'),
  ])]);

  openSheet(sheet({
    emoji: '📋',
    title: 'Orders',
    sub: 'Make the drinks, then hand them over',
    body: h('div', {}, [stats, list]),
    foot: [bigBtn('Back to Register', '⬅️', () => { play('tap'); closeSheet(); }, { variant: 'secondary' })],
    wide: true,
  }));
}

/* ============================= SETTINGS ============================= */

function toggleRow(label, hint, key, onChange) {
  const btn = h('button', {
    class: 'toggle',
    'aria-pressed': String(!!state.settings[key]),
    'aria-label': label,
    onclick: () => {
      state.settings[key] = !state.settings[key];
      btn.setAttribute('aria-pressed', String(state.settings[key]));
      persist();
      onChange && onChange(state.settings[key]);
    },
  });
  return h('div', { class: 'set-row' }, [
    h('div', { class: 'txt' }, [h('b', {}, label), h('small', {}, hint)]),
    btn,
  ]);
}

const SAMPLE = 'One large hot chocolate with whipped cream. That is four dollars and fifty cents.';

const SPEEDS = [
  { id: 'slow', name: 'Slow', rate: 0.75 },
  { id: 'normal', name: 'Normal', rate: 0.92 },
  { id: 'quick', name: 'Quick', rate: 1.1 },
];

/* The device supplies the voices, and they differ a lot in how natural
   they sound — so let a grown-up audition them and pick. */
function voiceRow() {
  const select = h('select', {
    class: 'select',
    'aria-label': 'Voice',
    onchange: (ev) => {
      state.settings.voice = ev.target.value || null;
      setVoice(state.settings.voice);
      persist();
      say(SAMPLE);
    },
  });

  const fill = (voices) => {
    select.innerHTML = '';
    if (!voices.length) {
      select.append(h('option', { value: '' }, 'No voices on this device'));
      select.disabled = true;
      return;
    }
    select.disabled = false;
    for (const v of voices) {
      select.append(h('option', {
        value: v.voiceURI,
        selected: state.settings.voice === v.voiceURI,
      }, `${v.name} (${v.lang})`));
    }
    // nothing chosen yet: show whichever one is actually in use
    if (!state.settings.voice) select.selectedIndex = 0;
  };

  fill(englishVoices());
  voiceUnsub?.();                     // drop the previous sheet's listener
  voiceUnsub = onVoicesReady(fill);   // the list loads async on some devices

  const speeds = h('div', { class: 'seg' }, SPEEDS.map((s) => {
    const btn = h('button', {
      class: 'seg-btn',
      'aria-pressed': String(Math.abs(state.settings.rate - s.rate) < 0.02),
      onclick: () => {
        state.settings.rate = s.rate;
        setRate(s.rate);
        persist();
        for (const other of speeds.children) other.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-pressed', 'true');
        say(SAMPLE);
      },
    }, s.name);
    return btn;
  }));

  return h('div', { class: 'set-block' }, [
    h('div', { class: 'set-block-head' }, [
      h('b', {}, 'Voice'),
      h('small', {}, 'Tap a name or speed to hear it'),
    ]),
    select,
    speeds,
    h('button', {
      class: 'ghost-btn wide',
      onclick: () => say(SAMPLE),
    }, '🔊 Say something'),
    h('p', { class: 'set-note' },
      'Only the voices installed on this device show up. On an iPad, '
      + 'Settings → Accessibility → Spoken Content → Voices lets you download '
      + 'better ones — the “Enhanced” and “Premium” voices sound much more human '
      + 'than the default.'),
  ]);
}

function openSettings() {
  play('tap');
  openSheet(sheet({
    emoji: '⚙️',
    title: 'Grown-up settings',
    sub: 'Tune the register',
    body: h('div', {}, [
      toggleRow('Read to me', 'Says the buttons out loud', 'speech', (on) => {
        setSpeech(on);
        syncSpeakChip();
        if (on) say('Reading is on');
      }),
      voiceRow(),
      toggleRow('Sounds', 'Beeps and ka-ching', 'sound', setSound),
      toggleRow('Show prices', 'Turn off for pure pretend play', 'prices', () => {
        renderMenu();
      }),
      h('div', { style: 'height:8px' }),
      bigBtn('Clear Today', '🧹', () => {
        if (!confirm('Clear all orders and start the day over?')) return;
        state.orders = [];
        state.seq = 1;
        persist();
        updateOrdersBadge();
        play('back');
        closeSheet();
      }, { variant: 'secondary' }),
    ]),
    foot: [bigBtn('Done', '👍', () => { play('tap'); closeSheet(); }, { variant: 'warm' })],
  }));
}

/* ============================== WIRING ============================== */

const speakChip = $('#btn-speak');

function syncSpeakChip() {
  speakChip.setAttribute('aria-pressed', String(state.settings.speech));
  speakChip.classList.toggle('is-on', state.settings.speech);
}

speakChip.addEventListener('click', () => {
  state.settings.speech = !state.settings.speech;
  setSpeech(state.settings.speech);
  syncSpeakChip();
  persist();
  play('tap');
  if (state.settings.speech) say('I will read the buttons for you');
});

$('#btn-orders').addEventListener('click', () => { play('tap'); openOrders(); });
$('#btn-settings').addEventListener('click', openSettings);
$('#btn-pay').addEventListener('click', () => {
  if (!state.cart.length) return;
  play('tap');
  openNameSheet();
});
$('#btn-clear').addEventListener('click', () => {
  if (!state.cart.length) return;
  state.cart = [];
  play('back');
  say('Starting over');
  renderCart();
  closeCart();
});
fab.addEventListener('click', () => { play('tap'); openCart(); });

window.addEventListener('resize', renderCart);

/* first tap unlocks audio on iOS */
window.addEventListener('pointerdown', function unlock() {
  play('tap');
  window.removeEventListener('pointerdown', unlock);
}, { once: true });

/* ============================== BOOT ============================== */

/* offline support once it has been opened one time */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    // sw.js sits one level up from js/, so it can control the whole app
    navigator.serviceWorker.register(new URL('../sw.js', import.meta.url)).catch(() => { /* fine without it */ });
  });
}

syncSpeakChip();
renderCats();
renderMenu();
renderCart();
updateOrdersBadge();
