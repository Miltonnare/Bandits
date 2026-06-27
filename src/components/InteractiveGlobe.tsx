"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, MapPin, TrendingUp, Users } from "lucide-react";

interface Hotspot {
  name: string;
  lat: number;
  lon: number;
  streams: string;
  listeners: string;
  growth: string;
  x3d: number;
  y3d: number;
  z3d: number;
}

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  
  // Coordinates transformed to radians
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  
  const hotspots: Hotspot[] = [
    { name: "Nairobi, KE (HQ)", lat: -1.2921, lon: 36.8219, streams: "4.8M", listeners: "850K", growth: "+45%", x3d: 0, y3d: 0, z3d: 0 },
    { name: "London, UK", lat: 51.5074, lon: -0.1278, streams: "2.1M", listeners: "420K", growth: "+28%", x3d: 0, y3d: 0, z3d: 0 },
    { name: "Los Angeles, US", lat: 34.0522, lon: -118.2437, streams: "3.5M", listeners: "680K", growth: "+37%", x3d: 0, y3d: 0, z3d: 0 },
    { name: "Tokyo, JP", lat: 35.6762, lon: 139.6503, streams: "1.2M", listeners: "250K", growth: "+19%", x3d: 0, y3d: 0, z3d: 0 },
  ];

  // Initialize active spot
  useEffect(() => {
    setActiveSpot(hotspots[0]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const radius = Math.min(width, height) * 0.4;
    const centerX = width / 2;
    const centerY = height / 2;

    // Generate grid points on the sphere
    const points: { x: number; y: number; z: number }[] = [];
    const numPoints = 350;
    for (let i = 0; i < numPoints; i++) {
      // Golden spiral distribution
      const theta = Math.acos(-1 + (2 * i) / numPoints);
      const phi = Math.sqrt(numPoints * Math.PI) * theta;
      
      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.cos(theta),
        z: radius * Math.sin(theta) * Math.sin(phi),
      });
    }

    // Assign 3D coordinates to hotspots
    hotspots.forEach((spot) => {
      const latRad = toRad(spot.lat);
      const lonRad = toRad(spot.lon);
      // Math spherical coordinates conversion (R, lat, lon)
      spot.x3d = radius * Math.cos(latRad) * Math.sin(lonRad);
      spot.y3d = -radius * Math.sin(latRad);
      spot.z3d = radius * Math.cos(latRad) * Math.cos(lonRad);
    });

    let angleY = 0.003; // Self-rotating velocity
    let angleX = 0.001;
    let targetAngleY = 0.003;
    let targetAngleX = 0.001;

    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = x;
      mouseY = y;
      
      // Let mouse movement adjust rotation velocity
      targetAngleY = (x - centerX) * 0.0001;
      targetAngleX = (y - centerY) * 0.0001;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      targetAngleY = 0.003;
      targetAngleX = 0.001;
      isHovering = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    // Projection loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth rotation velocities
      angleY += (targetAngleY - angleY) * 0.08;
      angleX += (targetAngleX - angleX) * 0.08;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 1. Rotate & project grid points
      ctx.fillStyle = "rgba(165, 165, 165, 0.4)";
      points.forEach((p) => {
        // Rotate around Y-axis
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        
        // Rotate around X-axis
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // Save rotated states for rotation continuity
        p.x = x1;
        p.y = y2;
        p.z = z2;

        const scale = (z2 + radius * 2.5) / (radius * 2.5);
        const projX = centerX + x1;
        const projY = centerY + y2;

        if (z2 > -radius * 0.8) {
          ctx.beginPath();
          // Front points are larger and goldish, back points are dark gray
          if (z2 > 0) {
            ctx.fillStyle = `rgba(212, 175, 55, ${0.15 + (z2 / radius) * 0.45})`;
            ctx.arc(projX, projY, 1.5 * scale, 0, Math.PI * 2);
          } else {
            ctx.fillStyle = `rgba(165, 165, 165, ${0.1 + (z2 / radius) * 0.05})`;
            ctx.arc(projX, projY, 1 * scale, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      });

      // 2. Rotate & project hotspots
      const projectedHotspots: { spot: Hotspot; x: number; y: number; z: number }[] = [];

      hotspots.forEach((spot) => {
        // Y-axis rotation
        let x1 = spot.x3d * cosY - spot.z3d * sinY;
        let z1 = spot.x3d * sinY + spot.z3d * cosY;
        
        // X-axis rotation
        let y2 = spot.y3d * cosX - z1 * sinX;
        let z2 = spot.y3d * sinX + z1 * cosX;

        spot.x3d = x1;
        spot.y3d = y2;
        spot.z3d = z2;

        const projX = centerX + x1;
        const projY = centerY + y2;

        projectedHotspots.push({ spot, x: projX, y: projY, z: z2 });
      });

      // Draw Connection Arcs from Nairobi (KE) to other nodes
      const nairobiNode = projectedHotspots.find((h) => h.spot.name.includes("Nairobi"));
      
      if (nairobiNode) {
        projectedHotspots.forEach((node) => {
          if (node.spot.name !== nairobiNode.spot.name) {
            // Draw arc only if both endpoints are partially visible (e.g. front hemisphere z > -radius/2)
            if (node.z > -radius * 0.5 && nairobiNode.z > -radius * 0.5) {
              ctx.beginPath();
              ctx.moveTo(nairobiNode.x, nairobiNode.y);
              
              // Compute control point for quadratic curve to create a arched arc
              const midX = (nairobiNode.x + node.x) / 2;
              const midY = (nairobiNode.y + node.y) / 2 - 40; // Arch height offset
              
              ctx.quadraticCurveTo(midX, midY, node.x, node.y);
              
              // Gold gradient line
              const grad = ctx.createLinearGradient(nairobiNode.x, nairobiNode.y, node.x, node.y);
              grad.addColorStop(0, "rgba(212, 175, 55, 0.6)");
              grad.addColorStop(1, "rgba(193, 18, 31, 0.15)");
              
              ctx.strokeStyle = grad;
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]); // Dash effect representing traveling frequencies
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        });
      }

      // Draw Hotspot markers
      projectedHotspots.forEach(({ spot, x, y, z }) => {
        if (z > 0) { // Only render markers on the front side
          const isNairobi = spot.name.includes("Nairobi");
          const isActive = activeSpot?.name === spot.name;

          // Pulse rings
          const time = Date.now() * 0.003;
          const pulse = 1 + Math.sin(time) * 0.25;

          ctx.beginPath();
          ctx.arc(x, y, (isNairobi ? 7 : 5) * pulse, 0, Math.PI * 2);
          ctx.fillStyle = isNairobi ? "rgba(193, 18, 31, 0.25)" : "rgba(212, 175, 55, 0.25)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, isNairobi ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isNairobi ? "#C1121F" : "#D4AF37";
          ctx.fill();

          // Border rings for active node
          if (isActive) {
            ctx.beginPath();
            ctx.arc(x, y, 9, 0, Math.PI * 2);
            ctx.strokeStyle = "#D4AF37";
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Check if cursor hover trigger click
          if (isHovering) {
            const dist = Math.hypot(mouseX - x, mouseY - y);
            if (dist < 12) {
              setActiveSpot(spot);
            }
          }
        }
      });

      // Subtle atmospheric outline ring of the globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(46, 46, 46, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeSpot]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Globe Canvas Container */}
      <div className="relative w-full h-87.5 md:h-112.5 flex items-center justify-center bg-secondary-dark/40 border border-border-dark/30 rounded-none overflow-hidden group">
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gold-primary animate-spin-slow" />
          <span className="text-[10px] tracking-widest font-mono text-muted-text uppercase">
            3D FREQUENCY STREAM MAP
          </span>
        </div>

        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating tooltip guide */}
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-muted-text/80">
          * HOVER HOTSPOTS OR DRAG TO SHIFT ROTATION
        </div>
      </div>
    </div>
  );
}
