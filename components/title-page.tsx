import React from 'react';
import { Separator } from "@/components/ui/separator";
import PrintLayout from './print-layout';

interface TitlePageProps {
  data: {
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
    purpose?: string;
    tick: boolean;
  };
}

export default function TitlePage({ data }: TitlePageProps) {
  const calculateYearFromSemester = (semester: string) => {
    const romanToNumber: { [key: string]: number } = {
      I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8,
    };
    const sem = romanToNumber[semester];

    if (sem === 1 || sem === 2) return "FIRST YEAR";
    if (sem === 3 || sem === 4) return "SECOND YEAR";
    if (sem === 5 || sem === 6) return "THIRD YEAR";
    if (sem === 7 || sem === 8) return "FOURTH YEAR";
    return "";
  }

  return (
    <PrintLayout>
      <div className="p-16" id="title-page">
        <div className="flex flex-col items-center justify-between h-full border-8 border-double p-8">
          {/* Header Section */}
          <div className="text-center space-y-6 w-full">
            <div className="flex items-center justify-center gap-6">
              <img
                src="/institute-logo.png"
                alt="Institution Logo"
                className="w-20 h-20"
              />
              <div>
                <h1 className="text-3xl font-bold tracking-wide text-gray-900">
                  GOEL INSTITUTE OF TECHNOLOGY AND MANAGEMENT
                </h1>
                <p className="text-sm font-medium text-gray-600 mt-1">
                  (Approved by AICTE, New Delhi & Affiliated to AKTU, Lucknow)
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-2xl font-semibold text-gray-800">
              DEPARTMENT OF {data.department}
            </h2>
            <h3 className="text-xl font-medium text-gray-700">
              Session: {data.academicYear}
            </h3>
          </div>

          {/* Middle Section */}
          <div className="text-center space-y-8 flex-grow flex flex-col justify-center my-12">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{data.course}</p>
              <p className="text-xl font-semibold text-gray-700">
                {calculateYearFromSemester(data.semester)} (Semester - {data.semester})
              </p>
            </div>

            <div className="my-16 space-y-4">
              <p className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 inline-block">
                {data.purpose}
              </p>
              <p className="text-lg font-medium text-gray-600">on</p>
              <p className="text-3xl font-bold text-gray-900 mt-4">
                {data.subjectName.toUpperCase()}
              </p>
              <p className="text-xl font-semibold text-gray-700">
                ({data.subjectCode.toUpperCase()})
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full mt-8 grid grid-cols-2 gap-24">
            {/* Left side - Student details */}
            <div className="space-y-4">
              <p className="font-bold text-lg text-gray-900 border-b pb-1">
                Submitted By:
              </p>
              <div className="space-y-2 pl-4">
                <p className="font-medium">
                  Name: <span className="font-normal">{data.studentName.toUpperCase()}</span>
                </p>
                <p className="font-medium">
                  Roll No: <span className="font-normal">{data.rollNumber}</span>
                </p>
              </div>
            </div>

            {/* Right side - Faculty details */}
            <div className="space-y-4">
              <p className="font-bold text-lg text-gray-900 border-b pb-1">
                Submitted To:
              </p>
              <div className="space-y-2 pl-4">
                <p className="font-medium">
                  Name: <span className="font-normal">{data.facultyName.toUpperCase()}</span>
                </p>
                <p className="font-medium">
                  Designation: <span className="font-normal">{data.designation}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrintLayout>
  );
}