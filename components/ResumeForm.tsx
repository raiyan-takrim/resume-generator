"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Experience = {
    company: string;
    role: string;
    duration: string;
};

type Education = {
    institution: string;
    degree: string;
    year: string;
};

export default function ResumeForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    const handleAddExperience = () => {
        setExperiences([...experiences, { company: '', role: '', duration: '' }]);
    };

    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    const handleAddEducation = () => {
        setEducation([...education, { institution: '', degree: '', year: '' }]);
    };

    const handleEducationChange = (index: number, field: keyof Education, value: string) => {
        const updatedEducation = [...education];
        updatedEducation[index][field] = value;
        setEducation(updatedEducation);
    };

    const handleAddSkill = () => {
        setSkills([...skills, '']);
    };

    const handleSkillChange = (index: number, value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            fullName,
            email,
            experiences,
            education,
            skills,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

            <h2>Experience</h2>
            {experiences.map((exp, index) => (
                <div key={index} className="space-y-2">
                    <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    />
                    <Input
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    />
                    <Input
                        placeholder="Duration"
                        value={exp.duration}
                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    />
                </div>
            ))}
            <Button type="button" onClick={handleAddExperience}>
                Add Experience
            </Button>

            <h2>Education</h2>
            {education.map((edu, index) => (
                <div key={index} className="space-y-2">
                    <Input
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                    <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                    <Input
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    />
                </div>
            ))}
            <Button type="button" onClick={handleAddEducation}>
                Add Education
            </Button>

            <h2>Skills</h2>
            {skills.map((skill, index) => (
                <Input
                    key={index}
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                />
            ))}
            <Button type="button" onClick={handleAddSkill}>
                Add Skill
            </Button>

            <Button type="submit">Submit</Button>
        </form>
    );
}
