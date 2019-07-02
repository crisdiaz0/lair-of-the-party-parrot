import React from 'react';
import Player from './Player';
import Enemy from './Enemy';
import PlayerMove from './PlayerMove';
import { connect } from 'react-redux';
import {
	enemyAttacks,
	enemyDefeated,
	playerDefeated,
	damageEnemy
} from '../redux/actions';

class FightScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	checkEnemiesTurn = () => {
		if (!this.props.isPlayersTurn && !this.props.currentEnemy.isDefeated) {
			const randomMove = this.props.currentEnemy.enemyMoves[
				Math.floor(
					Math.random() * this.props.currentEnemy.enemyMoves.length
				)
			];

			window.setTimeout(() => {
				this.props.enemyAttacks(
					randomMove,
					this.props.currentEnemy.HP,
					this.props.Player.Lvl
				);
			}, 1500);
		}
	};

	checkEnemyDefeated = () => {
		if (this.props.currentEnemy.HP <= 0)
			this.props.enemyDefeated(this.props.Player.playerPos);
	};

	checkPlayerDefeated = () => {
		if (this.props.Player.HP <= 0) this.props.playerDefeated();
	};

	componentDidUpdate = () => {
		this.checkPlayerDefeated();
		this.checkEnemyDefeated();
		this.checkEnemiesTurn();
	};

	render() {
		return (
			<div className="FightScreen">
				<iframe
					title="Theme"
					width="0"
					height="0"
					src={this.props.currentSongSrc}
					frameBorder="0"
					allow="autoplay; encrypted-media"
				/>

				<h1 className="fightHeader">{`A wild ${
					this.props.currentEnemy.iconObj.name
				} appeared!`}</h1>

				<div className="flex">
					<Player playerPos={{ r: 0, c: 0 }} />

					<h2 className="vs">VS</h2>

					<Enemy enemyObj={this.props.currentEnemy} />
				</div>

				<h2 className="latestMove">{this.props.latestMove}</h2>

				<div className="PlayerMoves">
					{this.props.Player.playerMoves.map(move => (
						<PlayerMove
							key={move.name}
							onClick={this.props.damageEnemy}
							move={move}
							isUsedMove={
								move === this.props.previousUsedPlayerMove
									? true
									: false
							}
						/>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	Player: state.playerReducer.Player,
	isPlayersTurn: state.gameReducer.isPlayersTurn,
	currentEnemy: state.enemyReducer.currentEnemy,
	latestMove: state.gameReducer.latestMove,
	previousUsedPlayerMove: state.gameReducer.previousUsedPlayerMove,
	currentSongSrc: state.gameReducer.currentSongSrc
});

const mapDispatchToProps = dispatch => ({
	enemyAttacks: (move, enemyHP, playerLvl) =>
		dispatch(enemyAttacks(move, enemyHP, playerLvl)),
	enemyDefeated: playerPos => dispatch(enemyDefeated(playerPos)),
	playerDefeated: () => dispatch(playerDefeated()),
	damageEnemy: move => dispatch(damageEnemy(move))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FightScreen);
