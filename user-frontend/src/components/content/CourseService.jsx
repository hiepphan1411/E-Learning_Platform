import {
  Smartphone,
  NotebookPen,
  LaptopMinimalCheck,
  Database,
  ShieldHalf,
  PanelsTopLeft,
} from "lucide-react";
import Card from "../card/Card";
import { motion } from "framer-motion";

const ItemService = [
  {
    id: 1,
    title: "Web Development",
    image: <PanelsTopLeft />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Mobile Development",
    image: <Smartphone />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "UI/UX Design",
    image: <LaptopMinimalCheck />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Information Security",
    image: <ShieldHalf />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "Content Writing",
    image: <NotebookPen />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Database Management",
    image: <Database />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

function CourseService() {
  return (
    <div className="content-container flex flex-col w-full gap-10 py-10 px-12">
      <h1 className="font-bold text-3xl">Services we provide</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {ItemService.map((item) => (
          <motion.li
            key={item.id}
            variants={SlideLeft(item.delay)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card title={item.title} image={item.image}></Card>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default CourseService;
