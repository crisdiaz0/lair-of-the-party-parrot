import React from 'react';

const PlayerMove = ({ onClick, move, isUsedMove }) => (
	<div className="PlayerMove">
		<div
			key={move.name}
			className={`playerMove ${isUsedMove ? 'usedMove' : ''}`}
			onClick={isUsedMove ? () => {} : () => onClick(move)}
		>
			<h3>{move.name}</h3>
			<h3>{`Damage: ${move.damage}`}</h3>
		</div>
	</div>
);

export default PlayerMove;
