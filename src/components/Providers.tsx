"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function Providers({ children }: { children: React.ReactNode }) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Custom Cursor Move Listener
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }
      
      if (cursorRingRef.current) {
        // Smoothly animate the cursor ring with a slight delay
        cursorRingRef.current.animate(
          {
            left: `${x}px`,
            top: `${y}px`
          },
          { duration: 250, fill: "forwards", easing: "cubic-bezier(0.25, 1, 0.5, 1)" }
        );
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // 3. Custom Cursor Hover State Listeners
    const addHoverClass = () => {
      document.body.classList.add("cursor-hover");
    };

    const removeHoverClass = () => {
      document.body.classList.remove("cursor-hover");
    };

    const registerHoverElements = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .hover-trigger"
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });
    };

    registerHoverElements();

    // 4. Magnetic Buttons Effect
    const handleMagnetic = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element towards cursor
      target.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    };

    const resetMagnetic = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = "translate(0px, 0px)";
    };

    const registerMagneticButtons = () => {
      const magnetics = document.querySelectorAll(".magnetic-btn");
      magnetics.forEach((el) => {
        el.addEventListener("mousemove", handleMagnetic as EventListener);
        el.addEventListener("mouseleave", resetMagnetic as EventListener);
      });
    };

    registerMagneticButtons();

    // Observe DOM mutations to bind new elements
    const observer = new MutationObserver(() => {
      registerHoverElements();
      registerMagneticButtons();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Custom Cursor Markup */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
      <div ref={cursorRingRef} className="cursor-ring hidden md:block" />
      {children}
    </>
  );
}
