import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Users, PlusCircle, ClipboardList, BarChart2, Clock, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  cpm_rate: number;
  status: 'open' | 'in_progress' | 'completed' | 'guaranteed';
  created_at: string;
  updated_at: string;
  booker_id: string;
  workflow_data?: any;
  completion_deadline?: string;
  max_clips_allowed?: number;
  clips_submitted?: number;
  clips?: any[];
}

interface ProjectManagerProps {
  userId: string;
  projects: Project[];
  onProjectUpdate: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ userId, projects, onProjectUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 500,
    cpm_rate: 5,
    max_clips_allowed: 10,
    completion_days: 14,
    requirements: '',
    style_guide: '',
    target_audience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle number inputs
    if (['budget', 'cpm_rate', 'max_clips_allowed', 'completion_days'].includes(name)) {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Project title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Project description is required');
      }
      if (formData.budget <= 0) {
        throw new Error('Budget must be greater than 0');
      }
      if (formData.cpm_rate <= 0) {
        throw new Error('CPM rate must be greater than 0');
      }

      // Prepare requirements as array
      const requirementsArray = formData.requirements
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      // Calculate deadline
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + formData.completion_days);

      // Prepare workflow data
      const workflowData = {
        requirements: requirementsArray,
        target_audience: {
          details: formData.target_audience
        },
        style_guide: formData.style_guide,
        timeline: {
          submission_window: `${Math.floor(formData.completion_days * 0.7)} days`,
          review_period: `${Math.floor(formData.completion_days * 0.3)} days`
        }
      };

      // Create project
      const { data, error: insertError } = await supabase
        .from('projects')
        .insert({
          booker_id: userId,
          title: formData.title,
          description: formData.description,
          budget: formData.budget,
          cpm_rate: formData.cpm_rate,
          status: 'open',
          max_clips_allowed: formData.max_clips_allowed,
          completion_deadline: deadline.toISOString(),
          workflow_data: workflowData
        })
        .select();

      if (insertError) throw insertError;

      setSuccess('Project created successfully!');
      setFormData({
        title: '',
        description: '',
        budget: 500,
        cpm_rate: 5,
        max_clips_allowed: 10,
        completion_days: 14,
        requirements: '',
        style_guide: '',
        target_audience: ''
      });
      setShowCreateForm(false);
      onProjectUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      budget: 500,
      cpm_rate: 5,
      max_clips_allowed: 10,
      completion_days: 14,
      requirements: '',
      style_guide: '',
      target_audience: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 border border-gray-200 rounded-lg p-6 bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Project</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Project Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="E.g., Gaming Highlights Compilation"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what kind of clips you need, content type, and any specific requirements"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="budget"
                      id="budget"
                      min="1"
                      step="0.01"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cpm_rate" className="block text-sm font-medium text-gray-700">
                    CPM Rate ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="cpm_rate"
                      id="cpm_rate"
                      min="0.1"
                      step="0.01"
                      value={formData.cpm_rate}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Amount paid per 1,000 views
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="max_clips_allowed" className="block text-sm font-medium text-gray-700">
                    Max Clips
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="max_clips_allowed"
                      id="max_clips_allowed"
                      min="1"
                      value={formData.max_clips_allowed}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="completion_days" className="block text-sm font-medium text-gray-700">
                    Completion Days
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="completion_days"
                      id="completion_days"
                      min="1"
                      value={formData.completion_days}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                    Requirements (one per line)
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={3}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="720p minimum resolution
Include intro and outro
No music copyright issues"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="style_guide" className="block text-sm font-medium text-gray-700">
                    Style Guide
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="style_guide"
                      name="style_guide"
                      rows={2}
                      value={formData.style_guide}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="E.g., Upbeat tone, quick cuts between scenes, highlight reactions"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="target_audience" className="block text-sm font-medium text-gray-700">
                    Target Audience
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="target_audience"
                      id="target_audience"
                      value={formData.target_audience}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="E.g., Gaming enthusiasts, 18-34, interested in competitive play"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {projects.length > 0 ? (
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new project.
            </p>
            {!showCreateForm && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Project
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusColors = {
    open: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    guaranteed: "bg-purple-100 text-purple-800"
  };

  const getProgressPercentage = () => {
    if (!project.max_clips_allowed || project.max_clips_allowed === 0) return 0;
    return Math.min(100, ((project.clips_submitted || 0) / project.max_clips_allowed) * 100);
  };

  const getDaysRemaining = () => {
    if (!project.completion_deadline) return null;
    const deadline = new Date(project.completion_deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();
  const progress = getProgressPercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white overflow-hidden shadow rounded-lg"
    >
      <div className="px-4 pt-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 truncate">{project.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
        </div>
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
          {project.status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="px-4 pt-4">
        <div className="flex justify-between text-sm">
          <div className="flex flex-col items-center">
            <BarChart2 className="h-5 w-5 text-gray-400" />
            <span className="mt-1 font-medium">${project.budget}</span>
            <span className="text-xs text-gray-500">Budget</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-5 w-5 text-gray-400" />
            <span className="mt-1 font-medium">{project.clips_submitted || 0}/{project.max_clips_allowed || '-'}</span>
            <span className="text-xs text-gray-500">Clips</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="mt-1 font-medium">{daysRemaining !== null ? daysRemaining : '-'}</span>
            <span className="text-xs text-gray-500">Days Left</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-4">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-500">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="px-4 py-4 mt-3 bg-gray-50 flex justify-between">
        <span className="text-xs text-gray-500">
          Created {formatDate(project.created_at)}
        </span>
        <button className="text-xs text-indigo-600 hover:text-indigo-900 font-medium">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectManager;