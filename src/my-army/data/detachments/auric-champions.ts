import { defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

/** Only 2 stratagems: confirmed on two separate reads of the source. */
export const AURIC_CHAMPIONS: Detachment = {
  id: 'auric-champions',
  name: 'Auric Champions',
  dp: 1,
  shieldHost: false,
  styleTags: ['melee-attack', 'objectives-utility'],
  rule: {
    name: 'Assemblage of Might',
    text: {
      en: 'In your Command phase, select one enemy unit as your dreadful foe until the start of your next Command phase. Attacks made by friendly ADEPTUS CUSTODES CHARACTER models against it have +1 to wound.',
      es: 'En tu fase de Mando, selecciona una unidad enemiga como dreadful foe hasta el inicio de tu siguiente fase de Mando. Los ataques de los modelos ADEPTUS CUSTODES CHARACTER propios contra ella tienen +1 para herir.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Gilded Champion',
      cp: 1,
      timings: [{ phase: 'any', turn: 'both' }],
      when: {
        en: 'Any phase, when a friendly ADEPTUS CUSTODES CHARACTER model has used a once-per-battle datasheet ability.',
        es: 'Cualquier fase, cuando un modelo ADEPTUS CUSTODES CHARACTER propio ha usado una habilidad de datasheet de una vez por batalla.',
      },
      target: { en: 'That model.', es: 'Ese modelo.' },
      effect: {
        en: 'It can use that ability one more time, but not in the same phase.',
        es: 'Puede usar esa habilidad una vez más, pero no en la misma fase.',
      },
      restrictions: {
        en: 'Not on the same model more than once per battle.',
        es: 'No sobre el mismo modelo más de una vez por batalla.',
      },
      oncePerBattle: true,
      groups: ['objectives-utility'],
    }),
    defineStratagem({
      name: 'Duty Unto Death',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES unit.',
        es: 'Fase de Combate, cuando una unidad enemiga elige como objetivo a una unidad ADEPTUS CUSTODES propia.',
      },
      target: { en: 'That unit.', es: 'Esa unidad.' },
      effect: {
        en: 'When a model in it is destroyed and the unit has not been selected to fight this phase, roll one D6 (+1 if it is a CHARACTER): on a 3+ it is not removed yet; it is removed when the unit has fought or at the end of the phase.',
        es: 'Cuando un modelo de esa unidad es destruido y la unidad no ha sido seleccionada para combatir en esta fase, tira un D6 (+1 si es CHARACTER): con 3+ todavía no se retira; se retira cuando la unidad haya combatido o al final de la fase.',
      },
      groups: ['melee-defence'],
    }),
  ],
  enhancements: [
    {
      name: 'Shroud of the Hidden Blade',
      points: 20,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: { en: 'Stealth and Lone Operative.', es: 'Stealth y Lone Operative.' },
    },
    {
      name: 'Superior Creation',
      points: 30,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES INFANTRY model.', es: 'Modelo ADEPTUS CUSTODES INFANTRY.' },
      effect: {
        en: 'Once per battle, at the end of a phase in which it was destroyed, roll one D6: on a 2+ set it back up as close as possible to where it was destroyed, unengaged, with 3 wounds remaining.',
        es: 'Una vez por batalla, al final de una fase en la que fue destruido, tira un D6: con 2+ vuelve a desplegarlo lo más cerca posible de donde fue destruido, no trabado, con 3 heridas restantes.',
      },
    },
    {
      name: 'Inspirational Exemplar',
      points: 10,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES INFANTRY model.', es: 'Modelo ADEPTUS CUSTODES INFANTRY.' },
      effect: {
        en: 'Once per battle round, at the start of any phase, select one friendly battle-shocked ADEPTUS CUSTODES unit within 9": it is no longer battle-shocked.',
        es: 'Una vez por ronda de batalla, al inicio de cualquier fase, selecciona una unidad ADEPTUS CUSTODES propia battle-shocked a 9" o menos: deja de estar battle-shocked.',
      },
    },
  ],
};
