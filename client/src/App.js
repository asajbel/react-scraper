import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Detail from './pages/Detail';
import NoMatch from "./pages/NoMatch";
import Footer from './components/Footer';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
    	<Router> 
	      <div className="">
	        <Header home={true}/>
	        <Switch>
		        <Route exact path="/" component={Home} />
		        <Route exact path="/saved" component={Saved} />
		        <Route exact path="/detail/:id" component={Detail} />
        		<Route component={NoMatch} />
	        </Switch>
	        <Footer />
	      </div>
      </Router>
    );
  }
}

export default App;
