import { useNavigate, useParams } from "react-router-dom";
import data from '../../books.json'; // Import the entire JSON object
import { Box, Button, Card, CardMedia, Stack, Typography } from "@mui/material";

//const fallbackImage = 'https://via.placeholder.com/150'; 

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const bookId = Number(id); // Convert id to a number

    if (isNaN(bookId)) {
        return <p>Invalid book ID</p>;
    } // Check if the conversion was successful

    const books = data.books; // Access the books array from json

    // Ensure books is an array
    console.log(Array.isArray(books)); 
    if (!Array.isArray(books)) {
        return <p>Books data is not an array</p>;
    }

    const book = books.find((book) => book.id === bookId);
    if (!book) {
        return <p>Book not found</p>;
    }

    return (
        <div>

            <Box sx={{ mx: 'auto', p: 2 }}>
                <Stack
                sx={{ justifyContent: 'space-around' }}
                spacing={{ xs: 1 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                >

                <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
                >

                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />  

                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                </Typography>

                <Button onClick={() => navigate(-1)}>Back to list</Button>

              </Card>

                </Stack>
            

            </Box>

            {/* <img src={book.img} alt="image" 
            //onError={(e) => e.target.src = fallbackImage} 
            />
            <p>{book.name}</p>
            <p>{book.author}</p>

            <Button onClick={() => navigate(-1)}>Back to list</Button> */}


        </div>
    );
};

export default Book;