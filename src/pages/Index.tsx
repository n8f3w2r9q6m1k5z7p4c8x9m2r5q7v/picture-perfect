import { useState } from "react";
import { Search } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { useApps } from "@/hooks/useApps";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const { data: apps, isLoading, error } = useApps();
  const [search, setSearch] = useState("");

  const handleInstall = (app: { name: string; install: string }) => {
    if (app.install) {
      window.open(app.install, "_blank");
      toast.success(`Downloading ${app.name}`);
    } else {
      toast.info(`No download available for ${app.name} yet`);
    }
  };

  const filteredApps = apps?.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Failed to load apps</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-8">
      <header className="mb-8 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            App Store
          </h1>
          <p className="text-muted-foreground">Discover and install amazing apps</p>
        </div>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4 rounded-2xl bg-card p-5 animate-pulse border border-border/50">
              <div className="h-20 w-20 rounded-2xl bg-muted" />
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="h-9 w-full rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredApps?.map((app) => (
            <AppCard
              key={app.id}
              name={app.name}
              image={app.image}
              installUrl={app.install}
              onInstall={() => handleInstall(app)}
            />
          ))}
          {filteredApps?.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No apps found matching "{search}"
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Index;