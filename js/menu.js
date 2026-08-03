/* ------------------------------------------------------------------
   Sunny Morning Diner — menu, options, prices

   Prices are whole cents so the math never goes fuzzy.

   Each item names a TEMPLATE (`tpl`) — the list of questions to ask
   when it's ordered. That's why a coffee gets asked about syrup and an
   orange juice doesn't.
   ------------------------------------------------------------------ */

export const SHOP = {
  name: 'Sunny Morning',
  tagline: 'All-Day Diner',
  taxRate: 0, // kid math is friendlier without tax
};

export const CATEGORIES = [
  { id: 'coffee', name: 'Coffee', emoji: '☕', color: 'cat-coffee' },
  { id: 'tea', name: 'Tea', emoji: '🍵', color: 'cat-tea' },
  { id: 'cold', name: 'Juice & Milk', emoji: '🧃', color: 'cat-cold' },
  { id: 'breakfast', name: 'Breakfast', emoji: '🥐', color: 'cat-breakfast' },
  { id: 'lunch', name: 'Lunch', emoji: '🥪', color: 'cat-lunch' },
  { id: 'dinner', name: 'Dinner', emoji: '🍲', color: 'cat-dinner' },
  { id: 'sides', name: 'Sides', emoji: '🍟', color: 'cat-sides' },
  { id: 'sweets', name: 'Desserts', emoji: '🍨', color: 'cat-sweets' },
];

/* ==================================================================
   OPTION LISTS — every option is { id, name, emoji, price }
   ================================================================== */

export const TEMPS = {
  hot: { id: 'hot', name: 'Hot', emoji: '🔥', price: 0 },
  iced: { id: 'iced', name: 'Iced', emoji: '🧊', price: 0 },
  cold: { id: 'cold', name: 'Cold', emoji: '❄️', price: 0 },
};

const SIZES = [
  { id: 'small', name: 'Small', emoji: '🥃', price: 0, note: '8 oz' },
  { id: 'medium', name: 'Medium', emoji: '🥤', price: 50, note: '12 oz' },
  { id: 'large', name: 'Large', emoji: '🪣', price: 100, note: '16 oz' },
];

const MILKS = [
  { id: 'whole', name: 'Whole Milk', emoji: '🥛', price: 0 },
  { id: 'two', name: '2% Milk', emoji: '🥛', price: 0 },
  { id: 'oat', name: 'Oat Milk', emoji: '🌾', price: 50 },
  { id: 'almond', name: 'Almond Milk', emoji: '🌰', price: 50 },
  { id: 'soy', name: 'Soy Milk', emoji: '🌱', price: 50 },
  { id: 'cream', name: 'Cream', emoji: '🍦', price: 0 },
  { id: 'nomilk', name: 'No Milk', emoji: '🚫', price: 0 },
];

/* coffee-shop syrups — these belong on coffee and tea, NOT on juice */
const SYRUPS = [
  { id: 'vanilla', name: 'Vanilla', emoji: '🤍', price: 50 },
  { id: 'caramel', name: 'Caramel', emoji: '🍯', price: 50 },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', price: 50 },
  { id: 'hazelnut', name: 'Hazelnut', emoji: '🌰', price: 50 },
  { id: 'pumpkin', name: 'Pumpkin', emoji: '🎃', price: 50 },
  { id: 'peppermint', name: 'Peppermint', emoji: '🍬', price: 50 },
];

/* fruity syrups that make sense in lemonade or iced tea */
const FRUIT_SYRUPS = [
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', price: 50 },
  { id: 'peach', name: 'Peach', emoji: '🍑', price: 50 },
  { id: 'raspberry', name: 'Raspberry', emoji: '🫐', price: 50 },
  { id: 'cherry', name: 'Cherry', emoji: '🍒', price: 50 },
];

const SWEETENERS = [
  { id: 'nosugar', name: 'No Sugar', emoji: '🚫', price: 0 },
  { id: 'sugar', name: 'Sugar', emoji: '🍚', price: 0 },
  { id: 'brownsugar', name: 'Brown Sugar', emoji: '🟫', price: 0 },
  { id: 'honey', name: 'Honey', emoji: '🍯', price: 0 },
  { id: 'sweetener', name: 'Sweetener', emoji: '💙', price: 0 },
];

const ICE = [
  { id: 'lightice', name: 'Light Ice', emoji: '💧', price: 0 },
  { id: 'regice', name: 'Regular Ice', emoji: '🧊', price: 0 },
  { id: 'extraice', name: 'Extra Ice', emoji: '🏔️', price: 0 },
  { id: 'noice', name: 'No Ice', emoji: '🚫', price: 0 },
];

