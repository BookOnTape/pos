/* ------------------------------------------------------------------
   Sunny Morning Cafe — menu + option data
   All prices are in whole cents so the math never goes fuzzy.
   ------------------------------------------------------------------ */

export const SHOP = {
  name: 'Sunny Morning',
  tagline: 'Coffee & Breakfast',
  taxRate: 0, // kid math is friendlier without tax
};

export const CATEGORIES = [
  { id: 'coffee', name: 'Coffee', emoji: '☕', color: 'cat-coffee' },
  { id: 'tea', name: 'Tea', emoji: '🍵', color: 'cat-tea' },
  { id: 'cold', name: 'Juice & Milk', emoji: '🧃', color: 'cat-cold' },
  { id: 'food', name: 'Breakfast', emoji: '🥐', color: 'cat-food' },
];

/* kind: 'drink' | 'food'
   temps: which temperatures are allowed
   milk:  drink can take a milk choice
   shots: drink is espresso based (extra shot available) */
export const ITEMS = [
  // ---------------- COFFEE ----------------
  { id: 'drip', cat: 'coffee', name: 'Coffee', emoji: '☕', price: 200, kind: 'drink', temps: ['hot', 'iced'], milk: true },
  { id: 'latte', cat: 'coffee', name: 'Latte', emoji: '🥛', price: 400, kind: 'drink', temps: ['hot', 'iced'], milk: true, shots: true },
  { id: 'cappuccino', cat: 'coffee', name: 'Cappuccino', emoji: '☕', price: 400, kind: 'drink', temps: ['hot'], milk: true, shots: true },
  { id: 'flatwhite', cat: 'coffee', name: 'Flat White', emoji: '🤍', price: 400, kind: 'drink', temps: ['hot', 'iced'], milk: true, shots: true },
  { id: 'mocha', cat: 'coffee', name: 'Mocha', emoji: '🍫', price: 450, kind: 'drink', temps: ['hot', 'iced'], milk: true, shots: true },
  { id: 'americano', cat: 'coffee', name: 'Americano', emoji: '💧', price: 300, kind: 'drink', temps: ['hot', 'iced'], milk: true, shots: true },
  { id: 'espresso', cat: 'coffee', name: 'Espresso', emoji: '⚡', price: 250, kind: 'drink', temps: ['hot'], shots: true },
  { id: 'macchiato', cat: 'coffee', name: 'Macchiato', emoji: '🌤️', price: 400, kind: 'drink', temps: ['hot', 'iced'], milk: true, shots: true },
  { id: 'coldbrew', cat: 'coffee', name: 'Cold Brew', emoji: '🧊', price: 400, kind: 'drink', temps: ['iced'], milk: true },
  { id: 'decaf', cat: 'coffee', name: 'Decaf', emoji: '🌙', price: 200, kind: 'drink', temps: ['hot', 'iced'], milk: true },

  // ---------------- TEA ----------------
  { id: 'blacktea', cat: 'tea', name: 'Black Tea', emoji: '🫖', price: 250, kind: 'drink', temps: ['hot', 'iced'], milk: true },
  { id: 'greentea', cat: 'tea', name: 'Green Tea', emoji: '🍃', price: 250, kind: 'drink', temps: ['hot', 'iced'], milk: true },
  { id: 'mint', cat: 'tea', name: 'Mint Tea', emoji: '🌿', price: 250, kind: 'drink', temps: ['hot', 'iced'] },
  { id: 'lemonginger', cat: 'tea', name: 'Lemon Ginger', emoji: '🍋', price: 250, kind: 'drink', temps: ['hot', 'iced'] },
  { id: 'chai', cat: 'tea', name: 'Chai Latte', emoji: '🧡', price: 400, kind: 'drink', temps: ['hot', 'iced'], milk: true },
  { id: 'matcha', cat: 'tea', name: 'Matcha Latte', emoji: '💚', price: 450, kind: 'drink', temps: ['hot', 'iced'], milk: true },
  { id: 'bubblegumtea', cat: 'tea', name: 'Berry Tea', emoji: '🫐', price: 300, kind: 'drink', temps: ['hot', 'iced'] },

  // ---------------- JUICE / MILK ----------------
  { id: 'oj', cat: 'cold', name: 'Orange Juice', emoji: '🍊', price: 300, kind: 'drink', temps: ['cold'] },
  { id: 'apple', cat: 'cold', name: 'Apple Juice', emoji: '🍎', price: 300, kind: 'drink', temps: ['cold'] },
  { id: 'lemonade', cat: 'cold', name: 'Lemonade', emoji: '🍋‍🟩', price: 300, kind: 'drink', temps: ['cold'] },
  { id: 'milk', cat: 'cold', name: 'Milk', emoji: '🥛', price: 200, kind: 'drink', temps: ['hot', 'cold'], milk: true },
  { id: 'chocmilk', cat: 'cold', name: 'Chocolate Milk', emoji: '🐄', price: 300, kind: 'drink', temps: ['hot', 'cold'], milk: true },
  { id: 'hotchoc', cat: 'cold', name: 'Hot Chocolate', emoji: '🍫', price: 350, kind: 'drink', temps: ['hot'], milk: true },
  { id: 'steamer', cat: 'cold', name: 'Steamer', emoji: '♨️', price: 300, kind: 'drink', temps: ['hot'], milk: true },
  { id: 'smoothie', cat: 'cold', name: 'Berry Smoothie', emoji: '🍓', price: 500, kind: 'drink', temps: ['cold'], milk: true },
  { id: 'water', cat: 'cold', name: 'Water', emoji: '💦', price: 100, kind: 'drink', temps: ['cold'] },

  // ---------------- BREAKFAST ----------------
  { id: 'bagel', cat: 'food', name: 'Bagel', emoji: '🥯', price: 300, kind: 'food', spread: true, warm: true },
  { id: 'croissant', cat: 'food', name: 'Croissant', emoji: '🥐', price: 350, kind: 'food', spread: true, warm: true },
  { id: 'muffin', cat: 'food', name: 'Muffin', emoji: '🧁', price: 300, kind: 'food', warm: true },
  { id: 'donut', cat: 'food', name: 'Donut', emoji: '🍩', price: 200, kind: 'food' },
  { id: 'toast', cat: 'food', name: 'Toast', emoji: '🍞', price: 200, kind: 'food', spread: true, warm: true },
  { id: 'oatmeal', cat: 'food', name: 'Oatmeal', emoji: '🥣', price: 400, kind: 'food' },
  { id: 'parfait', cat: 'food', name: 'Yogurt Parfait', emoji: '🍨', price: 450, kind: 'food' },
  { id: 'eggsandwich', cat: 'food', name: 'Egg Sandwich', emoji: '🥪', price: 500, kind: 'food', warm: true },
  { id: 'pancakes', cat: 'food', name: 'Pancakes', emoji: '🥞', price: 600, kind: 'food' },
  { id: 'burrito', cat: 'food', name: 'Breakfast Burrito', emoji: '🌯', price: 600, kind: 'food', warm: true },
  { id: 'fruit', cat: 'food', name: 'Fruit Cup', emoji: '🍇', price: 300, kind: 'food' },
  { id: 'cookie', cat: 'food', name: 'Cookie', emoji: '🍪', price: 200, kind: 'food' },
];

