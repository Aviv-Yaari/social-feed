import { CommentDetails } from './CommentDetails';

export function CommentList({ comments, onRemoveComment }) {
  return (
    <ul className="comment-list flex column">
      {comments.map(comment => (
        <CommentDetails key={comment._id} comment={comment} onRemoveComment={onRemoveComment} />
      ))}
    </ul>
  );
}
