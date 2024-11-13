import React from 'react';
import { Card } from "@/components/ui/card";

interface PrintLayoutProps {
    children: React.ReactNode;
    className?: string;
}

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Convert mm to pixels at 96 DPI (typical screen resolution)
const MM_TO_PX = 3.7795275591;

const PrintLayout = ({ children, className = "" }: PrintLayoutProps) => {
    return (
        <div className="print-layout">
            {/* Screen Preview Container */}
            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden screen-only">
                <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 flex items-center justify-between print:hidden">
                    <span className="text-sm font-medium text-gray-600">A4 Preview</span>
                    <span className="text-xs text-gray-500">{A4_WIDTH_MM}mm × {A4_HEIGHT_MM}mm</span>
                </div>

                <div className="w-full overflow-auto bg-gray-100 p-4 md:p-8 min-h-[calc(100vh-20rem)] print:p-0 print:min-h-0 print:overflow-visible">
                    {/* A4 Page Container */}
                    <div
                        className="mx-auto bg-white shadow-lg print:shadow-none"
                        style={{
                            width: `${A4_WIDTH_MM}mm`,
                            height: `${A4_HEIGHT_MM}mm`,
                            maxWidth: '100%'
                        }}
                    >
                        <Card
                            className={`w-full h-full m-0 rounded-none border-0 print:shadow-none ${className}`}
                        >
                            {children}
                        </Card>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .print-layout {
            width: ${A4_WIDTH_MM}mm;
            height: ${A4_HEIGHT_MM}mm;
            position: relative;
            page-break-after: always;
          }

          .screen-only {
            background: none !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: 0 !important;
          }

          /* Hide non-essential UI elements during print */
          .print:hidden {
            display: none !important;
          }
        }

        /* Screen-only styles */
        @media screen {
          .print-layout {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default PrintLayout;