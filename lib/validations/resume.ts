import { z } from 'zod';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const urlRegex = new RegExp(
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
);

export const personalDetailsSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(phoneRegex, 'Invalid phone number'),
    linkedIn: z.string().regex(urlRegex, 'Invalid LinkedIn URL').optional().or(z.literal('')),
    github: z.string().regex(urlRegex, 'Invalid GitHub URL').optional().or(z.literal('')),
    summary: z.string().min(50, 'Summary must be at least 50 characters'),
});

export const educationSchema = z.object({
    institution: z.string().min(1, 'Institution name is required').min(2, 'Institution name must be at least 2 characters'),
    degree: z.string().min(1, 'Degree is required').min(2, 'Degree must be at least 2 characters'),
    year: z.string()
        .min(1, 'Year is required')
        .regex(/^\d{4}$/, 'Please enter a valid year (YYYY)')
        .refine(
            (year) => {
                const yearNum = parseInt(year);
                const currentYear = new Date().getFullYear();
                return yearNum >= 1900 && yearNum <= currentYear;
            },
            { message: 'Please enter a valid year between 1900 and current year' }
        ),
});

export const experienceSchema = z.object({
    company: z.string().min(2, 'Company name is required'),
    role: z.string().min(2, 'Role is required'),
    duration: z.string().min(2, 'Duration is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
});

export const certificationSchema = z.object({
    name: z.string().min(2, 'Certification name is required'),
    year: z.string().regex(/^\d{4}$/, 'Please enter a valid year'),
});

export const skillSchema = z.string().min(2, 'Skill is required');
export const languageSchema = z.string().min(2, 'Language is required');

export const resumeFormSchema = z.object({
    personalDetails: personalDetailsSchema,
    education: z.array(educationSchema).optional().default([]),
    skills: z.array(skillSchema).min(1, 'Add at least one skill'),
    experiences: z.array(experienceSchema).min(1, 'Add at least one experience'),
    certifications: z.array(certificationSchema).optional().default([]),
    languages: z.array(languageSchema).min(1, 'Add at least one language'),
}); 