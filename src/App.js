import React from 'react';
import PlayerStats from './components/PlayerStats';
import PlayerCreation from './components/PlayerCreation';
import World from './components/World';
import FightScreen from './components/FightScreen';
import PlayerMoves from './components/PlayerMoves';
import { connect } from 'react-redux';

const App = ({ Player, enemyEncountered, playerDefeated }) => (
	<div className="App">
		<PlayerStats />

		{Player.name === '' ? (
			<PlayerCreation />
		) : playerDefeated ? (
			<h1>Game Over</h1>
		) : enemyEncountered ? (
			<>
				<FightScreen />
				<PlayerMoves />
			</>
		) : (
			<World />
		)}
	</div>
);

const mapStateToProps = state => ({
	Player: state.playerReducer.Player,
	enemyEncountered: state.enemyReducer.enemyEncountered,
	playerDefeated: state.playerReducer.playerDefeated
});

export default connect(
	mapStateToProps,
	null
)(App);
