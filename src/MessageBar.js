import React, { Component } from "react";
import TextInput from "./TextInput";
import SendButton from "./SendButton";
import { noop } from "./utils";

type Props = {
    onSendText: Function,
    closed: Boolean,
};

class MessageBar extends Component<Props> {
    static defaultProps = {
        onSendText: noop
    };

    state = {
        textValue: ""
    };

    onChange = e => {
        const textValue = e.target.value;
        this.setState({ textValue });
    };

    onSubmit = () => {
        if (!this.state.textValue || this.props.closed) return;
        this.props.onSendText(this.state.textValue);
        if (this.input) this.input.clearAndFocus()
    };

    render() {
        const _disableSend =
            !this.state.textValue || !(this.state.textValue.length > 0) || this.props.closed;
        return (
            <div className="messageBar">
                <TextInput
                    onChange={this.onChange}
                    value={this.state.textValue}
                    onSubmit={this.onSubmit}
                    ref={inst => {
                        this.input = inst;
                    }}
                />
                <SendButton onSubmit={this.onSubmit} disabled={_disableSend} ref={inst => {
                    this.sendButton = inst
                }} />
            </div>
        );
    }
}

export default MessageBar;
