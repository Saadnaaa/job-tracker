'use server'

import { connectDB } from "@/lib/db"
import Job from "@/models/Job"
import { revalidatePath } from "next/cache"

export const createJob = async (jobData)=> {
    try {
        await connectDB()

        const {company , position , jobUrl , status , notes} = jobData

        if(!company?.trim() || !position?.trim()){
            return {
                status: 400,
                message: "Company and position are required",
            }
        }

        const newJob = await Job.create({
            company,
            position,
            jobUrl,
            status,
            notes,
        })

        revalidatePath('/')

        return {
            status: 201,
            message: "Job application created successfully",
            job: JSON.parse(JSON.stringify(newJob))
        }
    } catch (error) {
        console.log("Create job error:", error.message);

    return {
      status: 500,
      message: "Internal server error",
    }
}
}

export const getAllJobs = async ()=> {
    try {
        await connectDB()

        const jobs = await Job.find().sort({ createdAt: -1 }).lean()

        return {
            status: 200,
            jobs: JSON.parse(JSON.stringify(jobs))
        }
    } catch (error) {
        console.log("Get jobs error:", error.message);

    return {
      status: 500,
      message: "Failed to fetch jobs",
    };
    }
}

export const deleteJob = async(jobId)=> {
    try {
        await connectDB()

        const deletedJob = await Job.findByIdAndDelete(jobId)

        if(!deletedJob){
            return {
                status: 404,
                  message: "Job application not found",
            }
        }

        revalidatePath('/')


    return {
      status: 200,
      message: "Job application deleted successfully",
    };
    } catch (error) {
        console.log("Delete job error:", error.message);

    return {
      status: 500,
      message: "Failed to delete job application",
    };
    }
}


export async function updateJobStatus(jobId, status) {
  try {
    const allowedStatuses = [
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
    ];

    if (!jobId || !status) {
      return {
        status: 400,
        message: "Job ID and status are required",
      };
    }

    if (!allowedStatuses.includes(status)) {
      return {
        status: 400,
        message: "Invalid job status",
      };
    }

    await connectDB();

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return {
        status: 404,
        message: "Job application not found",
      };
    }

    revalidatePath("/");

    return {
      status: 200,
      message: "Job status updated successfully",
      job: JSON.parse(JSON.stringify(updatedJob)),
    };
  } catch (error) {
    console.log("Update job status error:", error.message);

    return {
      status: 500,
      message: "Failed to update job status",
    };
  }
}
