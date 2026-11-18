import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';
import { IN_AURAMITE_CLAD, SUPERHUMAN_FOCUS, SWIFT_AS_THE_EAGLE } from './shared-stratagems';

export const GUARDIANS_OF_THE_THRONE: Detachment = {
  id: 'guardians-of-the-throne',
  name: 'Guardians of the Throne',
  dp: 3,
  shieldHost: false,
  styleTags: ['melee-attack', 'melee-defence', 'objectives-utility'],
  rule: {
    name: 'Martial Mastery',
    text: {
      en: 'Fight phase: when a friendly ADEPTUS CUSTODES unit is selected to fight, its melee attacks have your choice of [SUSTAINED HITS 1] or [LETHAL HITS].',
      es: 'Fase de Combate: cuando una unidad ADEPTUS CUSTODES propia es seleccionada para combatir, sus ataques cuerpo a cuerpo tienen, a tu elección, [SUSTAINED HITS 1] o [LETHAL HITS].',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Shield of Honour',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: { en: 'Start of the Fight phase.', es: 'Inicio de la fase de Combate.' },
      target: {
        en: 'One friendly ADEPTUS CUSTODES INFANTRY or MOUNTED unit.',
        es: 'Una unidad ADEPTUS CUSTODES INFANTRY o MOUNTED propia.',
      },
      effect: {
        en: 'When an enemy model engaged with your unit selects targets, if it does not target your unit with all of its attacks, those attacks have -1 to hit and -1 to wound.',
        es: 'Cuando un modelo enemigo trabado con tu unidad elige objetivos, si no dirige todos sus ataques contra tu unidad, esos ataques tienen -1 para impactar y -1 para herir.',
      },
      groups: ['melee-defence'],
    }),
    SUPERHUMAN_FOCUS,
    IN_AURAMITE_CLAD,
    defineStratagem({
      name: 'Prime Target',
      cp: 1,
      timings: [{ phase: 'shooting', turn: 'mine' }],
      when: {
        en: 'Your Shooting phase, when a friendly ADEPTUS CUSTODES unit is selected to shoot.',
        es: 'Tu fase de Disparo, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para disparar.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its ranged attacks can re-roll one hit roll, one wound roll and one damage roll.',
        es: 'Sus ataques a distancia pueden repetir una tirada para impactar, una tirada para herir y una tirada de daño.',
      },
      groups: ['ranged-attack'],
    }),
    defineStratagem({
      name: 'Unlimited Endurance',
      cp: 1,
      timings: [{ phase: 'movement', turn: 'mine' }],
      when: {
        en: 'Your Movement phase, when a friendly ADEPTUS CUSTODES unit ends an advance move.',
        es: 'Tu fase de Movimiento, cuando una unidad ADEPTUS CUSTODES propia termina un movimiento de avance.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Until the end of the turn its ranged attacks have [ASSAULT], and that advance does not prevent it from declaring a charge.',
        es: 'Hasta el final del turno sus ataques a distancia tienen [ASSAULT], y ese avance no le impide declarar una carga.',
      },
      groups: ['movement-charge'],
    }),
    SWIFT_AS_THE_EAGLE,
  ],
  enhancements: [
    {
      name: 'Bane of Abominations',
      points: 20,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'Attacks against enemy CHARACTER, MONSTER or VEHICLE units have +1 to wound.',
        es: 'Los ataques contra unidades enemigas CHARACTER, MONSTER o VEHICLE tienen +1 para herir.',
      },
    },
    {
      name: "Emperor's Light",
      points: 15,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: "Extra melee weapon Emperor's Light [EXTRA ATTACKS]: A 3, WS 2+, S 5, AP -2, D 2.",
        es: "Arma cuerpo a cuerpo adicional Emperor's Light [EXTRA ATTACKS]: A 3, WS 2+, S 5, AP -2, D 2.",
      },
    },
    {
      name: "Castellan's Mark",
      points: 25,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'When both players have deployed, redeploy up to three friendly ADEPTUS CUSTODES units; they may go into strategic reserves regardless of how many units are already there.',
        es: 'Cuando ambos jugadores hayan desplegado, redespliega hasta tres unidades ADEPTUS CUSTODES propias; pueden pasar a reservas estratégicas sin importar cuántas unidades haya ya en ellas.',
      },
    },
    {
      name: "Eagle's Eye",
      points: 30,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: '+1 W. Once per battle, when attacks are allocated to it, it has a 3+ invulnerable save against them.',
        es: '+1 W. Una vez por batalla, cuando se le asignan ataques, tiene una salvación invulnerable de 3+ contra ellos.',
      },
    },
  ],
};
