import React, { useState } from 'react';
import { Character, SlotState, StatPool, CharacterClass, Race } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const BASE_CLASSES = ['Bojovník', 'Mastičkář', 'Zaříkávač', 'Lovec', 'Kejklíř'];

const ADVANCED_CLASSES_REQ: Record<string, string[]> = {
  'Válečník': ['Bojovník', 'Kejklíř'],
  'Hraničář': ['Bojovník', 'Lovec'],
  'Šaman': ['Lovec', 'Mastičkář'],
  'Druid': ['Lovec', 'Zaříkávač'],
  'Lupič': ['Kejklíř', 'Mastičkář'],
  'Zvěd': ['Kejklíř', 'Lovec'],
  'Vědmák': ['Mastičkář', 'Bojovník'],
  'Alchymista': ['Mastičkář', 'Zaříkávač'],
  'Čaroděj': ['Zaříkávač', 'Bojovník'],
  'Mág': ['Zaříkávač', 'Kejklíř'],
};

const RACIAL_DATA: Record<string, { name: string, desc: string }[]> = {
  [Race.Clovek]: [
    { name: "Jménem krále", desc: "Dává každá jizva 1 zdroj navíc při prosazování zájmů pána v ohrožení života." },
    { name: "Zarputilost", desc: "Z každé jizvy na Vlivu získává postava vždy 1 zdroj navíc." },
    { name: "Idol žen či mužů", desc: "Nadání (2 manévry) pro svádění a získávání přízně." },
    { name: "Lví srdce", desc: "Nadání (2 manévry) čelit zastrašování či psychickému nátlaku." },
    { name: "Styky", desc: "Cizí postava dluží hrdinovi laskavost z minulosti (Aktivace: 1 Vliv)." },
  ],
  [Race.Elf]: [
    { name: "Vznešenost", desc: "Na hojení jizev na Vlivu stačí vynaložit o 1 zdroj méně." },
    { name: "Tesknota", desc: "Z každé duševní jizvy získává postava vždy 1 zdroj navíc." },
    { name: "Jsme jedné krve", desc: "Nadání pro odhadování úmyslů zvířat a jejich přesvědčování." },
    { name: "Plášť soumraku", desc: "Nadání pro skrývání se ve tmě, v šeru nebo při špatném osvětlení." },
    { name: "Paměť rodu", desc: "Znalost historie místa starší než 12 let (Aktivace: 1 Duše)." },
  ],
  [Race.Trpaslik]: [
    { name: "Noční oči", desc: "Schopnost vidět v úplné tmě." },
    { name: "Síla přísahy", desc: "Každá jizva dává 1 zdroj navíc při plnění přísahy v ohrožení." },
    { name: "Nezdolnost", desc: "Na hojení tělesných jizev stačí vynaložit o 1 zdroj méně." },
    { name: "Játra ze žuly", desc: "Nadání čelit účinkům omamných látek a jedů." },
    { name: "Pouto krve", desc: "Určitý trpaslík patří k příbuzným nebo má k rodu závazky (Aktivace: 1 Vliv)." },
  ],
  [Race.Hobit]: [
    { name: "Šestý smysl", desc: "Rozpozná hrozící nebezpečí bez smyslových podnětů." },
    { name: "Takový prcek!", desc: "Každá jizva dává 1 zdroj navíc v boji s větším nepřítelem." },
    { name: "Dobrá nálada", desc: "Na hojení duševních jizev stačí vynaložit o 1 zdroj méně." },
    { name: "Tichošlápek", desc: "Nadání pro tichý pohyb naboso." },
    { name: "Labužník", desc: "Vždy má u sebe něco pro zlepšení nálady (Aktivace: 1 Duše)." },
  ],
  [Race.Kroll]: [
    { name: "Netopýří sluch", desc: "Orientace podle sluchu i v naprosté tmě." },
    { name: "Zběsilost", desc: "Z každé tělesné jizvy získává postava vždy 1 zdroj navíc." },
    { name: "Odznaky hrdinství", desc: "Nadání pro zastrašování všech inteligentních tvorů." },
    { name: "Zubří kůže", desc: "Pokožka dává slevu jako běžná zbroj bez jejích omezení." },
    { name: "Kořeny magie", desc: "Hledání přirozeného magického zřídla v okolí (Aktivace: 1 Vliv)." },
  ]
};

