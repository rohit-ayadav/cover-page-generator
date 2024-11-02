"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    ChevronRight,
    ChevronLeft,
    User,
    BookOpen,
    Save,
    GraduationCap,
    Building2,
    FileSpreadsheet
} from 'lucide-react';

interface ProjectFormProps {
    onSubmit: (data: any) => void;
}

interface FormData {
    studentName: string;
    rollNumber: string;
    semester: string;
    academicYear: string;
    facultyName: string;
    designation: string;
    subjectCode: string;
    subjectName: string;
    department: string;
    course: string;
    purpose: string;
    projectType: string;
    tick: boolean;
}

const STORAGE_KEY = 'projectFormData';

const initialFormData: FormData = {
    studentName: '',
    rollNumber: '',
    semester: '',
    academicYear: '',
    facultyName: '',
    designation: '',
    subjectCode: '',
    subjectName: '',
    department: '',
    course: '',
    purpose: '',
    projectType: 'individual',
    tick: false,
};

const currentYear = new Date().getFullYear();
const academicYears = [
    `${currentYear - 1}-${currentYear}`,
    `${currentYear}-${currentYear + 1}`,
    `${currentYear + 1}-${currentYear + 2}`,
];

const departments = [
    'COMPUTER SCIENCE AND ENGINEERING',
    'COMPUTER SCIENCE AND ENGINEERING (AI & ML)',
    'INFORMATION TECHNOLOGY',
    'ELECTRONICS AND COMMUNICATION ENGINEERING',
    'MECHANICAL ENGINEERING',
    'CIVIL ENGINEERING',
    'ELECTRICAL ENGINEERING',
    'APPLIED SCIENCE AND HUMANITIES'
];

const courses = [
    'BACHELOR OF TECHNOLOGY',
    'MASTER OF TECHNOLOGY',
    'MASTER OF BUSINESS ADMINISTRATION',
    'BACHELOR OF COMPUTER APPLICATION',
    'BACHELOR OF BUSINESS ADMINISTRATION',
    'BACHELOR OF SCIENCE'

];

const purposes = [
    'Project File',
    'Lab Manual',
    'Assignment',
    'Research Paper',
    'Technical Report'
];

