import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import api from '../services/api';
import './VideoFeed.css';

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await api.get(`/videos?page=${page}&limit=10`);
      const newVideos = response.data.data;
      
      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos(prev => [...prev, ...newVideos]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load videos. Please try again.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpdate = (videoId, updates) => {
    setVideos(prev =>
      prev.map(video =>
        video.id === videoId ? { ...video, ...updates } : video
      )
    );
  };

  if (loading && videos.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && videos.length === 0) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="video-feed">
      {videos.length === 0 ? (
        <div className="empty-feed">
          <h2>No videos yet</h2>
          <p>Be the first to upload a video!</p>
        </div>
      ) : (
        videos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            onUpdate={handleVideoUpdate}
          />
        ))
      )}
      
      {hasMore && videos.length > 0 && (
        <div className="load-more">
          <button onClick={loadVideos} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