const COFFEE_EXTRAS = [
  { id: 'whip', name: 'Whipped Cream', emoji: '🍦', price: 50 },
  { id: 'shot', name: 'Extra Shot', emoji: '⚡', price: 75, needs: 'shots' },
  { id: 'cinnamon', name: 'Cinnamon', emoji: '🧂', price: 0 },
  { id: 'sprinkles', name: 'Sprinkles', emoji: '🌈', price: 0 },
  { id: 'lid', name: 'Lid', emoji: '⭕', price: 0 },
];

/* juice and water get a straw and a lid — no whipped cream, no espresso shot */
const CUP_EXTRAS = [
  { id: 'straw', name: 'Straw', emoji: '🥤', price: 0 },
  { id: 'lid', name: 'Lid', emoji: '⭕', price: 0 },
  { id: 'lemon', name: 'Lemon Slice', emoji: '🍋', price: 0 },
];

const SPREADS = [
  { id: 'butter', name: 'Butter', emoji: '🧈', price: 0 },
  { id: 'jam', name: 'Jam', emoji: '🍓', price: 50 },
  { id: 'creamcheese', name: 'Cream Cheese', emoji: '🧀', price: 50 },
  { id: 'peanutbutter', name: 'Peanut Butter', emoji: '🥜', price: 50 },
  { id: 'nospread', name: 'Nothing', emoji: '🚫', price: 0 },
];

const WARM = [
  { id: 'warmed', name: 'Warm It Up', emoji: '♨️', price: 0 },
  { id: 'roomtemp', name: 'Just Like That', emoji: '👌', price: 0 },
];

/* ---------------------- diner food options ---------------------- */

const BREADS = [
  { id: 'white', name: 'White Bread', emoji: '🍞', price: 0 },
  { id: 'wheat', name: 'Wheat Bread', emoji: '🌾', price: 0 },
  { id: 'sourdough', name: 'Sourdough', emoji: '🥖', price: 0 },
  { id: 'rye', name: 'Rye', emoji: '🍞', price: 0 },
  { id: 'bun', name: 'Soft Bun', emoji: '🥯', price: 0 },
  { id: 'wrap', name: 'Wrap', emoji: '🌯', price: 0 },
];

const TOASTED = [
  { id: 'toasted', name: 'Toasted', emoji: '🔥', price: 0 },
  { id: 'nottoasted', name: 'Not Toasted', emoji: '❄️', price: 0 },
];

const CHEESES = [
  { id: 'american', name: 'American', emoji: '🧀', price: 0 },
  { id: 'cheddar', name: 'Cheddar', emoji: '🧀', price: 0 },
  { id: 'swiss', name: 'Swiss', emoji: '🧀', price: 0 },
  { id: 'pepperjack', name: 'Pepper Jack', emoji: '🌶️', price: 0 },
  { id: 'nocheese', name: 'No Cheese', emoji: '🚫', price: 0 },
];

const FIXINGS = [
  { id: 'lettuce', name: 'Lettuce', emoji: '🥬', price: 0 },
  { id: 'tomato', name: 'Tomato', emoji: '🍅', price: 0 },
  { id: 'pickles', name: 'Pickles', emoji: '🥒', price: 0 },
  { id: 'onion', name: 'Onion', emoji: '🧅', price: 0 },
  { id: 'bacon', name: 'Bacon', emoji: '🥓', price: 100 },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', price: 100 },
];

const SAUCES = [
  { id: 'mayo', name: 'Mayo', emoji: '🥚', price: 0 },
  { id: 'mustard', name: 'Mustard', emoji: '💛', price: 0 },
  { id: 'ketchup', name: 'Ketchup', emoji: '🍅', price: 0 },
  { id: 'ranch', name: 'Ranch', emoji: '🤍', price: 0 },
  { id: 'bbq', name: 'BBQ Sauce', emoji: '🟤', price: 0 },
  { id: 'nosauce', name: 'No Sauce', emoji: '🚫', price: 0 },
];

const SIDE_CHOICES = [
  { id: 'sfries', name: 'Fries', emoji: '🍟', price: 0 },
  { id: 'schips', name: 'Chips', emoji: '🥔', price: 0 },
  { id: 'sfruit', name: 'Fruit', emoji: '🍇', price: 0 },
  { id: 'ssalad', name: 'Side Salad', emoji: '🥗', price: 0 },
  { id: 'sslaw', name: 'Coleslaw', emoji: '🥬', price: 0 },
  { id: 'srings', name: 'Onion Rings', emoji: '🧅', price: 100 },
  { id: 'smash', name: 'Mashed Potatoes', emoji: '🥔', price: 0 },
  { id: 'sveg', name: 'Broccoli', emoji: '🥦', price: 0 },
];

const COOKED = [
  { id: 'light', name: 'A Little Pink', emoji: '🌸', price: 0 },
  { id: 'medium', name: 'In the Middle', emoji: '🟠', price: 0 },
  { id: 'welldone', name: 'Well Done', emoji: '🟤', price: 0 },
];

