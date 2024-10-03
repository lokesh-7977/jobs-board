import { Request, Response } from 'express';
import Organization from '../models/organization.model';
import bcrypt from 'bcrypt'; // Import bcrypt

export const createOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name,
            email,
            password,
            phoneNumber,
            createdDate,
            address,
            city,
            district,
            industryType,
            logo,
            postalCode,
            province,
            totalEmployee,
            description,
            image
        } = req.body;

        // Validate the required fields
        if (!name || !email || !password || !phoneNumber || !createdDate || !address || !city || !district || !industryType || !logo || !postalCode || !province || !totalEmployee) {
            res.status(400).json({ message: 'All required fields must be provided.' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newOrganization = new Organization({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            phoneNumber,
            createdDate,
            address,
            city,
            district,
            industryType,
            logo,
            postalCode,
            province,
            totalEmployee,
            description,
            image
        });

        const savedOrganization = await newOrganization.save();

        // Send response with the organization id and the saved organization data
        res.status(201).json({
            id: savedOrganization._id, // Return the _id
            organization: savedOrganization // Return the full organization data
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedOrganization = await Organization.findByIdAndDelete(id);

        if (!deletedOrganization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
