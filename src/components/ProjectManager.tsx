import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import { Users, DollarSign, Clock, Briefcase as BriefcaseBusiness, Eye, ArrowRight } from 'lucide-react';
import CreateProjectForm from './CreateProjectForm';
import { Link } from 'react-router-dom';

interface ProjectManagerProps {
  userId: string;
  projects: Project[];
  onProjectUpdate: () => void;
  onProjectSelect: (projectId: string) => void;
  hideCreateButton?: boolean;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({
  userId,
  projects,
  onProjectUpdate,
  onProjectSelect,
  hideCreateButton = false,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (project: Project) => {
    if (!project.max_clips_allowed) return 0;
    return Math.min((project.clips_submitted || 0) / project.max_clips_allowed * 100, 100);
  };

  const getDaysRemaining = (project: Project) => {
    if (!project.completion_deadline) return 0;
    const createdDate = new Date();
    const deadlineDate = new Date(project.completion_deadline);
    const daysRemaining = Math.ceil((deadlineDate.getTime() - createdDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.max(daysRemaining, 0);
  };

  return (
    <div className="space-y-6">
      {!hideCreateButton && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create New Project
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
          >
            <Link to={`/projects/${project.id}`} className="absolute inset-0 z-0" aria-label={`View project ${project.title}`} />
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
                {project.title}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button 
                    className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 relative z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onProjectSelect(project.id);
                    }}
                    aria-label="Quick view"
                  >
                    <Eye className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" />
                  </button>
                  <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity -left-6 -bottom-8 w-20 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none">
                    Quick View
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>{project.clips_submitted || 0}/{project.max_clips_allowed} clips submitted</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>${project.budget?.toLocaleString()} budget</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{getDaysRemaining(project)} days remaining</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <BriefcaseBusiness className="w-4 h-4 mr-2" />
                <span>${project.cpm_rate} CPM rate</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${getProgressPercentage(project)}%` }}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-sm text-indigo-600 font-medium flex items-center hover:text-indigo-800 relative z-10"
                >
                  View Project
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showCreateForm && (
        <CreateProjectForm
          userId={userId}
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            onProjectUpdate();
          }}
        />
      )}
    </div>
  );
};

export default ProjectManager;