import { Smartphone, Play, Download, Settings, Sparkles } from "lucide-react";

interface BuilderToolbarProps {
  projectName: string;
}

export function BuilderToolbar({ projectName }: BuilderToolbarProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-card shrink-0">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h1 className="font-mono font-bold text-sm text-gradient">AppForge AI</h1>
        <span className="text-muted-foreground text-xs mx-2">|</span>
        <span className="text-sm text-foreground">{projectName}</span>
      </div>
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Play className="h-3.5 w-3.5" />} label="Podgląd" />
        <ToolbarButton icon={<Smartphone className="h-3.5 w-3.5" />} label="Emulator" />
        <ToolbarButton icon={<Download className="h-3.5 w-3.5" />} label="Build APK" accent />
        <ToolbarButton icon={<Settings className="h-3.5 w-3.5" />} label="" />
      </div>
    </header>
  );
}

function ToolbarButton({ icon, label, accent }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
        accent
          ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
