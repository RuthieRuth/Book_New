import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography } from '@mui/material';


//function to add new book to the current books available already
function AddBook() {
  const { alert, post } = useAxios('http://localhost:3000');
  const [rateValue, setRateValue] = useState(3);
  //const [hover, setHover] = useState (0);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [], // a collection of boook types kept in an array
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

    // choosing the genre of book. add a new book with genre(s). if book falls under more than one genre, split the types with ','.
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // rating of the book with the rating( number of stars) of choice.
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  // a function to handle when form is submitted
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  /*
  function postHandler() {
    post('books', book);
  }
  */

  async function postHandler() {
    try{
      const response = await post ('books', book);
      if (response.status === 201) {
        setBook ({
          author: '',
          name: '',
          genres: [],
          completed: false,
          start: null,
          end: null,
          stars: null,
        })
      }
    }
    catch (error) {console.log(error)}
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type} autoHideDuration={5000}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            //onClick={rateChangeHandler}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
              //rateChangeHandler(event, newValue);
            }}
            onChangeActive={(event, setHover)=> {
              if (setHover !== -1) {
                setRateValue(setHover); 
              }}}
          />
            <Typography variant="subtitle1">
            {rateValue !== null ? `Rating: ${rateValue}` : ' '}
          </Typography>
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
