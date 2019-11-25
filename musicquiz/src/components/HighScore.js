import React, { Component } from 'react'

class HighScore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.socket.emit('getinfo')
        this.props.socket.on('roominfo', (data) => {
            console.log('This is the data from socket-listener of "roominfo" inside waitingroom.JS', data)
            this.setState({
                users: data
            })

        })
    }



    render() {
        return (
            <div>
                <h2>HighScore</h2>
                <h3>{this.state.users.map(user => {
                    return (<p>{user.username}: {user.score}</p>

                    )
                })}</h3>

            </div >
        )
    }
}

export default HighScore;