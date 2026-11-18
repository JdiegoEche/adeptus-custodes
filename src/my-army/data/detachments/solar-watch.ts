import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const SOLAR_WATCH: Detachment = {
  id: 'solar-watch',
  name: 'Solar Watch',
  dp: 1,
  shieldHost: true,
  favouredKatah: {
    katahId: 'calistus',
    extraEffect: { en: 'Your unit has +2" M.', es: 'Tu unidad tiene +2" de M.' },
  },
  styleTags: ['movement-charge'],
  rule: {
    name: 'Talon Sortie',
    text: {
      en: 'When a friendly ADEPTUS CUSTODES unit falls back, that move does not prevent it from charging.',
      es: 'Cuando una unidad ADEPTUS CUSTODES propia se retira (fall back), ese movimiento no le impide cargar.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Inexorable',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to move.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para moverse.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Until the end of the turn, ignore modifiers to its M, advance rolls and charge rolls.',
        es: 'Hasta el final del turno, ignora los modificadores a su M, a sus tiradas de avance y a sus tiradas de carga.',
      },
      groups: ['movement-charge'],
    }),
    defineStratagem({
      name: "At Spear's Length",
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to fall back.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para retirarse (fall back).',
      },
      target: THAT_UNIT,
      effect: {
        en: 'That fall-back does not prevent it from shooting.',
        es: 'Esa retirada no le impide disparar.',
      },
      groups: ['movement-charge'],
    }),
    defineStratagem({
      name: 'Gravimetric Grenade',
      cp: 1,
      timings: [{ phase: 'charge', turn: 'opponent' }],
      when: {
        en: "Start of your opponent's Charge phase.",
        es: 'Inicio de la fase de Carga de tu oponente.',
      },
      target: {
        en: 'One friendly unengaged ADEPTUS CUSTODES unit.',
        es: 'Una unidad ADEPTUS CUSTODES propia no trabada.',
      },
      effect: {
        en: 'Select one visible enemy unit within 12"; when that unit declares a charge, it has -1 to charge rolls.',
        es: 'Selecciona una unidad enemiga visible a 12" o menos; cuando esa unidad declare una carga, tiene -1 a las tiradas de carga.',
      },
      groups: ['opponent-turn-reaction'],
    }),
  ],
  enhancements: [
    {
      name: 'Sally Forth',
      points: 30,
      upgrade: false,
      eligibility: {
        en: 'ADEPTUS CUSTODES SHIELD-CAPTAIN model.',
        es: 'Modelo ADEPTUS CUSTODES SHIELD-CAPTAIN.',
      },
      effect: {
        en: 'At the start of your Charge phase, select one friendly ADEPTUS CUSTODES INFANTRY unit within 6"; if it advanced this turn, it can still declare a charge.',
        es: 'Al inicio de tu fase de Carga, selecciona una unidad ADEPTUS CUSTODES INFANTRY propia a 6" o menos; si avanzó este turno, aun así puede declarar una carga.',
      },
    },
    {
      name: 'Auric Eagle',
      points: 15,
      upgrade: true,
      eligibility: {
        en: 'ADEPTUS CUSTODES INFANTRY or MOUNTED unit (excluding TERMINATOR).',
        es: 'Unidad ADEPTUS CUSTODES INFANTRY o MOUNTED (excepto TERMINATOR).',
      },
      effect: {
        en: '+1 to advance and charge rolls.',
        es: '+1 a las tiradas de avance y de carga.',
      },
    },
  ],
};
