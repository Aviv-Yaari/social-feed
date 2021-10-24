import { Card, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

export function CommentDetails({ comment, onRemoveComment }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMore = ev => {
    setAnchorEl(ev.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dateFormat = new Date(comment.timestamp).toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <Card className="comment-details" component="li" sx={{ boxShadow: 'none' }}>
      <CardHeader
        avatar={<img src={'https://www.gravatar.com/avatar/' + comment.hashedEmail} alt={comment.email} />}
        title={comment.message}
        subheader={dateFormat + ' - ' + comment.email}
        action={
          <IconButton onClick={handleMore} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => onRemoveComment(comment._id)}>Delete</MenuItem>
      </Menu>
    </Card>
  );
}
