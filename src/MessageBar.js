import React, { Component } from "react";
import TextInput from "./TextInput";
import SendButton from "./SendButton";

class MessageBar extends Component {
    render() {
        return (
            <div className="messageBar">
                <TextInput />
                <SendButton />
            </div>
        );
    }
}

export default MessageBar;
