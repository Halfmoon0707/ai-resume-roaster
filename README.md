# 🔥 Resume Roaster

**Get your resume brutally roasted by AI.** No sugar-coating. No mercy. Just the truth you need to hear.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)

## 🚀 Live Demo

**[resumeroaster.vercel.app](https://ai-resume-roaster-seven.vercel.app)**

## ✨ Features

- 🔥 **3 Roast Levels** — Mild, Medium, and Brutal
- 🤖 **AI-Powered** — Uses Claude to analyze and roast your resume
- 💀 **Smart Fallback** — Demo mode detects buzzwords, missing metrics, and weak formatting
- 🐦 **Share on Twitter** — One-click sharing for viral potential
- 🌙 **Dark Mode UI** — Sleek, modern design
- ⚡ **Fast** — Built with Next.js 16 + Turbopack
- 🔒 **Privacy First** — Resumes are never stored

## 📸 Preview

```
Paste resume → Pick roast level → Get destroyed → Share the pain
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **AI**: Anthropic Claude API
- **Hosting**: Vercel
- **Language**: JavaScript

## 🏃 Run Locally

```bash
git clone https://github.com/Halfmoon0707/ai-resume-roaster.git
cd ai-resume-roaster
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Claude API key for AI roasts | Optional (demo mode works without it) |

Add to `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
```

## 📁 Project Structure

```
ai-resume-roaster/
├── src/
│   └── app/
│       ├── api/roast/route.js   # AI roasting endpoint
│       ├── globals.css           # Global styles
│       ├── layout.js             # Root layout + SEO
│       └── page.js               # Main UI
├── public/                       # Static assets
└── package.json
```

## 🤝 Contributing

PRs welcome. Make it roast harder.

## 📄 License

MIT — Roast freely.

---

**Built with 🔥 and zero chill.**
