import React from "react";
import ReactDOM from "react-dom";

import ReactTestUtils from "react-dom/test-utils";

import MessageBar from "./MessageBar";

const Simulate = ReactTestUtils.Simulate;

it("should not call sendText function if input is empty", () => {
    const div = document.createElement("div");
    const mockCallback = jest.fn();

    const node = ReactDOM.render(
        <MessageBar closed={false} onSendText={mockCallback} />,
        div
    );

    Simulate.keyDown(node.input.input, {
        key: "Enter",
        keyCode: 13,
        which: 13
    });

    expect(mockCallback.mock.calls.length).toBe(0);

    Simulate.click(node.sendButton.button);

    expect(mockCallback.mock.calls.length).toBe(0);

    ReactDOM.unmountComponentAtNode(div);
});

it("should call sendText function once if `Enter` key is press down", async () => {
    const div = document.createElement("div");
    const mockCallback = jest.fn();

    const node = ReactDOM.render(
        <MessageBar closed={false} onSendText={mockCallback} />,
        div
    );

    await node.setState({ textValue: "test value" }, async () => undefined);

    Simulate.keyPress(node.input.input, {
        key: "Enter",
        keyCode: 13,
        which: 13
    });

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual("test value");

    ReactDOM.unmountComponentAtNode(div);
});

it("should call sendText function once if send button is click", async () => {
    const div = document.createElement("div");
    const mockCallback = jest.fn();

    const node = ReactDOM.render(
        <MessageBar closed={false} onSendText={mockCallback} />,
        div
    );

    node.setState({ textValue: "test value" });

    Simulate.click(ReactDOM.findDOMNode(node.sendButton.button));

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual("test value");

    ReactDOM.unmountComponentAtNode(div);
});

it("should not call sendText function if state is closed", async () => {
    const div = document.createElement("div");
    const mockCallback = jest.fn();

    const node = ReactDOM.render(
        <MessageBar closed={true} onSendText={mockCallback} />,
        div
    );

    node.setState({ textValue: "test value" });

    Simulate.keyDown(node.input.input, {
        key: "Enter",
        keyCode: 13,
        which: 13
    });

    expect(mockCallback.mock.calls.length).toBe(0);

    Simulate.click(node.sendButton.button);

    expect(mockCallback.mock.calls.length).toBe(0);

    ReactDOM.unmountComponentAtNode(div);
});

it("should change state on input change", async () => {
    const div = document.createElement("div");
    const mockCallback = jest.fn();

    const node = ReactDOM.render(
        <MessageBar closed={false} onSendText={mockCallback} />,
        div
    );

    node.input.input.value = "alpha";
    ReactTestUtils.Simulate.change(node.input.input);

    expect(node.state.textValue).toEqual("alpha");

    ReactDOM.unmountComponentAtNode(div);
});
