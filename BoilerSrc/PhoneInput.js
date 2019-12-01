import React, { Component } from 'react';

class PhoneInput extends React.Component {
    constructor(props) {
      super(props); 

      this.onPhoneInput = this.onPhoneInput.bind(this);

      this.state = {
          phone: '',
      };
    }

    onPhoneInput (event) {
        const pattern = /[a-z]/gi;
        const newState = event.target.value.replace(pattern, "")

        let changed = "";
        let i, n = 0;

        for (i of newState) {
            if (i == newState[0] && n == 0) {
                if (i != "+") {changed = "+7 ("}
                if (i == "8") { i = ""}
            }
            if ((i == newState[2] && i !== " ") && n == 2) {changed += " ("}                
            if (i == newState[7] && i !== ")"  && n == 7) {
                changed += ") ";
            }
            if ((i == newState[12] && i !== "-"  && n == 12) ||
                (i == newState[15] && i !== "-"  && n == 15)) {
                changed += "-";
            }  
            if (i == newState[18] && n == 18) { i = "" }
            changed += i;  
            n++;          
        }
        console.log("First symbol = ", changed[0]);
        event.target.value = changed;
        this.setState({
            phone: changed
        });
    }

    render() {
        return (
            <div>
            <input type="text" name="phone" onChange={this.onPhoneInput} />
            </div>
        );
    }
}

export default PhoneInput;