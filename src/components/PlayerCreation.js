import React from 'react';
import { connect } from 'react-redux';
import { createPlayer, createWorld } from '../redux/actions';

class PlayerCreation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: ''
		};
	}

	handleChange = (e, type) => {
		this.setState({
			[type]: e.target.value
		});
	};

	handleSubmit = () => {
		const { name, type } = this.state;
		if (name !== '' && type !== '') {
			this.props.createWorld();
			this.props.createPlayer(name, type);
		}
	};

	render() {
		return (
			<div className="PlayerCreation">
				<h2>Enter Player Name</h2>
				<input
					onChange={e => this.handleChange(e, 'name')}
					type="text"
					placeholder="Player Name"
				/>
				<br />
				<img
					id="imagePreview"
					src={
						this.state.type !== ''
							? this.props.icons.filter(
									icon => icon.type === this.state.type
							  )[0].icon
							: ''
					}
					alt=""
				/>

				<h2>Choose your Starter!</h2>

				<select onChange={e => this.handleChange(e, 'type')}>
					<option value="" hidden>
						Select a type
					</option>

					{this.props.icons.map(icon => (
						<option key={icon.type} value={icon.type}>
							{icon.name}
						</option>
					))}
				</select>

				<div className="submit" onClick={this.handleSubmit}>
					Submit
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	icons: state.gameReducer.icons
});

const mapDispatchToProps = dispatch => ({
	createPlayer: (name, type) => dispatch(createPlayer(name, type)),
	createWorld: () => dispatch(createWorld())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerCreation);
