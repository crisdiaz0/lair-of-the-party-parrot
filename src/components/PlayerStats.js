import React from 'react';
import Logo from '../Assets/logo.png';
import HealthBar from './HealthBar';
import { connect } from 'react-redux';

const PlayerStats = ({ Player }) => (
	<div className="PlayerStats">
		{Player.name === '' ? (
			<img className="logo" src={Logo} alt="Logo" />
		) : (
			<>
				<img src={Player.icon} alt={Player.type} />
				<h1>{`${Player.name}, the ${Player.type} `}</h1>

				<h2>{`Level: ${Player.Lvl}`}</h2>

				<HealthBar
					addClass="Player"
					currentHP={Player.HP}
					baseHP={Player.baseHP}
				/>

				<h2>{`Moves Made: ${Player.movesMade}`}</h2>
				<h2>{`Enemies Defeated: ${Player.enemiesDefeated}`}</h2>
				<h2>{`Score: ${Player.score}`}</h2>
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
