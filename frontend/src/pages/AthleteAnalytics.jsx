import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceLine
} from 'recharts';
import {
  Target, Timer, Activity, TrendingUp, TrendingDown, Crosshair,
  ChartNoAxesCombined, Calendar, Download,
  CheckCircle2, XCircle, UserRound, History, Gauge, Plus,
  Search, Filter, ArrowUpDown, Upload, Eye, FileSpreadsheet,
  Edit, X, Camera, Trash2, MapPin, Mail, Phone as PhoneIcon,
  CropIcon
} from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { showToastSuccess, showToastError, showToastInfo } from '../utils/toast';
import { apiPutFormData } from '../utils/api';

const DISTRICTS = [
  'Raipur', 'Bastar', 'Bilaspur', 'Durg', 'Surguja', 'Rajnandgaon', 'Korba',
  'Dantewada', 'Sukma', 'Balod', 'Baloda Bazar', 'Balrampur', 'Bemetara', 'Bijapur',
  'Dhamtari', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur',
  'Kabeerdham', 'Kanker', 'Kondagaon', 'Koriya', 'Mahasamund', 'Manpur', 'Mungeli',
  'Narayanpur', 'Raigarh', 'Surajpur', 'Khairagarh-Chhuikhadan-Gandai',
  'Mohla-Manpur-Ambagadh Chowki', 'Sakti', 'Sarangarh-Bilaigarh'
];

const CATEGORIES = [
  'Sub-Junior (U-14)',
  'Junior (U-17)',
  'Senior Open (Men)',
  'Senior Open (Women)',
  'Masters (35+)',
  'Para/Adaptive Division'
];

const DISCIPLINES = [
  '10m Precision Target',
  '15m Distance Bullseye',
  'Rapid Speed Fire',
  'Traditional Slingshot',
  'Para Adaptive Division'
];

// Demonstration training sessions with clearly labelled sample data
const initialSessions = {
  today: {
    id: 'SES-NEW',
    date: new Date().toISOString().split('T')[0],
    name: 'No Practice Session Yet',
    athlete: {
      name: 'Athlete',
      id: 'ESAC-UID',
      district: 'Chhattisgarh',
      category: 'Athlete',
      avatar: ''
    },
    shots: []
  },
  yesterday: {
    id: 'SES-EMPTY',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    name: 'No Previous Session',
    shots: []
  }
};

const historicalProgressData = [
  { day: 'Sep 23', hitRate: 68, avgTime: 1.68, avgDist: 25.2, sessions: 1 },
  { day: 'Sep 24', hitRate: 72, avgTime: 1.64, avgDist: 25.6, sessions: 1 },
  { day: 'Sep 25', hitRate: 70, avgTime: 1.62, avgDist: 25.8, sessions: 2 },
  { day: 'Sep 26', hitRate: 75, avgTime: 1.59, avgDist: 26.0, sessions: 1 },
  { day: 'Sep 27', hitRate: 78, avgTime: 1.55, avgDist: 26.3, sessions: 2 },
  { day: 'Sep 28', hitRate: 70, avgTime: 1.58, avgDist: 26.0, sessions: 1 },
  { day: 'Sep 29', hitRate: 80, avgTime: 1.42, avgDist: 28.5, sessions: 1 }
];

