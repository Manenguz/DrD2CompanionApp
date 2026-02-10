import React, { useState } from 'react';
import { Character, Race } from '../types';
import classSkillsData from '../class-skills';

const RACIAL_ABILITIES: Record<string, { name: string, desc: string, cost?: string }[]> = {
  [Race.Clovek]: [
    { name: "Jménem krále", desc: "Každá jizva dává 1 zdroj navíc při prosazování zájmů pána v ohrožení života.", cost: "Duše" },
    { name: "Zarputilost", desc: "Z každé jizvy na Vlivu získává postava vždy 1 zdroj navíc.", cost: "Vliv" },
    { name: "Idol žen či mužů", desc: "Nadání pro svádění a získávání přízně opačného pohlaví.", cost: "Vliv" },
    { name: "Lví srdce", desc: "Nadání čelit zastrašování či psychickému nátlaku.", cost: "Duše" },
    { name: "Styky", desc: "Cizí postava dluží hrdinovi laskavost z minulosti.", cost: "1 Vliv" },
  ],
  [Race.Elf]: [
    { name: "Vznešenost", desc: "Na hojení jizev na Vlivu stačí vynaložit o 1 zdroj méně.", cost: "Vliv" },
    { name: "Tesknota", desc: "Z každé duševní jizvy získává postava vždy 1 zdroj navíc.", cost: "Duše" },
    { name: "Jsme jedné krve", desc: "Nadání pro odhadování úmyslů zvířat a jejich přesvěvčování.", cost: "Vliv" },
    { name: "Plášť soumraku", desc: "Nadání pro skrývání se ve tmě.", cost: "Duše" },
    { name: "Paměť rodu", desc: "Znalost historie místa starší než 12 let.", cost: "1 Duše" },
  ],
  [Race.Trpaslik]: [
    { name: "Noční oči", desc: "Schopnost vidět ve tmě.", cost: "Duše" },
    { name: "Síla přísahy", desc: "Zdroj navíc při plnění přísahy.", cost: "Duše" },
    { name: "Nezdolnost", desc: "Levnější hojení tělesných jizev.", cost: "Tělo" },
    { name: "Játra ze žuly", desc: "Nadání čelit jedům a drogám.", cost: "Tělo" },
    { name: "Pouto krve", desc: "Vazby na trpasličí rod.", cost: "1 Vliv" },
  ],
  [Race.Hobit]: [
    { name: "Šestý smysl", desc: "Rozpozná hrozící nebezpečí.", cost: "Duše" },
    { name: "Takový prcek!", desc: "Zdroj navíc v boji s větším nepřítelem.", cost: "Duše" },
    { name: "Dobrá nálada", desc: "Levnější hojení duševních jizev.", cost: "Duše" },
    { name: "Tichošlápek", desc: "Nadání pro tichý pohyb naboso.", cost: "Tělo" },
    { name: "Labužník", desc: "Zlepšení nálady jídlem.", cost: "1 Duše" },
  ],
  [Race.Kroll]: [
    { name: "Netopýří sluch", desc: "Orientace sluchem ve tmě.", cost: "Duše" },
    { name: "Zběsilost", desc: "Zdroj navíc z tělesných jizev.", cost: "Tělo" },
    { name: "Odznaky hrdinství", desc: "Nadání pro zastrašování.", cost: "Vliv" },
    { name: "Zubří kůže", desc: "Přirozená ochrana pokožky.", cost: "Tělo" },
    { name: "Kořeny magie", desc: "Hledání magických zřídel.", cost: "1 Vliv" },
  ]
};

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

  const selectedRacialData = RACIAL_ABILITIES[character.race]?.find(a => a.name === character.racialAbility);

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-y-auto scrollbar-hide pb-24">
      <h2 className="fantasy-title text-2xl mb-6 text-amber-500 border-b border-amber-900/30 pb-2">Schopnosti</h2>
      
      {/* Permanent Racial Ability Display */}
      {character.racialAbility && selectedRacialData && (
        <section className="mb-10 animate-fade-in">
          {/*<h3 className="fantasy-title text-lg text-stone-400 mb-4 flex items-center gap-2 uppercase tracking-widest border-l-4 border-rose-900 pl-3">
            <i className="fas fa-dna text-rose-900"></i> Zvláštní rasová schopnost ({character.race})
          </h3>*/}
          <div className="bg-rose-900/10 border border-rose-500/30 p-5 rounded-2xl shadow-xl">
             <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-rose-400 uppercase tracking-wider">{selectedRacialData.name}</span>
                {selectedRacialData.cost && <span className="text-[9px] font-bold text-stone-600 bg-stone-950 px-2 py-0.5 rounded uppercase">{selectedRacialData.cost}</span>}
             </div>
             <p className="text-xs text-stone-400 leading-relaxed italic">{selectedRacialData.desc}</p>
          </div>
        </section>
      )}

      {/* Class Abilities Section */}
      <section className="mb-10 space-y-6">
        {/*<h3 className="fantasy-title text-lg text-stone-400 mb-4 flex items-center gap-2 uppercase tracking-widest border-l-4 border-amber-700 pl-3">
          <i className="fas fa-book-sparkles text-amber-700"></i> Dovednosti
        </h3>*/}
        
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

      {/* Custom Abilities */}
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
