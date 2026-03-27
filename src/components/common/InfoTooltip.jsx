import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function InfoTooltip({ text, side = "top", className, iconClassName }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <HelpCircle className={cn("w-3.5 h-3.5", iconClassName)} />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="max-w-xs text-xs leading-relaxed font-normal"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
