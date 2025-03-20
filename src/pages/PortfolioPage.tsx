import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Youtube, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface YouTubeChannel {
  channel_id: string;
  channel_name: string;
  subscribers: number;
  total_views: number;
}

interface ClipperPortfolio {
  id: string;
  username: string;
  profile_picture: string;
  specialty: string;
  rating: number;
  projects_completed: number;
  youtube_tokens: YouTubeChannel[];
  bio: string;
  featured_clips: {
    id: string;
    title: string;
    thumbnail: string;
    views: number;
    likes: number;
    project_type: string;
  }[];
  skills: string[];
  testimonials: {
    id: string;
    author: string;
    author_image: string;
    content: string;
    rating: number;
    project_title: string;
  }[];
}

// Dummy portfolio data
const portfolios: Record<string, ClipperPortfolio> = {
  'alexedits': {
    id: "1",
    username: "alexedits",
    profile_picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    specialty: "Gaming Highlights",
    rating: 4.8,
    projects_completed: 42,
    youtube_tokens: [{
      channel_id: "UC123",
      channel_name: "Alex Edits",
      subscribers: 45000,
      total_views: 1000000
    }],
    bio: "Professional gaming content editor specializing in high-energy montages and highlight reels. 3+ years of experience crafting engaging content for top gaming creators.",
    featured_clips: [
      {
        id: "1",
        title: "Epic Valorant Clutch Moments",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
        views: 250000,
        likes: 15000,
        project_type: "Gaming"
      },
      {
        id: "2",
        title: "Best of Minecraft 2023",
        thumbnail: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
        views: 180000,
        likes: 12000,
        project_type: "Gaming"
      }
    ],
    skills: ["Gaming Highlights", "Montage Editing", "Sound Design", "Motion Graphics", "Thumbnail Creation"],
    testimonials: [
      {
        id: "1",
        author: "ProGamer123",
        author_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
        content: "Alex turned my raw gameplay into an absolute masterpiece. The pacing and music choice were perfect!",
        rating: 5,
        project_title: "Weekly Highlights Series"
      }
    ]
  },
  'emmaclips': {
    id: "2",
    username: "emmaclips",
    profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    specialty: "Lifestyle & Beauty",
    rating: 4.9,
    projects_completed: 78,
    youtube_tokens: [{
      channel_id: "UC456",
      channel_name: "Emma's Edits",
      subscribers: 78000,
      total_views: 2000000
    }],
    bio: "Creative lifestyle content editor with a passion for storytelling. Specializing in beauty, fashion, and travel content that captivates and inspires.",
    featured_clips: [
      {
        id: "1",
        title: "Summer Fashion Lookbook",
        thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
        views: 320000,
        likes: 28000,
        project_type: "Fashion"
      },
      {
        id: "2",
        title: "Morning Skincare Routine",
        thumbnail: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800",
        views: 275000,
        likes: 22000,
        project_type: "Beauty"
      }
    ],
    skills: ["Beauty Content", "Fashion Editing", "Color Grading", "Transitions", "Social Media Optimization"],
    testimonials: [
      {
        id: "1",
        author: "BeautyBoss",
        author_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        content: "Emma has an incredible eye for detail. She transformed my content into something truly special.",
        rating: 5,
        project_title: "Beauty Brand Campaign"
      }
    ]
  },
  'chrisviral': {
    id: "3",
    username: "chrisviral",
    profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    specialty: "Viral Content",
    rating: 4.95,
    projects_completed: 156,
    youtube_tokens: [{
      channel_id: "UC789",
      channel_name: "Chris Viral",
      subscribers: 125000,
      total_views: 5000000
    }],
    bio: "Master of viral content creation with a proven track record. Specializing in creating engaging, shareable content that drives views and engagement.",
    featured_clips: [
      {
        id: "1",
        title: "Incredible Street Food Journey",
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        views: 890000,
        likes: 76000,
        project_type: "Food & Travel"
      },
      {
        id: "2",
        title: "Life Hacks That Actually Work",
        thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800",
        views: 750000,
        likes: 65000,
        project_type: "Lifestyle"
      }
    ],
    skills: ["Viral Optimization", "Trend Analysis", "Hook Creation", "Story Structure", "Audience Engagement"],
    testimonials: [
      {
        id: "1",
        author: "TrendSetter",
        author_image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
        content: "Chris knows exactly what makes content go viral. Our views increased by 400% after working together!",
        rating: 5,
        project_title: "Viral Marketing Campaign"
      }
    ]
  }
};

const PortfolioPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const portfolio = username ? portfolios[username] : null;

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Not Found</h1>
          <p className="mt-2 text-gray-600">The clipper you're looking for doesn't exist or has been removed.</p>
          <a
            href="/marketplace"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Marketplace
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={portfolio.profile_picture}
              alt={portfolio.username}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{portfolio.username}</h1>
              <p className="mt-2 text-xl text-indigo-600">{portfolio.specialty}</p>
              <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{portfolio.rating} Rating</span>
                </div>
                <div className="flex items-center">
                  <Youtube className="h-5 w-5 text-red-600 mr-1" />
                  <span>{portfolio.youtube_tokens[0].subscribers.toLocaleString()} Subscribers</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
                  <span>{portfolio.projects_completed} Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Bio Section */}
            <section className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600">{portfolio.bio}</p>
            </section>

            {/* Featured Clips */}
            <section className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Clips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.featured_clips.map((clip) => (
                  <motion.div
                    key={clip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{clip.title}</h3>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                        <span>{clip.views.toLocaleString()} views</span>
                        <span>{clip.likes.toLocaleString()} likes</span>
                      </div>
                      <span className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
                        {clip.project_type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills Section */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Testimonials</h2>
              <div className="space-y-6">
                {portfolio.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.author_image}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{testimonial.author}</h3>
                        <p className="text-sm text-gray-500">{testimonial.project_title}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{testimonial.content}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Button */}
            <div className="sticky top-8">
              <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Contact for Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage; 