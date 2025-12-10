import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: ''
  },
  uploaderName: {
    type: String,
    required: [true, 'Uploader name is required']
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative']
  },
  shares: {
    type: Number,
    default: 0,
    min: [0, 'Shares cannot be negative']
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
videoSchema.index({ userId: 1 });
videoSchema.index({ createdAt: -1 }); // For sorting by newest first

// Virtual populate for comments
videoSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'videoId'
});

// Virtual populate for user details
videoSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
