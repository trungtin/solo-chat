import React, { Component } from "react";
import { noop } from "./utils";

type Props = {
    onSubmit: Function,
    disabled: boolean
};

class SendButton extends Component<Props> {
    static defaultProps = {
        onSubmit: noop,
        disabled: false
    };

    render() {
        return (
            <button
                onClick={this.props.onSubmit}
                disabled={this.props.disabled}
                ref={inst => {
                    this.button = inst
                }}
            >
                Send
            </button>
        );
    }
}

export default SendButton;
