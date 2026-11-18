import type { LocalizedText } from '../../shared/types';

export interface TitledText {
  title: LocalizedText;
  text?: LocalizedText;
}

export const BATTLE_STRUCTURE: LocalizedText[] = [
  { en: 'A battle lasts 5 battle rounds.', es: 'Una batalla dura 5 rondas de batalla.' },
  {
    en: "Each battle round: Start of Battle Round, the players' turns, End of Battle Round.",
    es: 'Cada ronda de batalla: Inicio de la ronda de batalla, los turnos de los jugadores, Final de la ronda de batalla.',
  },
];

export const TURN_SEQUENCE: LocalizedText[] = [
  { en: 'Start of Turn', es: 'Inicio del turno' },
  { en: 'Command phase', es: 'Fase de Mando' },
  { en: 'Movement phase', es: 'Fase de Movimiento' },
  { en: 'Shooting phase', es: 'Fase de Disparo' },
  { en: 'Charge phase', es: 'Fase de Carga' },
  { en: 'Fight phase', es: 'Fase de Combate' },
  { en: 'End of Turn', es: 'Final del turno' },
];

export const COMMAND_PHASE_STEPS: TitledText[] = [
  { title: { en: 'Start of phase', es: 'Inicio de la fase' } },
  {
    title: { en: 'Gain Core CP', es: 'Obtener Core CP' },
    text: { en: 'Both players gain 1CP.', es: 'Ambos jugadores obtienen 1CP.' },
  },
  {
    title: { en: 'Battle-shock', es: 'Battle-shock' },
    text: {
      en: 'The active player rolls for each of their units that is battle-shocked or at or below half-strength: 2D6 >= Ld passes.',
      es: 'El jugador activo tira por cada unidad suya que esté battle-shocked o a la mitad de sus efectivos o por debajo: con 2D6 >= Ld la supera.',
    },
  },
  {
    title: { en: 'Command Abilities', es: 'Habilidades de mando' },
    text: {
      en: 'Rules triggered in the Command phase resolve now, except those at the start or end of the phase, gaining Core CP, and battle-shock rolls.',
      es: 'Las reglas que se activan en la fase de Mando se resuelven ahora, salvo las de inicio o final de fase, la obtención de Core CP y las tiradas de battle-shock.',
    },
  },
];

export const PHASE_NOTES: TitledText[] = [
  {
    title: { en: 'Movement phase', es: 'Fase de Movimiento' },
    text: {
      en: 'Remain Stationary; Normal move (up to M, must be unengaged); Advance (advance roll + M; then no charge and no starting actions); Fall-back (engaged units only: Ordered Retreat or Desperate Escape with hazard rolls). Disembark and ingress moves also happen here.',
      es: 'Remain Stationary (quedarse quieta); movimiento normal (hasta M, debe estar no trabada); avance (tirada de avance + M; después no puede cargar ni iniciar acciones); retirada o fall-back (solo unidades trabadas: Ordered Retreat o Desperate Escape con tiradas de peligro). También se hacen aquí los desembarcos y los movimientos de ingreso (ingress).',
    },
  },
  {
    title: { en: 'Shooting phase', es: 'Fase de Disparo' },
    text: {
      en: 'Shooting types: Normal; Assault ([ASSAULT] weapons after advancing); Close-quarters (while engaged); Indirect ([INDIRECT FIRE]); Snap (used by Fire Overwatch: one visible enemy unit within 24", hits only on an unmodified 6, no hit re-rolls, cannot start an action for the rest of the phase).',
      es: 'Tipos de disparo: normal; de asalto (armas [ASSAULT] tras avanzar); a corta distancia o close-quarters (estando trabada); indirecto ([INDIRECT FIRE]); snap (lo usa Fire Overwatch: una unidad enemiga visible a 24" o menos, solo impacta con un 6 sin modificar, no se repiten tiradas para impactar y no puede iniciar una acción durante el resto de la fase).',
    },
  },
  {
    title: { en: 'Charge phase', es: 'Fase de Carga' },
    text: {
      en: 'Declare the charge and make a 2D6 charge roll; targets must be within 12"; the unit must end engaged with all of its targets. Charging units gain Fights First.',
      es: 'Declara la carga y haz una tirada de carga de 2D6; los objetivos deben estar a 12" o menos; la unidad debe terminar trabada con todos sus objetivos. Las unidades que cargan obtienen Fights First.',
    },
  },
  {
    title: { en: 'Fight phase', es: 'Fase de Combate' },
    text: {
      en: 'Pile in 3"; fight (Fights First units first, then players alternate); consolidate 3" (Ongoing, Engaging or Objective mode).',
      es: 'Agruparse o pile in 3"; combatir (primero las unidades con Fights First, luego los jugadores alternan); consolidar 3" (modo Ongoing, Engaging u Objective).',
    },
  },
];

export const KEY_RULES: TitledText[] = [
  {
    title: { en: 'Battle-shocked units', es: 'Unidades battle-shocked' },
    text: {
      en: 'OC "-"; cannot be targeted by its player\'s stratagems; cannot start actions; must use Desperate Escape when falling back.',
      es: 'OC "-"; no puede ser objetivo de las stratagems de su jugador; no puede iniciar acciones; debe usar Desperate Escape al retirarse.',
    },
  },
  {
    title: { en: 'Objectives', es: 'Objetivos' },
    text: {
      en: 'Marker range: 3" horizontal / 5" vertical. Control = sum of OC. A "secured" objective stays yours until your opponent\'s level of control is greater at the end of a phase.',
      es: 'Alcance del marcador: 3" en horizontal / 5" en vertical. Control = suma de OC. Un objetivo "secured" (asegurado) sigue siendo tuyo hasta que el nivel de control de tu oponente sea mayor al final de una fase.',
    },
  },
  {
    title: { en: 'Strategic reserves', es: 'Reservas estratégicas' },
    text: {
      en: "Maximum 50% of your points. Ingress move: set up more than 8\" from enemy units, from battle round 2. Before battle round 3, not in your opponent's deployment zone. Units still in reserves at the end of battle round 3 are destroyed.",
      es: 'Máximo el 50% de tus puntos. Movimiento de ingreso (ingress): se despliega a más de 8" de las unidades enemigas, desde la ronda de batalla 2. Antes de la ronda 3, no en la zona de despliegue de tu oponente. Las unidades que sigan en reservas al final de la ronda 3 quedan destruidas.',
    },
  },
];

/** Core rules 15.01. */
export const STRATAGEM_USAGE_RULES: LocalizedText[] = [
  {
    en: 'The same stratagem cannot be used more than once in the same phase (it can be used again in other phases).',
    es: 'La misma stratagem no puede usarse más de una vez en la misma fase (puede repetirse en otras fases).',
  },
  {
    en: 'The same unit cannot be targeted by more than one stratagem in the same phase (unless stated otherwise).',
    es: 'La misma unidad no puede ser objetivo de más de una stratagem en la misma fase (salvo que se indique lo contrario).',
  },
  {
    en: 'Order: select targets, pay the CP, resolve the effect. No CP, no stratagem.',
    es: 'Orden: elige los objetivos, paga los CP y resuelve el efecto. Sin CP no hay stratagem.',
  },
  {
    en: 'The cost can never go below 0CP. A cost modifier without a duration applies only to that use.',
    es: 'El costo nunca puede bajar de 0CP. Un modificador de costo sin duración se aplica solo a ese uso.',
  },
  {
    en: "Battle-shocked units cannot be targeted by their controlling player's stratagems.",
    es: 'Las unidades battle-shocked no pueden ser objetivo de las stratagems de su jugador.',
  },
];
