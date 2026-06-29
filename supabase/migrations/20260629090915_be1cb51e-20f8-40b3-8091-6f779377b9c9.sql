ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS is_hero boolean NOT NULL DEFAULT false;
CREATE UNIQUE INDEX IF NOT EXISTS photos_only_one_hero ON public.photos ((is_hero)) WHERE is_hero = true;