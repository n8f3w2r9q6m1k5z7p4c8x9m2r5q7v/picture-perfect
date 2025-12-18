import { AppCard } from "@/components/AppCard";
import { useApps } from "@/hooks/useApps";
import { toast } from "sonner";

const Index = () => {
  const { data: apps, isLoading, error } = useApps();

  const handleInstall = (app: { name: string; download_url: string | null }) => {
    if (app.download_url) {
      window.open(app.download_url, "_blank");
      toast.success(`Downloading ${app.name}`);
    } else {
      toast.info(`No download available for ${app.name} yet`);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Failed to load apps</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">App Store</h1>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 rounded-xl bg-card p-4 animate-pulse">
              <div className="h-20 w-20 rounded-2xl bg-muted" />
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="h-8 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {apps?.map((app) => (
            <AppCard
              key={app.id}
              name={app.name}
              iconUrl={app.icon_url}
              downloadUrl={app.download_url}
              onInstall={() => handleInstall(app)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Index;
