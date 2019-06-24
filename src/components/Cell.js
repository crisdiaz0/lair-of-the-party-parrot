import React from 'react';
import Tile from '../Icons/textureStone.png';
import { connect } from 'react-redux';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { cell, hasEnemy } = this.props;
		return (
			<img
				src={hasEnemy === 'true' ? '' : Tile}
				alt=""
				style={{
					gridArea: cell,
					zIndex: -1,
					width: '100px',
					height: '100px'
				}}
			/>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cell);
