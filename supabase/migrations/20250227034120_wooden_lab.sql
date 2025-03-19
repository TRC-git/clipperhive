/*
  # Add user profile data and portfolio metrics

  1. New Data
    - Profile information for existing users
    - Portfolio metrics for clippers
    - Experience fields for clippers
  2. Changes
    - Updates existing users with more detailed profiles
    - Adds portfolio analytics data for better display
*/

-- Add profile data to existing bookers
DO $$
BEGIN
  -- Update Sarah (booker)
  UPDATE users
  SET profile_picture = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
  WHERE id = '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a';
  
  -- Update Mike (booker)
  UPDATE users
  SET profile_picture = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'
  WHERE id = '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9';
  
  -- Update TechReviewer (booker)
  UPDATE users
  SET profile_picture = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  WHERE id = '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b';
END $$;

-- Add portfolio metrics to clips
UPDATE clips
SET portfolio_metrics = jsonb_build_object(
  'views', 15000,
  'likes', 2500,
  'comments', 300,
  'shares', 150,
  'watch_time_hours', 450,
  'avg_view_duration', 62,
  'click_through_rate', 4.2,
  'demographics', jsonb_build_object(
    'age_groups', jsonb_build_object('18-24', 40, '25-34', 30, '35-44', 20, '45+', 10),
    'genders', jsonb_build_object('male', 65, 'female', 33, 'other', 2),
    'top_countries', jsonb_build_array('United States', 'Canada', 'United Kingdom', 'Australia', 'Germany')
  )
)
WHERE id = '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9';

-- Add more sample data to existing tables
INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
VALUES
  (
    'e4f5a6b7-c8d9-4ae0-f1g2-h3i4j5k6l7m8'::uuid,
    '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    24.99,
    'subscription',
    'sub_sample1',
    NOW() - INTERVAL '30 days'
  ),
  (
    'f5a6b7c8-d9e0-4bf1-g2h3-i4j5k6l7m8n9'::uuid,
    '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    NULL,
    24.99,
    'subscription',
    'sub_sample2',
    NOW() - INTERVAL '29 days'
  ),
  (
    'a6b7c8d9-e0f1-4cg2-h3i4-j5k6l7m8n9o0'::uuid,
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    NULL,
    49.99,
    'subscription',
    'sub_sample3',
    NOW() - INTERVAL '28 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Refresh the analytics materialized view
REFRESH MATERIALIZED VIEW analytics;