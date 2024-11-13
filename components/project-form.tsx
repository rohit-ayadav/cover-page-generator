
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import {
    ChevronRight,
    ChevronLeft,
    Save,
    FileSpreadsheet
} from 'lucide-react';
import { STORAGE_KEY, initialFormData } from './data-and-function';
import { FormData } from './data-and-function';
import { renderProjectDetails, renderPersonalDetails } from './data-and-function';
import ErrorBoundary from './ui/error-boundry';
interface ProjectFormProps {
    onSubmit: (data: any) => void;
}

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
        console.log(formData);
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
        const { studentName, rollNumber, semester, department, course } = formData;
        console.log(`studentName: ${studentName}, rollNumber: ${rollNumber}, semester: ${semester}, department: ${department}, course: ${course}`);
        return studentName !== '' && rollNumber !== '' && semester !== '' && department !== '' && course !== '';
    }

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50 p-3 md:p-6">
                <Card className="max-w-4xl mx-auto shadow-lg">
                    <CardHeader className="px-4 py-5 md:px-6 md:py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet className="w-5 h-5 md:w-6 md:h-6" />
                                <h1 className="text-lg md:text-2xl font-bold">
                                    Project Title Page Generator
                                </h1>
                            </div>
                            <span className="text-sm md:text-base text-muted-foreground">
                                Step {currentStep} of 2
                            </span>
                        </div>
                        <Progress value={progress} className="h-2 md:h-3" />
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 ? renderPersonalDetails(formData, handleChange, handleSelectChange)
                            : renderProjectDetails(formData, handleChange, handleSelectChange)}

                        {/* Form Navigation */}

                        <div className="px-4 py-5 md:px-6 md:py-6 border-t">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                <div className="text-sm md:text-base text-muted-foreground order-2 md:order-1">
                                    {progress.toFixed(0)}% completed
                                </div>

                                <div className="flex gap-3 order-1 md:order-2">
                                    {currentStep === 2 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setCurrentStep(1)}
                                            className="flex-1 md:flex-none h-11 md:h-12 text-sm md:text-base"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-2" />
                                            Back
                                        </Button>
                                    )}
                                    <div className="flex gap-3">
                                        {/* an icon to clear the form */}
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setFormData(initialFormData);
                                                setCurrentStep(1);
                                            }}
                                            variant="outline"
                                            className="flex-1 md:flex-none h-11 md:h-12 text-sm md:text-base"
                                        >
                                            Clear Form
                                        </Button>


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
                                                className="flex-1 md:flex-none h-11 md:h-12 text-sm md:text-base"
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                onClick={() => {
                                                    formData.tick = true;
                                                }}
                                                className="flex-1 md:flex-none h-11 md:h-12 text-sm md:text-base"
                                            >
                                                Generate Title Page
                                                <Save className="w-4 h-4 ml-2" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </ErrorBoundary >
    );
}