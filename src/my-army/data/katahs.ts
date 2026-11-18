import type { Katah, KatahId } from '../../shared/types';

/** The six Martial Ka'tah stances. */
export const KATAHS: Katah[] = [
  {
    id: 'conservai',
    name: 'Conservai',
    timing: { phase: 'command', turn: 'mine' },
    when: {
      en: 'Your Command phase: select one readied unit.',
      es: 'Tu fase de Mando: selecciona una unidad readied.',
    },
    effect: {
      en: 'Until the end of the turn, being engaged or battle-shocked does not prevent it from starting an action, and starting an action does not prevent it from shooting.',
      es: 'Hasta el final del turno, estar trabada o battle-shocked no le impide iniciar una acción, e iniciar una acción no le impide disparar.',
    },
    groups: ['objectives-utility'],
  },
  {
    id: 'calistus',
    name: 'Calistus',
    timing: { phase: 'movement', turn: 'mine' },
    when: {
      en: 'Your Movement phase, when the readied unit is selected to move.',
      es: 'Tu fase de Movimiento, cuando la unidad readied es seleccionada para moverse.',
    },
    effect: {
      en: 'On a normal, advance or fall-back move it can move through all types of model.',
      es: 'En un movimiento normal, de avance o de retirada (fall-back) puede moverse a través de todo tipo de modelos.',
    },
    groups: ['movement-charge'],
  },
  {
    id: 'salvus',
    name: 'Salvus',
    timing: { phase: 'shooting', turn: 'mine' },
    when: {
      en: 'Your Shooting phase, when the readied unit is selected to shoot.',
      es: 'Tu fase de Disparo, cuando la unidad readied es seleccionada para disparar.',
    },
    effect: {
      en: 'Ignore modifiers to its BS, hit rolls and wound rolls.',
      es: 'Ignora los modificadores a su BS, a sus tiradas para impactar y a sus tiradas para herir.',
    },
    groups: ['ranged-attack'],
  },
  {
    id: 'dacatarai',
    name: 'Dacatarai',
    timing: { phase: 'fight', turn: 'both' },
    when: { en: 'Start of the Fight phase.', es: 'Inicio de la fase de Combate.' },
    effect: {
      en: 'Its melee attacks that target an enemy unit (excluding MONSTER/VEHICLE) can re-roll hit rolls of 1.',
      es: 'Sus ataques cuerpo a cuerpo contra una unidad enemiga (excepto MONSTER/VEHICLE) pueden repetir las tiradas para impactar de 1.',
    },
    groups: ['melee-attack'],
  },
  {
    id: 'kaptaris',
    name: 'Kaptaris',
    timing: { phase: 'fight', turn: 'both' },
    when: { en: 'Start of the Fight phase.', es: 'Inicio de la fase de Combate.' },
    effect: {
      en: 'Melee attacks that target the unit have -1 to hit rolls.',
      es: 'Los ataques cuerpo a cuerpo contra la unidad tienen -1 a las tiradas para impactar.',
    },
    groups: ['melee-defence'],
  },
  {
    id: 'rendax',
    name: 'Rendax',
    timing: { phase: 'fight', turn: 'both' },
    when: {
      en: 'Fight phase, when the readied unit is selected to fight.',
      es: 'Fase de Combate, cuando la unidad readied es seleccionada para combatir.',
    },
    effect: {
      en: 'Its melee attacks have [LETHAL HITS: MONSTER/VEHICLE].',
      es: 'Sus ataques cuerpo a cuerpo tienen [LETHAL HITS: MONSTER/VEHICLE].',
    },
    groups: ['melee-attack'],
  },
];

export function getKatah(id: KatahId): Katah {
  const katah = KATAHS.find((candidate) => candidate.id === id);
  if (!katah) throw new Error(`Unknown ka'tah: ${id}`);
  return katah;
}
