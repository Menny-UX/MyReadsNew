import React from 'react';
import  BookCard  from './bookCard';
import '../App.css';

const BookShelf = ({name , content, modify}) => {
    return ( 
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            {
                content.length > 0 &&
                (
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        content.map (book =>
                            <li key={book.id}>
                                <BookCard book={book} modify={modify}></BookCard>
                            </li>
                        )
                    }
                    
                    </ol>
                    </div>
                )
            }
            
        </div>
     );
}
 
export default BookShelf;