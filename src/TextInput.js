import React, { Component } from "react";

import { noop } from "./utils";

type Props = {
    onChange: Function,
    onSubmit: Function,
};

class TextInput extends Component<Props> {
    static defaultProps = {
        onChange: noop,
        onSubmit: noop
    };

    onKeyPress = e => {
        if (e.key === "Enter") {
            this.props.onSubmit();
            e.target.value = "";
        }
    };

    clearAndFocus = () => {
        if (this.input) {
            this.input.value = ''
            this.input.focus()
        }
    };

    render() {
        return (
            <div className="textInput">
                <input
                    type="text"
                    onChange={this.props.onChange}
                    onKeyPress={this.onKeyPress}
                    ref={inst => {
                        this.input = inst;
                    }}
                />
            </div>
        );
    }
}

export default TextInput;
