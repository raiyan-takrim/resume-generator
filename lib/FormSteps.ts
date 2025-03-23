export const FORM_STEPS = {
    PERSONAL_DETAILS: 0,
    EDUCATION: 1,
    SKILLS: 2,
    EXPERIENCE: 3,
    CERTIFICATIONS: 4,
    LANGUAGES: 5,
} as const;

type FormStep = keyof typeof FORM_STEPS;