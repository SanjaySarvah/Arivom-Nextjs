"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getJobsByFilter,
  getAllJobs,
  Job,
} from "@/app/jobs/utils/getJobs";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Clock,
  Search,
  Star,
} from "lucide-react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [jobsPerPage] = useState(5);

  // Load all jobs on mount
  useEffect(() => {
    setJobs(getAllJobs());
  }, []);

  // ---- FILTER HANDLER ----
  const handleFilter = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = getJobsByFilter(search, location, category);
      setJobs(filtered);
      setPage(1);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleFilter();
  };

  // ---- PAGINATION ----
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}


      {/* HERO SEARCH */}
     <section
  className="py-12 text-center"
  style={{ backgroundColor: "var(--secondary)" }}
>
        <div className="max-w-5xl mx-auto px-4">
     

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-2 mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search */}
              <div className="flex-1 flex items-center border-r border-gray-200 pr-2">
                <Search className="text-gray-400 ml-3 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Location */}
              <div className="flex-1 flex items-center border-r border-gray-200 pr-2">
                <MapPin className="text-gray-400 ml-3 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="City, state, or zip"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleFilter}
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-white text-sm">Popular:</span>
            {["Software Engineer", "React Developer", "Full Stack", "Frontend", "Backend"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearch(tag);
                    handleFilter();
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-400"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Filter Jobs</h3>

            <div className="space-y-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Trichy">Trichy</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="IT">IT & Software</option>
                  <option value="Design">Design</option>
                  <option value="Admin">Administration</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <button
                onClick={handleFilter}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Jobs List */}
        <section className="lg:w-3/4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {jobs.length} jobs found
              </h2>
              <p className="text-gray-600">
                {search && `for "${search}"`} {location && `in ${location}`}
              </p>
            </div>
            <select className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option>Most relevant</option>
              <option>Most recent</option>
              <option>Highest salary</option>
            </select>
          </div>

          {/* JOB CARDS */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Searching for jobs...</p>
            </div>
          ) : currentJobs.length > 0 ? (
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition group cursor-pointer">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full rounded"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between flex-col sm:flex-row">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-gray-700">{job.company}</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={14}
                                    className="text-yellow-400 fill-current"
                                  />
                                ))}
                                <span className="text-gray-500 text-sm">(4.2)</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 text-right">
                            <span className="text-lg font-semibold text-green-600">
                              {job.salary}
                            </span>
                            <p className="text-gray-500 text-sm">per month</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                          <span className="flex items-center gap-1">
                            <MapPin size={16} className="text-gray-400" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={16} className="text-gray-400" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} className="text-gray-400" />
                            {new Date(job.postedDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span className="text-green-600 text-sm font-medium">
                            ⚡ Urgently hiring
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Quick Applied for ${job.title}!`);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                          >
                            Quick Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <button
                onClick={() => {
                  setSearch("");
                  setLocation("");
                  setCategory("");
                  setJobs(getAllJobs());
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse All Jobs
              </button>
            </div>
          )}

          {/* Pagination */}
          {jobs.length > jobsPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 border rounded-lg ${
                    page === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>


    </div>
  );
}
