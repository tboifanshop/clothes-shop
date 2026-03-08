# Clothes Shop

A frontend-only static clothes shop with [Stripe Checkout](https://stripe.com/docs/payments/checkout) integration. No backend required.

## Architecture

```
Frontend (static HTML + JS)
  ├── product catalog  (js/products.js)
  ├── cart logic       (js/cart.js  — localStorage)
  ├── Stripe price IDs (embedded in products.js)
  └── checkout redirect (js/checkout.js)

Stripe
  ├── products & prices (configured in your Stripe dashboard)
  └── hosted Checkout page (payment form, Apple Pay, card validation)
```

## Getting Started

### 1. Configure Stripe

1. Create a free [Stripe account](https://stripe.com).
2. Add your products in the **Stripe Dashboard → Products**.
3. Copy each product's **Price ID** (starts with `price_`).

### 2. Update product price IDs

Open `js/products.js` and replace the placeholder `stripePriceId` values with your real Stripe Price IDs:

```js
{ id: "prod_001", name: "Classic White Tee", stripePriceId: "price_YOUR_REAL_ID", ... }
```

### 3. Set your publishable key

Open `js/checkout.js` and replace the placeholder key:

```js
const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_PUBLISHABLE_KEY_HERE";
```

Your publishable key is found in the **Stripe Dashboard → Developers → API keys**.

### 4. Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploy

This is a fully static site — deploy to any static host:

| Platform | Command / Steps |
|---|---|
| **GitHub Pages** | Push to `gh-pages` branch or configure in repo settings |
| **Netlify** | Drag & drop folder, or connect repo |
| **Vercel** | `vercel --prod` |
| **Cloudflare Pages** | Connect repo in the dashboard |

## Pages

| Page | Description |
|---|---|
| `index.html` | Product catalog + cart sidebar |
| `success.html` | Shown after successful payment |
| `cancel.html` | Shown when user cancels checkout |

## Security Note

This implementation uses **predefined Stripe Price IDs** — the publishable key is safe to expose in client-side code. Never use your **secret key** on the frontend.

For dynamic pricing or custom amounts, use [Stripe Payment Links](https://stripe.com/docs/payment-links) or add a serverless function (Cloudflare Workers / Netlify Functions).
