import React from 'react';

const Book = ({book, types}) => {
    return (
        <div className="sm-1 md-1-2 lg-1-3">
            <div className="book">
                <h2>{book.title}</h2>
                <h4>{book.author}</h4>
                <img src={book.img} alt={book.title} />
                <p>{book.typeTitle}</p>
                <span>{book.price} EUR</span>
            </div>
        </div>
    )
}

export default Book;