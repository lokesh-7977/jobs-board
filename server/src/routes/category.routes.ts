import express from 'express'
import {Router} from 'express'
import { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from '../controllers/category.controller'
import upload from '../utils/upload'

const router = express.Router()

router.post('/create', upload.single('image'), createCategory as any)
router.get('/', getAllCategories)
router.get('/:id', getCategoryById as any)
router.put('/:id', upload.single('image'), updateCategory as any)
router.delete('/:id', deleteCategory as any)

export default router
