// components/ui/loader.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  className?: string;
}

export function Loader({ size = 48, className }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className="animate-spin text-muted-foreground" size={size} />
    </div>
  );
}
