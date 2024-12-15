import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['مستأجر', 'مؤجر'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
