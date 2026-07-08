import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  // Handle HTTP Method safety
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Vercel automatically parses JSON incoming bodies
    const userMessage = req.body.userMessage || "";
    const websiteContent = req.body.websiteContent || "No website context provided.";

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Look for the Gemini API key in Vercel environment variables
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key missing" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `You are a helpful AI assistant for my personal portfolio website.
Website content:
"""${websiteContent}"""
RULES:
1. Answer based ONLY on the website information. Keep responses concise. Structure your responses with clear spacing and short paragraphs. Avoid heavy Markdown like bolding or italics; use plain text formatting.
2. If the user asks something not covered, asks to contact/hire me, OR enters gibberish/random letters (e.g., "asdfgh"), you must reply EXACTLY with this text and nothing else: '[SHOW_CONTACT_BUTTON]'`;

    const tryGenerate = async (modelName: string) => {
      const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
      const result = await model.generateContent(userMessage);
      return result.response.text();
    };

    let responseText = "";

    try {
      // ATTEMPT 1: Primary Model (High Daily Quota)
      responseText = await tryGenerate("gemini-3.1-flash-lite");
    } catch (primaryError) {
      const primaryErrorMessage = primaryError instanceof Error ? primaryError.message : String(primaryError);
      console.warn(">>> Primary Model Failed:", primaryErrorMessage);

      const isRateLimit = primaryErrorMessage.includes('429') || primaryErrorMessage.includes('Too Many Requests');

      if (isRateLimit) {
        try {
          // ATTEMPT 2: Fallback Model
          responseText = await tryGenerate("gemini-2.5-flash-lite");
        } catch (fallbackError) {
          throw fallbackError;
        }
      } else {
        throw primaryError;
      }
    }

    return res.status(200).json({ text: responseText });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(">>> FINAL GEMINI BACKEND ERROR:", errorMessage);

    if (errorMessage.includes('429') || errorMessage.includes('Too Many Requests')) {
      return res.status(200).json({ text: "I'm receiving a bit too much traffic right now! Please wait about 60 seconds and try asking again." });
    }

    return res.status(500).json({ error: "Gemini API Error", details: errorMessage });
  }
}