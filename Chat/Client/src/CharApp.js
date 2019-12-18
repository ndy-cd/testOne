import React, { Component } from 'react';

import { subscribe } from '../chat/api';
import '../styles/Chat.styl';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            message: 'no messages yet',
            username: '',
            logVisible: 'visible'
        };

        this.onSubscribe = this.onSubscribe.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
    }

    

    onSubscribe(){
        let message;
        subscribe((msg) => {
            console.log('message recieved: ', msg);
            message = msg;
            this.setState({message});
        })
    };

    handleUserNameInput(event){
        this.setState({username: event.target.value});
    }

    handleUserName(event){
        console.log('User name is ', this.state.username);
        event.preventDefault();


    }

    render() {
        return (
            <div>
                <div className="sysInfo">
                    <p>System Information</p>
                    <p>Message from server: {this.state.message}</p>
                    <button onClick={this.onSubscribe}>Subscribe()</button>
                </div>
                
                <div className="log">
                    <div className="log-input" style={{visibility: this.state.logVisible}}>
                        <p>Please, enter your name in the form below:</p>
                        <form onSubmit={this.handleUserName}>
                            <input type="text" placeholder="Your Name" 
                                onChange={this.handleUserNameInput}></input>
                            <input type="submit" value="Log on"></input>
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default App;