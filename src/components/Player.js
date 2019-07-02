import React from 'react';
import { connect } from 'react-redux';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { Player } = this.props;
		return (
			<img
				src={Player.icon}
				className="Player"
				alt="Player"
				style={{
					gridArea: `r${Player.playerPos.r}c${Player.playerPos.c}`,
					width: '100px',
					height: '100px'
				}}
			/>
		);
	}
}

const mapStateToProps = state => ({
	Player: state.playerReducer.Player
});

const mapDispatchToPtops = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToPtops
)(Player);
