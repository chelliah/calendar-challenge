import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

require('../styles/main.scss');

render(
    // <div>hi</div>
    <App />,
    document.getElementById('root')
);
