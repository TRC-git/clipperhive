-- Create project_messages table
CREATE TABLE IF NOT EXISTS project_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Add RLS policies
ALTER TABLE project_messages ENABLE ROW LEVEL SECURITY;

-- Allow users to read messages from projects they are involved in
CREATE POLICY "Users can read messages from their projects"
  ON project_messages
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_messages.project_id
      AND (projects.booker_id = auth.uid())
    )
  );

-- Allow users to insert messages in projects they are involved in
CREATE POLICY "Users can insert messages in their projects"
  ON project_messages
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_messages.project_id
      AND (projects.booker_id = auth.uid())
    )
  );

-- Create indexes
CREATE INDEX project_messages_project_id_idx ON project_messages(project_id);
CREATE INDEX project_messages_user_id_idx ON project_messages(user_id);
CREATE INDEX project_messages_created_at_idx ON project_messages(created_at);

-- Add realtime replication
ALTER TABLE project_messages REPLICA IDENTITY FULL; 