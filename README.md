# ☕ Sunny Morning — a pretend POS for kids

A make-believe all-day diner register, built for a five year old who is
just starting to read. Big pictures, big words, real-feeling orders.

Every screen pairs a **picture with a word**, and a **Read to Me** button says
the buttons out loud — so a new reader can run the whole shop alone, and
practice the words while doing it.

## What it does

**Take an order.** Eight menu sections — Coffee, Tea, Juice & Milk, Breakfast,
Lunch, Dinner, Sides, Desserts — with 104 items. Tapping one starts a
step-by-step builder that asks one question at a time, the way a server would.

Each item only asks what actually applies to it, so a coffee gets asked about
syrup and an orange juice doesn't:

- **Coffee & tea** — hot or iced, size, milk, syrups, sweetener, ice level,
  whipped cream / extra shot / cinnamon
- **Juice, milk, soda** — size, ice, straw, lid, lemon slice
- **Sandwiches & burgers** — bread, toasted, cheese, fixings, sauce, pick a side
- **Dinner plates** — how it's cooked, two sides
- **Salads & soups** — dressing, add-ons, cup or big bowl, crackers or a roll
- **Desserts** — scoops, ice cream flavor, cup or cone, sundae toppings;
  milkshakes get a flavor and a cherry on top
- Everything ends with for here or to go

Then it shows the order back with everything on it and the price, before it
goes on the ticket.

**One line per order.** Ordering the same thing three times gives three separate
lines on the tab, not "3 ×" — so when the whole family wants a milkshake, he can
see three milkshakes.

**Ring it up.** Type the customer's name on a big ABC keyboard (or skip it),
then take **cash** or **card**.

Cash is the good part: tap the bills and coins as they're handed over, watch the
"still needs $1.50" counter come down, and when there's enough, the register
counts the change back — "give back $0.50: 2 quarters". Coins show their value
(25¢, 10¢) to help with the math.

**Make the drinks.** Paid orders land on the Orders screen as tickets with every
option listed. Tap **Made It!**, then **Picked Up**. The day's order count and
takings sit at the top.

## Prices

Everything is round and easy to add up: drinks $1.00–$5.00, breakfast and lunch
$2.00–$7.00, dinner plates $8.00–$12.00, desserts $2.00–$6.00. Sizes are
+$0.00 / +$0.50 / +$1.00, syrups and alt milks +$0.50, extra shot +$0.75.
No tax, so the total is just the items.

## Grown-up settings (⚙️)

- **Read to me** — speech on or off
- **Voice** — pick from the voices installed on the device, and set the speed
  (slow / normal / quick). Tap to hear each one. On an iPad, *Settings →
  Accessibility → Spoken Content → Voices* downloads much better ones — the
  "Enhanced" and "Premium" voices sound far more human than the default robotic
  one
- **Sounds** — beeps and the ka-ching
- **Show prices** — hide them for pure pretend play, or keep them for money practice
- **Clear Today** — wipe the orders and start the day over

Orders and settings are saved in the browser, so closing the tab doesn't lose the day.

## Hosting

Pushing to `main` deploys to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**One-time setup, and it has to be done by hand:** repo **Settings → Pages →
Build and deployment → Source: GitHub Actions**. A workflow can't switch Pages
on for you — the create-a-Pages-site API rejects the `GITHUB_TOKEN` that Actions
hands the job, so the deploy fails with `Resource not accessible by integration`
until this is set.

While the repo is **private**, Pages needs a paid plan (Pro/Team/Enterprise).
On the free plan, make the repo public first — there's nothing private in here.

Then re-run the deploy: **Actions → Deploy to GitHub Pages → Run workflow**, or
just push to `main`. The URL shows up in the run summary and under Settings → Pages.

It's a static site — no server, no accounts, no data leaves the device.

### On a tablet

Open the page and use **Add to Home Screen**. It launches fullscreen like a real
register, and works with no wifi after the first visit (there's a service worker
caching the app).

### Running it locally

Any static file server works — it uses ES modules, so opening `index.html`
straight off the disk won't work:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| File | What's in it |
| --- | --- |
| `index.html` | The shell — header, category rail, menu grid, cart |
| `css/styles.css` | All the styling; every tap target is at least 56px |
| `js/menu.js` | The menu, the option groups, the templates, and the prices — **edit this to change the shop** |
| `js/app.js` | Register logic: cart, order builder, payment, tickets |
| `js/util.js` | Money formatting, speech, sounds, confetti, change-making |
| `sw.js` | Offline caching |

### Changing the menu

`js/menu.js` is plain data. Every item names a **template** — the list of
questions it asks when ordered. To add a drink:

```js
{ id: 'affogato', cat: 'sweets', name: 'Affogato', emoji: '🍨',
  price: 450, tpl: 'icecream', skip: ['servedin'] },
```

- `tpl` picks a question set from `TEMPLATES` (`coffee`, `juice`, `sandwich`,
  `burger`, `plate`, `salad`, `soup`, `icecream`, `shake`, `pie`, `plainfood`, …)
- `skip` drops individual questions from it — that's how espresso avoids being
  asked about milk
- `temps` lists allowed temperatures; with only one, it's chosen automatically
  and never asked

Each question lives in `GROUPS`, so adding a new one — say a pancake syrup
choice — means adding it there and naming it in a template.

Prices are in **cents** (`450` = $4.50) so the arithmetic never drifts.
