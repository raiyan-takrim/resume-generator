import React, { forwardRef } from 'react';
import { Input } from './ui/input';

type InputFieldProps = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    type?: string;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ value, onChange, placeholder, required = false, type = 'text', className = '', ...props }, ref) => (
        <Input
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            type={type}
            className={className}
            {...props}
        />
    )
);

InputField.displayName = 'InputField';

export default InputField;