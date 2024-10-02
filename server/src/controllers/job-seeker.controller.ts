import { Request, Response } from 'express'
import Jobseeker from '../models/job-seeker.model'

export const createJobseeker = async (req: Request, res: Response) => {
  try {
    const { user, dob, skills, about } = req.body

    const cv = req.file ? req.file.path : '' 

    const newJobseeker = new Jobseeker({
      user,
      cv,  
      dob,
      skills: JSON.parse(skills),  
      about
    })

    const savedJobseeker = await newJobseeker.save()
    res.status(201).json(savedJobseeker)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllJobseekers = async (req: Request, res: Response) => {
  try {
    const jobseekers = await Jobseeker.find().populate('user') // Populate the user field with the user model
    res.status(200).json(jobseekers)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
