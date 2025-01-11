import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
  }, { timestamps: true });
  
 const Report = mongoose.model('Report', ReportSchema);
 export default Report;
  