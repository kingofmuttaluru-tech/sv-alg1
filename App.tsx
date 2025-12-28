
import React, { useState, useEffect } from 'react';
import { 
  UserRole, 
  Booking, 
  BookingStatus, 
  LabResult,
  CollectionType,
  PaymentMethod
} from './types';
import { 
  TEST_PACKAGES, 
  MOCK_BOOKINGS_INITIAL,
  NORMAL_RANGES
} from './constants';
import { 
  Search, 
  Bell, 
  LayoutDashboard, 
  Clock, 
  MapPin, 
  User, 
  Package, 
  ChevronRight,
  Microscope,
  Calendar,
  Phone,
  Scan,
  CheckCircle2,
  XCircle,
  BarChart3,
  UserCheck,
  Truck,
  Beaker,
  FlaskConical,
  Moon,
  Sun,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Navigation,
  ArrowRight,
  LogOut,
  FileText,
  Filter,
  Plus,
  Table as TableIcon,
  Printer
} from 'lucide-react';
import { StatusStepper } from './components/StatusStepper';
import { ReportPDF } from './components/ReportPDF';
import { PriceListPDF } from './components/PriceListPDF';
import { analyzeLabResults } from './services/geminiService';

export default function App() {
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS_INITIAL);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPriceList, setShowPriceList] = useState(false);
  const [activeReport, setActiveReport] = useState<Booking | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sv_bookings');
    if (saved) setBookings(JSON.parse(saved));
    const auth = localStorage.getItem('sv_auth');
    if (auth) {
      const { phone, role: savedRole } = JSON.parse(auth);
      setUserPhone(phone);
      setRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sv_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (phone: string) => {
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    setIsLoggedIn(true);
    localStorage.setItem('sv_auth', JSON.stringify({ phone, role }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    localStorage.removeItem('sv_auth');
  };

  const updateBookingStatus = (id: string, status: BookingStatus, extraData: Partial<Booking> = {}) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, status, ...extraData } : b
    ));
    setNotifications(prev => [`Update: ${id} is now ${status.replace('_', ' ')}`, ...prev]);
  };

  const createBooking = (bookingData: Partial<Booking>) => {
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 8999)}`,
      patientName: 'Jane Smith',
      patientPhone: userPhone || '+91 90000 11223',
      testName: bookingData.testName!,
      testPrice: bookingData.testPrice!,
      address: bookingData.address || 'Apt 402, Skyline Towers, Mumbai',
      type: bookingData.type || 'HOME',
      paymentMethod: bookingData.paymentMethod || 'UPI',
      paymentStatus: 'COMPLETED',
      status: BookingStatus.BOOKED,
      timestamp: new Date().toISOString(),
      barcode: `SV-${Math.floor(10000 + Math.random() * 89999)}`,
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking.id;
  };

  if (activeReport) {
    return (
      <div className="fixed inset-0 z-[100] animate-in slide-in-from-bottom duration-300">
        <ReportPDF booking={activeReport} onClose={() => setActiveReport(null)} />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20">
              <Microscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 text-center leading-tight">Sri Venkateswara Diagnostic Centre</h1>
            <p className="text-slate-500 dark:text-slate-400 text-center mt-2">NABL Accredited Diagnostics & LIS</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Mobile Number</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="tel" 
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="98765 43210" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 dark:text-white text-lg font-medium"
                />
              </div>
            </div>

            {otpSent && (
              <div className="animate-in slide-in-from-top duration-300">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Verification OTP</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength={1}
                      className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-center text-xl font-bold dark:text-white"
                      defaultValue={i}
                    />
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => handleLogin(userPhone)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              {otpSent ? 'Login' : 'Get OTP'}
            </button>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
               <p className="text-xs font-bold text-slate-400 uppercase text-center mb-4">Demo Roles Selection</p>
               <div className="grid grid-cols-2 gap-2">
                 {Object.values(UserRole).map(r => (
                   <button 
                     key={r}
                     onClick={() => setRole(r)}
                     className={`text-[10px] font-bold py-2 rounded-lg border uppercase tracking-wider ${role === r ? 'bg-slate-800 text-white border-slate-800' : 'bg-transparent border-slate-200 text-slate-500'}`}
                   >
                     {r.replace('_', ' ')}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <aside className="w-full md:w-64 bg-slate-900 dark:bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800 print:hidden">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Microscope className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight">Sri Venkateswara</h1>
          </div>

          <nav className="space-y-1">
            <RoleNavItem onClick={() => { setShowPriceList(false); setActiveReport(null); }} icon={<LayoutDashboard />} label="Dashboard" active={!showPriceList} />
            <RoleNavItem onClick={() => { setShowPriceList(true); setActiveReport(null); }} icon={<TableIcon />} label="Price List" active={showPriceList} />
            <RoleNavItem icon={<Bell />} label="Updates" count={notifications.length} />
            <RoleNavItem icon={<User />} label="Settings" />
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-slate-800 text-slate-300 mb-2">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="font-medium">Theme</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-red-900/20 text-red-400">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto print:p-0">
        <header className="flex justify-between items-center mb-8 print:hidden">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{showPriceList ? 'MASTER CATALOG' : `${role} PORTAL`}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Managing clinical outcomes in real-time.</p>
          </div>
          <div className="flex gap-4 items-center">
             <button className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm relative">
               <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
               {notifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
             </button>
             <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${role}`} alt="avatar" />
             </div>
          </div>
        </header>

        {showPriceList ? (
          <PriceListPDF />
        ) : (
          <>
            {role === UserRole.PATIENT && <PatientView bookings={bookings} createBooking={createBooking} />}
            {role === UserRole.ADMIN && <AdminView bookings={bookings} updateStatus={updateBookingStatus} onShowCatalog={() => setShowPriceList(true)} />}
            {role === UserRole.COLLECTOR && <CollectorView bookings={bookings} updateStatus={updateBookingStatus} />}
            {role === UserRole.LAB_TECH && <LabTechView bookings={bookings} updateStatus={updateBookingStatus} />}
            {role === UserRole.DOCTOR && <DoctorView bookings={bookings} updateStatus={updateBookingStatus} onFinalize={setActiveReport} />}
          </>
        )}
      </main>
    </div>
  );
}

