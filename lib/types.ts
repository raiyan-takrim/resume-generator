export type Experience = {
    company: string;
    role: string;
    duration: string;
    description: string;
};

export type Education = {
    institution: string;
    degree: string;
    year: string;
};

export type Project = {
    title: string;
    description: string;
    duration: string;
};

export type Certification = {
    name: string;
    year: string;
};

export type InputFieldProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
};

export type RemoveButtonProps = {
    onClick: () => void;
};

export type DynamicSectionProps<T> = {
    items: T[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    children: (index: number) => React.ReactNode;
};