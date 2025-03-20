import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface CreateProjectFormProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ userId, onClose, onSuccess }) => {
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
      const result = await supabase
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

      if (result.error) throw result.error;

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
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Project</h3>
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}
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
                    placeholder="720p minimum resolution&#10;Include intro and outro&#10;No music copyright issues"
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
                    rows={3}
                    value={formData.style_guide}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe your preferred editing style, transitions, effects, etc."
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="target_audience" className="block text-sm font-medium text-gray-700">
                  Target Audience
                </label>
                <div className="mt-1">
                  <textarea
                    id="target_audience"
                    name="target_audience"
                    rows={2}
                    value={formData.target_audience}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe your target audience demographics and preferences"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateProjectForm; 