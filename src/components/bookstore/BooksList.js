import React from 'react';
import Book from './Book';

const BooksList = ({books, types}) => {
    return (
        <div className="grid-container">
            {books.map((book) => (<Book key={book.id} book={book} types={types} />))}
        </div>
    )
}

export default BooksList;