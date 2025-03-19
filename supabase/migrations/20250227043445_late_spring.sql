/*
  # Fix project invitations policy

  This migration fixes an issue with the previously created policy 
  "Clippers can update their invitation status" that incorrectly used 
  OLD in a WITH CHECK clause.
*/

-- First drop the problematic policy if it exists
DROP POLICY IF EXISTS "Clippers can update their invitation status" ON project_invitations;

-- Recreate the policy correctly
CREATE POLICY "Clippers can update their invitation status"
  ON project_invitations
  FOR UPDATE
  TO authenticated
  USING (clipper_id = auth.uid() AND status = 'pending')
  WITH CHECK (clipper_id = auth.uid());

-- Refresh the analytics materialized view
REFRESH MATERIALIZED VIEW analytics;