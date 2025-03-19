/*
  # Fix invalid UUID syntax

  This migration fixes an issue with invalid UUIDs in previous migrations
  by deleting and reinserting transactions with correct UUID formats.
*/

-- Delete transactions with potential invalid UUIDs
DELETE FROM transactions 
WHERE id IN (
  -- List any potential problematic UUIDs here, or conditions that might match them
  'e4f5a6b7-c8d9-4ae0-f1g2-h3i4j5k6l7m8',
  'f5a6b7c8-d9e0-4bf1-g2h3-i4j5k6l7m8n9',
  'a6b7c8d9-e0f1-4cg2-h3i4-j5k6l7m8n9o0'
);

-- Reinsert transactions with proper UUID formats
INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
VALUES
  (
    'e4f5a6b7-c8d9-4ae0-f1a2-b3c4d5e6f7a8',
    '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    24.99,
    'subscription',
    'sub_sample1',
    NOW() - INTERVAL '30 days'
  ),
  (
    'f5a6b7c8-d9e0-4bf1-a2b3-c4d5e6f7a8b9',
    '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    NULL,
    24.99,
    'subscription',
    'sub_sample2',
    NOW() - INTERVAL '29 days'
  ),
  (
    'a6b7c8d9-e0f1-4ca2-b3c4-d5e6f7a8b9c0',
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