import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: [true, 'Video ID is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
    minlength: [1, 'Comment cannot be empty'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Indexes for faster queries
commentSchema.index({ videoId: 1 });
commentSchema.index({ userId: 1 });
commentSchema.index({ createdAt: -1 });

// Auto-populate user details when querying comments
commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'userId',
    select: 'username profilePicture'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
