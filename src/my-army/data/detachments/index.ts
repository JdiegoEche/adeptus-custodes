import type { Detachment } from '../../../shared/types';
import { AQUILAN_SHIELD } from './aquilan-shield';
import { AURIC_CHAMPIONS } from './auric-champions';
import { DREAD_HOST } from './dread-host';
import { EMISSARIES_IMPERATUS } from './emissaries-imperatus';
import { EMPERORS_CHOSEN } from './emperors-chosen';
import { GRAV_ASSAULT_FORCE } from './grav-assault-force';
import { GUARDIANS_OF_THE_THRONE } from './guardians-of-the-throne';
import { HONOURED_COMPANIONS } from './honoured-companions';
import { LIONS_OF_THE_EMPEROR } from './lions-of-the-emperor';
import { MIGHT_OF_THE_MORITOI } from './might-of-the-moritoi';
import { NULL_MAIDEN_VIGIL } from './null-maiden-vigil';
import { SHADOWKEEPERS } from './shadowkeepers';
import { SOLAR_WATCH } from './solar-watch';

/** All 13 Adeptus Custodes detachments, in display order. */
export const DETACHMENTS: Detachment[] = [
  GUARDIANS_OF_THE_THRONE,
  AQUILAN_SHIELD,
  DREAD_HOST,
  EMPERORS_CHOSEN,
  EMISSARIES_IMPERATUS,
  SHADOWKEEPERS,
  SOLAR_WATCH,
  HONOURED_COMPANIONS,
  AURIC_CHAMPIONS,
  LIONS_OF_THE_EMPEROR,
  MIGHT_OF_THE_MORITOI,
  GRAV_ASSAULT_FORCE,
  NULL_MAIDEN_VIGIL,
];
