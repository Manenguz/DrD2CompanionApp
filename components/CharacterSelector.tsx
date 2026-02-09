import React, { useState } from 'react';
import { Character } from '../types';

interface Props {
  characters: Character[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

const CharacterSelector: React.FC<Props> = ({ characters, onSelect, onDelete, onCreateNew }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirmDeleteId === id) {
      onDelete(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-stone-950 p-6 overflow-y-auto scrollbar-hide">
      <div className="text-center mt-8 mb-12">
        <h1 className="fantasy-title text-4xl text-amber-500 mb-2 drop-shadow-lg">Dračí doupě 2</h1>
        <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em]">Kubíkův DrD pomocníček</p>
      </div>

      <div className="space-y-4">
        {characters.map((char) => {
          const isConfirming = confirmDeleteId === char.id;
          
          return (
            <div 
              key={char.id}
              className={`bg-stone-900 border ${isConfirming ? 'border-rose-900' : 'border-stone-800'} rounded-3xl p-5 relative overflow-hidden group shadow-xl active:scale-[0.98] transition-all cursor-pointer`}
              onClick={() => {
                if (isConfirming) {
                  setConfirmDeleteId(null);
                } else {
                  onSelect(char.id);
                }
              }}
            >
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="fantasy-title text-xl text-stone-200 group-hover:text-amber-400 transition-colors">{char.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-stone-500 font-bold uppercase">{char.race}</span>
                    <span className="text-stone-800">•</span>
                    <span className="text-[10px] text-stone-500 font-bold uppercase">Lvl {char.classes.reduce((s, c) => s + c.level, 0)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isConfirming && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(null);
                      }}
                      className="px-3 py-1 text-[10px] font-bold uppercase text-stone-500 hover:text-stone-300 transition-colors"
                    >
                      Zrušit
                    </button>
                  )}
                  <button 
                    onClick={(e) => handleDeleteClick(e, char.id)}
                    className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                      isConfirming 
                        ? 'bg-rose-900 text-rose-100 px-4' 
                        : 'text-stone-600 hover:text-rose-500'
                    }`}
                  >
                    {isConfirming ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest">Smazat?</span>
                    ) : (
                      <i className="fas fa-trash-can"></i>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex gap-1 relative z-10">
                {char.classes.map(c => (
                  <span key={c.name} className="text-[8px] bg-stone-950 text-stone-400 px-2 py-0.5 rounded-full border border-stone-800">
                    {c.name}
                  </span>
                ))}
              </div>

              <div className="absolute -right-4 -bottom-4 opacity-10 text-stone-500 group-hover:text-amber-500 transition-all">
                 <i className={`fas ${char.race === 'Kroll' ? 'fa-mountain' : char.race === 'Elf' ? 'fa-leaf' : 'fa-fort-awesome'} text-6xl`}></i>
              </div>
            </div>
          );
        })}

        <button 
          onClick={onCreateNew}
          className="w-full border-2 border-dashed border-stone-800 rounded-3xl py-12 flex flex-col items-center justify-center gap-3 text-stone-700 hover:text-amber-500 hover:border-amber-900/50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full border-2 border-stone-800 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/10">
            <i className="fas fa-plus"></i>
          </div>
          <span className="fantasy-title uppercase text-sm tracking-widest">Zrodit novou legendu</span>
        </button>
      </div>
      
      <div className="mt-12 text-center opacity-10">
        <i className="fas fa-dragon text-5xl"></i>
      </div>
    </div>
  );
};

export default CharacterSelector;