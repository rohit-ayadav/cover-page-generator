"use client";
import React, { useState } from 'react';
import { ProjectForm } from '@/components/project-form';
import TitlePage from '@/components/title-page';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, FileText, Download, CheckCircle } from 'lucide-react';

interface FormData {
  studentName: string;
  rollNumber: string;
  semester: string;
  academicYear: string;
  facultyName: string;
  designation: string;
  subjectCode: string;
  subjectName: string;
  department?: string;
  course?: string;
  purpose?: string
  tick: boolean;
}


export default function Home() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (data: FormData) => {
    if (data.tick === false) {
      return;
    }
    setFormData(data);
  };

  const isValid = (data: FormData | null): data is FormData => {

    console.log("DATA at Home", data);
    return data !== null && Object.values(data).every((value) => value !== "") && data.tick;
  }
  const handleDownload = async () => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById('title-page');
      const opt = {
        margin: 0,
        filename: `{formData.studentName} - {formData.subjectName} - Title Page.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().set(opt).from(element).save();
    }
  };

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Professional Format",
      description: "Generate professionally formatted title pages that comply with academic standards"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Easy to Use",
      description: "Simple form-based interface to input your project details"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Instant PDF",
      description: "Download your title page instantly in high-quality PDF format"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Print Ready",
      description: "Optimized for perfect printing with proper margins and spacing"
    }
  ];

  if (isValid(formData)) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto">
          <div className="space-y-4">
            <TitlePage data={formData} />
            <div className="flex justify-center gap-4">
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => {
                setFormData(null);
                setShowForm(true);
                formData.tick = false;
              }
              }>
                Create Another
              </Button>
            </div>
          </div>
        </div>
      </div >
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {!showForm ? (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Project Title Page Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create professional, print-ready project title pages for your academic submissions
              in just a few clicks. Designed specifically for GITM students.
            </p>
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="text-lg px-8"
            >
              Get Started
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Fill in Your Details</h3>
                  <p className="text-gray-600">Enter your project information, including student details, subject information, and faculty details.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Preview Your Title Page</h3>
                  <p className="text-gray-600">Review the generated title page to ensure all information is correct and properly formatted.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Download and Print</h3>
                  <p className="text-gray-600">Download your title page as a PDF and print it for your project submission.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <ProjectForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}