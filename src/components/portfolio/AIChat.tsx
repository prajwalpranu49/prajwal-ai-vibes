import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: "portfolio-chat",
    transport: chatTransport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{ boxShadow: "var(--shadow-glow)" }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card transition-all hover:scale-105"
        aria-label={open ? "Close chat" : "Open AI chat"}
      >
        {open ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-5 w-5 text-foreground" />
            <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
          </div>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{ boxShadow: "var(--shadow-glow)" }}
          className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-border bg-card"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">AI Assistant</div>
              <div className="text-[11px] text-muted-foreground">
                {isLoading ? "Thinking..." : "Ask me anything about Prajwal's work"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex h-[320px] flex-col gap-4 overflow-y-auto px-5 py-4"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <Bot className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Hi! I'm Prajwal's AI assistant. Ask me about his AI creations, viral edits, or cinematic work.
                </p>
              </div>
            )}

            {messages.map((msg: UIMessage) => {
              const text = msg.parts
                .map((part) => (part.type === "text" ? part.text : ""))
                .join("");

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user"
                        ? "bg-primary/20"
                        : "bg-accent/20"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/15 text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="rounded-2xl bg-muted px-3.5 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Prajwal's work..."
              className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
