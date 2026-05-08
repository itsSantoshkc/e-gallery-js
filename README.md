# E-Gallery

An online marketplace for buying and selling artworks, built with Next.js, Drizzle ORM, MySQL, and Cloudinary.

## Tech Stack

- **Frontend** — Next.js 14, Tailwind CSS, shadcn/ui
- **Backend** — Next.js API Routes
- **Database** — MySQL 8.0 with Drizzle ORM
- **Auth** — NextAuth.js
- **File Storage** — Cloudinary
- **Payment** — eSewa,Stripe
- **Containerization** — Docker / Podman

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Docker](https://www.docker.com/)
- [Cloudinary](https://cloudinary.com/) account
- [eSewa](https://esewa.com.np/)
- [Stripe](https://stripe.com/) account

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/e-gallery.git
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
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=egallery

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 4. Start the MySQL database

```bash
podman run -d \
  --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=egallery \
  -p 3306:3306 \
  mysql:8.0
```

### 5. Push database schema

```bash
npm run db:push
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Running with Docker Compose

The easiest way to run the full stack (app + database + migrations) in one command:

```bash
docker compose up --build
# or with Podman
podman-compose up --build
```

This will:

1. Start a MySQL 8.0 container
2. Run `drizzle-kit push` to create all tables
3. Start the Next.js app on port 3000

To stop:

```bash
docker compose down
# to also remove the database volume
docker compose down -v
```

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

- Browse and search artworks
- User authentication (sign up, login, email verification)
- Artist profiles and artwork listings
- Shopping cart and checkout
- eSewa payment integration
- Cloudinary image uploads
- Admin panel for managing users, products, and orders

---
