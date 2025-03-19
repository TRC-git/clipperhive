/*
  # Booker Profiles and Project Management Enhancement

  1. New Data
    - Enhanced booker profile data
    - Additional project management fields
    - Project workflow data
    - Booker-clipper connections
  2. Changes
    - Updates existing bookers with additional profile information
    - Adds project analytics and workflow status
    - Creates connections between bookers and preferred clippers
*/

-- Add enhanced profile data to existing bookers
DO $$
BEGIN
  -- Update Sarah (booker)
  UPDATE users
  SET profile_picture = COALESCE(profile_picture, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'),
      youtube_tokens = ARRAY[
        jsonb_build_object(
          'channel_id', 'UC777888999AABBCC',
          'channel_name', 'Sarah Creates Official',
          'access_token', 'ya29.dummy_token_sarah_1',
          'refresh_token', 'dummy_refresh_sarah_1',
          'expires_at', (NOW() + INTERVAL '1 hour')::text,
          'subscribers', 124000,
          'total_views', 14500000,
          'videos_count', 275
        )
      ]::jsonb[]
  WHERE id = '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a';
  
  -- Update Mike (booker)
  UPDATE users
  SET profile_picture = COALESCE(profile_picture, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'),
      youtube_tokens = ARRAY[
        jsonb_build_object(
          'channel_id', 'UC555666777DDEEFF',
          'channel_name', 'Mike Gaming Official',
          'access_token', 'ya29.dummy_token_mike_1',
          'refresh_token', 'dummy_refresh_mike_1',
          'expires_at', (NOW() + INTERVAL '1 hour')::text,
          'subscribers', 350000,
          'total_views', 42000000,
          'videos_count', 615
        )
      ]::jsonb[]
  WHERE id = '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9';
  
  -- Update TechReviewer (booker)
  UPDATE users
  SET profile_picture = COALESCE(profile_picture, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
      youtube_tokens = ARRAY[
        jsonb_build_object(
          'channel_id', 'UC111222444ABCDEF',
          'channel_name', 'Tech Reviewer Hub',
          'access_token', 'ya29.dummy_token_tech_1',
          'refresh_token', 'dummy_refresh_tech_1',
          'expires_at', (NOW() + INTERVAL '1 hour')::text,
          'subscribers', 215000,
          'total_views', 28000000,
          'videos_count', 430
        ),
        jsonb_build_object(
          'channel_id', 'UC222333555FEDCBA',
          'channel_name', 'Gadget Reviews',
          'access_token', 'ya29.dummy_token_tech_2',
          'refresh_token', 'dummy_refresh_tech_2',
          'expires_at', (NOW() + INTERVAL '1 hour')::text,
          'subscribers', 87000,
          'total_views', 9200000,
          'videos_count', 185
        )
      ]::jsonb[]
  WHERE id = '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b';
END $$;

-- Create bookmarks table for bookers to save preferred clippers
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booker_id uuid REFERENCES users(id) ON DELETE CASCADE,
  clipper_id uuid REFERENCES users(id) ON DELETE CASCADE,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(booker_id, clipper_id)
);

-- Enable RLS for bookmarks
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for bookmarks
CREATE POLICY "Bookers can manage their bookmarks"
  ON bookmarks
  FOR ALL
  TO authenticated
  USING (booker_id = auth.uid());

-- Add booker-clipper bookmarks
INSERT INTO bookmarks (booker_id, clipper_id, notes, created_at)
VALUES
  (
    '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a', 
    '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a', 
    'Great clipper for tech content. Fast turnaround.',
    NOW() - INTERVAL '15 days'
  ),
  (
    '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a', 
    '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d', 
    'Creates viral-worthy clips consistently. Highly recommended.',
    NOW() - INTERVAL '10 days'
  ),
  (
    '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9', 
    '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c', 
    'Specializes in gaming clips. Great eye for exciting moments.',
    NOW() - INTERVAL '20 days'
  ),
  (
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b', 
    '7b8c9d0e-1f2a-4a3b-8c9d-4e5f6a7b8c9d', 
    'Professional editing style. Good for review content.',
    NOW() - INTERVAL '18 days'
  ),
  (
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b', 
    '8c9d0e1f-2a3b-4b5c-9d0e-5f6a7b8c9d0e', 
    'High engagement rates. Perfect for tech product reveals.',
    NOW() - INTERVAL '12 days'
  )
ON CONFLICT (booker_id, clipper_id) DO NOTHING;

-- Add workflow data to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS workflow_data jsonb DEFAULT '{}'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS completion_deadline timestamptz;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS max_clips_allowed int;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS clips_submitted int DEFAULT 0;

-- Update existing projects with workflow data
UPDATE projects
SET workflow_data = jsonb_build_object(
      'requirements', ARRAY['720p minimum resolution', 'Include intro and outro', 'No music copyright issues', 'Subtitles required'],
      'target_audience', jsonb_build_object('age_range', '18-34', 'interests', ARRAY['Gaming', 'Technology', 'Entertainment']),
      'review_guidelines', 'Focus on engaging moments. Highlight product features clearly.',
      'timeline', jsonb_build_object('submission_window', '7 days', 'review_period', '3 days'),
      'style_guide', 'Upbeat tone, quick cuts between scenes, highlight reactions'
    ),
    completion_deadline = NOW() + INTERVAL '14 days',
    max_clips_allowed = 10,
    clips_submitted = (SELECT COUNT(*) FROM clips WHERE clips.project_id = projects.id)
WHERE id IN (
  '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
  '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
  '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
  '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
  '5e6f7a8b-9c0d-41e2-b3f4-a5b6c7d8e9f0',
  '6f7a8b9c-0d1e-42f3-a4b5-c6d7e8f9a0b1'
);

-- Create project invitations for direct clipper invites
CREATE TABLE IF NOT EXISTS project_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  clipper_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, clipper_id)
);

