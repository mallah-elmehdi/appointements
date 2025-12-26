import { motion, useAnimate, useAnimation, useAnimationControls, useInView } from 'framer-motion';
import { useCalendarContext } from '.';
import { useEffect } from 'react';

export default function CalendarAnimation({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.4,
                scale: { type: 'spring', visualDuration: 0.2, bounce: 0.25 },
            }}
        >
            {children}
        </motion.div>
    );
}
