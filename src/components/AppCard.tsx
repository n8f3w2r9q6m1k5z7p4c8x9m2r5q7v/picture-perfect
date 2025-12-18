import { Download, Info, Sparkles, ExternalLink } from "lucide-react";
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
      <div className="group relative flex flex-col items-center gap-4 rounded-3xl glass-card p-5 transition-all duration-500 hover:glass-card-hover hover:-translate-y-3 hover:shadow-glow overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-[1px]">
            <div className="h-full w-full rounded-3xl bg-card" />
          </div>
        </div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
        
        {/* Top glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <DialogTrigger asChild>
          <button className="relative flex h-20 w-20 items-center justify-center rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 z-10">
            {/* Icon background with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-secondary/20 rounded-2xl" />
            <div className="absolute inset-[1px] bg-card rounded-2xl" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="relative h-full w-full object-cover rounded-2xl" 
              />
            ) : (
              <Sparkles className="relative h-10 w-10 text-primary group-hover:animate-bounce-subtle" />
            )}
          </button>
        </DialogTrigger>
        
        <DialogTrigger asChild>
          <span className="text-sm font-semibold text-foreground text-center line-clamp-2 min-h-[2.5rem] cursor-pointer transition-all duration-300 relative z-10 group-hover:text-gradient">
            {name}
          </span>
        </DialogTrigger>
        
        <Button
          onClick={onInstall}
          className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:scale-[1.03] border-0 relative overflow-hidden group/btn z-10"
          size="sm"
        >
          {/* Button shimmer */}
          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Download className="w-4 h-4 mr-2 relative" />
          <span className="relative">Download</span>
        </Button>
      </div>

      <DialogContent className="sm:max-w-md glass border-primary/20 shadow-glow-intense">
        {/* Dialog glow effects */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-[60px] pointer-events-none" />
        
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center gap-4">
            {image ? (
              <div className="relative group">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-lg group-hover:opacity-100 transition-opacity animate-pulse-glow" />
                <img src={image} alt={name} className="relative h-16 w-16 rounded-2xl object-cover border border-primary/30" />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-50 blur-lg animate-pulse-glow" />
                <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                  <Sparkles className="h-8 w-8 text-primary animate-bounce-subtle" />
                </div>
              </div>
            )}
            <div>
              <span className="text-gradient text-2xl font-bold">{name}</span>
              <p className="text-xs text-muted-foreground font-mono mt-1">Ready to download</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 relative">
          <div className="flex items-start gap-3 text-muted-foreground bg-muted/30 rounded-2xl p-4 border border-primary/10 backdrop-blur-sm">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-sm leading-relaxed">{description || "No description available"}</p>
          </div>
          
          <Button
            onClick={onInstall}
            className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl transition-all duration-300 hover:shadow-glow-intense hover:scale-[1.02] h-14 text-base relative overflow-hidden group"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Download className="w-5 h-5 mr-3 relative animate-bounce-subtle" />
            <span className="relative">Download Now</span>
            <ExternalLink className="w-4 h-4 ml-3 relative opacity-50" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
