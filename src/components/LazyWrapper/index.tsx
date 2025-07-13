import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import useIntersectionObserver from "../../hooks/useInterSection";

type LazyWrapperProps = {
  children: React.ReactNode;
  animationStart?: "top" | "bottom" | "left" | "right";
  duration?: number;  // animasyon süresi, saniye cinsinden
  lazyLoad?: boolean;
  className?: string;
};

const createVariantsMap = (duration: number): Record<string, Variants> => ({
  top: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  },
  bottom: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration } },
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration } },
  },
});

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  animationStart = "bottom",
  duration = 0.7,
  lazyLoad = false,
  className = "",
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  const [shouldRender, setShouldRender] = useState(!lazyLoad);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (lazyLoad && isVisible) {
      setShouldRender(true);
    }
  }, [isVisible, lazyLoad]);

  useEffect(() => {
    if (shouldRender) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [shouldRender]);

  const variants = createVariantsMap(duration)[animationStart];

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {shouldRender &&
        React.Children.map(children, (child) => (
          <motion.div
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            variants={variants}
            style={{ overflow: "hidden" }}
          >
            {child}
          </motion.div>
        ))}
    </div>
  );
};

export default LazyWrapper;
