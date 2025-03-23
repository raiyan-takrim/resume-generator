import { UseFormRegister, FieldErrors } from 'react-hook-form';
import DynamicSection from "../dynamic-selection";
import InputField from "../input-field";
import { FormError } from '../FormError';
import { motion } from 'framer-motion';
import { resumeFormSchema } from '@/lib/validations/resume';
import { z } from 'zod';

type FormData = z.infer<typeof resumeFormSchema>;

type LanguagesProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>['languages'];
    values: FormData['languages'];
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export const Languages: React.FC<LanguagesProps> = ({
    register,
    errors,
    values,
    onAdd,
    onRemove,
}) => (
    <div className="space-y-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-bold">Languages</h2>
            <p className="text-gray-500 mb-4">Add the languages you speak below.</p>

            {values.length === 0 && (
                <p className="text-gray-500 mb-4">No languages added yet.</p>
            )}

            <DynamicSection
                items={values}
                onAdd={onAdd}
                onRemove={onRemove}
            >
                {(index) => (
                    <div key={index} className="space-y-2">
                        <InputField
                            {...register(`languages.${index}`)}
                            value={values[index]}
                            placeholder="Language"
                        />
                        {errors?.[index] && (
                            <FormError message={errors[index].message} />
                        )}
                    </div>
                )}
            </DynamicSection>
        </motion.div>
    </div>
);