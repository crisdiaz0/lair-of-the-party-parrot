import React from 'react';
import Player from './Player';
import Enemy from './Enemy';
import { connect } from 'react-redux';
import { enemyAttacks, enemyDefeated, playerDefeated } from '../redux/actions';

class FightScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	checkEnemiesTurn = () => {
		if (!this.props.isPlayersTurn && !this.props.currentEnemy.isDefeated) {
			window.setTimeout(() => {
				this.props.enemyAttacks(
					this.props.currentEnemy.enemyMoves[
						Math.floor(
							Math.random() *
								this.props.currentEnemy.enemyMoves.length
						)
					]
				);
			}, 1500);
		}
	};

	checkEnemyDefeated = () => {
		if (this.props.currentEnemy.HP <= 0) this.props.enemyDefeated();
	};

	checkPlayerDefeated = () => {
		if (this.props.Player.HP <= 0) this.props.playerDefeated();
	};

	render() {
		return (
			<div className="FightScreen">
				{this.checkPlayerDefeated()}

				{this.checkEnemyDefeated()}
				{this.checkEnemiesTurn()}

				<h1 className="fightHeader">{`A wild ${
					this.props.currentEnemy.iconObj.name
				} appeared!`}</h1>

				{/* <iframe
					title="Theme"
					width="0"
					height="0"
					src={this.props.currentSongSrc}
					frameBorder="0"
					allow="autoplay; encrypted-media"
				/> */}

				<div className="flex">
					<Player playerPos={{ r: 0, c: 0 }} />

					<h2 className="vs">VS</h2>

					<Enemy enemyObj={this.props.currentEnemy} />
				</div>

				<h2>{this.props.latestMove}</h2>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	Player: state.Player,
	isPlayersTurn: state.isPlayersTurn,
	currentEnemy: state.currentEnemy,
	currentSongSrc: state.currentSongSrc,
	latestMove: state.latestMove,
	enemyDefeated: state.enemyDefeated
});

const mapDispatchToProps = dispatch => ({
	enemyAttacks: move => dispatch(enemyAttacks(move)),
	enemyDefeated: () => dispatch(enemyDefeated()),
	playerDefeated: () => dispatch(playerDefeated())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FightScreen);
