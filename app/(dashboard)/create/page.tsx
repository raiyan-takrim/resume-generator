import ResumeForm from '@/components/ResumeForm';

export default function CreatePage() {
    return (
        <main className="flex flex-col h-[calc(100vh-theme(spacing.16)-theme(spacing.16))]">
            <div className="flex-none px-6 py-4 bg-white border-b">
                <h1 className="text-2xl font-bold">Create Resume</h1>
                <p className="text-gray-500 mt-1">Fill in your details to generate your resume</p>
            </div>
            <div className="flex-1 overflow-hidden">
                <ResumeForm />
            </div>
        </main>
    );
} 