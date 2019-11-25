// THIS FILE IS ONLY TO USE WITH BOILERPLATE
// PLEASE LOCATE IT IN "boilerplate/src/components"

import React, { Component } from 'react';

import '../styles/App.css';

const phrase = "Hello";

function random () {
    let ran = Math.floor(Math.random() * 256).toString(16);
    return ran;
  }
  
  function style () {
    let r1 = random();
    let r2 = random();
    let r3 = random();
    let style = '#' + r1 + r2 + r3;
    // console.log("RANDOM" + style);
    return style;
  }
  
  function ListItem(props) {
    return <li style={{background: props.style}}>{props.value}</li>;
  }
  
  function CharList(props){
    const word = props.word.split("");
    const listItems = word.map((char, index) =>
      <ListItem key={index} value={char} style={style()}/>
    );
    console.log("CharList");
    return (
      <ul onClick={props.onClick}>{listItems}</ul>
    )
  }
  
class App extends Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);

    this.state = {
      color: '#000'
    };
  }
  makeDigit() {
    return Math.floor(Math.random() * 256).toString(16);
  }
  changeColor() {
    console.log('changeColor');
    this.setState({
      color: '#' + this.makeDigit() + this.makeDigit() + this.makeDigit(),
    });
  }
  render() {
    console.log('render');
    return (
      <div>
        <h1 style={{ color: this.state.color }}>Привет, ДЗ!</h1>
        <CharList style={{ color: this.state.color }} 
                  onClick={this.changeColor} 
                  word={phrase}/>
      </div>
    );
  } 
}

export default App;