const RoleNavItem = ({ icon, label, active = false, count = 0, onClick }: { icon: React.ReactNode, label: string, active?: boolean, count?: number, onClick?: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
    active ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'
  }`}>
    <div className="flex items-center gap-3">
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
      <span className="font-medium">{label}</span>
    </div>
    {count > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{count}</span>}
  </button>
);

// --- Sub Views ---

const PatientView = ({ bookings, createBooking }: { bookings: Booking[], createBooking: (d: Partial<Booking>) => string }) => {
  const [selectedPkg, setSelectedPkg] = useState<typeof TEST_PACKAGES[0] | null>(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const myBookings = bookings.filter(b => b.patientName === 'Jane Smith');
  const cats = ['All', ...new Set(TEST_PACKAGES.map(t => t.category))];
  const filtered = TEST_PACKAGES.filter(t => (cat === 'All' || t.category === cat) && t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h3 className="text-xl font-bold dark:text-white">Our Test Menu</h3>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tests..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm" 
            />
          </div>
          <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"><Filter className="w-5 h-5 text-slate-500" /></button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {cats.map(c => (
          <button 
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${cat === c ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(pkg => (
          <div key={pkg.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
             <div className="flex justify-between items-start mb-3">
               <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg">{pkg.category}</span>
               <span className="font-black text-slate-800 dark:text-slate-100">₹{pkg.price}</span>
             </div>
             <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight">{pkg.name}</h4>
             <p className="text-xs text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
             <button onClick={() => setSelectedPkg(pkg)} className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-2.5 rounded-xl text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">Book Now</button>
          </div>
        ))}
      </div>

      {selectedPkg && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <h4 className="text-xl font-bold mb-4 dark:text-white">Confirm Booking</h4>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase">{selectedPkg.category}</p>
              <p className="font-bold text-lg dark:text-white">{selectedPkg.name}</p>
              <p className="text-blue-600 font-black text-xl">₹{selectedPkg.price}</p>
            </div>
            <div className="space-y-3 mb-6">
              <p className="text-xs font-bold text-slate-500 uppercase">Parameters Included ({selectedPkg.parameters.length})</p>
              <div className="flex flex-wrap gap-2">
                {selectedPkg.parameters.map(p => <span key={p} className="text-[10px] bg-white dark:bg-slate-950 px-2 py-1 rounded border dark:border-slate-700 dark:text-slate-400">{p}</span>)}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setSelectedPkg(null)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400">Cancel</button>
              <button 
                onClick={() => { createBooking({ testName: selectedPkg.name, testPrice: selectedPkg.price }); setSelectedPkg(null); }} 
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {myBookings.length > 0 && (
        <div className="space-y-4 mt-12">
          <h3 className="text-xl font-bold dark:text-white">My Active Bookings</h3>
          {myBookings.map(b => (
             <div key={b.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">{b.id}</p>
                     <h4 className="font-bold dark:text-white">{b.testName}</h4>
                   </div>
                   <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{b.status.replace('_', ' ')}</span>
                </div>
                <StatusStepper currentStatus={b.status} />
                {b.status === BookingStatus.REPORT_DELIVERED && (
                  <div className="mt-8 border-t pt-8 dark:border-slate-800">
                     <ReportPDF booking={b} />
                  </div>
                )}
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminView = ({ bookings, updateStatus, onShowCatalog }: { bookings: Booking[], updateStatus: (id: string, s: BookingStatus, e?: any) => void, onShowCatalog: () => void }) => {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<TableIcon />} label="Total Bookings" value={bookings.length.toString()} delta="+5%" />
          <StatCard icon={<Clock />} label="Awaiting Collection" value={bookings.filter(b => b.status === BookingStatus.BOOKED).length.toString()} color="amber" delta="-2" />
          <StatCard icon={<CheckCircle2 />} label="Reports Delivered" value={bookings.filter(b => b.status === BookingStatus.REPORT_DELIVERED).length.toString()} color="green" delta="+12" />
       </div>

       <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
          <div>
            <h4 className="font-bold dark:text-white">Laboratory Information System (LIS)</h4>
            <p className="text-sm text-slate-500">Manage test menu, pricing, and clinical workflows.</p>
          </div>
          <button 
            onClick={onShowCatalog}
            className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Fee Catalog
          </button>
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Ref ID</th>
                <th className="px-6 py-4">Test</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {bookings.map(b => (
                <tr key={b.id}>
                  <td className="px-6 py-4 font-mono text-xs dark:text-slate-300">{b.id}</td>
                  <td className="px-6 py-4 font-bold dark:text-white">{b.testName}</td>
                  <td className="px-6 py-4 text-slate-500">{b.patientName}</td>
                  <td className="px-6 py-4">
                     <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md text-[10px] font-bold">{b.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {b.status === BookingStatus.BOOKED && (
                      <button onClick={() => updateStatus(b.id, BookingStatus.COLLECTOR_ASSIGNED, { collectorName: 'Rahul Kumar' })} className="text-blue-600 font-bold hover:underline">Assign Boy</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
         </table>
       </div>
    </div>
  );
};

const CollectorView = ({ bookings, updateStatus }: { bookings: Booking[], updateStatus: (id: string, s: BookingStatus) => void }) => {
  const pending = bookings.filter(b => b.status === BookingStatus.COLLECTOR_ASSIGNED);
  return (
    <div className="space-y-4">
      {pending.map(b => (
        <div key={b.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <h4 className="text-lg font-black dark:text-white">{b.patientName}</h4>
                 <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {b.address}</p>
                 <p className="text-xs text-blue-600 font-bold mt-1">Order: {b.testName}</p>
              </div>
              <div className="flex gap-2">
                 <button className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Navigation className="w-5 h-5" /></button>
                 <button className="p-3 bg-green-50 text-green-600 rounded-xl"><Phone className="w-5 h-5" /></button>
              </div>
           </div>
           <button 
            onClick={() => updateStatus(b.id, BookingStatus.SAMPLE_COLLECTED)} 
            className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
           >
             <Scan className="w-5 h-5" /> Mark Collected
           </button>
        </div>
      ))}
      {pending.length === 0 && <p className="text-center py-20 text-slate-400">No pending collections for today.</p>}
    </div>
  );
};

const LabTechView = ({ bookings, updateStatus }: { bookings: Booking[], updateStatus: (id: string, s: BookingStatus, e?: any) => void }) => {
  const [editing, setEditing] = useState<string | null>(null);
  const [resData, setResData] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const atLab = bookings.filter(b => b.status === BookingStatus.SAMPLE_COLLECTED || b.status === BookingStatus.SAMPLE_RECEIVED || b.status === BookingStatus.TESTING_IN_PROGRESS);

  const startEntry = (b: Booking) => {
    setEditing(b.id);
    const testInfo = TEST_PACKAGES.find(p => p.name === b.testName);
    const initial: Record<string, number> = {};
    testInfo?.parameters.forEach(p => initial[p] = 0);
    setResData(initial);
  };

  const saveResults = async (b: Booking) => {
    setIsProcessing(true);
    const results: LabResult[] = Object.entries(resData).map(([p, v]) => {
      const rangeInfo = NORMAL_RANGES[p] || { range: 'Variable', unit: 'U/L' };
      // Simple abnormality logic for demo
      const isAbnormal = v > 200 || (v < 60 && v > 0); 
      return {
        parameter: p,
        value: v,
        unit: rangeInfo.unit,
        range: rangeInfo.range,
        isAbnormal
      };
    });

    // Automatically call analyzeLabResults to generate a doctor's comment
    const comment = await analyzeLabResults(results, b.testName);
    
    updateStatus(b.id, BookingStatus.VERIFIED, { results, doctorComment: comment });
    setIsProcessing(false);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      {atLab.map(b => (
        <div key={b.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center p-1 border dark:border-slate-700">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${b.barcode}`} alt="Barcode" className="w-10 h-10 dark:invert" />
                </div>
                <div>
                   <h4 className="font-bold dark:text-white">{b.testName}</h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{b.barcode}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{b.status}</span>
           </div>

           {editing === b.id ? (
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl animate-in slide-in-from-bottom duration-300">
                <h5 className="font-bold text-sm mb-4 dark:text-white">Enter Result Values</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                   {Object.keys(resData).map(p => (
                     <div key={p}>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">{p} ({NORMAL_RANGES[p]?.unit})</label>
                        <input 
                          type="number" 
                          className="w-full bg-white dark:bg-slate-900 border-none rounded-lg p-2 text-sm dark:text-white"
                          value={resData[p]}
                          onChange={(e) => setResData({...resData, [p]: parseFloat(e.target.value)})}
                        />
                     </div>
                   ))}
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setEditing(null)} className="flex-1 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-bold text-xs">Cancel</button>
                   <button 
                    onClick={() => saveResults(b)} 
                    disabled={isProcessing}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2"
                   >
                     {isProcessing ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                     {isProcessing ? 'Saving & AI Analyzing...' : 'Finalize Results'}
                   </button>
                </div>
             </div>
           ) : (
             <div className="flex gap-2">
                {b.status === BookingStatus.SAMPLE_COLLECTED && <button onClick={() => updateStatus(b.id, BookingStatus.SAMPLE_RECEIVED)} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs">Receive Sample</button>}
                {b.status === BookingStatus.SAMPLE_RECEIVED && <button onClick={() => updateStatus(b.id, BookingStatus.TESTING_IN_PROGRESS)} className="flex-1 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-xs">Start Analysis</button>}
                {b.status === BookingStatus.TESTING_IN_PROGRESS && <button onClick={() => startEntry(b)} className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold text-xs">Enter Results</button>}
             </div>
           )}
        </div>
      ))}
      {atLab.length === 0 && <p className="text-center py-20 text-slate-400">Lab queue is clear.</p>}
    </div>
  );
};

