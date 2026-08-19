let posts = [
  {
    id: 1,
    title: "Bài viết mẫu số 1",
    content: "Nội dung bài viết 1",
    thumbnailUrl: null,
  },
  {
    id: 2,
    title: "Bài viết mẫu số 2",
    content: "Nội dung bài viết 2",
    thumbnailUrl: null,
  },
];

let nextPostId = 3;

export const getAll = () => {
  return posts;
};

export const findById = (id) => {
  return posts.find((p) => p.id === Number(id));
};

export const create = (data) => {
  const newPost = {
    id: nextPostId++,
    title: data.title,
    content: data.content,
    thumbnailUrl: data.thumbnailUrl || null,
  };
  posts.push(newPost);
  return newPost;
};

export const deleteById = (id) => {
  const index = posts.findIndex((p) => p.id === Number(id));
  if (index !== -1) {
    const deletedPost = posts.splice(index, 1)[0];
    return deletedPost;
  }
  return null;
};
