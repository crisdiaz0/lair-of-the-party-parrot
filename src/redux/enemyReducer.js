import { Actions } from './actions';
import { initialEnemyState, levelScaling } from './data';

const enemyReducer = (state = initialEnemyState, action) => {
	switch (action.type) {
		case Actions.CREATE_ENEMY:
			let iconObj =
				state.icons[Math.floor(Math.random() * state.icons.length)];
			return {
				...state,
				currentEnemy: {
					iconObj: iconObj,
					enemyMoves: state.moves[iconObj.type],
					baseHP: Math.ceil(100 * levelScaling[action.payload].HP),
					HP: Math.ceil(100 * levelScaling[action.payload].HP),
					isDefeated: false
				}
			};

		case Actions.DAMAGE_ENEMY:
			return {
				...state,
				currentEnemy: {
					...state.currentEnemy,
					HP: state.currentEnemy.HP - action.payload.damage
				}
			};

		case Actions.LOAD_FROM_LOCAL_STATE:
			return action.payload.enemyReducer;

		default:
			return state;
	}
};

export default enemyReducer;
