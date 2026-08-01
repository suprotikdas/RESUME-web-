import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client Lazily/Safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// 1. ✨ Improve Text with AI
app.post("/api/improve", async (req, res) => {
  try {
    const { text, contextType, targetRole } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required for AI enhancement." });
    }

    const ai = getGeminiClient();
    const prompt = `You are a world-class ATS Resume Expert and Recruiter.
    Improve the following text snippet for a resume targeting the role "${targetRole || "Professional"}".
    
    Context Type: ${contextType || "bullet points"}
    Original Input:
    "${text}"

    Rules:
    1. Use strong, high-impact active verbs (e.g., Spearheaded, Architected, Engineered, Quantified).
    2. Follow the STAR (Situation, Task, Action, Result) methodology where applicable.
    3. Include quantified metrics or estimates if plausible.
    4. Eliminate passive voice, filler words, and subjective praise (e.g., replace "hard worker" with measurable results).
    5. Ensure high keyword density and strict ATS compliance.

    Return a JSON object with:
    - "improvedText": a refined, polished string (use bullet points starting with '• ' if contextType is experience or project)
    - "explanation": brief 1-sentence note explaining what was improved.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedText: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["improvedText", "explanation"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("AI Improve error:", error);
    return res.status(500).json({
      error: error.message || "Failed to process AI improvement request.",
    });
  }
});

// 2. ✨ Generate Smart Summary Options
app.post("/api/generate-summary", async (req, res) => {
  try {
    const { resumeData } = req.body;
    const ai = getGeminiClient();

    const prompt = `You are an executive resume writer. Generate 3 tailored, recruiter-friendly Professional Summary options based on this user resume data:
    
    Name: ${resumeData.personalInfo?.fullName || "Candidate"}
    Target Role: ${resumeData.personalInfo?.targetRole || "Professional"}
    Experience Count: ${resumeData.experience?.length || 0} positions
    Recent Roles: ${resumeData.experience?.map((e: any) => `${e.position} at ${e.company}`).join(", ")}
    Top Skills: ${resumeData.skillCategories?.flatMap((c: any) => c.skills).slice(0, 10).join(", ")}
    
    Generate 3 distinct choices:
    1. "Impact & Metric Driven" (focuses on measurable results and business outcomes)
    2. "Technical & Skill Centric" (highlights domain mastery, tech stack, and frameworks)
    3. "Modern Concise Leader" (high-energy, punchy 2-3 sentence elevator pitch)

    Return a JSON object containing an array "options" where each element has:
    - "title": string (e.g. "Metric-Driven Summary")
    - "text": string (2-4 sentences summary text)
    - "tag": string (e.g. "Best for Tech Lead", "High Impact")`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  text: { type: Type.STRING },
                  tag: { type: Type.STRING },
                },
                required: ["title", "text", "tag"],
              },
            },
          },
          required: ["options"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Generate Summary error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate professional summary." });
  }
});

// 3. ✨ Auto-Categorize Skills
app.post("/api/categorize-skills", async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: "Skills array is required." });
    }

    const ai = getGeminiClient();
    const prompt = `Categorize the following skills into distinct technical or professional categories:
    Skills list: ${skills.join(", ")}

    Categories to choose from or organize into:
    - "Programming Languages"
    - "Frameworks & Libraries"
    - "Developer Tools & Platforms"
    - "Cloud & DevOps"
    - "Databases & Storage"
    - "Security & Networking"
    - "Soft Skills & Management"

    Return a JSON object containing an array "categories", where each item has:
    - "categoryName": string
    - "skills": array of strings (must only contain skills from the user's list or closely formatted names)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            categories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  categoryName: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["categoryName", "skills"],
              },
            },
          },
          required: ["categories"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Skill Categorize error:", error);
    return res.status(500).json({ error: error.message || "Failed to categorize skills." });
  }
});

