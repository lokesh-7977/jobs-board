import express from 'express'
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication
} from '../controllers/jobs-applied'

const router = express.Router()

router.post('/', createJobApplication)
router.get('/', getAllJobApplications)
router.get('/:id', getJobApplicationById as any)
router.put('/:id', updateJobApplication as any)
router.delete('/:id', deleteJobApplication as any)

export default router
