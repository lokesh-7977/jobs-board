import { Request, Response } from 'express'
import Organization from '../models/organization.model'

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { user, phoneNumber, createdDate, totalEmployee, industryType, address, description, status } = req.body

    const newOrganization = new Organization({
      user,
      phoneNumber,
      createdDate,
      totalEmployee,
      industryType,
      address,
      description,
      status: status || 'on review' 
    })

    const savedOrganization = await newOrganization.save()
    res.status(201).json(savedOrganization)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.find().populate('user')
    res.status(200).json(organizations)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const organization = await Organization.findById(id).populate('user')

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' })
    }

    res.status(200).json(organization)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { phoneNumber, totalEmployee, industryType, address, description, status } = req.body

    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      { phoneNumber, totalEmployee, industryType, address, description, status },
      { new: true, runValidators: true } 
    )

    if (!updatedOrganization) {
      return res.status(404).json({ message: 'Organization not found' })
    }

    res.status(200).json(updatedOrganization)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedOrganization = await Organization.findByIdAndDelete(id)

    if (!deletedOrganization) {
      return res.status(404).json({ message: 'Organization not found' })
    }

    res.status(200).json({ message: 'Organization deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
