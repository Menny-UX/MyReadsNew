import React from 'react';
import * as BooksAPI from './BooksAPI';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
    if(value.length > 0 ){
      BooksAPI.search(value).then(
        res => {
          if(res.error){
            this.searchArrayReset();
          }else{
            let MyShelves = [];
             Object.keys(this.state.shelves).forEach((key)=> { 
              MyShelves = [...MyShelves ,...this.state.shelves[key]];
            }); 
            let searchResult = res.map(book => {
              let mapIndx = MyShelves.findIndex(selfRec => selfRec.id === book.id);
              if (mapIndx !== -1){
                return MyShelves[mapIndx];
              }
              else {
                return book;
              }
            })
            this.setState({
              searched: [...searchResult]
            })
          }
        }
      )
    }
    this.searchArrayReset();
   
  };

  handleModify = (book, value)=>{
    BooksAPI.update( book, value).then(
        res => {
            if(book.shelf && book.shelf !== 'none'){
              let removedShelf = this.state.shelves[book.shelf];
              let removeIndx = removedShelf.indexOf(book);
              removedShelf.splice(removeIndx, 1);
              if(value === 'none'){
                this.setState ({
                  shelves :{
                    ...this.state.shelves,
                    [book.shelf] : [...removedShelf]
                  }
                 })
              } else {
                this.setState ({
                  shelves :{
                    ...this.state.shelves,
                    [book.shelf] : [...removedShelf],
                    [value] : [...this.state.shelves[value], book]
                  }
                 })
              }
            
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
                reset ={this.searchArrayReset}
                />
              </Route>
            </Switch>
            </div>
        </Router>
    )
  }
}

export default BooksApp
