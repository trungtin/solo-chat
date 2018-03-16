import React, { Component } from "react";
import { formatDate } from "./utils";

import './ChatArea.css'

type Message = {
    text: String,
    date: Date
};

type Props = {
    messages: Array<Message>
};

class ChatArea extends Component<Props> {
    static defaultProps = {
        messages: []
    };

    renderMessage = (message: Message, index: Number) => {
        const { text, date, url } = message;
        const dateText = date ? formatDate(date) : "";
        return (
            <div className="chatArea__message" key={index}>
                <p>{url ? <a href={url}>{text}</a> : text}</p>
                <div className="chatArea__messageTimeStamp">
                    <span>{dateText}</span>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="chatArea__container">
                {this.props.messages.map(this.renderMessage)}
            </div>
        );
    }
}

export default ChatArea;
