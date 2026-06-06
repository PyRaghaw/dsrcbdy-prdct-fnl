'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  Activity, 
  Clock, 
  FileText, 
  Calendar, 
  MessageSquare,
  Smartphone,
  UploadCloud,
  CheckCircle2,
  Users,
  Lock
} from 'lucide-react';
import { Globe3D } from "@/components/ui/3d-globe";
import { StorySection } from "@/components/ui/story-section";

// Components for Hero Accordion
const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }: any) => {
  return (
    <div className="border border-slate-200/60 rounded-2xl bg-white overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between p-5 text-left transition-colors ${isOpen ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-slate-800">{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const careMarkers = [
  { lat: 42.3601, lng: -71.0589, label: "Daughter (Boston)",    color: "#10b981", initials: "AM" },
  { lat: 37.4419, lng: -122.143, label: "Dr. Vance (Stanford)",  color: "#6366f1", initials: "Dr" },
  { lat: 28.6139, lng: 77.2090,  label: "Mom (New Delhi)",       color: "#f59e0b", initials: "Ma" },
  { lat: 51.5074, lng: -0.1278,  label: "Dad (London)",          color: "#0ea5e9", initials: "Pa" },
];

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [viewState, setViewState] = useState<'problem' | 'solution'>('problem');

  return (
    <div className="min-h-screen bg-[#fafaf9] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black tracking-tight text-slate-900 text-lg">
                Discharge<span className="text-indigo-600">Buddy</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Secure
            </span>
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Skip to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Soft abstract background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-40 right-[-100px] w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Left: Copy & CTAs */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              You just got discharged. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400">Your guided recovery</span> <br className="hidden md:block" />
              path begins here.
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
              Transform confusing hospital paperwork into a clear, daily schedule. We guide you and your family through every step of post-op healing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group">
                Begin Your Personalized Journey
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-semibold transition-all shadow-sm">
                View Demo
              </button>
            </div>
          </div>

          {/* Right: Interactive Collapsible Panels */}
          <div className="flex-1 w-full max-w-lg relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 to-slate-100/40 rounded-3xl -rotate-3 scale-105 -z-10" />
            <div className="flex flex-col gap-3">
              <AccordionItem 
                title="Home Medication Tracker" 
                icon={Activity}
                isOpen={activeAccordion === 0}
                onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
              >
                Never miss a pill. Our AI extracts your prescriptions from discharge papers and creates a foolproof, color-coded daily timeline with automated reminders.
              </AccordionItem>
              <AccordionItem 
                title="Follow-up Appointments" 
                icon={Calendar}
                isOpen={activeAccordion === 1}
                onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
              >
                We map out your physical therapy and surgical check-ins. Sync seamlessly with your calendar and get proactive preparation tips before you go.
              </AccordionItem>
              <AccordionItem 
                title="Daily Symptom Logging" 
                icon={FileText}
                isOpen={activeAccordion === 2}
                onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}
              >
                Track pain levels, incision healing, and vitals. If something looks irregular, Discharge Buddy immediately alerts your designated care circle.
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING GSAP SECTION */}
      <StorySection />

      {/* PROBLEM VS SOLUTION TOGGLE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">The difference is absolute clarity.</h2>
            <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto">Hospital discharge packets are notoriously confusing. See how we instantly transform a chaotic paper stack into peace of mind.</p>
            <div className="mt-10 inline-flex bg-slate-100 p-1.5 rounded-full border border-slate-200">
              <button
                onClick={() => setViewState('problem')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${viewState === 'problem' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                The Fog & Paper Chaos
              </button>
              <button
                onClick={() => setViewState('solution')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${viewState === 'solution' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                The Discharge Buddy Way
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              {viewState === 'problem' ? (
                <motion.div
                  key="problem"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col items-center justify-center bg-rose-50/50 rounded-2xl border border-rose-100 relative"
                >
                  <div className="w-64 h-80 bg-white border border-slate-200 shadow-xl -rotate-6 p-6 flex flex-col gap-4 relative z-10">
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-3 w-5/6 bg-slate-100 rounded" />
                    <div className="mt-4 text-xs font-bold text-red-500">WARNING: DO NOT EXCEED DOSAGE</div>
                    <div className="h-2 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-3/4 bg-slate-100 rounded" />
                    <div className="mt-auto flex justify-end">
                      <div className="w-16 h-16 rounded-full border-4 border-rose-500/30 flex items-center justify-center rotate-12">
                        <span className="text-rose-500 font-bold text-xs uppercase">Confusing</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute w-64 h-80 bg-white border border-slate-200 shadow-lg rotate-3 p-6 opacity-50" />
                </motion.div>
              ) : (
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center bg-indigo-50/30 rounded-2xl border border-indigo-50"
                >
                  <div className="w-[280px] h-[460px] max-h-full bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-800 shadow-2xl px-5 pt-10 pb-5 flex flex-col gap-4 overflow-hidden relative">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-2xl" />
                    <div className="text-white">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">TODAY'S PLAN</div>
                      <div className="text-lg font-bold">Good morning, Sarah</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl p-3 flex flex-col gap-3">
                      <div className="bg-white/10 rounded-xl p-3 flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">8:00 AM</div>
                          <div className="text-xs text-slate-300">Amoxicillin 500mg</div>
                        </div>
                      </div>
                      <div className="bg-indigo-500 rounded-xl p-3 flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">12:00 PM</div>
                          <div className="text-xs text-indigo-100">Ibuprofen 400mg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl"><CheckCircle2 className="w-6 h-6 text-emerald-400" /></div>
            <div>
              <div className="text-2xl font-bold text-white">98.4%</div>
              <div className="text-sm font-medium text-slate-400">Medication Adherence</div>
            </div>
          </div>
          <div className="w-px h-12 bg-slate-800 hidden md:block" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl"><Lock className="w-6 h-6 text-indigo-400" /></div>
            <div>
              <div className="text-2xl font-bold text-white">100% Secure</div>
              <div className="text-sm font-medium text-slate-400">HIPAA Compliant & Encrypted</div>
            </div>
          </div>
          <div className="w-px h-12 bg-slate-800 hidden md:block" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl"><MessageSquare className="w-6 h-6 text-sky-400" /></div>
            <div>
              <div className="text-2xl font-bold text-white">24/7 Access</div>
              <div className="text-sm font-medium text-slate-400">On-Demand Companion AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES BENTO BOX */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Everything you need for a safe recovery.</h2>
            <p className="mt-3 text-slate-500 font-medium">Built with clinical best practices in a beautiful, easy-to-use interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Bento 1: Upload & Read (Span 2) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] p-10 border border-slate-200 flex flex-col md:flex-row gap-8 overflow-hidden relative group">
              <div className="flex-1 z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                  <UploadCloud className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Upload & Read</h3>
                <p className="text-slate-600 font-medium">Simply take a photo of your discharge papers. Our proprietary AI engine instantly extracts medications, dosages, and restrictions.</p>
              </div>
              <div className="flex-1 relative min-h-[200px] bg-white rounded-2xl border border-slate-200 shadow-xl p-4 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                {/* Abstract scanning visual */}
                <div className="w-full h-full bg-slate-50 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 opacity-40">
                    <div className="h-3 bg-slate-300 rounded w-full" />
                    <div className="h-3 bg-slate-300 rounded w-5/6" />
                    <div className="h-3 bg-slate-300 rounded w-4/6" />
                  </div>
                  <motion.div 
                    animate={{ y: ['-10%', '110%'] }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                  />
                </div>
              </div>
            </div>

            {/* Bento 2: Mr. Meddy (Span 1) */}
            <div className="md:col-span-1 bg-indigo-900 rounded-[2rem] p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-800 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Mr. Meddy</h3>
                <p className="text-indigo-200 font-medium text-sm">Your 24/7 AI companion. Ask questions about your recovery plan anytime.</p>
              </div>
              <div className="mt-8 bg-indigo-950/50 backdrop-blur-md border border-indigo-800/50 rounded-2xl p-4 relative z-10">
                <div className="text-xs text-indigo-300 font-medium mb-1">You</div>
                <div className="text-sm text-white bg-indigo-800 rounded-lg rounded-tl-none px-3 py-2 inline-block">Can I sleep on my left side?</div>
              </div>
            </div>

            {/* Bento 3: Timeline (Span 3) */}
            <div className="md:col-span-3 bg-teal-50 rounded-[2rem] p-10 border border-slate-200 flex flex-col justify-between relative overflow-hidden group">
              <div className="max-w-xl relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                  <Calendar className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">The Recovery Roadmap</h3>
                <p className="text-slate-600 font-medium">A visual calendar mapping out rest periods, physical therapy, dressing changes, and hospital check-ins.</p>
              </div>
              
              <div className="mt-10 flex gap-4 overflow-hidden relative z-10 pb-4">
                {[1, 2, 3, 4, 5].map((day) => (
                  <div key={day} className={`min-w-[200px] h-24 rounded-2xl border ${day === 1 ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'} p-5 flex flex-col justify-between shadow-sm`}>
                    <div className={`text-xs font-bold ${day === 1 ? 'text-slate-400' : 'text-slate-500'}`}>DAY {day}</div>
                    <div className={`text-sm font-semibold ${day === 1 ? 'text-white' : 'text-slate-800'}`}>
                      {day === 1 ? 'Rest & Hydrate' : day === 2 ? 'Incision Check' : day === 3 ? 'Start Light Walking' : 'Follow-up Call'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARE CIRCLE */}
      <section className="py-32 px-6 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 w-full h-[400px] md:h-[600px] relative">
            <Globe3D markers={careMarkers} config={{ autoRotateSpeed: 0.2 }} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-6">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">The Care Circle</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Bridge the distance. <br/>Keep everyone synced.
            </h2>
            <p className="mt-6 text-slate-400 font-medium text-lg max-w-lg mx-auto md:mx-0">
              Recovery is a team effort. Family members receive real-time updates when patients check off their daily pills, and doctors can adjust follow-up instructions remotely.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto md:mx-0">
              {[
                { initials: "AM", name: "Daughter (Boston)",       role: "Caregiver • Receiving alerts",        bg: "#10b981" },
                { initials: "Dr", name: "Dr. Vance (Stanford)",    role: "Physician • Updating dosage limits",  bg: "#6366f1" },
                { initials: "Ma", name: "Mom (New Delhi)",         role: "Family • Daily check-ins",            bg: "#f59e0b" },
                { initials: "Pa", name: "Dad (London)",            role: "Family • Care alerts enabled",        bg: "#0ea5e9" },
              ].map((person) => (
                <div key={person.name} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-4 flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: person.bg }}>
                    {person.initials}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-white font-bold text-sm truncate">{person.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{person.role}</div>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
                <span className="font-black tracking-tight text-slate-900">
                  Discharge<span className="text-indigo-600">Buddy</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                Your personalized recovery roadmap. Simplifying hospital discharges for patients, families, and healthcare providers.
              </p>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-4">Product</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">For Providers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Security & HIPAA</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-4">Support</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">System Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-4">Legal</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
            <p>&copy; {new Date().getFullYear()} Discharge Buddy Inc. All rights reserved.</p>
            <p>Designed for better healing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
