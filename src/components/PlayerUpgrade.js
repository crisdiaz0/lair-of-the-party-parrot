import React from 'react';
import PlayerMove from './PlayerMove';
import { connect } from 'react-redux';
import { upgradePlayerMove } from '../redux/actions';
import { levelScaling } from '../redux/data';

const PlayerUpgrade = ({ Player, upgradePlayerMove }) => (
	<div className="PlayerUpgrade">
		<h1 className="upgradeHeader">{`Choose an attribute to upgrade!`}</h1>

		<div className="PlayerMoves">
			{Player.playerMoves.map(move => (
				<PlayerMove
					key={move.name}
					onClick={upgradePlayerMove}
					move={move}
					isUsedMove={false}
				/>
			))}

			<div
				className="playerMove HP"
				onClick={() => upgradePlayerMove('Refill')}
			>
				<h3>{`HP: Full Refill`}</h3>
			</div>

			<div
				className="playerMove HP"
				onClick={() => upgradePlayerMove('HP')}
			>
				<h3>{`HP: +${30 *
					levelScaling[Player.Lvl].HP} & Base HP: +${50 *
					levelScaling[Player.Lvl].HP}`}</h3>
			</div>
		</div>
	</div>
);

const mapStateToProps = state => ({
	Player: state.playerReducer.Player
});

const mapDispatchToProps = dispatch => ({
	upgradePlayerMove: selectedMove => dispatch(upgradePlayerMove(selectedMove))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerUpgrade);
