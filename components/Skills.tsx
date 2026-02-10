import React, { useState } from 'react';
import { Character } from '../types';
import classSkillsData from '../data/class-skills';
import { RACIAL_ABILITIES_DATA } from '../data/racial-abilities';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const Skills: React.FC<Props> = ({ character, updateCharacter }) => {
  const [expandedClasses, setExpandedClasses] = useState<string[]>([]);

  const toggleClass = (className: string) => {
    setExpandedClasses(prev => prev.includes(className) ? prev.filter(c => c !== className) : [...prev, className]);
  };

  const formatSkillText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-amber-500/90 font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const selectedRacialData = RACIAL_ABILITIES_DATA[character.race]?.find(a => a.name === character.racialAbility);

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-y-auto scrollbar-hide pb-24">
      <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-2 shrink-0">
        <h2 className="fantasy-title text-2xl text-amber-500">Schopnosti</h2>
        <div className="flex items-center gap-2">
           <i className="fas fa-hand-fist text-stone-800 text-lg"></i>
        </div>
      </div>
      
      {character.racialAbility && selectedRacialData && (
        <section className="mb-10 animate-fade-in">
          <div className="bg-rose-900/10 border border-rose-500/30 p-5 rounded-2xl shadow-xl">
             <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-xs">{selectedRacialData.name}</span>
                <span className="text-[8px] font-black text-stone-600 bg-stone-950 px-2 py-0.5 rounded uppercase tracking-tighter">Rasová</span>
             </div>
             {selectedRacialData.flavor && (
               <p className="text-[10px] text-stone-500 italic mb-2 leading-relaxed border-l-2 border-stone-800 pl-3">
                 "{selectedRacialData.flavor}"
               </p>
             )}
             <p className="text-[11px] text-stone-300 leading-relaxed">{selectedRacialData.description}</p>
          </div>
        </section>
      )}

      <section className="mb-10 space-y-6">
        {character.classes.length === 0 ? (
          <p className="text-stone-700 text-xs italic">Zatím žádná zvolená povolání...</p>
        ) : (
          character.classes.map((charClass) => {
            const isExpanded = expandedClasses.includes(charClass.name);
            const classSkills = (classSkillsData as Record<string, string[]>)[charClass.name] || [];

            return (
              <div key={charClass.name} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-lg transition-all">
                <button 
                  onClick={() => toggleClass(charClass.name)}
                  className="w-full flex items-center justify-between p-4 bg-stone-800/20 hover:bg-stone-800/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="fantasy-title text-base font-bold text-amber-500 tracking-wide">{charClass.name}</span>
                    <span className="text-[10px] bg-stone-950 px-2 py-0.5 rounded-full text-stone-600 font-mono border border-stone-800">Lvl {charClass.level}</span>
                  </div>
                  <i className={`fas fa-chevron-down text-stone-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                </button>
                {isExpanded && (
                  <div className="p-4 bg-stone-950/20 animate-fade-in space-y-3">
                    {classSkills.length > 0 ? (
                      classSkills.map((s, idx) => {
                        const isHeader = s.startsWith('**');
                        return (
                          <div 
                            key={idx} 
                            className={`text-xs leading-relaxed ${isHeader ? 'mt-4 first:mt-0 text-stone-200 border-b border-stone-800/50 pb-1' : 'pl-3 text-stone-400 relative before:content-[""] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-stone-700 before:rounded-full'}`}
                          >
                            {formatSkillText(s)}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-[10px] text-stone-700 italic">Dovednosti pro toto povolání nebyly nalezeny.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      <section className="flex-1">
        <h3 className="fantasy-title text-lg text-emerald-600/80 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <i className="fas fa-pen-nib"></i> Vlastní poznámky
        </h3>
        <textarea 
          className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-5 text-sm text-emerald-400/80 min-h-[200px] focus:outline-none focus:border-emerald-900/50 resize-none leading-relaxed transition-all shadow-inner"
          placeholder="Doplňkové triky, rituály, mistrovství..."
          value={character.skills}
          onChange={(e) => updateCharacter({ skills: e.target.value })}
        />
      </section>
    </div>
  );
};

export default Skills;