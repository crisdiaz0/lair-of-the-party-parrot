import React from 'react';
import Logo from '../Icons/logo.png';
import { connect } from 'react-redux';

const PlayerStats = ({ Player }) => (
	<div className="PlayerStats">
		{Player.name === '' ? (
			<img className="logo" src={Logo} alt="Logo" />
		) : (
			<>
				<img src={Player.icon} alt={Player.type} />
				<h1>{Player.name}</h1>

				<h2>{Player.type}</h2>
				<h2>{`Level: ${Player.Lvl}`}</h2>
				<div className="hpOuter">
					<div className="hpInner" style={{ width: `${Player.HP}%` }}>
						.
					</div>
				</div>
				<h2>{`HP: ${Player.HP} / 100`}</h2>

				<h2>{`XP: ${Player.XP}`}</h2>
				<h2>{`Moves Made: ${Player.movesMade}`}</h2>
				<h2>{`Enemies Defeated: ${Player.enemiesDefeated}`}</h2>
			</>
		)}
	</div>
);

const mapStateToProps = state => ({
	Player: state.playerReducer.Player
});

const mapDispatchToPtops = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToPtops
)(PlayerStats);
