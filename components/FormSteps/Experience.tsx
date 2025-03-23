import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormError } from '../FormError';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeFormSchema } from '@/lib/validations/resume';
import { z } from 'zod';

type FormData = z.infer<typeof resumeFormSchema>;

type Experience = {
    company: string;
    role: string;
    duration: string;
    description: string;
};

type ExperienceProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>['experiences'];
    values: FormData['experiences'];
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export const Experience = ({
    register,
    errors,
    values,
    onAdd,
    onRemove,
}: ExperienceProps) => {
    return (
        <div className="max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold">Experience</h2>
                    <p className="text-gray-500 mt-1">Add your work experience details below.</p>
                </div>
                <Button
                    type="button"
                    onClick={onAdd}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Experience
                </Button>
            </div>

            {values.length === 0 && (
                <p className="text-gray-500 p-4 border border-dashed rounded-lg text-center">
                    No experience added yet. Click "Add Experience" to begin.
                </p>
            )}

            <div className="space-y-4">
                {values.map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative p-6 border rounded-lg bg-white shadow-sm"
                    >
                        <div className="flex justify-end mb-4">
                            <Button
                                type="button"
                                onClick={() => onRemove(index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Input
                                    {...register(`experiences.${index}.company`)}
                                    placeholder="Company name"
                                    className="w-full"
                                />
                                {errors?.[index]?.company && (
                                    <FormError message={errors[index].company.message} />
                                )}
                            </div>

                            <div>
                                <Input
                                    {...register(`experiences.${index}.role`)}
                                    placeholder="Job title / Role"
                                    className="w-full"
                                />
                                {errors?.[index]?.role && (
                                    <FormError message={errors[index].role.message} />
                                )}
                            </div>

                            <div>
                                <Input
                                    {...register(`experiences.${index}.duration`)}
                                    placeholder="Duration (e.g., Jan 2020 - Present)"
                                    className="w-full"
                                />
                                {errors?.[index]?.duration && (
                                    <FormError message={errors[index].duration.message} />
                                )}
                            </div>

                            <div>
                                <Textarea
                                    {...register(`experiences.${index}.description`)}
                                    placeholder="Describe your responsibilities and achievements"
                                    className="w-full min-h-[100px] resize-y"
                                />
                                {errors?.[index]?.description && (
                                    <FormError message={errors[index].description.message} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {errors?.root?.message && (
                <FormError message={errors.root.message} />
            )}
        </div>
    );
};