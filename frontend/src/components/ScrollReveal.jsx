import React, { useEffect, useRef, useState } from "react";

const REVEAL_TYPES = [
  "reveal-up",
  "reveal-left",
  "reveal-right",
  "reveal-flip",
];

const ScrollReveal = ({
  children,
  type = "reveal-up",
  delay = 0,
  className = "",
}) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setTimeout(() => setRevealed(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [revealed, delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${type} ${revealed ? "revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

// Auto-assign varied reveal types to children
export const ScrollRevealGroup = ({ children, staggerMs = 80 }) => {
  return React.Children.map(children, (child, index) => {
    const type = REVEAL_TYPES[index % REVEAL_TYPES.length];
    return (
      <ScrollReveal type={type} delay={index * staggerMs}>
        {child}
      </ScrollReveal>
    );
  });
};

export default ScrollReveal;
