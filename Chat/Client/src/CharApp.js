import React, { Component } from 'react';

import { subscribe } from '../chat/api';
import '../styles/Chat.styl';

class App extends React.Component{
    constructor(props) {
        super(props);
        // subscribe((err, message) => this.setState({
        //     message
        // }));
        this.onSubscribe = this.onSubscribe.bind(this);
    }

    state = {
        message: 'no messages yet',
        logVisible: 'visible'
    };

    onSubscribe(event){
        let message;
        subscribe((msg) => {
            console.log('message recieved: ', msg);
            message = msg;
            this.setState({message});
        })
    };

    render() {
        return (
            <div>
                <p>
                    Message from server: {this.state.message}
                </p>
                <button onClick={this.onSubscribe}>Subscribe()</button>
                <div className="log">
                    <p style={{visibility: this.state.logVisible}}>
                        Please, enter your name in the form below:</p>
                    <form>
                        <input type="text" placeholder="Your Name"></input>
                        <input type="submit" value="Log on"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;