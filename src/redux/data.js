import Parrot from '../Assets/parrot.gif';
import UFParrot from '../Assets/ultrafastparrot.gif';
import SadParrot from '../Assets/sadparrot.gif';
import ConfusedParrot from '../Assets/confusedparrot.gif';
import SleepingParrot from '../Assets/sleepingparrot.gif';
import PirateParrot from '../Assets/pirateparrot.gif';
import PingPongParrot from '../Assets/pingpongparrot.gif';
import CeilingParrot from '../Assets/ceilingparrot.gif';
import DiscoParrot from '../Assets/discoparrot.gif';
import NotFoundParrot from '../Assets/parrotnotfound.gif';

const moves = {
	PartyParrot: [
		{
			name: 'Peck',
			damage: 20
		},
		{
			name: 'Party All Night Long',
			damage: 20
		},
		{
			name: 'Party Every Day',
			damage: 20
		},
		{
			name: 'Fiesta',
			damage: 20
		}
	],
	UFParrot: [
		{
			name: 'Quick Attack',
			damage: 20
		},
		{
			name: 'Sonic Boom',
			damage: 20
		},
		{
			name: 'Flash',
			damage: 20
		},
		{
			name: 'Illusion',
			damage: 20
		}
	],
	SadParrot: [
		{
			name: 'Cry',
			damage: 20
		},
		{
			name: 'Feel Terrible',
			damage: 20
		},
		{
			name: 'Gather Empathy',
			damage: 25
		},
		{
			name: 'Oof',
			damage: 20
		}
	],
	ConfusedParrot: [
		{
			name: 'Confusion',
			damage: 20
		},
		{
			name: 'Peck',
			damage: 20
		},
		{
			name: 'Wing Attack',
			damage: 20
		},
		{
			name: 'Dizzying Attacks',
			damage: 20
		}
	],
	SleepingParrot: [
		{
			name: 'Snore',
			damage: 20
		},
		{
			name: 'Nap',
			damage: 0
		},
		{
			name: 'Nightmare',
			damage: 20
		},
		{
			name: 'Slumber',
			damage: 20
		}
	],
	PirateParrot: [
		{
			name: 'Plunder',
			damage: 20
		},
		{
			name: 'YARGH!',
			damage: 20
		},
		{
			name: 'Sea Sickness',
			damage: 20
		},
		{
			name: 'Scurvy',
			damage: 20
		}
	],
	PingPongParrot: [
		{
			name: 'Serve',
			damage: 100
		},
		{
			name: 'Slam',
			damage: 20
		},
		{
			name: 'Superior Pen Grip',
			damage: 20
		},
		{
			name: 'Curve',
			damage: 20
		}
	],
	CeilingParrot: [
		{
			name: 'Hide',
			damage: 20
		},
		{
			name: 'Leer',
			damage: 20
		},
		{
			name: 'Rubble',
			damage: 20
		},
		{
			name: 'Ceiling Leak',
			damage: 20
		}
	],
	DiscoParrot: [
		{
			name: 'The 70s',
			damage: 20
		},
		{
			name: 'Disco Fever',
			damage: 20
		},
		{
			name: 'Funky Music',
			damage: 20
		},
		{
			name: 'Worst Genre',
			damage: 20
		}
	],
	NotFoundParrot: [
		{
			name: '404 - Attack Not Found',
			damage: 0
		},
		{
			name: '409 - Conflict',
			damage: 20
		},
		{
			name: '501 - Not Implemented',
			damage: 0
		},
		{
			name: '200 - OK',
			damage: 20
		}
	]
};

const icons = [
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
	},
	{
		type: 'SleepingParrot',
		name: 'Sleeping Parrot',
		icon: SleepingParrot
	},
	{
		type: 'PirateParrot',
		name: 'Pirate Parrot',
		icon: PirateParrot
	},
	{
		type: 'PingPongParrot',
		name: 'Ping Pong Parrot',
		icon: PingPongParrot
	},
	{
		type: 'CeilingParrot',
		name: 'Ceiling Parrot',
		icon: CeilingParrot
	},
	{
		type: 'DiscoParrot',
		name: 'Disco Parrot',
		icon: DiscoParrot
	},
	{
		type: 'NotFoundParrot',
		name: 'Not Found Parrot',
		icon: NotFoundParrot
	}
];

export const levelScaling = {
	1: { HP: 1.0, dmg: 0.5 },
	2: { HP: 1.3, dmg: 0.8 },
	3: { HP: 1.8, dmg: 1.0 },
	4: { HP: 2.2, dmg: 1.3 },
	5: { HP: 2.6, dmg: 1.7 },
	6: { HP: 3.0, dmg: 1.9 },
	7: { HP: 100.0, dmg: 100.0 }
};

export const initialPlayerState = {
	Player: {
		name: '',
		type: '',
		icon: '',
		baseHP: 0,
		HP: 0,
		Lvl: 0,
		score: -500,
		enemiesDefeated: 0,
		movesMade: 0,
		playerMoves: [],
		playerPos: {
			r: 0,
			c: 0
		}
	},
	icons: icons,
	moves: moves
};

export const initialEnemyState = {
	currentEnemy: {
		iconObj: {
			type: '',
			name: '',
			icon: ''
		},
		enemyMoves: [],
		baseHP: 0,
		HP: 0,
		isDefeated: true
	},
	icons: icons,
	moves: moves
};

export const initialGameState = {
	icons: icons,
	moves: moves,
	latestMove: '',
	previousUsedPlayerMove: '',
	cells: [],
	enemyEncountered: false,
	isPlayersTurn: true,
	playerDefeated: false,
	playerUpgradingMoves: false,
	currentSongSrc: '',
	enemiesRemaining: 0,
	isSavingToLocalState: false,
	randomDamage: 0
};
