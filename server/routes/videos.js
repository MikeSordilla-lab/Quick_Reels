import express from 'express';
import { body, validationResult } from 'express-validator';
import { Video, Comment } from '../models/index.js';
import { protect } from '../middleware/auth.js';
import upload, { handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// @route   GET /api/videos
// @desc    Get all videos
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: videos } = await Video.findAndCountAll({
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          association: 'comments',
          limit: 5,
          order: [['created_at', 'DESC']]
        }
      ]
    });

    res.json({
      success: true,
      data: {
        videos,
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

// @route   GET /api/videos/:id
// @desc    Get single video
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id, {
      include: [
        {
          association: 'comments',
          order: [['created_at', 'DESC']]
        }
      ]
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      data: { video }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/videos
// @desc    Upload a new video
// @access  Private
router.post(
  '/',
  protect,
  upload.single('video'),
  handleUploadError,
  [
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Description must not exceed 1000 characters')
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

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a video file'
        });
      }

      const { description } = req.body;

      const video = await Video.create({
        user_id: req.user.id,
        video_url: req.file.filename,
        description: description || '',
        uploader_name: req.user.username
      });

      res.status(201).json({
        success: true,
        message: 'Video uploaded successfully',
        data: { video }
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   PUT /api/videos/:id/like
// @desc    Like a video
// @access  Private
router.put('/:id/like', protect, async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    video.likes += 1;
    await video.save();

    res.json({
      success: true,
      message: 'Video liked',
      data: { video }
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/videos/:id/share
// @desc    Share a video (increment share count)
// @access  Private
router.put('/:id/share', protect, async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    video.shares += 1;
    await video.save();

    res.json({
      success: true,
      message: 'Video shared',
      data: { video }
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/videos/:id
// @desc    Delete a video
// @access  Private (owner only)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Check if user owns the video
    if (video.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this video'
      });
    }

    await video.destroy();

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
