import { useQuery } from "@tanstack/react-query";

export interface App {
  id: number;
  name: string;
  image: string;
  install: string;
}

const BASE_API = "https://narutodevapis.serv00.net";
const PROXY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/proxy`;

async function proxyFetch(url: string): Promise<string> {
  const response = await fetch(`${PROXY_URL}?url=${encodeURIComponent(url)}`, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Proxy request failed: ${response.status}`);
  }
  
  return response.text();
}

async function fetchAppIds(): Promise<number[]> {
  const text = await proxyFetch(`${BASE_API}/apps.txt`);
  // Parse all IDs from apps.txt (format: 1\n2\n3\n4\n5\n6 or just "6" for count)
  const lines = text.trim().split('\n').filter(line => line.trim());
  
  // If it's a single number, treat as max count
  if (lines.length === 1 && !isNaN(parseInt(lines[0]))) {
    const maxId = parseInt(lines[0]);
    return Array.from({ length: maxId }, (_, i) => i + 1);
  }
  
  // Otherwise parse each line as an ID
  return lines.map(line => parseInt(line.trim())).filter(id => !isNaN(id));
}

async function fetchAppDetails(id: number): Promise<App | null> {
  try {
    const text = await proxyFetch(`${BASE_API}/api.php?id=${id}`);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return null;
    }
    
    if (!data.name || typeof data.name !== 'string') {
      return null;
    }
    
    return {
      id,
      name: data.name,
      image: data.image || "",
      install: data.install || "",
    };
  } catch {
    return null;
  }
}

export function useApps() {
  return useQuery({
    queryKey: ["naruto-apps-v2"],
    queryFn: async () => {
      const ids = await fetchAppIds();
      const results = await Promise.all(ids.map(fetchAppDetails));
      const apps = results.filter((app): app is App => app !== null);
      
      if (apps.length === 0) {
        throw new Error("No valid apps found");
      }
      
      return apps;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}