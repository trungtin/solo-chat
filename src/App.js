import React, { Component } from "react";
import MessageBar from "./MessageBar";
import ChatArea from "./ChatArea";
import "./App.css";
import { formatDate } from "./utils";

class App extends Component {
    state = {
        messages: [],
        closed: false
    };

    querySWAPI = async (characterName, anchor) => {
        let replacedText = "",
            url;
        try {
            const response = await fetch(
                `https://swapi.co/api/people/?search=${characterName}`
            );
            if (response.status >= 200 && response.status < 300) {
                const json = await response.json();
                if (json.results && json.results.length > 0) {
                    const char = json.results[0];
                    replacedText = char.name;
                    url = char.url;
                } else {
                    replacedText = "No result found";
                }
            } else {
                throw new Error();
            }
        } catch (e) {
            replacedText = "Something went wrong";
        }
        this.state.messages[anchor] = {
            ...(this.state.messages[anchor] || {}),
            text: replacedText,
            url
        };
        this.setState({
            messages: [...this.state.messages]
        });
    };

    onSendText = text => {
        const starwarsCommandRegex = new RegExp(/^\s*\/starwars\s*(.*)$/g);

        let message,
            now = new Date();

        if (/^\s*\/time\s*$/g.test(text)) {
            message = {
                text: `Current time is ${formatDate(now)}`,
                date: now
            };
        } else if (starwarsCommandRegex.test(text)) {
            starwarsCommandRegex.lastIndex = 0; // Reset the index to start matching over again
            const matches = starwarsCommandRegex.exec(text);

            if (matches && matches[1]) {
                message = {
                    text: "...Loading...",
                    date: now
                };

                const characterName = matches[1];
                const anchor = this.state.messages.length;
                this.querySWAPI(characterName, anchor);
            } else {
                message = {
                    text: `What is your favorite Starwars character?`,
                    date: now
                };
            }
        } else if (/^\s*\/goodbye\s*$/g.test(text)) {
            this.setState({
                closed: true
            });
            message = {
                text: "See you later!!!",
                date: now
            };
        } else if (/^\s*\//g.test(text)) {
            message = {
                text: "No such command is available",
                date: now
            };
        } else {
            message = {
                text,
                date: now
            };
        }
        if (message) {
            return this.setState({
                messages: this.state.messages.concat(message)
            });
        }
    };

    render() {
        return (
            <div className="app">
                <ChatArea messages={this.state.messages} />
                <MessageBar
                    onSendText={this.onSendText}
                    closed={this.state.closed}
                />
            </div>
        );
    }
}

export default App;
