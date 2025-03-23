import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '../FormError';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeFormSchema } from '@/lib/validations/resume';
import { z } from 'zod';

type FormData = z.infer<typeof resumeFormSchema>;

type SkillsProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>['skills'];
    values: FormData['skills'];
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export const Skills = ({
    register,
    errors,
    values,
    onAdd,
    onRemove,
}: SkillsProps) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Skills</h2>
                    <p className="text-gray-500 mt-1">Add your professional skills below.</p>
                </div>
                <Button
                    type="button"
                    onClick={onAdd}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Skill
                </Button>
            </div>

            {values.length === 0 && (
                <p className="text-gray-500 p-4 border border-dashed rounded-lg text-center">
                    No skills added yet. Click "Add Skill" to begin.
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
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex-1">
                                <Input
                                    {...register(`skills.${index}`)}
                                    placeholder="Enter a skill (e.g., JavaScript, Project Management, etc.)"
                                    className="w-full"
                                />
                                {errors?.[index] && (
                                    <FormError message={errors[index].message} />
                                )}
                            </div>
                            <Button
                                type="button"
                                onClick={() => onRemove(index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                            </Button>
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