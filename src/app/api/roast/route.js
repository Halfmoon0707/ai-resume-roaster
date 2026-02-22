import { NextResponse } from "next/server";

export async function POST(request) {
  const { resume, roastLevel = "brutal" } = await request.json();

  if (!resume || resume.trim().length < 20) {
    return NextResponse.json(
      { roast: "That's not a resume, that's a sticky note. Give me something to work with. 💀" },
      { status: 400 }
    );
  }

  const toneGuide = {
    mild: "Give constructive but slightly sarcastic feedback. Be helpful but add some humor. Keep it mostly positive with gentle jabs.",
    medium: "Be honest and direct. Point out flaws with witty commentary. Mix genuine advice with roasts. Don't hold back on obvious issues.",
    brutal: "Be absolutely savage. Roast every weakness mercilessly. Use dark humor, sarcasm, and brutal honesty. Make it funny but painfully accurate. Channel a stand-up comedian reviewing a resume. No mercy.",
  };

  const prompt = `You are the world's most savage resume reviewer. You're a mix of Gordon Ramsay and a brutally honest career coach.

TONE: ${toneGuide[roastLevel] || toneGuide.brutal}

INSTRUCTIONS:
- Roast the resume section by section
- Point out red flags, weak bullet points, buzzword abuse, vague claims
- Use emojis sparingly for emphasis 🔥💀
- After the roast, give 3 actual actionable tips to improve
- Keep it under 400 words
- Make it entertaining enough that people want to share it
- End with a savage one-liner summary

RESUME:
${resume}

Now roast this resume:`;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Demo mode - return a canned roast
    return NextResponse.json({
      roast: getDemoRoast(resume),
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const roastText = data.content?.[0]?.text || "Even our AI is speechless. That's not a good sign. 💀";

    return NextResponse.json({ roast: roastText });
  } catch (error) {
    return NextResponse.json({
      roast: getDemoRoast(resume),
    });
  }
}

function getDemoRoast(resume) {
  const wordCount = resume.split(/\s+/).length;
  const hasBuzzwords = /synergy|passionate|team player|detail-oriented|self-starter|go-getter|hard worker/i.test(resume);
  const hasMetrics = /\d+%|\$\d+|\d+ (users|customers|clients|projects)/i.test(resume);

  let roast = "";

  if (wordCount < 100) {
    roast += "🔥 **Length Check**: Your resume is shorter than a Tinder bio. And probably just as effective at getting responses.\n\n";
  } else if (wordCount > 800) {
    roast += "🔥 **Length Check**: This isn't a resume, it's a novel. Nobody's reading all of this. Not even the AI wanted to finish it.\n\n";
  }

  if (hasBuzzwords) {
    roast += "💀 **Buzzword Alert**: 'Passionate team player who's detail-oriented'? Congratulations, you just described every single applicant ever. You're as unique as a white Honda Civic in a parking lot.\n\n";
  }

  if (!hasMetrics) {
    roast += "📊 **Where are the numbers?** Not a single metric in sight. 'Improved processes' — by how much? 'Led team' — of how many? 'Increased sales' — from $1 to $2? Without numbers, these are just bedtime stories.\n\n";
  }

  roast += `🎯 **The Vibe Check**: This resume screams "I spent 15 minutes on this and hoped for the best." The formatting says 2024, but the content says 2004.\n\n`;

  roast += `**3 Things To Actually Fix:**\n`;
  roast += `1. Add real metrics — numbers are the only thing recruiters trust more than referrals\n`;
  roast += `2. Kill every buzzword and replace it with a specific achievement\n`;
  roast += `3. Your summary should hook in 6 seconds — right now it's putting people to sleep\n\n`;

  roast += `**TL;DR**: If this resume were a spice, it would be flour. 💀`;

  return roast;
}