const EGG_STYLES = [
  { id: 'scrambled', name: 'Scrambled', emoji: '🍳', price: 0 },
  { id: 'fried', name: 'Fried', emoji: '🍳', price: 0 },
  { id: 'overeasy', name: 'Over Easy', emoji: '🥚', price: 0 },
  { id: 'boiled', name: 'Hard Boiled', emoji: '🥚', price: 0 },
];

const BREAKFAST_MEATS = [
  { id: 'bacon', name: 'Bacon', emoji: '🥓', price: 0 },
  { id: 'sausage', name: 'Sausage', emoji: '🌭', price: 0 },
  { id: 'ham', name: 'Ham', emoji: '🍖', price: 0 },
  { id: 'nomeat', name: 'No Meat', emoji: '🚫', price: 0 },
];

const DRESSINGS = [
  { id: 'ranchd', name: 'Ranch', emoji: '🤍', price: 0 },
  { id: 'caesar', name: 'Caesar', emoji: '🧀', price: 0 },
  { id: 'italian', name: 'Italian', emoji: '🌿', price: 0 },
  { id: 'honeymustard', name: 'Honey Mustard', emoji: '🍯', price: 0 },
  { id: 'nodressing', name: 'No Dressing', emoji: '🚫', price: 0 },
];

const SALAD_ADDS = [
  { id: 'addchicken', name: 'Add Chicken', emoji: '🍗', price: 200 },
  { id: 'addegg', name: 'Add Egg', emoji: '🥚', price: 100 },
  { id: 'addcheese', name: 'Add Cheese', emoji: '🧀', price: 50 },
  { id: 'addcroutons', name: 'Croutons', emoji: '🍞', price: 0 },
];

const BOWL_SIZES = [
  { id: 'cup', name: 'Cup', emoji: '🥣', price: 0 },
  { id: 'bowl', name: 'Big Bowl', emoji: '🍲', price: 150 },
];

const SOUP_WITH = [
  { id: 'crackers', name: 'Crackers', emoji: '🧂', price: 0 },
  { id: 'roll', name: 'Warm Roll', emoji: '🥖', price: 0 },
  { id: 'soupcheese', name: 'Cheese on Top', emoji: '🧀', price: 50 },
];

const PASTA_SAUCES = [
  { id: 'marinara', name: 'Tomato Sauce', emoji: '🍅', price: 0 },
  { id: 'meatsauce', name: 'Meat Sauce', emoji: '🍖', price: 100 },
  { id: 'butterpasta', name: 'Butter', emoji: '🧈', price: 0 },
  { id: 'alfredo', name: 'Creamy Sauce', emoji: '🤍', price: 100 },
];

/* ------------------------- dessert options ------------------------- */

const SCOOPS = [
  { id: 'onescoop', name: 'One Scoop', emoji: '1️⃣', price: 0 },
  { id: 'twoscoop', name: 'Two Scoops', emoji: '2️⃣', price: 100 },
  { id: 'threescoop', name: 'Three Scoops', emoji: '3️⃣', price: 200 },
];

const ICE_CREAM_FLAVORS = [
  { id: 'icvanilla', name: 'Vanilla', emoji: '🤍', price: 0 },
  { id: 'icchocolate', name: 'Chocolate', emoji: '🍫', price: 0 },
  { id: 'icstrawberry', name: 'Strawberry', emoji: '🍓', price: 0 },
  { id: 'icmint', name: 'Mint Chip', emoji: '💚', price: 0 },
  { id: 'iccookies', name: 'Cookies & Cream', emoji: '🍪', price: 0 },
  { id: 'iccake', name: 'Birthday Cake', emoji: '🎂', price: 0 },
  { id: 'icbanana', name: 'Banana', emoji: '🍌', price: 0 },
  { id: 'iccoffee', name: 'Coffee', emoji: '☕', price: 0 },
];

const SERVED_IN = [
  { id: 'cup', name: 'In a Cup', emoji: '🥣', price: 0 },
  { id: 'cone', name: 'On a Cone', emoji: '🍦', price: 0 },
  { id: 'waffle', name: 'Waffle Cone', emoji: '🧇', price: 100 },
];

const SUNDAE_TOPPINGS = [
  { id: 'fudge', name: 'Hot Fudge', emoji: '🍫', price: 50 },
  { id: 'caramelt', name: 'Caramel', emoji: '🍯', price: 50 },
  { id: 'sprinklest', name: 'Sprinkles', emoji: '🌈', price: 0 },
  { id: 'whipt', name: 'Whipped Cream', emoji: '🍦', price: 0 },
  { id: 'cherryt', name: 'Cherry on Top', emoji: '🍒', price: 0 },
  { id: 'nuts', name: 'Nuts', emoji: '🥜', price: 50 },
  { id: 'banana', name: 'Banana', emoji: '🍌', price: 50 },
  { id: 'cookiecrumb', name: 'Cookie Crumbs', emoji: '🍪', price: 50 },
];

