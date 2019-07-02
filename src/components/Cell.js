import React from 'react';
import Tile from '../Assets/floor.png';
import VisitedTile from '../Assets/floorVisited.png';
import Obstacle from '../Assets/spikes.png';
import Food from '../Assets/Bread.png';

const Cell = ({ cellObj }) => (
	<>
		<img
			src={cellObj.hasBeenVisited ? VisitedTile : Tile}
			alt=""
			style={{
				gridArea: cellObj.cell,
				zIndex: -2,
				width: '100px',
				height: '100px'
			}}
		/>

		<img
			src={
				cellObj.hasFood
					? Food
					: cellObj.hasObstacle
					? Obstacle
					: cellObj.hasBeenVisited
					? VisitedTile
					: Tile
			}
			alt=""
			style={{
				gridArea: cellObj.cell,
				zIndex: -1,
				width: '100px',
				height: '100px'
			}}
		/>
	</>
);

export default Cell;
