const express = require('express');
const { addComment, getComments, deleteComment } = require('./comment.controller');
const router = express.Router();

router.get('/', getComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);

module.exports = router;
