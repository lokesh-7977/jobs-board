import mongoose, { Schema, Document } from 'mongoose'

interface IJobseeker extends Document {
  user: mongoose.Types.ObjectId;
  cv: string;
  dob: Date;
  skills: string[];
  about: string;
}

const jobseekerSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  cv: {
    type: String,
    default: ''
  },
  dob: {
    type: Date,
    default: ''
  },
  skills: {
    type: Array
  },
  about: {
    type: String,
    minlength: 100
  }
}, {
  timestamps: true
})

const Jobseeker = mongoose.models.jobseeker || mongoose.model<IJobseeker>('jobseeker', jobseekerSchema)
export default Jobseeker
