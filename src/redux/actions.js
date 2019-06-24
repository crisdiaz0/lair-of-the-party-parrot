export const Actions = {
	CREATE_PLAYER: 'CREATE_PLAYER',
	MOVE_PLAYER: 'MOVE_PLAYER',
	ENEMY_ENCOUNTERED: 'ENEMY_ENCOUNTERED',
	CREATE_ENEMY: 'CREATE_ENEMY',
	DAMAGE_ENEMY: 'DAMAGE_ENEMY',
	ENEMY_ATTACKS: 'ENEMY_ATTACKS',
	ENEMY_DEFEATED: 'ENEMY_DEFEATED',
	CREATE_WORLD: 'CREATE_WORLD',
	PLAYER_DEFEATED: 'PLAYER_DEFEATED'
};

export const createPlayer = (name, type, moves) => ({
	type: Actions.CREATE_PLAYER,
	payload: { name: name, type: type, moves: moves }
});

export const movePlayer = newPlayerPos => ({
	type: Actions.MOVE_PLAYER,
	payload: newPlayerPos
});

export const enemyEncountered = () => ({
	type: Actions.ENEMY_ENCOUNTERED
});

export const createEnemy = () => ({
	type: Actions.CREATE_ENEMY
});

export const damageEnemy = move => ({
	type: Actions.DAMAGE_ENEMY,
	payload: move
});

export const enemyAttacks = move => ({
	type: Actions.ENEMY_ATTACKS,
	payload: move
});

export const enemyDefeated = () => ({
	type: Actions.ENEMY_DEFEATED
});

export const createWorld = () => ({
	type: Actions.CREATE_WORLD
});

export const playerDefeated = () => ({
	type: Actions.PLAYER_DEFEATED
});
