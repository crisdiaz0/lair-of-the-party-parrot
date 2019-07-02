import React from 'react';

const HealthBar = ({ addClass, currentHP, baseHP }) => (
	<>
		<div className={`HealthBarOuter ${addClass}`}>
			<div
				className={`HealthBarInner ${addClass}`}
				style={{
					width: `${(currentHP / baseHP) * 100}%`
				}}
			>
				.
			</div>
		</div>

		<h2>{`HP: ${currentHP} / ${baseHP}`}</h2>
	</>
);

export default HealthBar;
