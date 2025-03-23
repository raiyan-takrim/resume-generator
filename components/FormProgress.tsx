import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type FormProgressProps = {
    steps: readonly string[];
    currentStep: number;
    validSteps: number[];
};

export const FormProgress = ({ steps, currentStep, validSteps }: FormProgressProps) => {
    return (
        <div className="w-full py-4">
            <div className="flex justify-between items-center relative">
                {steps.map((step, index) => {
                    const isCompleted = validSteps.includes(index);
                    const isCurrent = currentStep === index;

                    return (
                        <div key={step} className="flex flex-col items-center relative z-10">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isCompleted ? '#22c55e' : isCurrent ? '#3b82f6' : '#e5e7eb',
                                }}
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4 text-white" />
                                ) : (
                                    <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
                                        {index + 1}
                                    </span>
                                )}
                            </motion.div>
                            <span className="text-xs mt-2 text-gray-600">{step}</span>
                        </div>
                    );
                })}

                {/* Progress line */}
                <div className="absolute top-4 left-0 h-[2px] bg-gray-200 w-full -z-10" />
                <motion.div
                    className="absolute top-4 left-0 h-[2px] bg-blue-500 -z-10"
                    initial={false}
                    animate={{
                        width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
}; 