import { Plugin } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const viteApiPlugin = (): Plugin => ({
  name: "vite-plugin-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Method Not Allowed" }));
        return;
      }

      try {
        let body = "";
        for await (const chunk of req) {
          body += chunk;
        }
        const parsedBody = JSON.parse(body);
        const userMessage = parsedBody.userMessage || "";
        const websiteContent = parsedBody.websiteContent || "No website context provided.";

        if (!userMessage) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Message is required" }));
          return;
        }

        const apiKey = process.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "API key missing" }));
          return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const systemInstruction = `You are a helpful AI assistant for my personal portfolio website.
Website content:
"""${websiteContent}"""
RULES:
1. Answer based ONLY on the website information. Keep responses concise. Structure your responses with clear spacing and short paragraphs. Avoid heavy Markdown like bolding or italics; use plain text formatting.
2. If the user asks something not covered, asks to contact/hire me, OR enters gibberish/random letters (e.g., "asdfgh"), you must reply EXACTLY with this text and nothing else: '[SHOW_CONTACT_BUTTON]'`;

        // Helper function to keep our code clean
        const tryGenerate = async (modelName: string) => {
          const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
          const result = await model.generateContent(userMessage);
          return result.response.text();
        };

        let responseText = "";

        try {
          // ATTEMPT 1: Primary Model (500 Requests Per Day available)
          responseText = await tryGenerate("gemini-3.1-flash-lite");
        } catch (primaryError) {
          const primaryErrorMessage = primaryError instanceof Error ? primaryError.message : String(primaryError);
          console.warn(">>> Primary Model Failed:", primaryErrorMessage);

          const isRateLimit = primaryErrorMessage.includes('429') || primaryErrorMessage.includes('Too Many Requests');

          if (isRateLimit) {
            console.log(">>> Rate limit hit. Falling back to Gemini 2.5 Flash Lite...");
            try {
              // ATTEMPT 2: Fallback Model (20 Requests Per Day available)
              responseText = await tryGenerate("gemini-2.5-flash-lite");
            } catch (fallbackError) {
              const fallbackErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
              console.error(">>> Fallback Model ALSO failed:", fallbackErrorMessage);
              throw fallbackError;
            }
          } else {
            throw primaryError;
          }
        }

        // Success! Return the response
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ text: responseText }));

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(">>> FINAL GEMINI BACKEND ERROR:", errorMessage);

        // If BOTH models hit rate limits, fail gracefully
        const isRateLimit = errorMessage.includes('429') || errorMessage.includes('Too Many Requests');

        if (isRateLimit) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ text: "I'm receiving a bit too much traffic right now! Please wait about 60 seconds and try asking again." }));
          return;
        }

        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Gemini API Error", details: errorMessage }));
      }
    });
  },
});
