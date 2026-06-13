import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Category fallback Unsplash images (sleek, high-end professional tech photography)
const FALLBACK_IMAGES: Record<string, string[]> = {
  web: [
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  ],
  ai: [
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop"
  ],
  mobile: [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
  ],
  cloud: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop"
  ],
  cybersecurity: [
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route - generate image prompt first, then call image model
  app.post("/api/generate-project-image", async (req, res) => {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: "Title and Category are required." });
    }

    // Curate a default fallback depending on the category
    const categoryGroup = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.web;
    const randomIndex = Math.floor(Math.random() * categoryGroup.length);
    let selectedFallbackUrl = categoryGroup[randomIndex];
    
    // Add seed and random query string to bypass simple browser caches and get a unique look
    const timestampSeed = Date.now();
    selectedFallbackUrl += `&sig=${timestampSeed}`;

    // If Gemini client is not initialized, return the curated fallback immediately
    if (!aiClient) {
      return res.json({
        success: true,
        imageUrl: selectedFallbackUrl,
        prompt: `A beautiful professional thumbnail photo depicting a project about "${title}" in the field of ${category}.`,
        isFallback: true,
        message: "Gemini API key is not configured. Clean fallback image has been returned."
      });
    }

    try {
      // Step 1: Use Gemini 3.5-flash to generate an awesome, precise image prompt
      const promptResponse = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Evaluate this technology project and write a highly creative, futuristic and professional English image prompt for an AI Image Generator. The image will serve as the project's background/card image.
        
        Project Title: "${title}"
        Category Field: "${category}"
        
        Guidelines:
        - Describe a sleek, photorealistic, 3D render or professional high-contrast background suited for an enterprise portfolio.
        - Style should match light and high-end industrial aesthetics: subtle glows, geometric panels, light blue or purple neon cyber accents, glassmorphic elements.
        - Output ONLY a single paragraph of the image generation prompt (around 30-40 words). No additional text, markdown, or chat jargon.`,
      });

      const generatedPrompt = promptResponse.text?.trim() || `Enterprise tech project card for ${title} under ${category} category, photorealistic, premium visual design.`;

      console.log(`Generated Prompt for "${title}":`, generatedPrompt);

      try {
        // Step 2: Use gemini-2.5-flash-image to generate the actual image
        // First check if the user/system is requesting paid model flow or handles it
        const imageResponse = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: generatedPrompt,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1" // Card thumbnail format
            },
          },
        });

        let base64Image = null;
        if (imageResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              base64Image = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
        }

        if (base64Image) {
          return res.json({
            success: true,
            imageUrl: base64Image,
            prompt: generatedPrompt,
            isFallback: false
          });
        } else {
          throw new Error("No image data returned from generator model.");
        }
      } catch (imageErr: any) {
        console.warn("Failed to generate image via gemini-2.5-flash-image:", imageErr.message || imageErr);
        
        // Fallback to picsum with dynamic seed or premium curated unsplash
        const customSeedUrl = `https://picsum.photos/seed/${encodeURIComponent(title + category)}/800/800?blur=1`;
        
        return res.json({
          success: true,
          imageUrl: selectedFallbackUrl, // Prefer sleek unsplash over completely random images
          prompt: generatedPrompt,
          isFallback: true,
          errorDetail: imageErr.message || "Image model generation failed"
        });
      }

    } catch (apiErr: any) {
      console.error("Gemini prompt generation failed completely:", apiErr.message || apiErr);
      return res.json({
        success: true,
        imageUrl: selectedFallbackUrl,
        prompt: `Professional high-tech system card representing "${title}".`,
        isFallback: true
      });
    }
  });

  // Client-side file serving and Vite setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
