import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    propertiesCount: {
        type: Number,
        required: true
    },
  }, { timestamps: true });
  
 const Project = mongoose.model('Project', ProjectSchema);
 export default Project;
  