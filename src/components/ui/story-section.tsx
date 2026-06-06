'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SceneHospitalExit, 
  SceneOverwhelmed, 
  SceneMemoryFog, 
  SceneNightAnxiety 
} from "./story-illustrations";
import { CheckCircle2, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create the main timeline tied to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initially setup opacity and scales
      gsap.set(".scene-text", { opacity: 0, y: 30 });
      gsap.set(".scene-text-1", { opacity: 1, y: 0 });
      
      gsap.set(".illust", { opacity: 0, scale: 0.95 });
      gsap.set(".illust-1", { opacity: 1, scale: 1 });

      gsap.set(".ui-element", { opacity: 0, scale: 0.9, y: 50 });
      gsap.set(".ui-paper-1", { opacity: 1, scale: 1, y: 0, rotation: -2 });

      // Scene 1 -> 2 (Overwhelm)
      tl.to(".scene-text-1", { opacity: 0, y: -30, duration: 1 })
        .to(".illust-1", { opacity: 0, scale: 1.05, duration: 1 }, "<")
        .to(".ui-paper-1", { rotation: -15, scale: 0.8, x: -50, opacity: 0.5, duration: 1 }, "<")
        .to(".scene-text-2", { opacity: 1, y: 0, duration: 1 })
        .to(".illust-2", { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(".ui-paper-2", { opacity: 1, scale: 1, y: 0, rotation: 5, duration: 1 }, "<");

      // Scene 2 -> 3 (3 AM Panic)
      tl.to(".scene-text-2", { opacity: 0, y: -30, duration: 1 })
        .to(".illust-2", { opacity: 0, scale: 1.05, duration: 1 }, "<")
        .to(".ui-paper-1, .ui-paper-2", { opacity: 0, scale: 0, duration: 1 }, "<")
        .to(".scene-text-3", { opacity: 1, y: 0, duration: 1 })
        .to(".illust-3", { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(".ui-phone-google", { opacity: 1, scale: 1, y: 0, duration: 1 }, "<");

      // Scene 3 -> 4 (Discharge Buddy Way)
      tl.to(".scene-text-3", { opacity: 0, y: -30, duration: 1 })
        .to(".illust-3", { opacity: 0, scale: 1.05, duration: 1 }, "<")
        .to(".ui-phone-google", { opacity: 0, scale: 0.95, duration: 1 }, "<")
        .to(".scene-text-4", { opacity: 1, y: 0, duration: 1 })
        // Phone simply crossfades into discharge buddy UI without spinning
        .to(".ui-phone-buddy", { opacity: 1, scale: 1, y: 0, duration: 1 }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#fafaf9] overflow-hidden flex relative border-t border-slate-200">
      
      {/* Left Column: Text & 2D Illustrations */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-20 relative z-10">
        
        {/* TEXTS */}
        <div className="relative h-40 mb-10">
          <div className="scene-text scene-text-1 absolute top-0 left-0">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-3">01 / The Departure</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">You're finally going home.</h2>
            <p className="mt-4 text-slate-600 text-lg">But instead of peace, you're handed a massive folder full of confusing medical jargon and generic instructions.</p>
          </div>
          <div className="scene-text scene-text-2 absolute top-0 left-0">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-3">02 / The Overwhelm</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Then comes the paper chaos.</h2>
            <p className="mt-4 text-slate-600 text-lg">New prescriptions, contradictory rules, and complicated timelines. It's too much to process when you're supposed to be resting.</p>
          </div>
          <div className="scene-text scene-text-3 absolute top-0 left-0">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-3">03 / The 3 AM Panic</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">"Is this pain normal?"</h2>
            <p className="mt-4 text-slate-600 text-lg">It's 3 AM. You forgot what the doctor said. Google is showing you worst-case scenarios, and panic sets in.</p>
          </div>
          <div className="scene-text scene-text-4 absolute top-0 left-0">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase block mb-3">04 / The Solution</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Enter Discharge Buddy.</h2>
            <p className="mt-4 text-slate-600 text-lg">We transform that messy folder into a clear, actionable digital timeline. No more guessing, just guided healing.</p>
          </div>
        </div>

        {/* ILLUSTRATIONS */}
        <div className="relative w-full max-w-md aspect-[4/3] mt-10">
          <div className="illust illust-1 absolute inset-0 drop-shadow-xl">
            <SceneHospitalExit className="w-full h-full object-contain" />
          </div>
          <div className="illust illust-2 absolute inset-0 drop-shadow-xl">
            <SceneOverwhelmed className="w-full h-full object-contain" />
          </div>
          <div className="illust illust-3 absolute inset-0 drop-shadow-xl">
            <SceneNightAnxiety className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Right Column: 3D/UI Mockups */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center relative bg-gradient-to-bl from-slate-100 to-white">
        
        {/* UI Paper 1: Realistic Prescription/Discharge Summary */}
        <div className="ui-element ui-paper-1 absolute w-80 h-[420px] bg-white shadow-2xl rounded-sm border border-slate-200 p-6 flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-[10px]">+</div>
                <span className="font-serif font-bold text-slate-900 text-lg uppercase tracking-tight">St. Jude Medical</span>
              </div>
              <span className="text-[9px] text-slate-500 font-sans">123 Health Ave, New York, NY</span>
            </div>
            <div className="text-right">
              <div className="font-serif font-bold text-slate-900 text-sm">DISCHARGE SUMMARY</div>
              <div className="text-[9px] text-slate-500 font-sans">Date: 10/24/2026</div>
            </div>
          </div>
          
          {/* Patient Info */}
          <div className="flex justify-between items-center mb-6 text-[10px] text-slate-700 bg-slate-50 p-2 rounded">
            <div><span className="font-bold">Patient:</span> Sarah Jenkins</div>
            <div><span className="font-bold">DOB:</span> 05/12/1985</div>
            <div><span className="font-bold">MRN:</span> #8472910</div>
          </div>

          {/* Rx Section */}
          <div className="flex items-start gap-3 mb-4">
            <span className="font-serif text-3xl font-bold text-slate-900 italic leading-none">Rx</span>
            <div className="flex-1 flex flex-col gap-2 mt-2">
              <div className="h-2 w-full bg-slate-200 rounded" />
              <div className="h-2 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded mb-2" />
          <div className="h-2 w-4/6 bg-slate-100 rounded mb-6" />

          <div className="mt-2 text-[10px] font-bold text-rose-600 bg-rose-50 p-2 rounded border border-rose-100">
            WARNING: DO NOT EXCEED 8 TABLETS IN 24 HOURS. AVOID ALCOHOL.
          </div>

          {/* Footer Signature & Barcode */}
          <div className="mt-auto flex justify-between items-end pt-4 border-t border-slate-100">
             <div className="flex flex-col gap-1">
               <div className="font-serif text-xl text-slate-800" style={{ fontFamily: "'Brush Script MT', cursive" }}>Dr. Jonathan Vance</div>
               <div className="h-px w-32 bg-slate-900" />
               <div className="text-[8px] text-slate-500">Attending Physician</div>
             </div>
             {/* Fake Barcode */}
             <div className="flex gap-[2px] h-8 items-end opacity-60">
               {[1,3,1,2,1,4,1,1,2,3,1,2,1].map((w, i) => (
                 <div key={i} className="bg-slate-900 h-full" style={{ width: `${w}px` }} />
               ))}
             </div>
          </div>
        </div>

        {/* UI Paper 2 (Scattered) */}
        <div className="ui-element ui-paper-2 absolute w-72 h-96 bg-white shadow-2xl rounded-sm border border-slate-200 p-8 flex flex-col gap-4">
          <div className="text-xl font-bold text-red-600">Prescription Details</div>
          <div className="flex gap-2 items-center p-2 bg-red-50 rounded">
             <div className="w-4 h-4 rounded-full bg-red-400" />
             <div className="h-2 w-32 bg-red-200 rounded" />
          </div>
          <div className="flex gap-2 items-center p-2 bg-slate-50 rounded mt-2">
             <div className="w-4 h-4 rounded-full bg-slate-400" />
             <div className="h-2 w-24 bg-slate-200 rounded" />
          </div>
          <div className="text-[10px] text-slate-400 mt-10 leading-relaxed">
             Take 2 tablets by mouth every 4 to 6 hours as needed for pain. Do not exceed 8 tablets in 24 hours. May cause drowsiness. Avoid alcohol.
          </div>
        </div>

        {/* Google Phone Search */}
        <div className="ui-element ui-phone-google absolute w-[300px] h-[600px] bg-white rounded-[3rem] shadow-2xl border-[12px] border-slate-900 px-4 pt-12 pb-6 flex flex-col relative overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-20" />
          
          <div className="w-full bg-slate-100 rounded-full py-3 px-4 flex items-center gap-2 mb-6">
             <div className="text-xs font-bold text-slate-500">G</div>
             <div className="text-sm text-slate-700">sharp chest pain after surgery...</div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-400 mb-1">WebMD</div>
                <div className="text-blue-600 font-bold mb-2">10 Signs of a Fatal Complication</div>
                <div className="h-2 w-full bg-slate-200 rounded" />
                <div className="h-2 w-3/4 bg-slate-200 rounded mt-2" />
             </div>
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-400 mb-1">Healthline</div>
                <div className="text-blue-600 font-bold mb-2">When to go to the ER immediately</div>
                <div className="h-2 w-full bg-slate-200 rounded" />
                <div className="h-2 w-3/4 bg-slate-200 rounded mt-2" />
             </div>
          </div>
        </div>

        {/* Discharge Buddy UI */}
        <div className="ui-element ui-phone-buddy absolute w-[300px] h-[600px] bg-slate-900 rounded-[3rem] shadow-[0_20px_50px_rgba(99,102,241,0.2)] border-[12px] border-slate-800 px-6 pt-12 pb-6 flex flex-col overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-3xl z-20" />
          <div className="text-white mb-6">
            <div className="text-xs font-bold text-slate-400 mb-1">TODAY'S PLAN</div>
            <div className="text-xl font-bold">Good morning, Sarah</div>
          </div>
          
          <div className="flex-1 bg-slate-800 rounded-2xl p-4 flex flex-col gap-4">
            <div className="bg-white/10 rounded-xl p-3 flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">8:00 AM</div>
                <div className="text-xs text-slate-300">Amoxicillin 500mg</div>
              </div>
            </div>
            <div className="bg-indigo-500 rounded-xl p-3 flex gap-3 items-center shadow-lg shadow-indigo-500/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">12:00 PM</div>
                <div className="text-xs text-indigo-100">Ibuprofen 400mg</div>
              </div>
            </div>
            
            <div className="mt-auto bg-slate-900 rounded-xl p-4 border border-slate-700">
               <div className="flex gap-2 items-center mb-2">
                  <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">AI</div>
                  <div className="text-xs font-bold text-white">Mr. Meddy</div>
               </div>
               <div className="text-xs text-slate-300 leading-relaxed">
                 "No need to worry, mild chest tightness is normal on day 2. Just rest and stay hydrated."
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
