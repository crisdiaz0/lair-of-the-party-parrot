import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';
import { toggleSaveToLocalState, loadFromLocalState } from './redux/actions';

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let savedStorage = { ...window.localStorage };

Object.keys(savedStorage).forEach(
	key => (savedStorage[key] = JSON.parse(savedStorage[key]))
);

const saveStateToLocalStorage = state => {
	try {
		const stringifiedState = JSON.stringify(state);

		localStorage.setItem(
			`${state.playerReducer.Player.name}`,
			stringifiedState
		);
	} catch {
		console.log('Error saving to Local Storage');
	}
};

const loadStateFromLocalStorage = key => {
	store.dispatch(loadFromLocalState(savedStorage[key]));
};

store.subscribe(() => {
	const state = store.getState();

	if (state.gameReducer.isSavingToLocalState) {
		saveStateToLocalStorage(state);
		window.setTimeout(() => store.dispatch(toggleSaveToLocalState()), 50);
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />

		<div
			className="localStorage"
			onClick={() => store.dispatch(toggleSaveToLocalState())}
		>
			Save Current Character
		</div>

		<div
			className="localStorage"
			onClick={() => window.localStorage.clear()}
		>
			Delete all Characters
		</div>

		<select
			className="characterSelect"
			onChange={e => loadStateFromLocalStorage(e.target.value)}
		>
			<option value="" hidden>
				Load a Character
			</option>

			{Object.keys(savedStorage).map(key => (
				<option key={key}>{key}</option>
			))}
		</select>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
