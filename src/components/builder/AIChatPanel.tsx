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

  const parseUserIntent = (text: string): { components: UIComponent[]; response: string } => {
    const lower = text.toLowerCase();
    const components: UIComponent[] = [];
    const matched: string[] = [];
    let idCounter = 0;
    const nextId = () => `ai-${Date.now()}-${++idCounter}`;

    // --- Auth / Login / Registration ---
    if (/log(owanie|in|uj)|zaloguj|sign\s?in|autoryzacj/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Tytuł logowania", props: { text: "Zaloguj się", size: "22" } },
        { id: nextId(), type: "input", label: "Email", props: { placeholder: "Adres e-mail", type: "email" } },
        { id: nextId(), type: "input", label: "Hasło", props: { placeholder: "Hasło", type: "password" } },
        { id: nextId(), type: "button", label: "Zaloguj", props: { text: "Zaloguj się", color: "primary" } },
      );
      matched.push("ekran logowania");
    }

    if (/rejestracj|sign\s?up|zarejestruj|rejestruj|konto|załóż/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Tytuł rejestracji", props: { text: "Utwórz konto", size: "22" } },
        { id: nextId(), type: "input", label: "Imię", props: { placeholder: "Twoje imię", type: "text" } },
        { id: nextId(), type: "input", label: "Email", props: { placeholder: "Adres e-mail", type: "email" } },
        { id: nextId(), type: "input", label: "Hasło", props: { placeholder: "Hasło", type: "password" } },
        { id: nextId(), type: "input", label: "Powtórz hasło", props: { placeholder: "Powtórz hasło", type: "password" } },
        { id: nextId(), type: "button", label: "Zarejestruj", props: { text: "Zarejestruj się", color: "primary" } },
      );
      matched.push("formularz rejestracji");
    }

    // --- Lists / Todo / Tasks ---
    if (/lista|zadań|todo|task|zadania|notatk|notes/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Tytuł listy", props: { text: "Moje Zadania", size: "20" } },
        { id: nextId(), type: "input", label: "Nowe zadanie", props: { placeholder: "Wpisz nowe zadanie..." } },
        { id: nextId(), type: "button", label: "Dodaj", props: { text: "➕ Dodaj", color: "primary" } },
        { id: nextId(), type: "checkbox", label: "Zadanie 1", props: { text: "Przykładowe zadanie 1" } },
        { id: nextId(), type: "checkbox", label: "Zadanie 2", props: { text: "Przykładowe zadanie 2" } },
        { id: nextId(), type: "checkbox", label: "Zadanie 3", props: { text: "Przykładowe zadanie 3" } },
      );
      matched.push("lista zadań z checkboxami");
    }

    // --- Profile / Settings ---
    if (/profil|profile|ustawieni|settings|konto użytkownik/i.test(lower)) {
      components.push(
        { id: nextId(), type: "image", label: "Avatar", props: { text: "👤 Avatar" } },
        { id: nextId(), type: "text", label: "Nazwa użytkownika", props: { text: "Jan Kowalski", size: "18" } },
        { id: nextId(), type: "text", label: "Email", props: { text: "jan@email.com", size: "14" } },
        { id: nextId(), type: "card", label: "Dane osobowe", props: { text: "Dane osobowe" } },
        { id: nextId(), type: "switch", label: "Powiadomienia", props: { text: "Powiadomienia push" } },
        { id: nextId(), type: "switch", label: "Tryb ciemny", props: { text: "Tryb ciemny" } },
        { id: nextId(), type: "button", label: "Zapisz", props: { text: "Zapisz zmiany", color: "primary" } },
      );
      matched.push("ekran profilu z ustawieniami");
    }

    // --- Navigation / Menu ---
    if (/nawigacj|menu|nav(bar)?|pasek|drawer|sidebar/i.test(lower)) {
      components.push(
        { id: nextId(), type: "navbar", label: "Nawigacja", props: { text: "Menu główne" } },
        { id: nextId(), type: "tabs", label: "Zakładki", props: { text: "Start | Ulubione | Profil" } },
      );
      matched.push("nawigację z zakładkami");
    }

    // --- Search ---
    if (/szukaj|wyszuk|search|filtr|filter/i.test(lower)) {
      components.push(
        { id: nextId(), type: "input", label: "Wyszukiwarka", props: { placeholder: "🔍 Szukaj...", type: "search" } },
        { id: nextId(), type: "list", label: "Wyniki", props: { text: "Wyniki wyszukiwania" } },
      );
      matched.push("wyszukiwarkę z wynikami");
    }

    // --- Form / Contact ---
    if (/formularz|form|kontakt|contact|wiadomo|message|wyślij/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Tytuł", props: { text: "Skontaktuj się", size: "20" } },
        { id: nextId(), type: "input", label: "Imię", props: { placeholder: "Twoje imię", type: "text" } },
        { id: nextId(), type: "input", label: "Email", props: { placeholder: "Twój email", type: "email" } },
        { id: nextId(), type: "input", label: "Wiadomość", props: { placeholder: "Treść wiadomości...", type: "text" } },
        { id: nextId(), type: "button", label: "Wyślij", props: { text: "Wyślij wiadomość", color: "primary" } },
      );
      matched.push("formularz kontaktowy");
    }

    // --- Chat ---
    if (/chat|czat|rozmow|messenger|wiadomo/i.test(lower) && !matched.includes("formularz kontaktowy")) {
      components.push(
        { id: nextId(), type: "text", label: "Chat", props: { text: "Czat", size: "20" } },
        { id: nextId(), type: "list", label: "Wiadomości", props: { text: "Lista wiadomości" } },
        { id: nextId(), type: "input", label: "Wpisz wiadomość", props: { placeholder: "Napisz wiadomość..." } },
        { id: nextId(), type: "button", label: "Wyślij", props: { text: "📤 Wyślij", color: "primary" } },
      );
      matched.push("interfejs czatu");
    }

    // --- Dashboard / Stats ---
    if (/dashboard|panel|statystyk|stats|wykres|chart|analityk/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Dashboard", props: { text: "Panel główny", size: "22" } },
        { id: nextId(), type: "card", label: "Statystyka 1", props: { text: "📊 Użytkownicy: 1,234" } },
        { id: nextId(), type: "card", label: "Statystyka 2", props: { text: "📈 Przychody: 5,678 zł" } },
        { id: nextId(), type: "card", label: "Statystyka 3", props: { text: "✅ Zadania: 89%" } },
        { id: nextId(), type: "list", label: "Aktywność", props: { text: "Ostatnia aktywność" } },
      );
      matched.push("dashboard ze statystykami");
    }

    // --- Shopping / E-commerce ---
    if (/sklep|shop|produkt|product|koszyk|cart|kup|buy|zamówien|order|e-?commerce/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Sklep", props: { text: "Sklep", size: "22" } },
        { id: nextId(), type: "input", label: "Szukaj produktu", props: { placeholder: "🔍 Szukaj produktów...", type: "search" } },
        { id: nextId(), type: "card", label: "Produkt 1", props: { text: "📦 Produkt A — 49,99 zł" } },
        { id: nextId(), type: "card", label: "Produkt 2", props: { text: "📦 Produkt B — 29,99 zł" } },
        { id: nextId(), type: "button", label: "Dodaj do koszyka", props: { text: "🛒 Dodaj do koszyka", color: "primary" } },
      );
      matched.push("ekran sklepu z produktami");
    }

    // --- Calendar / Events ---
    if (/kalendarz|calendar|event|wydarzen|termin|spotkani|meeting/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Kalendarz", props: { text: "Kalendarz", size: "20" } },
        { id: nextId(), type: "card", label: "Dzisiaj", props: { text: "📅 Dzisiaj — 3 wydarzenia" } },
        { id: nextId(), type: "list", label: "Wydarzenia", props: { text: "Nadchodzące wydarzenia" } },
        { id: nextId(), type: "button", label: "Dodaj wydarzenie", props: { text: "➕ Dodaj wydarzenie", color: "primary" } },
      );
      matched.push("kalendarz z wydarzeniami");
    }

    // --- Gallery / Photos ---
    if (/galeri|gallery|zdjęci|photo|obraz|image|media/i.test(lower)) {
      components.push(
        { id: nextId(), type: "text", label: "Galeria", props: { text: "Galeria", size: "20" } },
        { id: nextId(), type: "image", label: "Zdjęcie 1", props: { text: "🖼️ Zdjęcie 1" } },
        { id: nextId(), type: "image", label: "Zdjęcie 2", props: { text: "🖼️ Zdjęcie 2" } },
        { id: nextId(), type: "image", label: "Zdjęcie 3", props: { text: "🖼️ Zdjęcie 3" } },
        { id: nextId(), type: "button", label: "Dodaj zdjęcie", props: { text: "📷 Dodaj zdjęcie", color: "primary" } },
      );
      matched.push("galerię zdjęć");
    }

    // --- Buttons (generic) ---
    if (/przycisk|button|akcj/i.test(lower) && matched.length === 0) {
      const btnTexts = lower.match(/(?:przycisk|button)\s+"([^"]+)"/gi);
      if (btnTexts) {
        btnTexts.forEach((m) => {
          const label = m.replace(/^(przycisk|button)\s+"/i, "").replace(/"$/, "");
          components.push({ id: nextId(), type: "button", label, props: { text: label, color: "primary" } });
        });
      } else {
        components.push({ id: nextId(), type: "button", label: "Przycisk", props: { text: "Kliknij", color: "primary" } });
      }
      matched.push("przyciski");
    }

    // --- Fallback ---
    if (components.length === 0) {
      components.push(
        { id: nextId(), type: "text", label: "Tytuł", props: { text: "Nowy ekran", size: "20" } },
        { id: nextId(), type: "card", label: "Karta", props: { text: "Treść ekranu" } },
        { id: nextId(), type: "button", label: "Akcja", props: { text: "Kontynuuj", color: "primary" } },
      );
      matched.push("podstawowy ekran");
    }

    const response = matched.length > 0
      ? `✅ Rozpoznałem Twój opis i stworzyłem: **${matched.join(", ")}** (${components.length} komponentów).\n\nMogę rozbudować ten ekran — opisz co chcesz dodać lub zmienić!`
      : `✅ Dodałem podstawowe komponenty. Opisz dokładniej czego potrzebujesz.`;

    return { components, response };
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const { components, response } = parseUserIntent(userMessage);

      if (components.length > 0) {
        onGenerate(components);
      }

      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1200);
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
