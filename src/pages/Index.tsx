import { useState } from "react";
import { Search, Sparkles, Zap, Box, ArrowDown } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { useApps } from "@/hooks/useApps";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const { data: apps, isLoading, error } = useApps();
  const [search, setSearch] = useState("");

  const handleInstall = async (app: { name: string; install: string }) => {
    if (app.install) {
      toast.success(`Starting download: ${app.name}`, {
        icon: <ArrowDown className="w-4 h-4 text-primary" />,
      });
      
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
      <div className="flex min-h-screen items-center justify-center bg-background bg-grid">
        <div className="text-center space-y-4 glass-card p-8 rounded-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
            <Zap className="w-8 h-8 text-destructive" />
          </div>
          <p className="text-foreground text-lg font-semibold">Failed to load apps</p>
          <p className="text-sm text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 bg-radial-glow pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="fixed top-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Hero Header */}
      <header className="relative z-10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur animate-glow-pulse" />
                  <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                    <Box className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  App Marketplace
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-foreground">Discover </span>
                <span className="text-gradient">Amazing</span>
                <br />
                <span className="text-foreground">Applications</span>
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Browse our curated collection of high-quality apps. Download instantly with one click.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur opacity-75" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search apps..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-14 text-base glass-card border-border/50 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Apps Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-4 rounded-2xl glass-card p-5 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-20 w-20 rounded-2xl bg-muted/50" />
                <div className="h-4 w-20 rounded-full bg-muted/50" />
                <div className="h-9 w-full rounded-xl bg-muted/50" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  {search ? `Results for "${search}"` : "Featured Apps"}
                </h2>
              </div>
              <span className="text-sm font-mono text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
                {filteredApps?.length || 0} apps
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredApps?.map((app, index) => (
                <div
                  key={app.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <AppCard
                    name={app.name}
                    image={app.image}
                    description={app.description}
                    installUrl={app.install}
                    onInstall={() => handleInstall(app)}
                  />
                </div>
              ))}
            </div>
            
            {filteredApps?.length === 0 && (
              <div className="py-20 text-center glass-card rounded-2xl">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-foreground text-lg font-semibold">No apps found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try searching for something else
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Index;
