
CREATE POLICY "Public can insert photos" ON public.photos FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can update photos" ON public.photos FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can delete photos" ON public.photos FOR DELETE TO anon, authenticated USING (true);
GRANT INSERT, UPDATE, DELETE ON public.photos TO anon, authenticated;
