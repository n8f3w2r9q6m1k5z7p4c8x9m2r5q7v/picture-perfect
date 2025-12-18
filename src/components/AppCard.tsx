import { Download, Info } from "lucide-react";
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
      <div className="group relative flex flex-col items-center gap-4 rounded-2xl bg-card p-6 border border-border shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        <DialogTrigger asChild>
          <button className="relative flex h-24 w-24 items-center justify-center rounded-[1.25rem] bg-icon overflow-hidden border border-border/50 cursor-pointer transition-transform duration-300 group-hover:scale-105">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <Download className="h-12 w-12 text-icon-foreground" />
            )}
          </button>
        </DialogTrigger>
        
        <DialogTrigger asChild>
          <span className="text-sm font-semibold text-card-foreground text-center line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-primary transition-colors">
            {name}
          </span>
        </DialogTrigger>
        
        <Button
          onClick={onInstall}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {image && (
              <img src={image} alt={name} className="h-12 w-12 rounded-xl object-cover" />
            )}
            {name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-start gap-2 text-muted-foreground">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{description || "No description available"}</p>
          </div>
          <Button
            onClick={onInstall}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download App
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
