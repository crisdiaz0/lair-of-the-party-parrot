import React from 'react';
import { connect } from 'react-redux';
import { damageEnemy } from '../redux/actions';

class PlayerMoves extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { Player, damageEnemy, isPlayersTurn } = this.props;

		return (
			<div className="PlayerMoves">
				<h2 className="playerMoveHeader">Your Attack Moves</h2>

				{Player.playerMoves.map(move => (
					<div
						key={move.name}
						className="playerMove"
						onClick={isPlayersTurn ? () => damageEnemy(move) : null}
					>
						<h3>{move.name}</h3>
						<h3>{`Damage: ${move.damage}`}</h3>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	Player: state.Player,
	isPlayersTurn: state.isPlayersTurn
});

const mapDispatchToProps = dispatch => ({
	damageEnemy: move => dispatch(damageEnemy(move))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerMoves);
