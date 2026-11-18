import { defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';
import { IN_AURAMITE_CLAD, SUPERHUMAN_FOCUS } from './shared-stratagems';

export const EMPERORS_CHOSEN: Detachment = {
  id: 'emperors-chosen',
  name: "Emperor's Chosen",
  dp: 1,
  shieldHost: true,
  favouredKatah: {
    katahId: 'rendax',
    extraEffect: {
      en: 'Select one enemy MONSTER/VEHICLE unit engaged with your unit and roll one D6: on a 1-2, 1 mortal wound; on a 3-5, D3 mortal wounds; on a 6, 3 mortal wounds.',
      es: 'Selecciona una unidad enemiga MONSTER/VEHICLE trabada con tu unidad y tira un D6: con 1-2, 1 herida mortal; con 3-5, D3 heridas mortales; con 6, 3 heridas mortales.',
    },
  },
  styleTags: ['ranged-attack', 'melee-attack', 'objectives-utility'],
  rule: {
    name: 'Magna Imperator',
    text: {
      en: 'When a friendly ADEPTUS CUSTODES unit is selected to attack, its attacks can re-roll one hit roll and one wound roll.',
      es: 'Cuando una unidad ADEPTUS CUSTODES propia es seleccionada para atacar, sus ataques pueden repetir una tirada para impactar y una tirada para herir.',
    },
  },
  stratagems: [
    IN_AURAMITE_CLAD,
    SUPERHUMAN_FOCUS,
    defineStratagem({
      name: 'Impenetrable Bastion',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: { en: 'End of your Movement phase.', es: 'Final de tu fase de Movimiento.' },
      target: {
        en: 'One friendly ADEPTUS CUSTODES unit (excluding MONSTER/VEHICLE).',
        es: 'Una unidad ADEPTUS CUSTODES propia (excepto MONSTER/VEHICLE).',
      },
      effect: {
        en: 'Select one objective your unit is controlling: that objective is secured.',
        es: 'Selecciona un objetivo que tu unidad esté controlando: ese objetivo queda asegurado (secured).',
      },
      groups: ['objectives-utility'],
    }),
  ],
  enhancements: [
    {
      name: 'From the Hall of Armouries',
      points: 15,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'Melee attacks have [DEVASTATING WOUNDS].',
        es: 'Los ataques cuerpo a cuerpo tienen [DEVASTATING WOUNDS].',
      },
    },
    {
      name: 'Radiant Mantle',
      points: 40,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES INFANTRY model.', es: 'Modelo ADEPTUS CUSTODES INFANTRY.' },
      effect: {
        en: 'Attacks that target this unit have -1 to hit.',
        es: 'Los ataques contra esta unidad tienen -1 para impactar.',
      },
    },
  ],
};
