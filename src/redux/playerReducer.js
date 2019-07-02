import { Actions } from './actions';
import { initialPlayerState, levelScaling } from './data';

const playerReducer = (state = initialPlayerState, action) => {
	switch (action.type) {
		case Actions.CREATE_PLAYER:
			return {
				...state,
				Player: {
					...state.Player,
					name: action.payload.name,
					baseHP: 100,
					HP: 100,
					Lvl: 1,
					playerMoves: state.moves[action.payload.type],

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
					playerPos: action.payload.newPlayerPos,
					movesMade: state.Player.movesMade + 1,
					score: state.Player.score - 5
				}
			};

		case Actions.ENEMY_DEFEATED:
			return {
				...state,
				Player: {
					...state.Player,
					enemiesDefeated: state.Player.enemiesDefeated + 1,
					score: state.Player.score + 100
				}
			};

		case Actions.ENEMY_ATTACKS:
			if (action.payload.enemyHP <= 0) return state;
			else
				return {
					...state,
					Player: {
						...state.Player,
						HP:
							state.Player.HP -
							action.payload.move.damage *
								levelScaling[state.Player.Lvl].dmg
					}
				};

		case Actions.PLAYER_DEFEATED:
			return {
				...state,
				Player: {
					...state.Player,
					HP: 0
				}
			};

		case Actions.PLAYER_HIT_OBSTACLE:
			return {
				...state,
				Player: {
					...state.Player,
					HP: state.Player.HP - 30,
					movesMade: state.Player.movesMade + 1,
					score: state.Player.score - 100
				}
			};

		case Actions.PLAYER_HIT_FOOD:
			return {
				...state,
				Player: {
					...state.Player,
					HP: state.Player.HP + 25,
					baseHP: state.Player.baseHP + 25,
					score: state.Player.score + 25
				}
			};

		case Actions.UPGRADE_PLAYER_MOVE:
			if (action.payload === 'Refill') {
				return {
					...state,
					Player: {
						...state.Player,
						HP: state.Player.baseHP
					}
				};
			} else if (action.payload === 'HP') {
				return {
					...state,
					Player: {
						...state.Player,
						HP:
							state.Player.HP +
							30 * levelScaling[state.Player.Lvl].HP,
						baseHP:
							state.Player.baseHP +
							50 * levelScaling[state.Player.Lvl].HP
					}
				};
			} else {
				const newPlayerMoves = state.Player.playerMoves.map(move => {
					if (move === action.payload)
						return { ...move, damage: move.damage + 10 };
					else return move;
				});

				return {
					...state,
					Player: {
						...state.Player,
						playerMoves: newPlayerMoves
					}
				};
			}

		case Actions.CREATE_WORLD:
			return {
				...state,
				Player: {
					...state.Player,
					Lvl: state.Player.Lvl + 1,
					score: state.Player.score + 500,
					playerPos: {
						r: 0,
						c: 0
					}
				}
			};

		case Actions.LOAD_FROM_LOCAL_STATE:
			return action.payload.playerReducer;

		default:
			return state;
	}
};

export default playerReducer;
