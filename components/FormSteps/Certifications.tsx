import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '../FormError';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeFormSchema } from '@/lib/validations/resume';
import { z } from 'zod';

type FormData = z.infer<typeof resumeFormSchema>;

type Certification = {
    name: string;
    year: string;
};

type CertificationsProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>['certifications'];
    values: FormData['certifications'];
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export const Certifications = ({
    register,
    errors,
    values = [],
    onAdd,
    onRemove,
}: CertificationsProps) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Certifications</h2>
                    <p className="text-gray-500 mt-1">Add your professional certifications and achievements.</p>
                </div>
                <Button
                    type="button"
                    onClick={onAdd}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Certification
                </Button>
            </div>

            {values.length === 0 && (
                <p className="text-gray-500 p-4 border border-dashed rounded-lg text-center">
                    No certifications added yet. Click "Add Certification" to begin.
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
                                    {...register(`certifications.${index}.name`)}
                                    placeholder="Certification name"
                                    className="w-full"
                                />
                                {errors?.[index]?.name && (
                                    <FormError message={errors[index].name.message} />
                                )}
                            </div>

                            <div>
                                <Input
                                    {...register(`certifications.${index}.year`)}
                                    placeholder="Year obtained (YYYY)"
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

            {errors?.root?.message && (
                <FormError message={errors.root.message} />
            )}
        </div>
    );
};