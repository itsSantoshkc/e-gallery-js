# E-Gallery 

> An online marketplace for buying and selling collectibles, artworks, and more.

 **Live Demo** : [E-Gallery](https://e-gallery-js.vercel.app/)

---

##  Note

Stripe payment is currently in **test mode** as a business account is not yet verified. Use the test credentials below to explore the app.

---

##  Test Credentials

### Admin

| Field    | Value           |
| -------- | --------------- |
| Email    | admin@admin.com |
| Password | admin123        |

###  User

| Field    | Value         |
| -------- | ------------- |
| Email    | user@user.com |
| Password | user123       |

---

## Tech Stack

- **Frontend** — Next.js 14, Tailwind CSS, shadcn/ui
- **Backend** — Next.js API Routes
- **Database** — PostgresSql 17 with Drizzle ORM
- **Auth** — NextAuth.js
- **File Storage** — Cloudinary
- **Payment** — eSewa,Stripe

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [PostgresSql](https://www.postgresql.org/) 17
- [Cloudinary](https://cloudinary.com/) account
- [eSewa](https://esewa.com.np/)
- [Stripe](https://stripe.com/) account

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/itsSantoshkc/e-gallery-js
cd e-gallery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL=you_postgres_db_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 4. Push database schema

```bash
npm run db:push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Management

```bash
# Push schema changes to the database
npm run db:push

# Open Drizzle Studio (GUI)
npx drizzle-kit studio
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # Reusable UI components
├── data/             # Database query functions
├── db/               # Drizzle client setup
├── lib/              # Utilities (cloudinary, etc.)
├── schema/           # Drizzle table schemas
└── config/           # App configuration
└── email/            # Email Configuration
```

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run db:push    # Push schema to database
```

---

## Features

- Browse and search Manga,Memerobilia etc
- User authentication (sign up, login, email verification)
- Product owners and Manga,Memerobilia etc listings
- Shopping cart and checkout
- eSewa payment integration
- Cloudinary image uploads
- Admin panel for managing users, products, and orders

---
