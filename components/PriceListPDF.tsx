
import React from 'react';
import { TEST_PACKAGES, NORMAL_RANGES } from '../constants';
import { Microscope, Printer, Download } from 'lucide-react';

export const PriceListPDF: React.FC = () => {
  const categories = Array.from(new Set(TEST_PACKAGES.map(t => t.category)));

  return (
    <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-5xl mx-auto my-8 print:shadow-none print:border-none print:m-0 print:p-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b-4 border-blue-600 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Microscope className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-none">Sri Venkateswara</h1>
            <p className="text-xl font-bold text-blue-600">Diagnostic Centre & LIS</p>
            <p className="text-xs text-slate-500 font-bold mt-1 tracking-widest uppercase">Comprehensive Test Menu & Fee Schedule 2024-25</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">NABL Accredited</p>
          <p className="text-xs font-mono text-slate-500">ID: MC-1102</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-10">
        {categories.map(cat => (
          <div key={cat} className="break-inside-avoid">
            <h2 className="text-lg font-black text-white bg-slate-800 dark:bg-slate-950 px-4 py-2 rounded-lg mb-4 uppercase tracking-widest shadow-sm">
              {cat}
            </h2>
            <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-950 text-[10px] font-black uppercase text-slate-500 border-b dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3 w-1/3">Test Name / Parameters</th>
                    <th className="px-6 py-3">Biological Ref Range</th>
                    <th className="px-6 py-3 text-right">Price (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {TEST_PACKAGES.filter(t => t.category === cat).map(test => (
                    <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 dark:text-white">{test.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {test.parameters.map(p => (
                            <span key={p} className="text-[9px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/30">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {test.parameters.map(p => (
                            <div key={p} className="flex justify-between text-[10px] text-slate-500">
                              <span className="font-medium">{p}:</span>
                              <span className="font-mono text-slate-400">{NORMAL_RANGES[p]?.range || 'N/A'} {NORMAL_RANGES[p]?.unit}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white">
                        ₹{test.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold tracking-widest">
        <p>© 2024 Sri Venkateswara Diagnostic Centre • All Prices Inclusive of GST</p>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-center gap-4 print:hidden">
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
        >
          <Printer className="w-4 h-4" />
          PRINT MASTER CATALOG
        </button>
      </div>
    </div>
  );
};
