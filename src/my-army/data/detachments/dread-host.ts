import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const DREAD_HOST: Detachment = {
  id: 'dread-host',
  name: 'Dread Host',
  dp: 1,
  shieldHost: true,
  favouredKatah: {
    katahId: 'dacatarai',
    extraEffect: {
      en: 'When an enemy unit engaged with your unit makes a pile-in or consolidation move, that move is reduced by 2".',
      es: 'Cuando una unidad enemiga trabada con tu unidad hace un movimiento de agrupamiento (pile-in) o de consolidación, ese movimiento se reduce en 2".',
    },
  },
  styleTags: ['movement-charge', 'melee-attack'],
  rule: {
    name: "Instruments of the Emperor's Wrath",
    text: {
      en: 'Friendly ADEPTUS CUSTODES units can re-roll charge rolls.',
      es: 'Las unidades ADEPTUS CUSTODES propias pueden repetir las tiradas de carga.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Lightning Wrath',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly ADEPTUS CUSTODES unit is selected to pile in.',
        es: 'Fase de Combate, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para agruparse (pile in).',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its pile-in can be up to D3+3".',
        es: 'Su agrupamiento (pile-in) puede ser de hasta D3+3".',
      },
      groups: ['melee-attack'],
    }),
    defineStratagem({
      name: 'Golden Light of the Moiraides',
      cp: 2,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to make an ingress move.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para hacer un movimiento de ingreso (ingress).',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Until the start of your next turn, attacks that target it have -1 to hit, and enemy units cannot target it with snap shooting.',
        es: 'Hasta el inicio de tu siguiente turno, los ataques contra ella tienen -1 para impactar, y las unidades enemigas no pueden elegirla como objetivo con snap shooting.',
      },
      groups: ['ranged-defence', 'movement-charge'],
    }),
    defineStratagem({
      name: 'Preternatural Rapidity',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES unit ends an advance move.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES propia termina un movimiento de avance.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'That advance does not prevent it from declaring a charge.',
        es: 'Ese avance no le impide declarar una carga.',
      },
      groups: ['movement-charge'],
    }),
  ],
  enhancements: [
    {
      name: 'Flawless Bladework',
      points: 15,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'Melee attacks have [SUSTAINED HITS 1].',
        es: 'Los ataques cuerpo a cuerpo tienen [SUSTAINED HITS 1].',
      },
    },
    {
      name: 'Auric Exemplar',
      points: 15,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'Melee attacks have [CLEAVE 1].',
        es: 'Los ataques cuerpo a cuerpo tienen [CLEAVE 1].',
      },
    },
  ],
};
