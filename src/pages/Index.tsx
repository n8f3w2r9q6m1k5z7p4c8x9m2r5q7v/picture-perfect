import { useState } from "react";
import { Search, Sparkles, Zap, Box, ArrowDown, Download, Hexagon, Star, Flame } from "lucide-react";
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
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="text-center space-y-4 glass-card p-10 rounded-3xl shadow-glow animate-fade-up relative">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center border border-destructive/30">
            <Zap className="w-10 h-10 text-destructive animate-bounce-subtle" />
          </div>
          <p className="text-foreground text-xl font-bold">Connection Failed</p>
          <p className="text-sm text-muted-foreground">Unable to load applications</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-radial-glow pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float pointer-events-none" />
      <div className="fixed top-40 right-[15%] w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-float-delayed pointer-events-none" />
      <div className="fixed bottom-20 left-[20%] w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '-2s' }} />
      <div className="fixed bottom-40 right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-float-delayed pointer-events-none" />
      
      {/* Decorative grid lines */}
      <div className="fixed inset-0 bg-dots opacity-30 pointer-events-none" />
      
      {/* Animated lines */}
      <div className="fixed top-0 left-1/4 w-px h-screen bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-glow-line pointer-events-none" />
      <div className="fixed top-0 right-1/3 w-px h-screen bg-gradient-to-b from-transparent via-secondary/20 to-transparent animate-glow-line pointer-events-none" style={{ animationDelay: '-1.5s' }} />
      
      {/* Hero Header */}
      <header className="relative z-10 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="space-y-8 max-w-2xl">
              {/* Badge */}
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
                  <Flame className="w-4 h-4 text-accent animate-bounce-subtle" />
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">
                    Premium Apps
                  </span>
                  <Star className="w-3 h-3 text-accent" />
                </div>
              </div>
              
              {/* Logo & Title */}
              <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-60 blur-xl animate-pulse-glow" />
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/30 backdrop-blur-sm">
                      <Hexagon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  <span className="text-gradient-subtle">Discover</span>
                  <br />
                  <span className="text-gradient">Amazing Apps</span>
                </h1>
              </div>
              
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
                Your gateway to premium applications. Browse, discover, and download with a single click.
              </p>
              
              {/* Stats */}
              <div className="flex items-center gap-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-bold">{apps?.length || 0}+</span> Apps
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-bold">Free</span> Downloads
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '1s' }} />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-bold">Instant</span> Access
                  </span>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="w-full lg:w-[400px] animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="relative group">
                {/* Search glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 blur-lg opacity-50 group-focus-within:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search for apps..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-14 pr-5 h-16 text-base glass border-primary/20 rounded-2xl focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all placeholder:text-muted-foreground/50 font-medium"
                  />
                  
                  {/* Animated border */}
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Apps Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-4 rounded-3xl glass-card p-5 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-20 w-20 rounded-2xl bg-muted/30 animate-shimmer" />
                <div className="h-4 w-20 rounded-full bg-muted/30" />
                <div className="h-10 w-full rounded-xl bg-muted/30" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-10 animate-fade-up">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-primary/30 blur animate-pulse-glow" />
                  <div className="relative p-2.5 rounded-xl bg-primary/10 border border-primary/30">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {search ? `Results for "${search}"` : "Featured Apps"}
                  </h2>
                  <p className="text-sm text-muted-foreground">Handpicked for you</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
                <Download className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">
                  <span className="text-primary font-bold">{filteredApps?.length || 0}</span> available
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredApps?.map((app, index) => (
                <div
                  key={app.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
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
              <div className="py-24 text-center animate-fade-up">
                <div className="inline-block glass-card rounded-3xl p-10 shadow-glow">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center mb-6 border border-primary/20">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-foreground text-xl font-bold mb-2">No apps found</p>
                  <p className="text-sm text-muted-foreground">
                    Try searching with different keywords
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/10 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Hexagon className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2024 <span className="text-gradient font-semibold">App Marketplace</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Built with 💜 for developers
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
