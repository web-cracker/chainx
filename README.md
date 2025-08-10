# AVA Web3 Quiz & Rewards Platform

## 📌 Overview

This is a **Web3-based Multiplayer Quiz Platform** where users can connect their crypto wallets, play quizzes, earn points, and redeem them for AVAX rewards on the **Avalanche blockchain**.  

While the platform is primarily a **Web App**, it also supports **Telegram Mini App integration** for users who prefer playing directly inside Telegram.

Our mission is to make blockchain adoption **fun, engaging, and rewarding** by combining gamification with seamless Web3 wallet interactions.

---

## 🚀 How Avalanche Powers the Project

Avalanche is at the core of our reward mechanism:

- **Fast & Low-Cost Rewards** – Avalanche C-Chain ensures micro-rewards can be distributed quickly without high fees.
- **Scalable Infrastructure** – High throughput means thousands of concurrent quiz players without network congestion.
- **EVM-Compatible** – We use `ethers.js` & `wagmi` with Avalanche just like Ethereum, making development faster.
- **Reliable Settlement** – Avalanche’s consensus guarantees secure AVAX payouts to players.

---

## 🛠 Avalanche Components Used

- **Avalanche C-Chain** – Primary network for rewards and wallet transactions.
- **Ethers.js** – Blockchain interaction & AVAX transfers.
- **WAGMI + WalletConnect** – Connect Avalanche-compatible wallets like MetaMask & Core.
- **Web3Modal** – Smooth wallet connection experience for Avalanche users.
- **Supabase Integration** – Stores wallet addresses & quiz scores, triggers reward logic.

---

## 🧩 Tech Stack

**Frontend (Web App)**
- React 18
- React Router
- Web3Modal & WAGMI
- Telegram Mini App SDK (optional)
- Telegram UI Kit (optional)

**Web3**
- Ethers.js
- WAGMI
- WalletConnect
- TON Wallet support (optional)

**Backend**
- Node.js + Express
- Supabase (PostgreSQL + Auth)
- Socket.io (real-time leaderboard)

**Security & Middleware**
- Helmet
- CORS
- dotenv

---

## ⚙️ Architecture

1. **Frontend (React Web App)**
   - Displays quizzes, leaderboard, and wallet status.
   - Connects Avalanche-compatible wallets.
   - Optional Telegram Mini App mode.

2. **Backend (Node.js)**
   - Saves quiz results and wallet addresses to Supabase.
   - Validates wallet ownership.
   - Sends AVAX rewards through Avalanche C-Chain.

3. **Avalanche Blockchain**
   - Executes AVAX reward transfers.
   - Verifies wallet balances & transaction confirmations.

---

## 📸 Features

- **Wallet Connection** – MetaMask, Avalanche Core, and WalletConnect-supported wallets.
- **Quiz & Rewards** – Earn points by answering correctly.
- **AVAX Redemption** – Convert quiz points into real AVAX tokens.
- **Leaderboard** – Real-time ranking with Socket.io.
- **Optional Telegram Play** – Users can access the game via Telegram Mini App.

---

## 🔗 Links

**GitHub Repository:**  
https://github.com/yourusername/web3-avalanche-quiz

**Live Demo:**  
https://yourappdomain.com

---

## 📅 Hackathon Contribution

**Before Hackathon:**
- Basic quiz interface.
- Simple wallet connection UI.
- Basic backend setup.

**Developed During Hackathon:**
- Avalanche C-Chain integration for rewards.
- AVAX point-to-token redemption logic.
- Supabase backend for storing user progress.
- Leaderboard with real-time updates.
- Multi-wallet support (MetaMask, Avalanche Core, TON).
- Persistent wallet state with localStorage.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start frontend
npm run dev

# Start backend server
npm start
