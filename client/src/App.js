import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Document from './components/Document'
import SingleDocument from './components/SingleDocument'
import Event from './components/Event'
import SingleEvent from './components/SingleEvent'
import Job from './components/Job'
import SingleJob from './components/SingleJob'
// import Response from './components/Response'
// import SingleResponse from './components/SingleResponse'
import Contact from './components/Contact'
import SingleContact from './components/SingleContact'

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div><NavBar /></div>
          <Switch>
            <Route exact path='/document' component={Document}></Route>
            <Route exact path='/document/:documentId' component={SingleDocument}></Route>
            <Route exact path='/event' component={Event}></Route>
            <Route exact path='/event/:eventId' component={SingleEvent}></Route>
            <Route exact path='/job' component={Job}></Route>
            <Route exact path='/job/:jobId' component={SingleJob}></Route>
            {/* <Route exact path='/response' component={Response}></Route>
            <Route exact path='/responseId' component={SingleResponse}></Route> */}
            <Route exact path='/contact' component={Contact}></Route>
            <Route exact path='/contact/:contactId' component={SingleContact}></Route>
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
