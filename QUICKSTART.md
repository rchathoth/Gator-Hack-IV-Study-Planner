# Quick Start Guide 🚀

## Step 1: Install Dependencies

Open your terminal in this directory and run:

```bash
npm install
```

This will install all required packages (React, TypeScript, Vite, Tailwind CSS, etc.)

**Expected output:** You'll see a progress bar and then "added X packages"

---

## Step 2: Start the Development Server

Once installation is complete, run:

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 3: Open in Browser

Click the link that appears in your terminal (usually `http://localhost:5173/`)

Or manually open: `http://localhost:5173/`

---

## Step 4: Using the Application

1. **Add a Quiz:**
   - Type a quiz name (e.g., "History Midterm")
   - Select a date
   - Click "Add Topic" and enter topic names
   - Click "Add Quiz"

2. **View Study Plan:**
   - Click the "Study Calendar" tab
   - See your AI-generated study schedule
   - Click topics to mark as complete ✓

3. **Get Recommendations:**
   - Scroll down to see AI study tips
   - Follow recommendations for better retention

---

## Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### "Port 5173 already in use"
→ Kill the process using that port:
```bash
# macOS/Linux:
lsof -ti:5173 | xargs kill

# Or use a different port:
npm run dev -- --port 3000
```

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## What's Next?

- Add multiple quizzes
- See your calendar fill up with study tasks
- Track your progress by clicking topics
- Read AI recommendations for each topic

Enjoy your AI-powered study planning! 🎓

