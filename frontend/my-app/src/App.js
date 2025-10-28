import React, { useState, useEffect } from 'react';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import AnimatedBackground from './components/AnimatedBackground';
import { videoAPI } from './services/api';
import './components/App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await videoAPI.getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Ошибка загрузки списка видео:', error);
      alert('Не удалось загрузить список видео');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await videoAPI.deleteVideo(videoId);
      fetchVideos();
      alert('Видео удалено');
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении видео');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
      <div className="App">
        <AnimatedBackground />

        <header>
          <h1> VIDEOHOSTING</h1>
        </header>

        <main>
          <VideoUpload onVideoUploaded={fetchVideos} />
          <VideoList
              videos={videos}
              onDeleteVideo={handleDeleteVideo}
              loading={loading}
          />
        </main>
      </div>
  );
}

export default App;