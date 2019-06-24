import { Actions } from './actions';
import { combineReducers } from 'redux';

import Parrot from '../Icons/parrot.gif';
import UFParrot from '../Icons/ultrafastparrot.gif';
import SadParrot from '../Icons/sadparrot.gif';
import ConfusedParrot from '../Icons/confusedparrot.gif';

const initialState = {
	Player: {
		name: '',
		type: '',
		icon: '',
		HP: 0,
		XP: 0,
		Lvl: 0,
		enemiesDefeated: 0,
		movesMade: 0,
		playerMoves: [],
		playerPos: {
			r: Math.floor(Math.random() * 6),
			c: Math.floor(Math.random() * 9)
		}
	},
	icons: [
		{
			type: 'PartyParrot',
			name: 'Party Parrot',
			icon: Parrot
		},
		{
			type: 'UFParrot',
			name: 'Ultra Fast Parrot',
			icon: UFParrot
		},
		{
			type: 'SadParrot',
			name: 'Sad Parrot',
			icon: SadParrot
		},
		{
			type: 'ConfusedParrot',
			name: 'Confused Parrot',
			icon: ConfusedParrot
		}
	],
	instrumentMoves: {
		PartyParrot: [
			{
				name: 'Peck',
				damage: 20
			},
			{
				name: 'Party All Night Long',
				damage: 35
			},
			{
				name: 'Party Every Day',
				damage: 30
			},
			{
				name: 'Fiesta',
				damage: 25
			}
		],
		UFParrot: [
			{
				name: 'Quick Attack',
				damage: 30
			},
			{
				name: 'Sonic Boom',
				damage: 35
			},
			{
				name: 'Flash',
				damage: 40
			},
			{
				name: 'Illusion',
				damage: 30
			}
		],
		SadParrot: [
			{
				name: 'Cry',
				damage: 0
			},
			{
				name: 'Feel Terrible',
				damage: 0
			},
			{
				name: 'Gather Empathy',
				damage: 100
			},
			{
				name: 'Oof',
				damage: 0
			}
		],
		ConfusedParrot: [
			{
				name: 'Confusion',
				damage: -10
			},
			{
				name: 'Peck',
				damage: 20
			},
			{
				name: 'Wing Attack',
				damage: 25
			},
			{
				name: 'Dizzying Attacks',
				damage: 30
			}
		]
	},
	// currentSongSrc: 'https://www.youtube.com/embed/2Jmty_NiaXc?autoplay=1',
	enemyEncountered: false,
	currentEnemy: {},
	isPlayersTurn: true,
	playerDefeated: false,
	latestMove: '',
	cells: []
};

const initialPlayerState = {
	Player: {
		name: '',
		type: '',
		icon: '',
		HP: 0,
		XP: 0,
		Lvl: 0,
		enemiesDefeated: 0,
		movesMade: 0,
		playerMoves: [],
		playerPos: {
			r: Math.floor(Math.random() * 6),
			c: Math.floor(Math.random() * 9)
		}
	},
	isPlayersTurn: true,
	playerDefeated: false
};

const initialEnemyState = {
	enemyEncountered: false,
	currentEnemy: {}
};

const initialGameState = {
	icons: [
		{
			type: 'PartyParrot',
			name: 'Party Parrot',
			icon: Parrot
		},
		{
			type: 'UFParrot',
			name: 'Ultra Fast Parrot',
			icon: UFParrot
		},
		{
			type: 'SadParrot',
			name: 'Sad Parrot',
			icon: SadParrot
		},
		{
			type: 'ConfusedParrot',
			name: 'Confused Parrot',
			icon: ConfusedParrot
		}
	],
	moves: {
		PartyParrot: [
			{
				name: 'Peck',
				damage: 20
			},
			{
				name: 'Party All Night Long',
				damage: 35
			},
			{
				name: 'Party Every Day',
				damage: 30
			},
			{
				name: 'Fiesta',
				damage: 25
			}
		],
		UFParrot: [
			{
				name: 'Quick Attack',
				damage: 30
			},
			{
				name: 'Sonic Boom',
				damage: 35
			},
			{
				name: 'Flash',
				damage: 40
			},
			{
				name: 'Illusion',
				damage: 30
			}
		],
		SadParrot: [
			{
				name: 'Cry',
				damage: 0
			},
			{
				name: 'Fell Terrible',
				damage: 0
			},
			{
				name: 'Gather Empathy',
				damage: 100
			},
			{
				name: 'Oof',
				damage: 0
			}
		],
		ConfusedParrot: [
			{
				name: 'Confusion',
				damage: -10
			},
			{
				name: 'Peck',
				damage: 20
			},
			{
				name: 'Wing Attack',
				damage: 25
			},
			{
				name: 'Dizzying Attacks',
				damage: 30
			}
		]
	},
	latestMove: '',
	cells: []
};

