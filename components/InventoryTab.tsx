import React from 'react';
import { Character, Money } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const InventoryTab: React.FC<Props> = ({ character, updateCharacter }) => {
  const money = character.money || { dukat: 0, gros: 0, halir: 0 };

  const updateMoney = (key: keyof Money, delta: number) => {
    const newMoney = { ...money, [key]: Math.max(0, money[key] + delta) };
    updateCharacter({ money: newMoney });
  };

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-y-auto scrollbar-hide pb-24">
      <h2 className="fantasy-title text-2xl mb-6 text-amber-500 border-b border-amber-900/30 pb-2">Inventář</h2>
      
      {/* Money Section */}
      <section className="mb-8">
        <h3 className="fantasy-title text-lg text-amber-600 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <i className="fas fa-coins text-amber-500"></i> Měšec
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Dukaty */}
          <div className="bg-stone-900 border border-amber-900/30 rounded-2xl p-3 flex flex-col items-center shadow-lg">
            <div className="flex items-center gap-1 mb-2">
              <i className="fas fa-circle text-amber-400 text-[10px]"></i>
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Dukáty</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateMoney('dukat', -1)} className="w-6 h-6 rounded-full bg-stone-950 text-stone-600 hover:text-amber-500 border border-stone-800 flex items-center justify-center transition-colors">
                <i className="fas fa-minus text-[10px]"></i>
              </button>
              <span className="font-bold text-amber-400 text-lg min-w-[1.5rem] text-center">{money.dukat}</span>
              <button onClick={() => updateMoney('dukat', 1)} className="w-6 h-6 rounded-full bg-stone-950 text-stone-600 hover:text-amber-500 border border-stone-800 flex items-center justify-center transition-colors">
                <i className="fas fa-plus text-[10px]"></i>
              </button>
            </div>
          </div>

          {/* Grose */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 flex flex-col items-center shadow-lg">
            <div className="flex items-center gap-1 mb-2">
              <i className="fas fa-circle text-stone-400 text-[10px]"></i>
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Groše</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateMoney('gros', -1)} className="w-6 h-6 rounded-full bg-stone-950 text-stone-600 hover:text-stone-300 border border-stone-800 flex items-center justify-center transition-colors">
                <i className="fas fa-minus text-[10px]"></i>
              </button>
              <span className="font-bold text-stone-300 text-lg min-w-[1.5rem] text-center">{money.gros}</span>
              <button onClick={() => updateMoney('gros', 1)} className="w-6 h-6 rounded-full bg-stone-950 text-stone-600 hover:text-stone-300 border border-stone-800 flex items-center justify-center transition-colors">
                <i className="fas fa-plus text-[10px]"></i>
              </button>
            </div>
          </div>

          {/* Halire */}
          <div className="bg-stone-900 border border-rose-950/30 rounded-2xl p-3 flex flex-col items-center shadow-lg">
            <div className="flex items-center gap-1 mb-2">
              <i className="fas fa-circle text-orange-800 text-[10px]"></i>
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Halíře</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateMoney('halir', -1)} className="w-6 h-6 rounded-full bg-stone-950 text-stone-600 hover:text-orange-400 border border-stone-800 flex items-center justify-center transition-colors">
                <i className="fas fa-minus text-[10px]"></i>
              </button>
              <span className="font-bold text-orange-600 text-lg min-w-[1.5rem] text-center">{money.halir}</span>
              <button onClick={() => updateMoney('halir', 1)} className="w-6 h-6 rounded-full bg-stone-950 text-stone-600 hover:text-orange-400 border border-stone-800 flex items-center justify-center transition-colors">
                <i className="fas fa-plus text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
        <p className="text-[8px] text-stone-700 mt-2 text-center uppercase tracking-widest">
          1 Dukát = 10 Grošů • 1 Groš = 10 Halířů
        </p>
      </section>

      {/* Equipment Section */}
      <section className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-3">
          <h3 className="fantasy-title text-lg text-amber-700 mb-0 flex items-center gap-2 uppercase tracking-wider">
            <i className="fas fa-briefcase"></i> Vybavení
          </h3>
          <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">
            {character.inventory.filter(i => i.trim()).length} položek
          </span>
        </div>
        <textarea 
          className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-4 text-sm text-stone-300 flex-1 min-h-[250px] focus:outline-none focus:border-amber-900/50 focus:ring-1 focus:ring-amber-900/20 transition-all shadow-inner resize-none leading-relaxed"
          placeholder="Zbraně, brnění, léčivé lektvary..."
          value={character.inventory.join('\n')}
          onChange={(e) => updateCharacter({ inventory: e.target.value.split('\n') })}
        />
      </section>
      
      <div className="mt-8 text-center opacity-10">
        <i className="fas fa-shield-halved text-5xl text-stone-600"></i>
      </div>
    </div>
  );
};

export default InventoryTab;