const SHAKE_EXTRAS = [
  { id: 'shakewhip', name: 'Whipped Cream', emoji: '🍦', price: 0 },
  { id: 'shakecherry', name: 'Cherry on Top', emoji: '🍒', price: 0 },
  { id: 'shakesprinkles', name: 'Sprinkles', emoji: '🌈', price: 0 },
  { id: 'shakestraw', name: 'Big Straw', emoji: '🥤', price: 0 },
  { id: 'malted', name: 'Make It Malted', emoji: '🥛', price: 50 },
];

const PIE_STYLE = [
  { id: 'pieplain', name: 'Just the Slice', emoji: '🥧', price: 0 },
  { id: 'alamode', name: 'With Ice Cream', emoji: '🍨', price: 100 },
  { id: 'piewhip', name: 'With Whipped Cream', emoji: '🍦', price: 50 },
];

export const FOR_HERE = [
  { id: 'here', name: 'For Here', emoji: '🪑', price: 0 },
  { id: 'togo', name: 'To Go', emoji: '🛍️', price: 0 },
];

/* ==================================================================
   OPTION GROUPS — one question each.
   `options` may be a function of the item.
   `when` hides the question based on earlier answers.
   ================================================================== */

export const GROUPS = {
  temp: { q: 'Hot or Cold?', required: true, options: (it) => (it.temps || []).map((t) => TEMPS[t]) },
  size: { q: 'What size?', required: true, options: SIZES },
  milk: { q: 'Which milk?', required: true, options: MILKS },
  syrup: { q: 'Add a syrup?', sub: 'Pick as many as you like', multi: true, options: SYRUPS },
  fruitsyrup: { q: 'Add a fruit flavor?', sub: 'Pick as many as you like', multi: true, options: FRUIT_SYRUPS },
  sweet: { q: 'Something sweet?', options: SWEETENERS },
  ice: {
    q: 'How much ice?', required: true, options: ICE,
    when: (sel) => !sel.temp || sel.temp.id !== 'hot',
  },
  coffeeextras: {
    q: 'Anything extra?', sub: 'Pick as many as you like', multi: true,
    options: (it) => COFFEE_EXTRAS.filter((e) => !e.needs || it[e.needs]),
  },
  cupextras: { q: 'Anything else?', sub: 'Pick as many as you like', multi: true, options: CUP_EXTRAS },

  warm: { q: 'Warm it up?', required: true, options: WARM },
  spread: { q: 'What goes on top?', required: true, options: SPREADS },

  bread: { q: 'Which bread?', required: true, options: BREADS },
  toasted: { q: 'Toasted?', required: true, options: TOASTED },
  cheese: { q: 'Which cheese?', required: true, options: CHEESES },
  fixings: { q: 'What goes on it?', sub: 'Pick as many as you like', multi: true, options: FIXINGS },
  sauce: { q: 'Any sauce?', sub: 'Pick as many as you like', multi: true, options: SAUCES },
  side: { q: 'Pick a side', required: true, options: SIDE_CHOICES },
  side2: { q: 'Another side?', options: SIDE_CHOICES },
  cooked: { q: 'How cooked?', required: true, options: COOKED },

  eggs: { q: 'How do you like the eggs?', required: true, options: EGG_STYLES },
  meat: { q: 'Which meat?', required: true, options: BREAKFAST_MEATS },

  dressing: { q: 'Which dressing?', required: true, options: DRESSINGS },
  saladadd: { q: 'Add anything?', sub: 'Pick as many as you like', multi: true, options: SALAD_ADDS },

  bowlsize: { q: 'Cup or big bowl?', required: true, options: BOWL_SIZES },
  soupwith: { q: 'What goes with it?', sub: 'Pick as many as you like', multi: true, options: SOUP_WITH },
  pastasauce: { q: 'Which sauce?', required: true, options: PASTA_SAUCES },

  scoops: { q: 'How many scoops?', required: true, options: SCOOPS },
  icflavor: { q: 'Which flavor?', required: true, options: ICE_CREAM_FLAVORS },
  servedin: { q: 'Cup or cone?', required: true, options: SERVED_IN },
  toppings: { q: 'Add toppings?', sub: 'Pick as many as you like', multi: true, options: SUNDAE_TOPPINGS },
  shakeflavor: { q: 'Which flavor?', required: true, options: ICE_CREAM_FLAVORS },
  shakeextras: { q: 'Anything on top?', sub: 'Pick as many as you like', multi: true, options: SHAKE_EXTRAS },
  piestyle: { q: 'How would you like it?', required: true, options: PIE_STYLE },

  where: { q: 'For here or to go?', required: true, options: FOR_HERE },
};

/* ==================================================================
   TEMPLATES — which questions each kind of item asks, in order.
   'where' is added to every item automatically.
   ================================================================== */

