import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const LIONS_OF_THE_EMPEROR: Detachment = {
  id: 'lions-of-the-emperor',
  name: 'Lions of the Emperor',
  dp: 1,
  shieldHost: false,
  styleTags: ['movement-charge', 'ranged-defence', 'melee-defence'],
  rule: {
    name: 'On Gilded Wings',
    text: {
      en: "At the end of your opponent's Fight phase, an unengaged friendly ADEPTUS CUSTODES TERMINATOR unit can be placed into strategic reserves.",
      es: 'Al final de la fase de Combate de tu oponente, una unidad ADEPTUS CUSTODES TERMINATOR propia no trabada puede pasar a reservas estratégicas.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Vigil Unending',
      cp: 2,
      timings: [
        { phase: 'shooting', turn: 'opponent' },
        { phase: 'fight', turn: 'opponent' },
      ],
      when: {
        en: "Your opponent's Shooting or Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES TERMINATOR unit.",
        es: 'Fase de Disparo o de Combate de tu oponente, cuando una unidad enemiga elige como objetivo a una unidad ADEPTUS CUSTODES TERMINATOR propia.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Attacks that target it have -1 D until that enemy unit has attacked.',
        es: 'Los ataques contra ella tienen -1 D hasta que esa unidad enemiga haya atacado.',
      },
      groups: ['ranged-defence', 'melee-defence'],
    }),
    defineStratagem({
      name: 'Unleash the Lions',
      cp: 1,
      timings: [{ phase: 'command', turn: 'mine' }],
      when: { en: 'Your Command phase.', es: 'Tu fase de Mando.' },
      target: {
        en: 'One friendly ADEPTUS CUSTODES TERMINATOR unit with 2 or more models.',
        es: 'Una unidad ADEPTUS CUSTODES TERMINATOR propia con 2 o más modelos.',
      },
      effect: {
        en: 'Split it into separate one-model units, each with a starting strength of 1.',
        es: 'Divídela en unidades separadas de un modelo, cada una con efectivos iniciales de 1.',
      },
      groups: ['objectives-utility'],
    }),
    defineStratagem({
      name: 'Fury of the Emperor',
      cp: 1,
      timings: [{ phase: 'charge', turn: 'mine' }],
      when: {
        en: 'Your Charge phase, when a friendly ADEPTUS CUSTODES TERMINATOR unit that made an ingress move this turn is selected to declare a charge.',
        es: 'Tu fase de Carga, cuando una unidad ADEPTUS CUSTODES TERMINATOR propia que hizo un movimiento de ingreso (ingress) este turno es seleccionada para declarar una carga.',
      },
      target: THAT_UNIT,
      effect: { en: '+2 to charge rolls.', es: '+2 a las tiradas de carga.' },
      groups: ['movement-charge'],
    }),
  ],
  enhancements: [
    {
      name: 'Lightning Descent',
      points: 20,
      upgrade: false,
      eligibility: {
        en: 'SHIELD-CAPTAIN IN ALLARUS TERMINATOR ARMOUR model.',
        es: 'Modelo SHIELD-CAPTAIN IN ALLARUS TERMINATOR ARMOUR.',
      },
      effect: {
        en: 'In your first Movement phase, its unit can make an ingress move.',
        es: 'En tu primera fase de Movimiento, su unidad puede hacer un movimiento de ingreso (ingress).',
      },
    },
    {
      name: 'Leonine Ferocity',
      points: 20,
      upgrade: false,
      eligibility: {
        en: 'SHIELD-CAPTAIN IN ALLARUS TERMINATOR ARMOUR model.',
        es: 'Modelo SHIELD-CAPTAIN IN ALLARUS TERMINATOR ARMOUR.',
      },
      effect: {
        en: 'Once per phase per army, its unit can be targeted with Rapid Ingress regardless of other uses of that stratagem this phase; that use costs 1CP less and does not prevent other uses on other units this phase.',
        es: 'Una vez por fase por ejército, su unidad puede ser objetivo de Rapid Ingress sin importar otros usos de esa stratagem en esta fase; ese uso cuesta 1CP menos y no impide otros usos sobre otras unidades en esta fase.',
      },
      verify: {
        en: 'Source reads "That use is -1 CP" (1CP less). An earlier read said "more": confirm it in your codex.',
        es: 'La fuente dice "That use is -1 CP" (1CP menos). Una lectura anterior decía "más": confírmalo en tu codex.',
      },
    },
  ],
};
