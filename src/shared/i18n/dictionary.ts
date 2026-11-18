import type { GroupId, LocalizedText, Phase, TurnOwner } from '../types';

/** In-house UI dictionary. Rules texts live in the data files, not here. */
export const DICTIONARY = {
  'app.title': { es: 'Custodes 11ª', en: 'Custodes 11ª' },
  'app.subtitle': { es: 'Adeptus Custodes · 11ª edición', en: 'Adeptus Custodes · 11th edition' },

  'nav.label': { es: 'Secciones', en: 'Sections' },
  'nav.army': { es: 'Detachments', en: 'Detachments' },
  'nav.battle': { es: 'Batalla', en: 'Battle' },
  'nav.stratagems': { es: 'Stratagems', en: 'Stratagems' },
  'nav.rules': { es: 'Reglas', en: 'Rules' },

  'lang.label': { es: 'Idioma', en: 'Language' },
  'lang.es': { es: 'Español', en: 'Español' },
  'lang.en': { es: 'English', en: 'English' },

  'common.verify': { es: 'A verificar', en: 'To verify' },
  'common.when': { es: 'Cuándo', en: 'When' },
  'common.target': { es: 'Objetivo', en: 'Target' },
  'common.effect': { es: 'Efecto', en: 'Effect' },
  'common.restrictions': { es: 'Restricciones', en: 'Restrictions' },
  'common.sources': { es: 'Origen', en: 'Source' },
  'common.core': { es: 'Core', en: 'Core' },
  'common.cp': { es: '{cp} CP', en: '{cp} CP' },
  'common.dp': { es: '{dp} DP', en: '{dp} DP' },
  'common.points': { es: '{points} pts', en: '{points} pts' },
  'common.note': { es: 'Nota', en: 'Note' },

  'army.battleSize': { es: 'Tamaño de partida', en: 'Battle size' },
  'army.battleSizeOption': { es: '{name} · {points} puntos · {dp} DP', en: '{name} · {points} points · {dp} DP' },
  'army.detachments': { es: 'Detachments', en: 'Detachments' },
  'army.detachmentsHint': {
    es: 'Marca la casilla para elegir un detachment. Toca la tarjeta para ver sus stratagems y enhancements.',
    en: 'Tick the box to select a detachment. Tap the card to see its stratagems and enhancements.',
  },
  'army.detachmentStratagems': { es: 'Stratagems del detachment', en: 'Detachment stratagems' },
  'army.dpTotal': { es: 'Total: {total} / {limit} DP', en: 'Total: {total} / {limit} DP' },
  'army.warning.dpOver': {
    es: 'Se supera el límite de DP: {total} de {limit}.',
    en: 'DP limit exceeded: {total} of {limit}.',
  },
  'army.warning.incursionHint': {
    es: 'En Incursion, un detachment de 3 DP solo se permite si es el único.',
    en: 'In Incursion, a 3DP detachment is only allowed if it is the only one.',
  },
  'army.warning.shieldHosts': {
    es: 'Solo se permite un detachment Shield Host. Elegidos: {names}.',
    en: 'Only one Shield Host detachment is allowed. Selected: {names}.',
  },
  'army.valid': { es: 'Selección válida.', en: 'Valid selection.' },
  'army.noneSelected': { es: 'Ningún detachment elegido.', en: 'No detachment selected.' },
  'army.selected': { es: 'Detachments elegidos', en: 'Selected detachments' },
  'army.detachmentRule': { es: 'Regla del detachment', en: 'Detachment rule' },
  'army.favouredKatah': { es: "Favoured Ka'tah", en: "Favoured Ka'tah" },
  'army.extraEffect': { es: 'Efecto adicional', en: 'Extra effect' },
  'army.enhancements': { es: 'Enhancements', en: 'Enhancements' },
  'army.eligibility': { es: 'Quién la puede llevar', en: 'Who can take it' },
  'army.upgrade': { es: 'Upgrade', en: 'Upgrade' },
  'army.stratagemCount': { es: '{count} stratagems', en: '{count} stratagems' },
  'army.armyRules': { es: 'Reglas del ejército', en: 'Army rules' },
  'army.katahs': { es: "Los 6 Ka'tah", en: "The 6 Ka'tahs" },
  'army.katahsHint': {
    es: "Una unidad readied puede usar un ka'tah por vez.",
    en: "A readied unit can use one ka'tah at a time.",
  },
  'army.favouredBy': { es: 'Favorito de {name}', en: 'Favoured by {name}' },
  'army.superhumanFocusHint': {
    es: 'Superhuman Focus está disponible: al final de cualquier fase vuelve a dejar readied una unidad que ya usó su ka\'tah (1 CP).',
    en: "Superhuman Focus is available: at the end of any phase it readies again a unit that already used its ka'tah (1CP).",
  },
  'army.superhumanFocusLink': { es: 'Ver en Stratagems', en: 'See in Stratagems' },
  'army.shieldHost': { es: 'Unique: Shield Host', en: 'Unique: Shield Host' },
  'army.selectedState': { es: 'Elegido', en: 'Selected' },

  'strat.view': { es: 'Ordenar', en: 'Sort' },
  'strat.byGroup': { es: 'Por grupo', en: 'By group' },
  'strat.byPhase': { es: 'Por fase', en: 'By phase' },
  'strat.count': { es: '{count} stratagems disponibles', en: '{count} stratagems available' },
  'strat.onlyCore': {
    es: 'Sin detachments elegidos: solo se muestran las Core Stratagems.',
    en: 'No detachments selected: only Core Stratagems are shown.',
  },
  'strat.expandAll': { es: 'Desplegar todo', en: 'Expand all' },
  'strat.collapseAll': { es: 'Contraer todo', en: 'Collapse all' },
  'strat.groupNote': {
    es: 'Clasificación personal, no oficial. Una stratagem puede estar en varios grupos.',
    en: 'Personal, unofficial classification. A stratagem can be in several groups.',
  },

  'rules.turnStructure': { es: 'Estructura del turno', en: 'Turn structure' },
  'rules.turnSequence': { es: 'Orden del turno', en: 'Turn sequence' },
  'rules.commandPhase': { es: 'Pasos de la fase de Mando', en: 'Command phase steps' },
  'rules.phases': { es: 'Resumen de fases', en: 'Phase summary' },
  'rules.keyRules': { es: 'Otras reglas clave', en: 'Other key rules' },
  'rules.stratagemUsage': { es: 'Uso de stratagems', en: 'Using stratagems' },
  'rules.battleSizes': { es: 'Tamaños de partida', en: 'Battle sizes' },
  'rules.table.size': { es: 'Tamaño', en: 'Size' },
  'rules.table.points': { es: 'Puntos', en: 'Points' },
  'rules.table.dp': { es: 'DP', en: 'DP' },
  'rules.table.enhancements': { es: 'Máx. enh.', en: 'Max enh.' },
  'rules.table.copies': { es: 'Copias', en: 'Copies' },
  'rules.table.caption': {
    es: 'Copias = copias por datasheet. Máx. enh. = máximo de enhancements.',
    en: 'Copies = copies per datasheet. Max enh. = maximum enhancements.',
  },
  'rules.glossary': { es: 'Glosario', en: 'Glossary' },
  'rules.search': { es: 'Buscar keyword o habilidad', en: 'Search keyword or ability' },
  'rules.searchPlaceholder': { es: 'Ej.: lethal, cover, readied…', en: 'E.g. lethal, cover, readied…' },
  'rules.noResults': { es: 'Sin resultados.', en: 'No results.' },
  'theme.toLight': { es: 'Cambiar a fondo claro', en: 'Switch to light background' },
  'theme.toDark': { es: 'Cambiar a fondo oscuro', en: 'Switch to dark background' },
  'battle.turn': { es: 'Turno {turn}', en: 'Turn {turn}' },
  'battle.hint': {
    es: 'Marca lo que gastes. «Nuevo turno» lo reinicia, salvo lo de una vez por batalla.',
    en: 'Mark what you spend. "New turn" resets it, except once-per-battle items.',
  },
  'battle.newTurn': { es: 'Nuevo turno', en: 'New turn' },
  'battle.reset': { es: 'Reiniciar batalla', en: 'Reset battle' },
  'battle.resetConfirm': { es: '¿Seguro? Toca otra vez', en: 'Sure? Tap again' },
  'battle.used': { es: 'Usada', en: 'Used' },
  'battle.chosen': { es: 'Elegido', en: 'Chosen' },
  'battle.katahsTitle': { es: "Ka'tah de este turno", en: "This turn's ka'tahs" },
  'battle.katahsHint': {
    es: "Elige los Ka'tah que usarán tus unidades readied. Se reinicia con cada turno nuevo.",
    en: "Choose the ka'tahs your readied units will use. It resets every new turn.",
  },
  'battle.activeKatahs': { es: "Ka'tah elegido para esta fase", en: "Chosen ka'tah for this phase" },
  'battle.phaseEmpty': { es: 'Nada para usar en esta fase.', en: 'Nothing to use in this phase.' },
  'battle.oncePerBattle': { es: 'Una vez por batalla', en: 'Once per battle' },
  'error.title': { es: 'Algo falló en esta pantalla', en: 'Something went wrong on this screen' },
  'error.body': {
    es: 'El resto de la app sigue funcionando. Probá de nuevo o cambiá de pestaña.',
    en: 'The rest of the app still works. Try again or switch tabs.',
  },
  'error.retry': { es: 'Reintentar', en: 'Try again' },
  'rules.disclaimer': {
    es: 'Uso personal. Las reglas son propiedad de Games Workshop; los textos están resumidos.',
    en: 'Personal use. The rules are property of Games Workshop; texts are summarised.',
  },
} satisfies Record<string, LocalizedText>;

