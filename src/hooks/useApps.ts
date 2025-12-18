import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface App {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  download_url: string | null;
  download_count: number | null;
  created_at: string;
  updated_at: string;
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as App[];
    },
  });
}
