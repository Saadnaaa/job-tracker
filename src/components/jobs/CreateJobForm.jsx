"use client";

import { useState } from "react";
import { createJob } from "@/actions/jobActions";
import toast from "react-hot-toast";
import { 
  Building2, 
  Briefcase, 
  Link as LinkIcon, 
  CheckCircle2, 
  FileText, 
  Loader2, 
  PlusCircle 
} from "lucide-react";

export default function CreateJobForm() {
  const [jobData, setJobData] = useState({
    company: "",
    position: "",
    jobUrl: "",
    status: "Applied",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await createJob(jobData);

      if (result.status !== 201) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setJobData({
        company: "",
        position: "",
        jobUrl: "",
        status: "Applied",
        notes: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <PlusCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Add Job Application
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Keep track of your career opportunities in one place.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" /> Company Name
          </label>
          <input
            type="text"
            name="company"
            placeholder="e.g. Google, Microsoft, Remote Startup"
            value={jobData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Job Position */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-slate-400" /> Job Position
          </label>
          <input
            type="text"
            name="position"
            placeholder="e.g. Senior Full Stack Engineer, React Developer"
            value={jobData.position}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Job URL */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-slate-400" /> Job URL
          </label>
          <input
            type="url"
            name="jobUrl"
            placeholder="e.g. https://company.com/careers/job-listing-123"
            value={jobData.jobUrl}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-slate-400" /> Status
          </label>
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400" /> Notes
          </label>
          <textarea
            name="notes"
            placeholder="Add interview dates, recruiter contact info, referral notes, or salary expectations..."
            value={jobData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Adding Job...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                <span>Add Job Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}