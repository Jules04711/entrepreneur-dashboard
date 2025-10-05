# PostgreSQL & Prisma Setup Guide

## Table of Contents

1. [Quick Setup Checklist](#quick-setup-checklist)
2. [Step 1: Install PostgreSQL](#step-1-install-postgresql)
3. [Step 2: Create Database](#step-2-create-database)
4. [Step 3: Create .env File](#step-3-create-env-file)
5. [Step 4: Initialize Prisma](#step-4-initialize-prisma)
6. [Step 5: Configure Prisma Schema](#step-5-configure-prisma-schema)
7. [Step 6: Create Database Tables](#step-6-create-database-tables)
8. [Step 7: Open Prisma Studio](#step-7-open-prisma-studio)
9. [Test Your Application](#test-your-application)
10. [Video Script Summary](#video-script-summary)
11. [Quick Troubleshooting](#quick-troubleshooting)
12. [Resources](#resources)

## Quick Setup Checklist

**Follow these steps in order:**

1. **Install PostgreSQL** (if needed)
2. **Create database** in PostgreSQL
3. **Create .env file** with database URL
4. **Initialize Prisma**: `npx prisma init`
5. **Update Prisma schema** with User model
6. **Create tables**: `npx prisma db push` **CRITICAL STEP**
7. **Open Prisma Studio**: `npx prisma studio`

> **Important**: Step 6 creates the actual database tables. Skip this and your app will crash!

## Step 1: Install PostgreSQL (Windows)

### Download & Install
1. Go to [postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Download PostgreSQL 15+ (latest version)
3. Run installer as Administrator
4. **Remember the password** you set for `postgres` user!
5. Use default port 5432 (or 5433 if 5432 is busy)

### Start PostgreSQL
```powershell
# Check if running
Get-Service postgresql*

# Start if needed
Start-Service postgresql-x64-17
```

### Test Connection
```powershell
# Connect to PostgreSQL (default port 5432)
psql -U postgres

# Should see: postgres=#
# Type \q to exit
```

**If PostgreSQL is on port 5433:**
```powershell
# Connect to PostgreSQL on port 5433
psql -U postgres -p 5433

# Should see: postgres=#
# Type \q to exit
```

**If you get "psql is not recognized" error:**
- Add PostgreSQL to your PATH, or use the full path:
```powershell
# Option 1: Add to PATH (recommended)
# Add C:\Program Files\PostgreSQL\17\bin to your system PATH

# Option 2: Use full path
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
```

**To add PostgreSQL to PATH:**

## What is PATH?

**PATH** is a system environment variable in Windows that tells your computer where to look for executable programs when you type a command in the terminal.

Think of it like this: When you type `psql` in PowerShell, Windows searches through a list of folders (stored in PATH) to find a program called `psql.exe`. If it finds it, it runs the program. If not, you get the "not recognized" error.

## The Problem

Right now, when you type `psql -U postgres`, Windows doesn't know where to find the `psql.exe` file because PostgreSQL's `bin` folder isn't in your PATH.

## The Solution

By adding `C:\Program Files\PostgreSQL\17\bin` to your PATH, you're telling Windows: "Hey, when I type `psql`, also look in this folder for the program."

## How to Add to PATH (Step by Step)

1. **Open System Properties:**
   - Press `Windows + R`
   - Type `sysdm.cpl` and press Enter

2. **Go to Environment Variables:**
   - Click "Advanced" tab
   - Click "Environment Variables..." button

3. **Edit PATH:**
   - In the "System variables" section, find "Path"
   - Click "Edit..."
   - Click "New"
   - Add: `C:\Program Files\PostgreSQL\17\bin`
   - Click "OK" on all dialogs

4. **Restart PowerShell:**
   - Close your current PowerShell window
   - Open a new one
   - Try `psql -U postgres` again

## Alternative: Use Full Path

If you don't want to modify PATH, you can always use the full path:
```powershell
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
```

The `&` tells PowerShell to execute the program at that specific location.

## Why This Happens

When you install PostgreSQL, the installer doesn't automatically add the `bin` folder to your PATH. This is common with many database and development tools.

## Step 2: Create Database

### Connect & Create Database
```powershell
# Connect to PostgreSQL (port 5432)
psql -U postgres

# OR if on port 5433:
psql -U postgres -p 5433

# Create database
CREATE DATABASE dashboard_db;

# Exit
\q
```

### Test Database
```powershell
# Connect to your new database (port 5432)
psql -U postgres -d dashboard_db

# OR if on port 5433:
psql -U postgres -d dashboard_db -p 5433

# Should see: dashboard_db=#
# Type \q to exit
```

## Step 3: Create .env File

Create `.env` in your project root:

```bash
# For port 5432 (default)
DATABASE_URL="postgresql://postgres:your_password_here@localhost:5432/dashboard_db?schema=public"

# OR for port 5433
DATABASE_URL="postgresql://postgres:your_password_here@localhost:5433/dashboard_db?schema=public"
```

> **Important**: Use the password you set during PostgreSQL installation!

## Step 4: Initialize Prisma

If you don't have Prisma set up yet, initialize it:

```bash
npx prisma init
```

This creates the `prisma/` directory and `schema.prisma` file.

## Step 5: Configure Prisma Schema

Update `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Step 6: Create Database Tables

**CRITICAL STEP - Don't skip this!**

```bash
npx prisma db push
```

This creates the actual tables in your database. Without this, your app will crash!

> **What this does:**
> - Creates User table in your database
> - Syncs schema with database
> - Generates Prisma client automatically
> - No migration files (perfect for development)

## Step 7: Open Prisma Studio

```bash
npx prisma studio
```

Opens at `http://localhost:5555` - you can see your database tables!

## Test Your Application

```bash
npm run dev
```

Visit `http://localhost:3000` - your app should work perfectly!

---

## Video Script Summary

1. **Install PostgreSQL** → Download & install, remember password
2. **Create database** → `psql -U postgres` → `CREATE DATABASE dashboard_db;`
3. **Create .env** → Add `DATABASE_URL` with your password
4. **Initialize Prisma** → `npx prisma init`
5. **Update schema** → Add User model to `prisma/schema.prisma`
6. **Create tables** → `npx prisma db push` **CRITICAL**
7. **Open Studio** → `npx prisma studio`

**That's it! Your database is ready for your Next.js app!**

---

## Quick Troubleshooting

### Common Issues:

**"Cannot find module '.prisma/client/default'"**
- Run: `npx prisma db push` (this generates the client automatically)

**"Database connection failed"**
- Check your `.env` file password
- Make sure PostgreSQL is running: `Get-Service postgresql*`

**"User table might not exist"**
- Run: `npx prisma db push` **This is the step everyone forgets!**

**"psql is not recognized"**
- Add PostgreSQL to PATH or use full path:
  ```powershell
  & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
  ```

---

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

**Happy coding!**
