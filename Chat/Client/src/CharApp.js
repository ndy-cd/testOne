import React, { Component } from 'react';

import { subscribe, register, sendmessage, listenserver} from '../chat/api';
import { MessageList } from './Message';
import '../styles/Chat.styl';

class App extends React.Component{
    constructor(props) {
        super(props);
        listenserver((obj) => this.setState({msgobj: obj}))
        this.state = {
            message: 'no messages yet',
            test: '',
            newmessage: '',
            username: '',
            logVisible: '',
            logShow: 'hidden',
            object: {first: 1, second:2 },
            msgobj: []
        };

        this.onSubscribe = this.onSubscribe.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleMessageInput = this.handleMessageInput.bind(this);
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
        register(this.state.username, (msg) => {
            console.log('message recieved: ', msg);
        });
        this.setState({logVisible: 'none'});
        this.setState({logShow: 'visible'});
    }

    handleMessageInput(event){
        this.setState({newmessage: event.target.value});
    }

    handleMessage(event){
        event.preventDefault();
        console.log('Sending message: ' + this.state.newmessage);
        sendmessage({name: this.state.username, message: this.state.newmessage});
        this.setState({newmessage: ''});
    }

    render() {
        return (
            <div className="container">
                <div className="sysInfo">
                    <p>System Information</p>
                    <p>Message from server: {this.state.message}</p>
                    <button onClick={this.onSubscribe}>Subscribe()</button>
                </div>
                
                <div className="log">
                    <div className="log-input" style={{display: this.state.logVisible}}>
                        <p>Please, enter your name in the form below:</p>
                        <form onSubmit={this.handleUserName}>
                            <input type="text" placeholder="Your Name" 
                                onChange={this.handleUserNameInput}></input>
                            <input type="submit" value="Log on"></input>
                        </form>
                    </div>
                    <div className="log-show" style={{visibility: this.state.logShow}}>
                        <div>You logged as {this.state.username}</div>
                    </div>                    
                </div>

                <div className="chat">
                    <div className="chat-messages">
                        <MessageList allmsg={this.state.msgobj}/>
                    </div>
                    <div className="chat-filed">
                        <form className="chat-field" onSubmit={this.handleMessage}>
                            <input type="text" name="message-field" 
                                    onChange={this.handleMessageInput}
                                    value={this.state.newmessage}></input>
                            <input type="submit" value="Send" className="send"
                                    onSubmit={this.state.handleMessage}></input>
                        </form>
                    </div>
                    
                    
                </div>
            </div>
        );
    }
}

export default App;