-- Enable RLS for project invitations
ALTER TABLE project_invitations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for project invitations
CREATE POLICY "Bookers can manage their project invitations"
  ON project_invitations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects p 
      WHERE p.id = project_id AND p.booker_id = auth.uid()
    )
  );

CREATE POLICY "Clippers can view their invitations"
  ON project_invitations
  FOR SELECT
  TO authenticated
  USING (clipper_id = auth.uid());

-- Fixed policy without using OLD reference
CREATE POLICY "Clippers can update their invitation status"
  ON project_invitations
  FOR UPDATE
  TO authenticated
  USING (clipper_id = auth.uid() AND status = 'pending')
  WITH CHECK (clipper_id = auth.uid());

-- Add project invitations
INSERT INTO project_invitations (project_id, clipper_id, status, message, created_at)
VALUES
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
    'pending',
    'I loved your previous gaming clips! Would you like to create similar content for my channel?',
    NOW() - INTERVAL '5 days'
  ),
  (
    '5e6f7a8b-9c0d-41e2-b3f4-a5b6c7d8e9f0',
    '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
    'accepted',
    'Your tech reviews are exactly what I need for my product launches.',
    NOW() - INTERVAL '4 days'
  ),
  (
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
    'declined',
    'Would you create some cooking clips for my channel? Great rates!',
    NOW() - INTERVAL '7 days'
  ),
  (
    '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
    '8c9d0e1f-2a3b-4b5c-9d0e-5f6a7b8c9d0e',
    'accepted',
    'Need your expertise for some esports highlights. Premium rates offered.',
    NOW() - INTERVAL '3 days'
  )
ON CONFLICT (project_id, clipper_id) DO NOTHING;

-- Add project analytics table
CREATE TABLE IF NOT EXISTS project_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  data_date date NOT NULL,
  metrics jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, data_date)
);

-- Enable RLS for project analytics
ALTER TABLE project_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for project analytics
CREATE POLICY "Bookers can see analytics for their projects"
  ON project_analytics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects p 
      WHERE p.id = project_id AND p.booker_id = auth.uid()
    )
  );

-- Add sample project analytics
INSERT INTO project_analytics (project_id, data_date, metrics)
VALUES
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 7,
    '{
      "views": 12500,
      "likes": 2100,
      "comments": 340,
      "shares": 520,
      "engagement_rate": 4.8,
      "retention_rate": 68,
      "click_through_rate": 3.2,
      "conversion_rate": 1.8
    }'
  ),
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 6,
    '{
      "views": 15600,
      "likes": 2700,
      "comments": 410,
      "shares": 680,
      "engagement_rate": 5.1,
      "retention_rate": 72,
      "click_through_rate": 3.5,
      "conversion_rate": 2.1
    }'
  ),
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 5,
    '{
      "views": 18200,
      "likes": 3100,
      "comments": 480,
      "shares": 790,
      "engagement_rate": 5.4,
      "retention_rate": 75,
      "click_through_rate": 3.8,
      "conversion_rate": 2.3
    }'
  ),
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 4,
    '{
      "views": 21400,
      "likes": 3800,
      "comments": 550,
      "shares": 920,
      "engagement_rate": 5.7,
      "retention_rate": 73,
      "click_through_rate": 4.0,
      "conversion_rate": 2.5
    }'
  ),
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 3,
    '{
      "views": 24900,
      "likes": 4300,
      "comments": 620,
      "shares": 1050,
      "engagement_rate": 6.0,
      "retention_rate": 77,
      "click_through_rate": 4.3,
      "conversion_rate": 2.8
    }'
  ),
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 2,
    '{
      "views": 27500,
      "likes": 4900,
      "comments": 680,
      "shares": 1200,
      "engagement_rate": 6.2,
      "retention_rate": 79,
      "click_through_rate": 4.5,
      "conversion_rate": 3.0
    }'
  ),
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    CURRENT_DATE - 1,
    '{
      "views": 30200,
      "likes": 5300,
      "comments": 740,
      "shares": 1350,
      "engagement_rate": 6.4,
      "retention_rate": 80,
      "click_through_rate": 4.7,
      "conversion_rate": 3.2
    }'
  )
ON CONFLICT (project_id, data_date) DO NOTHING;

-- Refresh the analytics materialized view
REFRESH MATERIALIZED VIEW analytics;