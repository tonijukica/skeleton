import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import 'typeface-roboto';
import App from './components/App';
import { Provider } from 'react-redux';
import { initializeStore } from './store';

ReactDOM.render(
	<Provider store={initializeStore()}>
		<App />
	</Provider>,
	document.getElementById('app')
);
