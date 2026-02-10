
import React, { useState } from 'react';
import { Character, Money } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const InventoryTab: React.FC<Props> = ({ character, updateCharacter }) => {
  const [newItemName, setNewItemName] = useState('');
  const money = character.money || { dukat: 0, gros: 0, halir: 0 };

  const updateMoney = (key: keyof Money, delta: number) => {
    const newMoney = { ...money, [key]: Math.max(0, money[key] + delta) };
    updateCharacter({ money: newMoney });
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newInventory = [...character.inventory, newItemName.trim()];
    updateCharacter({ inventory: newInventory });
    setNewItemName('');
  };

  const removeItem = (index: number) => {
    const newInventory = character.inventory.filter((_, i) => i !== index);
    updateCharacter({ inventory: newInventory });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const activeInventory = character.inventory.filter(i => i && i.trim());

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-y-auto scrollbar-hide pb-32">
      {/* Unified Header Style */}
      <div className="flex justify-between items-center mb-6 border-b border-amber-900/30 pb-2 shrink-0">
        <h2 className="fantasy-title text-2xl text-amber-500">Inventář</h2>
        <div className="flex items-center gap-2">
           <i className="fas fa-sack-xmark text-stone-800 text-lg"></i>
        </div>
      </div>
      
      {/* Money Section */}
      <section className="mb-8 shrink-0">
        <h3 className="fantasy-title text-sm text-amber-600 mb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
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
              <button onClick={() => updateMoney('dukat', -1)} className="w-7 h-7 rounded-full bg-stone-950 text-stone-600 hover:text-amber-500 border border-stone-800 flex items-center justify-center transition-all active:scale-90">
                <i className="fas fa-minus text-[10px]"></i>
              </button>
              <span className="font-bold text-amber-400 text-lg min-w-[1.2rem] text-center font-mono">{money.dukat}</span>
              <button onClick={() => updateMoney('dukat', 1)} className="w-7 h-7 rounded-full bg-stone-950 text-stone-600 hover:text-amber-500 border border-stone-800 flex items-center justify-center transition-all active:scale-90">
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
              <button onClick={() => updateMoney('gros', -1)} className="w-7 h-7 rounded-full bg-stone-950 text-stone-600 hover:text-stone-300 border border-stone-800 flex items-center justify-center transition-all active:scale-90">
                <i className="fas fa-minus text-[10px]"></i>
              </button>
              <span className="font-bold text-stone-300 text-lg min-w-[1.2rem] text-center font-mono">{money.gros}</span>
              <button onClick={() => updateMoney('gros', 1)} className="w-7 h-7 rounded-full bg-stone-950 text-stone-600 hover:text-stone-300 border border-stone-800 flex items-center justify-center transition-all active:scale-90">
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
              <button onClick={() => updateMoney('halir', -1)} className="w-7 h-7 rounded-full bg-stone-950 text-stone-600 hover:text-orange-400 border border-stone-800 flex items-center justify-center transition-all active:scale-90">
                <i className="fas fa-minus text-[10px]"></i>
              </button>
              <span className="font-bold text-orange-600 text-lg min-w-[1.2rem] text-center font-mono">{money.halir}</span>
              <button onClick={() => updateMoney('halir', 1)} className="w-7 h-7 rounded-full bg-stone-950 text-stone-600 hover:text-orange-400 border border-stone-800 flex items-center justify-center transition-all active:scale-90">
                <i className="fas fa-plus text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
        <p className="text-[8px] text-stone-700 mt-3 text-center uppercase tracking-[0.2em] font-bold">
          1 Dukát = 10 Grošů • 1 Groš = 10 Halířů
        </p>
      </section>

      {/* Equipment Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end mb-1 border-b border-stone-800 pb-1">
          <h3 className="fantasy-title text-sm text-amber-700 mb-0 flex items-center gap-2 uppercase tracking-[0.2em]">
            <i className="fas fa-briefcase"></i> Vybavení
          </h3>
          <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">
            {activeInventory.length} položek
          </span>
        </div>

        {/* Add Item Input */}
        <div className="flex gap-2">
          <input 
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Přidat předmět..."
            className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-900/50 transition-all shadow-inner placeholder:text-stone-700"
          />
          <button 
            onClick={addItem}
            className="w-12 h-12 bg-amber-900/20 border border-amber-900/40 text-amber-500 rounded-xl flex items-center justify-center active:scale-90 transition-all hover:bg-amber-900/30 shrink-0"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        {/* Item List */}
        <div className="space-y-2">
          {activeInventory.length > 0 ? (
            activeInventory.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between bg-stone-900/40 border border-stone-800/60 rounded-xl p-3 animate-fade-in hover:border-stone-700 transition-colors group"
              >
                <span className="text-xs text-stone-300 font-medium">{item}</span>
                <button 
                  onClick={() => removeItem(idx)}
                  className="text-stone-700 hover:text-rose-500 p-2 transition-colors active:scale-90"
                >
                  <i className="fas fa-trash-can text-[10px]"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 opacity-20 flex flex-col items-center gap-3">
              <i className="fas fa-box-open text-4xl"></i>
              <p className="text-[10px] uppercase font-bold tracking-widest">Máš prázdné brašny</p>
            </div>
          )}
        </div>
      </section>
      
      <div className="mt-12 text-center opacity-10">
        <i className="fas fa-shield-halved text-5xl text-stone-600"></i>
      </div>
    </div>
  );
};

export default InventoryTab;
