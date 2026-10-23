import CreateJobForm from "@/components/jobs/CreateJobForm";
import JobsList from "@/components/jobs/JobsList";
import { Briefcase, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase border border-indigo-100 dark:border-indigo-900">
            <Sparkles className="w-3.5 h-3.5" />
            Career Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Job Tracker
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Organize and monitor your job search pipeline seamlessly.
          </p>
        </header>

        {/* Content Section */}
        <div className="space-y-12">
          <CreateJobForm />
          <div className="border-t border-slate-200 dark:border-slate-800" />
          <JobsList />
        </div>

      </div>
    </main>
  );
}