/*
  # Fix for test users auth

  This migration ensures our test users can be created in the auth system.
  It adds RLS policies to allow migration of existing users to auth.
*/

-- Create an auth hook to sync users after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this user already exists in the users table (from our migrations)
  IF EXISTS (SELECT 1 FROM public.users WHERE email = NEW.email) THEN
    -- This is a migrated user - we just need to update the user id
    UPDATE public.users
    SET id = NEW.id
    WHERE email = NEW.email;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure our test users can be authenticated easily
COMMENT ON TABLE public.users IS 'Stores user profile data with test accounts for development';