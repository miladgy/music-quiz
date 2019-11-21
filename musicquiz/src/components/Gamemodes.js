import React from 'react'

class Gamemodes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spinner: 'Loading...',
            finishedLoading: false,
            playlist: [],
            selectedPlaylist: [],
            myPlaylist: [],
            questions: [],
            counter: 0,
            round: 0,
            isGameOver: false,
            access_token: ''
          }
    }
  
  

  getAllTracks = () => {
    const playlistId = '37i9dQZF1DWXfgo3OOonqa';

    const access_token = window.location.hash.split('=')[1].split('&')[0];
    // const refresh_token = window.location.hash.split('refresh_token=')[1];
    fetch(`http://localhost:5000/playlist/${playlistId}?token=${access_token}`
      // , {
      // headers: {
      //   "Accept": "application/json",
      //   "Content-Type": "application/json",
      //   "Authorization": 'Bearer ' + access_token
      // }
      // }
    )
      .then(response => response.json())
      .then(data => {
        console.log('we fetch', data)
        this.setState({ playlist: data, finishedLoading: true })
      });

  }
  getRandom = () => {
    const playlistId = '37i9dQZF1DWXfgo3OOonqa';

    const access_token = window.location.hash.split('=')[1].split('&')[0];
    // const refresh_token = window.location.hash.split('refresh_token=')[1];
    fetch(`http://localhost:5000/random/${playlistId}?token=${access_token}`
      // , {
      // headers: {
      //   "Accept": "application/json",
      //   "Content-Type": "application/json",
      //   "Authorization": 'Bearer ' + access_token
      // }
      // }
    )
      .then(response => response.json())
      .then(data => {
        const correctTitle = data[0].correct.title;
        const incorrectTitle1 = data[0].incorrect[0].title;
        const incorrectTitle2 = data[0].incorrect[1].title;
        const incorrectTitle3 = data[0].incorrect[2].title;



        console.log('question object', data)
        console.log('correct title', correctTitle)
        console.log('incorrect title2', incorrectTitle2)
        this.setState({ questions: data, finishedLoading: true })
      });

  }

  getSpecificId = (id) => {
    console.log('this is the id of a specific playlist', id);
    const access_token = window.location.hash.split('=')[1].split('&')[0];
    const refresh_token = window.location.hash.split('refresh_token=')[1];
    fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + access_token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('selected PLAYLIST', data)
        this.setState({ selectedPlaylist: data.tracks.items }, () => {
          this.refs.audio.load();
        })
      });
  }

  addPoint = () => {
    if (this.state.round < 5) {
      this.setState((prevState) => ({ counter: prevState.counter + 1, round: prevState.round + 1 }))
    } else {
      console.log('do we get in here')
      this.setState((prevState) => ({ counter: prevState.counter + 1, round: prevState.round + 1, isGameOver: true }))
    }
  }
  incorrectAnswer = () => {
    if (this.state.round < 5) {
      this.setState((prevState) => ({ round: prevState.round + 1 }))
    }
    else {
      console.log('do we get in here incorreecttttt')
      this.setState((prevState) => ({ round: prevState.round + 1, isGameOver: true }))
    }
  }

    render() {
        return (
            <div>
                <button onClick={this.getAllTracks}>Show Tracks</button>
         
          <button onClick={this.getRandom}>Show random</button>

          {this.state.playlist.map((playlist, index) => {
            return <div key={index} onClick={() => this.getSpecificId(playlist.id)}>{playlist.name} {playlist.id}</div>
          })}
          {/* {this.state.playlist.map((item, index) => {
          return <div key={index}>{item.track.name}
            <audio key={index} controls ref="audio" src={item.track.preview_url} type="audio/mpeg">

            </audio>
          </div>
        })} */}
          {/* {
                    this.state.finishedLoading ?
                    // {this.state.playlist.map(e => <p>Who is singing: {e.track.name}</p>)} :
                    <p>Who is singing: {this.state.playlist[0].track.name}?</p> :
                    this.state.spinner
                } */}

          {/* show tracks */}
          

          {/* show random */}
          <p>Show the random tracks</p>
          {this.state.finishedLoading && !this.state.isGameOver
            ? <div>
              <p>Round {this.state.round + 1}</p>
              <audio className="audio" onClick={this.testFunction} src={this.state.questions[this.state.round].correct.preview} controls type="audio/mpeg" />
              <p onClick={this.addPoint}>Correct: {this.state.questions[this.state.round].correct.title}</p>
              <p onClick={this.incorrectAnswer}>Incorrect: {this.state.questions[this.state.round].incorrect.map(e => <p>{e.title}</p>)}</p>
            </div>
            : this.state.isGameOver
              ? <div>Your score is: {this.state.counter}</div>
              : this.state.spinner
          }
            </div>
        )
    }
}

export default Gamemodes;