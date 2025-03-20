
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Info, Loader2, Mail, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the job openings from Careers.tsx
const jobOpenings = [
  {
    id: 1,
    title: "Social Media Manager",
    department: "Marketing",
    type: "Full-time",
    location: "Remote",
    description: "Lead our social media strategy across platforms to grow our audience and engage with the creator community.",
    responsibilities: [
      "Develop and implement social media strategies to increase brand awareness",
      "Create engaging content for various platforms (Instagram, TikTok, Twitter, etc.)",
      "Analyze social media metrics and optimize campaigns accordingly",
      "Stay up-to-date with social media trends and best practices",
      "Collaborate with marketing team on cross-channel campaigns"
    ],
    requirements: [
      "2+ years of experience in social media management",
      "Excellent understanding of social media platforms and their audiences",
      "Strong content creation skills and experience with design tools",
      "Knowledge of social media analytics and reporting",
      "Experience working with creators and influencers is a plus"
    ]
  },
  {
    id: 2,
    title: "Discord and Group Moderator",
    department: "Community",
    type: "Part-time / Full-time",
    location: "Remote",
    description: "Help build and maintain our vibrant community of content creators and brands across Discord and other platforms.",
    responsibilities: [
      "Moderate discussions and ensure community guidelines are followed",
      "Welcome new members and help them navigate the community",
      "Organize and facilitate community events and discussions",
      "Identify and escalate issues that require attention from other teams",
      "Provide feedback on community sentiment and needs"
    ],
    requirements: [
      "Experience moderating online communities, especially Discord",
      "Excellent communication and interpersonal skills",
      "Ability to work flexible hours across different time zones",
      "Familiarity with the creator economy and content creation",
      "Patient and empathetic approach to community management"
    ]
  },
  {
    id: 3,
    title: "Affiliate Manager",
    department: "Growth",
    type: "Full-time",
    location: "Remote",
    description: "Build and manage relationships with affiliates and partners to drive platform growth and user acquisition.",
    responsibilities: [
      "Develop and implement affiliate marketing strategies",
      "Recruit, onboard, and manage relationships with affiliates",
      "Monitor affiliate performance and optimize campaigns",
      "Create resources and materials for affiliates",
      "Collaborate with marketing team on promotional strategies"
    ],
    requirements: [
      "2+ years of experience in affiliate or partnership management",
      "Strong relationship building and networking skills",
      "Experience with affiliate marketing platforms and tracking",
      "Analytical mindset and data-driven approach",
      "Knowledge of the creator economy and content creation landscape"
    ]
  },
  {
    id: 4,
    title: "Project Coordinator",
    department: "Operations",
    type: "Full-time",
    location: "Remote",
    description: "Ensure smooth operations between brands and content clippers by coordinating projects and facilitating communication.",
    responsibilities: [
      "Oversee project workflows and ensure timely delivery",
      "Facilitate communication between brands and content creators",
      "Monitor project quality and adherence to requirements",
      "Troubleshoot and resolve issues that arise during projects",
      "Gather feedback to improve platform services and features"
    ],
    requirements: [
      "2+ years of experience in project management or coordination",
      "Excellent organizational and time management skills",
      "Strong communication and problem-solving abilities",
      "Experience with project management tools and methodologies",
      "Understanding of content creation processes and timelines"
    ]
  }
];

const CareerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const jobId = parseInt(id || "0");
  
  const [job, setJob] = useState<typeof jobOpenings[0] | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    portfolio: "",
    coverLetter: "",
    resumeFile: null as File | null,
    heardFrom: ""
  });

  useEffect(() => {
    const selectedJob = jobOpenings.find(job => job.id === jobId);
    if (selectedJob) {
      setJob(selectedJob);
    } else {
      // Redirect to 404 if job not found
      navigate("/not-found");
    }
  }, [jobId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, heardFrom: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resumeFile: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Application Submitted",
        description: `Thank you for applying to the ${job?.title} position. We'll be in touch soon!`,
      });
      navigate("/careers");
    }, 1500);
  };

  if (!job) {
    return null; // Will redirect via useEffect if job not found
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-900">
      <NavBar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link to="/careers" className="inline-flex items-center text-honey-500 hover:text-honey-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Link>
          
          {/* Job header */}
          <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 shadow-sm mb-8">
            <h1 className="text-3xl font-bold text-charcoal-800 dark:text-white mb-2">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center mb-4 text-charcoal-600 dark:text-charcoal-400">
              <span>{job.department}</span>
              <span className="mx-2">•</span>
              <span>{job.type}</span>
              <span className="mx-2">•</span>
              <span>{job.location}</span>
            </div>
            <p className="text-lg text-charcoal-700 dark:text-charcoal-300 mb-6">
              {job.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-charcoal-800 dark:text-white mb-4">
                  Responsibilities
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-charcoal-600 dark:text-charcoal-300">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-charcoal-800 dark:text-white mb-4">
                  Requirements
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-charcoal-600 dark:text-charcoal-300">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Application form */}
          <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-6">
              Apply for this Position
            </h2>
            
            <Alert className="mb-6 bg-honey-50 dark:bg-charcoal-700 border-honey-200 dark:border-honey-800">
              <Info className="h-5 w-5 text-honey-500" />
              <AlertDescription className="ml-2 text-charcoal-700 dark:text-charcoal-300">
                Please fill out the form below. All fields marked with * are required.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input 
                  id="position" 
                  value={job.title} 
                  disabled 
                  className="bg-gray-100 dark:bg-charcoal-700 cursor-not-allowed"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    value={formData.fullName} 
                    onChange={handleInputChange}
                    placeholder="John Doe" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="johndoe@example.com" 
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    value={formData.phone} 
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567" 
                  />
                </div>
                <div>
                  <Label htmlFor="heardFrom">How did you hear about us?</Label>
                  <Select onValueChange={handleSelectChange} value={formData.heardFrom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="jobBoard">Job Board</SelectItem>
                      <SelectItem value="friend">Friend/Colleague</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea 
                  id="experience"
                  name="experience"
                  value={formData.experience} 
                  onChange={handleInputChange} 
                  placeholder="Briefly describe your relevant experience"
                  required
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <Input 
                  id="portfolio" 
                  name="portfolio"
                  type="url"
                  value={formData.portfolio} 
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com" 
                />
              </div>
              
              <div>
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea 
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter} 
                  onChange={handleInputChange} 
                  placeholder="Why are you interested in this position and what makes you a good fit?"
                  required
                  className="min-h-[150px]"
                />
              </div>
              
              <div>
                <Label htmlFor="resume">Resume/CV *</Label>
                <div className="flex items-center mt-1">
                  <label htmlFor="resume" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border border-input text-sm rounded-md bg-background hover:bg-muted">
                      <Upload className="h-4 w-4" />
                      <span>{formData.resumeFile ? formData.resumeFile.name : "Upload file"}</span>
                    </div>
                    <input 
                      id="resume" 
                      name="resume" 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange} 
                      required
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX up to 5MB</p>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerDetails;
