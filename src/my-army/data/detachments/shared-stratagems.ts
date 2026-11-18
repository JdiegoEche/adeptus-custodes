import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';

/**
 * Stratagems printed identically in more than one detachment.
 * Defined once and reused so the merged list can dedupe them by id.
 */

/** Guardians of the Throne + Emperor's Chosen. */
export const SUPERHUMAN_FOCUS = defineStratagem({
  name: 'Superhuman Focus',
  cp: 1,
  timings: [{ phase: 'any', turn: 'both' }],
  when: { en: 'End of any phase.', es: 'Final de cualquier fase.' },
  target: {
    en: 'One friendly ADEPTUS CUSTODES unit that is not readied.',
    es: 'Una unidad ADEPTUS CUSTODES propia que no esté readied.',
  },
  effect: { en: 'The unit becomes readied.', es: 'La unidad queda readied.' },
  restrictions: {
    en: 'Not on the same unit more than once per battle round.',
    es: 'No sobre la misma unidad más de una vez por ronda de batalla.',
  },
  groups: ['objectives-utility'],
});

/** Guardians of the Throne + Emperor's Chosen. */
export const IN_AURAMITE_CLAD = defineStratagem({
  name: 'In Auramite Clad',
  cp: 1,
  timings: [
    { phase: 'shooting', turn: 'opponent' },
    { phase: 'fight', turn: 'opponent' },
  ],
  when: {
    en: "Your opponent's Shooting or Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES unit.",
    es: 'Fase de Disparo o de Combate de tu oponente, cuando una unidad enemiga elige como objetivo a una unidad ADEPTUS CUSTODES propia.',
  },
  target: {
    en: 'That unit (excluding CUSTODIAN WARDENS).',
    es: 'Esa unidad (excepto CUSTODIAN WARDENS).',
  },
  effect: {
    en: 'Attacks that target your unit have -1 AP (worse AP, closer to 0) until that enemy unit has attacked.',
    es: 'Los ataques contra tu unidad tienen -1 AP (AP peor, más cerca de 0) hasta que esa unidad enemiga haya atacado.',
  },
  groups: ['ranged-defence', 'melee-defence'],
});

/** Guardians of the Throne + Honoured Companions. */
export const SWIFT_AS_THE_EAGLE = defineStratagem({
  name: 'Swift as the Eagle',
  cp: 1,
  timings: [{ phase: 'movement', turn: 'opponent' }],
  when: {
    en: "Your opponent's Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged TRUSTED SENTINEL unit.",
    es: 'Fase de Movimiento de tu oponente, cuando una unidad enemiga termina un movimiento a 8" o menos de una unidad TRUSTED SENTINEL propia no trabada.',
  },
  target: THAT_UNIT,
  effect: {
    en: 'It makes a normal move of up to D3+3".',
    es: 'Realiza un movimiento normal de hasta D3+3".',
  },
  groups: ['opponent-turn-reaction'],
});
