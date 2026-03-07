import { Smartphone } from "lucide-react";
import type { AppScreen, UIComponent } from "@/pages/Index";

interface EditorCanvasProps {
  screen: AppScreen;
  selectedComponent: UIComponent | null;
  onSelectComponent: (c: UIComponent | null) => void;
}

export function EditorCanvas({ screen, selectedComponent, onSelectComponent }: EditorCanvasProps) {
  return (
    <div className="h-full flex items-center justify-center bg-background p-8">
      {/* Phone frame */}
      <div className="relative w-[320px] h-[580px] rounded-[2.5rem] border-2 border-border bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="h-8 bg-muted/50 flex items-center justify-between px-6 text-[10px] text-muted-foreground shrink-0">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-muted-foreground/40 rounded-sm" />
            <div className="w-3 h-1.5 bg-muted-foreground/40 rounded-sm" />
            <div className="w-3 h-1.5 bg-muted-foreground/40 rounded-sm" />
          </div>
        </div>

        {/* Screen title */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Smartphone className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">{screen.name}</span>
          </div>
        </div>

        {/* Components */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3" onClick={() => onSelectComponent(null)}>
          {screen.components.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-xs gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <span className="text-lg">+</span>
              </div>
              <span>Dodaj komponenty</span>
              <span className="text-muted-foreground/60">lub użyj agenta AI</span>
            </div>
          )}
          {screen.components.map((comp) => (
            <div
              key={comp.id}
              onClick={(e) => { e.stopPropagation(); onSelectComponent(comp); }}
              className={`cursor-pointer rounded-lg transition-all ${
                selectedComponent?.id === comp.id
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  : "hover:ring-1 hover:ring-muted-foreground/30"
              }`}
            >
              <ComponentPreview component={comp} />
            </div>
          ))}
        </div>

        {/* Home bar */}
        <div className="h-6 flex items-center justify-center shrink-0">
          <div className="w-24 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ComponentPreview({ component }: { component: UIComponent }) {
  switch (component.type) {
    case "button":
      return (
        <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 rounded-lg text-sm font-medium">
          {component.props.text || "Przycisk"}
        </div>
      );
    case "text":
      return (
        <div className="text-foreground" style={{ fontSize: `${component.props.size || 16}px` }}>
          {component.props.text || "Tekst"}
        </div>
      );
    case "input":
      return (
        <div className="border border-border rounded-lg px-3 py-2.5 text-sm text-muted-foreground bg-muted/30">
          {component.props.placeholder || "Wpisz..."}
        </div>
      );
    case "image":
      return (
        <div className="bg-muted rounded-lg h-24 flex items-center justify-center text-muted-foreground text-xs">
          🖼️ Obraz
        </div>
      );
    case "list":
      return (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-md text-sm text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              Element {i}
            </div>
          ))}
        </div>
      );
    case "switch":
      return (
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm text-foreground">Przełącznik</span>
          <div className="w-9 h-5 bg-primary rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-primary-foreground rounded-full" />
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-4 h-4 border-2 border-primary rounded bg-primary/20 flex items-center justify-center text-primary text-[10px]">✓</div>
          <span className="text-sm text-foreground">Checkbox</span>
        </div>
      );
    case "card":
      return (
        <div className="border border-border rounded-lg p-3 bg-muted/20">
          <div className="h-3 bg-muted-foreground/20 rounded w-3/4 mb-2" />
          <div className="h-2 bg-muted-foreground/10 rounded w-full mb-1" />
          <div className="h-2 bg-muted-foreground/10 rounded w-2/3" />
        </div>
      );
    case "navbar":
      return (
        <div className="flex justify-around py-2 border border-border rounded-lg bg-muted/30">
          {["🏠", "🔍", "👤"].map((icon, i) => (
            <span key={i} className="text-lg">{icon}</span>
          ))}
        </div>
      );
    case "tabs":
      return (
        <div className="flex gap-1">
          {["Tab 1", "Tab 2", "Tab 3"].map((t, i) => (
            <div key={i} className={`px-3 py-1.5 rounded-md text-xs ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {t}
            </div>
          ))}
        </div>
      );
    default:
      return <div className="p-3 bg-muted rounded text-xs text-muted-foreground">{component.type}</div>;
  }
}
