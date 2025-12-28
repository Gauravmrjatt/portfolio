'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

/* -------------------- Context -------------------- */

const DockContext = createContext(undefined);

function DockProvider({ children, value }) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error('useDock must be used within DockProvider');
  return context;
}

/* -------------------- Dock -------------------- */

export function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Detect if device has a mouse (not touch-only)
  const [hasMouse, setHasMouse] = useState(true);

  useEffect(() => {
    const detectMouse = () => {
      setHasMouse(window.matchMedia('(pointer: fine)').matches);
    };
    detectMouse();
    window.addEventListener('resize', detectMouse);
    return () => window.removeEventListener('resize', detectMouse);
  }, []);

  const maxHeight = useMemo(
    () => Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4),
    [magnification]
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height }}
      className="mx-2 flex max-w-full items-end overflow-x-auto scrollbar-hidden"
    >
      <motion.div
        onMouseMove={(e) => {
          if (hasMouse) {
            isHovered.set(1);
            mouseX.set(e.pageX);
          }
        }}
        onMouseLeave={() => {
          if (hasMouse) {
            isHovered.set(0);
            mouseX.set(Infinity);
          }
        }}
        className={cn(
          'mx-auto flex w-fit gap-4 rounded-2xl bg-gray-50 px-6 py-4 dark:bg-neutral-900',
          className
        )}
        style={{ height: panelHeight }}
      >
        <DockProvider value={{ mouseX, spring, distance, magnification, hasMouse }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

/* -------------------- DockItem -------------------- */

export function DockItem({ children, className, href, sectionId }) {
  const ref = useRef(null);
  const pathname = usePathname();
  const { distance, magnification, mouseX, spring, hasMouse } = useDock();

  const [isActive, setIsActive] = useState(false);

  // Determine target section ID
  const targetId = sectionId ||
    (href?.startsWith('#') ? href.slice(1) :
     href?.startsWith('/#') ? href.slice(2) :
     href === '/' ? 'home-sentinel' : null); // Special case for home

  // Active via URL hash (click navigation)
  useEffect(() => {
    if (!href) return;

    const updateFromURL = () => {
      const currentHash = window.location.hash.slice(1);
      const isHomePage = pathname === '/';
      const isRootPathMatch = href === '/' && isHomePage && !currentHash;
      const isHashMatch = targetId && currentHash === (targetId === 'home-sentinel' ? '' : targetId);

      setIsActive(isRootPathMatch || isHashMatch);
    };

    updateFromURL();
    window.addEventListener('hashchange', updateFromURL);
    return () => window.removeEventListener('hashchange', updateFromURL);
  }, [href, pathname, targetId]);

  // Active via scroll position (IntersectionObserver)
  useEffect(() => {
    if (!targetId) return;

    // Special handling for Home (top of page)
    if (targetId === 'home-sentinel') {
      const sentinel = document.getElementById('home-sentinel');
      if (!sentinel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Active when sentinel (top) is in view
          setIsActive(entry.isIntersecting);
        },
        { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
      );

      observer.observe(sentinel);
      return () => observer.unobserve(sentinel);
    }

    // Regular sections
    const element = document.getElementById(targetId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [targetId]);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(hasMouse ? widthTransform : 40, spring);

  const Wrapper = href ? Link : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'relative inline-flex items-center justify-center',
        isActive && 'rounded-xl bg-neutral-200 dark:bg-neutral-700',
        className
      )}
      tabIndex={0}
    >
      <Wrapper {...wrapperProps}>
        {Children.map(children, (child) =>
          cloneElement(child, {
            width,
            isHovered: hasMouse && mouseX.get() !== Infinity,
            isActive,
          })
        )}
      </Wrapper>
    </motion.div>
  );
}

/* -------------------- DockLabel -------------------- */

export function DockLabel({ children, className }) {
  const { hasMouse } = useDock();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasMouse) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const handleMouseMove = (e) => {
      const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
      setIsVisible(distance < 70);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasMouse]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            'absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------- DockIcon -------------------- */

export function DockIcon({ children, className, width, isActive }) {
  const size = useTransform(width, (v) => v);

  return (
    <motion.div
      style={{ width: size, height: size }}
      className={cn(
        'flex items-center justify-center rounded-lg p-2',
        isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-neutral-600 dark:text-neutral-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}