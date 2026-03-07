import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles, Bot, User } from "lucide-react";
import type { UIComponent } from "@/pages/Index";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  onClose: () => void;
  onGenerate: (components: UIComponent[]) => void;
}

const greetings: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "👋 Cześć! Jestem twoim agentem AI. Opisz mi jaką aplikację chcesz stworzyć, a ja zaprojektuję UI, logikę i wygeneruję kod. Np. \"Chcę aplikację z logowaniem, listą zadań i przyciskiem dodaj zadanie\"",
  },
];

export function AIChatPanel({ onClose, onGenerate }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(greetings);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    // Simulate AI generating components based on keywords
    setTimeout(() => {
      const lower = userMessage.toLowerCase();
      const newComponents: UIComponent[] = [];
      let responseText = "";

      if (lower.includes("logowanie") || lower.includes("login")) {
        newComponents.push(
          { id: `ai-${Date.now()}-1`, type: "text", label: "Tytuł", props: { text: "Zaloguj się", size: "20" } },
          { id: `ai-${Date.now()}-2`, type: "input", label: "Email", props: { placeholder: "Email", type: "email" } },
          { id: `ai-${Date.now()}-3`, type: "input", label: "Hasło", props: { placeholder: "Hasło", type: "password" } },
          { id: `ai-${Date.now()}-4`, type: "button", label: "Zaloguj", props: { text: "Zaloguj się", color: "primary" } },
        );
        responseText = "✅ Stworzyłem ekran logowania z polami email, hasło i przyciskiem logowania.";
      } else if (lower.includes("lista") || lower.includes("zadań") || lower.includes("todo")) {
        newComponents.push(
          { id: `ai-${Date.now()}-1`, type: "text", label: "Tytuł", props: { text: "Moje Zadania", size: "20" } },
          { id: `ai-${Date.now()}-2`, type: "input", label: "Nowe zadanie", props: { placeholder: "Dodaj nowe zadanie..." } },
          { id: `ai-${Date.now()}-3`, type: "button", label: "Dodaj", props: { text: "Dodaj zadanie", color: "primary" } },
          { id: `ai-${Date.now()}-4`, type: "list", label: "Zadania", props: { text: "Lista zadań" } },
        );
        responseText = "✅ Stworzyłem listę zadań z polem do dodawania i listą elementów.";
      } else if (lower.includes("profil") || lower.includes("ustawienia")) {
        newComponents.push(
          { id: `ai-${Date.now()}-1`, type: "image", label: "Avatar", props: { text: "Avatar" } },
          { id: `ai-${Date.now()}-2`, type: "text", label: "Nazwa", props: { text: "Jan Kowalski", size: "18" } },
          { id: `ai-${Date.now()}-3`, type: "card", label: "Info", props: { text: "Informacje profilu" } },
          { id: `ai-${Date.now()}-4`, type: "switch", label: "Powiadomienia", props: { text: "Powiadomienia" } },
        );
        responseText = "✅ Stworzyłem ekran profilu z avatarem, danymi i ustawieniami.";
      } else {
        newComponents.push(
          { id: `ai-${Date.now()}-1`, type: "text", label: "Tytuł", props: { text: "Nowy ekran", size: "20" } },
          { id: `ai-${Date.now()}-2`, type: "button", label: "Akcja", props: { text: "Kliknij", color: "primary" } },
        );
        responseText = `✅ Przeanalizowałem Twój opis i dodałem podstawowe komponenty. Opisz dokładniej co potrzebujesz, a rozbuduję ekran.`;
      }

      if (newComponents.length > 0) {
        onGenerate(newComponents);
      }

      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "assistant", content: responseText },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    simulateAIResponse(input);
  };

  return (
    <div className="h-56 border-t border-border bg-card flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">Agent AI</span>
          {isTyping && <span className="text-[10px] text-primary animate-pulse">myśli...</span>}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
            {msg.role === "assistant" && (
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-3 w-3 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-3 w-3 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="h-3 w-3 text-primary" />
            </div>
            <div className="flex gap-1 px-3 py-2 bg-muted rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-2 border-t border-border shrink-0">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Opisz swoją aplikację..."
            className="flex-1 bg-muted text-foreground text-xs px-3 py-2 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium disabled:opacity-40 hover:bg-primary/90 glow-cyan transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
