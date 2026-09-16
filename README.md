# 🏝️ City Island Clicker

> A modern, reactive idle city builder game powered by **Laravel 11**, **Inertia.js v2**, and **React 19** with Tailwind CSS and Zustand.

---

## 🌟 Key Features

* **Real-Time Gameplay Loop**: Active tapping, dynamic combo multipliers (up to 3×), critical strike bursts, and floating numbers.
* **City Upgrades & Progression**: 12+ upgradeable island districts (Harbours, Wind Farms, Grand Resorts, Central Banks, and the Orion Spaceport).
* **24/7 Offline Income**: Server-side offline reward calculations with optional gem boosters upon return.
* **Robust Anti-Cheat Engine**: Real-time batch timestamp verification and physical CPS threshold enforcement (18 clicks/sec).
* **Payment Simulation & Compliance**: Visa, Mastercard, and PCI DSS compliance badges, with secure virtual wallet top-up simulation.
* **Modern Legal & News Section**: GDPR-compliant Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, and Dev Chronicles.
* **Full Mobile Responsiveness**: Touch-optimized controls, double-tap zoom suppression, and fluid responsive UI.

---

## 🚀 Tech Stack

* **Backend**: PHP 8.4, Laravel 11, SQLite/MySQL
* **Frontend**: React 19, Inertia.js v2, Vite 8, Tailwind CSS, Framer Motion, Lucide Icons
* **State Management**: Zustand
* **Testing**: PHPUnit (20 Feature & Unit Tests)
* **Code Quality**: Laravel Pint

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SHENiiDEV/cityislandclicker.git
   cd cityislandclicker
   ```

2. **Install PHP & Node dependencies**:
   ```bash
   composer install
   npm install
   ```

3. **Configure Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run Migrations & Seed Upgrades**:
   ```bash
   php artisan migrate --seed
   ```

5. **Build Assets & Start Servers**:
   ```bash
   npm run build
   php artisan serve
   ```

6. **Run Tests**:
   ```bash
   php artisan test
   ```

---

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
