export const Actions = {
	CREATE_PLAYER: 'CREATE_PLAYER',
	MOVE_PLAYER: 'MOVE_PLAYER',
	ENEMY_ENCOUNTERED: 'ENEMY_ENCOUNTERED',
	CREATE_ENEMY: 'CREATE_ENEMY',
	DAMAGE_ENEMY: 'DAMAGE_ENEMY',
	ENEMY_ATTACKS: 'ENEMY_ATTACKS',
	ENEMY_DEFEATED: 'ENEMY_DEFEATED',
	CREATE_WORLD: 'CREATE_WORLD',
	PLAYER_DEFEATED: 'PLAYER_DEFEATED',
	PLAYER_HIT_OBSTACLE: 'PLAYER_HIT_OBSTACLE',
	PLAYER_HIT_FOOD: 'PLAYER_HIT_FOOD',
	UPGRADE_PLAYER_MOVE: 'UPGRADE_PLAYER_MOVE',
	WORLD_CLEARED: 'WORLD_CLEARED',
	TOGGLE_SAVE_TO_LOCAL_STATE: 'TOGGLE_SAVE_TO_LOCAL_STATE',
	LOAD_FROM_LOCAL_STATE: 'LOAD_FROM_LOCAL_STATE'
};

export const createPlayer = (name, type, moves) => ({
	type: Actions.CREATE_PLAYER,
	payload: { name: name, type: type, moves: moves }
});

export const movePlayer = (newPlayerPos, oldPlayerPos) => ({
	type: Actions.MOVE_PLAYER,
	payload: { newPlayerPos: newPlayerPos, oldPlayerPos: oldPlayerPos }
});

export const enemyEncountered = () => ({
	type: Actions.ENEMY_ENCOUNTERED
});

export const createEnemy = playerLvl => ({
	type: Actions.CREATE_ENEMY,
	payload: playerLvl
});

export const damageEnemy = move => ({
	type: Actions.DAMAGE_ENEMY,
	payload: move
});

export const enemyAttacks = (move, enemyHP, playerLvl) => ({
	type: Actions.ENEMY_ATTACKS,
	payload: { move: move, enemyHP: enemyHP, playerLvl: playerLvl }
});

export const enemyDefeated = playerPos => ({
	type: Actions.ENEMY_DEFEATED,
	payload: playerPos
});

export const createWorld = () => ({
	type: Actions.CREATE_WORLD
});

export const playerDefeated = () => ({
	type: Actions.PLAYER_DEFEATED
});

export const playerHitObstacle = playerPos => ({
	type: Actions.PLAYER_HIT_OBSTACLE,
	payload: playerPos
});

export const upgradePlayerMove = selectedMove => ({
	type: Actions.UPGRADE_PLAYER_MOVE,
	payload: selectedMove
});

export const worldCleared = () => ({
	type: Actions.WORLD_CLEARED
});

export const toggleSaveToLocalState = () => ({
	type: Actions.TOGGLE_SAVE_TO_LOCAL_STATE
});

export const loadFromLocalState = savedState => ({
	type: Actions.LOAD_FROM_LOCAL_STATE,
	payload: savedState
});

export const playerHitFood = newPlayerPos => ({
	type: Actions.PLAYER_HIT_FOOD,
	payload: newPlayerPos
});
