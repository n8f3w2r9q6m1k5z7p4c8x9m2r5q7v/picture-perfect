-- Create apps table
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  download_url TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read access for marketplace)
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view apps
CREATE POLICY "Apps are publicly viewable" 
ON public.apps 
FOR SELECT 
USING (true);

-- Create storage bucket for app files
INSERT INTO storage.buckets (id, name, public) VALUES ('app-files', 'app-files', true);

-- Allow public read access to app files
CREATE POLICY "App files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'app-files');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_apps_updated_at
BEFORE UPDATE ON public.apps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample apps for demo
INSERT INTO public.apps (name, description, icon_url) VALUES
('Camera Pro', 'Professional camera app with filters', null),
('Music Player', 'Stream your favorite music', null),
('Weather App', 'Real-time weather forecasts', null),
('Notes', 'Keep your notes organized', null),
('Calculator', 'Advanced calculator', null),
('File Manager', 'Manage your files easily', null);