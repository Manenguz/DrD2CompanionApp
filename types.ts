
export enum Race {
  Clovek = 'Člověk',
  Elf = 'Elf',
  Trpaslik = 'Trpaslík',
  Hobit = 'Hobit',
  Kroll = 'Kroll'
}

export interface CharacterClass {
  name: string;
  level: number;
}

export enum SlotState {
  Available = 'available',
  Exceed = 'exceed',
  Scarred = 'scarred'
}

export interface StatPool {
  max: number;
  slots: SlotState[];
}

export interface Money {
  dukat: number;
  gros: number;
  halir: number;
}

export interface Character {
  id: string;
  name: string;
  race: Race;
  subrace?: string;
  classes: CharacterClass[];
  xp: number;
  telo: StatPool;
  vule: StatPool;
  vliv: StatPool;
  inventory: string[];
  money: Money;
  notes: string;
  skills: string;
  racialAbility?: string;
  classAbilities?: Record<string, string[]>;
}

export interface DiceResult {
  sides: number;
  count: number;
  results: number[];
  total: number;
  removed?: number[];
  type?: 'disadvantage' | 'normal' | 'advantage' | 'initiative';
  timestamp: number;
}
