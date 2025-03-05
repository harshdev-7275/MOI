import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Building, Scan, Crosshair } from 'lucide-react';
import buildingAnimation from "../assets/buildingAnimation.json"
import Lottie from 'react-lottie-player'
import loadingVideo1 from "../assets/loadingVideo1.gif"




const LoadingPage = ({ setIsAnalyzingLoadingDone }: any) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    console.log("buildingAnimation", buildingAnimation);
    const [videoUrl , setVideoUrl] = useState("loadingVideo1");


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setIsAnalyzingLoadingDone(true);
        }, 20000);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, []);

    const scanLineVariants = {
        initial: { y: -400 },
        animate: {
            y: 400,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const iconVariants = {
        initial: { scale: 0.8, opacity: 0.5 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    };

    const gridVariants = {
        initial: { opacity: 0.3 },
        animate: {
            opacity: 0.6,
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    };
    // const videoChangeHandler = () => {
    //     if(videoUrl === "loadingVideo1"){
    //         setVideoUrl("loadingAnimation2");
    //     }else{
    //         setVideoUrl("loadingVideo1");   
            

    // }

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 bg-black flex items-center justify-center z-50"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                   <div className='w-full absolute z-0 flex items-center justify-center'>
                   <Lottie
                        loop
                        animationData={buildingAnimation}
                        play
                        style={{ width: 500, height: 500 }}
                        className='backdrop-blur-md'
                    />
                    {/* <div>
                        <video autoPlay src={videoUrl} onEnded={videoChangeHandler}/>
                    </div> */}
                    <span className='bg-black absolute z-10 top-0 left-0 w-full h-full opacity-50'></span>
                   </div>

                    {/* Grid Background */}
                    <div className="absolute top-10 flex space-x-6">
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Building className="w-12 h-12 text-blue-400" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>
                            <Camera className="w-12 h-12 text-blue-400" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>
                            <Crosshair className="w-12 h-12 text-blue-400" />
                        </motion.div>
                    </div>

                    <motion.div
                        className="absolute inset-0 bg-grid-pattern opacity-30 z-50"
                        variants={gridVariants}
                        initial="initial"
                        animate="animate"
                    />

                    {/* Scanning line effect */}
                    <motion.div
                        className="absolute w-full h-2 bg-gradient-to-b from-blue-500/50 to-transparent"
                        variants={scanLineVariants}
                        initial="initial"
                        animate="animate"
                    />

                    <div className="relative z-10 flex flex-col items-center max-w-md px-4">
                        {/* Icon Animation Container */}
                        <div className="flex justify-around w-full mb-8">
                            <motion.div variants={iconVariants} initial="initial" animate="animate">
                                <Building className="w-8 h-8 text-blue-400" />
                            </motion.div>
                            <motion.div variants={iconVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
                                <Scan className="w-8 h-8 text-blue-400" />
                            </motion.div>
                            <motion.div variants={iconVariants} initial="initial" animate="animate" transition={{ delay: 0.6 }}>
                                <Camera className="w-8 h-8 text-blue-400" />
                            </motion.div>
                            <motion.div variants={iconVariants} initial="initial" animate="animate" transition={{ delay: 0.9 }}>
                                <Crosshair className="w-8 h-8 text-blue-400" />
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                            <motion.div
                                className="h-full bg-blue-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            className="text-center text-white font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-2">Analyzing Building Architecture</h2>
                            <div className="text-sm text-blue-300 space-y-1">
                                <p>Scanning floor plans...</p>
                                <p>Identifying optimal camera positions...</p>
                                <p>Calculating coverage zones...</p>
                            </div>
                            <p className="mt-4 text-sm text-slate-400">{progress}% Complete</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingPage;