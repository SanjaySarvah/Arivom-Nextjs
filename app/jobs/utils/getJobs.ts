import jobsData from "@/data/jobs.json";

export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  experience: string;
  skills: string[];
  education: string;
  remote: boolean;
  postedDate: string;
  status: string;
  applyLink: string;
  description: string;
}

// Get all jobs
export const getAllJobs = (): Job[] => jobsData;

// Get a single job by ID
export const getJobById = (id: number): Job | undefined =>
  jobsData.find((job) => job.id === id);

// Filter jobs by search, location, and category
export const getJobsByFilter = (
  search: string,
  location: string,
  category: string
): Job[] => {
  return jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location ? job.location === location : true;
    const matchesCategory = category ? job.category === category : true;
    return matchesSearch && matchesLocation && matchesCategory;
  });
};

// ✅ Get similar jobs based on category, location, or skills
export const getSimilarJobs = (jobId: number): Job[] => {
  const job = getJobById(jobId);
  if (!job) return [];

  return jobsData
    .filter((j) => {
      if (j.id === job.id) return false;

      const sameCategory = j.category === job.category;
      const sameLocation = j.location === job.location;
      const sharedSkill = j.skills.some((skill) =>
        job.skills.includes(skill)
      );

      // Match if any of these are similar
      return sameCategory || sameLocation || sharedSkill;
    })
    .slice(0, 6); // limit to 6 similar jobs
};
