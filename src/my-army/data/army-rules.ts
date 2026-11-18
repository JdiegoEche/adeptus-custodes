import type { ArmyRule } from '../../shared/types';

export const MARTIAL_KATAH_RULE_ID = 'martial-katah';

export const ARMY_RULES: ArmyRule[] = [
  {
    id: MARTIAL_KATAH_RULE_ID,
    name: "Martial Ka'tah",
    text: {
      en: "At the start of your Command phase, friendly ADEPTUS CUSTODES units with this ability become readied. A readied unit can use one ka'tah ability; selecting it makes the unit no longer readied (until your next Command phase, unless Superhuman Focus readies it again). Shield Host detachments name a Favoured Ka'tah that gains an extra effect.",
      es: "Al inicio de tu fase de Mando, las unidades ADEPTUS CUSTODES propias con esta habilidad quedan readied. Una unidad readied puede usar una habilidad de ka'tah; al elegirla, la unidad deja de estar readied (hasta tu siguiente fase de Mando, salvo que Superhuman Focus la vuelva a dejar readied). Los detachments Shield Host indican un Favoured Ka'tah que obtiene un efecto adicional.",
    },
  },
  {
    id: 'aegis-of-the-emperor',
    name: 'Aegis of the Emperor',
    text: {
      en: 'Friendly ADEPTUS CUSTODES units with this ability have Feel No Pain 5+ against mortal wounds.',
      es: 'Las unidades ADEPTUS CUSTODES propias con esta habilidad tienen Feel No Pain 5+ contra heridas mortales.',
    },
  },
  {
    id: 'aquila-commander',
    name: 'Aquila Commander',
    text: {
      en: 'At the start of the battle round, if a model with this ability is your WARLORD, you gain 1CP (not while that WARLORD is destroyed).',
      es: 'Al inicio de la ronda de batalla, si un modelo con esta habilidad es tu WARLORD, obtienes 1CP (no mientras ese WARLORD esté destruido).',
    },
  },
  {
    id: 'daughters-of-the-abyss',
    name: 'Daughters of the Abyss',
    text: {
      en: 'Friendly ANATHEMA PSYKANA units with this ability have Feel No Pain 3+ against psychic attacks, and the aura Psychic Null: friendly ADEPTUS CUSTODES units within 6" have Feel No Pain 5+ against psychic attacks.',
      es: 'Las unidades ANATHEMA PSYKANA propias con esta habilidad tienen Feel No Pain 3+ contra ataques psíquicos, y el aura Psychic Null: las unidades ADEPTUS CUSTODES propias a 6" o menos tienen Feel No Pain 5+ contra ataques psíquicos.',
    },
  },
  {
    id: 'anathema-psykana',
    name: 'Anathema Psykana',
    text: {
      en: 'ANATHEMA PSYKANA units can be included without the ADEPTUS CUSTODES keyword; they cannot be your army faction and cannot be your WARLORD unless a rule allows it (Silent Sisterhood).',
      es: 'Las unidades ANATHEMA PSYKANA pueden incluirse sin la keyword ADEPTUS CUSTODES; no pueden ser la facción del ejército ni el WARLORD salvo que una regla lo permita (Silent Sisterhood).',
    },
  },
  {
    id: 'shock-disembark',
    name: 'Shock Disembark',
    text: {
      en: 'Special move type. Eligible if the unit is embarked within a TRANSPORT on the battlefield and did not embark this phase. Set-up distance 3": each model wholly within 3" of that TRANSPORT. After this move, the unit is not eligible to declare a charge until the end of the turn.',
      es: 'Tipo de movimiento especial. Puede hacerlo una unidad embarcada en un TRANSPORT que esté en el campo de batalla y que no haya embarcado en esta fase. Distancia de despliegue 3": cada modelo totalmente a 3" o menos de ese TRANSPORT. Tras este movimiento, la unidad no puede declarar una carga hasta el final del turno.',
    },
  },
];
