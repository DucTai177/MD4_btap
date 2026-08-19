let comments = [
  { id: 1, postId: 1, text: "Bình luận 1 trên bài 1" },
  { id: 2, postId: 1, text: "Bình luận 2 trên bài 1" },
  { id: 3, postId: 2, text: "Bình luận 1 trên bài 2" },
];

let nextCommentId = 4;

export const create = (data) => {
  const newComment = {
    id: nextCommentId++,
    postId: Number(data.postId),
    text: data.text,
  };
  comments.push(newComment);
  return newComment;
};

export const findByPostId = (postId) => {
  return comments.filter((c) => c.postId === Number(postId));
};

export const deleteByPostId = (postId) => {
  const initialLength = comments.length;
  comments = comments.filter((c) => c.postId !== Number(postId));
  return initialLength - comments.length;
};
