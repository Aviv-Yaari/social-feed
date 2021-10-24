import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export function AddComment({ onAddComment }) {
  const [comment, setComment] = useState({ email: '', message: '' });

  const handleChange = ev => {
    const { name, value } = ev.target;
    setComment(prevComment => ({ ...prevComment, [name]: value }));
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onAddComment(comment.email, comment.message);
    setComment(prevComment => ({ ...prevComment, message: '' }));
  };

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        margin="normal"
        sx={{ backgroundColor: 'white' }}
        required
        value={comment.email}
        onChange={handleChange}
      />
      <TextField
        name="message"
        label="Message"
        variant="outlined"
        fullWidth
        type="text"
        multiline
        minRows={4}
        maxRows={8}
        margin="normal"
        required
        sx={{ backgroundColor: 'white' }}
        value={comment.message}
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
