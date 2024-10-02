import express from 'express'
import { createJobseeker, getAllJobseekers } from '../controllers/job-seeker.controller'
import upload from '../utils/upload'  

const router = express.Router()

router.post('/create', upload.single('cv'), createJobseeker)
router.get('/', getAllJobseekers)

export default router
