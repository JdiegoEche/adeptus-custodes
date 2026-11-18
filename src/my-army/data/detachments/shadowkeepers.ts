import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const SHADOWKEEPERS: Detachment = {
  id: 'shadowkeepers',
  name: 'Shadowkeepers',
  dp: 1,
  shieldHost: true,
  favouredKatah: {
    katahId: 'kaptaris',
    extraEffect: {
      en: 'Select one enemy unit engaged with your unit; it makes a battle-shock roll with -1. Not the same enemy unit more than once per phase.',
      es: 'Selecciona una unidad enemiga trabada con tu unidad; hace una tirada de battle-shock con -1. No sobre la misma unidad enemiga más de una vez por fase.',
    },
  },
  styleTags: ['melee-defence', 'opponent-turn-reaction'],
  rule: {
    name: 'Wardens of the Dark Cells',
    text: {
      en: 'While a friendly ADEPTUS CUSTODES unit (excluding MONSTER/VEHICLE) is within range of an objective, melee attacks that target it with S greater than its T have -1 to wound.',
      es: 'Mientras una unidad ADEPTUS CUSTODES propia (excepto MONSTER/VEHICLE) esté en alcance de un objetivo, los ataques cuerpo a cuerpo contra ella con S mayor que su T tienen -1 para herir.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Grim Responsibility',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly ADEPTUS CUSTODES INFANTRY unit is selected to fight.',
        es: 'Fase de Combate, cuando una unidad ADEPTUS CUSTODES INFANTRY propia es seleccionada para combatir.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its melee attacks have [LETHAL HITS: CHARACTER/MONSTER].',
        es: 'Sus ataques cuerpo a cuerpo tienen [LETHAL HITS: CHARACTER/MONSTER].',
      },
      groups: ['melee-attack'],
    }),
    defineStratagem({
      name: 'No Escape',
      cp: 2,
      timings: [{ phase: 'movement', turn: 'opponent' }],
      when: {
        en: "Your opponent's Movement phase, when an enemy unit ends a fall-back move.",
        es: 'Fase de Movimiento de tu oponente, cuando una unidad enemiga termina un movimiento de retirada (fall-back).',
      },
      target: {
        en: 'One friendly unengaged ADEPTUS CUSTODES INFANTRY unit within 6" of that enemy unit.',
        es: 'Una unidad ADEPTUS CUSTODES INFANTRY propia no trabada a 6" o menos de esa unidad enemiga.',
      },
      effect: {
        en: 'Declare a charge; it can only target enemy units that fell back this phase and are within maximum distance.',
        es: 'Declara una carga; solo puede elegir como objetivo unidades enemigas que se hayan retirado en esta fase y estén dentro de la distancia máxima.',
      },
      groups: ['opponent-turn-reaction'],
    }),
    defineStratagem({
      name: 'Indomitable Guardians',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'opponent' }],
      when: {
        en: "Your opponent's Fight phase, when an enemy unit has fought.",
        es: 'Fase de Combate de tu oponente, cuando una unidad enemiga ha combatido.',
      },
      target: {
        en: 'One friendly ADEPTUS CUSTODES unit within range of an objective and eligible to fight.',
        es: 'Una unidad ADEPTUS CUSTODES propia en alcance de un objetivo y que pueda combatir.',
      },
      effect: {
        en: 'It has Fights First and must be the next unit you select to fight.',
        es: 'Tiene Fights First y debe ser la siguiente unidad que selecciones para combatir.',
      },
      groups: ['melee-defence', 'opponent-turn-reaction'],
    }),
  ],
  enhancements: [
    {
      name: 'Unstoppable Destroyer',
      points: 25,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES INFANTRY model.', es: 'Modelo ADEPTUS CUSTODES INFANTRY.' },
      effect: {
        en: 'Pile-in and consolidation moves of up to 4", and any consolidation mode can be selected regardless of Before Moving restrictions.',
        es: 'Movimientos de agrupamiento (pile-in) y de consolidación de hasta 4", y puede elegir cualquier modo de consolidación sin importar las restricciones de Before Moving.',
      },
    },
    {
      name: 'Genalchemic Warding',
      points: 30,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: { en: 'Feel No Pain 5+.', es: 'Feel No Pain 5+.' },
    },
  ],
};
