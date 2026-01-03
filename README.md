# Siddhaka Ayurveda - Holistic Healing Center

Siddhaka Ayurveda is a comprehensive web application for an authentic Ayurvedic treatment center located in Tissamaharama, Sri Lanka. Guided by Dr. Nimeshika Madithiyawala, the platform allows patients to explore traditional treatments, book wellness packages, and manage their health journey through a personalized dashboard.

## 🌿 Features

### For Patients
- **Authentic Treatment Catalog**: Browse through categories like Head & Hair, Body & Skin, Facial, and Foot care.
- **Wellness Packages**: Discover curated treatment packages (Wellness, Special, and Signature).
- **Online Booking System**: Register/Login to book specific time slots for treatments.
- **Patient Dashboard**: View upcoming, completed, and cancelled bookings.
- **Product Gallery**: Explore natural Ayurvedic products including oils, gels, and lotions.
- **Educational Content**: Learn about the classical Ayurveda medical system.

### For Admin
- **Manage Bookings**: View and update the status of patient appointments (Pending, Confirmed, Completed, Cancelled).
- **Calendar View**: Visual representation of appointments on a monthly calendar.
- **Product Management**: Add, update, or delete products from the gallery.
- **Package Management**: Manage treatment packages, durations, and descriptions.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React Icons](https://lucide.dev/)
- **Authentication**: Custom JWT-based Auth Provider
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Tailwind CSS Animate

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm / npm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codeaquariumsl/ayurveda-website-frd.git
   cd ayurveda-website-frd
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `app/`: Next.js pages and routing.
- `components/`: Reusable UI components (Navbar, Footer, Modals, etc.).
- `context/`: Auth and Application state providers.
- `public/`: Static assets (Logos, Treatment images).
- `lib/`: Utility functions and helper classes.

## 📄 License

This project is private and proprietary. Copyright © 2025 Siddhaka Ayurveda.
