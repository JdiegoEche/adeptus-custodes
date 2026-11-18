import type { GlossaryEntry } from '../../shared/types';

/** Keywords and weapon/unit abilities (core rules section 24 and others). */
export const GLOSSARY: GlossaryEntry[] = [
  {
    term: '[ANTI-X Y+]',
    text: {
      en: 'Against a target with keyword X, an unmodified wound roll of Y+ is a critical wound.',
      es: 'Contra un objetivo con la keyword X, una tirada para herir sin modificar de Y+ es una herida crítica.',
    },
  },
  {
    term: 'AP +1 / -1',
    text: {
      en: '"+1 AP" improves the AP characteristic (more negative: -1 becomes -2). "-1 AP" worsens it (closer to 0: -1 becomes 0). AP can never be worse than 0.',
      es: '"+1 AP" mejora la característica AP (más negativa: -1 pasa a -2). "-1 AP" la empeora (más cerca de 0: -1 pasa a 0). El AP nunca puede ser peor que 0.',
    },
  },
  {
    term: '[ASSAULT]',
    text: {
      en: 'The unit can use assault shooting (shoot after advancing).',
      es: 'La unidad puede usar disparo de asalto (disparar tras avanzar).',
    },
  },
  {
    term: '[BLAST]',
    text: {
      en: '+1 attack die (or X) for every five models in the target unit, rounded down.',
      es: '+1 dado de ataque (o X) por cada cinco modelos de la unidad objetivo, redondeando hacia abajo.',
    },
  },
  {
    term: '[CLEAVE X]',
    text: {
      en: "If all of the weapon's attacks target one unit, +X attack dice for every five models in it, rounded down.",
      es: 'Si todos los ataques del arma van contra una unidad, +X dados de ataque por cada cinco modelos de esa unidad, redondeando hacia abajo.',
    },
  },
  {
    term: '[CLOSE-QUARTERS]',
    text: {
      en: 'The unit can use close-quarters shooting (while engaged). [PISTOL] works the same way.',
      es: 'La unidad puede usar disparo a corta distancia o close-quarters (estando trabada). [PISTOL] funciona igual.',
    },
  },
  {
    term: 'Deadly Demise X',
    text: {
      en: 'When destroyed, on a D6 roll of 6 it inflicts X mortal wounds on each unit within 6".',
      es: 'Al ser destruido, con un 6 en un D6 inflige X heridas mortales a cada unidad a 6" o menos.',
    },
  },
  {
    term: 'Deep Strike',
    text: {
      en: "During an ingress move, it can be set up more than 8\" from enemy units, even in the opponent's deployment zone.",
      es: 'Durante un movimiento de ingreso (ingress) puede desplegarse a más de 8" de las unidades enemigas, incluso en la zona de despliegue del oponente.',
    },
  },
  {
    term: '[DEVASTATING WOUNDS]',
    text: {
      en: 'A critical wound ends the attack and inflicts mortal wounds equal to D.',
      es: 'Una herida crítica termina el ataque e inflige heridas mortales iguales a D.',
    },
  },
  {
    term: '[EXTRA ATTACKS]',
    text: {
      en: "Attacks with this weapon are made in addition to the model's other melee weapon.",
      es: 'Los ataques con esta arma se hacen además de los de la otra arma cuerpo a cuerpo del modelo.',
    },
  },
  {
    term: 'Feel No Pain X+',
    text: {
      en: 'When a wound would be lost, roll a D6: on X+ it is not lost.',
      es: 'Cuando se fuera a perder una herida, tira un D6: con X+ no se pierde.',
    },
  },
  {
    term: 'Fights First',
    text: {
      en: 'The unit fights in the Fights First step.',
      es: 'La unidad combate en el paso de Fights First.',
    },
  },
  {
    term: 'Firing Deck X',
    text: {
      en: "Up to X embarked models add their ranged weapons to the transport's attacks.",
      es: 'Hasta X modelos embarcados suman sus armas a distancia a los ataques del transporte.',
    },
  },
  {
    term: '[HAZARDOUS]',
    text: {
      en: 'After shooting or fighting, make hazard rolls for these weapons.',
      es: 'Después de disparar o combatir, haz tiradas de peligro (hazard) por estas armas.',
    },
  },
  {
    term: '[HEAVY]',
    text: {
      en: '+1 to hit if the unit is unengaged, was not set up this turn, and no model moved more than 3".',
      es: '+1 para impactar si la unidad no está trabada, no se desplegó este turno y ningún modelo se movió más de 3".',
    },
  },
  {
    term: 'Hover',
    text: {
      en: 'No -2" when taking to the skies.',
      es: 'No sufre el -2" al elevarse (taking to the skies).',
    },
  },
  {
    term: '[IGNORES COVER]',
    text: {
      en: 'The target cannot have the benefit of cover.',
      es: 'El objetivo no puede tener el beneficio de cobertura.',
    },
  },
  {
    term: '[INDIRECT FIRE]',
    text: {
      en: 'The unit can use indirect shooting, with penalties.',
      es: 'La unidad puede usar disparo indirecto, con penalizaciones.',
    },
  },
  {
    term: 'Infiltrators',
    text: {
      en: 'During deployment, it is set up more than 8" from the enemy deployment zone and from enemy units.',
      es: 'Durante el despliegue, se despliega a más de 8" de la zona de despliegue enemiga y de las unidades enemigas.',
    },
  },
  {
    term: '[LANCE]',
    text: {
      en: '+1 to wound if the unit made a charge move this turn.',
      es: '+1 para herir si la unidad hizo un movimiento de carga este turno.',
    },
  },
  {
    term: 'Leader / Support',
    text: {
      en: 'Before the battle, it is attached to a bodyguard unit; each bodyguard unit can have one leader and one support.',
      es: 'Antes de la batalla, se une a una unidad de guardaespaldas (bodyguard); cada bodyguard puede tener un leader y un support.',
    },
  },
  {
    term: '[LETHAL HITS]',
    text: {
      en: 'A critical hit automatically wounds.',
      es: 'Un impacto crítico hiere automáticamente.',
    },
  },
  {
    term: 'Lone Operative',
    text: {
      en: 'Unless it is attached, it is not visible to enemy units more than 12" away.',
      es: 'Salvo que esté unida a otra unidad, no es visible para unidades enemigas a más de 12".',
    },
  },
  {
    term: '[MELTA X]',
    text: { en: '+X D within half range.', es: '+X D a la mitad del alcance o menos.' },
  },
  {
    term: 'MOBILE',
    text: {
      en: 'The model can move horizontally through dense terrain features (like INFANTRY).',
      es: 'El modelo puede moverse horizontalmente a través de elementos de escenografía densa (como INFANTRY).',
    },
  },
  {
    term: '[ONE SHOT]',
    text: {
      en: 'The weapon can be used once per battle.',
      es: 'El arma solo puede usarse una vez por batalla.',
    },
  },
  {
    term: '[PRECISION]',
    text: {
      en: 'Attacks can be allocated to a visible CHARACTER in the target unit.',
      es: 'Los ataques pueden asignarse a un CHARACTER visible de la unidad objetivo.',
    },
  },
  {
    term: '[PSYCHIC]',
    text: {
      en: 'Ignore modifiers to BS/WS and hit rolls; the attacks are psychic attacks.',
      es: 'Ignora los modificadores a BS/WS y a las tiradas para impactar; los ataques son ataques psíquicos.',
    },
  },
  {
    term: '[RAPID FIRE X]',
    text: {
      en: '+X attack dice within half range.',
      es: '+X dados de ataque a la mitad del alcance o menos.',
    },
  },
  {
    term: 'Scouts X"',
    text: {
      en: 'Before the battle, it can make a scout move of up to X".',
      es: 'Antes de la batalla, puede hacer un movimiento de exploración (scout) de hasta X".',
    },
  },
  {
    term: 'Stealth',
    text: {
      en: 'Ranged attacks against the unit get the benefit of cover for the unit.',
      es: 'Los ataques a distancia contra la unidad aplican el beneficio de cobertura para la unidad.',
    },
  },
  {
    term: 'Super-Heavy Walker',
    text: {
      en: 'It can move through models (not TITANIC) and through terrain up to 4" high.',
      es: 'Puede moverse a través de modelos (no TITANIC) y de escenografía de hasta 4" de alto.',
    },
  },
  {
    term: '[SUSTAINED HITS X]',
    text: {
      en: 'Each critical hit scores X additional hits.',
      es: 'Cada impacto crítico genera X impactos adicionales.',
    },
  },
  {
    term: '[TORRENT]',
    text: { en: 'Attacks automatically hit.', es: 'Los ataques impactan automáticamente.' },
  },
  {
    term: '[TWIN-LINKED]',
    text: { en: 'Re-roll wound rolls.', es: 'Repite las tiradas para herir.' },
  },
  {
    term: 'Damaged X',
    text: {
      en: 'While it has X or fewer wounds remaining, its attacks have -1 to hit.',
      es: 'Mientras le queden X heridas o menos, sus ataques tienen -1 para impactar.',
    },
  },
  {
    term: 'Benefit of cover',
    text: {
      en: 'Ranged attacks have -1 BS.',
      es: 'Los ataques a distancia tienen -1 a la BS.',
    },
  },
  {
    term: 'Battle-shocked',
    text: {
      en: 'OC "-"; cannot be targeted by its player\'s stratagems; cannot start actions.',
      es: 'OC "-"; no puede ser objetivo de las stratagems de su jugador; no puede iniciar acciones.',
    },
  },
  {
    term: 'Gone to Ground',
    text: {
      en: 'Terrain status (13.11.01), no CP cost: a hidden model, not fully visible through dense terrain, whose unit did not make ranged attacks this turn or the previous one; -3" to its detection range.',
      es: 'Estado de escenografía (13.11.01), sin costo de CP: un modelo oculto, no completamente visible a través de escenografía densa, cuya unidad no hizo ataques a distancia en este turno ni en el anterior; -3" a su alcance de detección.',
    },
  },
  {
    term: 'Readied',
    text: {
      en: "Custodes status granted by Martial Ka'tah; a readied unit can use one ka'tah.",
      es: "Estado de los Custodes otorgado por Martial Ka'tah; una unidad readied puede usar un ka'tah.",
    },
  },
  {
    term: 'TRUSTED SENTINEL',
    text: {
      en: 'Keyword. Units: Custodian Guard Sodality, Sentinel Guard Sodality, Custodian Wardens (plus Legends variants).',
      es: 'Keyword. Unidades: Custodian Guard Sodality, Sentinel Guard Sodality, Custodian Wardens (más variantes Legends).',
    },
  },
  {
    term: 'TERMINATOR',
    text: {
      en: 'Keyword. Units: Shield-Captain in Allarus Terminator Armour, Allarus Custodians, Aquilon Terminators (both variants).',
      es: 'Keyword. Unidades: Shield-Captain in Allarus Terminator Armour, Allarus Custodians, Aquilon Terminators (ambas variantes).',
    },
  },
  {
    term: 'DREADNOUGHT',
    text: {
      en: 'Keyword. Units: Contemptor-Achillus, Contemptor-Galatus, Telemon Heavy Dreadnought.',
      es: 'Keyword. Unidades: Contemptor-Achillus, Contemptor-Galatus, Telemon Heavy Dreadnought.',
    },
  },
  {
    term: 'SMOKE',
    text: {
      en: 'Keyword. Units: Anathema Psykana Rhino, Venerable Land Raider.',
      es: 'Keyword. Unidades: Anathema Psykana Rhino, Venerable Land Raider.',
    },
  },
  {
    term: 'GRAV-ASSAULT',
    text: {
      en: 'Keyword. Units: Coronus Grav-Carrier, Caladius Annihilator Grav-Tank, Caladius Grav-Tank, Pallas Grav-Attack.',
      es: 'Keyword. Unidades: Coronus Grav-Carrier, Caladius Annihilator Grav-Tank, Caladius Grav-Tank, Pallas Grav-Attack.',
    },
  },
];
