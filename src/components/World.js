import React from 'react';
import Player from './Player';
import Cell from './Cell';
import { connect } from 'react-redux';
import {
	movePlayer,
	enemyEncountered,
	createEnemy,
	playerHitObstacle,
	playerHitFood,
	playerDefeated,
	worldCleared,
	createWorld
} from '../redux/actions';

class World extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		window.onkeydown = this.handleOnKeyDown;
	};

	componentWillUnmount = () => {
		window.onkeydown = null;
	};

	componentDidUpdate = () => {
		this.checkEnemyEncountered();
	};

	checkEnemyEncountered = () => {
		if (this.getCellByLocation(this.props.playerPos).hasEnemy) {
			this.props.createEnemy(this.props.playerLvl);
			this.props.enemyEncountered();
		}
	};

	checkWorldCleared = () => {
		if (!this.props.enemiesRemaining) this.props.createWorld();
	};

	getCellByLocation = cellLocation => {
		return this.props.cells.filter(
			cellObj => cellObj.cell === `r${cellLocation.r}c${cellLocation.c}`
		)[0];
	};

	handleOnKeyDown = e => {
		const newPlayerPos = { ...this.props.playerPos };

		switch (e.keyCode) {
			case 37:
				if (newPlayerPos.c !== 0) newPlayerPos.c = newPlayerPos.c - 1;
				break;
			case 38:
				if (newPlayerPos.r !== 0) newPlayerPos.r = newPlayerPos.r - 1;
				break;
			case 39:
				if (newPlayerPos.c !== 8) newPlayerPos.c = newPlayerPos.c + 1;
				break;
			case 40:
				if (newPlayerPos.r !== 5) newPlayerPos.r = newPlayerPos.r + 1;
				break;
			default:
				return;
		}

		this.handleMovePlayer(newPlayerPos, this.props.playerPos);
	};

	handleMovePlayer = (newPlayerPos, oldPlayerPos) => {
		const cell = this.getCellByLocation(newPlayerPos);

		if (cell.hasObstacle)
			if (this.props.playerHP - 30 <= 0) this.props.playerDefeated();
			else {
				this.props.movePlayer(newPlayerPos, oldPlayerPos);
				this.props.playerHitObstacle(newPlayerPos);
			}
		else if (cell.hasFood) {
			this.props.movePlayer(newPlayerPos, oldPlayerPos);
			this.props.playerHitFood(newPlayerPos);
		} else this.props.movePlayer(newPlayerPos, oldPlayerPos);
	};

	render() {
		const { playerPos, cells, enemiesRemaining } = this.props;
		return (
			<>
				<div className="World">
					{cells.map(cellObj => (
						<Cell key={cellObj.cell} cellObj={cellObj} />
					))}

					<Player playerPos={playerPos} />
				</div>

				<h1 className="WorldText">{`Enemies Remaining: ${enemiesRemaining}`}</h1>

				{this.checkWorldCleared()}
			</>
		);
	}
}

const mapStateToProps = state => ({
	playerPos: state.playerReducer.Player.playerPos,
	playerHP: state.playerReducer.Player.HP,
	playerLvl: state.playerReducer.Player.Lvl,
	cells: state.gameReducer.cells,
	enemiesRemaining: state.gameReducer.enemiesRemaining
});

const mapDispatchToPtops = dispatch => ({
	movePlayer: (newPlayerPos, oldPlayerPos) =>
		dispatch(movePlayer(newPlayerPos, oldPlayerPos)),
	enemyEncountered: () => dispatch(enemyEncountered()),
	createEnemy: playerLvl => dispatch(createEnemy(playerLvl)),
	playerHitObstacle: newPlayerPos =>
		dispatch(playerHitObstacle(newPlayerPos)),
	playerHitFood: newPlayerPos => dispatch(playerHitFood(newPlayerPos)),
	playerDefeated: () => dispatch(playerDefeated()),
	worldCleared: () => dispatch(worldCleared()),
	createWorld: () => dispatch(createWorld())
});

export default connect(
	mapStateToProps,
	mapDispatchToPtops
)(World);
