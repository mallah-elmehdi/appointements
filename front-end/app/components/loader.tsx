import { motion } from 'framer-motion';
import Logo from '../../public/clean-and-seal-logo-sq.png';

export default function Loader() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-10 bg-white/50">
            <motion.div
                animate={{ scale: [0.8, 1, 0.8] }}
                transition={{
                    duration: 2,
                    repeatType: 'loop',
                    repeat: Infinity,
                }}
                
            >
                <img src={Logo} alt="Clean and Seal Dental" className="max-w-40 w-full" />
            </motion.div>
        </div>
    );
}
