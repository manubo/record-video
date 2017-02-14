import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: true,
  video: true
};

navigator.getUserMedia(constraints, renderApp, error => console.log(error));

function renderApp(stream) {
  ReactDOM.render(<App stream={stream} />, document.getElementById('app'));
}

