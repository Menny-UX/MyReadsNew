import React from 'react';
import {Link} from "react-router-dom";
import  BookCard  from '../components/bookCard';

const SearchComponent = (props) => {
    return ( 
        <div className="search-books">
        <div className="search-books-bar">
        <Link to='/'>
          <button className="close-search" >Close</button>
        </Link>  
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" 
            onChange={(e)=>props.search(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            props.searchResult.length > 0?
            props.searchResult.map (book =>
                <li key={book.id}>
                    <BookCard book={book} modify={props.modify}></BookCard>
                </li>
            )
            :
            null
          }
          </ol>
        </div>
      </div>
     );
}
 
export default SearchComponent;