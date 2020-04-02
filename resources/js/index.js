import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

/* register main components */
if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
