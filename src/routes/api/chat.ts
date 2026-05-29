import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

const MAX_MESSAGES = 20;
const MAX_TEXT_PER_PART = 4000;
const MAX_TOTAL_CHARS = 20000;

const TextPartSchema = z.object({
  type: z.literal("text"),
  text: z.string().max(MAX_TEXT_PER_PART),
});

const PartSchema = z.union([
  TextPartSchema,
  z.object({ type: z.string() }).passthrough(),
]);

const MessageSchema = z.object({
  id: z.string().max(128).optional(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(PartSchema).min(1).max(20),
});

const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(MAX_MESSAGES),
});

// Simple in-memory IP rate limiter (best-effort; resets per worker instance)
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 15;
const ipHits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.reset < now) {
    ipHits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_MAX;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";
        if (!rateLimit(ip)) {
          return new Response("Too many requests", { status: 429 });
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const parsed = BodySchema.safeParse(raw);
        if (!parsed.success) {
          return new Response("Invalid request payload", { status: 400 });
        }
        const { messages } = parsed.data;

        const totalChars = messages.reduce(
          (sum, m) =>
            sum +
            m.parts.reduce(
              (s, p) => s + (p.type === "text" && typeof (p as { text?: string }).text === "string" ? (p as { text: string }).text.length : 0),
              0,
            ),
          0,
        );
        if (totalChars > MAX_TOTAL_CHARS) {
          return new Response("Payload too large", { status: 413 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Service unavailable", { status: 503 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");
        const result = streamText({
          model,
          system:
            "You are an AI assistant for Prajwal Pranu's portfolio website. " +
            "You can answer questions about his work as an AI Creator, viral video editor, and cinematic visual director. " +
            "Be concise, creative, and friendly. If asked about specific projects, mention his work in AI short films, viral brand edits, and cinematic music videos.",
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