/* ------------------------------------------------------------------
   Option lists. Every option has { id, name, emoji, price }
   ------------------------------------------------------------------ */

export const TEMPS = {
  hot: { id: 'hot', name: 'Hot', emoji: '🔥', price: 0 },
  iced: { id: 'iced', name: 'Iced', emoji: '🧊', price: 0 },
  cold: { id: 'cold', name: 'Cold', emoji: '❄️', price: 0 },
};

export const SIZES = [
  { id: 'small', name: 'Small', emoji: '🥃', price: 0, note: '8 oz' },
  { id: 'medium', name: 'Medium', emoji: '🥤', price: 50, note: '12 oz' },
  { id: 'large', name: 'Large', emoji: '🪣', price: 100, note: '16 oz' },
];

export const MILKS = [
  { id: 'whole', name: 'Whole Milk', emoji: '🥛', price: 0 },
  { id: 'two', name: '2% Milk', emoji: '🥛', price: 0 },
  { id: 'oat', name: 'Oat Milk', emoji: '🌾', price: 50 },
  { id: 'almond', name: 'Almond Milk', emoji: '🌰', price: 50 },
  { id: 'soy', name: 'Soy Milk', emoji: '🫘', price: 50 },
  { id: 'cream', name: 'Cream', emoji: '🍦', price: 0 },
  { id: 'nomilk', name: 'No Milk', emoji: '🚫', price: 0 },
];

