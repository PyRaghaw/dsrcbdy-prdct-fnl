"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const PointerHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <span
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative inline-block overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-1 mx-1",
        containerClassName
      )}
    >
      {isHovering && (
        <motion.div
          className="absolute inset-0 z-0 opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.4), transparent 80%)`,
          }}
        />
      )}
      <span className={cn("relative z-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600", className)}>
        {children}
      </span>
    </span>
  );
};
