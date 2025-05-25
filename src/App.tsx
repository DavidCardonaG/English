import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import trabajosData from "./data/works.json";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import WorkCard from "./Components/WorkCard";
import PhoneticKeyboard from "./Components/PhoneticKeyboard";
import Footer from "./Components/Footer";
import VideoGallery from "./Components/VideoGallery";
import type { Trabajo } from "./types/Trabajo";

const App: React.FC = () => {
  const [works, setWorks] = useState<Trabajo[]>([]);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeTab, setActiveTab] = useState<"works" | "phonetics">("works");
  const [selectedWork, setSelectedWork] = useState<Trabajo | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorks(trabajosData);
  }, []);

  const handleExpandWork = (work: Trabajo) => {
    setSelectedWork(work);
  };

  const closeModal = () => {
    setSelectedWork(null);
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Background noise */}
      <div className="fixed inset-0 bg-noise opacity-10 pointer-events-none"></div>

      <Navbar 
        onPhoneticsClick={() => setShowKeyboard(!showKeyboard)} 
        onContactClick={scrollToFooter}
      />

      <main className="relative z-10">
        <HeroSection />

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 rounded-full p-1">
            <button
              className={`px-6 py-2 rounded-full transition ${activeTab === "works" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("works")}
            >
              My Projects
            </button>
            <button
              className={`px-6 py-2 rounded-full transition ${activeTab === "phonetics" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("phonetics")}
            >
              Interactive Phonetics
            </button>
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "works" ? (
            <>
              <motion.section
                key="works"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto"
              >
                {works.map((work, index) => (
                  <WorkCard
                    key={work.id}
                    trabajo={work}
                    index={index}
                    onExpand={handleExpandWork}
                  />
                ))}
              </motion.section>

              {/* Sección de videos debajo de las cards */}
              <VideoGallery />
            </>
          ) : (
            <motion.section
              key="phonetics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6"
            >
              <PhoneticKeyboard />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer ref={footerRef} />

      {/* Work Detail Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {selectedWork.imageUrl ? (
                  <div className="h-64 bg-gray-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src={selectedWork.imageUrl} 
                      alt={selectedWork.titulo}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center justify-center">
                    <span className="text-8xl">📖</span>
                  </div>
                )}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedWork.titulo}</h2>
                
                {selectedWork.contenido?.map((item, i) => {
                  if (typeof item === 'string' && item.startsWith("IMAGE::")) {
                    const imageUrl = item.replace("IMAGE::", "");
                    return (
                      <div key={`img-${i}`} className="my-6 flex justify-center bg-gray-900 p-4 rounded-lg">
                        <img 
                          src={imageUrl} 
                          alt="Content illustration"
                          className="max-w-full max-h-[500px] object-contain rounded-md border border-gray-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            console.error("Error loading image:", imageUrl);
                          }}
                        />
                      </div>
                    );
                  }
                  
                  return (
                    <p key={`text-${i}`} className="mb-4 text-gray-300">
                      {typeof item === 'string' && (item.startsWith('•') || item.startsWith('________________________________________')) 
                        ? <span className="block">{item}</span> 
                        : item}
                    </p>
                  );
                })}

                {selectedWork.audioUrl && (
                  <div className="mt-6 flex justify-center">
                    <button className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phonetic keyboard modal */}
      <AnimatePresence>
        {showKeyboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowKeyboard(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-gray-800 rounded-xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <PhoneticKeyboard />
              <button
                className="mt-6 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setShowKeyboard(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;