import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    type:{
      type: String,
      enum: ['admin', 'employee'],
      default: 'admin'
    }
  }, { timestamps: true });
  
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
  