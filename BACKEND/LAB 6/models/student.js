import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  email:  { type: String, required: true, trim: true, lowercase: true },
  course: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);