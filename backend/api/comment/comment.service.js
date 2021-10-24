const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy);
    const sortBy = filterBy.sortBy ? JSON.parse(filterBy.sortBy) : {};
    const collection = await dbService.getCollection('comment');
    const comments = await collection.find(criteria).sort(sortBy).toArray();
    return comments;
  } catch (err) {
    console.error('cannot find comments', err);
    throw err;
  }
}

async function remove(commentId) {
  try {
    const collection = await dbService.getCollection('comment');
    const criteria = { _id: ObjectId(commentId) };
    await collection.deleteOne(criteria);
  } catch (err) {
    console.error(`cannot remove comment ${commentId}`, err);
    throw err;
  }
}

async function add(comment) {
  try {
    const collection = await dbService.getCollection('comment');
    await collection.insertOne(comment);
    return comment;
  } catch (err) {
    console.error('cannot insert comment', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};
  if (filterBy.text) {
    const textCriteria = { $regex: filterBy.text, $options: 'i' };
    criteria.$or = [
      {
        email: textCriteria,
      },
      {
        message: textCriteria,
      },
    ];
  }
  return criteria;
}

module.exports = {
  query,
  remove,
  add,
};
