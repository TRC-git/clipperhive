/*
  # Add Auth Connection for Test Users

  1. Overview
    - This migration creates functionality to connect existing users in the database with Supabase Auth
    - It allows test users created via migrations to authenticate properly
  
  2. Features
    - Creates a trigger that watches for new Auth users and links them to existing database users
    - Sets up audit columns for tracking when users are connected to Auth
    - Improves connection between Auth and database users
*/

-- Add columns to track auth connection status
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_connected boolean DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_connected_at timestamptz;

-- Create a function to handle new auth users and connect them to existing database users
CREATE OR REPLACE FUNCTION public.connect_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  -- If this user already exists in our database (from migrations)
  UPDATE users
  SET 
    id = NEW.id,
    auth_connected = true,
    auth_connected_at = NOW(),
    updated_at = NOW()
  WHERE 
    email = NEW.email AND
    (id != NEW.id OR auth_connected = false);
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.connect_auth_user();

-- Create a function to sync profile changes from auth to users
CREATE OR REPLACE FUNCTION public.sync_auth_user_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- When email changes in auth.users, update it in our users table
  IF OLD.email <> NEW.email THEN
    UPDATE users
    SET 
      email = NEW.email,
      updated_at = NOW()
    WHERE 
      id = NEW.id AND
      auth_connected = true;
  END IF;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for syncing changes
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_auth_user_changes();

-- Add helpful comment for developers
COMMENT ON TABLE public.users IS 'User profiles with test accounts. First login with test users will automatically register them in Auth.';