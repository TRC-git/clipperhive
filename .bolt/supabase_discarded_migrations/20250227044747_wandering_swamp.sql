/*
  # Fix invalid UUID syntax issues

  This migration uses a safer approach to remove problematic transactions with invalid UUIDs.
  Instead of directly referencing the invalid UUIDs (which causes syntax errors),
  it uses string operations to identify and delete them.
*/

-- Delete any transaction where the id contains non-hex characters
DO $$
BEGIN
  -- PostgreSQL doesn't allow direct deletion with a regexp_like in WHERE clause,
  -- so we use this approach instead
  DELETE FROM transactions 
  WHERE id::text ~ '[^0-9a-f\-]'; -- This will match any character that is not 0-9, a-f, or hyphen
  
  -- Reinsert the correct transactions if they don't exist
  IF NOT EXISTS (SELECT 1 FROM transactions WHERE id = 'e4f5a6b7-c8d9-4ae0-f1a2-b3c4d5e6f7a8') THEN
    INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
    VALUES (
      'e4f5a6b7-c8d9-4ae0-f1a2-b3c4d5e6f7a8',
      '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
      '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
      24.99,
      'subscription',
      'sub_sample1',
      NOW() - INTERVAL '30 days'
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM transactions WHERE id = 'f5a6b7c8-d9e0-4bf1-a2b3-c4d5e6f7a8b9') THEN
    INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
    VALUES (
      'f5a6b7c8-d9e0-4bf1-a2b3-c4d5e6f7a8b9',
      '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
      NULL,
      24.99,
      'subscription',
      'sub_sample2',
      NOW() - INTERVAL '29 days'
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM transactions WHERE id = 'a6b7c8d9-e0f1-4ca2-b3c4-d5e6f7a8b9c0') THEN
    INSERT INTO transactions (id, user_id, project_id, amount, transaction_type, stripe_transaction_id, created_at)
    VALUES (
      'a6b7c8d9-e0f1-4ca2-b3c4-d5e6f7a8b9c0',
      '8d2f45e7-7f1a-4d3b-9e5c-1c2d3e4f5a6b',
      NULL,
      49.99,
      'subscription',
      'sub_sample3',
      NOW() - INTERVAL '28 days'
    );
  END IF;
END $$;

-- Refresh the analytics materialized view
REFRESH MATERIALIZED VIEW analytics;