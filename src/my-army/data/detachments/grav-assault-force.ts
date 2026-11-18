import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const GRAV_ASSAULT_FORCE: Detachment = {
  id: 'grav-assault-force',
  name: 'Grav-Assault Force',
  dp: 1,
  shieldHost: false,
  styleTags: ['ranged-attack', 'ranged-defence'],
  rule: {
    name: 'Flare Shields',
    text: {
      en: 'Friendly GRAV-ASSAULT units have a 4+ invulnerable save against ranged attacks.',
      es: 'Las unidades GRAV-ASSAULT propias tienen una salvación invulnerable de 4+ contra ataques a distancia.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Victory Before Death',
      cp: 1,
      timings: [{ phase: 'any', turn: 'both' }],
      when: {
        en: 'Any phase, when a friendly GRAV-ASSAULT unit within range of an objective is destroyed.',
        es: 'Cualquier fase, cuando una unidad GRAV-ASSAULT propia en alcance de un objetivo es destruida.',
      },
      target: {
        en: 'That unit, even though it was destroyed.',
        es: 'Esa unidad, aunque haya sido destruida.',
      },
      effect: {
        en: 'Select one objective it was controlling with no enemy units (excluding AIRCRAFT) within range: that objective is secured.',
        es: 'Selecciona un objetivo que estaba controlando y que no tenga unidades enemigas (excepto AIRCRAFT) en alcance: ese objetivo queda asegurado (secured).',
      },
      groups: ['objectives-utility'],
    }),
    defineStratagem({
      name: 'Advanced Stabilisers',
      cp: 1,
      timings: [{ phase: 'shooting', turn: 'mine' }],
      when: {
        en: 'Your Shooting phase, when a friendly GRAV-ASSAULT unit is selected to shoot.',
        es: 'Tu fase de Disparo, cuando una unidad GRAV-ASSAULT propia es seleccionada para disparar.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its ranged attacks have [ASSAULT].',
        es: 'Sus ataques a distancia tienen [ASSAULT].',
      },
      groups: ['ranged-attack'],
    }),
    defineStratagem({
      name: 'Inevitable Annihilation',
      cp: 1,
      timings: [{ phase: 'shooting', turn: 'mine' }],
      when: {
        en: 'Your Shooting phase, when a friendly GRAV-ASSAULT unit is selected to shoot.',
        es: 'Tu fase de Disparo, cuando una unidad GRAV-ASSAULT propia es seleccionada para disparar.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'It can ignore modifiers to its BS and hit rolls.',
        es: 'Puede ignorar los modificadores a su BS y a sus tiradas para impactar.',
      },
      groups: ['ranged-attack'],
    }),
  ],
  enhancements: [
    {
      name: 'Anti-gravitic Mobility',
      points: 15,
      upgrade: true,
      eligibility: { en: 'GRAV-ASSAULT unit.', es: 'Unidad GRAV-ASSAULT.' },
      effect: {
        en: 'Falling back does not prevent it from shooting.',
        es: 'Retirarse no le impide disparar.',
      },
    },
    {
      name: 'Combat Deployment',
      points: 20,
      upgrade: true,
      eligibility: { en: 'GRAV-ASSAULT TRANSPORT model.', es: 'Modelo GRAV-ASSAULT TRANSPORT.' },
      effect: {
        en: 'When a friendly ADEPTUS CUSTODES unit disembarks from it, until the end of the turn that unit can re-roll charge rolls and enemy units cannot target it with snap shooting.',
        es: 'Cuando una unidad ADEPTUS CUSTODES propia desembarca de él, hasta el final del turno esa unidad puede repetir las tiradas de carga y las unidades enemigas no pueden elegirla como objetivo con snap shooting.',
      },
    },
  ],
};
