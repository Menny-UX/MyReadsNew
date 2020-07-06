import React from 'react';
import BookList from '../components/bookList';
import '../App.css';

const HomePage = (props) => {
    console.log('shelves',props)
    
    return ( 
        <>
        {Object.keys(props.shelves).map(shelf=> 
            <BookList name={shelf} content={props.shelves[shelf]} modify={props.modify} key={shelf} ></BookList>
        )}
       </>
    );
}
 
export default HomePage;