const playerReducer = (state = initialPlayerState, action) => {
	switch (action.type) {
		case Actions.CREATE_PLAYER:
			return {
				...state,
				Player: {
					...state.Player,
					name: action.payload.name,
					HP: 100,
					Lvl: 1,

					type: state.icons.filter(
						icon => icon.type === action.payload.type
					)[0].name,

					icon: state.icons.filter(
						icon => icon.type === action.payload.type
					)[0].icon
				}
			};

		case Actions.MOVE_PLAYER:
			return {
				...state,
				Player: {
					...state.Player,
					playerPos: action.payload,
					movesMade: state.Player.movesMade + 1
				}
			};
		default:
			return state;
	}
};
// playerMoves: state.moves[action.payload.type]
const enemyReducer = (state = initialEnemyState, action) => {
	switch (action.type) {
		case Actions.ENEMY_ENCOUNTERED:
			return {
				...state,
				enemyEncountered: true
			};

		case Actions.CREATE_ENEMY:
			let iconObj =
				state.icons[Math.floor(Math.random() * state.icons.length)];
			return {
				...state,
				currentEnemy: {
					iconObj: iconObj,
					enemyMoves: state.instrumentMoves[iconObj.type],
					HP: 100,
					isDefeated: false
				}
			};

		case Actions.DAMAGE_ENEMY:
			return {
				...state,
				isPlayersTurn: false,
				currentEnemy: {
					...state.currentEnemy,
					HP: state.currentEnemy.HP - action.payload.damage
				},
				latestMove: `${state.Player.name} used ${action.payload.name}!`
			};

		default:
			return state;
	}
};

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case Actions.ENEMY_DEFEATED:
			const newCells = state.cells.map(cellObj => {
				if (
					cellObj.cell ===
					`r${state.Player.playerPos.r}c${state.Player.playerPos.c}`
				)
					return { ...cellObj, hasEnemy: false };
				else return cellObj;
			});

		default:
			return state;
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.CREATE_PLAYER:
			return {
				...state,
				Player: {
					...state.Player,
					name: action.payload.name,
					HP: 100,
					Lvl: 1,
					playerMoves: state.instrumentMoves[action.payload.type],

					type: state.icons.filter(
						icon => icon.type === action.payload.type
					)[0].name,

					icon: state.icons.filter(
						icon => icon.type === action.payload.type
					)[0].icon
				}
			};

		case Actions.MOVE_PLAYER:
			return {
				...state,
				Player: {
					...state.Player,
					playerPos: action.payload,
					movesMade: state.Player.movesMade + 1
				}
			};

		case Actions.ENEMY_ENCOUNTERED:
			return {
				...state,
				enemyEncountered: true
			};

		case Actions.CREATE_ENEMY:
			let iconObj =
				state.icons[Math.floor(Math.random() * state.icons.length)];
			return {
				...state,
				currentEnemy: {
					iconObj: iconObj,
					enemyMoves: state.instrumentMoves[iconObj.type],
					HP: 100,
					isDefeated: false
				}
			};

		case Actions.DAMAGE_ENEMY:
			return {
				...state,
				isPlayersTurn: false,
				currentEnemy: {
					...state.currentEnemy,
					HP: state.currentEnemy.HP - action.payload.damage
				},
				latestMove: `${state.Player.name} used ${action.payload.name}!`
			};

		case Actions.ENEMY_ATTACKS:
			return {
				...state,
				isPlayersTurn: true,
				latestMove: `The enemy ${
					state.currentEnemy.iconObj.name
				} attacks with ${action.payload.name} for ${
					action.payload.damage
				} damage!`,

				Player: {
					...state.Player,
					HP: state.Player.HP - action.payload.damage
				}
			};

		case Actions.ENEMY_DEFEATED:
			const newCells = state.cells.map(cellObj => {
				if (
					cellObj.cell ===
					`r${state.Player.playerPos.r}c${state.Player.playerPos.c}`
				)
					return { ...cellObj, hasEnemy: false };
				else return cellObj;
			});

			return {
				...state,
				Player: {
					...state.Player,
					enemiesDefeated: state.Player.enemiesDefeated + 1,
					XP: state.Player.XP + 10,
					HP: 100
				},
				currentEnemy: {
					...state.currentEnemy,
					isDefeated: true
				},
				enemyEncountered: false,
				isPlayersTurn: true,
				latestMove: '',
				cells: newCells
			};

		case Actions.PLAYER_DEFEATED:
			return {
				...state,
				Player: {
					...state.Player,
					HP: 0
				},
				enemyEncountered: false,
				playerDefeated: true
			};

		case Actions.CREATE_WORLD:
			let cellString = '';
			let cells = [];

			for (let r = 0; r <= 5; r++)
				for (let c = 0; c <= 8; c++)
					r === 5 && c === 8
						? (cellString += `r${r}c${c}`)
						: (cellString += `r${r}c${c},`);

			cellString.split(',').forEach(cell =>
				cells.push({
					cell: cell,
					hasEnemy:
						Math.ceil(Math.random() * 100) > 5 ? 'false' : 'true'
				})
			);

			return { ...state, cells: cells };

		default:
			return state;
	}
};

// export default reducer;

export default combineReducers({
	playerReducer,
	enemyReducer,
	gameReducer
});
