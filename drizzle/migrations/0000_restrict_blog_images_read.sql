DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
CREATE POLICY "Admins can view blog images" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));