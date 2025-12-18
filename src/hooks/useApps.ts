import { useQuery } from "@tanstack/react-query";

export interface App {
  id: number;
  name: string;
  image: string;
  install: string;
}

async function fetchAppIds(): Promise<number[]> {
  const response = await fetch("https://narutodevapis.serv00.net/apps.txt");
  const text = await response.text();
  const maxId = parseInt(text.trim(), 10);
  return Array.from({ length: maxId }, (_, i) => i + 1);
}

async function fetchAppDetails(id: number): Promise<App> {
  const response = await fetch(`https://narutodevapis.serv00.net/api.php?id=${id}`);
  const data = await response.json();
  return {
    id,
    name: data.name,
    image: data.image,
    install: data.install,
  };
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const ids = await fetchAppIds();
      const apps = await Promise.all(ids.map(fetchAppDetails));
      return apps;
    },
  });
}