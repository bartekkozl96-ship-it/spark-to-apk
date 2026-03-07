import { Plus, Layers } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

interface ScreensPanelProps {
  screens: AppScreen[];
  activeScreenId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function ScreensPanel({ screens, activeScreenId, onSelect, onAdd }: ScreensPanelProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ekrany</span>
        </div>
        <button onClick={onAdd} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => onSelect(screen.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
              screen.id === activeScreenId
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-secondary-foreground hover:bg-secondary"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${screen.id === activeScreenId ? "bg-primary animate-pulse-glow" : "bg-muted-foreground/30"}`} />
              <span className="font-medium truncate">{screen.name}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-4">{screen.components.length} elementów</span>
          </button>
        ))}
      </div>
    </div>
  );
}
