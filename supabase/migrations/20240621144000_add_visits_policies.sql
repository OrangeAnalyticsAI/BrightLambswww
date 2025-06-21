-- Enable RLS on visits table
alter table public.visits enable row level security;

-- Allow public read access to visits (optional, adjust based on your needs)
create policy "Allow public read access to visits"
on public.visits for select
to public
using (true);

-- Allow anonymous inserts to visits
create policy "Allow anonymous inserts to visits"
on public.visits for insert
to anon
with check (true);

-- Allow updates only if the user is authenticated (optional)
create policy "Allow updates to own visits"
on public.visits for update
to authenticated
using (true);

-- Allow deletes only if the user is authenticated (optional)
create policy "Allow deletes to own visits"
on public.visits for delete
to authenticated
using (true);

-- Grant necessary permissions to the anon role
grant select, insert on public.visits to anon;

-- If you want to allow updates/deletes, uncomment these:
-- grant update, delete on public.visits to anon;
