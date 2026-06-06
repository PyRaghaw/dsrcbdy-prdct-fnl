"use client";

import { useEffect, useRef, useState } from "react";

export interface Marker {
  lat: number;
  lng: number;
  src?: string;
  label: string;
}

export interface GlobeConfig {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
}

export interface Globe3DProps {
  markers?: Marker[];
  config?: GlobeConfig;
  onMarkerClick?: (marker: Marker) => void;
  onMarkerHover?: (marker: Marker | null) => void;
}

// Simple geographic landmass approximation to generate dotted continents
function isLand(lat: number, lng: number) {
  let inLand = false;
  
  // North America
  if (lat > 15 && lat < 75 && lng > -165 && lng < -50) {
    if (!(lat < 30 && lng > -100 && lng < -80)) inLand = true;
  }
  // South America
  else if (lat > -55 && lat <= 15 && lng > -85 && lng < -35) {
    inLand = true;
  }
  // Africa
  else if (lat > -35 && lat < 37 && lng > -20 && lng < 52) {
    inLand = true;
  }
  // Europe
  else if (lat >= 37 && lat < 72 && lng > -10 && lng < 40) {
    inLand = true;
  }
  // Asia
  else if (lat > 5 && lat < 75 && lng >= 40 && lng < 180) {
    inLand = true;
  }
  // Australia
  else if (lat > -45 && lat < -10 && lng > 110 && lng < 155) {
    inLand = true;
  }

  if (!inLand) return false;

  // Add detail using high frequency wave noise
  const noise = Math.sin(lat * 0.45) * Math.cos(lng * 0.45) +
                Math.sin(lat * 0.15) * Math.sin(lng * 0.25) * 0.5;
  return noise > -0.65;
}

