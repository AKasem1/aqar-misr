import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
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
    assignedProperties: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Property',
      default: []
    },
    position: {
      type: String,
      required: true
    },
    type:{
      type: String,
      default: 'employee'
    }
  }, { timestamps: true });
  
 const Employee = mongoose.model('Employee', EmployeeSchema);
 export default Employee;
  