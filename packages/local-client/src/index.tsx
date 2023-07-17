import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import CellList from "./components/CellList";
import { store } from "./state";

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const App: React.FC = () => {
	return (
		<div>
			<CellList />
		</div>
	)
}

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


/**
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

const App = () => <h1>Hi there!</h1>

root.render(<App />);
 */
