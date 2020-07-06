import React from 'react';
import * as BooksAPI from './BooksAPI';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import  HomePage  from './pages/home';
import  SearchPage from './pages/search';

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading : [],
      wantToRead : [],
      read : [],
    },
    searched : [],
  }

  searchArrayReset = () =>{
    this.setState({
      searched: []
    })
  }
  searchBook = ( value ) => {
    console.log('searchBook', value)
    if(value.length > 0 ){
      BooksAPI.search(value).then(
        res => {
          if(res.error){
            console.log('no books match ur query');
            this.searchArrayReset();
          }
          console.log(res);
          this.setState({
            searched: [...res]
          },console.log('searched...',this.state.searched))
        }
      )
    }
    console.log("less than 0")
    this.searchArrayReset();
   
  };

  handleModify = (book, value)=>{
    // console.log('book',book);
    // console.log('value',value);
    debugger;
    BooksAPI.update( book, value).then(
        res => {
          if(book.shelf){
            let removedShelf = this.state.shelves[book.shelf];
            let removeIndx = removedShelf.indexOf(book);
            removedShelf.splice(removeIndx, 1);
            this.setState ({
              shelves :{
                ...this.state.shelves,
                [book.shelf] : [...removedShelf],
                [value] : [...this.state.shelves[value], book]
              }
             })
          }else {
            this.setState ({
              shelves :{
                ...this.state.shelves,
                [value] : [...this.state.shelves[value], {...book, shelf : value}]
              }
             })
          }
        }
    )
        // console.log('ModifyShelf',book ,value )
  }

  componentDidMount(){
   const booksResponse = BooksAPI.getAll();
   booksResponse.then(res=> {
    let _shelves = {currentlyReading : [], wantToRead : [], read : []};
     res.forEach( book=> {
        _shelves[book.shelf].push(book)
      }
    );
    this.setState ({
      shelves :{
        ..._shelves
      }
     })
   });
  }


  render() {
    return (
      <Router>
      <div className="app">
            <Switch>
              <Route path="/search">
                <SearchPage  
                searchResult ={this.state.searched} 
                search ={this.searchBook} 
                modify ={this.handleModify}/>
              </Route>
              <Route path="/">
                <HomePage 
                shelves = {this.state.shelves}
                modify ={this.handleModify}
                />
              </Route>
            </Switch>
            <div className="open-search">
              <Link to='search'>
                <button>Add a book</button>
              </Link>
            </div>
            </div>
        </Router>
    )
  }
}

export default BooksApp
