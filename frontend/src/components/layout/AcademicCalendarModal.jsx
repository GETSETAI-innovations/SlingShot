import React, { useState, useEffect } from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CALENDAR_EVENTS = [
  // January
  {
    id: 'jan-1',
    month: 0,
    day: 15,
    endDay: 18,
    dateStr: 'Jan 15 - 18',
    title: '4th CG State Championship',
    hindiTitle: '4थी छत्तीसगढ़ राज्य स्लिंगशॉट चैम्पियनशिप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Raipur Indoor Sports Range',
    eligibility: 'Senior Men & Women (18+)',
    status: 'Registration Open',
    statusType: 'open',
  },
  {
    id: 'jan-2',
    month: 0,
    day: 26,
    endDay: 26,
    dateStr: 'Jan 26',
    title: 'Republic Day Youth Target Cup',
    hindiTitle: 'गणतंत्र दिवस युवा टारगेट कप',
    category: 'academic',
    categoryLabel: 'Academic / School Meet',
    venue: 'All 33 District Grounds',
    eligibility: 'School Students (U-14 & U-17)',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // February
  {
    id: 'feb-1',
    month: 1,
    day: 5,
    endDay: 8,
    dateStr: 'Feb 5 - 8',
    title: '33 Districts Inter-School Trials',
    hindiTitle: '33 जिला अंतर-स्कूली चयन प्रतियोगिता',
    category: 'trials',
    categoryLabel: 'District Trials',
    venue: 'District Sports Complexes',
    eligibility: 'Junior Athletes (Age 10-17)',
    status: 'Registration Open',
    statusType: 'open',
  },
  {
    id: 'feb-2',
    month: 1,
    day: 20,
    endDay: 22,
    dateStr: 'Feb 20 - 22',
    title: 'Inter-District Slingshot League',
    hindiTitle: 'अंतर-जिला स्लिंगशॉट लीग',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Regional Sports Arenas',
    eligibility: 'District Qualified Squads',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // March
  {
    id: 'mar-1',
    month: 2,
    day: 10,
    endDay: 12,
    dateStr: 'Mar 10 - 12',
    title: 'Bastar Tribal Heritage Cup',
    hindiTitle: 'बस्तर जनजातीय हेरिटेज कप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Jagdalpur Range, Bastar',
    eligibility: 'Open Category & Traditional Shooters',
    status: 'Registration Open',
    statusType: 'open',
  },
  {
    id: 'mar-2',
    month: 2,
    day: 25,
    endDay: 28,
    dateStr: 'Mar 25 - 28',
    title: 'Spring Break Coaching Workshop',
    hindiTitle: 'स्प्रिंग ब्रेक स्लिंगशॉट प्रशिक्षण कार्यशाला',
    category: 'academic',
    categoryLabel: 'Academic / Camps',
    venue: 'Raipur Sports Academy Complex',
    eligibility: 'School & College Athletes',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // April
  {
    id: 'apr-1',
    month: 3,
    day: 1,
    endDay: 15,
    dateStr: 'Apr 1 - 15',
    title: 'Academic Session Talent Hunt & UID Enrollment',
    hindiTitle: 'शैक्षणिक सत्र प्रतिभा खोज एवं यूआईडी नामांकन',
    category: 'academic',
    categoryLabel: 'Academic / Enrollment',
    venue: 'Online State Portal & District Centres',
    eligibility: 'All Students & New Athletes',
    status: 'Open for Application',
    statusType: 'open',
  },
  {
    id: 'apr-2',
    month: 3,
    day: 5,
    endDay: 8,
    dateStr: 'Apr 5 - 8',
    title: 'Youth National Qualifiers',
    hindiTitle: 'राष्ट्रीय युवा क्वालिफायर',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Bilaspur Sports Complex',
    eligibility: 'U-14 & U-17 State Ranked Athletes',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // May
  {
    id: 'may-1',
    month: 4,
    day: 1,
    endDay: 20,
    dateStr: 'May 1 - 20',
    title: 'Summer High-Performance Coaching Camp',
    hindiTitle: 'ग्रीष्मकालीन उच्च प्रदर्शन कोचिंग शिविर',
    category: 'academic',
    categoryLabel: 'Academic / Camps',
    venue: 'State Olympic Range, Raipur',
    eligibility: 'Merit Ranked Athletes & Medalists',
    status: 'Enrollment Open',
    statusType: 'open',
  },
  {
    id: 'may-2',
    month: 4,
    day: 15,
    endDay: 17,
    dateStr: 'May 15 - 17',
    title: "Women's Precision Slingshot Championship",
    hindiTitle: 'महिला प्रिसिजन स्लिंगशॉट चैम्पियनशिप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Durg-Bhilai Indoor Stadium',
    eligibility: 'Girls & Women (Junior & Senior)',
    status: 'Registration Open',
    statusType: 'open',
  },
  // June
  {
    id: 'jun-1',
    month: 5,
    day: 8,
    endDay: 10,
    dateStr: 'Jun 8 - 10',
    title: 'Speed Fire Target Challenge',
    hindiTitle: 'स्पीड फायर टारगेट चैलेंज',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Raipur Central Sports Range',
    eligibility: 'Open Division',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  {
    id: 'jun-2',
    month: 5,
    day: 23,
    endDay: 23,
    dateStr: 'Jun 23',
    title: 'Olympic Day Slingshot Exhibition',
    hindiTitle: 'अंतर्राष्ट्रीय ओलंपिक दिवस स्लिंगशॉट प्रदर्शनी',
    category: 'academic',
    categoryLabel: 'Academic / School Meet',
    venue: 'All District Headquarters',
    eligibility: 'Open to All Students',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // July
  {
    id: 'jul-1',
    month: 6,
    day: 12,
    endDay: 14,
    dateStr: 'Jul 12 - 14',
    title: 'Coach & Technical Official Certification',
    hindiTitle: 'कोच एवं तकनीकी अधिकारी प्रमाणन पाठ्यक्रम',
    category: 'academic',
    categoryLabel: 'Academic / Camps',
    venue: 'Physical Education College, Raipur',
    eligibility: 'Physical Instructors & Senior Athletes',
    status: 'Registration Open',
    statusType: 'open',
  },
  {
    id: 'jul-2',
    month: 6,
    day: 20,
    endDay: 22,
    dateStr: 'Jul 20 - 22',
    title: 'Monsoon Cup Championship',
    hindiTitle: 'मानसून कप चैम्पियनशिप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Ambikapur Stadium, Surguja',
    eligibility: 'Senior & Junior Division',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // August
  {
    id: 'aug-1',
    month: 7,
    day: 12,
    endDay: 14,
    dateStr: 'Aug 12 - 14',
    title: 'Para Slingshot State Championship',
    hindiTitle: 'पैरा स्लिंगशॉट राज्य चैम्पियनशिप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Raipur Para Sports Centre',
    eligibility: 'Para-Athletes (All Categories)',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  {
    id: 'aug-2',
    month: 7,
    day: 29,
    endDay: 29,
    dateStr: 'Aug 29',
    title: 'National Sports Day Target Cup',
    hindiTitle: 'राष्ट्रीय खेल दिवस टारगेट कप',
    category: 'academic',
    categoryLabel: 'Academic / School Meet',
    venue: 'Statewide Inter-School Level',
    eligibility: 'School & College Students',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // September
  {
    id: 'sep-1',
    month: 8,
    day: 25,
    endDay: 28,
    dateStr: 'Sep 25 - 28',
    title: 'Grand Finale State Championship',
    hindiTitle: 'ग्रैंड फिनाले राज्य चैम्पियनशिप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Sardar Vallabhbhai Patel Indoor Range, Raipur',
    eligibility: 'All Qualified District Champions',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // October
  {
    id: 'oct-1',
    month: 9,
    day: 10,
    endDay: 13,
    dateStr: 'Oct 10 - 13',
    title: 'National Team Selection Trials',
    hindiTitle: 'राष्ट्रीय टीम चयन ट्रायल्स',
    category: 'trials',
    categoryLabel: 'District Trials',
    venue: 'State Training Academy, Raipur',
    eligibility: 'Top 32 Ranked State Athletes',
    status: 'By Invitation',
    statusType: 'invitation',
  },
  // November
  {
    id: 'nov-1',
    month: 10,
    day: 1,
    endDay: 3,
    dateStr: 'Nov 1 - 3',
    title: 'Chhattisgarh Rajyotsava Statehood Trophy',
    hindiTitle: 'छत्तीसगढ़ राज्योत्सव राज्य स्थापना दिवस ट्रॉफी',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Raipur State Sports Arena',
    eligibility: 'Open to All 33 Districts',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  // December
  {
    id: 'dec-1',
    month: 11,
    day: 12,
    endDay: 16,
    dateStr: 'Dec 12 - 16',
    title: 'All-India National Slingshot Championship',
    hindiTitle: 'अखिल भारतीय राष्ट्रीय स्लिंगशॉट चैम्पियनशिप',
    category: 'championship',
    categoryLabel: 'State Championship',
    venue: 'Sardar Vallabhbhai Patel Stadium, Raipur',
    eligibility: 'State Selected Representatives',
    status: 'Upcoming',
    statusType: 'upcoming',
  },
  {
    id: 'dec-2',
    month: 11,
    day: 22,
    endDay: 28,
    dateStr: 'Dec 22 - 28',
    title: 'Winter Vacation Intensive Camp',
    hindiTitle: 'शीतकालीन अवकाश गहन प्रशिक्षण शिविर',
    category: 'academic',
    categoryLabel: 'Academic / Camps',
    venue: 'State Training Academy, Raipur',
    eligibility: 'Youth & Junior Athletes',
    status: 'Upcoming',
    statusType: 'upcoming',
  }
];

export default function AcademicCalendarModal({ isOpen, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = Jan
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const monthEvents = CALENDAR_EVENTS.filter((ev) => ev.month === selectedMonth);
  const filteredEvents = monthEvents.filter((ev) => {
    if (activeCategory === 'all') return true;
    return ev.category === activeCategory;
  });

  const daysInMonth = new Date(2026, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(2026, selectedMonth, 1).getDay();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Soft Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Clean, Simple & Attractive Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Simple Top Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-orange-50 via-white to-blue-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 font-bold text-base">
              📅
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                Academic &amp; Sports Calendar
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                छ.ग. शैक्षणिक एवं राज्य स्लिंगशॉट खेल कैलेंडर
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer font-bold"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Non-Scrolling 12-Month Responsive Grid Bar */}
        <div className="px-4 sm:px-6 py-2 bg-slate-50 border-b border-slate-100">
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-1.5 w-full">
            {MONTH_NAMES.map((m, idx) => {
              const isSelected = selectedMonth === idx;
              const shortName = m.slice(0, 3);
              return (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedMonth(idx);
                    setSelectedDay(null);
                  }}
                  className={`py-1.5 px-0.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-102'
                      : 'text-slate-600 bg-white hover:bg-slate-200/70 border border-slate-200/80 hover:text-slate-900'
                  }`}
                  type="button"
                  title={m}
                >
                  {shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Main Content: Split Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 overflow-y-auto flex-1 bg-slate-50/60">
          {/* Left Column: Clean Month Grid (5 cols) */}
          <div className="md:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-sm text-slate-900">
                  {MONTH_NAMES[selectedMonth]}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {monthEvents.length} Event{monthEvents.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 mb-1.5 uppercase">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8 sm:h-9" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dayEvents = monthEvents.filter(
                    (ev) => dayNum >= ev.day && dayNum <= (ev.endDay || ev.day)
                  );
                  const isDaySelected = selectedDay === dayNum;
                  const hasDayEvent = dayEvents.length > 0;

                  return (
                    <button
                      key={`day-${dayNum}`}
                      onClick={() => setSelectedDay(isDaySelected ? null : dayNum)}
                      className={`h-8 sm:h-9 rounded-lg text-xs font-semibold flex flex-col items-center justify-center relative transition cursor-pointer ${
                        isDaySelected
                          ? 'bg-slate-900 text-white shadow-sm'
                          : hasDayEvent
                          ? 'bg-orange-100/70 text-orange-950 font-black hover:bg-orange-200/80'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      type="button"
                    >
                      <span>{dayNum}</span>
                      {hasDayEvent && (
                        <span
                          className={`w-1 h-1 rounded-full mt-0.5 ${
                            isDaySelected ? 'bg-orange-400' : 'bg-orange-600'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Legend */}
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>State Meets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>District Trials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>School / Camps</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Event Cards (7 cols) */}
          <div className="md:col-span-7 flex flex-col">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 pb-3 overflow-x-auto scrollbar-none text-xs font-semibold">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                type="button"
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('championship')}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'championship'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
                }`}
                type="button"
              >
                Championships
              </button>
              <button
                onClick={() => setActiveCategory('trials')}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'trials'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
                }`}
                type="button"
              >
                Trials
              </button>
              <button
                onClick={() => setActiveCategory('academic')}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'academic'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
                }`}
                type="button"
              >
                Academic &amp; Camps
              </button>
            </div>

            {/* Event List */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center flex flex-col items-center justify-center my-auto">
                  <span className="text-2xl mb-2">🎯</span>
                  <p className="text-xs text-slate-500">No events found in this category for this month.</p>
                </div>
              ) : (
                filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`bg-white rounded-2xl p-4 border transition-all shadow-sm ${
                      selectedDay && selectedDay >= ev.day && selectedDay <= (ev.endDay || ev.day)
                        ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/20'
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-black text-orange-600 font-mono">
                        {ev.dateStr}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ev.statusType === 'open'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {ev.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">{ev.hindiTitle}</p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="truncate">📍 {ev.venue}</span>
                      <span className="truncate">👥 {ev.eligibility}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
