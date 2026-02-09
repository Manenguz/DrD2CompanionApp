
import React from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const Journal: React.FC<Props> = ({ character, updateCharacter }) => {
  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-y-auto scrollbar-hide pb-24">
      <h2 className="fantasy-title text-2xl mb-6 text-amber-500 border-b border-amber-900/30 pb-2">Příběh</h2>
      
      <section className="flex-1">
        <h3 className="fantasy-title text-lg text-amber-600/80 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <i className="fas fa-scroll"></i> Osudy hrdiny
        </h3>
        <textarea 
          className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-4 text-sm text-stone-400 h-full min-h-[400px] focus:outline-none focus:border-amber-900/50 focus:ring-1 focus:ring-amber-900/20 transition-all shadow-inner resize-none italic leading-relaxed"
          placeholder="Jak tvé putování začalo? Kdo jsou tví spojenci? Jaká tajemství skrývá tvá minulost?"
          value={character.notes}
          onChange={(e) => updateCharacter({ notes: e.target.value })}
        />
      </section>

      <div className="mt-8 text-center opacity-10">
        <i className="fas fa-dragon text-5xl text-stone-600"></i>
      </div>
    </div>
  );
};

export default Journal;
