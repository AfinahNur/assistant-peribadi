import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Coffee, Brain, Calendar as CalendarIcon, Plus, 
  Trash2, CheckCircle2, Circle, Activity, Wallet, Sparkles, 
  LayoutDashboard, CalendarDays, ArrowUpCircle, ArrowDownCircle, 
  DollarSign, ChevronLeft, ChevronRight, Droplets, ShoppingBag
} from 'lucide-react';

export default function App() {
  // --- STATE PENGURUSAN TAB ---
  const [activeTab, setActiveTab] = useState('rutin'); // rutin | kalendar | kewangan | skincare

  // --- STATE BRAIN DUMP ---
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('myTasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return [
      { id: 1, text: 'Hantar borang kolej kediaman', date: '2026-03-30', done: false },
      { id: 2, text: 'Assignment Kuiz 1 Mekanikal', date: '2026-04-02', done: false }
    ];
  });
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');

  // --- STATE RUTIN HARIAN ---
  const [routines, setRoutines] = useState(() => {
    const savedRoutines = localStorage.getItem('myRoutines4');
    if (savedRoutines) return JSON.parse(savedRoutines);
    return {
      pagi: [
        { id: 'p1', text: 'Solat Subuh', done: false },
        { id: 'p2', text: 'Skincare Pagi (Rujuk Tab Skincare)', done: false },
        { id: 'p3', text: 'Sarapan & Makan Supplement', done: false },
        { id: 'p4', text: 'Semak jadual kelas harini & plan masa terluang', done: false },
      ],
      petang: [
        { id: 'pt1', text: 'Solat Zohor', done: false },
        { id: 'pt2', text: 'Solat Asar', done: false },
        { id: 'pt3', text: 'Makan tengah hari (Kurangkan nasi, elak perut buncit)', done: false },
        { id: 'pt4', text: 'Senaman kempis buncit (Jalan kaki/Workout 20 minit)', done: false },
      ],
      malam: [
        { id: 'm1', text: 'Mandi & Double Cleansing (Cuci Makeup)', done: false },
        { id: 'm2', text: 'Skincare Malam (Rujuk Tab Skincare)', done: false },
        { id: 'm3', text: 'Solat Maghrib', done: false },
        { id: 'm4', text: 'Solat Isyak', done: false },
        { id: 'm5', text: 'Healing (Main MLBB / Layan Mandarin sekejap)', done: false },
        { id: 'm6', text: 'Catat duit belanja harini', done: false },
        { id: 'm7', text: 'Tidur sebelum 1 Pagi (Wajib!)', done: false },
      ]
    };
  });

  // --- STATE JADUAL KELAS & FYP ---
  const [classSchedule, setClassSchedule] = useState(() => {
    const savedClasses = localStorage.getItem('myClasses1');
    if (savedClasses) return JSON.parse(savedClasses);
    return [
      { id: 'c1', day: 'Isnin', time: '12:00 PM - 2:00 PM', title: 'BDA 24103 STATISTIC', loc: 'G3 BKE2', done: false },
      { id: 'c2', day: 'Isnin', time: '2:00 PM - 6:00 PM', title: 'BDA 40804 IED', loc: 'G2 MP3D 1', done: false },
      { id: 'c3', day: 'Selasa', time: '12:00 PM - 2:00 PM', title: 'BDA 40703 IE', loc: 'G3 BKE7', done: false },
      { id: 'c4', day: 'Rabu', time: '8:00 AM - 10:00 AM', title: 'BDA 40703 IE', loc: 'G3 BKE7', done: false },
      { id: 'c5', day: 'Khamis', time: '10:00 AM - 12:00 PM', title: 'BDA 40804 IED', loc: 'B6 BSC1', done: false },
      { id: 'c6', day: 'Khamis', time: '12:00 PM - 2:00 PM', title: 'BDA 24103 STATISTIC', loc: 'G3 BKE6', done: false },
      { id: 'c7', day: 'Sabtu', time: '9:00 AM - 6:00 PM', title: 'Online Class Kyouth', loc: 'Online', done: false },
      { id: 'f1', day: 'Misi FYP', time: 'Fleksibel', title: 'Baca 1 Reference Paper / Tulis Report', loc: 'Smart Tank Project', done: false },
      { id: 'f2', day: 'Misi FYP', time: 'Fleksibel', title: 'Fabrication / Testing Smart Tank', loc: 'Lab / Bengkel', done: false }
    ];
  });

  // --- STATE SKINCARE (CHECKLIST) ---
  const [skincare, setSkincare] = useState(() => {
    const savedSkincare = localStorage.getItem('mySkincare1');
    if (savedSkincare) return JSON.parse(savedSkincare);
    return {
      pagi: [
        { id: 'skp1', text: 'Pencuci Muka (Gentle Cleanser)', done: false },
        { id: 'skp2', text: 'Toner / Essence', done: false },
        { id: 'skp3', text: 'Pelembap (Sesuai untuk kulit berminyak)', done: false },
        { id: 'skp4', text: 'Sunscreen (WAJIB 2 Jari! Reapply kalau keluar)', done: false },
      ],
      malam: [
        { id: 'skm1', text: 'Double Cleansing (Micellar Water / Cleansing Balm) - Wajib tanggalkan makeup', done: false },
        { id: 'skm2', text: 'Pencuci Muka', done: false },
        { id: 'skm3', text: 'Toner (Hydrating)', done: false },
        { id: 'skm4', text: 'Treatment (Rujuk Kitaran 30 Hari di atas)', done: false },
        { id: 'skm5', text: 'Pelembap Malam (Barrier Repair)', done: false },
        { id: 'skm6', text: 'Spot Treatment (Titik pada jerawat aktif sahaja)', done: false },
      ]
    };
  });

  // --- STATE SKIN CYCLING (30 HARI) ---
  const [skinCycle, setSkinCycle] = useState(() => {
    const savedCycle = localStorage.getItem('mySkinCycle1');
    if (savedCycle) return JSON.parse(savedCycle);
    return Array.from({length: 30}, (_, i) => ({ day: i + 1, done: false }));
  });

  // --- STATE KEWANGAN ---
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('myTransactions');
    if (savedTransactions) return JSON.parse(savedTransactions);
    return [
      { id: 1, type: 'in', amount: 500, note: 'Elaun / PTPTN / Duit Ayah', date: '2026-03-01' }
    ];
  });
  const [transAmount, setTransAmount] = useState('');
  const [transNote, setTransNote] = useState('');
  const [transType, setTransType] = useState('out');

  // --- STATE WISHLIST BARU ---
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('myWishlist1');
    if (savedWishlist) return JSON.parse(savedWishlist);
    return [
      { id: 1, item: 'Baju Raya Baru', price: 150, done: false }
    ];
  });
  const [wishItem, setWishItem] = useState('');
  const [wishPrice, setWishPrice] = useState('');

  // --- KALENDAR STATE ---
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); 

  // ==========================================
  // --- USE EFFECT UNTUK AUTO-SAVE DATA ---
  // ==========================================
  useEffect(() => { localStorage.setItem('myTasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('myRoutines4', JSON.stringify(routines)); }, [routines]);
  useEffect(() => { localStorage.setItem('myClasses1', JSON.stringify(classSchedule)); }, [classSchedule]);
  useEffect(() => { localStorage.setItem('mySkincare1', JSON.stringify(skincare)); }, [skincare]);
  useEffect(() => { localStorage.setItem('mySkinCycle1', JSON.stringify(skinCycle)); }, [skinCycle]);
  useEffect(() => { localStorage.setItem('myTransactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('myWishlist1', JSON.stringify(wishlist)); }, [wishlist]); // Save Wishlist


  // --- FUNGSI PENGURUSAN DATA ---
  const addTask = () => {
    if (newTask.trim()) { setTasks([...tasks, { id: Date.now(), text: newTask, date: newDate, done: false }]); setNewTask(''); setNewDate(''); }
  };
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  
  const toggleRoutine = (timeBlock, id) => { setRoutines(prev => ({ ...prev, [timeBlock]: prev[timeBlock].map(r => r.id === id ? { ...r, done: !r.done } : r) })); };
  const toggleClass = (id) => { setClassSchedule(classSchedule.map(c => c.id === id ? { ...c, done: !c.done } : c)); };
  
  const toggleSkincare = (timeBlock, id) => { setSkincare(prev => ({ ...prev, [timeBlock]: prev[timeBlock].map(r => r.id === id ? { ...r, done: !r.done } : r) })); };
  const resetSkincare = () => { setSkincare({ pagi: skincare.pagi.map(s => ({ ...s, done: false })), malam: skincare.malam.map(s => ({ ...s, done: false })) }); };
  const toggleSkinCycle = (day) => { setSkinCycle(skinCycle.map(d => d.day === day ? { ...d, done: !d.done } : d)); };
  
  const calculateProgress = () => {
    const allRoutines = [...routines.pagi, ...routines.petang, ...routines.malam];
    const completed = allRoutines.filter(r => r.done).length;
    return Math.round((completed / allRoutines.length) * 100) || 0;
  };

  // --- FUNGSI KEWANGAN & WISHLIST ---
  const totalIn = transactions.filter(t => t.type === 'in').reduce((sum, t) => sum + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIn - totalOut;

  const addTransaction = () => {
    if (transAmount && transNote) {
      setTransactions([{ id: Date.now(), type: transType, amount: parseFloat(transAmount), note: transNote, date: new Date().toISOString().split('T')[0] }, ...transactions]);
      setTransAmount(''); setTransNote('');
    }
  };
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));

  const addWishlist = () => {
    if (wishItem && wishPrice) {
      setWishlist([...wishlist, { id: Date.now(), item: wishItem, price: parseFloat(wishPrice), done: false }]);
      setWishItem(''); setWishPrice('');
    }
  };
  const deleteWishlist = (id) => setWishlist(wishlist.filter(w => w.id !== id));
  const toggleWishlist = (id) => setWishlist(wishlist.map(w => w.id === id ? { ...w, done: !w.done } : w));

  // --- FUNGSI KALENDAR ---
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const monthNames = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const blanks = Array(firstDay).fill(null);
  const dayItems = Array.from({length: daysInMonth}, (_, i) => i + 1);

  // --- KOMPONEN BANTUAN ---
  const RoutineItem = ({ item, timeBlock, onClick }) => (
    <div onClick={onClick} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${item.done ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-100 hover:border-blue-200 text-slate-700 shadow-sm hover:shadow-md'}`}>
      <div className="mt-0.5 shrink-0">{item.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}</div>
      <span className={`text-sm font-medium ${item.done ? 'line-through opacity-70' : ''}`}>{item.text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER KEKAL SAMA... */}
        <header className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-indigo-950">
                <Brain className="text-indigo-500 w-8 h-8" /> Assistant Peribadi
              </h1>
              <p className="text-slate-500 mt-2 font-medium">Buat sikit-sikit. Biar lambat asal jalan.</p>
            </div>
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 min-w-[250px]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-blue-800">Caj Tenaga Harini</span>
                <span className="text-sm font-bold text-blue-800">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-blue-200/50 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm" style={{ width: `${calculateProgress()}%` }}></div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setActiveTab('rutin')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${activeTab === 'rutin' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}><LayoutDashboard className="w-4 h-4" /> Rutin & Tugas</button>
            <button onClick={() => setActiveTab('kalendar')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${activeTab === 'kalendar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}><CalendarDays className="w-4 h-4" /> Kalendar Penuh</button>
            <button onClick={() => setActiveTab('kewangan')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${activeTab === 'kewangan' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}><Wallet className="w-4 h-4" /> Kewangan Duit</button>
            <button onClick={() => setActiveTab('skincare')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${activeTab === 'skincare' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}><Droplets className="w-4 h-4" /> Penjagaan Wajah</button>
          </div>
        </header>

        {/* FOKUS UTAMA KEKAL SAMA... */}
        {activeTab !== 'skincare' && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 md:p-6 text-white shadow-lg shadow-indigo-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5 text-amber-300" /> Fokus Utama: Betulkan Waktu Tidur!</h2>
            <p className="text-indigo-100 text-sm md:text-base leading-relaxed"><span className="font-semibold text-white bg-indigo-900/40 px-3 py-1.5 rounded-lg inline-block">Misi: Paksa bangun pagi walaupun tidur lewat. Jangan tidur siang hari. Tahan penat sampai malam.</span></p>
          </div>
        )}

        {/* TAB 1: RUTIN KEKAL SAMA... */}
        {activeTab === 'rutin' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-1"><Activity className="text-blue-500" /> Tabiat Harian (Time Blocking)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100/50">
                  <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-4"><Sun className="w-5 h-5" /> Pagi (7 AM - 12 PM)</h3>
                  <div className="space-y-3">{routines.pagi.map(item => <RoutineItem key={item.id} item={item} timeBlock="pagi" onClick={() => toggleRoutine('pagi', item.id)} />)}</div>
                </div>
                <div className="bg-orange-50 rounded-3xl p-5 border border-orange-100/50">
                  <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-4"><Coffee className="w-5 h-5" /> Petang (12 PM - 6 PM)</h3>
                  <div className="space-y-3">{routines.petang.map(item => <RoutineItem key={item.id} item={item} timeBlock="petang" onClick={() => toggleRoutine('petang', item.id)} />)}</div>
                </div>
                <div className="bg-indigo-50 rounded-3xl p-5 border border-indigo-100/50 md:col-span-2">
                  <h3 className="font-bold text-indigo-800 flex items-center gap-2 mb-4"><Moon className="w-5 h-5" /> Malam (6 PM - Tidur)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{routines.malam.map(item => <RoutineItem key={item.id} item={item} timeBlock="malam" onClick={() => toggleRoutine('malam', item.id)} />)}</div>
                </div>
              </div>
            </div>
            <div className="space-y-6 flex flex-col h-full">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-200 relative overflow-hidden shrink-0 flex flex-col max-h-[500px]">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><CalendarIcon className="text-indigo-500 w-5 h-5" /> Jadual Kuliah & FYP</h2>
                  <button onClick={() => setClassSchedule(classSchedule.map(c => ({...c, done: false})))} className="text-[10px] md:text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1.5 rounded-lg font-bold transition-colors border border-indigo-200 shadow-sm">Reset Mingguan</button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-hide">
                  {classSchedule.map(c => (
                    <div key={c.id} onClick={() => toggleClass(c.id)} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all ${c.done ? 'bg-indigo-50/50 border-indigo-100 opacity-60' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:shadow-sm'}`}>
                      <div className="mt-0.5 shrink-0">{c.done ? <CheckCircle2 className="w-5 h-5 text-indigo-500" /> : <Circle className="w-5 h-5 text-slate-300" />}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <span className={`font-bold text-sm ${c.day === 'Misi FYP' ? 'text-rose-600' : 'text-slate-700'} ${c.done ? 'line-through' : ''}`}>{c.day}</span>
                          <span className="text-[10px] md:text-xs font-bold bg-white px-2 py-0.5 rounded-md text-indigo-600 border border-indigo-100 shrink-0 ml-2 shadow-sm text-center">{c.time}</span>
                        </div>
                        <p className={`text-xs font-semibold ${c.done ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{c.title}</p>
                        {c.loc && <p className={`text-[10px] mt-1 font-medium flex items-center gap-1 ${c.done ? 'text-slate-400' : 'text-slate-500'}`}>📍 {c.loc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col flex-1 min-h-[400px]">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1"><CalendarIcon className="text-rose-500 w-5 h-5" /> Brain Dump</h2>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">Ada info assignment atau majlis? Jangan cuba ingat, terus taip sini.</p>
                <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <input type="text" placeholder="Cth: Majlis, kuiz, hantar borang..." value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"/>
                  <div className="flex gap-2">
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-600 bg-white"/>
                    <button onClick={addTask} className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors flex items-center justify-center shadow-sm"><Plus className="w-5 h-5" /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                  {tasks.length === 0 ? <div className="text-center py-10 text-slate-400 text-sm font-medium">Tiada tugasan. Boleh rileks!</div> : tasks.sort((a,b) => new Date(a.date) - new Date(b.date)).map(task => (
                    <div key={task.id} className={`flex justify-between items-start p-4 rounded-2xl border transition-all ${task.done ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-rose-100 shadow-sm hover:border-rose-300'}`}>
                      <div className="flex items-start gap-3 flex-1">
                        <button onClick={() => toggleTask(task.id)} className="mt-0.5 shrink-0">{task.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300 hover:text-blue-400 transition-colors" />}</button>
                        <div>
                          <p className={`text-sm font-semibold ${task.done ? 'line-through text-slate-500' : 'text-slate-700'}`}>{task.text}</p>
                          {task.date && <p className="text-xs text-rose-500 font-bold mt-1.5 flex items-center gap-1.5 bg-rose-50 inline-flex px-2 py-0.5 rounded-md"><CalendarIcon className="w-3 h-3" /> {new Date(task.date).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
                        </div>
                      </div>
                      <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 ml-2 shrink-0 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KALENDAR KEKAL SAMA... */}
        {activeTab === 'kalendar' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><CalendarDays className="text-indigo-500" /> Kalendar Bulanan</h2>
              <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                <span className="font-bold text-slate-700 min-w-[120px] text-center">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
              {['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'].map(day => <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {blanks.map((_, i) => <div key={`blank-${i}`} className="h-20 md:h-28 rounded-2xl bg-slate-50/50"></div>)}
              {dayItems.map(day => {
                const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayTasks = tasks.filter(t => t.date === dateString);
                const isToday = new Date().toISOString().split('T')[0] === dateString;
                return (
                  <div key={day} className={`h-20 md:h-28 rounded-2xl p-2 md:p-3 border flex flex-col transition-all ${isToday ? 'bg-blue-50 border-blue-300 shadow-sm ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                    <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-slate-500'} mb-1`}>{day}</span>
                    <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                      {dayTasks.map(t => <div key={t.id} className="text-[10px] md:text-xs leading-tight bg-rose-100 text-rose-700 p-1.5 rounded-md truncate font-medium">{t.text}</div>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SKINCARE KEKAL SAMA... */}
        {activeTab === 'skincare' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Sparkles className="w-6 h-6 text-teal-500" /> Kitaran Skin Cycling (30 Hari)</h2>
                  <p className="text-slate-500 text-sm font-medium mt-1">Konsisten 30 hari untuk tengok kesan pada parut & jerawat.</p>
                </div>
                <button onClick={() => setSkinCycle(skinCycle.map(d => ({...d, done: false})))} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold transition-colors w-fit">Reset 30 Hari</button>
              </div>
              <div className="flex flex-wrap gap-3 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-fuchsia-700"><span className="w-3 h-3 rounded-full bg-fuchsia-400"></span> ✨ Exfoliate (AHA/BHA)</div>
                <div className="flex items-center gap-1.5 text-amber-700"><span className="w-3 h-3 rounded-full bg-amber-400"></span> 🧬 Retinol</div>
                <div className="flex items-center gap-1.5 text-teal-700"><span className="w-3 h-3 rounded-full bg-teal-400"></span> 💧 Recovery (Hydration)</div>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
                {skinCycle.map(d => {
                  const cycle = (d.day - 1) % 4; let props = { type: 'Recovery', icon: '💧', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', doneBg: 'bg-teal-500' };
                  if (cycle === 0) { props = { type: 'Exfoliate', icon: '✨', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700', doneBg: 'bg-fuchsia-500' }; } 
                  else if (cycle === 1) { props = { type: 'Retinol', icon: '🧬', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', doneBg: 'bg-amber-500' }; }
                  return (
                    <div key={d.day} onClick={() => toggleSkinCycle(d.day)} className={`cursor-pointer rounded-2xl p-2 border flex flex-col items-center justify-center transition-all aspect-square ${d.done ? `${props.doneBg} text-white shadow-md scale-95 border-transparent` : `${props.bg} ${props.border} ${props.text} hover:scale-105 hover:shadow-sm`}`}>
                      <span className="text-[10px] font-bold opacity-80 mb-0.5">H-{d.day}</span>
                      <span className="text-xl md:text-2xl mb-0.5">{d.done ? <CheckCircle2 className="w-6 h-6"/> : props.icon}</span>
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter text-center leading-none">{props.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-amber-600 flex items-center gap-2 text-lg"><Sun className="w-5 h-5" /> Rutin Pagi</h3>
                  <button onClick={resetSkincare} className="text-[10px] md:text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-bold transition-colors">Reset Harian</button>
                </div>
                <div className="space-y-3">{skincare.pagi.map(item => <RoutineItem key={item.id} item={item} timeBlock="pagi" onClick={() => toggleSkincare('pagi', item.id)} />)}</div>
              </div>
              <div className="bg-indigo-50 rounded-3xl p-6 shadow-sm border border-indigo-100">
                <h3 className="font-bold text-indigo-800 flex items-center gap-2 text-lg mb-6"><Moon className="w-5 h-5" /> Rutin Malam (Mekap / Minyak)</h3>
                <div className="space-y-3">{skincare.malam.map(item => <RoutineItem key={item.id} item={item} timeBlock="malam" onClick={() => toggleSkincare('malam', item.id)} />)}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KEWANGAN & WISHLIST BARU */}
        {activeTab === 'kewangan' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KAD SUMMARY KEKAL SAMA... */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-bold mb-1">Baki Semasa</p>
                    <h3 className={`text-3xl font-black ${balance >= 0 ? 'text-slate-800' : 'text-red-500'}`}>RM {balance.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-2xl"><Wallet className="w-6 h-6 text-indigo-500" /></div>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-3xl p-6 shadow-sm border border-emerald-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-700/70 text-sm font-bold mb-1">Duit Masuk</p>
                    <h3 className="text-2xl font-black text-emerald-700">RM {totalIn.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-2xl"><ArrowUpCircle className="w-6 h-6 text-emerald-600" /></div>
                </div>
              </div>
              <div className="bg-rose-50 rounded-3xl p-6 shadow-sm border border-rose-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-rose-700/70 text-sm font-bold mb-1">Duit Keluar (Belanja)</p>
                    <h3 className="text-2xl font-black text-rose-700">RM {totalOut.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 bg-rose-100 rounded-2xl"><ArrowDownCircle className="w-6 h-6 text-rose-600" /></div>
                </div>
              </div>
            </div>

            {/* FORM TAMBAH REKOD KEKAL SAMA... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-fit">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-slate-800"><DollarSign className="w-5 h-5 text-amber-500" /> Catat Belanja Harini</h3>
                <div className="space-y-4">
                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button onClick={() => setTransType('out')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${transType === 'out' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}>Duit Keluar</button>
                    <button onClick={() => setTransType('in')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${transType === 'in' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>Duit Masuk</button>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Jumlah (RM)</label>
                    <input type="number" value={transAmount} onChange={(e) => setTransAmount(e.target.value)} placeholder="Contoh: 12.50" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50"/>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Nota / Untuk apa?</label>
                    <input type="text" value={transNote} onChange={(e) => setTransNote(e.target.value)} placeholder="Contoh: Nasi ayam, topup..." className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50"/>
                  </div>
                  <button onClick={addTransaction} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-colors mt-2">Simpan Rekod</button>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-5 text-slate-800">Sejarah Transaksi</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {transactions.length === 0 ? <div className="text-center py-8 text-slate-400 text-sm">Belum ada rekod kewangan.</div> : transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${t.type === 'in' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>{t.type === 'in' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}</div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">{t.note}</p>
                          <p className="text-xs text-slate-400 font-medium">{new Date(t.date).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-black ${t.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>{t.type === 'in' ? '+' : '-'} RM {t.amount.toFixed(2)}</span>
                        <button onClick={() => deleteTransaction(t.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BAHAGIAN WISHLIST BARU (Letak kat bawah sekali tab Kewangan) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-200 mt-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-pink-500"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-2 text-slate-800">
                    <ShoppingBag className="w-6 h-6 text-pink-500" /> Wishlist Idaman 
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mt-1">
                    Biar ada target sikit nak simpan duit. (Progress % ikut baki semasa).
                  </p>
                </div>
              </div>

              {/* INPUT WISHLIST */}
              <div className="flex flex-col md:flex-row gap-3 mb-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                <input 
                  type="text" 
                  placeholder="Nama Barang (Cth: Kasut, Sijil...)" 
                  value={wishItem} 
                  onChange={(e) => setWishItem(e.target.value)} 
                  className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                />
                <input 
                  type="number" 
                  placeholder="Harga (RM)" 
                  value={wishPrice} 
                  onChange={(e) => setWishPrice(e.target.value)} 
                  className="w-full md:w-32 text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                />
                <button 
                  onClick={addWishlist} 
                  className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl font-bold transition-colors shadow-sm md:w-auto w-full flex justify-center items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Tambah
                </button>
              </div>

              {/* SENARAI WISHLIST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.length === 0 ? (
                  <div className="md:col-span-2 text-center py-6 text-slate-400 text-sm">Belum ada barang idaman.</div>
                ) : (
                  wishlist.map(w => {
                    const progress = balance > 0 ? Math.min(Math.round((balance / w.price) * 100), 100) : 0;
                    const isReady = progress >= 100;
                    
                    return (
                      <div key={w.id} className={`p-4 rounded-2xl border transition-all relative overflow-hidden ${w.done ? 'bg-slate-50 border-slate-200 opacity-60' : (isReady ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-200 hover:border-pink-200')}`}>
                        
                        {/* Progress Bar Background */}
                        {!w.done && (
                          <div className="absolute bottom-0 left-0 h-1 bg-pink-100 w-full">
                            <div className={`h-full transition-all duration-1000 ${isReady ? 'bg-emerald-500' : 'bg-pink-500'}`} style={{ width: `${progress}%` }}></div>
                          </div>
                        )}

                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <button onClick={() => toggleWishlist(w.id)} className="shrink-0 mt-0.5">
                              {w.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300 hover:text-pink-400" />}
                            </button>
                            <div>
                              <p className={`font-bold text-sm ${w.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{w.item}</p>
                              <p className={`text-xs font-black mt-0.5 ${w.done ? 'text-slate-400' : 'text-pink-600'}`}>RM {w.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <button onClick={() => deleteWishlist(w.id)} className="text-slate-300 hover:text-red-500 p-1 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {!w.done && (
                          <div className="flex justify-between items-center mt-3 pl-8 text-[10px] md:text-xs font-bold">
                            <span className={isReady ? 'text-emerald-600' : 'text-slate-500'}>
                              {isReady ? '🎉 Duit dah cukup!' : `Progress: ${progress}%`}
                            </span>
                            {!isReady && <span className="text-slate-400">Kurang RM{(w.price - balance).toFixed(2)}</span>}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}