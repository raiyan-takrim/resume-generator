import { UseFormRegister, FieldErrors } from 'react-hook-form';
import InputField from '@/components/input-field';
import { FormError } from '../FormError';
import { motion } from 'framer-motion';
import { resumeFormSchema } from '@/lib/validations/resume';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';

type FormData = z.infer<typeof resumeFormSchema>;

type PersonalDetailsProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>['personalDetails'];
    values: FormData['personalDetails'];
};

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({
    register,
    errors,
    values,
}) => (
    <div className="space-y-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-bold">Personal Details</h2>
            <p className="text-gray-500 mb-4">Please fill in your personal details below.</p>

            <div className="space-y-4">
                <div>
                    <InputField
                        {...register('personalDetails.fullName')}
                        value={values.fullName}
                        placeholder="Full Name"
                    />
                    {errors?.fullName && <FormError message={errors.fullName.message} />}
                </div>

                <div>
                    <InputField
                        {...register('personalDetails.email')}
                        value={values.email}
                        placeholder="Email"
                    />
                    {errors?.email && <FormError message={errors.email.message} />}
                </div>

                <div>
                    <InputField
                        {...register('personalDetails.phone')}
                        value={values.phone}
                        placeholder="Phone"
                    />
                    {errors?.phone && <FormError message={errors.phone.message} />}
                </div>

                <div>
                    <InputField
                        {...register('personalDetails.linkedIn')}
                        value={values.linkedIn}
                        placeholder="LinkedIn URL"
                    />
                    {errors?.linkedIn && <FormError message={errors.linkedIn.message} />}
                </div>

                <div>
                    <InputField
                        {...register('personalDetails.github')}
                        value={values.github}
                        placeholder="GitHub URL"
                    />
                    {errors?.github && <FormError message={errors.github.message} />}
                </div>

                <div>
                    <Textarea
                        {...register('personalDetails.summary')}
                        value={values.summary}
                        placeholder="Professional Summary"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                    />
                    {errors?.summary && <FormError message={errors.summary.message} />}
                </div>
            </div>
        </motion.div>
    </div>
);