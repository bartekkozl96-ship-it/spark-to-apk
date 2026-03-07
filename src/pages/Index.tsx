import { useState } from "react";
import { ScreensPanel } from "@/components/builder/ScreensPanel";
import { EditorCanvas } from "@/components/builder/EditorCanvas";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";
import { AIChatPanel } from "@/components/builder/AIChatPanel";
import { BuilderToolbar } from "@/components/builder/BuilderToolbar";
import { ComponentsPalette } from "@/components/builder/ComponentsPalette";

export interface AppScreen {
  id: string;
  name: string;
  components: UIComponent[];
}

export interface UIComponent {
  id: string;
  type: string;
  label: string;
  props: Record<string, string>;
}

const defaultScreens: AppScreen[] = [
  {
    id: "main",
    name: "Ekran Główny",
    components: [
      { id: "1", type: "text", label: "Nagłówek", props: { text: "Moja Aplikacja", size: "24" } },
      { id: "2", type: "button", label: "Przycisk", props: { text: "Kliknij mnie", color: "primary" } },
    ],
  },
  {
    id: "login",
    name: "Logowanie",
    components: [
      { id: "3", type: "input", label: "Email", props: { placeholder: "Wpisz email", type: "email" } },
      { id: "4", type: "input", label: "Hasło", props: { placeholder: "Wpisz hasło", type: "password" } },
      { id: "5", type: "button", label: "Zaloguj", props: { text: "Zaloguj się", color: "primary" } },
    ],
  },
];

const Index = () => {
  const [screens, setScreens] = useState<AppScreen[]>(defaultScreens);
  const [activeScreenId, setActiveScreenId] = useState("main");
  const [selectedComponent, setSelectedComponent] = useState<UIComponent | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

  const activeScreen = screens.find((s) => s.id === activeScreenId) || screens[0];

  const addScreen = () => {
    const newScreen: AppScreen = {
      id: `screen-${Date.now()}`,
      name: `Ekran ${screens.length + 1}`,
      components: [],
    };
    setScreens([...screens, newScreen]);
    setActiveScreenId(newScreen.id);
  };

  const addComponent = (type: string) => {
    const labelMap: Record<string, string> = {
      button: "Przycisk", text: "Tekst", input: "Pole", image: "Obraz",
      list: "Lista", switch: "Przełącznik", checkbox: "Checkbox", card: "Karta",
      navbar: "Nawigacja", tabs: "Zakładki",
    };
    const comp: UIComponent = {
      id: `comp-${Date.now()}`,
      type,
      label: labelMap[type] || type,
      props: { text: labelMap[type] || type },
    };
    setScreens(screens.map((s) =>
      s.id === activeScreenId ? { ...s, components: [...s.components, comp] } : s
    ));
  };

  const handleAIGenerate = (components: UIComponent[]) => {
    setScreens(screens.map((s) =>
      s.id === activeScreenId ? { ...s, components: [...s.components, ...components] } : s
    ));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BuilderToolbar projectName="Mój Projekt" />
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Screens + Components */}
        <div className="w-60 flex flex-col border-r border-border overflow-hidden">
          <ScreensPanel
            screens={screens}
            activeScreenId={activeScreenId}
            onSelect={setActiveScreenId}
            onAdd={addScreen}
          />
          <ComponentsPalette onAdd={addComponent} />
        </div>

        {/* Center: Editor Canvas */}
        <div className="flex-1 overflow-hidden">
          <EditorCanvas
            screen={activeScreen}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
          />
        </div>

        {/* Right: Properties */}
        <PropertiesPanel component={selectedComponent} />
      </div>

      {/* Bottom: AI Chat */}
      {chatOpen && (
        <AIChatPanel
          onClose={() => setChatOpen(false)}
          onGenerate={handleAIGenerate}
        />
      )}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 right-4 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium glow-cyan text-sm z-50"
        >
          💬 Agent AI
        </button>
      )}
    </div>
  );
};

export default Index;
