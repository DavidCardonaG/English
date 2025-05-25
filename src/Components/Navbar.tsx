import { motion } from "framer-motion";

interface NavbarProps {
  onPhoneticsClick: () => void;
  onContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPhoneticsClick, onContactClick }) => {
  return (
    <nav className="py-6 px-6 flex justify-between items-center max-w-6xl mx-auto">
      <motion.div
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
      >
        English Phonetics
      </motion.div>
      
      <div className="flex space-x-4">
        <button
          onClick={onPhoneticsClick}
          className="px-4 py-2 bg-transparent border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-900/30 transition"
        >
          Phonetic Keyboard
        </button>
        <button 
          onClick={onContactClick}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;