import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  } 

  // to make sure 'fetch' will work in older browsers, install fetch polyfill (https://github.com/github/fetch)
  componentDidMount() {
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=FSvAhwR1Vw1oLOt0oQYmpbNo7aBvpXTG&q=sexy&limit=25&offset=0&rating=r&lang=en')
    //   .then(response => response.json())
    //   .then(responseData => {
    //     this.setState({gifs: responseData.data});
    //   })
    //   .catch((error) => {
    //     console.log('Error fetchign and parsing data', error);
    //   });


    this.performSearch();
  }

  performSearch = (query = 'cats') => {
    // Make a request for a user with a given ID
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=FSvAhwR1Vw1oLOt0oQYmpbNo7aBvpXTG&q=${query}&limit=24&offset=0&rating=g&lang=en`)
      .then( (response) => {
        this.setState( { 
          gifs: response.data.data, 
          loading: false 
        });
        console.log('hello: ', this.state.gifs);
      })
      .catch( (error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading) 
            ? <p>Loading...</p> 
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
