import React, { useState } from 'react';
import { Character } from '../types';
import classAbilitiesData from '../class-abilities';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const Specializations: React.FC<Props> = ({ character, updateCharacter }) => {
  const [expandedClasses, setExpandedClasses] = useState<string[]>(character.classes.map(c => c.name));

  const toggleClass = (className: string) => {
    setExpandedClasses(prev => prev.includes(className) ? prev.filter(c => c !== className) : [...prev, className]);
  };

  const selectAbility = (className: string, abilityName: string, limit: number) => {
    const currentMap = character.classAbilities || {};
    const currentList = currentMap[className] || [];
    
    // PERMANENT SELECTION: If already in list, do nothing
    if (currentList.includes(abilityName)) return;
    
    // Check if limit is reached
    if (currentList.length >= limit) return;
    
    const newList = [...currentList, abilityName];

    updateCharacter({
      classAbilities: {
        ...currentMap,
        [className]: newList
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-y-auto scrollbar-hide pb-24">
      <div className="flex items-center gap-3 mb-6 border-b border-amber-900/30 pb-2">
        <h2 className="fantasy-title text-2xl text-amber-500">Speciálky</h2>
      </div>

      <div className="space-y-6">
        {character.classes.length === 0 ? (
          <div className="text-center py-12 text-stone-700 italic border-2 border-dashed border-stone-900 rounded-3xl">
            Nejdříve zvol hrdinovi povolání v záložce Hrdina.
          </div>
        ) : (
          character.classes.map((charClass) => {
            const classAbilities = classAbilitiesData[charClass.name] || [];
            const isExpanded = expandedClasses.includes(charClass.name);
            const selectedList = character.classAbilities?.[charClass.name] || [];
            const selectedCount = selectedList.length;
            const isLimitReached = selectedCount >= charClass.level;

            // Show selected abilities OR all available if not at limit
            const abilitiesToShow = classAbilities.filter(ability => {
              if (isLimitReached) {
                return selectedList.includes(ability.name);
              }
              return true;
            });

            return (
              <div key={charClass.name} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl transition-all">
                <button 
                  onClick={() => toggleClass(charClass.name)}
                  className="w-full flex items-center justify-between p-4 bg-stone-800/20 hover:bg-stone-800/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="fantasy-title text-base font-bold text-amber-500 tracking-wide">{charClass.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border transition-colors ${selectedCount === charClass.level ? 'bg-emerald-950 text-emerald-500 border-emerald-900' : 'bg-stone-950 text-stone-500 border-stone-800'}`}>
                      {selectedCount} / {charClass.level}
                    </span>
                  </div>
                  <i className={`fas fa-chevron-down text-stone-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isExpanded && (
                  <div className="p-4 grid grid-cols-1 gap-3 bg-stone-950/20 animate-fade-in">
                    {abilitiesToShow.length === 0 ? (
                      <p className="text-[10px] text-stone-600 italic py-2">Pro toto povolání nejsou definovány speciální schopnosti.</p>
                    ) : (
                      abilitiesToShow.map((ability) => {
                        const isSelected = selectedList.includes(ability.name);

                        return (
                          <button
                            key={ability.name}
                            disabled={isSelected}
                            onClick={() => selectAbility(charClass.name, ability.name, charClass.level)}
                            className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                              isSelected 
                                ? 'bg-amber-900/10 border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.1)] cursor-default' 
                                : 'bg-stone-900 border-stone-800 hover:border-stone-600 active:scale-[0.98]'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className={`text-xs font-bold uppercase tracking-widest ${isSelected ? 'text-amber-500' : 'text-stone-300'}`}>
                                {ability.name}
                              </span>
                              {isSelected && (
                                <i className="fas fa-check-circle text-amber-600 text-[10px]"></i>
                              )}
                            </div>
                            
                            {ability.flavor && (
                              <p className="text-[10px] text-stone-500 italic mb-2 leading-relaxed border-l-2 border-stone-800 pl-3">
                                "{ability.flavor}"
                              </p>
                            )}
                            
                            <p className="text-[11px] text-stone-300 leading-relaxed">
                              {ability.description}
                            </p>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-8 text-center opacity-10">
        <i className="fas fa-scroll text-5xl text-stone-600"></i>
      </div>
    </div>
  );
};

export default Specializations;