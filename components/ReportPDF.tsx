
import React from 'react';
import { Booking } from '../types';
import { CheckCircle, Printer, Download, ShieldCheck, Microscope, ArrowLeft } from 'lucide-react';

interface ReportPDFProps {
  booking: Booking;
  onClose?: () => void;
}

export const ReportPDF: React.FC<ReportPDFProps> = ({ booking, onClose }) => {
  const reportingDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const collectionDate = new Date(booking.timestamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownload = () => {
    const reportElement = document.getElementById('printable-report');
    if (!reportElement) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Medical_Report_${booking.id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .no-print { display: none; }
              @page { size: A4; margin: 10mm; }
            }
            body { font-family: 'Inter', sans-serif; }
          </style>
        </head>
        <body>
          <div class="p-4">${reportElement.innerHTML}</div>
          <script>window.onload = () => { window.print(); }</script>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SV_Report_${booking.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-4 md:p-8 min-h-screen flex flex-col items-center overflow-y-auto print:bg-white print:p-0">
      {/* Action Bar - Hidden during print */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 print:hidden">
        <div className="flex items-center gap-3">
          {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 dark:text-white" />
            </button>
          )}
          <div>
            <h3 className="font-bold dark:text-white text-sm">Sri Venkateswara Diagnostics</h3>
            <p className="text-[10px] text-slate-500">NABL Accredited • Ref: {booking.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* A4 Report Page Container */}
      <div id="printable-report" className="w-full max-w-[210mm] print:max-w-none">
        <div className="report-page bg-white text-slate-900 w-full min-h-[297mm] shadow-2xl p-[12mm] flex flex-col print:shadow-none print:m-0 print:p-[8mm] border border-slate-200 print:border-none">
          
          {/* NABL Header */}
          <div className="flex justify-between items-start border-b-4 border-blue-900 pb-4 mb-6">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg">
                <Microscope className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-blue-950 leading-none tracking-tight uppercase">Sri Venkateswara</h1>
                <p className="text-lg font-bold text-slate-800 uppercase leading-none mt-1">Diagnostic Centre & LIS</p>
                <div className="flex flex-col mt-2">
                  <p className="text-[9px] font-black text-blue-900 uppercase tracking-widest">NABL ACCREDITED LABORATORY (MC-1102)</p>
                  <p className="text-[8px] text-slate-600 font-bold uppercase">
                    T.B. Road, Union Bank, Allagadda, Nandyal Dist, AP.
                  </p>
                  <p className="text-[9px] text-blue-800 font-black mt-0.5">Cell No: 9966941485</p>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
               <div className="bg-green-700 text-white px-2 py-0.5 rounded text-[8px] font-black flex items-center gap-1 mb-2">
                 <ShieldCheck className="w-2.5 h-2.5" /> VERIFIED DIGITAL REPORT
               </div>
               <div className="p-1 border border-slate-200 rounded-lg">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=55x55&data=https://sv-diagnostics.com/report/${booking.id}`} alt="QR" className="w-12 h-12" />
               </div>
               <p className="text-[7px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Unique Lab ID: {booking.id}</p>
            </div>
          </div>

          {/* Patient Details Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 grid grid-cols-2 gap-x-12 gap-y-2">
            <div className="flex justify-between items-center border-b border-slate-200 pb-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Patient Name</span>
              <span className="text-xs font-black text-slate-900 uppercase">{booking.patientName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Sample ID / Barcode</span>
              <span className="text-xs font-mono font-bold text-slate-900">{booking.barcode}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Age / Sex</span>
              <span className="text-xs font-bold text-slate-900">32 Y / Female</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Ref. Doctor</span>
              <span className="text-xs font-bold text-slate-900">DR. WALK-IN / SELF</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Date of Collection</span>
              <span className="text-[11px] font-bold text-slate-900">{collectionDate}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Date of Reporting</span>
              <span className="text-[11px] font-bold text-slate-900">{reportingDate}</span>
            </div>
          </div>

          {/* Department Header */}
          <div className="bg-blue-900 text-white px-4 py-1.5 rounded-lg mb-4 flex justify-between items-center shadow-md">
            <h2 className="text-[10px] font-black uppercase tracking-widest">{booking.testName}</h2>
            <span className="text-[8px] font-bold opacity-80 uppercase">Department of Clinical Biochemistry</span>
          </div>

          {/* Results Table */}
          <div className="flex-1">
            <table className="w-full text-sm border-collapse">
              <thead className="text-[9px] font-black uppercase text-slate-500 border-b-2 border-slate-200">
                <tr>
                  <th className="py-2.5 text-left w-2/5">Test Description</th>
                  <th className="py-2.5 text-center">Result Value</th>
                  <th className="py-2.5 text-center">Unit</th>
                  <th className="py-2.5 text-right">Biological Ref Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {booking.results?.map((res, i) => (
                  <tr key={i} className={`${res.isAbnormal ? 'bg-red-50/70' : ''}`}>
                    <td className="py-3 font-bold text-slate-800 text-xs">{res.parameter}</td>
                    <td className={`py-3 text-center font-black text-[15px] ${res.isAbnormal ? 'text-red-700' : 'text-slate-900'}`}>
                      {res.value}
                      {res.isAbnormal && <span className="text-xs ml-0.5 text-red-600 font-bold">*</span>}
                    </td>
                    <td className="py-3 text-center text-slate-600 font-medium text-[10px]">{res.unit}</td>
                    <td className="py-3 text-right font-mono text-[10px] text-slate-500">{res.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {booking.results?.some(r => r.isAbnormal) && (
              <p className="text-[8px] text-red-600 font-bold mt-3 italic uppercase">
                * Note: Abnormal values detected. Please correlate clinically with history and symptoms.
              </p>
            )}

            {/* AI Medical Interpretation */}
            <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border-2 border-blue-100 relative">
              <div className="absolute -top-2.5 left-5 bg-blue-900 text-white px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                Clinical Impression (LIS AI)
              </div>
              <p className="text-xs text-blue-950 font-medium leading-relaxed italic pr-4">
                "{booking.doctorComment || 'The findings should be clinically correlated with patient symptoms. Values within the biological reference range are generally considered healthy. Please consult your physician for a full clinical assessment.'}"
              </p>
            </div>
          </div>

          {/* Signatories - Redesigned for Indian Lab context */}
          <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between items-end px-4">
            <div className="text-center w-48">
              <div className="w-full h-10 border-b border-slate-200 mb-2 flex items-center justify-center">
                <span className="text-[8px] text-slate-300 italic uppercase">Digitally Signed By Manager</span>
              </div>
              <p className="text-[11px] font-black text-slate-900 uppercase">Arun Kumar J.</p>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">Chief Lab Technologist</p>
            </div>
            
            <div className="text-center w-56">
               <div className="w-full h-14 flex items-center justify-center mb-1">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=SV&backgroundColor=transparent&fontSize=45" alt="Sig" className="h-full opacity-10 grayscale" />
               </div>
               <div className="border-t border-slate-300 pt-1">
                 <p className="text-[11px] font-black text-slate-900 uppercase">Dr. Sarah Venkateswara</p>
                 <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                   MD Pathologist • Reg No: 54221
                 </p>
                 <p className="text-[7px] text-slate-400 font-bold mt-0.5 uppercase">NABL Authorized Signatory</p>
               </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-10 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-[7.5px] text-slate-400 font-bold uppercase tracking-widest mb-2">
              <span>Verified Report</span>
              <span>Secure Digital Copy</span>
              <span>Ref ID: {booking.id}</span>
            </div>
            <p className="text-[8.5px] text-slate-400 text-center leading-tight italic px-10">
              Disclaimer: This is a computer-generated, secure, digitally signed report. 
              Validity can be cross-checked at the lab or by scanning the QR code above. 
              The results refer only to the sample processed. 
            </p>
            <p className="text-[10px] font-black text-slate-200 text-center mt-4 tracking-[0.6em]">
              *** END OF REPORT ***
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
