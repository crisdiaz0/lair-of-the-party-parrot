import React from 'react';
import Player from './Player';
import Cell from './Cell';
import { connect } from 'react-redux';
import { movePlayer, enemyEncountered, createEnemy } from '../redux/actions';

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

	getCellByLocation = cellLocation => {
		return this.props.cells.filter(
			cellObj => cellObj.cell === `r${cellLocation.r}c${cellLocation.c}`
		)[0];
	};

	handleOnKeyDown = e => {
		const newPlayerPos = { ...this.props.playerPos };

		switch (e.keyCode) {
			case 37:
				if (newPlayerPos.c !== 0) {
					newPlayerPos.c = newPlayerPos.c - 1;
					this.props.movePlayer(newPlayerPos);
				}
				break;
			case 38:
				if (newPlayerPos.r !== 0) {
					newPlayerPos.r = newPlayerPos.r - 1;
					this.props.movePlayer(newPlayerPos);
				}
				break;
			case 39:
				if (newPlayerPos.c !== 8) {
					newPlayerPos.c = newPlayerPos.c + 1;
					this.props.movePlayer(newPlayerPos);
				}
				break;
			case 40:
				if (newPlayerPos.r !== 5) {
					newPlayerPos.r = newPlayerPos.r + 1;
					this.props.movePlayer(newPlayerPos);
				}
				break;
			default:
				return;
		}
	};

	checkEnemyEncountered = () => {
		if (this.getCellByLocation(this.props.playerPos).hasEnemy === 'true') {
			this.props.createEnemy();
			this.props.enemyEncountered();
		}
	};

	render() {
		const { playerPos, cells } = this.props;
		return (
			<div className="World">
				{cells.map(cellObj => (
					<Cell
						key={cellObj.cell}
						cell={cellObj.cell}
						hasEnemy={cellObj.hasEnemy}
					/>
				))}

				{this.checkEnemyEncountered()}

				<Player playerPos={playerPos} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	playerPos: state.Player.playerPos,
	cells: state.cells,
	icons: state.icons,
	attackMoves: state.attackMoves
});

const mapDispatchToPtops = dispatch => ({
	movePlayer: newPlayerPos => dispatch(movePlayer(newPlayerPos)),
	enemyEncountered: () => dispatch(enemyEncountered()),
	createEnemy: () => dispatch(createEnemy())
});

export default connect(
	mapStateToProps,
	mapDispatchToPtops
)(World);
