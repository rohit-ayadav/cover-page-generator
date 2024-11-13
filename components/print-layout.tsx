import React from 'react';
import { Card } from "@/components/ui/card";

interface PrintLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PrintLayout = ({ children, className = "" }: PrintLayoutProps) => {
  return (
    <div className="print-layout">
      {/* Screen Preview Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-auto screen-only">
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 flex items-center justify-between print:hidden">
          <span className="text-sm font-medium text-gray-600">A4 Preview</span>
          <span className="text-xs text-gray-500">210mm × 297mm</span>
        </div>
        
        <div className="p-4 md:p-8 print:p-0">
          {/* Fixed A4 Container */}
          <div className="mx-auto bg-white shadow-lg print:shadow-none a4-page">
            <Card className={`rounded-none border-0 print:shadow-none ${className}`}>
              {children}
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Screen styles */
        @media screen {
          .print-layout {
            width: 100%;
            overflow-x: auto;
          }
          
          .a4-page {
            width: 210mm;
            height: 297mm;
            background: white;
            /* Fixed size - no scaling */
            min-width: 210mm;
            min-height: 297mm;
          }

          /* Enable horizontal scrolling on small screens */
          .screen-only {
            min-width: min-content;
          }
        }

        /* Print styles */
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
          }

          .print-layout {
            width: 210mm;
            height: 297mm;
          }

          .a4-page {
            width: 210mm;
            height: 297mm;
          }

          .screen-only {
            background: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .print\:hidden {
            display: none !important;
          }
        }

        /* Force background printing */
        * {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      `}</style>
    </div>
  );
};

export default PrintLayout;3