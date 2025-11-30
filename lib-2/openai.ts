// OpenAI API integration for transcription and summarization
// IMPORTANT: In production, API calls should go through your backend to keep API keys secure
// This is for demo purposes only

const OPENAI_API_KEY =
  "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"; // Replace with your API key or use environment variables

export async function transcribeAudio(
  audioBlob: Blob,
  filename: string,
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, filename);
    formData.append("model", "whisper-1");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Transcription failed: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
}

export async function summarizeTranscript(
  transcript: string,
): Promise<string> {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that converts lecture transcripts into concise study notes with bullet points and key takeaways.",
            },
            {
              role: "user",
              content: `Please create a clear, structured summary and key points from the following lecture transcript. Provide 6–12 bullet points and short action items for studying:\n\n${transcript}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Summarization failed: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Summarization error:", error);
    throw error;
  }
}

// Quiz Generation Types
export interface QuizQuestion {
  question: string;
  options?: string[];
  answer: string;
}

export interface QuizSettings {
  numQuestions: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questionType: "Multiple Choice" | "Short Answer";
  stimulus: string;
}

// Generate quiz questions from stimulus text
export async function generateQuizQuestions(
  settings: QuizSettings,
): Promise<QuizQuestion[]> {
  try {
    const prompt = `You are a quiz generator for college-level practice.
Create exactly ${settings.numQuestions} ${settings.questionType.toLowerCase()} questions
based on the following stimulus:

${settings.stimulus}

Return a valid JSON array (ONLY JSON) of objects. Each object must have:
- question: string
${
  settings.questionType === "Multiple Choice"
    ? "- options: array of 4 strings\n- answer: the exact string of the correct option"
    : "- answer: the canonical short answer (1-2 sentences)"
}

Do not include any commentary or extraneous text. Keep JSON strictly parseable.`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that outputs strict JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Quiz generation failed: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Try to parse JSON
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try to extract JSON array from text
      const arrRegex = /\[.*\]/s;
      const match = content.match(arrRegex);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error(
          "Could not parse quiz questions from response",
        );
      }
    }

    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array");
    }

    return parsed.slice(0, settings.numQuestions);
  } catch (error) {
    console.error("Quiz generation error:", error);
    throw error;
  }
}

// Grade a short answer using AI
export async function gradeShortAnswer(
  question: string,
  correctAnswer: string,
  userAnswer: string,
): Promise<boolean> {
  try {
    const prompt = `You are a strict but fair grader.
Decide whether the user's short answer is correct given the canonical correct answer.
Return strictly JSON: {"correct": true or false}

Question: ${question}
Canonical answer: ${correctAnswer}
User answer: ${userAnswer}

Answer only the JSON.`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a grader that outputs strict JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.0,
          max_tokens: 40,
        }),
      },
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Try to parse JSON or look for true/false
    try {
      const parsed = JSON.parse(content);
      return parsed.correct === true;
    } catch {
      return content.toLowerCase().includes("true");
    }
  } catch (error) {
    console.error("Grading error:", error);
    return false;
  }
}

// Generate practice suggestions based on incorrect answers
export async function generatePracticeSuggestions(
  incorrectQuestions: Array<{
    question: string;
    answer: string;
  }>,
): Promise<string[]> {
  if (incorrectQuestions.length === 0) return [];

  try {
    const prompt = `Given the following incorrect items from a quiz, suggest 4-6 concise topics or skills the student should practice (one per line):

${incorrectQuestions.map((q, i) => `${i + 1}. ${q.question}\nCorrect answer: ${q.answer}`).join("\n\n")}

Provide actionable study recommendations.`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that provides study suggestions in a short bullet list.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.6,
          max_tokens: 200,
        }),
      },
    );

    if (!response.ok) {
      return ["Unable to generate suggestions"];
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Split into lines and clean up
    const lines = content
      .split(/[\r\n]+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[\-\d\.\)•\*]\s*/, ""))
      .slice(0, 6);

    return lines;
  } catch (error) {
    console.error("Suggestion generation error:", error);
    return ["Unable to generate practice suggestions"];
  }
}

// Mock functions for demo (when API key is not provided)
export async function mockTranscribeAudio(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return `Welcome to Introduction to Photosynthesis. Today we'll be discussing how plants convert light energy into chemical energy. Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments. During this process, plants take in carbon dioxide from the air and water from the soil. Using the energy from sunlight, these substances are converted into glucose and oxygen. The process can be divided into two main stages: the light-dependent reactions and the light-independent reactions, also known as the Calvin cycle.`;
}

export async function mockSummarizeTranscript(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return `**Key Points from Lecture:**

• Photosynthesis is the process where plants convert light energy into chemical energy
• Requires three main inputs: sunlight, carbon dioxide (CO₂), and water (H₂O)
• Produces glucose (C₆H₁₂O₆) and oxygen (O₂) as outputs
• Chlorophyll pigments are essential for capturing light energy
• Two main stages:
  - Light-dependent reactions (occur in thylakoid membranes)
  - Light-independent reactions/Calvin cycle (occur in stroma)

**Study Action Items:**
• Review the chemical equation for photosynthesis
• Understand the role of chlorophyll in light absorption
• Compare and contrast the two stages of photosynthesis
• Practice drawing diagrams of chloroplast structure`;
}

