import enemyReducer from './enemyReducer';
import gameReducer from './gameReducer';
import playerReducer from './playerReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	playerReducer,
	enemyReducer,
	gameReducer
});
