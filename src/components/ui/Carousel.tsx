import React, { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

export interface CarouselItemData {
  id: string | number;
  title?: string;
  description?: string;
  icon?: ReactNode;
  content?: ReactNode;
  className?: string;
}

export interface CarouselProps {
  items: CarouselItemData[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  renderItem?: (item: CarouselItemData, index: number) => ReactNode;
  showArrows?: boolean;
  onItemSelect?: (item: CarouselItemData, index: number) => void;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
  item: CarouselItemData;
  index: number;
  itemWidth: number;
  round?: boolean;
  trackItemOffset: number;
  x: any;
  transition: any;
  renderItem?: (item: CarouselItemData, index: number) => ReactNode;
}

function CarouselItem({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
  renderItem,
}: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`carousel-item ${round ? 'round' : ''} ${item.className || ''}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' }),
      }}
      transition={transition}
    >
      {renderItem ? (
        renderItem(item, index)
      ) : item.content ? (
        item.content
      ) : (
        <>
          <div className={`carousel-item-header ${round ? 'round' : ''}`}>
            <span className="carousel-icon-container">{item.icon}</span>
          </div>
          <div className="carousel-item-content">
            <div className="carousel-item-title">{item.title}</div>
            <p className="carousel-item-description">{item.description}</p>
          </div>
        </>
      )}
    </motion.div>
  );
}

export interface CarouselHandle {
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  getPosition: () => number;
}

const Carousel = React.forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  {
    items = [],
    baseWidth = 380,
    autoplay = false,
    autoplayDelay = 3500,
    pauseOnHover = false,
    loop = false,
    round = false,
    renderItem,
    showArrows = true,
  },
  ref
) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition: any = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  const handlePrev = () => {
    if (isAnimating) return;
    setPosition((prev) => (loop ? prev - 1 : Math.max(0, prev - 1)));
  };

  const handleNext = () => {
    if (isAnimating) return;
    setPosition((prev) => (loop ? prev + 1 : Math.min(itemsForRender.length - 1, prev + 1)));
  };

  React.useImperativeHandle(
    ref,
    () => ({
      goTo: (index: number) => {
        if (isAnimating) return;
        const target = loop ? index + 1 : index;
        setPosition(target);
      },
      next: handleNext,
      prev: handlePrev,
      getPosition: () => activeIndex,
    }),
    [isAnimating, loop, activeIndex, handleNext, handlePrev]
  );

  return (
    <div className="flex flex-col items-center relative max-w-full">
      <div
        ref={containerRef}
        className={`carousel-container ${round ? 'round' : ''}`}
        style={{
          width: `${baseWidth}px`,
          maxWidth: '92vw',
          ...(round && { height: `${baseWidth}px`, borderRadius: '50%' }),
        }}
      >
        <motion.div
          className="carousel-track"
          drag={isAnimating ? false : 'x'}
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              key={`${item?.id ?? index}-${index}`}
              item={item}
              index={index}
              itemWidth={itemWidth}
              round={round}
              trackItemOffset={trackItemOffset}
              x={x}
              transition={effectiveTransition}
              renderItem={renderItem}
            />
          ))}
        </motion.div>

        {/* Indicators & Navigation Arrows Bar */}
        <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
          <div className="flex items-center gap-3">
            {showArrows && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-7 h-7 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00]/40 text-[#FF8F00] hover:bg-[#FF8F00]/30 hover:border-[#FF8F00] flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div className="carousel-indicators">
              {items.map((_, index) => (
                <motion.button
                  type="button"
                  key={index}
                  className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index}
                  animate={{
                    scale: activeIndex === index ? 1.25 : 1,
                  }}
                  onClick={() => setPosition(loop ? index + 1 : index)}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>

            {showArrows && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="w-7 h-7 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00]/40 text-[#FF8F00] hover:bg-[#FF8F00]/30 hover:border-[#FF8F00] flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Carousel;
