import type { GroupId, Phase, TurnOwner } from './types';

/** Display order of the personal stratagem groups. */
export const GROUP_ORDER: GroupId[] = [
  'ranged-attack',
  'melee-attack',
  'ranged-defence',
  'melee-defence',
  'movement-charge',
  'opponent-turn-reaction',
  'objectives-utility',
];

/** Display order of phases (turn order, then "any phase"). */
export const PHASE_ORDER: Phase[] = ['command', 'movement', 'shooting', 'charge', 'fight', 'any'];

export const TURN_ORDER: TurnOwner[] = ['mine', 'opponent', 'both'];
