# 📦 Import Environment Variables to Vercel - Easy Method

## 🎯 **Two Easy Ways to Import**

---

## **Method 1: Copy & Paste (Easiest - 1 Minute)**

### **Step 1: Copy this entire block:**

```
MONGO_URL=mongodb+srv://arceusg6_db_user:Arceus008@cluster0.rgooa9s.mongodb.net/pulse_node_db?retryWrites=true&w=majority
DB_NAME=pulse_node_db
ALCHEMY_API_KEY=7xHRtjQDHH8NHwBiBChCa
MORALIS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjkzMjYzZmI0LTcyZjEtNGQxNS04N2FkLTE0ZGVjMDJlOWFkNiIsIm9yZ0lkIjoiNTA5OTcxIiwidXNlcklkIjoiNTI0NzA0IiwidHlwZUlkIjoiMDE3NDJiMTQtZjY4OC00MjM1LTlhOTItOGYzYTg1NjA1ZDA3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NzYzMzMxNjEsImV4cCI6NDkzMjA5MzE2MX0.LLWz4-cxwNnZNhvMLzj1lG_ILYlFCweaZqNYEkMC8UA
OPENSEA_API_KEY=1E86BAC7C71B4
CORS_ORIGINS=*
```

### **Step 2: In Vercel:**

1. Go to your project import page: https://vercel.com/new
2. Import your **Pulsenode-** repository
3. Click **"Environment Variables"** section
4. Look for **"Paste .env"** or **"Bulk Edit"** button
5. Paste the entire block above
6. Click **"Save"** or **"Add"**
7. Click **"Deploy"**

✅ **All 6 variables imported at once!**

---

## **Method 2: Download File (Alternative)**

### **Step 1: Download the file**

The file `.env.vercel` is now in your GitHub repo:

**Download from:** https://github.com/arceusg6-a11y/Pulsenode-/blob/main/.env.vercel

Or view raw: https://raw.githubusercontent.com/arceusg6-a11y/Pulsenode-/main/.env.vercel

### **Step 2: Import to Vercel**

1. Go to: https://vercel.com/new
2. Import **Pulsenode-** repo
3. In "Environment Variables" section
4. Click **"Import from .env"** or **"Upload"**
5. Select the downloaded `.env.vercel` file
6. Click **"Deploy"**

---

## **Method 3: Using Vercel CLI** (For Advanced Users)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Go to project
cd /path/to/your/project

# Deploy with env file
vercel --prod
```

The CLI will automatically detect `.env.vercel` and use those variables.

---

## ✅ **Verify Variables Are Added**

Before clicking "Deploy", make sure you see:

```
Environment Variables (6)
✓ MONGO_URL
✓ DB_NAME  
✓ ALCHEMY_API_KEY
✓ MORALIS_API_KEY
✓ OPENSEA_API_KEY
✓ CORS_ORIGINS
```

---

## 🚀 **Quick Steps Summary:**

1. Go to https://vercel.com/new
2. Import **arceusg6-a11y/Pulsenode-**
3. Click **"Environment Variables"**
4. Click **"Paste .env"** or **"Bulk Edit"**
5. Paste the variable block above
6. Click **"Deploy"**
7. Wait 3 minutes
8. Get your live URL! 🎉

---

## 🎯 **The Variable Block (Ready to Copy):**

```env
MONGO_URL=mongodb+srv://arceusg6_db_user:Arceus008@cluster0.rgooa9s.mongodb.net/pulse_node_db?retryWrites=true&w=majority
DB_NAME=pulse_node_db
ALCHEMY_API_KEY=7xHRtjQDHH8NHwBiBChCa
MORALIS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjkzMjYzZmI0LTcyZjEtNGQxNS04N2FkLTE0ZGVjMDJlOWFkNiIsIm9yZ0lkIjoiNTA5OTcxIiwidXNlcklkIjoiNTI0NzA0IiwidHlwZUlkIjoiMDE3NDJiMTQtZjY4OC00MjM1LTlhOTItOGYzYTg1NjA1ZDA3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NzYzMzMxNjEsImV4cCI6NDkzMjA5MzE2MX0.LLWz4-cxwNnZNhvMLzj1lG_ILYlFCweaZqNYEkMC8UA
OPENSEA_API_KEY=1E86BAC7C71B4
CORS_ORIGINS=*
```

---

## 💡 **Pro Tip:**

Look for the **"Paste .env"** button in Vercel's Environment Variables section - it's usually on the top right. This lets you paste all variables at once instead of adding them one by one!

---

**This is the fastest way! Copy the block, paste in Vercel, and deploy!** 🚀
