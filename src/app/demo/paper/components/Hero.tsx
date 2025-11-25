import * as motion from 'framer-motion/client';

export default function Hero() {
  return (
    <section className="h-full w-full relative">
      <div className="absolute bottom-0 left-0 flex items-center justify-center pointer-events-none z-10 pb-12 w-full">
        <motion.h1
          initial={{ opacity: 0, scale: 1.5, y: '100%' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[17vw] font-bold tracking-tight leading-[0.8] text-[#CDCAB7] [-webkit-text-stroke:3px_#484D2E] [paint-order:stroke_fill]"
        >
          Resonant Frequency
        </motion.h1>
      </div>
    </section>
  );
}
