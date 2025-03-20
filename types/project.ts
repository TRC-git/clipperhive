export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  cpm_rate: number;
  status: 'open' | 'in_progress' | 'completed' | 'guaranteed';
  created_at: string;
  updated_at?: string;
  booker_id: string;
  workflow_data: {
    requirements: string[];
    target_audience: {
      details: string;
    };
    review_guidelines?: string;
    timeline: {
      submission_window: string;
      review_period: string;
    };
    style_guide: string;
  };
  completion_deadline: string;
  max_clips_allowed: number;
  clips_submitted?: number;
  clips?: Array<{
    id: string;
    title: string;
    url: string;
    status: string;
    submitted_at: string;
  }>;
} 