export type UiKey = keyof typeof DICTIONARY;

export const GROUP_LABELS: Record<GroupId, LocalizedText> = {
  'ranged-attack': { es: 'Ataque disparo', en: 'Ranged attack' },
  'melee-attack': { es: 'Ataque melee', en: 'Melee attack' },
  'ranged-defence': { es: 'Defensa vs disparo', en: 'Defence vs ranged' },
  'melee-defence': { es: 'Defensa vs melee', en: 'Defence vs melee' },
  'movement-charge': { es: 'Movimiento y carga', en: 'Movement and charge' },
  'opponent-turn-reaction': { es: 'Reacción en turno rival', en: "Opponent's turn reaction" },
  'objectives-utility': { es: 'Objetivos y utilidad', en: 'Objectives and utility' },
};

export const PHASE_LABELS: Record<Phase, LocalizedText> = {
  command: { es: 'Mando', en: 'Command' },
  movement: { es: 'Movimiento', en: 'Movement' },
  shooting: { es: 'Disparo', en: 'Shooting' },
  charge: { es: 'Carga', en: 'Charge' },
  fight: { es: 'Combate', en: 'Fight' },
  any: { es: 'Cualquier fase', en: 'Any phase' },
};

export const TURN_LABELS: Record<TurnOwner, LocalizedText> = {
  mine: { es: 'Mi turno', en: 'My turn' },
  opponent: { es: 'Turno rival', en: "Opponent's turn" },
  both: { es: 'Cualquier turno', en: 'Either turn' },
};