const designations = [
    'Assistant Professor',
    'Associate Professor',
    'Professor',
    'Head of Department',
];

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    return JSON.parse(savedData);
                } catch (e) {
                    console.error('Error parsing saved form data:', e);
                }
            }
        }
        return initialFormData;
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined' && formData !== initialFormData) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }
    }, [formData]);

    useEffect(() => {

        const totalFields = Object.keys(formData).length - 1;
        const filledFields = Object.entries(formData).filter(([key, value]) =>
            key !== 'tick' && value !== ''
        ).length;
        setProgress((filledFields / totalFields) * 100);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const isStepOneValid = () => {
        return formData.studentName &&
            formData.rollNumber &&
            formData.semester &&
            formData.academicYear &&
            formData.department &&
            formData.course;
    };

    const renderPersonalDetails = () => (
        <div className="space-y-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="w-6 h-6" />
                    Personal Details
                </CardTitle>
                <CardDescription className="text-lg">
                    Let's start with your basic information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-8">
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">Project Type</Label>
                        <RadioGroup
                            defaultValue={formData.projectType}
                            onValueChange={(value: string) => handleSelectChange('projectType', value)}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="individual" id="individual" />
                                <Label htmlFor="individual">Individual</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="group" id="group" />
                                <Label htmlFor="group">Group</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="studentName" className="text-lg">Student Name</Label>
                        <Input
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            autoComplete='on'
                            placeholder="Enter your full name"
                            className="p-6 text-lg"
                        />
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="rollNumber" className="text-lg">Roll Number</Label>
                        <Input
                            id="rollNumber"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            placeholder="Enter your roll number"
                            className="p-6 text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-4">
                            <Label htmlFor="course" className="text-lg">Course</Label>
                            <Select
                                value={formData.course}
                                onValueChange={(value: string) => handleSelectChange('course', value)}
                            >
                                <SelectTrigger className="p-6 text-lg">
                                    <SelectValue placeholder="Select course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course} value={course}>
                                            {course}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="department" className="text-lg">Department</Label>
                            <Select
                                value={formData.department}
                                onValueChange={(value: string) => handleSelectChange('department', value)}
                            >
                                <SelectTrigger className="p-6 text-lg">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-4">
                            <Label htmlFor="semester" className="text-lg">Semester</Label>
                            <Select
                                value={formData.semester}
                                onValueChange={(value: string) => handleSelectChange('semester', value)}
                            >
                                <SelectTrigger className="p-6 text-lg">
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map((sem) => (
                                        <SelectItem key={sem} value={sem}>
                                            {sem}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="academicYear" className="text-lg">Academic Year</Label>
                            <Select
                                value={formData.academicYear}
                                onValueChange={(value: string) => handleSelectChange('academicYear', value)}
                            >
                                <SelectTrigger className="p-6 text-lg">
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {academicYears.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    );

    const renderProjectDetails = () => (
        <div className="space-y-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <BookOpen className="w-6 h-6" />
                    Project Details
                </CardTitle>
                <CardDescription className="text-lg">
                    Tell us about your project and faculty
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-8">
                    <div className="grid gap-4">
                        <Label htmlFor="purpose" className="text-lg">Purpose</Label>
                        <Select
                            value={formData.purpose}
                            onValueChange={(value: string) => handleSelectChange('purpose', value)}
                        >
                            <SelectTrigger className="p-6 text-lg">
                                <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                                {purposes.map((purpose) => (
                                    <SelectItem key={purpose} value={purpose}>
                                        {purpose}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-4">
                            <Label htmlFor="subjectName" className="text-lg">Subject Name</Label>
                            <Input
                                id="subjectName"
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={handleChange}
                                placeholder="Enter subject name"
                                className="p-6 text-lg"
                            />
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="subjectCode" className="text-lg">Subject Code</Label>
                            <Input
                                id="subjectCode"
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleChange}
                                placeholder="Enter subject code"
                                className="p-6 text-lg"
                            />
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Faculty Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="grid gap-4">
                                <Label htmlFor="facultyName" className="text-lg">Faculty Name</Label>
                                <Input
                                    id="facultyName"
                                    name="facultyName"
                                    value={formData.facultyName}
                                    onChange={handleChange}
                                    placeholder="Enter faculty name"
                                    className="p-6 text-lg"
                                />
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="designation" className="text-lg">Faculty Designation</Label>
                                <Select
                                    value={formData.designation}
                                    onValueChange={(value: string) => handleSelectChange('designation', value)}
                                >
                                    <SelectTrigger className="p-6 text-lg">
                                        <SelectValue placeholder="Select designation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {designations.map((designation) => (
                                            <SelectItem key={designation} value={designation}>
                                                {designation}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <FileSpreadsheet className="w-6 h-6" />
                            <span className="text-xl font-bold">Project Title Page Generator</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Step {currentStep} of 2</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 ? renderPersonalDetails() : renderProjectDetails()}

                    <div className="p-6 border-t flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                            {progress.toFixed(0)}% completed
                        </div>

                        <div className="flex gap-4">
                            {currentStep === 2 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setCurrentStep(1)}
                                    className="flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </Button>
                            )}

                            {currentStep === 1 ? (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        if (isStepOneValid()) {
                                            setCurrentStep(2);
                                            formData.tick = false;
                                        }
                                    }}
                                    disabled={!isStepOneValid()}
                                    className="flex items-center gap-2"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        formData.tick = true;
                                    }}
                                    className="flex items-center gap-2"
                                    disabled={!formData.facultyName || !formData.designation || !formData.subjectCode || !formData.subjectName || !formData.purpose}
                                >
                                    <Save className="w-4 h-4" /> Generate Title Page
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ProjectForm;