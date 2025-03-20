'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Commented out for development, to be restored when connecting to real API
// import { supabase } from '@/lib/supabase';
import { Project } from '@/types/project';
import { X, MessageSquare } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import ProjectChat from '@/components/ProjectChat';
import ProjectManager from '@/components/ProjectManager';

// Use the same dummy projects data as in ProjectDetailPage
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

const ProjectsPage = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    // For development - return dummy data
    try {
      setProjects(dummyProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dummy projects');
    } finally {
      setLoading(false);
    }
    return;

    // When connected to real API, uncomment the code below:
    /*
    try {
      if (!user?.id) {
        setError('User not authenticated');
        return;
      }

      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      // @ts-expect-error - Mock client type mismatch
      const result = await supabase
        .from('projects')
        .select('*')
        .eq('booker_id', user.id)
        .order('created_at', { ascending: false });

      if (result.error) throw result.error;
      
      if (result.data) {
        setProjects(result.data as unknown as Project[]);
      } else {
        setProjects([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
    */
  };

  const handleProjectUpdate = () => {
    fetchProjects();
  };

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setShowChat(true);
    }
  };

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
      case 'guaranteed':
        return 'bg-purple-100 text-purple-800';
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading projects...</p>
        </div>
      ) : (
        <ProjectManager
          userId={user?.id || ''}
          projects={projects}
          onProjectUpdate={handleProjectUpdate}
          onProjectSelect={handleProjectSelect}
        />
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              if (!showChat) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className={`bg-white rounded-lg shadow-xl w-full ${
                showChat ? 'max-w-7xl grid grid-cols-2 gap-6' : 'max-w-4xl'
              } max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 ${showChat ? 'border-r' : ''}`}>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
                      <p className="text-2xl font-bold text-indigo-600">${selectedProject.budget}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">CPM Rate</h4>
                      <p className="text-2xl font-bold text-indigo-600">${selectedProject.cpm_rate}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Deadline</h4>
                      <p className="text-2xl font-bold text-indigo-600">
                        {getDaysRemaining(selectedProject.completion_deadline)} days
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedProject.workflow_data?.requirements?.map((req, index) => (
                        <li key={index} className="text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Target Audience</h3>
                    <p className="text-gray-600">{selectedProject.workflow_data?.target_audience?.details}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Style Guide</h3>
                    <p className="text-gray-600">{selectedProject.workflow_data?.style_guide}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Submission Window</h4>
                        <p className="text-gray-600">{selectedProject.workflow_data?.timeline?.submission_window}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Review Period</h4>
                        <p className="text-gray-600">{selectedProject.workflow_data?.timeline?.review_period}</p>
                      </div>
                    </div>
                  </div>

                  {selectedProject.clips && selectedProject.clips.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Submitted Clips</h3>
                      <div className="space-y-3">
                        {selectedProject.clips.map((clip) => (
                          <div key={clip.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{clip.title}</h4>
                                <p className="text-sm text-gray-500">Submitted: {formatDate(clip.submitted_at)}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(clip.status)}`}>
                                {clip.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {showChat ? 'Close Chat' : 'Open Chat'}
                  </button>
                </div>
              </div>

              {showChat && user && (
                <div className="h-[90vh]">
                  <ProjectChat
                    projectId={selectedProject.id}
                    currentUser={user}
                    onClose={() => setShowChat(false)}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage; 