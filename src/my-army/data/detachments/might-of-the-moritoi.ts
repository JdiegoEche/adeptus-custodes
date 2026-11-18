import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment, LocalizedText } from '../../../shared/types';

const ONE_PER_ARMY: LocalizedText = { en: 'One per army.', es: 'Una por ejército.' };

export const MIGHT_OF_THE_MORITOI: Detachment = {
  id: 'might-of-the-moritoi',
  name: 'Might of the Moritoi',
  dp: 1,
  shieldHost: false,
  styleTags: ['ranged-attack', 'melee-attack', 'movement-charge'],
  rule: {
    name: 'Moritoi Ancients',
    text: {
      en: 'Friendly ADEPTUS CUSTODES DREADNOUGHT units: at starting strength, +2 OC; below starting strength, re-roll hit rolls of 1; below half-strength, re-roll hit rolls of 1 and wound rolls of 1.',
      es: 'Unidades ADEPTUS CUSTODES DREADNOUGHT propias: con sus efectivos iniciales, +2 OC; por debajo de sus efectivos iniciales, repiten las tiradas para impactar de 1; por debajo de la mitad de sus efectivos, repiten las tiradas para impactar de 1 y las tiradas para herir de 1.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Honoured Interred',
      cp: 1,
      timings: [
        { phase: 'shooting', turn: 'mine' },
        { phase: 'fight', turn: 'mine' },
      ],
      when: { en: 'Your Shooting or Fight phase.', es: 'Tu fase de Disparo o de Combate.' },
      target: {
        en: 'One friendly ADEPTUS CUSTODES DREADNOUGHT unit.',
        es: 'Una unidad ADEPTUS CUSTODES DREADNOUGHT propia.',
      },
      effect: {
        en: 'It gains the aura Honoured Interred: friendly ADEPTUS CUSTODES units within 6" can re-roll hit rolls of 1.',
        es: 'Obtiene el aura Honoured Interred: las unidades ADEPTUS CUSTODES propias a 6" o menos pueden repetir las tiradas para impactar de 1.',
      },
      groups: ['ranged-attack', 'melee-attack'],
    }),
    defineStratagem({
      name: 'Unceasing Onslaught',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES DREADNOUGHT unit ends an advance move.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES DREADNOUGHT propia termina un movimiento de avance.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Until the end of the turn its ranged attacks have [ASSAULT], and that advance does not prevent it from declaring a charge.',
        es: 'Hasta el final del turno sus ataques a distancia tienen [ASSAULT], y ese avance no le impide declarar una carga.',
      },
      groups: ['movement-charge'],
    }),
    defineStratagem({
      name: 'Unstoppable Momentum',
      cp: 1,
      timings: [
        { phase: 'movement', turn: 'mine' },
        { phase: 'charge', turn: 'mine' },
      ],
      when: {
        en: 'Your Movement or Charge phase, when a friendly ADEPTUS CUSTODES DREADNOUGHT unit is selected to move or declares a charge.',
        es: 'Tu fase de Movimiento o de Carga, cuando una unidad ADEPTUS CUSTODES DREADNOUGHT propia es seleccionada para moverse o declara una carga.',
      },
      target: THAT_UNIT,
      effect: { en: 'It has MOBILE.', es: 'Tiene MOBILE.' },
      groups: ['movement-charge'],
    }),
  ],
  enhancements: [
    {
      name: 'Memento Moritoi',
      points: 30,
      upgrade: true,
      note: ONE_PER_ARMY,
      eligibility: {
        en: 'ADEPTUS CUSTODES DREADNOUGHT model.',
        es: 'Modelo ADEPTUS CUSTODES DREADNOUGHT.',
      },
      effect: {
        en: 'Melee attacks have +1 A, +1 S and +1 D.',
        es: 'Los ataques cuerpo a cuerpo tienen +1 A, +1 S y +1 D.',
      },
    },
    {
      name: 'Augury Uplink',
      points: 30,
      upgrade: true,
      note: ONE_PER_ARMY,
      eligibility: {
        en: 'ADEPTUS CUSTODES DREADNOUGHT model.',
        es: 'Modelo ADEPTUS CUSTODES DREADNOUGHT.',
      },
      effect: { en: 'Feel No Pain 5+.', es: 'Feel No Pain 5+.' },
    },
  ],
};