export const TEMPLATES = {
  coffee: ['temp', 'size', 'milk', 'syrup', 'sweet', 'ice', 'coffeeextras'],
  tea: ['temp', 'size', 'milk', 'syrup', 'sweet', 'ice', 'coffeeextras'],
  fruittea: ['temp', 'size', 'fruitsyrup', 'sweet', 'ice', 'cupextras'],
  juice: ['size', 'ice', 'cupextras'],           // no syrups, no whipped cream
  lemonade: ['size', 'fruitsyrup', 'sweet', 'ice', 'cupextras'],
  milkdrink: ['temp', 'size', 'milk', 'ice', 'cupextras'],
  cocoa: ['size', 'milk', 'toppings'],
  smoothie: ['size', 'shakeflavor', 'shakeextras'],

  pastry: ['warm', 'spread'],
  plainfood: [],
  eggplate: ['eggs', 'meat', 'side'],

  sandwich: ['bread', 'toasted', 'cheese', 'fixings', 'sauce', 'side'],
  burger: ['cooked', 'cheese', 'fixings', 'sauce', 'side'],
  handheld: ['fixings', 'sauce', 'side'],
  salad: ['dressing', 'saladadd'],
  soup: ['bowlsize', 'soupwith'],
  plate: ['side', 'side2'],
  steakplate: ['cooked', 'side', 'side2'],
  pasta: ['pastasauce', 'side'],

  icecream: ['scoops', 'icflavor', 'servedin', 'toppings'],
  sundae: ['icflavor', 'toppings'],
  shake: ['size', 'shakeflavor', 'shakeextras'],
  pie: ['warm', 'piestyle'],
  cake: ['piestyle'],
};

/* ==================================================================
   THE MENU
   tpl   — which template (question set) to use
   temps — allowed temperatures; one entry means it's never asked
   skip  — drop these questions from the template
   ================================================================== */