const CharacterSheet: React.FC<Props> = ({ character, updateCharacter }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showClassSelector, setShowClassSelector] = useState(false);

  const totalLevel = character.classes.reduce((sum, c) => sum + c.level, 0);

  const getUnlockedAdvancedClasses = () => {
    return Object.entries(ADVANCED_CLASSES_REQ).filter(([advClass, parents]) => {
      if (character.classes.some(c => c.name === advClass)) return false;
      const parentLevels = character.classes
        .filter(c => parents.includes(c.name))
        .reduce((sum, c) => sum + c.level, 0);
      return parentLevels >= 6;
    }).map(([advClass]) => advClass);
  };

  const cycleSlot = (poolKey: 'telo' | 'vule' | 'vliv', index: number) => {
    const pool = { ...character[poolKey] };
    const currentState = pool.slots[index];
    let nextState: SlotState;

    if (currentState === SlotState.Available) nextState = SlotState.Exceed;
    else if (currentState === SlotState.Exceed) nextState = SlotState.Scarred;
    else nextState = SlotState.Available;

    pool.slots[index] = nextState;
    updateCharacter({ [poolKey]: pool });
  };

  const addClass = (className: string) => {
    if (character.classes.some(c => c.name === className)) return;
    updateCharacter({
      classes: [...character.classes, { name: className, level: 1 }]
    });
    setShowClassSelector(false);
  };

  const removeClass = (className: string) => {
    updateCharacter({
      classes: character.classes.filter(c => c.name !== className)
    });
  };

  const updateClassLevel = (className: string, delta: number) => {
    updateCharacter({
      classes: character.classes.map(c => 
        c.name === className ? { ...c, level: Math.max(1, c.level + delta) } : c
      )
    });
  };

  const selectRacialAbility = (abilityName: string) => {
    updateCharacter({ racialAbility: abilityName });
  };

  const PoolTracker = ({ label, poolKey, color, icon }: { label: string, poolKey: 'telo' | 'vule' | 'vliv', color: string, icon: string }) => {
    const pool = character[poolKey];
    return (
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <i className={`fas ${icon} ${color}`}></i>
            <span className="fantasy-title text-lg tracking-wide">{label}</span>
          </div>
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
             {pool.slots.filter(s => s === SlotState.Available).length} / {pool.max}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {pool.slots.map((state, idx) => (
            <button
              key={idx}
              onClick={() => cycleSlot(poolKey, idx)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 active:scale-90 ${
                state === SlotState.Available 
                  ? `${color.replace('text', 'bg').replace('-500', '-600')} border-white/20 shadow-[0_0_10px_rgba(251,191,36,0.2)]` 
                  : state === SlotState.Exceed
                    ? 'bg-orange-700/60 border-orange-400/30'
                    : 'bg-rose-950 border-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.4)]'
              }`}
            >
              {state === SlotState.Scarred && <i className="fas fa-bolt-lightning text-rose-500 text-[10px]"></i>}
              {state === SlotState.Exceed && <i className="fas fa-droplet text-orange-200 text-[8px]"></i>}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const unlockedAdvanced = getUnlockedAdvancedClasses();
  const raceAbilities = RACIAL_DATA[character.race] || [];
  const selectedRacialData = raceAbilities.find(a => a.name === character.racialAbility);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide pb-24 bg-stone-950">
      <div className="p-4 bg-stone-900 border-b border-stone-800 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-stone-300 text-xs font-bold uppercase tracking-[0.2em]">
              {character.race}
            </span>
            <span className="text-stone-700">•</span>
            <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">Úroveň {totalLevel}</span>
          </div>
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`p-2 rounded-lg transition-all active:scale-90 ${isEditMode ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'bg-stone-800 text-stone-400'}`}
            title={isEditMode ? "Zamknout úpravy" : "Upravit list"}
          >
            <i className={`fas ${isEditMode ? 'fa-check' : 'fa-cog'}`}></i>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Racial Ability Picker or Display */}
        {character.racialAbility ? (
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-lg animate-fade-in group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Rasový rys</h3>
              {isEditMode && (
                <button 
                  onClick={() => updateCharacter({ racialAbility: '' })}
                  className="text-rose-900 hover:text-rose-500 transition-colors active:scale-90"
                  title="Odstranit rys"
                >
                  <i className="fas fa-trash-can text-xs"></i>
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-amber-500 text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                <i className="fas fa-dna text-[10px] text-amber-700"></i>
                {character.racialAbility}
              </span>
              {selectedRacialData && (
                <p className="text-[10px] text-stone-500 mt-2 italic leading-tight border-l-2 border-stone-800 pl-3">
                  {selectedRacialData.desc}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-lg animate-fade-in">
            <h3 className="text-[10px] font-bold text-rose-800 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
               <i className="fas fa-sparkles"></i> Výběr rasového rysu
            </h3>
            <div className="space-y-3">
              <p className="text-[10px] text-stone-500 italic">Tyto schopnosti definují původ tvého hrdiny.</p>
              <div className="grid grid-cols-1 gap-2">
                {raceAbilities.map(a => (
                  <button
                    key={a.name}
                    onClick={() => selectRacialAbility(a.name)}
                    className="flex flex-col text-left bg-stone-800 border border-stone-700 hover:border-amber-600/50 p-3 rounded-lg transition-all active:scale-[0.98] group"
                  >
                    <span className="text-stone-300 group-hover:text-amber-400 text-xs font-bold uppercase tracking-wide">{a.name}</span>
                    <span className="text-[9px] text-stone-500 group-hover:text-stone-400 mt-1 leading-tight">{a.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <PoolTracker label="Tělo" poolKey="telo" color="text-emerald-500" icon="fa-shield-heart" />
        <PoolTracker label="Vůle" poolKey="vule" color="text-blue-500" icon="fa-fire-flame-curved" />
        <PoolTracker label="Vliv" poolKey="vliv" color="text-amber-500" icon="fa-crown" />
      </div>

      <div className="p-4">
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-2">
            <h3 className="fantasy-title text-base text-stone-400 flex items-center gap-2 uppercase tracking-widest">
              <i className="fas fa-briefcase text-amber-700"></i> Povolání
            </h3>
            <button 
              onClick={() => setShowClassSelector(!showClassSelector)}
              className="text-stone-600 hover:text-amber-500 transition-colors"
            >
              <i className={`fas ${showClassSelector ? 'fa-xmark' : 'fa-plus-circle'}`}></i>
            </button>
          </div>

          {showClassSelector && (
            <div className="grid grid-cols-1 gap-4 mb-4 animate-fade-in">
              <div>
                <p className="text-[9px] text-stone-500 uppercase font-bold tracking-widest mb-2">Základní:</p>
                <div className="flex flex-wrap gap-2">
                  {BASE_CLASSES.filter(bc => !character.classes.some(c => c.name === bc)).map(bc => (
                    <button 
                      key={bc} 
                      onClick={() => addClass(bc)}
                      className="bg-stone-800 border border-stone-700 text-stone-300 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full hover:border-amber-500 active:scale-95 transition-all"
                    >
                      {bc}
                    </button>
                  ))}
                </div>
              </div>
              
              {unlockedAdvanced.length > 0 && (
                <div>
                  <p className="text-[9px] text-amber-600 uppercase font-bold tracking-widest mb-2">Pokročilá (Odemčena):</p>
                  <div className="flex flex-wrap gap-2">
                    {unlockedAdvanced.map(ac => (
                      <button 
                        key={ac} 
                        onClick={() => addClass(ac)}
                        className="bg-amber-900/20 border border-amber-900/40 text-amber-500 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full hover:border-amber-500 active:scale-95 transition-all"
                      >
                        {ac}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            {character.classes.map((c) => {
              const isAdvanced = !!ADVANCED_CLASSES_REQ[c.name];
              return (
                <div key={c.name} className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${isAdvanced ? 'bg-amber-900/5 border-amber-900/30' : 'bg-stone-800/30 border-stone-800/50'}`}>
                  <div className="flex items-center gap-2">
                    {isEditMode && (
                      <button onClick={() => removeClass(c.name)} className="text-rose-900 hover:text-rose-500 transition-colors px-1">
                        <i className="fas fa-trash-can text-[10px]"></i>
                      </button>
                    )}
                    <div className="flex flex-col">
                      <span className={`font-bold text-sm uppercase tracking-wider ${isAdvanced ? 'text-amber-500' : 'text-stone-300'}`}>{c.name}</span>
                      {isAdvanced && <span className="text-[8px] text-stone-600 uppercase font-bold tracking-tighter">Pokročilé</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-stone-900/50 px-2 py-1 rounded-md border border-stone-700/50 shadow-inner">
                      <button onClick={() => updateClassLevel(c.name, -1)} className="text-stone-600 hover:text-white px-1">
                        <i className="fas fa-minus text-[8px]"></i>
                      </button>
                      <span className="text-amber-500 font-bold text-xs w-4 text-center">{c.level}</span>
                      <button onClick={() => updateClassLevel(c.name, 1)} className="text-stone-600 hover:text-white px-1">
                        <i className="fas fa-plus text-[8px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {character.classes.length === 0 && (
              <p className="text-stone-700 text-xs italic text-center py-4">Hrdina zatím bez povolání...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;