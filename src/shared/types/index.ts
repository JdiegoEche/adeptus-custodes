export type Language = 'es' | 'en';

/** Every rules text is stored in both languages. */
export interface LocalizedText {
  es: string;
  en: string;
}

export type Phase = 'command' | 'movement' | 'shooting' | 'charge' | 'fight' | 'any';

/** Whose turn a timing belongs to. `both` = usable in either player's turn. */
export type TurnOwner = 'mine' | 'opponent' | 'both';

export interface PhaseTiming {
  phase: Phase;
  turn: TurnOwner;
}

/** Personal (non-official) classification of stratagems and ka'tahs by moment of use. */
export type GroupId =
  | 'ranged-attack'
  | 'melee-attack'
  | 'ranged-defence'
  | 'melee-defence'
  | 'movement-charge'
  | 'opponent-turn-reaction'
  | 'objectives-utility';

export interface Stratagem {
  /** Stable identifier derived from the name. Same name means same stratagem. */
  id: string;
  /** Proper name: never translated. */
  name: string;
  cp: number;
  /** Optional extra cost information (e.g. Heroic Intervention "Into the Fray"). */
  cpNote?: LocalizedText;
  timings: PhaseTiming[];
  when: LocalizedText;
  target: LocalizedText;
  effect: LocalizedText;
  restrictions?: LocalizedText;
  groups: GroupId[];
  /** Usable once per battle: the battle tracker does not reset it when a new turn starts. */
  oncePerBattle?: boolean;
  verify?: LocalizedText;
}

export interface Enhancement {
  name: string;
  points: number;
  eligibility: LocalizedText;
  upgrade: boolean;
  effect: LocalizedText;
  note?: LocalizedText;
  verify?: LocalizedText;
}

export type KatahId = 'conservai' | 'calistus' | 'salvus' | 'dacatarai' | 'kaptaris' | 'rendax';

export interface Katah {
  id: KatahId;
  name: string;
  timing: PhaseTiming;
  when: LocalizedText;
  effect: LocalizedText;
  groups: GroupId[];
}

export interface FavouredKatah {
  katahId: KatahId;
  extraEffect: LocalizedText;
}

export interface NamedRule {
  name: string;
  text: LocalizedText;
}

export interface ArmyRule extends NamedRule {
  id: string;
  /** Optional sub-entries (e.g. the six ka'tahs are listed separately). */
  details?: LocalizedText[];
}

export interface Detachment {
  id: string;
  name: string;
  dp: number;
  shieldHost: boolean;
  favouredKatah?: FavouredKatah;
  rule: NamedRule;
  enhancements: Enhancement[];
  stratagems: Stratagem[];
  styleTags: GroupId[];
}

export type BattleSizeId = 'incursion' | 'strike-force';

export interface BattleSize {
  id: BattleSizeId;
  name: string;
  points: number;
  dp: number;
  maxEnhancements: number;
  copiesPerDatasheet: number;
  /** Incursion exception: a single 3DP detachment is allowed when it is the only one. */
  allowsSingleThreeDpDetachment: boolean;
}

export interface GlossaryEntry {
  term: string;
  text: LocalizedText;
  verify?: LocalizedText;
}
