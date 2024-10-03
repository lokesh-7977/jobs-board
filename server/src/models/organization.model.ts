import { Schema, model, Document } from 'mongoose';

interface IOrganization extends Document {
    name: string;
    email: string;
    password: string; // Store hashed passwords only
    phoneNumber: string;
    createdDate: string; // Change to Date type if applicable
    address: string;
    city: string;
    district: string;
    industryType: string;
    logo: string; // URL to the logo image
    postalCode: string;
    province: string;
    totalEmployee: string; // Consider changing this to number if possible
    description?: string; // Optional field
    image?: string; // Optional field for image path if applicable
}

const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email should be unique
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdDate: { type: String, required: true }, // Change to Date type if applicable
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    industryType: { type: String, required: true },
    logo: { type: String, required: true },
    postalCode: { type: String, required: true },
    province: { type: String, required: true },
    totalEmployee: { type: String, required: true }, // Change to number if applicable
    description: { type: String },
    image: { type: String },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

const Organization = model<IOrganization>('Organization', organizationSchema);

export default Organization;