export function Globe3D({ markers = [], config = {}, onMarkerClick, onMarkerHover }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [rotationX, setRotationX] = useState(0.3); // inclination
  const [rotationY, setRotationY] = useState(0); // rotation angle
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);

  const autoRotateSpeed = config.autoRotateSpeed !== undefined ? config.autoRotateSpeed : 0.3;
  const atmosphereColor = config.atmosphereColor || "#5c60f5";

  // Pre-generate land dots on the sphere
  const dotsRef = useRef<{ x: number; y: number; z: number }[]>([]);
  useEffect(() => {
    const list: { x: number; y: number; z: number }[] = [];
    const R = 1; // unit radius
    for (let lat = -80; lat <= 80; lat += 3) {
      const radLat = (lat * Math.PI) / 180;
      const cosLat = Math.cos(radLat);
      const sinLat = Math.sin(radLat);
      
      // density spacing based on latitude
      const stepLng = 3 / Math.max(0.1, cosLat);
      for (let lng = -180; lng < 180; lng += stepLng) {
        if (isLand(lat, lng)) {
          const radLng = (lng * Math.PI) / 180;
          // Calculate 3D sphere coordinates
          list.push({
            x: R * cosLat * Math.sin(radLng),
            y: R * sinLat,
            z: R * cosLat * Math.cos(radLng),
          });
        }
      }
    }
    dotsRef.current = list;
  }, []);

  // Drag interaction variables
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotationStartRef.current = { x: rotationX, y: rotationY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // adjust rotation based on mouse movement
    setRotationY(rotationStartRef.current.y + deltaX * 0.005);
    setRotationX(Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationStartRef.current.x - deltaY * 0.005)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-rotation loop
  useEffect(() => {
    if (isDragging) return;
    let animationFrameId: number;
    const update = () => {
      setRotationY((prev) => prev + (autoRotateSpeed * 0.005));
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, autoRotateSpeed]);

  // Project 3D points based on rotationX (inclination) and rotationY (spin)
  const projectPoint = (x: number, y: number, z: number, R: number) => {
    // 3D Rotations
    // Spin around Y axis
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    // Tilt around X axis
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    return {
      x: x1 * R,
      y: y2 * R,
      z: z2 * R, // z2 > 0 is front side
    };
  };

  // Main canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    if (canvas.width !== width * 2 || canvas.height !== height * 2) {
      canvas.width = width * 2;
      canvas.height = height * 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const R = Math.min(cx, cy) * 0.75; // Sphere visual radius

    // 1. Draw glowing atmosphere (outer glow)
    const atmosphereGlow = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.15);
    atmosphereGlow.addColorStop(0, `${atmosphereColor}22`);
    atmosphereGlow.addColorStop(0.5, `${atmosphereColor}0d`);
    atmosphereGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = atmosphereGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw sphere background gradient (depth)
    const sphereBg = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
    sphereBg.addColorStop(0, "#ffffff");
    sphereBg.addColorStop(0.4, "#f8fafc");
    sphereBg.addColorStop(1, "#e2e8f0");
    ctx.fillStyle = sphereBg;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // 3. Draw Dotted continents
    dotsRef.current.forEach((dot) => {
      const proj = projectPoint(dot.x, dot.y, dot.z, R);
      
      // Only render front side dots (proj.z > 0) with rich details
      // and optionally back side dots (proj.z < 0) very faintly
      if (proj.z > 0) {
        const sx = cx + proj.x;
        const sy = cy - proj.y;
        
        // Depth-based size and opacity
        const depth = proj.z / R; // 0 to 1
        const size = (depth * 1.2) + 0.8;
        const opacity = (depth * 0.45) + 0.25;

        ctx.fillStyle = `rgba(92, 96, 245, ${opacity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Back side dots faintly visible (glass look)
        const sx = cx + proj.x;
        const sy = cy - proj.y;
        ctx.fillStyle = "rgba(148, 163, 184, 0.05)";
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    });

  }, [rotationX, rotationY, atmosphereColor]);

  // Project markers to render as HTML overlays
  const projectedMarkers = markers.map((marker, index) => {
    const latRad = (marker.lat * Math.PI) / 180;
    const lngRad = (marker.lng * Math.PI) / 180;
    
    // 3D coordinates on unit sphere
    const mx = Math.cos(latRad) * Math.sin(lngRad);
    const my = Math.sin(latRad);
    const mz = Math.cos(latRad) * Math.cos(lngRad);
    
    return {
      marker,
      index,
      proj: projectPoint(mx, my, mz, 1.0) // project on unit sphere
    };
  });

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        style={{ touchAction: "none" }}
      />

      {/* HTML Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {projectedMarkers.map(({ marker, index, proj }) => {
          // Calculate screen coordinates
          const canvas = canvasRef.current;
          if (!canvas) return null;
          
          const cx = canvas.offsetWidth / 2;
          const cy = canvas.offsetHeight / 2;
          const R = Math.min(cx, cy) * 0.75;
          
          const sx = cx + proj.x * R;
          const sy = cy - proj.y * R;

          // Only display if the marker is on the front side of the globe
          if (proj.z <= 0) return null;

          const isHovered = hoveredMarker === marker;

          return (
            <div 
              key={index}
              style={{
                position: "absolute",
                left: `${sx}px`,
                top: `${sy}px`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 50 : 20,
              }}
              className="pointer-events-auto"
            >
              {/* Interactive target dot */}
              <div 
                className="relative flex items-center justify-center cursor-pointer group"
                onMouseEnter={() => {
                  setHoveredMarker(marker);
                  onMarkerHover?.(marker);
                }}
                onMouseLeave={() => {
                  setHoveredMarker(null);
                  onMarkerHover?.(null);
                }}
                onClick={() => onMarkerClick?.(marker)}
              >
                {/* Outer pinging rings */}
                <div className="absolute w-8 h-8 rounded-full bg-brand-purple/20 animate-ping pointer-events-none" />
                <div className="absolute w-5 h-5 rounded-full bg-brand-purple/40 animate-pulse pointer-events-none" />
                
                {/* Center dot with avatar or symbol */}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-purple shadow-md overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-brand-purple-dark">
                  {marker.src ? (
                    <img 
                      src={marker.src} 
                      alt={marker.label} 
                      className="w-full h-full object-cover pointer-events-none" 
                    />
                  ) : (
                    <span className="text-white text-[9px] font-black font-mono">📍</span>
                  )}
                </div>

                {/* Tooltip Popup */}
                <div 
                  className={`absolute bottom-11 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white rounded-xl py-2 px-3 shadow-xl border border-slate-800 transition-all duration-200 pointer-events-none flex flex-col gap-0.5 min-w-[170px] ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className="text-[10px] font-black tracking-tight leading-none block whitespace-nowrap">
                    {marker.label}
                  </span>
                  <span className="text-[8px] text-slate-350 leading-tight">
                    {marker.label.includes("Daughter") && "Boston • Caregiver Dashboard"}
                    {marker.label.includes("Patients") && "New Delhi • Voice Instruction Hub"}
                    {marker.label.includes("Vance") && "Stanford Health • EHR Integration"}
                    {marker.label.includes("Nurse") && "London • Care Team Portal"}
                  </span>
                  {/* Small tooltip arrow */}
                  <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-800 rotate-45" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
