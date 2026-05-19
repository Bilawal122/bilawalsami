import "server-only";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { tallyResponseSchema, type TallyResponse } from "@/lib/schemas";

const SYSTEM_PROMPT = `You are a calorie and macronutrient estimator embedded in
a portfolio demo for an app called Tally.

INPUT: a short free-text description of a meal (max 200 chars).

OUTPUT: STRICT JSON in this exact shape:
{
  "items": [
    { "name": string, "quantity": string, "calories": number, "protein": number,
      "carbs": number, "fat": number, "fibre": number }
  ],
  "total": { "calories": number, "protein": number, "carbs": number,
             "fat": number, "fibre": number }
}

RULES
- Numbers are kcal for calories and grams for protein / carbs / fat / fibre.
- One row per food item.
- If the input names a brand (e.g. "Pret caesar wrap"), use the brand's spec.
- If the input is empty or not food, return zero rows and zero totals.
- Don't ask questions. Don't include prose. Don't wrap in markdown fences.
- The total must equal the sum of the items (rounded to whole numbers).`;

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    items: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          quantity: { type: SchemaType.STRING },
          calories: { type: SchemaType.NUMBER },
          protein: { type: SchemaType.NUMBER },
          carbs: { type: SchemaType.NUMBER },
          fat: { type: SchemaType.NUMBER },
          fibre: { type: SchemaType.NUMBER },
        },
        required: ["name", "quantity", "calories", "protein", "carbs", "fat", "fibre"],
      },
    },
    total: {
      type: SchemaType.OBJECT,
      properties: {
        calories: { type: SchemaType.NUMBER },
        protein: { type: SchemaType.NUMBER },
        carbs: { type: SchemaType.NUMBER },
        fat: { type: SchemaType.NUMBER },
        fibre: { type: SchemaType.NUMBER },
      },
      required: ["calories", "protein", "carbs", "fat", "fibre"],
    },
  },
  required: ["items", "total"],
} as const;

export async function estimateMacros(input: string): Promise<TallyResponse> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return stubResponse(input);

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: "application/json",
      // biome-ignore lint/suspicious/noExplicitAny: SDK type is restrictive
      responseSchema: responseSchema as any,
      temperature: 0.3,
      maxOutputTokens: 1024,
    },
  });

  const result = await model.generateContent(input);
  const text = result.response.text();
  const parsed = tallyResponseSchema.safeParse(JSON.parse(text));
  if (!parsed.success) {
    return {
      items: [],
      total: { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 },
      error: "Gemini returned an unexpected shape.",
    };
  }
  return parsed.data;
}

/* -------- stub used in dev / preview when GEMINI_API_KEY is unset ---------- */

function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h);
}

function stubResponse(input: string): TallyResponse {
  // very rough keyword classifier — produces *plausible* numbers without
  // pretending to be a real model. The UI badges this with "STUB".
  const lower = input.toLowerCase();
  const items: TallyResponse["items"] = [];
  const push = (
    name: string,
    quantity: string,
    cal: number,
    p: number,
    c: number,
    f: number,
    fb: number,
  ) => items.push({ name, quantity, calories: cal, protein: p, carbs: c, fat: f, fibre: fb });

  if (/toast|bread/.test(lower)) push("Toast", "2 slices", 160, 6, 30, 2, 3);
  if (/butter/.test(lower)) push("Butter", "10 g", 70, 0, 0, 8, 0);
  if (/coffee|espresso/.test(lower)) push("Black coffee", "1 cup", 2, 0, 0, 0, 0);
  if (/latte/.test(lower)) push("Oat-milk latte", "large", 180, 5, 22, 8, 1);
  if (/egg/.test(lower)) push("Eggs", "3 large", 215, 18, 1, 14, 0);
  if (/avocado/.test(lower)) push("Avocado", "1/2 fruit", 120, 1, 6, 11, 5);
  if (/sourdough/.test(lower)) push("Sourdough", "1 slice", 110, 4, 22, 1, 2);
  if (/chicken/.test(lower)) push("Chicken", "120 g", 198, 30, 0, 8, 0);
  if (/wrap/.test(lower)) push("Tortilla wrap", "1", 180, 5, 28, 5, 2);
  if (/caesar/.test(lower)) push("Caesar dressing + parm", "30 g", 130, 3, 1, 13, 0);

  if (items.length === 0) {
    // generic per-character heuristic so any input yields a card
    const seed = hash(lower);
    const cal = 220 + (seed % 240);
    const protein = 8 + (seed % 16);
    const carbs = 12 + (seed % 28);
    const fat = 6 + (seed % 18);
    const fibre = 1 + (seed % 6);
    push(input.slice(0, 40), "estimate", cal, protein, carbs, fat, fibre);
  }

  const total = items.reduce(
    (acc, it) => ({
      calories: acc.calories + it.calories,
      protein: acc.protein + it.protein,
      carbs: acc.carbs + it.carbs,
      fat: acc.fat + it.fat,
      fibre: acc.fibre + it.fibre,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 },
  );

  return { items, total, stub: true };
}
