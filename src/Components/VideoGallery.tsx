const VideoGallery = () => {
  const videos = [
    {
      id: "DpHT6CM2yR4",
      title: "Phonetic and phonolgy"
    },
    {
      id: "rgSo-Sn9HvE",
      title: "Internacional Phonetic Alphabet"
    },
    {
      id: "ETSepaQNszY",
      title: "The moon"
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Video Lessons
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="flex flex-col items-center"
            >
              <div className="w-full max-w-xs aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;