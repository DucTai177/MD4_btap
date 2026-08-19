import * as CommentModel from "../models/Comment.js";
import * as PostModel from "../models/Post.js";
import { AppError } from "../utils/AppError.js";

export const createComment = (req, res, next) => {
  try {
    const { postId, text } = req.body;
    if (!postId || !text) {
      return next(new AppError("Vui lòng cung cấp postId và text", 400));
    }

    const post = PostModel.findById(postId);
    if (!post) {
      return next(
        new AppError("Không tìm thấy bài viết tương ứng với postId", 404),
      );
    }

    const newComment = CommentModel.create({ postId, text });
    return res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPost = (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = CommentModel.findByPostId(postId);
    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};
