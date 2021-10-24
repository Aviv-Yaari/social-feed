const commentService = require('./comment.service');

async function getComments(req, res) {
  try {
    const comments = await commentService.query(req.query);
    res.send(comments);
  } catch (err) {
    res.status(500).send({ err: 'Failed to get comments' });
  }
}

async function deleteComment(req, res) {
  try {
    await commentService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).send({ err: 'Failed to delete comment' });
  }
}

async function addComment(req, res) {
  try {
    var comment = req.body;
    comment = await commentService.add(comment);
    res.send(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: 'Failed to add comment' });
  }
}

module.exports = {
  getComments,
  deleteComment,
  addComment,
};