export const FLAVORS = [
  { id: 'vanilla', name: 'Vanilla', emoji: '🤍', price: 50 },
  { id: 'caramel', name: 'Caramel', emoji: '🍯', price: 50 },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', price: 50 },
  { id: 'hazelnut', name: 'Hazelnut', emoji: '🌰', price: 50 },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', price: 50 },
  { id: 'pumpkin', name: 'Pumpkin', emoji: '🎃', price: 50 },
  { id: 'peppermint', name: 'Peppermint', emoji: '🍬', price: 50 },
];

export const SWEETENERS = [
  { id: 'nosugar', name: 'No Sugar', emoji: '🚫', price: 0 },
  { id: 'sugar', name: 'Sugar', emoji: '🍚', price: 0 },
  { id: 'brownsugar', name: 'Brown Sugar', emoji: '🟫', price: 0 },
  { id: 'honey', name: 'Honey', emoji: '🍯', price: 0 },
  { id: 'sweetener', name: 'Sweetener', emoji: '💙', price: 0 },
];

export const ICE = [
  { id: 'lightice', name: 'Light Ice', emoji: '💧', price: 0 },
  { id: 'regice', name: 'Regular Ice', emoji: '🧊', price: 0 },
  { id: 'extraice', name: 'Extra Ice', emoji: '🏔️', price: 0 },
  { id: 'noice', name: 'No Ice', emoji: '🚫', price: 0 },
];

export const DRINK_EXTRAS = [
  { id: 'whip', name: 'Whipped Cream', emoji: '🍦', price: 50 },
  { id: 'shot', name: 'Extra Shot', emoji: '⚡', price: 75, needs: 'shots' },
  { id: 'sprinkles', name: 'Sprinkles', emoji: '🌈', price: 0 },
  { id: 'cinnamon', name: 'Cinnamon', emoji: '🧂', price: 0 },
  { id: 'straw', name: 'Straw', emoji: '🥤', price: 0 },
  { id: 'lid', name: 'Lid', emoji: '⭕', price: 0 },
];

export const SPREADS = [
  { id: 'butter', name: 'Butter', emoji: '🧈', price: 0 },
  { id: 'jam', name: 'Jam', emoji: '🍓', price: 50 },
  { id: 'creamcheese', name: 'Cream Cheese', emoji: '🧀', price: 50 },
  { id: 'peanutbutter', name: 'Peanut Butter', emoji: '🥜', price: 50 },
  { id: 'nospread', name: 'Nothing', emoji: '🚫', price: 0 },
];

export const WARM = [
  { id: 'warmed', name: 'Warm It Up', emoji: '♨️', price: 0 },
  { id: 'roomtemp', name: 'Just Like That', emoji: '👌', price: 0 },
];

export const FOR_HERE = [
  { id: 'here', name: 'For Here', emoji: '🪑', price: 0 },
  { id: 'togo', name: 'To Go', emoji: '🛍️', price: 0 },
];

/* Money the register can take, biggest first (used for change-making) */
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

export const itemById = (id) => ITEMS.find((i) => i.id === id);
