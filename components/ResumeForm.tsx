"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { PersonalDetails } from './FormSteps/PersonalDetails';
import { Education } from './FormSteps/Education';
import { Skills } from './FormSteps/Skills';
import { Experience } from './FormSteps/Experience';
import { Certifications } from './FormSteps/Certifications';
import { Languages } from './FormSteps/Languages';
import { FormProgress } from './FormProgress';
import { FormError } from './FormError';

import { Button } from '@/components/ui/button';
import { resumeFormSchema } from '@/lib/validations/resume';
import { ScrollArea } from './ui/scroll-area';

const STEPS = [
    'Personal Details',
    'Education',
    'Skills',
    'Experience',
    'Certifications',
    'Languages',
] as const;

type FormData = z.infer<typeof resumeFormSchema>;

export default function ResumeForm() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [validSteps, setValidSteps] = useState<number[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        trigger,
        getValues,
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(resumeFormSchema),
        defaultValues: {
            personalDetails: {
                fullName: 'MD. Raiyan Takrim',
                email: 'raiyan.takrim@gmail.com',
                phone: '+8801717171717',
                linkedIn: 'https://www.linkedin.com/in/raiyan-takrim/',
                github: 'https://github.com/raiyan-takrim',
                summary: 'I am a software engineer with a passion for building scalable and efficient systems. I am a quick learner and I am always looking for new challenges.',
            },
            education: [],
            skills: [],
            experiences: [],
            certifications: [],
            languages: [],
        },
    });

    const validateCurrentStep = async () => {
        let isValid = false;
        switch (currentStep) {
            case 0:
                isValid = await trigger('personalDetails');
                break;
            case 1:
                isValid = await trigger('education');
                break;
            case 2:
                isValid = await trigger('skills');
                break;
            case 3:
                isValid = await trigger('experiences');
                break;
            case 4:
                // Certifications are optional
                isValid = true;
                break;
            case 5:
                isValid = await trigger('languages');
                break;
        }
        return isValid;
    };

    const handleNext = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            if (!validSteps.includes(currentStep)) {
                setValidSteps([...validSteps, currentStep]);
            }
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = async (data: FormData) => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            console.log('Form submitted:', data);
            // Handle form submission
        }
    };

    // Animation variants
    const pageVariants = {
        initial: {
            opacity: 0,
            x: 50,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            x: -50,
        },
    };

    const renderStep = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 0 && (
                        <PersonalDetails
                            register={register}
                            errors={errors.personalDetails || {}}
                            values={watch('personalDetails')}
                        />
                    )}
                    {currentStep === 1 && (
                        <Education
                            register={register}
                            errors={errors.education || {}}
                            values={watch('education')}
                            onAdd={() => {
                                const currentEducation = getValues('education');
                                setValue('education', [...currentEducation, { institution: '', degree: '', year: '' }]);
                            }}
                            onRemove={(index) => {
                                const currentEducation = getValues('education');
                                setValue('education', currentEducation.filter((_, i) => i !== index));
                            }}
                        />
                    )}
                    {currentStep === 2 && (
                        <Skills
                            register={register}
                            errors={errors.skills || {}}
                            values={watch('skills')}
                            onAdd={() => {
                                const currentSkills = getValues('skills');
                                setValue('skills', [...currentSkills, '']);
                            }}
                            onRemove={(index) => {
                                const currentSkills = getValues('skills');
                                setValue('skills', currentSkills.filter((_, i) => i !== index));
                            }}
                        />
                    )}
                    {currentStep === 3 && (
                        <Experience
                            register={register}
                            errors={errors.experiences || {}}
                            values={watch('experiences')}
                            onAdd={() => {
                                const currentExperiences = getValues('experiences');
                                setValue('experiences', [...currentExperiences, { company: '', role: '', duration: '', description: '' }]);
                            }}
                            onRemove={(index) => {
                                const currentExperiences = getValues('experiences');
                                setValue('experiences', currentExperiences.filter((_, i) => i !== index));
                            }}
                        />
                    )}
                    {currentStep === 4 && (
                        <Certifications
                            register={register}
                            errors={errors.certifications || {}}
                            values={watch('certifications') || []}
                            onAdd={() => {
                                const currentCertifications = getValues('certifications') || [];
                                setValue('certifications', [...currentCertifications, { name: '', year: '' }]);
                            }}
                            onRemove={(index) => {
                                const currentCertifications = getValues('certifications') || [];
                                setValue('certifications', currentCertifications.filter((_, i) => i !== index));
                            }}
                        />
                    )}
                    {currentStep === 5 && (
                        <Languages
                            register={register}
                            errors={errors.languages || {}}
                            values={watch('languages')}
                            onAdd={() => {
                                const currentLanguages = getValues('languages');
                                setValue('languages', [...currentLanguages, '']);
                            }}
                            onRemove={(index) => {
                                const currentLanguages = getValues('languages');
                                setValue('languages', currentLanguages.filter((_, i) => i !== index));
                            }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="h-full flex flex-col">
            {/* Progress bar */}
            <div className="flex-none py-4 bg-white border-b">
                <div className="max-w-2xl mx-auto px-6">
                    <FormProgress
                        steps={STEPS}
                        currentStep={currentStep}
                        validSteps={validSteps}
                    />
                </div>
            </div>

            {/* Form content */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 flex flex-col overflow-hidden"
            >
                {/* Scrollable area */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="px-6 py-6">
                            <div className="max-w-2xl mx-auto">
                                {renderStep()}
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Navigation buttons */}
                <div className="flex-none border-t bg-white">
                    <div className="max-w-2xl mx-auto px-6 py-4">
                        <div className="flex justify-between w-full">
                            <Button
                                type="button"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                variant="outline"
                            >
                                Back
                            </Button>

                            {currentStep < STEPS.length - 1 ? (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}