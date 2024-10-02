import { Request, Response } from 'express'
import Category from '../models/category.model'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const image = req.file ? req.file.path : null

    if (!image) {
      return res.status(400).json({ message: 'Image is required' })
    }

    const newCategory = new Category({
      name,
      image
    })

    const savedCategory = await newCategory.save()
    res.status(201).json(savedCategory)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await Category.findById(id)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json(category)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const image = req.file ? req.file.path : undefined

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, ...(image && { image }) }, 
      { new: true, runValidators: true }
    )

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json(updatedCategory)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedCategory = await Category.findByIdAndDelete(id)

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
