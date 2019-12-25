// const express = require('express');
// const app = express();
// const rand = require('./random.js');


// app.get('/', (req, res) => res.send('Enter filename in URL to get it'))
// app.get('/', (req, res) => res.send('random: ' + rand()));

// app.use(express.static('./'))

// app.listen(8080, () => console.log(`Example app listening on port ${8080}!`))

// const rand = require('./random.js');
// console.log(rand());

import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/App";
// import App from "./components/App_HW";
// import App from "./components/App_stylus";
// import App from "./components/Stylus";
// import App from "./components/App0512";

import App from "./components/CharApp";

// import MyInput from "./components/App_test";
// import PhoneInput from "./components/PhoneInput";
// import Border from "./components/App_2811";
// import App2 from "./components/App_C";
// import Mosaic from "./components/App_C";

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(<MyInput />, document.getElementById("root"));
// ReactDOM.render(<PhoneInput />, document.getElementById("root"));
// ReactDOM.render(<Border />, document.getElementById("root"));
// ReactDOM.render(<App2 />, document.getElementById("root"));
// ReactDOM.render(<Mosaic />, document.getElementById("root"));