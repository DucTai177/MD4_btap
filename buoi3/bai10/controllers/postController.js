import * as PostModel from "../models/Post.js";
import * as CommentModel from "../models/Comment.js";
import { AppError } from "../utils/AppError.js";

export const getAllPosts = (req, res, next) => {
  try {
    const posts = PostModel.getAll();
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getPostById = (req, res, next) => {
  try {
    const { id } = req.params;
    const post = PostModel.findById(id);
    if (!post) {
      return next(new AppError("Không tìm thấy bài viết", 404));
    }
    const comments = CommentModel.findByPostId(id);
    return res.status(200).json({
      success: true,
      data: { ...post, comments },
    });
  } catch (err) {
    next(err);
  }
};

export const createPost = (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return next(
        new AppError("Vui lòng nhập đầy đủ tiêu đề và nội dung", 400),
      );
    }

    let thumbnailUrl = null;
    if (req.file) {
      thumbnailUrl = `/uploads/${req.file.filename}`;
    }

    const newPost = PostModel.create({ title, content, thumbnailUrl });
    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = (req, res, next) => {
  try {
    const { id } = req.params;
    const post = PostModel.findById(id);
    if (!post) {
      return next(new AppError("Không tìm thấy bài viết để xóa", 404));
    }

    PostModel.deleteById(id);
    CommentModel.deleteByPostId(id);

    return res.status(200).json({
      success: true,
      message: "Xóa bài viết và toàn bộ bình luận liên quan thành công",
    });
  } catch (err) {
    next(err);
  }
};
