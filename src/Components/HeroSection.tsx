import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            My English
          </span>{" "}
          Projects
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Explore my projects on phonetics, pronunciation, and English linguistics
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-900/30 transition"
          >
            Listen to Samples
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
