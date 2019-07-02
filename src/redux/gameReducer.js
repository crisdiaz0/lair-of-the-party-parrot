import { Actions } from './actions';
import { initialGameState, levelScaling } from './data';

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case Actions.CREATE_WORLD:
			let cells = [];

			for (let r = 0; r <= 5; r++)
				for (let c = 0; c <= 8; c++) {
					let num = Math.floor(Math.random() * 100);

					cells.push({
						cell: `r${r}c${c}`,
						hasBeenVisited: false,
						hasEnemy: num <= 5 ? true : false,
						hasObstacle: num >= 6 && num <= 20 ? true : false,
						hasFood: num > 20 && num <= 28 ? true : false
					});
				}

			cells[0] = {
				cell: `r0c0`,
				hasBeenVisited: false,
				hasEnemy: false,
				hasObstacle: false
			};

			const enemiesRemaining = cells.reduce(
				(total, cell) => (cell.hasEnemy ? total + 1 : total),
				0
			);

			if (!enemiesRemaining)
				cells[1] = {
					cell: 'r0c1',
					hasBeenVisited: false,
					hasEnemy: true,
					hasObstacle: false
				};

			return {
				...state,
				cells: cells,
				enemiesRemaining: enemiesRemaining
			};

		case Actions.ENEMY_DEFEATED:
			const newCells = state.cells.map(cellObj => {
				if (cellObj.cell === `r${action.payload.r}c${action.payload.c}`)
					return { ...cellObj, hasEnemy: false };
				else return cellObj;
			});

			return {
				...state,
				enemyEncountered: false,
				isPlayersTurn: true,
				previousUsedPlayerMove: '',
				latestMove: '',
				cells: newCells,
				currentSongSrc: '',
				playerUpgradingMoves: true,
				enemiesRemaining: newCells.reduce(
					(total, cell) => (cell.hasEnemy ? total + 1 : total),
					0
				)
			};

		case Actions.ENEMY_ENCOUNTERED:
			return {
				...state,
				enemyEncountered: true,
				currentSongSrc:
					'https://www.youtube.com/embed/2Jmty_NiaXc?autoplay=1'
			};

		case Actions.DAMAGE_ENEMY:
			return {
				...state,
				isPlayersTurn: false,
				previousUsedPlayerMove: action.payload,
				latestMove: `You used ${action.payload.name}!`
			};

		case Actions.ENEMY_ATTACKS:
			if (action.payload.enemyHP <= 0) return state;
			else
				return {
					...state,
					isPlayersTurn: true,
					latestMove: `The enemy attacked with ${
						action.payload.move.name
					} for ${action.payload.move.damage *
						levelScaling[action.payload.playerLvl].dmg} damage!`
				};

		case Actions.MOVE_PLAYER: {
			const newCells = state.cells.map(cell =>
				cell.cell ===
				`r${action.payload.oldPlayerPos.r}c${
					action.payload.oldPlayerPos.c
				}`
					? { ...cell, hasBeenVisited: true }
					: cell
			);

			return {
				...state,
				cells: newCells
			};
		}

		case Actions.PLAYER_HIT_OBSTACLE: {
			const newCells = state.cells.map(cellObj => {
				if (cellObj.cell === `r${action.payload.r}c${action.payload.c}`)
					return { ...cellObj, hasObstacle: false };
				else return cellObj;
			});

			return {
				...state,
				cells: newCells
			};
		}

		case Actions.PLAYER_HIT_FOOD: {
			const newCells = state.cells.map(cellObj => {
				if (cellObj.cell === `r${action.payload.r}c${action.payload.c}`)
					return { ...cellObj, hasFood: false };
				else return cellObj;
			});

			return {
				...state,
				cells: newCells
			};
		}

		case Actions.PLAYER_DEFEATED:
			return {
				...state,
				enemyEncountered: false,
				playerDefeated: true,
				currentSongSrc: ''
			};

		case Actions.UPGRADE_PLAYER_MOVE:
			return {
				...state,
				playerUpgradingMoves: false
			};

		case Actions.TOGGLE_SAVE_TO_LOCAL_STATE:
			return {
				...state,
				isSavingToLocalState: !state.isSavingToLocalState
			};

		case Actions.LOAD_FROM_LOCAL_STATE:
			return {
				...action.payload.gameReducer,
				isSavingToLocalState: false
			};

		default:
			return state;
	}
};

export default gameReducer;
