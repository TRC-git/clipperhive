/*
  # Seed Development Data

  1. Sample Data Overview
    - Creates sample bookers and clippers with realistic profiles
    - Adds diverse projects with varying budgets and statuses
    - Includes clips with performance metrics
    - Generates realistic transaction history

  2. Data Structure
    - Users: Mix of bookers and clippers with complete profiles
    - Projects: Range of open, in-progress, and completed projects
    - Clips: Sample submissions with varying performance metrics
    - Transactions: Payment history for completed projects

  Note: This is development seed data only
*/

-- Seed Bookers
INSERT INTO users (id, role, email, username, created_at)
VALUES
  ('82e07610-0e34-4dc6-b0c4-65b38f5d3d7a', 'booker', 'sarah@creator.com', 'sarahcreates', NOW() - INTERVAL '30 days'),
  ('937f9940-95b5-4c3a-8b68-3c2c2e05b6d9', 'booker', 'mike@gaming.com', 'mikegaming', NOW() - INTERVAL '25 days'),
  ('8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b', 'booker', 'tech.reviews@email.com', 'techreviewer', NOW() - INTERVAL '20 days')
ON CONFLICT (id) DO NOTHING;

-- Seed Clippers
INSERT INTO users (id, role, email, username, profile_picture, created_at)
VALUES
  ('4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a', 'clipper', 'alex@editor.com', 'alexedits', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', NOW() - INTERVAL '28 days'),
  ('5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c', 'clipper', 'emma@clips.com', 'emmaclips', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', NOW() - INTERVAL '24 days'),
  ('6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d', 'clipper', 'chris@viral.com', 'chrisviral', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', NOW() - INTERVAL '21 days')
ON CONFLICT (id) DO NOTHING;

-- Seed Projects
INSERT INTO projects (id, booker_id, title, description, budget, cpm_rate, status, created_at)
VALUES
  (
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    'Gaming Highlights Compilation',
    'Looking for exciting gaming moments from popular streamers. Need 3-5 minute highlight reels focusing on epic plays and funny reactions.',
    1000.00,
    5.00,
    'open',
    NOW() - INTERVAL '15 days'
  ),
  (
    '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    'Tech Review Shorts',
    'Need short, engaging clips from tech review videos. Focus on key features and dramatic reactions. 30-60 seconds each.',
    750.00,
    4.50,
    'in_progress',
    NOW() - INTERVAL '10 days'
  ),
  (
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    'Viral Cooking Moments',
    'Seeking clips of amazing cooking transformations and reactions. Looking for "wow" moments that showcase the final reveal.',
    1200.00,
    6.00,
    'completed',
    NOW() - INTERVAL '5 days'
  );

-- Seed Clips
INSERT INTO clips (id, project_id, clipper_id, video_url, portfolio_metrics, status, created_at)
VALUES
  (
    '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
    '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
    'https://youtube.com/watch?v=sample1',
    '{"views": 15000, "likes": 2500, "comments": 300, "shares": 150}',
    'approved',
    NOW() - INTERVAL '8 days'
  ),
  (
    '5e6f7a8b-9c0d-41e2-b3f4-a5b6c7d8e9f0',
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
    'https://youtube.com/watch?v=sample2',
    '{"views": 25000, "likes": 4000, "comments": 450, "shares": 300}',
    'approved',
    NOW() - INTERVAL '4 days'
  ),
  (
    '6f7a8b9c-0d1e-42f3-c4a5-b6c7d8e9f0a1',
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    '6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d',
    'https://youtube.com/watch?v=sample3',
    '{"views": 5000, "likes": 800, "comments": 100, "shares": 50}',
    'submitted',
    NOW() - INTERVAL '2 days'
  );

-- Seed Transactions
INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
VALUES
  (
    '7a8b9c0d-1e2f-43a4-d5b6-c7d8e9f0a1b2',
    '5f6a7b8c-9d0e-4f1a-8b2c-3d4e5f6a7b8c',
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    150.00,
    'commission',
    'py_sample1',
    NOW() - INTERVAL '3 days'
  ),
  (
    '8b9c0d1e-2f3a-44b5-e6c7-d8e9f0a1b2c3',
    '4e5f6a7d-b8c9-4d2e-9f3a-1b2c3d4e5f6a',
    '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    67.50,
    'commission',
    'py_sample2',
    NOW() - INTERVAL '7 days'
  ),
  (
    '9c0d1e2f-3a4b-45c6-f7d8-e9f0a1b2c3d4',
    '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
    '3c4d5e6f-7a8b-49c0-0d1e-2f3a4b5c6d7e',
    1200.00,
    'payment',
    'py_sample3',
    NOW() - INTERVAL '5 days'
  );