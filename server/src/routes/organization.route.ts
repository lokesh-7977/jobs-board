import express from 'express'
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} from '../controllers/organization.controller'

const router = express.Router()

router.post('/', createOrganization)
router.get('/', getAllOrganizations)
router.get('/:id', getOrganizationById as any)
router.put('/:id', updateOrganization as any)
router.delete('/:id', deleteOrganization as any)

export default router
