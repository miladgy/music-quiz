import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import './App.css';
import openSocket from 'socket.io-client';

import EnterName from './components/EnterName'
import Join from './components/Join'
import Waitingroom from './components/Waitingroom'
import Gamemodes from './components/Gamemodes'
import Playlists from './components/Playlists'
import GuessSong from './components/GuessSong'

const socket = openSocket('http://localhost:5000');

socket.on('message', (data) => {
  console.log('This is the data from socket', data)
})

// socket.emit('addClient', 'playerMilad');
// socket.emit('addClient', 'playerModi');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      access_token: ''
    }
  }

  setToken = (token) => {
    this.setState({ access_token: token });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Hello Quiz!</h1>
          <Link to="/EnterName">Join as host</Link><br />
          <Link to="/Waitingroom">waitingroom carter</Link><br />
          <Link to="/GuessSong">Guess song</Link><br />
          <Link to="/Join">Join a game as player</Link><br />
          <Link to={!this.state.access_token ? "/login" : `/Gamemodes/#access_token=${this.state.access_token}`}>Game Modes!</Link><br />
          <Link to={this.state.access_token ? `/EnterName/#access_token=${this.state.access_token}` : "/login"}>Log in with Spotify(Host)!</Link><br />


          <Switch>
            <Route path="/EnterName">
              <EnterName setToken={this.setToken} socket={socket} />
            </Route>
            <Route path="/Gamemodes">
              <Gamemodes />
            </Route>
            <Route path="/Join">
              <Join socket={socket} />
            </Route>
            <Route path="/Playlists">
              <Playlists access_token={this.state.access_token} />
            </Route>
            <Route path="/Waitingroom">
              <Waitingroom socket={socket} />
            </Route>
            <Route path="/GuessSong">
              <GuessSong socket={socket} access_token={this.state.access_token} />
            </Route>
            <Route path='/login' component={() => {
              window.location.href = 'http://localhost:5000/login';
              return null;
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
