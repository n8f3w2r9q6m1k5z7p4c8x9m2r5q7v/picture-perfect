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
  const maxId = parseInt(text.trim(), 10);
  if (isNaN(maxId) || maxId < 1) throw new Error("Invalid app count");
  return Array.from({ length: maxId }, (_, i) => i + 1);
}

async function fetchAppDetails(id: number): Promise<App | null> {
  try {
    const text = await proxyFetch(`${BASE_API}/api.php?id=${id}`);
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // Not valid JSON, skip this app
      console.log(`App ${id} returned invalid JSON:`, text.substring(0, 50));
      return null;
    }
    
    // Must have name to be valid
    if (!data.name || typeof data.name !== 'string') {
      return null;
    }
    
    return {
      id,
      name: data.name,
      image: data.image || "",
      install: data.install || "",
    };
  } catch (error) {
    console.warn(`Error fetching app ${id}:`, error);
    return null;
  }
}

export function useApps() {
  return useQuery({
    queryKey: ["naruto-apps"],
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
    retry: 1,
  });
}