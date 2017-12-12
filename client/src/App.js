import React, { Component } from 'react';
import './App.css';
import Home from './components/pages/home.js';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="">
        <Header home={true}/>
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
