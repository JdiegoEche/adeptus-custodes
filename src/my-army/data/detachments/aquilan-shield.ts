import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const AQUILAN_SHIELD: Detachment = {
  id: 'aquilan-shield',
  name: 'Aquilan Shield',
  dp: 1,
  shieldHost: true,
  favouredKatah: {
    katahId: 'salvus',
    extraEffect: {
      en: 'Your unit\'s ranged attacks have +6" range.',
      es: 'Los ataques a distancia de tu unidad tienen +6" de alcance.',
    },
  },
  styleTags: ['ranged-defence', 'ranged-attack'],
  rule: {
    name: 'Gilded Guardians',
    text: {
      en: 'While a friendly ADEPTUS CUSTODES unit (excluding MONSTER/VEHICLE) is within range of an objective, ranged attacks that target it with S greater than its T have -1 to wound.',
      es: 'Mientras una unidad ADEPTUS CUSTODES propia (excepto MONSTER/VEHICLE) esté en alcance de un objetivo, los ataques a distancia contra ella con S mayor que su T tienen -1 para herir.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Manoeuvre and Fire',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to fall back.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para retirarse (fall back).',
      },
      target: THAT_UNIT,
      effect: {
        en: 'That fall-back does not prevent it from shooting or declaring a charge.',
        es: 'Esa retirada no le impide disparar ni declarar una carga.',
      },
      groups: ['movement-charge'],
    }),
    defineStratagem({
      name: 'Tip of the Talon',
      cp: 1,
      timings: [{ phase: 'shooting', turn: 'mine' }],
      when: {
        en: 'Your Shooting phase, when a friendly ADEPTUS CUSTODES unit is selected to shoot.',
        es: 'Tu fase de Disparo, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para disparar.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its ranged attacks that target an enemy unit within 9" have +1 S.',
        es: 'Sus ataques a distancia contra una unidad enemiga a 9" o menos tienen +1 S.',
      },
      groups: ['ranged-attack'],
    }),
    defineStratagem({
      name: 'Rapid Reactions',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'opponent' }],
      when: {
        en: "Your opponent's Movement phase, when an enemy unit ends a fall-back move.",
        es: 'Fase de Movimiento de tu oponente, cuando una unidad enemiga termina un movimiento de retirada (fall-back).',
      },
      target: {
        en: 'One friendly ADEPTUS CUSTODES INFANTRY unit that was engaged with that enemy unit at the start of the phase.',
        es: 'Una unidad ADEPTUS CUSTODES INFANTRY propia que estaba trabada con esa unidad enemiga al inicio de la fase.',
      },
      effect: {
        en: 'It shoots using normal shooting, but can only target that enemy unit.',
        es: 'Dispara usando disparo normal, pero solo puede elegir como objetivo a esa unidad enemiga.',
      },
      groups: ['opponent-turn-reaction'],
    }),
  ],
  enhancements: [
    {
      name: 'Not a Shell Wasted',
      points: 10,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES INFANTRY model.', es: 'Modelo ADEPTUS CUSTODES INFANTRY.' },
      effect: {
        en: "The unit's ranged attacks have +1 A.",
        es: 'Los ataques a distancia de su unidad tienen +1 A.',
      },
    },
    {
      name: "Pareldor's Caducatrix",
      points: 30,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'Once per battle, at the start of any phase, it heals D3+3 wounds.',
        es: 'Una vez por batalla, al inicio de cualquier fase, recupera D3+3 heridas.',
      },
    },
  ],
};
