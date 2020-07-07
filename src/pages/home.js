import React from 'react';
import BookList from '../components/bookList';
import '../App.css';
import { Link } from "react-router-dom";

const HomePage = (props) => {
    return ( 
        <>
        {Object.keys(props.shelves).map(shelf=> 
            <BookList name={shelf} content={props.shelves[shelf]} modify={props.modify} key={shelf} ></BookList>
        )}
        <div className="open-search">
              <Link to='search' onClick={props.reset}>
                <button>Add a book</button>
              </Link>
        </div>
       </>
    );
}
 
export default HomePage;