const DoctorView = ({ bookings, updateStatus, onFinalize }: { bookings: Booking[], updateStatus: (id: string, s: BookingStatus, e?: any) => void, onFinalize: (b: Booking) => void }) => {
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const pending = bookings.filter(b => b.status === BookingStatus.VERIFIED);

  const approve = async (b: Booking) => {
    setAnalyzing(b.id);
    // Comment might already exist from LabTech, but we can re-verify or regenerate if needed
    const interpretation = b.doctorComment || await analyzeLabResults(b.results || [], b.testName);
    setAnalyzing(null);
    const updatedBooking = { ...b, status: BookingStatus.REPORT_DELIVERED, doctorComment: interpretation };
    updateStatus(b.id, BookingStatus.REPORT_DELIVERED, { doctorComment: interpretation });
    onFinalize(updatedBooking);
  };

  return (
    <div className="space-y-4">
      {pending.map(b => (
        <div key={b.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg">
           <div className="flex justify-between items-start mb-8">
              <div>
                 <h4 className="text-2xl font-black dark:text-white leading-tight">{b.patientName}</h4>
                 <p className="text-sm text-slate-500">{b.testName} (ID: {b.id})</p>
              </div>
              <button 
                onClick={() => approve(b)} 
                disabled={analyzing === b.id}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20"
              >
                {analyzing === b.id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                Sign & Release Report
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {b.results?.map((res, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${res.isAbnormal ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30' : 'bg-slate-50 border-slate-100 dark:bg-slate-800 dark:border-slate-700'}`}>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{res.parameter}</p>
                   <div className="flex justify-between items-end">
                      <p className={`text-xl font-black ${res.isAbnormal ? 'text-red-600 dark:text-red-400' : 'dark:text-white'}`}>{res.value} <span className="text-[10px] font-normal opacity-60">{res.unit}</span></p>
                      <p className="text-[10px] opacity-60 italic">{res.range}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      ))}
      {pending.length === 0 && <p className="text-center py-20 text-slate-400">No reports awaiting medical review.</p>}
    </div>
  );
};

const StatCard = ({ icon, label, value, delta, color = 'blue' }: { icon: React.ReactNode, label: string, value: string, delta: string, color?: string }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-blue-400'
  }[color] || 'bg-blue-50 text-blue-600';

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors}`}>{icon}</div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${delta.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{delta}</span>
      </div>
      <p className="text-xs text-slate-400 font-bold uppercase mb-1">{label}</p>
      <h4 className="text-2xl font-black dark:text-white">{value}</h4>
    </div>
  );
};