// 4. ✨ ATS Score Radial Gauge & Detailed Breakdown
app.post("/api/ats-score", async (req, res) => {
  try {
    const { resumeData } = req.body;
    const ai = getGeminiClient();

    const prompt = `You are a strict ATS (Applicant Tracking System) parser and recruiter algorithm.
    Analyze the following resume JSON thoroughly:
    ${JSON.stringify(resumeData)}

    Provide an objective, detailed score breakdown and actionable audit:
    - "overallScore": 0-100 integer rating
    - "breakdown": Scores out of 100 for: formatting, keywords, projects, experience, skills, achievements, grammar, education, missingSections
    - "strengthPoints": list of 3-4 strengths
    - "missingKeywords": list of 4-6 recommended high-value industry keywords missing
    - "weakVerbsDetected": list of passive or weak verbs found (e.g., "helped", "worked on", "responsible for")
    - "passiveVoiceFlags": list of sentences or bullets using passive voice
    - "recommendations": list of 4 concrete step-by-step suggestions to boost score to 95+`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                formatting: { type: Type.INTEGER },
                keywords: { type: Type.INTEGER },
                projects: { type: Type.INTEGER },
                experience: { type: Type.INTEGER },
                skills: { type: Type.INTEGER },
                achievements: { type: Type.INTEGER },
                grammar: { type: Type.INTEGER },
                education: { type: Type.INTEGER },
                missingSections: { type: Type.INTEGER },
              },
              required: [
                "formatting", "keywords", "projects", "experience",
                "skills", "achievements", "grammar", "education", "missingSections"
              ],
            },
            strengthPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            weakVerbsDetected: { type: Type.ARRAY, items: { type: Type.STRING } },
            passiveVoiceFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            "overallScore", "breakdown", "strengthPoints",
            "missingKeywords", "weakVerbsDetected", "passiveVoiceFlags", "recommendations"
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("ATS Score error:", error);
    return res.status(500).json({ error: error.message || "Failed to analyze ATS score." });
  }
});

// 5. ✨ Job Description Analyzer & Keyword Matcher
app.post("/api/jd-match", async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({ error: "Job description is too short to analyze." });
    }

    const ai = getGeminiClient();
    const prompt = `Compare this user's resume against the target Job Description below:
    
    RESUME SUMMARY & SKILLS:
    Target Role: ${resumeData.personalInfo?.targetRole || ""}
    Skills: ${resumeData.skillCategories?.flatMap((c: any) => c.skills).join(", ")}
    Experience Summary: ${resumeData.experience?.map((e: any) => e.position + ": " + e.description).join(" | ")}

    JOB DESCRIPTION:
    "${jobDescription}"

    Return JSON:
    - "matchPercentage": integer 0-100
    - "jobTitleExtracted": title of the job from JD
    - "companyExtracted": company name if mentioned, else "Target Employer"
    - "matchedKeywords": array of matching skills/terms
    - "missingKeywords": array of crucial skills/technologies mentioned in JD but missing in resume
    - "suggestedAdditions": array of objects { "section": "Skills|Experience|Summary", "suggestion": "Bullet or skill to add" }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchPercentage: { type: Type.INTEGER },
            jobTitleExtracted: { type: Type.STRING },
            companyExtracted: { type: Type.STRING },
            matchedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedAdditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                },
                required: ["section", "suggestion"],
              },
            },
          },
          required: ["matchPercentage", "jobTitleExtracted", "companyExtracted", "matchedKeywords", "missingKeywords", "suggestedAdditions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("JD Match error:", error);
    return res.status(500).json({ error: error.message || "Failed to compare Job Description." });
  }
});

// 6. ✨ AI Interview Prep Questions & STAR Model Guides
app.post("/api/interview-prep", async (req, res) => {
  try {
    const { resumeData } = req.body;
    const ai = getGeminiClient();

    const prompt = `Generate 5 custom, highly realistic interview questions tailored specifically to this resume content:
    Target Role: ${resumeData.personalInfo?.targetRole || "Candidate"}
    Experience: ${JSON.stringify(resumeData.experience)}
    Projects: ${JSON.stringify(resumeData.projects)}
    Skills: ${resumeData.skillCategories?.flatMap((c: any) => c.skills).join(", ")}

    Return JSON containing array "questions":
    Each item:
    - "question": string
    - "type": "Behavioral" | "Technical" | "Leadership" | "Project-Deep-Dive"
    - "context": why recruiters ask this for this specific resume
    - "starGuide": object with { "situation": string, "task": string, "action": string, "result": string }
    - "keyTips": array of 2-3 bullet tips to highlight in the interview.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  type: { type: Type.STRING },
                  context: { type: Type.STRING },
                  starGuide: {
                    type: Type.OBJECT,
                    properties: {
                      situation: { type: Type.STRING },
                      task: { type: Type.STRING },
                      action: { type: Type.STRING },
                      result: { type: Type.STRING },
                    },
                    required: ["situation", "task", "action", "result"],
                  },
                  keyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["question", "type", "context", "starGuide", "keyTips"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Interview Prep error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate interview prep." });
  }
});

// 7. ✨ Skill Suggestions Engine
app.post("/api/suggest-skills", async (req, res) => {
  try {
    const { existingSkills, targetRole } = req.body;
    const ai = getGeminiClient();

    const prompt = `Suggest 10 complementary, high-demand skills or frameworks for a candidate targeting the role "${targetRole || "Software Engineer"}" who already has these skills: ${existingSkills?.join(", ") || "None"}.
    Return JSON with array "suggestions" containing strings.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["suggestions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Skill Suggest error:", error);
    return res.status(500).json({ error: error.message || "Failed to suggest skills." });
  }
});

// ----------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVER
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HireCraft AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