export const ITEMS = [
  // ---------------------------- COFFEE ----------------------------
  { id: 'drip', cat: 'coffee', name: 'Coffee', emoji: '☕', price: 200, tpl: 'coffee', temps: ['hot', 'iced'] },
  { id: 'latte', cat: 'coffee', name: 'Latte', emoji: '🥛', price: 400, tpl: 'coffee', temps: ['hot', 'iced'], shots: true },
  { id: 'cappuccino', cat: 'coffee', name: 'Cappuccino', emoji: '☕', price: 400, tpl: 'coffee', temps: ['hot'], shots: true },
  { id: 'flatwhite', cat: 'coffee', name: 'Flat White', emoji: '🤍', price: 400, tpl: 'coffee', temps: ['hot', 'iced'], shots: true },
  { id: 'mocha', cat: 'coffee', name: 'Mocha', emoji: '🍫', price: 450, tpl: 'coffee', temps: ['hot', 'iced'], shots: true },
  { id: 'americano', cat: 'coffee', name: 'Americano', emoji: '💧', price: 300, tpl: 'coffee', temps: ['hot', 'iced'], shots: true },
  { id: 'espresso', cat: 'coffee', name: 'Espresso', emoji: '⚡', price: 250, tpl: 'coffee', temps: ['hot'], shots: true, skip: ['milk', 'size'] },
  { id: 'macchiato', cat: 'coffee', name: 'Macchiato', emoji: '🌤️', price: 400, tpl: 'coffee', temps: ['hot', 'iced'], shots: true },
  { id: 'coldbrew', cat: 'coffee', name: 'Cold Brew', emoji: '🧊', price: 400, tpl: 'coffee', temps: ['iced'] },
  { id: 'decaf', cat: 'coffee', name: 'Decaf', emoji: '🌙', price: 200, tpl: 'coffee', temps: ['hot', 'iced'] },

  // ----------------------------- TEA -----------------------------
  { id: 'blacktea', cat: 'tea', name: 'Black Tea', emoji: '🫖', price: 250, tpl: 'tea', temps: ['hot', 'iced'] },
  { id: 'greentea', cat: 'tea', name: 'Green Tea', emoji: '🍃', price: 250, tpl: 'tea', temps: ['hot', 'iced'] },
  { id: 'mint', cat: 'tea', name: 'Mint Tea', emoji: '🌿', price: 250, tpl: 'fruittea', temps: ['hot', 'iced'] },
  { id: 'lemonginger', cat: 'tea', name: 'Lemon Ginger', emoji: '🍋', price: 250, tpl: 'fruittea', temps: ['hot', 'iced'] },
  { id: 'chai', cat: 'tea', name: 'Chai Latte', emoji: '🧡', price: 400, tpl: 'tea', temps: ['hot', 'iced'] },
  { id: 'matcha', cat: 'tea', name: 'Matcha Latte', emoji: '💚', price: 450, tpl: 'tea', temps: ['hot', 'iced'] },
  { id: 'berrytea', cat: 'tea', name: 'Berry Tea', emoji: '🫐', price: 300, tpl: 'fruittea', temps: ['hot', 'iced'] },

  // ------------------------- JUICE & MILK -------------------------
  { id: 'oj', cat: 'cold', name: 'Orange Juice', emoji: '🍊', price: 300, tpl: 'juice', temps: ['cold'] },
  { id: 'apple', cat: 'cold', name: 'Apple Juice', emoji: '🍎', price: 300, tpl: 'juice', temps: ['cold'] },
  { id: 'grape', cat: 'cold', name: 'Grape Juice', emoji: '🍇', price: 300, tpl: 'juice', temps: ['cold'] },
  { id: 'cranberry', cat: 'cold', name: 'Cranberry Juice', emoji: '🔴', price: 300, tpl: 'juice', temps: ['cold'] },
  { id: 'lemonade', cat: 'cold', name: 'Lemonade', emoji: '🍋', price: 300, tpl: 'lemonade', temps: ['cold'] },
  { id: 'milk', cat: 'cold', name: 'Milk', emoji: '🥛', price: 200, tpl: 'milkdrink', temps: ['hot', 'cold'] },
  { id: 'chocmilk', cat: 'cold', name: 'Chocolate Milk', emoji: '🐄', price: 300, tpl: 'milkdrink', temps: ['hot', 'cold'] },
  { id: 'hotchoc', cat: 'cold', name: 'Hot Chocolate', emoji: '🍫', price: 350, tpl: 'cocoa', temps: ['hot'] },
  { id: 'steamer', cat: 'cold', name: 'Steamer', emoji: '♨️', price: 300, tpl: 'tea', temps: ['hot'], skip: ['ice'] },
  { id: 'smoothie', cat: 'cold', name: 'Berry Smoothie', emoji: '🍓', price: 500, tpl: 'smoothie', temps: ['cold'] },
  { id: 'water', cat: 'cold', name: 'Water', emoji: '💦', price: 100, tpl: 'juice', temps: ['cold'] },
  { id: 'soda', cat: 'cold', name: 'Soda Pop', emoji: '🥤', price: 250, tpl: 'juice', temps: ['cold'] },

  // --------------------------- BREAKFAST ---------------------------
  { id: 'bagel', cat: 'breakfast', name: 'Bagel', emoji: '🥯', price: 300, tpl: 'pastry' },
  { id: 'croissant', cat: 'breakfast', name: 'Croissant', emoji: '🥐', price: 350, tpl: 'pastry' },
  { id: 'muffin', cat: 'breakfast', name: 'Muffin', emoji: '🧁', price: 300, tpl: 'pastry', skip: ['spread'] },
  { id: 'donut', cat: 'breakfast', name: 'Donut', emoji: '🍩', price: 200, tpl: 'plainfood' },
  { id: 'toast', cat: 'breakfast', name: 'Toast', emoji: '🍞', price: 200, tpl: 'pastry' },
  { id: 'oatmeal', cat: 'breakfast', name: 'Oatmeal', emoji: '🥣', price: 400, tpl: 'plainfood' },
  { id: 'parfait', cat: 'breakfast', name: 'Yogurt Parfait', emoji: '🍨', price: 450, tpl: 'plainfood' },
  { id: 'eggsandwich', cat: 'breakfast', name: 'Egg Sandwich', emoji: '🥪', price: 500, tpl: 'sandwich', skip: ['fixings'] },
  { id: 'pancakes', cat: 'breakfast', name: 'Pancakes', emoji: '🥞', price: 600, tpl: 'plainfood' },
  { id: 'waffle', cat: 'breakfast', name: 'Waffle', emoji: '🧇', price: 600, tpl: 'plainfood' },
  { id: 'frenchtoast', cat: 'breakfast', name: 'French Toast', emoji: '🍯', price: 600, tpl: 'plainfood' },
  { id: 'eggplate', cat: 'breakfast', name: 'Eggs & Toast', emoji: '🍳', price: 700, tpl: 'eggplate' },
  { id: 'burrito', cat: 'breakfast', name: 'Breakfast Burrito', emoji: '🌯', price: 600, tpl: 'handheld' },
  { id: 'biscuits', cat: 'breakfast', name: 'Biscuits & Gravy', emoji: '🥧', price: 600, tpl: 'plainfood' },
  { id: 'hashbrowns', cat: 'breakfast', name: 'Hash Browns', emoji: '🥔', price: 300, tpl: 'plainfood' },
  { id: 'fruitcup', cat: 'breakfast', name: 'Fruit Cup', emoji: '🍇', price: 300, tpl: 'plainfood' },

  // ----------------------------- LUNCH -----------------------------
  { id: 'grilledcheese', cat: 'lunch', name: 'Grilled Cheese', emoji: '🧀', price: 500, tpl: 'sandwich', skip: ['toasted', 'fixings'] },
  { id: 'hamsand', cat: 'lunch', name: 'Ham Sandwich', emoji: '🥪', price: 600, tpl: 'sandwich' },
  { id: 'turkeysand', cat: 'lunch', name: 'Turkey Sandwich', emoji: '🥪', price: 600, tpl: 'sandwich' },
  { id: 'tunasand', cat: 'lunch', name: 'Tuna Sandwich', emoji: '🐟', price: 600, tpl: 'sandwich' },
  { id: 'blt', cat: 'lunch', name: 'BLT', emoji: '🥓', price: 600, tpl: 'sandwich' },
  { id: 'pbj', cat: 'lunch', name: 'PB & Jelly', emoji: '🥜', price: 400, tpl: 'sandwich', skip: ['cheese', 'fixings', 'sauce', 'toasted'] },
  { id: 'club', cat: 'lunch', name: 'Club Sandwich', emoji: '🥪', price: 700, tpl: 'sandwich' },
  { id: 'hamburger', cat: 'lunch', name: 'Hamburger', emoji: '🍔', price: 600, tpl: 'burger', skip: ['cheese'] },
  { id: 'cheeseburger', cat: 'lunch', name: 'Cheeseburger', emoji: '🍔', price: 700, tpl: 'burger' },
  { id: 'chickensand', cat: 'lunch', name: 'Chicken Sandwich', emoji: '🍗', price: 700, tpl: 'sandwich' },
  { id: 'hotdog', cat: 'lunch', name: 'Hot Dog', emoji: '🌭', price: 400, tpl: 'handheld' },
  { id: 'quesadilla', cat: 'lunch', name: 'Quesadilla', emoji: '🫓', price: 500, tpl: 'handheld' },
  { id: 'tacos', cat: 'lunch', name: 'Tacos', emoji: '🌮', price: 600, tpl: 'handheld' },
  { id: 'gardensalad', cat: 'lunch', name: 'Garden Salad', emoji: '🥗', price: 500, tpl: 'salad' },
  { id: 'caesarsalad', cat: 'lunch', name: 'Caesar Salad', emoji: '🥬', price: 600, tpl: 'salad' },
  { id: 'chickensoup', cat: 'lunch', name: 'Chicken Noodle Soup', emoji: '🍜', price: 400, tpl: 'soup' },
  { id: 'tomatosoup', cat: 'lunch', name: 'Tomato Soup', emoji: '🍅', price: 400, tpl: 'soup' },
  { id: 'chili', cat: 'lunch', name: 'Chili', emoji: '🌶️', price: 500, tpl: 'soup' },
  { id: 'macncheese', cat: 'lunch', name: 'Mac & Cheese', emoji: '🧀', price: 500, tpl: 'plate', skip: ['side2'] },
  { id: 'grilledchickensalad', cat: 'lunch', name: 'Chicken Salad', emoji: '🍗', price: 700, tpl: 'salad' },

  // ----------------------------- DINNER -----------------------------
  { id: 'spaghetti', cat: 'dinner', name: 'Spaghetti', emoji: '🍝', price: 800, tpl: 'pasta' },
  { id: 'meatloaf', cat: 'dinner', name: 'Meatloaf', emoji: '🍖', price: 900, tpl: 'plate' },
  { id: 'roastchicken', cat: 'dinner', name: 'Roast Chicken', emoji: '🍗', price: 900, tpl: 'plate' },
  { id: 'friedchicken', cat: 'dinner', name: 'Fried Chicken', emoji: '🍗', price: 900, tpl: 'plate' },
  { id: 'fishchips', cat: 'dinner', name: 'Fish & Chips', emoji: '🐟', price: 900, tpl: 'plate' },
  { id: 'potroast', cat: 'dinner', name: 'Pot Roast', emoji: '🥘', price: 1000, tpl: 'plate' },
  { id: 'steak', cat: 'dinner', name: 'Steak', emoji: '🥩', price: 1200, tpl: 'steakplate' },
  { id: 'porkchop', cat: 'dinner', name: 'Pork Chop', emoji: '🍖', price: 1000, tpl: 'plate' },
  { id: 'turkeydinner', cat: 'dinner', name: 'Turkey Dinner', emoji: '🦃', price: 1000, tpl: 'plate' },
  { id: 'shepherds', cat: 'dinner', name: "Shepherd's Pie", emoji: '🥧', price: 900, tpl: 'plate', skip: ['side2'] },
  { id: 'salmon', cat: 'dinner', name: 'Salmon', emoji: '🐠', price: 1100, tpl: 'plate' },
  { id: 'veggieplate', cat: 'dinner', name: 'Veggie Plate', emoji: '🥕', price: 800, tpl: 'plate' },
  { id: 'lasagna', cat: 'dinner', name: 'Lasagna', emoji: '🍲', price: 900, tpl: 'plate', skip: ['side2'] },
  { id: 'pizza', cat: 'dinner', name: 'Personal Pizza', emoji: '🍕', price: 800, tpl: 'handheld', skip: ['sauce'] },

  // ----------------------------- SIDES -----------------------------
  { id: 'fries', cat: 'sides', name: 'French Fries', emoji: '🍟', price: 300, tpl: 'plainfood' },
  { id: 'onionrings', cat: 'sides', name: 'Onion Rings', emoji: '🧅', price: 400, tpl: 'plainfood' },
  { id: 'sidesalad', cat: 'sides', name: 'Side Salad', emoji: '🥗', price: 300, tpl: 'salad', skip: ['saladadd'] },
  { id: 'coleslaw', cat: 'sides', name: 'Coleslaw', emoji: '🥬', price: 200, tpl: 'plainfood' },
  { id: 'mashed', cat: 'sides', name: 'Mashed Potatoes', emoji: '🥔', price: 300, tpl: 'plainfood' },
  { id: 'corn', cat: 'sides', name: 'Corn', emoji: '🌽', price: 200, tpl: 'plainfood' },
  { id: 'greenbeans', cat: 'sides', name: 'Broccoli', emoji: '🥦', price: 200, tpl: 'plainfood' },
  { id: 'applesauce', cat: 'sides', name: 'Apple Sauce', emoji: '🍎', price: 200, tpl: 'plainfood' },
  { id: 'chips', cat: 'sides', name: 'Chips', emoji: '🥔', price: 200, tpl: 'plainfood' },
  { id: 'garlicbread', cat: 'sides', name: 'Garlic Bread', emoji: '🥖', price: 300, tpl: 'plainfood' },
  { id: 'pickle', cat: 'sides', name: 'Big Pickle', emoji: '🥒', price: 100, tpl: 'plainfood' },
  { id: 'cottagecheese', cat: 'sides', name: 'Cottage Cheese', emoji: '🥣', price: 200, tpl: 'plainfood' },

  // ---------------------------- DESSERTS ----------------------------
  { id: 'cone', cat: 'sweets', name: 'Ice Cream', emoji: '🍦', price: 300, tpl: 'icecream' },
  { id: 'sundae', cat: 'sweets', name: 'Sundae', emoji: '🍨', price: 500, tpl: 'sundae' },
  { id: 'bananasplit', cat: 'sweets', name: 'Banana Split', emoji: '🍌', price: 600, tpl: 'sundae' },
  { id: 'milkshake', cat: 'sweets', name: 'Milkshake', emoji: '🥤', price: 500, tpl: 'shake' },
  { id: 'float', cat: 'sweets', name: 'Root Beer Float', emoji: '🧋', price: 500, tpl: 'shake', skip: ['shakeflavor'] },
  { id: 'applepie', cat: 'sweets', name: 'Apple Pie', emoji: '🥧', price: 400, tpl: 'pie' },
  { id: 'cherrypie', cat: 'sweets', name: 'Cherry Pie', emoji: '🍒', price: 400, tpl: 'pie' },
  { id: 'chocolatecake', cat: 'sweets', name: 'Chocolate Cake', emoji: '🎂', price: 400, tpl: 'cake' },
  { id: 'cheesecake', cat: 'sweets', name: 'Cheesecake', emoji: '🍰', price: 500, tpl: 'cake' },
  { id: 'brownie', cat: 'sweets', name: 'Brownie', emoji: '🍫', price: 300, tpl: 'pie' },
  { id: 'cookie', cat: 'sweets', name: 'Cookie', emoji: '🍪', price: 200, tpl: 'plainfood' },
  { id: 'jello', cat: 'sweets', name: 'Jello', emoji: '🍮', price: 200, tpl: 'plainfood' },
  { id: 'pudding', cat: 'sweets', name: 'Pudding', emoji: '🥣', price: 300, tpl: 'sundae', skip: ['icflavor'] },
];

