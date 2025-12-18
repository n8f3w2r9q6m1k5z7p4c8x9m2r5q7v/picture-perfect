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
    <div className="group relative flex flex-col items-center gap-4 rounded-2xl bg-card p-6 border border-border shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.25rem] bg-icon overflow-hidden border border-border/50">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        ) : (
          <Download className="h-12 w-12 text-icon-foreground" />
        )}
      </div>
      
      <span className="text-sm font-semibold text-card-foreground text-center line-clamp-2 min-h-[2.5rem]">
        {name}
      </span>
      
      <Button
        onClick={onInstall}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
}