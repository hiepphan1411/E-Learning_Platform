import React from "react";
import { motion } from "framer-motion";
import { Youtube, Instagram, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-28 bg-[#f7f7f7] flex items-center justify-end">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
          {/* first section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">The Coding Journey</h1>
            <p className="text-gray-500">
              TCJ is a platform dedicated to empowering aspiring developers.
              From beginner tutorials to advanced programming concepts, we
              provide a comprehensive learning experience designed to help you
              master coding skills, build projects, and launch your tech career.
            </p>
          </div>
          {/* second section */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Courses</h1>
              <div className="text-gray-500">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    Web Development
                  </li>
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    Mobile Development
                  </li>
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    UI/UX Design
                  </li>
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    Content Writing
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Links</h1>
              <div className="text-gray-500">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    Home
                  </li>
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    Services
                  </li>
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    About
                  </li>
                  <li className="cursor-pointer hover:text-gray-800 duration-200">
                    Contact
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* third section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button className="bg-yellow-400 hover:bg-teal-600 duration-500 text-white font-semibold py-4 px-6 rounded-e-xl">
                Go
              </button>
            </div>
            {/* social icons */}
            <div className="flex space-x-6 py-3">
              <a href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0">
                <Github className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="https://www.instagram.com/the.coding.journey/">
                <Linkedin className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="https://thecodingjourney.com/">
                <Instagram className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="https://www.youtube.com/@TheCodingJourney">
                <Youtube className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
