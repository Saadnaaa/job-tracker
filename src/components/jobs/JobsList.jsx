"use client";

import { useEffect, useState } from "react";
import {
  getAllJobs,
  deleteJob,
  updateJobStatus,
} from "@/actions/jobActions";
import toast from "react-hot-toast";
import {
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Trash2,
  Loader2,
  Inbox,
} from "lucide-react";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  const fetchJobs = async () => {
    try {
      const result = await getAllJobs();

      if (result.status !== 200) {
        toast.error(result.message);
        return;
      }

      setJobs(result.jobs);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job application?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(jobId);

      const result = await deleteJob(jobId);

      if (result.status !== 200) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      toast.error("Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      setUpdatingJobId(jobId);

      const result = await updateJobStatus(jobId, newStatus);

      if (result.status !== 200) {
        toast.error(result.message);
        return;
      }

      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );

      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to update job status");
    } finally {
      setUpdatingJobId(null);
    }
  };

  // High-contrast badge colors (no theme overrides)
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800";
      case "Interview":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      case "Offer":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto my-12 flex flex-col items-center justify-center p-8 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
          Loading job applications...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            My Job Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track and manage your application progress
          </p>
        </div>
        <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-full text-xs font-semibold">
          {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
        </div>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full w-fit mx-auto mb-3">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
            No job applications yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Start tracking your applications by submitting the form above.
          </p>
        </div>
      ) : (
        /* Jobs List */
        <div className="space-y-4">
          {jobs.map((job) => {
            const isDeleting = deletingId === job._id;
            const isUpdating = updatingJobId === job._id;

            return (
              <div
                key={job._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      {job.position}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      {job.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(job.status)}`}>
                      {job.status}
                    </span>
                    {job.appliedAt && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(job.appliedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {job.notes && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 border border-slate-100 dark:border-slate-800">
                    <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <p className="whitespace-pre-line leading-relaxed">{job.notes}</p>
                  </div>
                )}

                {/* Bottom Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status Select */}
                    <div className="flex items-center gap-2">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(job._id, e.target.value)
                        }
                        disabled={isUpdating || isDeleting}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>

                      {isUpdating && (
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 animate-pulse font-medium">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Updating...
                        </span>
                      )}
                    </div>

                    {/* External Link */}
                    {job.jobUrl && (
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Job
                      </a>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(job._id)}
                    disabled={isDeleting || updatingJobId !== null}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 border border-rose-200 dark:border-rose-900 transition-all flex items-center gap-1.5 ml-auto"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}