// Generate smart summary from any text input
export async function generateSmartSummary(text: string): Promise<string> {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that creates concise, well-structured summaries of educational content. Format your response with **Key Points:** followed by bullet points, and optionally a **Quick Summary:** section.",
            },
            {
              role: "user",
              content: `Please create a clear, concise summary of the following text. Extract the main points and present them in an easy-to-digest format with bullet points:\n\n${text}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Summary generation failed: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Summary generation error:", error);
    throw error;
  }
}

// Highlight types for text analysis
export interface HighlightedSegment {
  text: string;
  type: 'normal' | 'keyword' | 'definition' | 'important';
}

// Generate smart highlights from text
export async function generateSmartHighlights(
  text: string,
): Promise<HighlightedSegment[]> {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that analyzes educational text and identifies key terms, definitions, and important concepts. Return ONLY valid JSON.",
            },
            {
              role: "user",
              content: `Analyze the following text and identify:
1. Keywords (key terms and vocabulary)
2. Definitions (explanations and descriptions)
3. Important concepts (critical facts and ideas)

Return a JSON object with this structure:
{
  "keywords": ["term1", "term2", ...],
  "definitions": ["phrase1", "phrase2", ...],
  "important": ["concept1", "concept2", ...]
}

Text to analyze:
${text}

Return ONLY the JSON object, no additional text.`,
            },
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Highlight generation failed: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse the JSON response
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try to extract JSON from text
      const jsonRegex = /\{[\s\S]*\}/;
      const match = content.match(jsonRegex);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse highlights from response");
      }
    }

    // Convert to highlighted segments
    const segments: HighlightedSegment[] = [];
    const keywords = new Set(parsed.keywords || []);
    const definitions = new Set(parsed.definitions || []);
    const important = new Set(parsed.important || []);

    // Split text into segments and classify each
    let remainingText = text;
    const allHighlights = [
      ...Array.from(keywords).map(k => ({ text: k, type: 'keyword' as const })),
      ...Array.from(definitions).map(d => ({ text: d, type: 'definition' as const })),
      ...Array.from(important).map(i => ({ text: i, type: 'important' as const })),
    ];

    // Sort by length (longest first) to avoid partial matches
    allHighlights.sort((a, b) => b.text.length - a.text.length);

    // Build segments by finding and classifying text
    while (remainingText.length > 0) {
      let foundMatch = false;

      for (const highlight of allHighlights) {
        const index = remainingText.toLowerCase().indexOf(highlight.text.toLowerCase());
        if (index !== -1) {
          // Add text before the match as normal
          if (index > 0) {
            segments.push({
              text: remainingText.substring(0, index),
              type: 'normal',
            });
          }

          // Add the highlighted text
          segments.push({
            text: remainingText.substring(index, index + highlight.text.length),
            type: highlight.type,
          });

          remainingText = remainingText.substring(index + highlight.text.length);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        // No more highlights found, add remaining text as normal
        segments.push({
          text: remainingText,
          type: 'normal',
        });
        break;
      }
    }

    return segments;
  } catch (error) {
    console.error("Highlight generation error:", error);
    throw error;
  }
}

export async function mockGenerateQuizQuestions(
  settings: QuizSettings,
): Promise<QuizQuestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (settings.questionType === "Multiple Choice") {
    return [
      {
        question:
          "What is the primary function of chlorophyll in photosynthesis?",
        options: [
          "To absorb light energy",
          "To produce oxygen",
          "To store glucose",
          "To transport water",
        ],
        answer: "To absorb light energy",
      },
      {
        question:
          "Which organelle is responsible for photosynthesis in plant cells?",
        options: [
          "Mitochondria",
          "Chloroplast",
          "Nucleus",
          "Ribosome",
        ],
        answer: "Chloroplast",
      },
      {
        question:
          "What are the two main products of photosynthesis?",
        options: [
          "Glucose and oxygen",
          "Carbon dioxide and water",
          "ATP and NADPH",
          "Proteins and lipids",
        ],
        answer: "Glucose and oxygen",
      },
      {
        question:
          "Where do the light-independent reactions (Calvin cycle) occur?",
        options: [
          "In the stroma",
          "In the thylakoid membrane",
          "In the cytoplasm",
          "In the mitochondria",
        ],
        answer: "In the stroma",
      },
      {
        question:
          "What is the source of oxygen released during photosynthesis?",
        options: [
          "Carbon dioxide",
          "Water molecules",
          "Glucose",
          "Atmospheric oxygen",
        ],
        answer: "Water molecules",
      },
    ].slice(0, settings.numQuestions);
  } else {
    return [
      {
        question:
          "Explain the role of chlorophyll in photosynthesis.",
        answer:
          "Chlorophyll is a green pigment that absorbs light energy from the sun, which is then used to convert carbon dioxide and water into glucose and oxygen.",
      },
      {
        question:
          "What are the two main stages of photosynthesis?",
        answer:
          "The two main stages are the light-dependent reactions (which occur in the thylakoid membranes) and the light-independent reactions or Calvin cycle (which occur in the stroma).",
      },
      {
        question:
          "Why is photosynthesis important for life on Earth?",
        answer:
          "Photosynthesis produces oxygen that most organisms need to breathe and creates glucose that serves as the foundation of most food chains.",
      },
    ].slice(0, settings.numQuestions);
  }
}