import "./globals.css";

export const metadata = {
  title: "Resume Roaster 🔥 | Get Your Resume Brutally Roasted by AI",
  description: "Paste your resume and get brutally honest AI feedback. No sugar-coating. No mercy. Just the truth you need to hear.",
  openGraph: {
    title: "Resume Roaster 🔥 | AI-Powered Resume Roasts",
    description: "I just got my resume roasted by AI. Try it yourself — if you dare.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Roaster 🔥",
    description: "Get your resume brutally roasted by AI. No mercy.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
