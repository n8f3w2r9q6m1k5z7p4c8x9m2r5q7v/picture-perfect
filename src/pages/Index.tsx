import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { useApps } from "@/hooks/useApps";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const { data: apps, isLoading, error } = useApps();
  const [search, setSearch] = useState("");

  const handleInstall = async (app: { name: string; install: string }) => {
    if (app.install) {
      toast.success(`Starting download: ${app.name}`);
      
      // Create a hidden anchor to force download
      const link = document.createElement('a');
      link.href = app.install;
      link.download = app.name;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.info(`No download available for ${app.name} yet`);
    }
  };

  const filteredApps = apps?.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">Failed to load apps</p>
          <p className="text-sm text-muted-foreground/70">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              App Store
            </h1>
          </div>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Discover and download amazing applications
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base bg-card border-border shadow-soft rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Apps Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4 rounded-2xl bg-card p-6 animate-pulse border border-border shadow-soft">
                <div className="h-24 w-24 rounded-[1.25rem] bg-muted" />
                <div className="h-4 w-20 rounded-full bg-muted" />
                <div className="h-9 w-full rounded-xl bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                {search ? `Results for "${search}"` : "All Apps"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredApps?.length || 0} apps
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredApps?.map((app) => (
                <AppCard
                  key={app.id}
                  name={app.name}
                  image={app.image}
                  description={app.description}
                  installUrl={app.install}
                  onInstall={() => handleInstall(app)}
                />
              ))}
            </div>
            
            {filteredApps?.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-muted-foreground text-lg">No apps found matching "{search}"</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Try a different search term</p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Index;