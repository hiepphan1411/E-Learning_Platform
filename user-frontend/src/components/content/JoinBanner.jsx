import { motion } from "framer-motion";

function JoinBanner() {
  return (
    <section>
      <div className="container flex justify-between items-center gap-8 px-12">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px] flex flex-col items-start">
            <h1 className="text-4xl font-bold !leading-snug">
              Join Our Community to Start your Journey
            </h1>
            <p className="text-gray-600">
              Become part of a growing network of 450K+ learners! Subscribe now
              to access expert-led courses, stay ahead with the latest
              knowledge, and achieve your personal and professional goals.
            </p>
            <a
              href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0"
              className="bg-yellow-400 rounded-xl py-2 px-4 text-white hover:bg-teal-600 hover:scale-120 duration-300 shadow-lg font-medium"
            >
              Join Now
            </a>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src="/education.png"
            alt=""
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
}

export default JoinBanner;
