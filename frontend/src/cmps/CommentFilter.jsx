import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button, InputBase } from '@mui/material';

export function CommentFilter({ sortBy, onFilterComments, onSortComments }) {
  const SortButton = ({ name, text }) => {
    let sortIcon = <></>;
    if (sortBy && sortBy[name]) sortIcon = sortBy[name] === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />;
    return (
      <Button name={name} onClick={onSortComments} startIcon={sortIcon}>
        {text}
      </Button>
    );
  };
  return (
    <section className="comment-filter flex">
      <div className="flex align-center" style={{ backgroundColor: 'white' }}>
        <SearchIcon />
        <InputBase placeholder="Search.." sx={{ padding: '5px' }} onChange={ev => onFilterComments(ev.target.value)} />
      </div>
      <SortButton name="message" text="Message" />
      <SortButton name="timestamp" text="Date" />
    </section>
  );
}
