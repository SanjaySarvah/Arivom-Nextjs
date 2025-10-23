import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getJobById, getSimilarJobs } from "../utils/getJobs";
import SectionHeader from "@/components/Common/SectionHeader";
import { 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  Building2, 
  Users,
  Share2
} from "lucide-react";

interface Props {
  params: { id: string };
}

export default function JobDetailPage({ params }: Props) {
  const job = getJobById(parseInt(params.id));
  const similarJobs = getSimilarJobs(parseInt(params.id));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Content - Job Details */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            {/* Job Header Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 relative">
              
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                
                {/* Left Side: Logo + Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 self-start mx-auto sm:mx-0">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>
<div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
  <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 leading-snug break-words text-center lg:text-left">
    {job.title}
  </h2>

  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 text-sm justify-center sm:justify-start">
    <span className="font-medium text-base sm:text-sm">{job.company}</span>
    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
      <span className="flex items-center gap-1.5">
        <MapPin size={16} className="text-gray-500 flex-shrink-0" />
        <span className="truncate">{job.location}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <Briefcase size={16} className="text-gray-500 flex-shrink-0" />
        <span>{job.experience}</span>
      </span>
    </div>
  </div>

  {/* Tags */}
  <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
    <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
      {job.type}
    </span>
    <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-medium border border-purple-100">
      {job.category}
    </span>
  </div>
</div>

                </div>

           {/* Salary */}
<div className="flex justify-center sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
  <p className="text-lg sm:text-2xl font-bold text-green-600 leading-tight text-center sm:text-right">
    {job.salary} <span className="text-gray-500 text-sm">/month</span>
  </p>
</div>


              </div>

              <div className="border-t border-gray-200 mb-2 mt-2"></div>

              {/* Bottom Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-600 text-sm">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span>84 applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>
                      {new Date(job.postedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex ml-auto">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>

              {/* Mobile Apply Now Button */}
              <div className="sm:hidden mt-5">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-150"
                >
                  Apply Now
                </a>
              </div>

            </div>

            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Job Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <IndianRupee className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Salary</p>
                      <p className="text-gray-700">{job.salary}</p>
                      <p className="text-gray-500 text-sm">Monthly in-hand pay</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-700">{job.location}</p>
                      <p className="text-gray-500 text-sm">On-site</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Job Type</p>
                      <p className="text-gray-700">{job.type}</p>
                      <p className="text-gray-500 text-sm">{job.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Education</p>
                      <p className="text-gray-700">{job.education}</p>
                      <p className="text-gray-500 text-sm">Minimum qualification</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Job Description</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{job.description}</p>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {job.company}</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">{job.company} is a leading technology company specializing in innovative solutions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            <div className="relative">
         <div className="lg:sticky lg:top-24 max-h-[calc(200vh-8rem)] overflow-auto">
              <SectionHeader
          subtitle="Related Jobs"
          title=""
          showButton={false}
          buttonText="View All"
          buttonUrl="/news"
        />
  {similarJobs.slice(0, 6).map((similarJob) => (
    <Link key={similarJob.id} href={`/jobs/${similarJob.id}`}>
      <div className="p-3 mb-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
            <Image
              src={similarJob.logo}
              alt={similarJob.company}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{similarJob.title}</h4>
            <p className="text-gray-600 text-sm">{similarJob.company}</p>
            <p className="text-green-600 font-medium text-sm">{similarJob.salary}</p>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
