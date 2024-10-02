import { Request, Response } from 'express'
import Job from '../models/jobs.model'

export const createJob = async (req: Request, res: Response) => {
  try {
    const { organization, position, category, jobLevel, employmentType, skills, salary, overview, requirements, keywords } = req.body

    const newJob = new Job({
      organization,
      position,
      category,
      jobLevel,
      employmentType,
      skills,
      salary,
      overview,
      requirements,
      keywords
    })

    const savedJob = await newJob.save()
    res.status(201).json(savedJob)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate('organization').populate('category')
    res.status(200).json(jobs)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const job = await Job.findById(id).populate('organization').populate('category')
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.status(200).json(job)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { organization, position, category, jobLevel, employmentType, skills, salary, overview, requirements, keywords } = req.body

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { organization, position, category, jobLevel, employmentType, skills, salary, overview, requirements, keywords },
      { new: true, runValidators: true }
    )

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.status(200).json(updatedJob)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedJob = await Job.findByIdAndDelete(id)

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
