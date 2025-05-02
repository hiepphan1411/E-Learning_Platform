import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

function Banner() {
  return (
    <div className="banner w-full">
      <div className="banner-content flex items-center justify-between gap-10 py-5 max-w-[1200px] mx-auto">
        <motion.div
          variants={FadeUp(0.8)}
          initial="initial"
          animate="animate"
          className="banner-title w-1/2 flex flex-col justify-end items-start gap-4"
        >
          <motion.h1 className="text-5xl font-bold">
            Welcome to HiGi – your gateway to smarter, more engaging e-learning!
          </motion.h1>
          <p className="text-xl">
            Explore interactive courses, boost your skills, and learn at your
            own pace anytime, anywhere.
          </p>
          <button className="group bg-yellow-400 hover:bg-teal-600 btn-transparent text-white font-bold py-2 px-6 rounded-[12px] transition-colors duration-300 flex gap-1 justify-center items-center shadow-lg">
            Get Started
            <ArrowRight className="text-lg transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-rotate-45" />
          </button>
        </motion.div>
        <div className="banner-image h-full w-1/2 flex justify-center items-end">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src="../banner.png"
            alt="Banner"
          ></motion.img>
        </div>
      </div>
    </div>
  );
}

export default Banner;
