import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,
    }, description: {
        type: String,
        required: [true, "Project description is required"],
    }, status: {
        type: String,
        enum: ["open", "in_progress", "completed", "cancelled"],
        default: "open",
    }, category: {
        type: String,
        required: true
    }, budget: {
        type : Number,
        required: true,
        min: 0
    }, bidsCount:{
      type: Number
    }
},
    {
        timestamps: true
    }
)
export default mongoose.model('projects', projectSchema)