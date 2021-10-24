import React, { useCallback, useEffect, useState } from 'react';
import { AddComment } from '../cmps/AddComment';
import { CommentFilter } from '../cmps/CommentFilter';
import { CommentList } from '../cmps/CommentList';
import { commentService } from '../services/comment.service';

export function HomePage() {
  const [comments, setComments] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
  const loadComments = useCallback(
    filterBy => commentService.query(filterBy).then(comments => setComments(comments)),
    []
  );

  useEffect(() => {
    loadComments(filterBy);
  }, [loadComments, filterBy]);

  const handleAddComment = async (email, message) => {
    const addedComment = await commentService.add(email, message);
    setComments(prevComments => [...prevComments, addedComment]);
  };

  const handleRemoveComment = async id => {
    await commentService.remove(id);
    setComments(prevComments => prevComments.filter(comment => comment._id !== id));
  };

  const handleFilterComments = async text => {
    setFilterBy(prevFilter => ({ ...prevFilter, text }));
  };

  const handleSortComments = async sortBy => {
    const { name } = sortBy.target;
    // if there is a sort with this field: invert the sort direction. otherwise, create a sort field.
    setFilterBy(prevFilter => ({
      ...prevFilter,
      sortBy: { [name]: ((prevFilter?.sortBy && prevFilter.sortBy[name]) || -1) * -1 },
    }));
  };

  return (
    <main className="home-page flex column">
      <AddComment onAddComment={handleAddComment} />
      {comments && (
        <CommentFilter
          onFilterComments={handleFilterComments}
          onSortComments={handleSortComments}
          sortBy={filterBy && filterBy.sortBy}
        />
      )}
      {comments && <CommentList comments={comments} onRemoveComment={handleRemoveComment} />}
    </main>
  );
}
