import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { formatDate } from './utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should set correct state (with order) after calling onSendText (normal case) and render correctly', () => {
  const div = document.createElement('div');
  const app = ReactDOM.render(<App />, div);

  app.onSendText('test')
  app.onSendText('test 2')

  expect(app.state.messages[0].text).toEqual('test');
  expect(app.state.messages[1].text).toEqual('test 2');

  ReactDOM.unmountComponentAtNode(div);
});

it('should set correct state (with order) after calling onSendText (time case) and render correctly', () => {
  const div = document.createElement('div');
  const app = ReactDOM.render(<App />, div);

  app.onSendText('test')
  app.onSendText('/time')

  expect(app.state.messages[0].text).toEqual('test');

  const now = new Date()
  const dateText = formatDate(now)
  expect(app.state.messages[1].text).toEqual(`Current time is ${formatDate(now)}`);

  const chatAreaNode = ReactDOM.findDOMNode(app.chatArea)

  const messageNodes = chatAreaNode.querySelectorAll('.chatArea__message')

  expect(messageNodes.length).toEqual(2)
  expect(messageNodes[0].firstChild.textContent).toEqual(`test`)
  expect(messageNodes[1].firstChild.textContent).toEqual(`Current time is ${formatDate(now)}`)

  ReactDOM.unmountComponentAtNode(div);
});

it('should closed the chat on /goodbye commands', () => {
  const div = document.createElement('div');
  const app = ReactDOM.render(<App />, div);

  app.onSendText('/goodbye')

  expect(app.state.closed).toEqual(true);

  ReactDOM.unmountComponentAtNode(div);
});
