import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '../FormError';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeFormSchema } from '@/lib/validations/resume';
import { z } from 'zod';

type FormData = z.infer<typeof resumeFormSchema>;

type Education = {
    institution: string;
    degree: string;
    year: string;
};

type EducationProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>['education'];
    values: FormData['education'];
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export const Education = ({
    register,
    errors,
    values,
    onAdd,
    onRemove,
}: EducationProps) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Education</h2>
                    <p className="text-gray-500 mt-1">Please fill in your education details below.</p>
                </div>
                <Button
                    type="button"
                    onClick={onAdd}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Education
                </Button>
            </div>

            {values.length === 0 && (
                <p className="text-gray-500 p-4 border border-dashed rounded-lg text-center">
                    No education details added yet. Click "Add Education" to begin.
                </p>
            )}

            <div className="space-y-4">
                {values.map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative p-6 border rounded-lg bg-white"
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
                                    {...register(`education.${index}.institution`)}
                                    placeholder="Institution name"
                                    className="w-full"
                                />
                                {errors?.[index]?.institution && (
                                    <FormError message={errors[index].institution.message} />
                                )}
                            </div>

                            <div>
                                <Input
                                    {...register(`education.${index}.degree`)}
                                    placeholder="Degree / Field of study"
                                    className="w-full"
                                />
                                {errors?.[index]?.degree && (
                                    <FormError message={errors[index].degree.message} />
                                )}
                            </div>

                            <div>
                                <Input
                                    {...register(`education.${index}.year`)}
                                    placeholder="Year of completion (YYYY)"
                                    type="text"
                                    maxLength={4}
                                    className="w-full"
                                />
                                {errors?.[index]?.year && (
                                    <FormError message={errors[index].year.message} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};