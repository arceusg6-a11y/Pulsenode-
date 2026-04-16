# 🚀 Deploy Pulse Node to Vercel (5 Minutes)

## ✅ Prerequisites
- GitHub account (✓ Done - code is pushed)
- Vercel account (free) - Sign up at https://vercel.com

---

## 📝 Step-by-Step Deployment Guide

### **Step 1: Sign Up/Login to Vercel**
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### **Step 2: Import Your Project**
1. Once logged in, click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find **"Pulsenode-"** in the list
4. Click **"Import"** next to it

### **Step 3: Configure Project**
1. **Framework Preset**: Should auto-detect as "Next.js" ✓
2. **Root Directory**: Leave as `./` (default)
3. **Build Command**: Leave as default (`next build`)
4. **Output Directory**: Leave as default (`.next`)

### **Step 4: Add Environment Variables** ⚠️ CRITICAL
Click "Environment Variables" and add these one by one:

| Name | Value |
|------|-------|
| `MONGO_URL` | `mongodb+srv://YOUR_MONGO_CONNECTION_STRING` |
| `DB_NAME` | `pulse_node_db` |
| `ALCHEMY_API_KEY` | `7xHRtjQDHH8NHwBiBChCa` |
| `MORALIS_API_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjkzMjYzZmI0LTcyZjEtNGQxNS04N2FkLTE0ZGVjMDJlOWFkNiIsIm9yZ0lkIjoiNTA5OTcxIiwidXNlcklkIjoiNTI0NzA0IiwidHlwZUlkIjoiMDE3NDJiMTQtZjY4OC00MjM1LTlhOTItOGYzYTg1NjA1ZDA3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NzYzMzMxNjEsImV4cCI6NDkzMjA5MzE2MX0.LLWz4-cxwNnZNhvMLzj1lG_ILYlFCweaZqNYEkMC8UA` |
| `OPENSEA_API_KEY` | `1E86BAC7C71B4` |
| `CORS_ORIGINS` | `*` |

**For MONGO_URL**, you need MongoDB Atlas (free):
- Go to https://www.mongodb.com/cloud/atlas/register
- Create a free cluster
- Get connection string (replace `<password>` with your database password)
- Format: `mongodb+srv://username:password@cluster.mongodb.net/`

### **Step 5: Deploy!**
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see "🎉 Congratulations!" when done

### **Step 6: Get Your Live URL**
Your app will be live at:
```
https://pulsenode-[random-string].vercel.app
```

You can customize this:
1. Go to Project Settings → Domains
2. Add your custom domain or use the Vercel subdomain

---

## 🎯 Quick MongoDB Atlas Setup (2 minutes)

If you don't have MongoDB yet:

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register
2. **Create Free Cluster**:
   - Choose "M0 (Free)"
   - Select region closest to you
   - Click "Create"
3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `pulsenode`
   - Password: Generate strong password (save it!)
   - User Privileges: "Read and write to any database"
4. **Whitelist IP**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

Example:
```
mongodb+srv://pulsenode:YourPassword123@cluster0.abc123.mongodb.net/
```

---

## 🔄 Alternative: Deploy with Vercel CLI (Advanced)

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /app
vercel --prod

# Add environment variables when prompted
```

---

## ✅ After Deployment Checklist

1. **Test the live URL** - Visit your Vercel URL
2. **Update README** - Add live demo link to your GitHub README
3. **Update NEXT_PUBLIC_BASE_URL** - In Vercel environment variables, update to your Vercel URL
4. **Test all features**:
   - Try tracking a wallet
   - Check if floor prices load
   - Test refresh button
   - Verify user counter

---

## 🆘 Troubleshooting

### Build fails?
- Check environment variables are set correctly
- Verify MongoDB connection string is valid

### MongoDB connection errors?
- Make sure IP is whitelisted (0.0.0.0/0)
- Verify username/password in connection string
- Test connection string in MongoDB Compass first

### Functions timeout?
- Vercel free tier has 10s timeout for serverless functions
- If needed, upgrade to Pro plan for 60s timeout

---

## 🎉 Success!

Once deployed, share your live link:
- Twitter: "Check out my NFT tracker! 🚀"
- Reddit: r/NFT, r/web3
- Discord: Web3 communities

**Your Vercel URL will be permanent and auto-deploy on every GitHub push!** 🚀
