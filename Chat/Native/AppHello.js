import React, {Component} from 'react';
import {StyleSheet, Button, Text, 
        TextInput, View, FlatList} from 'react-native';

window.navigator.userAgent = "react-native";
import io from 'socket.io-client';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

function Item({ msg }) {
    console.log('render Item, message:' + msg.message );
  return (
    <View style={styles.msgItem}>
      <Text style={styles.msgItemName} >{msg.name}</Text>
      <Text style={styles.msgItemText}>{msg.message}</Text>
    </View>
  );
}

class HelloWorldApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            newmessage: '',
            showlog: styles.login,
            showname: styles.loginNone,
            msgobj: [],
        };
        this.handleUserName = this.handleUserName.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        // this.socket = io('http://192.168.0.5:3000', {jsonp: false});
        this.socket = io('https://obscure-river-56862.herokuapp.com/', {jsonp: false});
        this.socket.on('bcast', (obj) => {
            this.setState({msgobj: obj})
            console.log(obj);
            console.log('^recieved');
        });
      }
   
    handleUserName(){
        this.socket.emit('register', this.state.username);
        this.socket.on('server said', (usernameId) => {
            alert(usernameId);
        });
        this.setState({showlog: styles.loginNone});
        this.setState({showname: styles.loginUser});
    }

    handleMessage(){
        console.log('Sending message: ' + this.state.newmessage);
        this.socket.emit('newmessage', {
            name: this.state.username, 
            message: this.state.newmessage
        });
        this.setState({newmessage: ''});
    }

    render() {
    return (
        <View style={styles.screen}>
            <View style={this.state.showlog}>
                <TextInput
                    style={styles.input}  
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    placeholder="Enter your name here"    
                />
                <Button
                    onPress={this.handleUserName}
                    title="Log On"
                />
            </View>
            <Text style={this.state.showname}>You are logged as:     {this.state.username}</Text>
            <View style={styles.chat}>
                <FlatList style={styles.msgList}
                    data={this.state.msgobj}
                    renderItem={({ item }) => <Item msg={item} />}
                    keyExtractor={item => item.id}
                />
                <View style={styles.msgField}>
                    <TextInput
                        style={styles.msgInput}  
                        onChangeText={newmessage => this.setState({newmessage})}
                        value={this.state.newmessage}
                    />
                    <Button
                        style={styles.msgSend}
                        onPress={this.handleMessage}
                        title="Send"
                    />
                </View>
            </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingLeft: 10,
        borderColor: 'black',
        borderWidth: 2,
    },
    screen: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'stretch',
    },
    login: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    loginNone: {
        display: 'none',
    },
    loginUser: {
        backgroundColor: 'grey',
        fontSize: 20,
        padding: 5,
    },
    chat: {
        flex: 1,
        borderColor: 'orange',
        // borderWidth: 10,
        alignItems: 'stretch',
    },
    msgList: {
        // backgroundColor: 'red',
    },
    msgItem: {
        backgroundColor: '#80bfff',
        margin: 10,
        marginTop: 0,
        borderRadius: 10,
    },
    msgItemName: {
        color: '#4d4d4d',
        paddingLeft: 10,
        fontSize: 18,  
    },
    msgItemText: {
        color: '#f2f2f2',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    msgField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderWidth: 2,
    },
    msgInput: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 1,
        height: 80,
        fontSize: 30,
        // alignSelf: 'stretch',
    },
    msgSend: {
        fontSize: 50,
        backgroundColor: 'black',
        display: 'none',
    },
  });

export default HelloWorldApp;

