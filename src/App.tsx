import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Coffee, Brain, Calendar as CalendarIcon, Plus, 
  Trash2, CheckCircle2, Circle, Activity, Wallet, Sparkles, 
  LayoutDashboard, CalendarDays, ArrowUpCircle, ArrowDownCircle, 
  DollarSign, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function App() {
  // --- STATE PENGURUSAN TAB ---
  const [activeTab, setActiveTab] = useState('rutin'); // rutin | kalendar | kewangan

  // --- STATE BRAIN DUMP DENGAN LOCAL STORAGE ---
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('myTasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return [
      { id: 1, text: 'Hantar borang kolej kediaman', date: '2026-03-30', done: false },
      { id: 2, text: 'Assignment Kuiz 1 Mekanikal', date: '2026-04-02', done: false },
      { id: 3, text: 'Beli supplement baru', date: '2026-03-28', done: false }
    ];
  });
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');

  // --- STATE RUTIN DENGAN LOCAL STORAGE ---
  const [routines, setRoutines] = useState(() => {
    const savedRoutines = localStorage.getItem('myRoutines');
    if (savedRoutines) return JSON.parse(savedRoutines);
    return {
      pagi: [
        { id: 'p1', text: 'Solat Subuh & Set niat hari ni', done: false },
        { id: 'p2', text: 'Skincare (Cuci muka & pelembap rawat parut)', done: false },
        { id: 'p3', text: 'Sarapan ringkas + Telan Supplement', done: false },
        { id: 'p4', text: 'Pergi Kelas (Isnin-Khamis, Sabtu) / Ulangkaji', done: false },
      ],
      petang: [
        { id: 'pt1', text: 'Solat Zohor & Asar', done: false },
        { id: 'pt2', text: 'Makan tengah hari (Kurangkan nasi, elak perut buncit)', done: false },
        { id: 'pt3', text: 'Senaman kempis buncit (Jalan kaki/Workout 20 minit)', done: false },
        { id: 'pt4', text: 'Fokus FYP Smart Tank (Buat 15 minit je, janji jalan)', done: false },
      ],
      malam: [
        { id: 'm1', text: 'Solat Maghrib & Isyak', done: false },
        { id: 'm2', text: 'Healing (Main MLBB / Layan Mandarin sekejap)', done: false },
        { id: 'm3', text: 'Catat duit belanja harini', done: false },
        { id: 'm4', text: 'Tidur sebelum 1 Pagi (PANTANG TIDUR SIANG!)', done: false },
      ]
    };
  });

  // --- STATE KEWANGAN DENGAN LOCAL STORAGE ---
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('myTransactions');
    if (savedTransactions) return JSON.parse(savedTransactions);
    return [
      { id: 1, type: 'in', amount: 500, note: 'Elaun / PTPTN / Duit Ayah', date: '2026-03-01' },
      { id: 2, type: 'out', amount: 12, note: 'Nasi berlauk + Air', date: '2026-03-26' },
    ];
  });
  const [transAmount, setTransAmount] = useState('');
  const [transNote, setTransNote] = useState('');
  const [transType, setTransType] = useState('out');

  // --- KALENDAR STATE ---
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // Bermula Mac 2026

  // ==========================================
  // --- USE EFFECT UNTUK AUTO-SAVE DATA ---
  // ==========================================
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('myRoutines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('myTransactions', JSON.stringify(transactions));
  }, [transactions]);


  // --- FUNGSI TUGAS & RUTIN ---
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, date: newDate, done: false }]);
      setNewTask('');
      setNewDate('');
    }
  };

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  
  const toggleRoutine = (timeBlock, id) => {
    setRoutines(prev => ({
      ...prev,
      [timeBlock]: prev[timeBlock].map(r => r.id === id ? { ...r, done: !r.done } : r)
    }));
  };
  
  const calculateProgress = () => {
    const allRoutines = [...routines.pagi, ...routines.petang, ...routines.malam];
    const completed = allRoutines.filter(r => r.done).length;
    return Math.round((completed / allRoutines.length) * 100) || 0; // Tambah fallback 0 kalau array kosong
  };

  // --- FUNGSI KEWANGAN ---
  const addTransaction = () => {
    if (transAmount && transNote) {
      setTransactions([{
        id: Date.now(),
        type: transType,
        amount: parseFloat(transAmount),
        note: transNote,
        date: new Date().toISOString().split('T')[0]
      }, ...transactions]);
      setTransAmount('');
      setTransNote('');
    }
  };
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));
  
  const totalIn = transactions.filter(t => t.type === 'in').reduce((sum, t) => sum + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIn - totalOut;

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
  const RoutineItem = ({ item, timeBlock }) => (
    <div 
      onClick={() => toggleRoutine(timeBlock, item.id)}
      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
        item.done 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
          : 'bg-white border-slate-100 hover:border-blue-200 text-slate-700 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="mt-0.5">
        {item.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
      </div>
      <span className={`text-sm font-medium ${item.done ? 'line-through opacity-70' : ''}`}>
        {item.text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER & NAVIGASI */}
        <header className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-indigo-950">
                <Brain className="text-indigo-500 w-8 h-8" />
                Assistant Peribadi
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Buat sikit-sikit. Biar lambat asal jalan.
              </p>
            </div>

            {/* BAR PROGRESS TENAGA */}
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 min-w-[250px]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-blue-800">Caj Tenaga Harini</span>
                <span className="text-sm font-bold text-blue-800">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-blue-200/50 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* MENU TABS */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setActiveTab('rutin')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === 'rutin' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Rutin & Tugas
            </button>
            <button 
              onClick={() => setActiveTab('kalendar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === 'kalendar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CalendarDays className="w-4 h-4" /> Kalendar Penuh
            </button>
            <button 
              onClick={() => setActiveTab('kewangan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === 'kewangan' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Wallet className="w-4 h-4" /> Kewangan Duit
            </button>
          </div>
        </header>

        {/* FOKUS UTAMA MINGGU INI (Sentiasa ada) */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 md:p-6 text-white shadow-lg shadow-indigo-200">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-300" /> Fokus Utama: Betulkan Waktu Tidur!
          </h2>
          <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
            <span className="font-semibold text-white bg-indigo-900/40 px-3 py-1.5 rounded-lg inline-block">
              Misi: Paksa bangun pagi walaupun tidur lewat. Jangan tidur siang hari. Tahan penat sampai malam.
            </span>
          </p>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: RUTIN & TUGAS */}
        {/* ======================================================== */}
        {activeTab === 'rutin' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KIRI: RUTIN BLOCKING */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-1">
                <Activity className="text-blue-500" /> Tabiat Harian (Time Blocking)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100/50">
                  <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-4">
                    <Sun className="w-5 h-5" /> Pagi (7 AM - 12 PM)
                  </h3>
                  <div className="space-y-3">{routines.pagi.map(item => <RoutineItem key={item.id} item={item} timeBlock="pagi" />)}</div>
                </div>
                <div className="bg-orange-50 rounded-3xl p-5 border border-orange-100/50">
                  <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-4">
                    <Coffee className="w-5 h-5" /> Petang (12 PM - 6 PM)
                  </h3>
                  <div className="space-y-3">{routines.petang.map(item => <RoutineItem key={item.id} item={item} timeBlock="petang" />)}</div>
                </div>
                <div className="bg-indigo-50 rounded-3xl p-5 border border-indigo-100/50 md:col-span-2">
                  <h3 className="font-bold text-indigo-800 flex items-center gap-2 mb-4">
                    <Moon className="w-5 h-5" /> Malam (6 PM - Tidur)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {routines.malam.map(item => <RoutineItem key={item.id} item={item} timeBlock="malam" />)}
                  </div>
                </div>
              </div>
            </div>

            {/* KANAN: BRAIN DUMP */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col h-[600px]">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
                <CalendarIcon className="text-rose-500 w-5 h-5" /> Brain Dump
              </h2>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Ada info *assignment* atau majlis? Jangan cuba ingat, terus taip sini. Biar *assistant* yang ingat.
              </p>

              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <input 
                  type="text" 
                  placeholder="Cth: Majlis, kuiz, hantar borang..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                />
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-600 bg-white"
                  />
                  <button 
                    onClick={addTask}
                    className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors flex items-center justify-center shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {tasks.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-sm font-medium">Tiada tugasan. Boleh rileks!</div>
                ) : (
                  tasks.sort((a,b) => new Date(a.date) - new Date(b.date)).map(task => (
                    <div 
                      key={task.id} 
                      className={`flex justify-between items-start p-4 rounded-2xl border transition-all ${
                        task.done ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-rose-100 shadow-sm hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <button onClick={() => toggleTask(task.id)} className="mt-0.5 shrink-0">
                          {task.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300 hover:text-blue-400 transition-colors" />}
                        </button>
                        <div>
                          <p className={`text-sm font-semibold ${task.done ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                            {task.text}
                          </p>
                          {task.date && (
                            <p className="text-xs text-rose-500 font-bold mt-1.5 flex items-center gap-1.5 bg-rose-50 inline-flex px-2 py-0.5 rounded-md">
                              <CalendarIcon className="w-3 h-3" /> 
                              {new Date(task.date).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </div>
                      <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 ml-2 shrink-0 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: KALENDAR PENUH */}
        {/* ======================================================== */}
        {activeTab === 'kalendar' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <CalendarDays className="text-indigo-500" /> Kalendar Bulanan
              </h2>
              <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                <span className="font-bold text-slate-700 min-w-[120px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
              {['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'].map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {blanks.map((_, i) => <div key={`blank-${i}`} className="h-20 md:h-28 rounded-2xl bg-slate-50/50"></div>)}
              
              {dayItems.map(day => {
                const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayTasks = tasks.filter(t => t.date === dateString);
                const isToday = new Date().toISOString().split('T')[0] === dateString;

                return (
                  <div 
                    key={day} 
                    className={`h-20 md:h-28 rounded-2xl p-2 md:p-3 border flex flex-col transition-all
                      ${isToday ? 'bg-blue-50 border-blue-300 shadow-sm ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-slate-300'}
                    `}
                  >
                    <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-slate-500'} mb-1`}>{day}</span>
                    <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                      {dayTasks.map(t => (
                        <div key={t.id} className="text-[10px] md:text-xs leading-tight bg-rose-100 text-rose-700 p-1.5 rounded-md truncate font-medium">
                          {t.text}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-xl inline-flex border border-slate-100">
              <span className="w-3 h-3 bg-rose-100 rounded-full inline-block border border-rose-300"></span>
              Tugasan / Tarikh penting dari Brain Dump akan muncul di sini.
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: KEWANGAN (DUIT) */}
        {/* ======================================================== */}
        {activeTab === 'kewangan' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KAD SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-bold mb-1">Baki Semasa</p>
                    <h3 className={`text-3xl font-black ${balance >= 0 ? 'text-slate-800' : 'text-red-500'}`}>
                      RM {balance.toFixed(2)}
                    </h3>
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

            {/* FORM TAMBAH & REKOD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* FORM */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-fit">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-slate-800">
                  <DollarSign className="w-5 h-5 text-amber-500" /> Catat Belanja Harini
                </h3>
                <div className="space-y-4">
                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button 
                      onClick={() => setTransType('out')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${transType === 'out' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500'}`}
                    >Duit Keluar</button>
                    <button 
                      onClick={() => setTransType('in')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${transType === 'in' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
                    >Duit Masuk</button>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Jumlah (RM)</label>
                    <input 
                      type="number" 
                      value={transAmount}
                      onChange={(e) => setTransAmount(e.target.value)}
                      placeholder="Contoh: 12.50"
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Nota / Untuk apa?</label>
                    <input 
                      type="text" 
                      value={transNote}
                      onChange={(e) => setTransNote(e.target.value)}
                      placeholder="Contoh: Nasi ayam, topup..."
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50"
                    />
                  </div>

                  <button 
                    onClick={addTransaction}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-colors mt-2"
                  >
                    Simpan Rekod
                  </button>
                </div>
              </div>

              {/* REKOD LIST */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-5 text-slate-800">Sejarah Transaksi</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">Belum ada rekod kewangan.</div>
                  ) : (
                    transactions.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${t.type === 'in' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {t.type === 'in' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 text-sm">{t.note}</p>
                            <p className="text-xs text-slate-400 font-medium">
                              {new Date(t.date).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-black ${t.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {t.type === 'in' ? '+' : '-'} RM {t.amount.toFixed(2)}
                          </span>
                          <button onClick={() => deleteTransaction(t.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}