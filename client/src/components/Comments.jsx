import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Comments.css';

const Comments = ({ videoId, onCommentCountChange }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const loadComments = async () => {
    try {
      const response = await api.get(`/videos/${videoId}/comments`);
      setComments(response.data.data);
      onCommentCountChange(response.data.data.length);
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setSubmitting(true);
    try {
      const response = await api.post(`/videos/${videoId}/comments`, {
        content: newComment
      });
      setComments([response.data.data, ...comments]);
      setNewComment('');
      onCommentCountChange(comments.length + 1);
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c.id !== commentId));
      onCommentCountChange(comments.length - 1);
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>Comments ({comments.length})</h3>
      </div>

      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
            className="comment-input"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="btn btn-primary btn-sm"
          >
            {submitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      ) : (
        <div className="comment-login-prompt">
          Please login to comment
        </div>
      )}

      <div className="comments-list">
        {loading ? (
          <div className="comments-loading">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="no-comments">No comments yet. Be the first!</div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">
                {comment.User?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="comment-content">
                <div className="comment-header-info">
                  <span className="comment-username">
                    {comment.User?.username || 'Unknown'}
                  </span>
                  <span className="comment-date">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <div className="comment-text">{comment.content}</div>
              </div>
              {user && user.id === comment.user_id && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="comment-delete"
                  title="Delete comment"
                >
                  🗑️
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
