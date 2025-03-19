/*
  # Add YouTube channel data and additional content

  1. New Data
    - YouTube channel statistics for clippers
    - Additional clipper profiles
    - More projects and clips with detailed metrics
  2. Changes
    - Updates existing users with YouTube channel information
    - Adds more sample content for demonstration purposes
*/

-- Add YouTube channel statistics to existing clippers
DO $$
BEGIN
  -- Update Alex (existing clipper)
  UPDATE users
  SET youtube_tokens = ARRAY[
    jsonb_build_object(
      'channel_id', 'UC123456789ABCDEF',
      'channel_name', 'AlexEdits Pro',
      'access_token', 'ya29.dummy_token_alex_1',
      'refresh_token', 'dummy_refresh_alex_1',
      'expires_at', (NOW() + INTERVAL '1 hour')::text,
      'subscribers', 45000,
      'total_views', 5200000,
      'videos_count', 120
    )
  ]::jsonb[]
  WHERE id = '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a';
  
  -- Update Emma (existing clipper)
  UPDATE users
  SET youtube_tokens = ARRAY[
    jsonb_build_object(
      'channel_id', 'UC987654321FEDCBA',
      'channel_name', 'Emma Clips Official',
      'access_token', 'ya29.dummy_token_emma_1',
      'refresh_token', 'dummy_refresh_emma_1',
      'expires_at', (NOW() + INTERVAL '1 hour')::text,
      'subscribers', 78000,
      'total_views', 9300000,
      'videos_count', 210
    ),
    jsonb_build_object(
      'channel_id', 'UC555555555AAAAA',
      'channel_name', 'Emma''s Gaming Highlights',
      'access_token', 'ya29.dummy_token_emma_2',
      'refresh_token', 'dummy_refresh_emma_2',
      'expires_at', (NOW() + INTERVAL '1 hour')::text,
      'subscribers', 22000,
      'total_views', 1800000,
      'videos_count', 85
    )
  ]::jsonb[]
  WHERE id = '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c'::uuid;
  
  -- Update Chris (existing clipper)
  UPDATE users
  SET youtube_tokens = ARRAY[
    jsonb_build_object(
      'channel_id', 'UC111222333ABCDE',
      'channel_name', 'ChrisViral Productions',
      'access_token', 'ya29.dummy_token_chris_1',
      'refresh_token', 'dummy_refresh_chris_1',
      'expires_at', (NOW() + INTERVAL '1 hour')::text,
      'subscribers', 125000,
      'total_views', 15000000,
      'videos_count', 320
    )
  ]::jsonb[]
  WHERE id = '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d';
END $$;

