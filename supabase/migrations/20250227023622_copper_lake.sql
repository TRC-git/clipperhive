/*
  # Initial ClipperHive Schema

  1. Tables
    - users: Core user data and role management
    - projects: Project listings and details
    - clips: Video submissions and metrics
    - transactions: Payment and commission tracking
    - analytics: Performance metrics aggregation

  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
    - Set up role-based permissions
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('booker', 'clipper');
CREATE TYPE project_status AS ENUM ('open', 'in_progress', 'completed', 'guaranteed');
CREATE TYPE clip_status AS ENUM ('submitted', 'approved', 'rejected');
CREATE TYPE transaction_type AS ENUM ('commission', 'payment', 'refund', 'subscription');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  role user_role NOT NULL,
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  profile_picture text,
  youtube_tokens jsonb[], -- Array of YouTube OAuth tokens
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booker_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  budget numeric NOT NULL CHECK (budget > 0),
  cpm_rate numeric NOT NULL CHECK (cpm_rate > 0),
  status project_status DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project bookmarks table
CREATE TABLE IF NOT EXISTS project_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Clips table
CREATE TABLE IF NOT EXISTS clips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  clipper_id uuid REFERENCES users(id) ON DELETE CASCADE,
  video_url text NOT NULL,
  portfolio_metrics jsonb DEFAULT '{}',
  status clip_status DEFAULT 'submitted',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  transaction_type transaction_type NOT NULL,
  stripe_transaction_id text UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create analytics view
CREATE OR REPLACE VIEW analytics AS
SELECT 
  c.id as clip_id,
  c.project_id,
  c.clipper_id,
  c.portfolio_metrics->>'views' as views,
  c.portfolio_metrics->>'likes' as likes,
  c.created_at,
  p.cpm_rate,
  p.budget
FROM clips c
LEFT JOIN projects p ON c.project_id = p.id;

-- Create indexes
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_clips_created_at ON clips(created_at);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Anyone can view open projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (status = 'open');

CREATE POLICY "Bookers can manage their projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (booker_id = auth.uid());

-- Clips policies
CREATE POLICY "Clippers can view and submit clips"
  ON clips
  FOR ALL
  TO authenticated
  USING (
    clipper_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM projects p 
      WHERE p.id = project_id AND p.booker_id = auth.uid()
    )
  );

-- Transactions policies
CREATE POLICY "Users can view their own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clips_updated_at
  BEFORE UPDATE ON clips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- New policies
CREATE POLICY "Bookers can create projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = booker_id);

CREATE POLICY "Bookers can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = booker_id);

CREATE POLICY "Bookers can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = booker_id);

CREATE POLICY "Clippers can view all projects"
  ON projects FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'clipper'
  ));

CREATE POLICY "Clippers can create clips"
  ON clips FOR INSERT
  WITH CHECK (auth.uid() = clipper_id);

CREATE POLICY "Users can view their own clips"
  ON clips FOR SELECT
  USING (auth.uid() = clipper_id OR EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = clips.project_id
    AND projects.booker_id = auth.uid()
  ));

CREATE POLICY "Users can update their own clips"
  ON clips FOR UPDATE
  USING (auth.uid() = clipper_id);

CREATE POLICY "Users can bookmark projects"
  ON project_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their project bookmarks"
  ON project_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their project bookmarks"
  ON project_bookmarks FOR DELETE
  USING (auth.uid() = user_id);