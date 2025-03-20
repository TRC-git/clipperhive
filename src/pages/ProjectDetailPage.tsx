import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types/project';
import { ChevronLeft, MessageSquare, Clock, DollarSign, Users } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import ProjectChat from '@/components/ProjectChat';

// Dummy projects data for development
const dummyProjects: Project[] = [
  {
    id: '1a2b3c4d-5e6f-47a8-89b0-c1d2e3f4a5b6',
    booker_id: '82e07610-0e34-4dc6-b0c4-65b38f5d3d7a',
    title: 'Gaming Highlights Compilation',
    description: 'Looking for exciting gaming moments from popular streamers. Need 3-5 minute highlight reels focusing on epic plays and funny reactions.',
    budget: 1000.00,
    cpm_rate: 5.00,
    status: 'open',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['720p minimum resolution', 'Include intro and outro', 'No music copyright issues', 'Subtitles required'],
      target_audience: { details: 'Gaming enthusiasts aged 18-34' },
      review_guidelines: 'Focus on engaging moments. Highlight product features clearly.',
      timeline: { submission_window: '7 days', review_period: '3 days' },
      style_guide: 'Upbeat tone, quick cuts between scenes, highlight reactions'
    },
    completion_deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    max_clips_allowed: 10,
    clips_submitted: 2,
    clips: [
      {
        id: '6f7a8b9c-0d1e-42f3-c4a5-b6c7d8e9f0a1',
        title: 'Epic Gaming Moment',
        url: 'https://youtube.com/watch?v=sample3',
        status: 'submitted',
        submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: '2b3c4d5e-6f7a-48b9-9c0d-1e2f3a4b5c6d',
    booker_id: '937f9940-95b5-4c3a-8b68-3c2c2e05b6d9',
    title: 'Tech Review Shorts',
    description: 'Need short, engaging clips from tech review videos. Focus on key features and dramatic reactions. 30-60 seconds each.',
    budget: 750.00,
    cpm_rate: 4.50,
    status: 'in_progress',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    workflow_data: {
      requirements: ['1080p minimum resolution', 'Feature highlights only', 'Include product name'],
      target_audience: { details: 'Tech enthusiasts aged 25-45' },
      review_guidelines: 'Focus on product features and reactions',
      timeline: { submission_window: '5 days', review_period: '2 days' },
      style_guide: 'Clean cuts, focus on product detail, clear audio'
    },
    completion_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    max_clips_allowed: 8,
    clips_submitted: 4,
    clips: [
      {
        id: '4d5e6f7a-8b9c-40d1-a2e3-f4a5b6c7d8e9',
        title: 'Product Feature Review',
        url: 'https://youtube.com/watch?v=sample1',
        status: 'approved',
        submitted_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('Project ID is missing');
      setLoading(false);
      return;
    }

    const loadProject = async () => {
      setLoading(true);
      
      try {
        // In a real app, we would fetch from Supabase
        // For now, we'll use our dummy data
        const foundProject = dummyProjects.find(p => p.id === id);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError('Failed to load project details');
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Failed to load project'}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <div className="mt-1 flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                {project.status === 'in_progress' ? 'In Progress' : project.status}
              </span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-sm text-gray-500">Created {formatDate(project.created_at)}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowChat(!showChat)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Project Chat
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Project Overview</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-5 sm:p-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Budget</h3>
              </div>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${project.budget.toFixed(2)}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
              </div>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{getDaysRemaining(project.completion_deadline)} days left</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Clips</h3>
              </div>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{project.clips_submitted} / {project.max_clips_allowed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Project Details</h2>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {project.workflow_data?.requirements?.map((req, index) => (
                <li key={index} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Target Audience</h3>
            <p className="text-gray-600">{project.workflow_data?.target_audience?.details}</p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Style Guide</h3>
            <p className="text-gray-600">{project.workflow_data?.style_guide}</p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Submission Window</h4>
                <p className="text-gray-600">{project.workflow_data?.timeline?.submission_window}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Review Period</h4>
                <p className="text-gray-600">{project.workflow_data?.timeline?.review_period}</p>
              </div>
            </div>
          </div>
          
          {project.workflow_data?.review_guidelines && (
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Review Guidelines</h3>
              <p className="text-gray-600">{project.workflow_data.review_guidelines}</p>
            </div>
          )}
        </div>

        {project.clips && project.clips.length > 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Submitted Clips</h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {project.clips.map((clip) => (
                <li key={clip.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{clip.title}</h3>
                        <p className="text-sm text-gray-500 truncate">{clip.url}</p>
                        <p className="text-xs text-gray-500">Submitted on {formatDate(clip.submitted_at)}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(clip.status)}`}>
                        {clip.status.charAt(0).toUpperCase() + clip.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chat drawer */}
        {showChat && user && (
          <div className="fixed inset-0 overflow-hidden z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowChat(false)}></div>
              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                    <ProjectChat
                      projectId={project.id}
                      currentUser={user}
                      onClose={() => setShowChat(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectDetailPage; 