-- Add new clipper profiles
INSERT INTO users (id, role, email, username, profile_picture, youtube_tokens, created_at)
VALUES
  (
    '7b8c9d0e-1f2a-4a3b-8c9d-4e5f6a7b8c9d'::uuid, 
    'clipper', 
    'daniel@clipmaster.com', 
    'clipmaster_dan', 
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 
    ARRAY[
      jsonb_build_object(
        'channel_id', 'UC444555666ABCDE',
        'channel_name', 'ClipMaster Dan',
        'access_token', 'ya29.dummy_token_dan_1',
        'refresh_token', 'dummy_refresh_dan_1',
        'expires_at', (NOW() + INTERVAL '1 hour')::text,
        'subscribers', 95000,
        'total_views', 11200000,
        'videos_count', 250
      )
    ]::jsonb[],
    NOW() - INTERVAL '18 days'
  ),
  (
    '8c9d0e1f-2a3b-4b5c-9d0e-5f6a7b8c9d0e'::uuid, 
    'clipper', 
    'jasmine@viralcutter.com', 
    'jasmine_cuts', 
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 
    ARRAY[
      jsonb_build_object(
        'channel_id', 'UC777888999DEFGH',
        'channel_name', 'JasmineCuts',
        'access_token', 'ya29.dummy_token_jasmine_1',
        'refresh_token', 'dummy_refresh_jasmine_1',
        'expires_at', (NOW() + INTERVAL '1 hour')::text,
        'subscribers', 135000,
        'total_views', 18500000,
        'videos_count', 310
      ),
      jsonb_build_object(
        'channel_id', 'UC000111222ABCDE',
        'channel_name', 'Jasmine Gaming Clips',
        'access_token', 'ya29.dummy_token_jasmine_2',
        'refresh_token', 'dummy_refresh_jasmine_2',
        'expires_at', (NOW() + INTERVAL '1 hour')::text,
        'subscribers', 45000,
        'total_views', 5800000,
        'videos_count', 150
      )
    ]::jsonb[],
    NOW() - INTERVAL '15 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Add additional projects
INSERT INTO projects (id, booker_id, title, description, budget, cpm_rate, status, created_at)
VALUES
  (
    '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9'::uuid,
    '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    'Esports Highlights Compilation',
    'Looking for high-energy clips from major esports tournaments. Focus on player reactions and game-changing moments. Need 5-7 minute compilations.',
    1800.00,
    7.50,
    'open',
    NOW() - INTERVAL '8 days'
  ),
  (
    '5e6f7a8b-9c0d-41e2-b3f4-a5b6c7d8e9f0'::uuid,
    '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    'Product Review Shorts',
    'Need engaging 30-second clips highlighting key features of latest tech products. Focus on visually impressive transformations and reactions.',
    950.00,
    5.25,
    'open',
    NOW() - INTERVAL '6 days'
  ),
  (
    '6f7a8b9c-0d1e-42f3-a4b5-c6d7e8f9a0b1'::uuid,
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    'Travel Vlog Highlights',
    'Seeking captivating moments from travel content. Focus on breathtaking scenery, unique cultural experiences, and authentic reactions. 1-2 minute clips.',
    1500.00,
    6.75,
    'in_progress',
    NOW() - INTERVAL '12 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Add additional clips with more detailed metrics
INSERT INTO clips (id, project_id, clipper_id, video_url, portfolio_metrics, status, created_at)
VALUES
  (
    '7a8b9c0d-1e2f-43a4-b5c6-d7e8f9a0b1c2'::uuid,
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    '7b8c9d0e-1f2a-4a3b-8c9d-4e5f6a7b8c9d',
    'https://youtube.com/watch?v=sample4',
    '{
      "views": 42000,
      "likes": 5800,
      "comments": 720,
      "shares": 950,
      "watch_time_hours": 1250,
      "avg_view_duration": 65,
      "click_through_rate": 4.8,
      "demographics": {
        "age_groups": {"18-24": 35, "25-34": 42, "35-44": 15, "45+": 8},
        "genders": {"male": 68, "female": 30, "other": 2},
        "top_countries": ["United States", "United Kingdom", "Canada", "Australia", "Germany"]
      }
    }',
    'approved',
    NOW() - INTERVAL '10 days'
  ),
  (
    '8b9c0d1e-2f3a-44b5-c6d7-e8f9a0b1c2d3'::uuid,
    '6f7a8b9c-0d1e-42f3-a4b5-c6d7e8f9a0b1',
    '8c9d0e1f-2a3b-4b5c-9d0e-5f6a7b8c9d0e',
    'https://youtube.com/watch?v=sample5',
    '{
      "views": 31500,
      "likes": 4200,
      "comments": 580,
      "shares": 720,
      "watch_time_hours": 980,
      "avg_view_duration": 72,
      "click_through_rate": 5.2,
      "demographics": {
        "age_groups": {"18-24": 28, "25-34": 45, "35-44": 20, "45+": 7},
        "genders": {"male": 55, "female": 43, "other": 2},
        "top_countries": ["United States", "Canada", "Germany", "France", "Brazil"]
      }
    }',
    'approved',
    NOW() - INTERVAL '9 days'
  ),
  (
    '9c0d1e2f-3a4b-45c6-d7e8-f9a0b1c2d3e4'::uuid,
    '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
    '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
    'https://youtube.com/watch?v=sample6',
    '{
      "views": 18200,
      "likes": 2400,
      "comments": 350,
      "shares": 420,
      "watch_time_hours": 530,
      "avg_view_duration": 58,
      "click_through_rate": 4.5,
      "demographics": {
        "age_groups": {"18-24": 52, "25-34": 35, "35-44": 10, "45+": 3},
        "genders": {"male": 76, "female": 22, "other": 2},
        "top_countries": ["United States", "United Kingdom", "South Korea", "Japan", "Sweden"]
      }
    }',
    'submitted',
    NOW() - INTERVAL '3 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Add additional transactions
INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
VALUES
  (
    'a0b1c2d3-e4f5-46a7-b8c9-d0e1f2a3b4c5'::uuid,
    '7b8c9d0e-1f2a-4a3b-8c9d-4e5f6a7b8c9d',
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    283.50,
    'commission',
    'py_sample4',
    NOW() - INTERVAL '8 days'
  ),
  (
    'b1c2d3e4-f5a6-47b8-c9d0-e1f2a3b4c5d6'::uuid,
    '8c9d0e1f-2a3b-4b5c-9d0e-5f6a7b8c9d0e',
    '6f7a8b9c-0d1e-42f3-a4b5-c6d7e8f9a0b1',
    212.63,
    'commission',
    'py_sample5',
    NOW() - INTERVAL '7 days'
  ),
  (
    'c2d3e4f5-a6b7-48c9-d0e1-f2a3b4c5d6e7'::uuid,
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    '6f7a8b9c-0d1e-42f3-a4b5-c6d7e8f9a0b1',
    1500.00,
    'payment',
    'py_sample6',
    NOW() - INTERVAL '13 days'
  ),
  (
    'd3e4f5a6-b7c8-49d0-e1f2-a3b4c5d6e7f8'::uuid,
    '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
    1800.00,
    'payment',
    'py_sample7',
    NOW() - INTERVAL '9 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Refresh the analytics materialized view
REFRESH MATERIALIZED VIEW analytics;