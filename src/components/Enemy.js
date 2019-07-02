import React from 'react';
import HealthBar from './HealthBar';
import { connect } from 'react-redux';

const Enemy = ({ enemyObj }) => (
	<div className="Enemy">
		<img
			src={enemyObj.iconObj.icon}
			style={{ width: '100px', height: '100px' }}
			alt="Enemy"
		/>

		<HealthBar
			addClass="EnemyHP"
			currentHP={enemyObj.HP}
			baseHP={enemyObj.baseHP}
		/>
	</div>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Enemy);
