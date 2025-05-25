import { motion } from "framer-motion";
import type { Trabajo } from '../types/Trabajo';

interface WorkCardProps {
  trabajo: Trabajo;
  index: number;
  onExpand: (trabajo: Trabajo) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ trabajo, index, onExpand }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
      onClick={() => onExpand(trabajo)}
    >
      <div className="h-48 bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center justify-center relative">
        <span className="text-6xl">📚</span>
        {trabajo.tags && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {trabajo.tags.map(tag => (
              <span key={tag} className="text-xs bg-black/30 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{trabajo.titulo}</h3>
        <p className="text-gray-300 line-clamp-3">
          {trabajo.descripcion}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-blue-300">
            Click to see more
          </span>
          {trabajo.audioUrl && (
            <button 
              className="text-blue-400 hover:text-blue-300"
              onClick={(e) => {
                e.stopPropagation();
                // Lógica para reproducir audio
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;