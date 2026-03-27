import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAI } from "@/components/ai/AIProvider";

export function AIFloatingButton() {
  const { panelOpen, togglePanel } = useAI();

  return (
    <button
      onClick={togglePanel}
      type="button"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center",
        "rounded-full bg-primary text-primary-foreground shadow-lg",
        "transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "cursor-pointer",
        panelOpen && "scale-0 opacity-0 pointer-events-none"
      )}
      aria-label="Open AI assistant"
    >
      <Bot className="h-6 w-6" />
    </button>
  );
}
