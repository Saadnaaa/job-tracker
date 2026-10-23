import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    jobUrl:{
        type: String,
        trim: true,
        default: "",
    }, 
    status: {
        type: String,
         enum: ["Applied", "Interview", "Offer", "Rejected"],
        default: "applied",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
     appliedAt: {
      type: Date,
      default: Date.now,
    },
} , {timestamps: true})

const Job = mongoose.models.Job || mongoose.model('Job' , jobSchema)

export default Job;