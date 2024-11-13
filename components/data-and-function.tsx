
import { GraduationCap, BookOpen, User } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


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
    [key: string]: string | boolean;
}
const STORAGE_KEY = 'projectFormData';

const initialFormData: FormData = {
    studentName: '',
    rollNumber: '',
    semester: '',
    academicYear: '2024-2025',
    facultyName: '',
    designation: '',
    subjectCode: '',
    subjectName: '',
    department: '',
    course: '',
    purpose: 'Project File',
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

const renderProjectDetails = (formData: FormData, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSelectChange: (key: string, value: string) => void) => (
    <div className="space-y-6">
        <CardHeader className="px-4 py-5 md:px-6 md:py-6">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl mb-2">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                Project Details
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-muted-foreground">
                Tell us about your project and faculty
            </CardDescription>
        </CardHeader>

        <CardContent className="px-4 md:px-6">
            <div className="space-y-6">
                {/* Purpose Selection */}
                <div className="space-y-2">
                    <Label className="text-sm md:text-base font-medium">Purpose</Label>
                    <Select
                        value={formData.purpose || ''}
                        onValueChange={(value) => handleSelectChange('purpose', value)}
                    >
                        <SelectTrigger className="h-11 md:h-12 text-sm md:text-base">
                            <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                            {purposes.map((purpose) => (
                                <SelectItem
                                    key={purpose}
                                    value={purpose}
                                    className="text-sm md:text-base"
                                >
                                    {purpose}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Subject Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Subject Code</Label>
                        <Input
                            id="subjectCode"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleChange}
                            placeholder="Enter subject code"
                            className="h-11 md:h-12 text-sm md:text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Subject Name</Label>
                        <Input
                            id="subjectName"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                            placeholder="Enter subject name"
                            className="h-11 md:h-12 text-sm md:text-base"
                        />
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Faculty Information */}
                <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-semibold flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Faculty Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm md:text-base font-medium">
                                Faculty Name
                            </Label>
                            <Input
                                id="facultyName"
                                name="facultyName"
                                value={formData.facultyName}
                                onChange={handleChange}
                                placeholder="Enter faculty name"
                                className="h-11 md:h-12 text-sm md:text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm md:text-base font-medium">
                                Faculty Designation
                            </Label>
                            <Select
                                value={formData.designation || ''}
                                onValueChange={(value) => handleSelectChange('designation', value)}
                            >
                                <SelectTrigger className="h-11 md:h-12 text-sm md:text-base">
                                    <SelectValue placeholder="Select designation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {designations.map((designation) => (
                                        <SelectItem
                                            key={designation}
                                            value={designation}
                                            className="text-sm md:text-base"
                                        >
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

const renderPersonalDetails = (formData: FormData, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSelectChange: (key: string, value: string) => void) => (
    <div className="space-y-6">
        <CardHeader className="px-4 py-5 md:px-6 md:py-6">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl mb-2">
                <User className="w-5 h-5 md:w-6 md:h-6" />
                Personal Details
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-muted-foreground">
                Let's start with your basic information
            </CardDescription>
        </CardHeader>

        <CardContent className="px-4 md:px-6">
            <div className="space-y-6">
                {/* Project Type Selection */}
                <div className="space-y-3">
                    <Label className="text-sm md:text-base font-semibold">Project Type</Label>
                    <RadioGroup
                        defaultValue={formData.projectType}
                        onValueChange={(value) => handleSelectChange('projectType', value)}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        {['Individual', 'Group'].map((type) => (
                            <div key={type} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                                <RadioGroupItem
                                    value={type.toLowerCase()}
                                    id={type.toLowerCase()}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                                <Label
                                    htmlFor={type.toLowerCase()}
                                    className="text-sm md:text-base cursor-pointer"
                                >
                                    {type}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Student Information */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Student Name</Label>
                        <Input
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            placeholder="Enter student name"
                            className="h-11 md:h-12 text-sm md:text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Roll Number</Label>
                        <Input
                            id="rollNumber"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            placeholder="Enter roll number"
                            className="h-11 md:h-12 text-sm md:text-base"
                        />
                    </div>
                </div>

                {/* Course and Department Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Course', options: courses },
                        { label: 'Department', options: departments }
                    ].map(({ label, options }) => (
                        <div key={label} className="space-y-2">
                            <Label className="text-sm md:text-base font-medium">
                                {label}
                            </Label>
                            <Select
                                value={String(formData[label.toLowerCase()] || '')}
                                onValueChange={(value) => handleSelectChange(label.toLowerCase(), value)}
                            >
                                <SelectTrigger className="h-11 md:h-12 text-sm md:text-base">
                                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent className="max-h-[40vh]">
                                    {options.map((option) => (
                                        <SelectItem
                                            key={option}
                                            value={option}
                                            className="text-sm md:text-base"
                                        >
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                {/* Semester and Academic Year */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='space-y-2'>

                        <Label className='text-sm md:text-base font-medium'>Semester</Label>
                        <Select
                            value={formData.semester || ''}
                            onValueChange={(value) => handleSelectChange('semester', value)}
                        >
                            <SelectTrigger className='h-11 md:h-12 text-sm md:text-base'>
                                <SelectValue placeholder='Select semester' />
                            </SelectTrigger>
                            <SelectContent>
                                {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map((semester) => (
                                    <SelectItem
                                        key={semester}
                                        value={semester}
                                        className='text-sm md:text-base'
                                    >
                                        {semester}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                    {/* Academic Year */}
                    <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Academic Year</Label>
                        <Select
                            value={formData.academicYear || ''}
                            onValueChange={(value) => handleSelectChange('academicYear', value)}
                        >
                            <SelectTrigger className="h-11 md:h-12 text-sm md:text-base">
                                <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                                {academicYears.map((year) => (
                                    <SelectItem
                                        key={year}
                                        value={year}
                                        className="text-sm md:text-base"
                                    >
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



export { STORAGE_KEY, initialFormData, academicYears, departments, courses, purposes, designations };
export type { FormData }
export { renderProjectDetails, renderPersonalDetails };
