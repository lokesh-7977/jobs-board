import { Request, Response } from 'express'
import JobsApplied from '../models/jobs-applied.model'

export const createJobApplication = async (req: Request, res: Response) => {
  try {
    const { job, jobseeker, status } = req.body

    const newJobApplication = new JobsApplied({
      job,
      jobseeker,
      status: status || 'on review' 
    })

    const savedJobApplication = await newJobApplication.save()
    res.status(201).json(savedJobApplication)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllJobApplications = async (req: Request, res: Response) => {
  try {
    const jobApplications = await JobsApplied.find()
      .populate('job')
      .populate('jobseeker')
    res.status(200).json(jobApplications)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const jobApplication = await JobsApplied.findById(id)
      .populate('job')
      .populate('jobseeker')
    
    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' })
    }

    res.status(200).json(jobApplication)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateJobApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { job, jobseeker, status } = req.body

    const updatedJobApplication = await JobsApplied.findByIdAndUpdate(
      id,
      { job, jobseeker, status },
      { new: true, runValidators: true } 
    )

    if (!updatedJobApplication) {
      return res.status(404).json({ message: 'Job application not found' })
    }

    res.status(200).json(updatedJobApplication)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteJobApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedJobApplication = await JobsApplied.findByIdAndDelete(id)

    if (!deletedJobApplication) {
      return res.status(404).json({ message: 'Job application not found' })
    }

    res.status(200).json({ message: 'Job application deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
