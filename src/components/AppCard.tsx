import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppCardProps {
  name: string;
  image?: string;
  installUrl?: string;
  onInstall: () => void;
}

export function AppCard({ name, image, onInstall }: AppCardProps) {
  return (
    <div className="group flex flex-col items-center gap-4 rounded-2xl bg-card p-5 border border-border/50 transition-all duration-300 hover:border-primary/50 hover:glow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-icon overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
          />
        ) : (
          <Download className="h-10 w-10 text-icon-foreground" />
        )}
      </div>
      <span className="text-sm font-medium text-card-foreground text-center line-clamp-2">{name}</span>
      <Button
        onClick={onInstall}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300 hover:glow-sm"
        size="sm"
      >
        Install
      </Button>
    </div>
  );
}