import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setError('');

    // Validate file type
    const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload MP4, MPEG, MOV, AVI, or WEBM');
      return;
    }

    // Validate file size (100MB)
    const maxSize = 100 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 100MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a video file');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');

    const formData = new FormData();
    formData.append('video', file);
    formData.append('description', description);

    try {
      await api.post('/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });

      // Success - redirect to home
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <h1>Upload Video</h1>
          <p>Share your moment with the world</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="upload-form" onSubmit={handleSubmit}>
          <div
            className={`file-drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="file-preview">
                <video
                  src={URL.createObjectURL(file)}
                  className="preview-video"
                  controls
                />
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Change Video
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon">📹</div>
                <p className="upload-text">
                  Drag and drop your video here
                </p>
                <p className="upload-subtext">or</p>
                <label htmlFor="file-input" className="btn btn-primary">
                  Browse Files
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <p className="upload-info">
                  Supported formats: MP4, MPEG, MOV, AVI, WEBM (Max 100MB)
                </p>
              </>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your video..."
              rows="4"
              maxLength="500"
            />
            <div className="char-count">{description.length}/500</div>
          </div>

          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-text">{progress}% uploaded</div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={!file || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
