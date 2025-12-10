import express from 'express';
import { body, validationResult } from 'express-validator';
import { Comment, Video } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/videos/:videoId/comments
// @desc    Get comments for a video
// @access  Public
router.get('/:videoId', async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    // Check if video exists
    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    const { count, rows: comments } = await Comment.findAndCountAll({
      where: { video_id: videoId },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        comments,
        pagination: {
          total: count,
          page: parseInt(page),
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/videos/:videoId/comments
// @desc    Add a comment to a video
// @access  Private
router.post(
  '/:videoId',
  protect,
  [
    body('comment_text')
      .trim()
      .notEmpty()
      .withMessage('Comment text is required')
      .isLength({ min: 1, max: 1000 })
      .withMessage('Comment must be between 1 and 1000 characters')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { videoId } = req.params;
      const { comment_text } = req.body;

      // Check if video exists
      const video = await Video.findByPk(videoId);
      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found'
        });
      }

      const comment = await Comment.create({
        video_id: videoId,
        user_id: req.user.id,
        username: req.user.username,
        comment_text
      });

      res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        data: { comment }
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private (owner only)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user owns the comment
    if (comment.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    await comment.destroy();

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
