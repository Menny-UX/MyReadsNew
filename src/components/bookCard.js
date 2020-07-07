import React from 'react';
import  BookshelfChanger  from './bookshelfChanger';
import '../App.css';

const BookCard = ({book, modify}) => {
    return ( 
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}>
                </div>
                <BookshelfChanger book={book} modify={modify} ></BookshelfChanger>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
     );
}
 
export default BookCard;