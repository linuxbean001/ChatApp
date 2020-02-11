const uuid = require("uuid/v4");
const fs = require("fs");

const addComment = async (comments, newComment) => {
  const now = Date.now();
  const comment = {
    ...newComment,
    id: uuid(),
    dateAdded: now,
    dateEdited: now
  };

  await writeComments([...comments, comment]);
  return comment;
};

const deleteComment = async (comments, commentId) => {
  await writeComments(comments.filter(c => c.id !== commentId));
};

const editComment = async (comments, editedComment) => {
  const date = Date.now();
  await writeComments(
    comments.map(c =>
      c.id === editedComment.id
        ? { ...c, ...editedComment, dateEdited: date }
        : c
    )
  );

  return {
    ...comments.find(c => c.id === editedComment.id),
    ...editedComment,
    dateEdited: date
  };
};

const getComments = async () =>
  new Promise(res => {
    fs.readFile("./src/comments.json", "utf8", (err, data) => {
      if (err) throw err;
      res(JSON.parse(data));
    });
  });

const writeComments = async comments =>
  new Promise(res => {
    fs.writeFile(
      "./src/comments.json",
      JSON.stringify(comments),
      (err, data) => {
        if (err) throw err;
        res();
      }
    );
  });

module.exports = { addComment, deleteComment, editComment, getComments };
