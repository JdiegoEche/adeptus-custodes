import { THAT_UNIT, defineStratagem } from '../../shared/data-helpers';
import type { Stratagem } from '../../shared/types';

/** Core Stratagems, core rules 15.02 to 15.12 (15.09 Snap Shooting is a shooting type, not a stratagem). */
export const CORE_STRATAGEMS: Stratagem[] = [
  defineStratagem({
    name: 'Command Re-roll',
    cp: 1,
    timings: [{ phase: 'any', turn: 'both' }],
    when: {
      en: 'Any phase, just after you make an advance, charge, damage, hazard, hit, save or wound roll, or a roll for the number of attacks, for a friendly unit or model.',
      es: 'Cualquier fase, justo después de hacer una tirada de avance, carga, daño, peligro (hazard), impacto, salvación o herida, o una tirada para el número de ataques, para una unidad o modelo propio.',
    },
    target: { en: 'That unit or model.', es: 'Esa unidad o modelo.' },
    effect: {
      en: 'Re-roll that roll. If several dice were rolled, re-roll one of them (charge rolls are re-rolled in full).',
      es: 'Repite esa tirada. Si se tiraron varios dados, repite uno de ellos (las tiradas de carga se repiten completas).',
    },
    groups: ['objectives-utility'],
  }),
  defineStratagem({
    name: 'Epic Challenge',
    cp: 1,
    timings: [{ phase: 'fight', turn: 'both' }],
    when: {
      en: 'Fight phase, just after a friendly CHARACTER unit is selected to fight.',
      es: 'Fase de Combate, justo después de que una unidad CHARACTER propia sea seleccionada para combatir.',
    },
    target: { en: 'That CHARACTER unit.', es: 'Esa unidad CHARACTER.' },
    effect: {
      en: 'Select one CHARACTER model in that unit; its melee weapons have [PRECISION] until the end of the phase.',
      es: 'Selecciona un modelo CHARACTER de esa unidad; sus armas cuerpo a cuerpo tienen [PRECISION] hasta el final de la fase.',
    },
    groups: ['melee-attack'],
  }),
  defineStratagem({
    name: 'Insane Bravery',
    cp: 1,
    timings: [{ phase: 'command', turn: 'mine' }],
    when: {
      en: 'Battle-shock step of your Command phase, just before you make a battle-shock roll for a friendly unit.',
      es: 'Paso de battle-shock de tu fase de Mando, justo antes de hacer una tirada de battle-shock para una unidad propia.',
    },
    target: THAT_UNIT,
    effect: {
      en: 'That battle-shock roll is automatically passed.',
      es: 'Esa tirada de battle-shock se supera automáticamente.',
    },
    restrictions: { en: 'Once per battle.', es: 'Una vez por batalla.' },
    oncePerBattle: true,
    groups: ['objectives-utility'],
  }),
  defineStratagem({
    name: 'Explosives',
    cp: 1,
    timings: [{ phase: 'shooting', turn: 'mine' }],
    when: { en: 'Your Shooting phase.', es: 'Tu fase de Disparo.' },
    target: {
      en: 'One friendly unengaged EXPLOSIVES/GRENADES unit that is eligible to shoot and did not advance this turn.',
      es: 'Una unidad EXPLOSIVES/GRENADES propia, no trabada, que pueda disparar y que no haya avanzado este turno.',
    },
    effect: {
      en: 'Select one such model and one unengaged enemy unit within 8" and visible to it. Roll six D6: each 4+ inflicts 1 mortal wound.',
      es: 'Selecciona un modelo de esa unidad y una unidad enemiga no trabada a 8" o menos y visible para él. Tira seis D6: cada 4+ inflige 1 herida mortal.',
    },
    groups: ['ranged-attack'],
  }),
  defineStratagem({
    name: 'Crushing Impact',
    cp: 1,
    timings: [{ phase: 'charge', turn: 'mine' }],
    when: {
      en: 'Your Charge phase, just after a friendly MONSTER/VEHICLE unit ends a charge move.',
      es: 'Tu fase de Carga, justo después de que una unidad MONSTER/VEHICLE propia termine un movimiento de carga.',
    },
    target: THAT_UNIT,
    effect: {
      en: "Select an engaged enemy unit and one of your models engaged with it. Roll a number of D6 equal to that model's T: each 1 inflicts 1 mortal wound on your unit; each 5+ inflicts 1 mortal wound on the enemy unit (max 6 per unit).",
      es: 'Selecciona una unidad enemiga trabada y uno de tus modelos trabado con ella. Tira tantos D6 como la T de ese modelo: cada 1 inflige 1 herida mortal a tu unidad; cada 5+ inflige 1 herida mortal a la unidad enemiga (máximo 6 por unidad).',
    },
    groups: ['melee-attack', 'movement-charge'],
  }),
  defineStratagem({
    name: 'Rapid Ingress',
    cp: 1,
    timings: [{ phase: 'movement', turn: 'opponent' }],
    when: {
      en: "End of your opponent's Movement phase.",
      es: 'Final de la fase de Movimiento de tu oponente.',
    },
    target: {
      en: 'One friendly unit in strategic reserves (not AIRCRAFT).',
      es: 'Una unidad propia en reservas estratégicas (no AIRCRAFT).',
    },
    effect: { en: 'It makes an ingress move.', es: 'Realiza un movimiento de ingreso (ingress).' },
    restrictions: { en: 'Not in the first battle round.', es: 'No en la primera ronda de batalla.' },
    groups: ['movement-charge'],
  }),
  defineStratagem({
    name: 'Fire Overwatch',
    cp: 1,
    timings: [{ phase: 'movement', turn: 'opponent' }],
    when: {
      en: "End of your opponent's Movement phase.",
      es: 'Final de la fase de Movimiento de tu oponente.',
    },
    target: {
      en: 'One friendly unengaged unit (not TITANIC).',
      es: 'Una unidad propia no trabada (no TITANIC).',
    },
    effect: { en: 'It shoots using snap shooting.', es: 'Dispara usando snap shooting.' },
    groups: ['opponent-turn-reaction'],
  }),
  defineStratagem({
    name: 'Smokescreen',
    cp: 1,
    timings: [{ phase: 'shooting', turn: 'opponent' }],
    when: {
      en: "Start of your opponent's Shooting phase.",
      es: 'Inicio de la fase de Disparo de tu oponente.',
    },
    target: { en: 'One friendly SMOKE unit.', es: 'Una unidad SMOKE propia.' },
    effect: {
      en: 'Until the end of the phase, attacks against it, or against units that are not fully visible because of its models, get the benefit of cover.',
      es: 'Hasta el final de la fase, los ataques contra ella, o contra unidades que no son completamente visibles a causa de sus modelos, aplican el beneficio de cobertura.',
    },
    groups: ['ranged-defence'],
  }),
  defineStratagem({
    name: 'Heroic Intervention',
    cp: 1,
    cpNote: { en: '+1CP for Into the Fray', es: '+1CP con Into the Fray' },
    timings: [{ phase: 'charge', turn: 'opponent' }],
    when: {
      en: "End of your opponent's Charge phase.",
      es: 'Final de la fase de Carga de tu oponente.',
    },
    target: {
      en: 'One friendly unengaged unit within 12" of one or more enemy units (a VEHICLE only if it is a CHARACTER or WALKER).',
      es: 'Una unidad propia no trabada a 12" o menos de una o más unidades enemigas (un VEHICLE solo si es CHARACTER o WALKER).',
    },
    effect: {
      en: 'Resolve a charge. Choose a mode before the charge roll. Leap to Defend: targets must be enemy units that made a charge move this phase. Into the Fray (+1CP): charge results above 6 count as 6, and targets can be any enemy unit within 6" of your unit and within maximum distance.',
      es: 'Resuelve una carga. Elige un modo antes de la tirada de carga. Leap to Defend: los objetivos deben ser unidades enemigas que hayan hecho un movimiento de carga en esta fase. Into the Fray (+1CP): los resultados de carga superiores a 6 cuentan como 6, y los objetivos pueden ser cualquier unidad enemiga a 6" o menos de tu unidad y dentro de la distancia máxima.',
    },
    groups: ['opponent-turn-reaction'],
  }),
  defineStratagem({
    name: 'Counteroffensive',
    cp: 2,
    timings: [{ phase: 'fight', turn: 'opponent' }],
    when: {
      en: "Fight step of your opponent's Fight phase, just after an enemy unit has resolved its attacks.",
      es: 'Paso de combate de la fase de Combate de tu oponente, justo después de que una unidad enemiga haya resuelto sus ataques.',
    },
    target: { en: 'One friendly unit that is eligible to fight.', es: 'Una unidad propia que pueda combatir.' },
    effect: {
      en: 'Until the end of the phase it has Fights First and must be the next unit selected to fight.',
      es: 'Hasta el final de la fase tiene Fights First y debe ser la siguiente unidad seleccionada para combatir.',
    },
    groups: ['melee-defence', 'opponent-turn-reaction'],
  }),
];
