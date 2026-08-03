# ☕ Sunny Morning — a pretend POS for kids

A make-believe coffee & breakfast register, built for a five year old who is
just starting to read. Big pictures, big words, real-feeling orders.

Every screen pairs a **picture with a word**, and a **Read to Me** button says
the buttons out loud — so a new reader can run the whole shop alone, and
practice the words while doing it.

## What it does

**Take an order.** Four menu sections — Coffee, Tea, Juice & Milk, Breakfast —
with 40 items. Tapping one starts a step-by-step builder that asks one question
at a time, the way a barista would:

- Hot or Cold (only the ones that make sense — no iced cappuccino)
- Small / Medium / Large
- Milk: whole, 2%, oat, almond, soy, cream, or none
- Flavor syrups: vanilla, caramel, chocolate, hazelnut, strawberry, pumpkin,
  peppermint — pick as many as you like
- Sweetener: sugar, brown sugar, honey, sweetener, or none
- Ice: light, regular, extra, none — only asked for cold drinks
- Extras: whipped cream, extra shot, sprinkles, cinnamon, straw, lid
- Food: warm it up? butter, jam, cream cheese, peanut butter?
- For here or to go

Then it shows the drink back with everything on it and the price, before it
goes on the ticket.

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

Everything is round and easy to add up: drinks $1.00–$5.00, food $2.00–$6.00,
sizes +$0.00 / +$0.50 / +$1.00, syrups and alt milks +$0.50, extra shot +$0.75.
No tax, so the total is just the items.

## Grown-up settings (⚙️)

- **Read to me** — speech on or off
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
| `js/menu.js` | The menu, the options, and the prices — **edit this to change the shop** |
| `js/app.js` | Register logic: cart, order builder, payment, tickets |
| `js/util.js` | Money formatting, speech, sounds, confetti, change-making |
| `sw.js` | Offline caching |

### Changing the menu

`js/menu.js` is plain data. To add a drink:

```js
{ id: 'affogato', cat: 'coffee', name: 'Affogato', emoji: '🍨',
  price: 450, kind: 'drink', temps: ['hot'], milk: true, shots: true },
```

Prices are in **cents** (`450` = $4.50) so the arithmetic never drifts.
