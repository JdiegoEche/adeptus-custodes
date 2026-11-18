import { THAT_UNIT, defineStratagem } from '../../../shared/data-helpers';
import type { Detachment } from '../../../shared/types';

export const EMISSARIES_IMPERATUS: Detachment = {
  id: 'emissaries-imperatus',
  name: 'Emissaries Imperatus',
  dp: 1,
  shieldHost: true,
  favouredKatah: {
    katahId: 'conservai',
    extraEffect: {
      en: 'Until the end of the turn, being selected to advance or fall back does not prevent your unit from starting an action.',
      es: 'Hasta el final del turno, haber sido seleccionada para avanzar o retirarse no impide a tu unidad iniciar una acción.',
    },
  },
  styleTags: ['melee-attack', 'opponent-turn-reaction'],
  rule: {
    name: 'Heralds of the Throne',
    text: {
      en: 'Friendly ADEPTUS CUSTODES units have Fights First.',
      es: 'Las unidades ADEPTUS CUSTODES propias tienen Fights First.',
    },
  },
  stratagems: [
    defineStratagem({
      name: 'Bearers of His Light',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly ADEPTUS CUSTODES unit is selected to fight.',
        es: 'Fase de Combate, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para combatir.',
      },
      target: THAT_UNIT,
      effect: {
        en: 'Its melee attacks can ignore modifiers to hit and wound rolls.',
        es: 'Sus ataques cuerpo a cuerpo pueden ignorar los modificadores a las tiradas para impactar y para herir.',
      },
      groups: ['melee-attack'],
    }),
    defineStratagem({
      name: 'Slayers of Nightmares',
      cp: 1,
      timings: [{ phase: 'fight', turn: 'both' }],
      when: {
        en: 'Fight phase, when a friendly ADEPTUS CUSTODES unit is selected to fight.',
        es: 'Fase de Combate, cuando una unidad ADEPTUS CUSTODES propia es seleccionada para combatir.',
      },
      target: THAT_UNIT,
      effect: {
        en: "Its melee attacks that target a unit with T greater than this unit's T have +1 to wound.",
        es: 'Sus ataques cuerpo a cuerpo contra una unidad con T mayor que la T de esta unidad tienen +1 para herir.',
      },
      groups: ['melee-attack'],
    }),
    defineStratagem({
      name: 'Selfless Service',
      cp: 1,
      timings: [{ phase: 'charge', turn: 'opponent' }],
      when: {
        en: "End of your opponent's Charge phase.",
        es: 'Final de la fase de Carga de tu oponente.',
      },
      target: {
        en: 'One friendly unengaged ADEPTUS CUSTODES unit within 6" of an enemy unit (a VEHICLE only if it is a CHARACTER or WALKER).',
        es: 'Una unidad ADEPTUS CUSTODES propia no trabada a 6" o menos de una unidad enemiga (un VEHICLE solo si es CHARACTER o WALKER).',
      },
      effect: {
        en: 'Declare a charge: charge results above 6 count as 6; targets can be any enemy units within 6" of your unit and within maximum distance.',
        es: 'Declara una carga: los resultados de carga superiores a 6 cuentan como 6; los objetivos pueden ser cualquier unidad enemiga a 6" o menos de tu unidad y dentro de la distancia máxima.',
      },
      groups: ['opponent-turn-reaction'],
    }),
  ],
  enhancements: [
    {
      name: 'Edge of the Blade',
      points: 15,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'If its unit made a charge move this turn, its attacks can re-roll hit rolls of 1 and wound rolls of 1.',
        es: 'Si su unidad hizo un movimiento de carga este turno, sus ataques pueden repetir las tiradas para impactar de 1 y las tiradas para herir de 1.',
      },
    },
    {
      name: 'Auriferous Orb',
      points: 20,
      upgrade: false,
      eligibility: { en: 'ADEPTUS CUSTODES model.', es: 'Modelo ADEPTUS CUSTODES.' },
      effect: {
        en: 'Ranged weapon: 12", A 3, BS 2+, S 1, AP 0, D 1, [ANTI-non-MONSTER/VEHICLE 2+], [BLINDING LIGHT], [DEVASTATING WOUNDS]. Blinding Light: in your Shooting phase, after this unit has shot, select one enemy unit hit by the orb; its attacks have -1 to hit until the start of your next turn.',
        es: 'Arma a distancia: 12", A 3, BS 2+, S 1, AP 0, D 1, [ANTI-non-MONSTER/VEHICLE 2+], [BLINDING LIGHT], [DEVASTATING WOUNDS]. Blinding Light: en tu fase de Disparo, después de que esta unidad haya disparado, selecciona una unidad enemiga impactada por el orbe; sus ataques tienen -1 para impactar hasta el inicio de tu siguiente turno.',
      },
    },
  ],
};
