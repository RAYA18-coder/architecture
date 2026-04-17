import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("custom-cursor-active");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const enter = () => ringRef.current?.classList.add("scale-150", "border-[var(--brass)]");
    const leave = () => ringRef.current?.classList.remove("scale-150", "border-[var(--brass)]");

    window.addEventListener("mousemove", move, { passive: true });
    document.querySelectorAll("a,button,[data-cursor='hover']").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-[var(--emerald-deep)]/60 transition-[transform,border-color] duration-200 ease-out hidden md:block mix-blend-difference" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[var(--brass)] hidden md:block" />
    </>
  );
}