export default function AthleteAnalytics() {
  const { user, loading, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // ALL hooks must be called before any early returns
  const [sessionsData, setSessionsData] = useState(initialSessions);
  const [comparisonPeriod, setComparisonPeriod] = useState('yesterday');
  const [selectedShot, setSelectedShot] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Edit Profile Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    category: '',
    discipline: '',
    dateOfBirth: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [saving, setSaving] = useState(false);

  // Image cropping state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Logout modal state
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Practice session form state
  const [practiceFormOpen, setPracticeFormOpen] = useState(false);
  const [practiceData, setPracticeData] = useState({
    date: new Date().toISOString().split('T')[0],
    sessionName: '',
    totalShots: '',
    hits: '',
    misses: '',
    avgTime: '',
    avgDistance: '',
    bestTime: '',
    targetDistance: '10m',
    notes: ''
  });
  const [savingPractice, setSavingPractice] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutModalOpen(false);
    showToastSuccess('Logged out successfully!');
    navigate('/');
  };

  // Load practice data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(`practice_data_${user?.id}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setSessionsData(parsed);
      } else {
        // First time user - start with fresh data
        setSessionsData(initialSessions);
      }
    } catch (error) {
      console.error('Error loading practice data:', error);
      setSessionsData(initialSessions);
    }
  }, [user?.id]);

  // Save practice data
  const handleSavePractice = async () => {
    setSavingPractice(true);
    try {
      const totalShots = parseInt(practiceData.totalShots) || 0;
      const hits = parseInt(practiceData.hits) || 0;
      const misses = parseInt(practiceData.misses) || 0;
      const avgTime = parseFloat(practiceData.avgTime) || 0;
      const avgDistance = parseFloat(practiceData.avgDistance) || 0;
      const bestTime = parseFloat(practiceData.bestTime) || 0;

      // Generate shots from practice data
      const newShots = [];
      for (let i = 1; i <= totalShots; i++) {
        const isHit = i <= hits;
        newShots.push({
          id: i,
          time: new Date().toLocaleTimeString(),
          distance: avgDistance + (Math.random() * 2 - 1),
          duration: avgTime + (Math.random() * 0.2 - 0.1),
          hit: isHit,
          result: isHit ? (Math.random() > 0.7 ? 'Bullseye (10X)' : 'Inner Ring (9)') : 'Deflection',
          prevDiff: '0.00s',
          source: 'Manual Entry',
          confidence: 'Manual'
        });
      }

      const newSession = {
        id: `SES-${Date.now()}`,
        date: practiceData.date,
        name: practiceData.sessionName || 'Practice Session',
        athlete: {
          name: user?.name || user?.fullName || 'Athlete',
          id: user?.esacId || user?.phone || 'N/A',
          district: user?.district || 'N/A',
          category: user?.category || 'Athlete',
          avatar: user?.profilePicture || ''
        },
        shots: newShots
      };

      // Update sessions data
      const updatedData = {
        ...sessionsData,
        today: newSession,
        yesterday: sessionsData.today // Move today to yesterday
      };

      setSessionsData(updatedData);

      // Save to localStorage
      localStorage.setItem(`practice_data_${user?.id}`, JSON.stringify(updatedData));

      showToastSuccess('Practice session saved successfully!');
      setPracticeFormOpen(false);
      setPracticeData({
        date: new Date().toISOString().split('T')[0],
        sessionName: '',
        totalShots: '',
        hits: '',
        misses: '',
        avgTime: '',
        avgDistance: '',
        bestTime: '',
        targetDistance: '10m',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving practice data:', error);
      showToastError('Error saving practice data. Please try again.');
    } finally {
      setSavingPractice(false);
    }
  };

  // Active chart metric switches
  const [dailyMetric, setDailyMetric] = useState('time'); // 'time' or 'distance'
  const [trendMetric, setTrendMetric] = useState('time'); // 'time', 'distance', 'hitRate'

  // Ref for GSAP animations
  const kpiRefs = useRef([]);

  // Compute Today's actual session metrics
  const todayMetrics = useMemo(() => {
    const shots = sessionsData.today.shots;
    const total = shots.length;
    if (total === 0) return { total: 0, hitRate: 0, avgTime: 0, avgDist: 0, bestTime: 0, hits: 0, misses: 0 };
    const hits = shots.filter(s => s.hit).length;
    const hitRate = Math.round((hits / total) * 100);
    const avgTime = Number((shots.reduce((acc, s) => acc + s.duration, 0) / total).toFixed(2));
    const avgDist = Number((shots.reduce((acc, s) => acc + s.distance, 0) / total).toFixed(1));
    const bestTime = Number(Math.min(...shots.filter(s => s.hit).map(s => s.duration)).toFixed(2));
    return { total, hitRate, avgTime, avgDist, bestTime, hits, misses: total - hits };
  }, [sessionsData.today.shots]);

  // Compute Yesterday's metrics
  const yesterdayMetrics = useMemo(() => {
    const shots = sessionsData.yesterday.shots;
    const total = shots.length;
    if (total === 0) return { total: 0, hitRate: 0, avgTime: 0, avgDist: 0, bestTime: 0, hits: 0, misses: 0 };
    const hits = shots.filter(s => s.hit).length;
    const hitRate = Math.round((hits / total) * 100);
    const avgTime = Number((shots.reduce((acc, s) => acc + s.duration, 0) / total).toFixed(2));
    const avgDist = Number((shots.reduce((acc, s) => acc + s.distance, 0) / total).toFixed(1));
    const bestTime = Number(Math.min(...shots.filter(s => s.hit).map(s => s.duration)).toFixed(2));
    return { total, hitRate, avgTime, avgDist, bestTime, hits, misses: total - hits };
  }, [sessionsData.yesterday.shots]);

  // Metric comparisons (Today vs Yesterday)
  const comparison = useMemo(() => {
    const timeDiff = Number((todayMetrics.avgTime - yesterdayMetrics.avgTime).toFixed(2)); // negative is faster = better
    const distDiff = Number((todayMetrics.avgDist - yesterdayMetrics.avgDist).toFixed(1));
    const rateDiff = todayMetrics.hitRate - yesterdayMetrics.hitRate; // positive is better
    const shotsDiff = todayMetrics.total - yesterdayMetrics.total;
    return { timeDiff, distDiff, rateDiff, shotsDiff };
  }, [todayMetrics, yesterdayMetrics]);

  // GSAP Counter Animation
  useEffect(() => {
    if (kpiRefs.current.length > 0) {
      kpiRefs.current.forEach((el) => {
        if (!el) return;
        const targetValue = parseFloat(el.getAttribute('data-value') || '0');
        gsap.fromTo(el,
          { opacity: 0.4, y: 8 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      });
    }
  }, [todayMetrics]);

  // Filtered & Sorted Shots Table
  const filteredShots = useMemo(() => {
    return sessionsData.today.shots
      .filter((s) => {
        const matchesSearch = s.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.id.toString().includes(searchTerm) ||
          s.time.includes(searchTerm);
        const matchesResult = resultFilter === 'all' ? true : resultFilter === 'hit' ? s.hit : !s.hit;
        return matchesSearch && matchesResult;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [sessionsData.today.shots, searchTerm, resultFilter, sortField, sortAsc]);

  // Redirect to home if not logged in
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Helper function to get user name
  const getUserName = () => {
    if (!user) return '';
    return user.fullName || user.name || user.email || 'User';
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('email', editData.email);
      formData.append('phone', editData.phone);
      formData.append('district', editData.district);
      formData.append('category', editData.category);
      formData.append('discipline', editData.discipline);
      formData.append('dateOfBirth', editData.dateOfBirth);

      if (croppedImage) {
        // Send base64 directly - backend will handle it
        formData.append('profilePicture', croppedImage);
      }

      const apiResponse = await apiPutFormData('/api/auth/updatedetails', formData);

      if (apiResponse.ok) {
        const resData = await apiResponse.json();
        // Update user context with new data
        updateUser(resData.data.user);
        showToastSuccess('Profile updated successfully!');
        setEditModalOpen(false);
        setCroppedImage(null);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      showToastError('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Handle image cropping
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleApplyCrop = () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageToCrop;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCroppedImage(croppedDataUrl);
      setPreviewImage(croppedDataUrl);
      setCropModalOpen(false);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    };
  };

  // Export session data as clean CSV
  const exportSessionCSV = () => {
    const headers = 'Shot_ID,Timestamp,Draw_Back_cm,Impact_Time_sec,Hit_Status,Result_Detail,Source,Confidence\n';
    const rows = sessionsData.today.shots.map(s =>
      `${s.id},"${s.time}",${s.distance},${s.duration},${s.hit ? 'HIT' : 'MISS'},"${s.result}","${s.source || 'Manual'}","${s.confidence || 'N/A'}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Athlete_Telemetry_${sessionsData.today.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pie chart data
  const pieData = [
    { name: 'Successful Hits', value: todayMetrics.hits, color: '#10B981' },
    { name: 'Misses', value: todayMetrics.misses, color: '#EF4444' }
  ];

  // Daily bar comparison data
  const dailyBarData = [
    {
      period: 'Yesterday',
      value: dailyMetric === 'time' ? yesterdayMetrics.avgTime : yesterdayMetrics.avgDist,
      unit: dailyMetric === 'time' ? 's' : 'cm'
    },
    {
      period: 'Today',
      value: dailyMetric === 'time' ? todayMetrics.avgTime : todayMetrics.avgDist,
      unit: dailyMetric === 'time' ? 's' : 'cm'
    }
  ];

  // Draw-back consistency scatter plot data
  const consistencyData = sessionsData.today.shots.map((s, idx) => ({
    shot: `#${s.id}`,
    distance: s.distance,
    avg: todayMetrics.avgDist
  }));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-20">
      {/* 1. TOP DASHBOARD HEADER */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Athlete Info & Lab Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture.startsWith('http') ? user.profilePicture : `${import.meta.env.VITE_API_URL}${user.profilePicture}`}
                    alt={getUserName()}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-esac-saffron shadow-sm"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-esac-saffron to-orange-600 border-2 border-esac-saffron shadow-sm flex items-center justify-center text-white font-black text-lg ${user.profilePicture ? 'hidden' : ''}`}>
                  {getUserName().charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    setEditData({
                      name: user.name || user.fullName || '',
                      email: user.email || '',
                      phone: user.phone || '',
                      district: user.district || '',
                      category: user.category || '',
                      discipline: user.discipline || '',
                      dateOfBirth: user.dateOfBirth || ''
                    });
                    setPreviewImage(user.profilePicture ? (user.profilePicture.startsWith('http') ? user.profilePicture : `${import.meta.env.VITE_API_URL}${user.profilePicture}`) : null);
                    setEditModalOpen(true);
                  }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-full flex items-center justify-center shadow-md transition cursor-pointer"
                  type="button"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-esac-saffron bg-orange-950/70 border border-orange-500/30 px-2 py-0.5 rounded-full">
                    Performance Lab
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                    SESSION READY
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
                  {getUserName()}'s Performance Lab
                </h1>
                <div className="text-xs text-slate-400 flex items-center gap-2 flex-wrap font-mono">
                  <span>{user.esacId || user.phone}</span>
                  <span>•</span>
                  <span className="text-slate-300 font-sans">{user.category || 'Athlete'}</span>
                  <span>•</span>
                  <span className="text-esac-blue font-sans font-semibold">{user.homeDistrict || 'Chhattisgarh'}</span>
                </div>
              </div>
            </div>

            {/* Session Controls & Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 font-medium">Session:</span>
                <span className="font-bold text-white">{sessionsData.today.date}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-slate-400 font-medium">Compare:</span>
                <select
                  value={comparisonPeriod}
                  onChange={(e) => setComparisonPeriod(e.target.value)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  <option value="yesterday" className="bg-slate-800 text-white">Yesterday</option>
                  <option value="7days" className="bg-slate-800 text-white">Last 7 Days</option>
                  <option value="30days" className="bg-slate-800 text-white">Last 30 Days</option>
                </select>
              </div>

              <button
                onClick={exportSessionCSV}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Report</span>
              </button>

              <button
                onClick={() => setPracticeFormOpen(true)}
                className="px-4 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record Practice</span>
              </button>

              <button
                onClick={() => setLogoutModalOpen(true)}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-2 font-medium">
            "Measure every shot. Track every improvement. Build precision through performance data."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* DEMONSTRATION DATA NOTICE */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>
              <strong>Demonstration &amp; Calibrated Data:</strong> Figures and video markers are project-calibrated sample telemetry for precision athlete testing.
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold text-amber-800 uppercase bg-amber-100 px-2 py-0.5 rounded">
            Range Sensor v2.4 Active
          </span>
        </div>

        {/* 2. KEY PERFORMANCE INDICATOR CARDS (6 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1: Average Hit Time */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Avg Hit Time</span>
              <Timer className="w-4 h-4 text-esac-blue" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-esac-navy" ref={el => kpiRefs.current[0] = el} data-value={todayMetrics.avgTime}>
              {todayMetrics.avgTime}<span className="text-sm font-sans font-bold ml-1 text-slate-500">s</span>
            </div>
            <div className={`mt-2 text-xs font-bold flex items-center gap-1 ${comparison.timeDiff <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {comparison.timeDiff <= 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
              <span>{Math.abs(comparison.timeDiff)}s {comparison.timeDiff <= 0 ? 'faster' : 'slower'}</span>
            </div>
          </div>

          {/* Card 2: Average Draw-Back Distance */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Avg Draw-Back</span>
              <Crosshair className="w-4 h-4 text-esac-saffron" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-esac-navy" ref={el => kpiRefs.current[1] = el} data-value={todayMetrics.avgDist}>
              {todayMetrics.avgDist}<span className="text-sm font-sans font-bold ml-1 text-slate-500">cm</span>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-600 flex items-center gap-1">
              <span>{comparison.distDiff >= 0 ? `+${comparison.distDiff}` : comparison.distDiff} cm vs yest</span>
            </div>
          </div>

          {/* Card 3: Balloon Hit Rate */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Balloon Hit Rate</span>
              <Gauge className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-esac-navy" ref={el => kpiRefs.current[2] = el} data-value={todayMetrics.hitRate}>
              {todayMetrics.hitRate}<span className="text-sm font-sans font-bold ml-1 text-slate-500">%</span>
            </div>
            <div className={`mt-2 text-xs font-bold flex items-center gap-1 ${comparison.rateDiff >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {comparison.rateDiff >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{comparison.rateDiff >= 0 ? `+${comparison.rateDiff}%` : `${comparison.rateDiff}%`} pts</span>
            </div>
          </div>

          {/* Card 4: Total Shots */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Shots</span>
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-esac-navy" ref={el => kpiRefs.current[3] = el} data-value={todayMetrics.total}>
              {todayMetrics.total}
            </div>
            <div className="mt-2 text-xs font-semibold text-slate-500">
              {todayMetrics.hits} Hits / {todayMetrics.misses} Miss
            </div>
          </div>

          {/* Card 5: Best Hit Time */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Best Hit Time</span>
              <Target className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600" ref={el => kpiRefs.current[4] = el} data-value={todayMetrics.bestTime}>
              {todayMetrics.bestTime}<span className="text-sm font-sans font-bold ml-1 text-slate-500">s</span>
            </div>
            <div className="mt-2 text-[11px] font-bold text-slate-500">
              Shot #4 Release
            </div>
          </div>

          {/* Card 6: Performance Improvement */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Improvement</span>
              <ChartNoAxesCombined className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg sm:text-xl font-black font-mono text-emerald-700">
              +10.0% Efficiency
            </div>
            <div className="mt-2 text-[11px] font-semibold text-slate-600">
              Lower release latency
            </div>
          </div>
        </div>

        {/* 3. TODAY VS YESTERDAY DEDICATED COMPARISON SECTION */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold text-esac-saffron uppercase tracking-widest">
                Direct Comparative Analysis
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-esac-navy">
                TODAY'S PERFORMANCE VS YESTERDAY
              </h2>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-blue-50 text-esac-blue border border-blue-200 rounded-full text-xs font-bold">
              Automatic Metric Differential
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TODAY CARD */}
            <div className="bg-blue-50/50 rounded-2xl p-6 border-2 border-esac-blue/30 relative">
              <span className="absolute top-4 right-4 bg-esac-blue text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                TODAY'S SESSION
              </span>
              <h3 className="text-lg font-black text-esac-navy mb-4">
                Today ({sessionsData.today.date})
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                  <span className="font-sans text-slate-600">Average Hit Time:</span>
                  <strong className="text-slate-900 text-base">{todayMetrics.avgTime} seconds</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                  <span className="font-sans text-slate-600">Average Draw-Back Distance:</span>
                  <strong className="text-slate-900 text-base">{todayMetrics.avgDist} cm</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                  <span className="font-sans text-slate-600">Total Shots Recorded:</span>
                  <strong className="text-slate-900 text-base">{todayMetrics.total}</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                  <span className="font-sans text-slate-600">Successful Balloon Hits:</span>
                  <strong className="text-emerald-700 text-base">{todayMetrics.hits}</strong>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="font-sans text-slate-600">Hit Percentage:</span>
                  <strong className="text-emerald-700 text-base font-black">{todayMetrics.hitRate}%</strong>
                </div>
              </div>
            </div>

            {/* YESTERDAY CARD */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
              <span className="absolute top-4 right-4 bg-slate-300 text-slate-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                PREVIOUS SESSION
              </span>
              <h3 className="text-lg font-black text-slate-700 mb-4">
                Yesterday ({sessionsData.yesterday.date})
              </h3>
              <div className="space-y-3 font-mono text-sm text-slate-700">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                  <span className="font-sans text-slate-500">Average Hit Time:</span>
                  <span className="font-bold text-slate-800 text-base">{yesterdayMetrics.avgTime} seconds</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                  <span className="font-sans text-slate-500">Average Draw-Back Distance:</span>
                  <span className="font-bold text-slate-800 text-base">{yesterdayMetrics.avgDist} cm</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                  <span className="font-sans text-slate-500">Total Shots Recorded:</span>
                  <span className="font-bold text-slate-800 text-base">{yesterdayMetrics.total}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                  <span className="font-sans text-slate-500">Successful Balloon Hits:</span>
                  <span className="font-bold text-slate-800 text-base">{yesterdayMetrics.hits}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="font-sans text-slate-500">Hit Percentage:</span>
                  <span className="font-bold text-slate-800 text-base">{yesterdayMetrics.hitRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Absolute & Percentage Delta Summary Strip */}
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Hit Time Differential</span>
              <div className="text-xl font-black font-mono text-emerald-600 mt-1">
                {Math.abs(comparison.timeDiff)}s Faster
              </div>
              <span className="text-[11px] text-slate-500">From {yesterdayMetrics.avgTime}s to {todayMetrics.avgTime}s</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Draw-Back Extension</span>
              <div className="text-xl font-black font-mono text-blue-600 mt-1">
                +{comparison.distDiff} cm Draw
              </div>
              <span className="text-[11px] text-slate-500">From {yesterdayMetrics.avgDist}cm to {todayMetrics.avgDist}cm</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Accuracy Improvement</span>
              <div className="text-xl font-black font-mono text-emerald-600 mt-1">
                +{comparison.rateDiff} Percentage Pts
              </div>
              <span className="text-[11px] text-slate-500">From {yesterdayMetrics.hitRate}% to {todayMetrics.hitRate}%</span>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart A: Daily Performance Bar Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-esac-navy">A. Daily Performance Comparison</h3>
                <p className="text-xs text-slate-500">Side-by-side metric comparison between consecutive sessions</p>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setDailyMetric('time')}
                  className={`px-2.5 py-1 rounded-md transition ${dailyMetric === 'time' ? 'bg-white shadow-xs text-esac-blue' : 'text-slate-600'}`}
                >
                  Hit Time (s)
                </button>
                <button
                  onClick={() => setDailyMetric('distance')}
                  className={`px-2.5 py-1 rounded-md transition ${dailyMetric === 'distance' ? 'bg-white shadow-xs text-esac-saffron' : 'text-slate-600'}`}
                >
                  Draw-Back (cm)
                </button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="period" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} unit={dailyMetric === 'time' ? 's' : 'cm'} />
                  <Tooltip
                    formatter={(val) => [`${val} ${dailyMetric === 'time' ? 'seconds' : 'cm'}`, dailyMetric === 'time' ? 'Avg Hit Time' : 'Avg Draw-Back']}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px' }}
                  />
                  <Bar
                    dataKey="value"
                    fill={dailyMetric === 'time' ? '#2563EB' : '#F97316'}
                    radius={[8, 8, 0, 0]}
                    barSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart B: Shot Accuracy Pie Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-esac-navy">B. Shot Accuracy Distribution</h3>
                <p className="text-xs text-slate-500">Hit vs Miss breakdown for {sessionsData.today.shots.length} shots</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {todayMetrics.hitRate}% Success Rate
              </span>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart C: Performance Trend Line Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-esac-navy">C. 7-Day Performance Trend</h3>
                <p className="text-xs text-slate-500">Historical daily telemetry trajectory</p>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setTrendMetric('time')}
                  className={`px-2 py-1 rounded-md transition ${trendMetric === 'time' ? 'bg-white shadow-xs text-esac-blue' : 'text-slate-600'}`}
                >
                  Hit Time
                </button>
                <button
                  onClick={() => setTrendMetric('distance')}
                  className={`px-2 py-1 rounded-md transition ${trendMetric === 'distance' ? 'bg-white shadow-xs text-esac-saffron' : 'text-slate-600'}`}
                >
                  Draw-Back
                </button>
                <button
                  onClick={() => setTrendMetric('hitRate')}
                  className={`px-2 py-1 rounded-md transition ${trendMetric === 'hitRate' ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-600'}`}
                >
                  Hit Rate
                </button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalProgressData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey={trendMetric === 'time' ? 'avgTime' : trendMetric === 'distance' ? 'avgDist' : 'hitRate'}
                    stroke={trendMetric === 'time' ? '#2563EB' : trendMetric === 'distance' ? '#F97316' : '#10B981'}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart E: Draw-Back Consistency Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-esac-navy">E. Draw-Back Consistency (Today)</h3>
                <p className="text-xs text-slate-500">Variation around session mean draw length ({todayMetrics.avgDist} cm)</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ±0.8 cm StDev
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consistencyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="shot" tick={{ fill: '#475569', fontSize: 11 }} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fill: '#475569', fontSize: 12 }} unit="cm" />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px' }} />
                  <ReferenceLine y={todayMetrics.avgDist} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'Mean', fill: '#EF4444', fontSize: 10 }} />
                  <Line
                    type="step"
                    dataKey="distance"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={{ r: 5, fill: '#F97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5. SHOT-BY-SHOT PERFORMANCE TABLE */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="text-xs font-bold text-esac-blue uppercase tracking-widest">
                Telemetry Log
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-esac-navy">
                Shot-by-Shot Performance Table
              </h2>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search shot ID, result..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-esac-blue w-48"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 font-bold cursor-pointer"
              >
                <option value="all">All Results</option>
                <option value="hit">Hits Only</option>
                <option value="miss">Misses Only</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3 cursor-pointer" onClick={() => { setSortField('id'); setSortAsc(!sortAsc); }}>
                    <span className="flex items-center gap-1">Shot # <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="py-3 px-3">Date &amp; Time</th>
                  <th className="py-3 px-3 cursor-pointer" onClick={() => { setSortField('distance'); setSortAsc(!sortAsc); }}>
                    <span className="flex items-center gap-1">Draw-Back (cm) <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="py-3 px-3 cursor-pointer" onClick={() => { setSortField('duration'); setSortAsc(!sortAsc); }}>
                    <span className="flex items-center gap-1">Release-to-Impact (s) <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="py-3 px-3">Balloon Hit</th>
                  <th className="py-3 px-3">Shot Result</th>
                  <th className="py-3 px-3">Source &amp; Confidence</th>
                  <th className="py-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredShots.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      Shot #{s.id}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-sans">
                      {s.time}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {s.distance} cm
                    </td>
                    <td className="py-3 px-3 font-bold text-esac-blue">
                      {s.duration} s
                    </td>
                    <td className="py-3 px-3">
                      {s.hit ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> HIT
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" /> MISS
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-700 font-semibold">
                      {s.result}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-sans text-[11px]">
                      {s.source} <span className="font-mono text-slate-400">({s.confidence})</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedShot(s)}
                        className="px-2.5 py-1 text-[11px] font-bold text-esac-blue hover:bg-blue-50 rounded-lg transition cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. ATHLETE PROGRESS SUMMARY: "YOUR PROGRESS, VISUALIZED" */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
            Data-Driven Synthesis
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-esac-navy mb-4">
            YOUR PROGRESS, VISUALIZED
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Release Velocity &amp; Latency
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {comparison.timeDiff <= 0
                  ? `Your average release-to-impact time improved by ${Math.abs(comparison.timeDiff)}s compared with yesterday (${todayMetrics.avgTime}s vs ${yesterdayMetrics.avgTime}s). Faster anchor release is demonstrating increased confidence.`
                  : `Average hit time was ${comparison.timeDiff}s slower than yesterday. Work on releasing cleanly at full draw anchor without hesitation.`
                }
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Draw Consistency Trend
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Draw-back distance maintained a consistent {todayMetrics.avgDist} cm average with standard deviation within 0.8 cm. Band elongation symmetry is optimal for 10m target rounds.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Milestones &amp; Next Objectives
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Achieved Personal Best release of 1.32s on Shot #4. Recommended drill: 5 consecutive 10X hits with draw length locked at 28.5 cm.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* SHOT DETAIL INSPECTION MODAL */}
      <AnimatePresence>
        {selectedShot && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-esac-blue"></span>
                  <h3 className="text-lg font-black text-esac-navy uppercase">
                    Shot #{selectedShot.id} Telemetry Profile
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedShot(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 font-mono text-sm">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-sans font-bold text-slate-500 block">Recorded Time</span>
                  <strong className="text-slate-900 text-base">{selectedShot.time}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-sans font-bold text-slate-500 block">Draw-Back Distance</span>
                  <strong className="text-slate-900 text-base">{selectedShot.distance} cm</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-sans font-bold text-slate-500 block">Release-to-Impact</span>
                  <strong className="text-esac-blue text-base">{selectedShot.duration} s</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-sans font-bold text-slate-500 block">Shot Status</span>
                  <span className={`inline-block font-bold mt-1 text-xs px-2 py-0.5 rounded ${selectedShot.hit ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedShot.hit ? 'BALLOON BURST (HIT)' : 'MISSED TARGET'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1">
                <div><strong>Measurement Source:</strong> {selectedShot.source}</div>
                <div><strong>Confidence Level:</strong> {selectedShot.confidence}</div>
                <div><strong>Result Detail:</strong> {selectedShot.result}</div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedShot(null)}
                  className="px-4 py-2 bg-esac-navy text-white text-xs font-bold rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-esac-navy uppercase">Edit Profile</h2>
                  <p className="text-xs text-slate-500 mt-1">Update your athlete information</p>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  type="button"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="relative">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-esac-saffron"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-esac-saffron to-orange-600 border-2 border-esac-saffron flex items-center justify-center text-white font-black text-2xl">
                        {editData.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <label className="px-3 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload & Crop Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {previewImage && (
                        <button
                          onClick={() => {
                            setCroppedImage(null);
                            setPreviewImage(null);
                          }}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                          type="button"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500">Recommended: Square image, max 2MB</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                      placeholder="9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      District
                    </label>
                    <select
                      value={editData.district}
                      onChange={(e) => setEditData({ ...editData, district: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition cursor-pointer"
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Discipline
                    </label>
                    <select
                      value={editData.discipline}
                      onChange={(e) => setEditData({ ...editData, discipline: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition cursor-pointer"
                    >
                      {DISCIPLINES.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  disabled={saving}
                  className="px-4 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white text-sm font-bold rounded-lg transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  type="button"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Crop Modal */}
      <AnimatePresence>
        {cropModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setCropModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-esac-navy uppercase">Crop Profile Photo</h2>
                  <p className="text-xs text-slate-500 mt-1">Adjust the image to fit the profile picture area</p>
                </div>
                <button
                  onClick={() => setCropModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  type="button"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden mb-4">
                  <Cropper
                    image={imageToCrop}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                    cropShape="round"
                    showGrid={false}
                    objectFit="cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Zoom Level
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(e.target.value)}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-esac-saffron"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setCropModalOpen(false)}
                      className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyCrop}
                      className="px-4 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white text-sm font-bold rounded-lg transition cursor-pointer flex items-center gap-2"
                      type="button"
                    >
                      <CropIcon className="w-4 h-4" />
                      <span>Apply Crop</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Practice Form Modal */}
      <AnimatePresence>
        {practiceFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-center justify-center p-4"
            onClick={() => setPracticeFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-esac-saffron"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-esac-navy uppercase">Record Practice Session</h2>
                  <p className="text-xs text-slate-500 mt-1">Enter your daily practice data to track performance</p>
                </div>
                <button
                  onClick={() => setPracticeFormOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  type="button"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={practiceData.date}
                      onChange={(e) => setPracticeData({ ...practiceData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Session Name
                    </label>
                    <input
                      type="text"
                      value={practiceData.sessionName}
                      onChange={(e) => setPracticeData({ ...practiceData, sessionName: e.target.value })}
                      placeholder="e.g., Morning 10m Practice"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Total Shots
                    </label>
                    <input
                      type="number"
                      value={practiceData.totalShots}
                      onChange={(e) => setPracticeData({ ...practiceData, totalShots: e.target.value })}
                      placeholder="e.g., 30"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Hits
                    </label>
                    <input
                      type="number"
                      value={practiceData.hits}
                      onChange={(e) => setPracticeData({ ...practiceData, hits: e.target.value })}
                      placeholder="e.g., 25"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Misses
                    </label>
                    <input
                      type="number"
                      value={practiceData.misses}
                      onChange={(e) => setPracticeData({ ...practiceData, misses: e.target.value })}
                      placeholder="e.g., 5"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Average Time (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={practiceData.avgTime}
                      onChange={(e) => setPracticeData({ ...practiceData, avgTime: e.target.value })}
                      placeholder="e.g., 1.42"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Average Distance (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={practiceData.avgDistance}
                      onChange={(e) => setPracticeData({ ...practiceData, avgDistance: e.target.value })}
                      placeholder="e.g., 28.5"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Best Time (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={practiceData.bestTime}
                      onChange={(e) => setPracticeData({ ...practiceData, bestTime: e.target.value })}
                      placeholder="e.g., 1.32"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Target Distance
                    </label>
                    <select
                      value={practiceData.targetDistance}
                      onChange={(e) => setPracticeData({ ...practiceData, targetDistance: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition cursor-pointer"
                    >
                      <option value="10m">10m Precision Target</option>
                      <option value="15m">15m Distance Bullseye</option>
                      <option value="rapid">Rapid Speed Fire</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes
                    </label>
                    <textarea
                      value={practiceData.notes}
                      onChange={(e) => setPracticeData({ ...practiceData, notes: e.target.value })}
                      placeholder="Any additional notes about your practice session..."
                      rows="3"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-esac-saffron focus:ring-2 focus:ring-esac-saffron/20 outline-none transition resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setPracticeFormOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePractice}
                  disabled={savingPractice}
                  className="px-4 py-2 bg-esac-saffron hover:bg-esac-saffron-dark text-white text-sm font-bold rounded-lg transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  type="button"
                >
                  {savingPractice ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Session</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {logoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={() => setLogoutModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-500"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-6 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </motion.div>
                </div>

                <div className="relative z-10 text-center">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-black uppercase tracking-tight mb-2"
                  >
                    Confirm Logout
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-red-100 font-medium"
                  >
                    Elite Slingshot Association of Chhattisgarh
                  </motion.p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">
                    Are you sure you want to logout?
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    You will be logged out of your Performance Lab. Your session data will be saved automatically.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Yes, Logout</span>
                  </button>

                  <button
                    onClick={() => setLogoutModalOpen(false)}
                    className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
