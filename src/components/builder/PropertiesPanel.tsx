import { Settings2 } from "lucide-react";
import type { UIComponent } from "@/pages/Index";

interface PropertiesPanelProps {
  component: UIComponent | null;
}

export function PropertiesPanel({ component }: PropertiesPanelProps) {
  return (
    <div className="w-56 border-l border-border overflow-y-auto scrollbar-thin bg-card">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
        <Settings2 className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Właściwości</span>
      </div>

      {!component ? (
        <div className="p-4 text-center text-muted-foreground text-xs">
          <p>Zaznacz komponent</p>
          <p className="mt-1 text-muted-foreground/60">aby edytować właściwości</p>
        </div>
      ) : (
        <div className="p-3 space-y-4 animate-slide-up">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Typ</label>
            <div className="mt-1 px-2 py-1.5 rounded bg-muted text-xs text-foreground font-mono">{component.type}</div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Etykieta</label>
            <input
              className="mt-1 w-full px-2 py-1.5 rounded bg-muted text-xs text-foreground border border-border focus:border-primary focus:outline-none transition-colors"
              defaultValue={component.label}
              readOnly
            />
          </div>
          {Object.entries(component.props).map(([key, val]) => (
            <div key={key}>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{key}</label>
              <input
                className="mt-1 w-full px-2 py-1.5 rounded bg-muted text-xs text-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                defaultValue={val}
                readOnly
              />
            </div>
          ))}
          <div className="pt-2 border-t border-border">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Styl</span>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {["S", "M", "L"].map((size) => (
                <button key={size} className="py-1 text-[10px] rounded bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20">
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
