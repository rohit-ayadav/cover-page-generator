//Source: app/page.tsx

"use client";
import React, { useState } from 'react';
import { ProjectForm } from '@/components/project-form';
import TitlePage from '@/components/title-page';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, FileText, Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FormData } from '@/components/data-and-function';
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const MM_TO_PX = 3.7795275591;

  const handleFormSubmit = (data: FormData) => {
    if (data.tick === false) {
      return;
    }
    setFormData(data);
  };

  const isValid = (data: FormData | null): data is FormData => {
    return data !== null && Object.values(data).every((value) => value !== "") && data.tick;
  }

  const handleDownload = async () => {

    if (typeof window !== 'undefined') {
      try {
        setIsDownloading(true);
        const element = document.getElementById('title-page');
        if (!element) {
          toast.error('Error generating PDF: Element not found');
          return;
        }

        const opt = {
          filename: `${formData?.studentName} - ${formData?.subjectName} - Title Page.pdf`,
          image: { type: 'jpeg', quality: 1 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            width: 210 * MM_TO_PX, // A4 width in pixels
            height: 297 * MM_TO_PX // A4 height in pixels
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          }
        };
        const html2pdf = (await import('html2pdf.js')).default;
        toast.promise(
          html2pdf().set(opt).from(element).save(),
          {
            loading: 'Generating PDF...',
            success: 'PDF generated successfully',
            error: 'Error generating PDF'
          }
        );
        if (html2pdf !== undefined) {
          await html2pdf().set(opt).from(element).save();
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
        if (error instanceof Error) {
          toast.error('Error generating PDF: ' + error.message);
        } else {
          toast.error('Error generating PDF: An unknown error occurred');
        }
      } finally {
        setIsDownloading(false);
      }
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
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">

        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => {
              setFormData(null);
              setShowForm(true);
            }}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-primary/5 border-b">
                <h2 className="text-xl md:text-2xl font-semibold text-center">
                  Preview Your Title Page
                </h2>
              </div>

              <div className="max-w-[800px] mx-auto p-4">
                <div className="bg-white shadow-sm border rounded-lg">
                  <TitlePage data={formData} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(null);
                  setShowForm(true);
                }}
                className="w-full sm:w-auto"
              >
                Create Another
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff'
          }
        }}
      />
      {!showForm ? (
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Project Title Page Generator
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Create professional, print-ready project title pages for your academic submissions
              in just a few clicks. Designed specifically for GITM students.
            </p>
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="text-lg px-6 md:px-8 w-full sm:w-auto"
            >
              Get Started
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="text-primary mb-3 md:mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
              How It Works
            </h2>
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  title: "Fill in Your Details",
                  description: "Enter your project information, including student details, subject information, and faculty details."
                },
                {
                  title: "Preview Your Title Page",
                  description: "Review the generated title page to ensure all information is correct and properly formatted."
                },
                {
                  title: "Download and Print",
                  description: "Download your title page as a PDF and print it for your project submission."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <ProjectForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}