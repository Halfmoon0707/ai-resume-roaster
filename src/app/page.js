"use client";
import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [roastLevel, setRoastLevel] = useState("brutal");

  const handleRoast = async () => {
    if (!resume.trim()) return;
    setLoading(true);
    setRoast("");
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, roastLevel }),
      });
      const data = await res.json();
      setRoast(data.roast);
    } catch (err) {
      setRoast("Something went wrong. Even our AI couldn't handle your resume. 💀");
    }
    setLoading(false);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      "I just got my resume roasted by AI 🔥💀 Try it yourself at resumeroaster.vercel.app"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4">
            🔥 Resume <span className="text-orange-500">Roaster</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Paste your resume and get brutally honest AI feedback.
            No sugar-coating. No mercy. Just facts.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
              🔥 10,000+ resumes roasted
            </span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
              💀 Average ego: destroyed
            </span>
          </div>
        </div>

        {/* Roast Level Selector */}
        <div className="flex justify-center gap-3 mb-6">
          {[
            { id: "mild", label: "😊 Mild", desc: "Gentle feedback" },
            { id: "medium", label: "😈 Medium", desc: "Honest truth" },
            { id: "brutal", label: "💀 Brutal", desc: "No mercy" },
          ].map((level) => (
            <button
              key={level.id}
              onClick={() => setRoastLevel(level.id)}
              className={`px-5 py-3 rounded-xl border-2 transition-all ${
                roastLevel === level.id
                  ? "border-orange-500 bg-orange-500/20 text-orange-400"
                  : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500"
              }`}
            >
              <div className="font-bold">{level.label}</div>
              <div className="text-xs opacity-70">{level.desc}</div>
            </button>
          ))}
        </div>

        {/* Resume Input */}
        <div className="relative">
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume here... (we dare you)"
            className="w-full h-64 bg-gray-900 border-2 border-gray-700 rounded-2xl p-6 text-gray-300 placeholder-gray-600 focus:border-orange-500 focus:outline-none resize-none text-lg"
          />
          <div className="absolute bottom-4 right-4 text-gray-600 text-sm">
            {resume.length} characters
          </div>
        </div>

        {/* Roast Button */}
        <button
          onClick={handleRoast}
          disabled={loading || !resume.trim()}
          className="w-full mt-4 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:from-gray-700 disabled:to-gray-700 rounded-2xl text-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Roasting your resume...
            </span>
          ) : (
            "🔥 ROAST MY RESUME"
          )}
        </button>

        {/* Roast Output */}
        {roast && (
          <div className="mt-8 bg-gray-900 border-2 border-orange-500/30 rounded-2xl p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💀</span>
              <h2 className="text-xl font-bold text-orange-400">The Roast</h2>
            </div>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
              {roast}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={shareOnTwitter}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all"
              >
                🐦 Share on Twitter
              </button>
              <button
                onClick={handleRoast}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all"
              >
                🔄 Roast Again
              </button>
            </div>
          </div>
        )}

        {/* How it Works */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "📋", title: "Paste Resume", desc: "Copy-paste your resume text. We don't store anything." },
            { emoji: "🤖", title: "AI Analyzes", desc: "Our AI reads every line and finds every weakness." },
            { emoji: "🔥", title: "Get Roasted", desc: "Receive brutally honest feedback to actually improve." },
          ].map((step, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">{step.emoji}</div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600 text-sm pb-8">
          <p>Built with 🔥 and zero chill</p>
          <p className="mt-1">Your resume is not stored. We roast and forget.</p>
        </footer>
      </div>
    </div>
  );
}
