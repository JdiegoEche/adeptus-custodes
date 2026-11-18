import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const NULL_MAIDEN_VIGIL: Detachment = {
  id: 'null-maiden-vigil',
  name: 'Null Maiden Vigil',
  dp: 1,
  shieldHost: false,
  styleTags: ['ranged-attack', 'melee-attack', 'objectives-utility'],
  rule: {
    name: 'Silent Sisterhood',
    text: {
      en: "A friendly ANATHEMA PSYKANA CHARACTER model can be your WARLORD; friendly PROSECUTOR SQUAD units have BATTLELINE; friendly ANATHEMA PSYKANA units have the aura Creeping Dread: in the Battle-shock step of your opponent's Command phase, each enemy unit within 12\" that is a PSYKER unit or is below its starting strength makes a battle-shock roll with -1.",
      es: 'Un modelo ANATHEMA PSYKANA CHARACTER propio puede ser tu WARLORD; las unidades PROSECUTOR SQUAD propias tienen BATTLELINE; las unidades ANATHEMA PSYKANA propias tienen el aura Creeping Dread: en el paso de battle-shock de la fase de Mando de tu oponente, cada unidad enemiga a 12" o menos que sea PSYKER o esté por debajo de sus efectivos iniciales hace una tirada de battle-shock con -1.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Anathema Blademastery',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly VIGILATOR SQUAD unit is selected to fight.',
        es: 'Fase de Combate, cuando una unidad VIGILATOR SQUAD propia es seleccionada para combatir.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its attacks have your choice of [SUSTAINED HITS 1] or [LETHAL HITS].',
        es: 'Sus ataques tienen, a tu elección, [SUSTAINED HITS 1] o [LETHAL HITS].',
      },
      groups: ['melee-attack'],
    }),
    defineStratagem({
      name: 'Psy-Chaff Volley',
      cp: 1,
      timings: [{ phase: 'shooting', turn: 'mine' }],
      when: {
        en: 'Your Shooting phase, when a friendly PROSECUTOR SQUAD unit has shot.',
        es: 'Tu fase de Disparo, cuando una unidad PROSECUTOR SQUAD propia ha disparado.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Select one enemy unit hit by those attacks: it is prosecuted until the end of the turn. Attacks that target a prosecuted unit have +1 AP.',
        es: 'Selecciona una unidad enemiga impactada por esos ataques: queda prosecuted hasta el final del turno. Los ataques contra una unidad prosecuted tienen +1 AP.',
      },
      groups: ['ranged-attack'],
    }),
    defineStratagem({
      name: 'Purgation Sweep',
      cp: 1,
      timings: [{ phase: 'shooting', turn: 'mine' }],
      when: {
        en: 'Your Shooting phase, when a friendly WITCHSEEKER SQUAD unit is selected to shoot.',
        es: 'Tu fase de Disparo, cuando una unidad WITCHSEEKER SQUAD propia es seleccionada para disparar.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its [TORRENT] attacks have +1 A, or +2 A against a PSYKER or battle-shocked unit.',
        es: 'Sus ataques [TORRENT] tienen +1 A, o +2 A contra una unidad PSYKER o battle-shocked.',
      },
      groups: ['ranged-attack'],
    }),
  ],
  enhancements: [
    {
      name: 'Oblivion Knight',
      points: 15,
      upgrade: false,
      eligibility: { en: 'ANATHEMA PSYKANA model.', es: 'Modelo ANATHEMA PSYKANA.' },
      effect: {
        en: 'Attacks have +1 to hit, or +1 to hit and +1 to wound against a PSYKER or battle-shocked unit.',
        es: 'Los ataques tienen +1 para impactar, o +1 para impactar y +1 para herir contra una unidad PSYKER o battle-shocked.',
      },
    },
    {
      name: "Huntress' Eye",
      points: 10,
      upgrade: false,
      eligibility: { en: 'ANATHEMA PSYKANA model.', es: 'Modelo ANATHEMA PSYKANA.' },
      effect: {
        en: 'In your Movement phase, select one visible enemy unit within 12"; it makes a battle-shock roll with -1.',
        es: 'En tu fase de Movimiento, selecciona una unidad enemiga visible a 12" o menos; hace una tirada de battle-shock con -1.',
      },
    },
  ],
};
