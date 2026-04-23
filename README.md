# E-commerce Platform (Next.js + Stripe)

A fullstack e-commerce application with product browsing, cart management, and secure checkout integration using Stripe.

---

## 🧩 Problem

Modern e-commerce platforms require a seamless user experience, reliable payment processing, and real-time data synchronization across devices.

---

## 💡 Solution

Built a web-based e-commerce platform that allows users to browse products, manage a cart, and complete purchases using Stripe Checkout, with backend services handling authentication and data persistence.

---

## ⚙️ Tech Stack

- Next.js (React)
- Tailwind CSS
- Redux (state management)
- Firebase & Firestore (data storage)
- NextAuth (authentication)
- Stripe Checkout (payments)
- Webhooks (payment confirmation)

---

## 🚀 Key Features

- Product listing and detail pages
- Shopping cart with global state management
- Secure checkout using Stripe
- Authentication (login & session handling)
- Order handling via Stripe webhooks

---

## 🧠 Architecture

- Frontend built with Next.js (SSR + client-side rendering)
- Global state managed with Redux
- Firebase used for storing product and user data
- Stripe handles payment flow with webhook-based confirmation

---

## ⚠️ Challenges & Solutions

**Payment integration**
- Implemented Stripe Checkout with webhook handling for reliable transaction confirmation

**State management**
- Centralized cart logic using Redux to maintain consistency across pages

**Authentication flow**
- Integrated NextAuth for session-based authentication

---

## 📸 Screenshots

(Add screenshots here)

---

## ▶️ Running Locally

### Using npm

```bash
npm install
npm run dev
```
### Using Yarn

```bash
npm install --global yarn
yarn install
yarn dev
```
### Environment variables

```bash
NEXTAUTH_SECRET=your_secret
STRIPE_PUBLIC_KEY=your_key
STRIPE_SECRET_KEY=your_key
FIREBASE_CONFIG=your_config
```
## Notes
> This project focuses on end-to-end e-commerce flow, including payment processing, authentication, and state management.

Product data is sourced from a mock API for demonstration purposes.
