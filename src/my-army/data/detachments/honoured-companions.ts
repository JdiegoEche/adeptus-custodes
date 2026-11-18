import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';
import { SWIFT_AS_THE_EAGLE } from './shared-stratagems';

export const HONOURED_COMPANIONS: Detachment = {
  id: 'honoured-companions',
  name: 'Honoured Companions',
  dp: 1,
  shieldHost: false,
  styleTags: ['objectives-utility', 'opponent-turn-reaction'],
  rule: {
    name: "Companion's Watch",
    text: {
      en: 'While a friendly TRUSTED SENTINEL unit is within range of an objective, its attacks can re-roll wound rolls of 1.',
      es: 'Mientras una unidad TRUSTED SENTINEL propia esté en alcance de un objetivo, sus ataques pueden repetir las tiradas para herir de 1.',
    },
  },
  stratagems: [
    defineStratagem({
      name: "Emperor's Domain",
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly TRUSTED SENTINEL unit is selected to consolidate.',
        es: 'Fase de Combate, cuando una unidad TRUSTED SENTINEL propia es seleccionada para consolidar.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'It can select the Objective consolidation mode regardless of Before Moving restrictions.',
        es: 'Puede elegir el modo de consolidación Objective sin importar las restricciones de Before Moving.',
      },
      groups: ['objectives-utility'],
    }),
    defineStratagem({
      name: 'Avenge the Fallen',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly TRUSTED SENTINEL unit that is below its starting strength is selected to fight.',
        es: 'Fase de Combate, cuando una unidad TRUSTED SENTINEL propia por debajo de sus efectivos iniciales es seleccionada para combatir.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its melee attacks (excluding CHARACTER models) have +2 A.',
        es: 'Sus ataques cuerpo a cuerpo (excepto los de modelos CHARACTER) tienen +2 A.',
      },
      groups: ['melee-attack'],
    }),
    SWIFT_AS_THE_EAGLE,
  ],
  enhancements: [
    {
      name: 'Arae-Shrike',
      points: 20,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES INFANTRY model.', es: 'Modelo ADEPTUS CUSTODES INFANTRY.' },
      effect: {
        en: 'Enemy units making an ingress move cannot be set up within 12" of this unit.',
        es: 'Las unidades enemigas que hacen un movimiento de ingreso (ingress) no pueden desplegarse a 12" o menos de esta unidad.',
      },
    },
    {
      name: 'Celeritous Sentries',
      points: 15,
      upgrade: true,
      eligibility: { en: 'TRUSTED SENTINEL unit.', es: 'Unidad TRUSTED SENTINEL.' },
      effect: {
        en: 'Once per phase per unit, it can be targeted with Heroic Intervention regardless of other uses of that stratagem this phase; that use costs 1CP less and does not prevent other uses on other units this phase.',
        es: 'Una vez por fase por unidad, puede ser objetivo de Heroic Intervention sin importar otros usos de esa stratagem en esta fase; ese uso cuesta 1CP menos y no impide otros usos sobre otras unidades en esta fase.',
      },
      verify: {
        en: 'Source reads "That use is -1 CP" (1CP less). An earlier read said "more": confirm it in your codex.',
        es: 'La fuente dice "That use is -1 CP" (1CP menos). Una lectura anterior decía "más": confírmalo en tu codex.',
      },
    },
  ],
};