/* Money the register takes, biggest first (used for change-making) */
export const MONEY = [
  { id: 'b20', name: '$20', value: 2000, emoji: '💵', kind: 'bill' },
  { id: 'b10', name: '$10', value: 1000, emoji: '💵', kind: 'bill' },
  { id: 'b5', name: '$5', value: 500, emoji: '💵', kind: 'bill' },
  { id: 'b1', name: '$1', value: 100, emoji: '💵', kind: 'bill' },
  { id: 'quarter', name: 'Quarter', value: 25, emoji: '🪙', kind: 'coin', sub: '25¢' },
  { id: 'dime', name: 'Dime', value: 10, emoji: '🪙', kind: 'coin', sub: '10¢' },
  { id: 'nickel', name: 'Nickel', value: 5, emoji: '🪙', kind: 'coin', sub: '5¢' },
  { id: 'penny', name: 'Penny', value: 1, emoji: '🪙', kind: 'coin', sub: '1¢' },
];

/* Which questions an item asks: its template, minus anything it skips. */
export function stepKeysFor(item) {
  const keys = item.steps || TEMPLATES[item.tpl] || [];
  const skip = item.skip || [];
  return [...keys.filter((k) => !skip.includes(k)), 'where'];
}

export const itemById = (id) => ITEMS.find((i) => i.id === id);
