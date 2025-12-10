import { useRef, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Comments from './Comments';
import api from '../services/api';
import './VideoCard.css';

const VideoCard = ({ video, onUpdate }) => {
  const videoRef = useRef(null);
  const [elementRef, isIntersecting] = useIntersectionObserver();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isIntersecting) {
      videoElement.play().catch(err => console.log('Autoplay prevented:', err));
    } else {
      videoElement.pause();
    }
  }, [isIntersecting]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like videos');
      return;
    }

    try {
      const response = await api.put(`/videos/${video.id}/like`);
      const newLikeCount = response.data.data.likes;
      setIsLiked(!isLiked);
      onUpdate(video.id, { likes: newLikeCount });
    } catch (err) {
      console.error('Error liking video:', err);
    }
  };

  const handleShare = async () => {
    try {
      await api.put(`/videos/${video.id}/share`);
      const newShareCount = video.shares + 1;
      onUpdate(video.id, { shares: newShareCount });
      
      // Copy link to clipboard
      const url = `${window.location.origin}/video/${video.id}`;
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Error sharing video:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="video-card" ref={elementRef}>
      <div className="video-header">
        <div className="video-user">
          <div className="user-avatar">
            {video.User?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-info-text">
            <div className="username">{video.User?.username || 'Unknown'}</div>
            <div className="video-date">{formatDate(video.created_at)}</div>
          </div>
        </div>
      </div>

      <div className="video-container">
        <video
          ref={videoRef}
          src={`/api${video.video_url}`}
          className="video-player"
          loop
          playsInline
          controls
        />
      </div>

      {video.description && (
        <div className="video-description">{video.description}</div>
      )}

      <div className="video-actions">
        <button
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="action-count">{video.likes || 0}</span>
        </button>

        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <span className="action-icon">💬</span>
          <span className="action-count">{video.comment_count || 0}</span>
        </button>

        <button className="action-btn" onClick={handleShare}>
          <span className="action-icon">📤</span>
          <span className="action-count">{video.shares || 0}</span>
        </button>
      </div>

      {showComments && (
        <Comments
          videoId={video.id}
          onCommentCountChange={(count) => onUpdate(video.id, { comment_count: count })}
        />
      )}
    </div>
  );
};

export default VideoCard;
