import { NotebookText, Clock, UserRoundCheck } from "lucide-react";
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

const PlatfromOverview = [
  {
    id: 1,
    title: "10.000+ Courses",
    img: <NotebookText />,
  },
  {
    id: 2,
    title: "Expert Instructors",
    img: <UserRoundCheck />,
  },
  {
    id: 3,
    title: "Lifetime Access",
    img: <Clock />,
  },
];

function IntroducePlatform() {
  return (
    <div className="introduce-platform flex w-full gap-12 justify-center mb-5 mt-5">
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
      >
        <img src="../hero.png" className="w-110"></img>
      </motion.div>
      <motion.div
        variants={FadeUp(0.8)}
        initial="initial"
        whileInView="animate"
      >
        <h1 className="text-3xl font-bold">
          The World's Leading Online learning Platform
        </h1>
        <ul className="flex flex-col gap-8 mt-10">
          {PlatfromOverview.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-start gap-3 py-4 rounded-xl px-6 bg-gray-200 shadow-lg hover:shadow-lg hover:bg-white hover:scale-105 hover:text-teal-600 duration-300"
            >
              <div>{item.img}</div>
              <span className="text-lg">{item.title}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default IntroducePlatform;
