import React from 'react';
import { connect } from 'react-redux';

const Enemy = ({ enemyObj }) => (
	<div className="Enemy">
		<img
			src={enemyObj.iconObj.icon}
			style={{ width: '100px', height: '100px' }}
			alt="Enemy"
		/>
		<div className="hpOuterEnemy">
			<div className="hpInnerEnemy" style={{ width: `${enemyObj.HP}%` }}>
				.
			</div>
		</div>

		<h2>{`Enemy HP: ${enemyObj.HP} / 100`}</h2>
	</div>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Enemy);
