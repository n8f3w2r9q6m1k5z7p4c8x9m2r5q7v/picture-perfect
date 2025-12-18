import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppCardProps {
  name: string;
  iconUrl?: string | null;
  downloadUrl?: string | null;
  onInstall: () => void;
}

export function AppCard({ name, iconUrl, onInstall }: AppCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-4 transition-transform hover:scale-105">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-icon">
        {iconUrl ? (
          <img src={iconUrl} alt={name} className="h-12 w-12 object-contain" />
        ) : (
          <Download className="h-10 w-10 text-icon-foreground" />
        )}
      </div>
      <span className="text-sm font-medium text-card-foreground">{name}</span>
      <Button
        onClick={onInstall}
        className="w-full bg-install text-install-foreground hover:bg-install/90 font-semibold"
        size="sm"
      >
        Install
      </Button>
    </div>
  );
}
