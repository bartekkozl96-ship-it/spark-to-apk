import {
  MousePointerClick, Type, Image, List, ToggleLeft, CheckSquare,
  CreditCard, Navigation, LayoutGrid, TextCursorInput,
} from "lucide-react";

const components = [
  { type: "button", icon: MousePointerClick, label: "Button" },
  { type: "text", icon: Type, label: "Text" },
  { type: "input", icon: TextCursorInput, label: "Input" },
  { type: "image", icon: Image, label: "Image" },
  { type: "list", icon: List, label: "List" },
  { type: "switch", icon: ToggleLeft, label: "Switch" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
  { type: "card", icon: CreditCard, label: "Card" },
  { type: "navbar", icon: Navigation, label: "Navbar" },
  { type: "tabs", icon: LayoutGrid, label: "Tabs" },
];

interface ComponentsPaletteProps {
  onAdd: (type: string) => void;
}

export function ComponentsPalette({ onAdd }: ComponentsPaletteProps) {
  return (
    <div className="border-t border-border">
      <div className="px-3 py-2 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Komponenty</span>
      </div>
      <div className="grid grid-cols-2 gap-1 p-2">
        {components.map((c) => (
          <button
            key={c.type}
            onClick={() => onAdd(c.type)}
            className="flex flex-col items-center gap-1 p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all text-xs"
          >
            <c.icon className="h-4 w-4" />
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
