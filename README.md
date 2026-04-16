# 🌟 Pulse Node - Multi-Chain NFT Portfolio Tracker

<div align="center">

![Pulse Node](https://img.shields.io/badge/Pulse_Node-NFT_Tracker-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A premium, enterprise-grade NFT portfolio tracker supporting multiple blockchains with real-time floor prices and P&L analysis.**

[Live Demo](https://node-portfolio-1.preview.emergentagent.com) • [Report Bug](https://github.com/arceusg6-a11y/Pulsenode-/issues) • [Request Feature](https://github.com/arceusg6-a11y/Pulsenode-/issues)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Multi-Chain Support**: Track NFTs across Ethereum, Base, Polygon, and Solana
- **Real-Time Floor Prices**: Powered by Moralis API with live marketplace data
- **P&L Calculations**: Automatic profit/loss tracking with visual indicators
- **Portfolio Analytics**: Total net worth, 24h changes, and top gainers
- **Search & Filter**: Quickly find NFTs by name or collection
- **Live Activity Feed**: Real-time NFT sales tracking with auto-refresh

### 🎨 Premium UI/UX
- **Dark Theme**: Beautiful charcoal and slate palette with neon accents
- **Glassmorphism Design**: Modern blur effects and translucent cards
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Layout**: Mobile-first design with adaptive grid
- **Hover Effects**: Interactive price overlays on NFT cards

### ⚡ Performance
- **Optimized Images**: Next.js Image component with lazy loading
- **Fast Loading**: Minimized animation delays for instant feel
- **Manual Refresh**: One-click data sync with cache-busting
- **Live User Counter**: Real-time community growth tracking

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and Yarn
- MongoDB instance (local or cloud)
- API Keys:
  - [Alchemy API Key](https://www.alchemy.com/)
  - [Moralis API Key](https://moralis.io/)
  - [OpenSea API Key](https://docs.opensea.io/reference/api-overview) (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arceusg6-a11y/Pulsenode-.git
   cd Pulsenode-
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=pulse_node_db
   
   # Next.js
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   CORS_ORIGINS=*
   
   # API Keys
   ALCHEMY_API_KEY=your_alchemy_api_key
   MORALIS_API_KEY=your_moralis_api_key
   OPENSEA_API_KEY=your_opensea_api_key
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for user tracking
- **Alchemy SDK** - Multi-chain NFT data
- **Moralis API** - Real-time floor prices
- **Axios** - HTTP client

### Infrastructure
- **Supervisor** - Process management
- **Docker** - Containerization (optional)

---

## 📁 Project Structure

```
pulse-node/
├── app/
│   ├── api/[[...path]]/
│   │   └── route.js          # API endpoints
│   ├── page.js                # Main dashboard
│   ├── layout.js              # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── Sidebar.jsx            # Navigation sidebar
│   ├── StatBar.jsx            # Portfolio statistics
│   ├── NFTCard.jsx            # NFT card component
│   ├── NFTGrid.jsx            # NFT grid layout
│   ├── WalletInput.jsx        # Wallet search input
│   ├── ActivityFeed.jsx       # Live activity feed
│   └── UserCounter.jsx        # Live user counter
├── lib/
│   ├── alchemy.js             # Alchemy SDK integration
│   ├── moralis.js             # Moralis API integration
│   ├── opensea.js             # OpenSea API integration
│   ├── reservoir.js           # Reservoir API fallback
│   ├── db.js                  # MongoDB connection
│   └── utils/
│       └── priceUtils.js      # Price calculation utilities
├── .env                       # Environment variables (not committed)
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
└── next.config.js             # Next.js configuration
```

---

## 🔧 Configuration

### Network Support

The app supports 4 blockchain networks:
- **Ethereum** (mainnet)
- **Base** (Layer 2)
- **Polygon** (sidechain)
- **Solana** (alternative chain)

### API Integration Priority

Floor prices are fetched in this order:
1. **Moralis API** (primary) - Most reliable
2. **OpenSea API** (fallback) - Requires valid key
3. **Reservoir API** (last resort) - Public endpoint

---

## 🎮 Usage

### Track a Wallet

1. Enter an Ethereum address or ENS name
2. Select the blockchain network
3. Click "Track" to fetch NFTs
4. View portfolio analytics and NFT grid

### Example Wallets

Try these wallets with NFTs:

```
Vitalik Buterin: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
Pranksy: 0xD387A6E4e84a6C86bd90C158C6028A58CC8Ac459
Gary Vee: 0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00
```

### Refresh Data

Click the green circular refresh button to fetch the latest floor prices and metadata.

---

## 🌐 Deployment

### Environment Setup

1. Set up MongoDB (Atlas recommended for production)
2. Configure environment variables
3. Update `NEXT_PUBLIC_BASE_URL` with your domain

### Build for Production

```bash
yarn build
yarn start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arceusg6-a11y/Pulsenode-)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Alchemy** - Multi-chain NFT infrastructure
- **Moralis** - Real-time Web3 data
- **OpenSea** - NFT marketplace data
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Animation framework

---

## 📧 Contact

**Arceus** - [@arceusg6-a11y](https://github.com/arceusg6-a11y)

**Project Link**: [https://github.com/arceusg6-a11y/Pulsenode-](https://github.com/arceusg6-a11y/Pulsenode-)

**Live Demo**: [https://node-portfolio-1.preview.emergentagent.com](https://node-portfolio-1.preview.emergentagent.com)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by Arceus

</div>
