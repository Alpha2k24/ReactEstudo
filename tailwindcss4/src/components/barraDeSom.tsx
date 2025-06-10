import { motion } from "framer-motion";
import React, { JSX, useEffect, useState } from "react";

export default function BarraDeSom(): JSX.Element {
    const [volume, setVolume] = useState(0);
    const [subindo, setSubindo] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVolume(prev => {
                if (prev >= 100) {
                    setSubindo(false);
                    return prev - 10;
                } else if (prev <= 0) {
                    setSubindo(true);
                    return prev + 10;
                }
                return subindo ? prev + 10 : prev - 10;
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, [subindo]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="h-72 w-32 bg-gray-100 rounded-2xl flex items-end justify-center border-2 border-gray-300 relative overflow-hidden">
                <motion.div
                    className={`w-full rounded-2xl flex items-end justify-center ${volume > 0 ? 'bg-gray-800' : 'bg-transparent'}`}
                    animate={{ height: `${volume}%` }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    🔊
                </motion.div>
            </div>
        </div>
    );
}
