import { Download, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AppCardProps {
  name: string;
  image?: string;
  description?: string;
  installUrl?: string;
  onInstall: () => void;
}

export function AppCard({ name, image, description, onInstall }: AppCardProps) {
  return (
    <Dialog>
      <div className="group relative flex flex-col items-center gap-4 rounded-2xl glass-card p-5 transition-all duration-500 hover:shadow-glow-hover hover:-translate-y-2 hover:border-primary/30 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        {/* Glow effect on hover */}
        <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10" />
        
        <DialogTrigger asChild>
          <button className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-background overflow-hidden cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow border border-border/50 group-hover:border-primary/30">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            )}
          </button>
        </DialogTrigger>
        
        <DialogTrigger asChild>
          <span className="text-sm font-semibold text-foreground text-center line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-primary transition-colors duration-300 relative z-10">
            {name}
          </span>
        </DialogTrigger>
        
        <Button
          onClick={onInstall}
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:scale-[1.02] border-0"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <DialogContent className="sm:max-w-md glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {image ? (
              <div className="relative">
                <img src={image} alt={name} className="h-14 w-14 rounded-xl object-cover border border-border/50" />
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 blur -z-10" />
              </div>
            ) : (
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
            )}
            <span className="text-gradient text-xl">{name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex items-start gap-3 text-muted-foreground bg-muted/30 rounded-xl p-4 border border-border/30">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-sm leading-relaxed">{description || "No description available"}</p>
          </div>
          <Button
            onClick={onInstall}
            className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:opacity-90 font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:scale-[1.02] h-12"
          >
            <Download className="w-5 h-5 mr-2" />
            Download App
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
