import React from 'react';
import PlayerStats from './components/PlayerStats';
import PlayerCreation from './components/PlayerCreation';
import World from './components/World';
import FightScreen from './components/FightScreen';
import PlayerUpgrade from './components/PlayerUpgrade';
import Parrot from './components/Parrot';
import { connect } from 'react-redux';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	returnCurrentScreen = () => {
		const {
			Player,
			enemyEncountered,
			playerDefeated,
			playerUpgradingMoves
		} = this.props;

		if (Player.name === '') return <PlayerCreation />;
		else if (playerDefeated)
			return (
				<div className="gameOver">
					<h1 className="gameOverText">Game Over!</h1>
					<Parrot />
				</div>
			);
		else if (enemyEncountered) return <FightScreen />;
		else if (playerUpgradingMoves) return <PlayerUpgrade />;
		else return <World />;
	};

	render() {
		return (
			<div className="App">
				<PlayerStats />

				{this.returnCurrentScreen()}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	Player: state.playerReducer.Player,
	enemyEncountered: state.gameReducer.enemyEncountered,
	playerDefeated: state.gameReducer.playerDefeated,
	playerUpgradingMoves: state.gameReducer.playerUpgradingMoves
});

export default connect(mapStateToProps)(App);
