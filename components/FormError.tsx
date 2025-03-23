import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

type FormErrorProps = {
    message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-500 text-sm mt-1"
            >
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
            </motion.div>
        </AnimatePresence>
    );
}; 