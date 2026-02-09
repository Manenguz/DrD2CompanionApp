import React, { useState } from 'react';
import { DiceResult } from '../types';

interface InternalDiceResult extends DiceResult {
  removedIndex?: number;
}

const DiceRoller: React.FC = () => {
  const [lastRoll, setLastRoll] = useState<InternalDiceResult | null>(null);
  const [initiative, setInitiative] = useState<number | null>(null);

  const rollDrD = (type: 'advantage' | 'normal' | 'disadvantage') => {
    const count = (type === 'normal') ? 2 : 3;
    const rawResults: number[] = [];
    for (let i = 0; i < count; i++) {
      rawResults.push(Math.floor(Math.random() * 6) + 1);
    }

    let removedIndex: number | undefined = undefined;
    let total = 0;

    if (type === 'advantage') {
      // Find index of the lowest value to remove
      let minVal = 7;
      rawResults.forEach((val, idx) => {
        if (val < minVal) {
          minVal = val;
          removedIndex = idx;
        }
      });
      total = rawResults.reduce((acc, val, idx) => acc + (idx === removedIndex ? 0 : val), 0);
    } else if (type === 'disadvantage') {
      // Find index of the highest value to remove
      let maxVal = 0;
      rawResults.forEach((val, idx) => {
        if (val > maxVal) {
          maxVal = val;
          removedIndex = idx;
        }
      });
      total = rawResults.reduce((acc, val, idx) => acc + (idx === removedIndex ? 0 : val), 0);
    } else {
      total = rawResults.reduce((acc, val) => acc + val, 0);
    }

    const result: InternalDiceResult = {
      sides: 6,
      count,
      results: rawResults,
      total,
      removedIndex,
      type,
      timestamp: Date.now()
    };
    setLastRoll(result);
  };

  const rollInitiative = () => {
    const r1 = Math.floor(Math.random() * 6) + 1;
    const r2 = Math.floor(Math.random() * 6) + 1;
    const total = r1 + r2;
    setInitiative(total);
    
    const result: InternalDiceResult = {
      sides: 6,
      count: 2,
      results: [r1, r2],
      total: total,
      type: 'initiative',
      timestamp: Date.now()
    };
    setLastRoll(result);
  };

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-4 border-b border-amber-900/30 pb-2 shrink-0">
        <h2 className="fantasy-title text-2xl text-amber-500">Hody Osudu</h2>
        {initiative !== null && (
          <div className="flex items-center gap-2 bg-rose-950/30 border border-rose-900/50 px-3 py-1 rounded-full animate-fade-in shadow-inner">
             <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest">Iniciativa:</span>
             <span className="text-sm font-black text-rose-400 font-mono">{initiative}</span>
          </div>
        )}
      </div>

      {/* Main Result Area (Middle) */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
        {lastRoll ? (
          <div className="text-center animate-fade-in flex flex-col items-center" key={lastRoll.timestamp}>
            <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${
              lastRoll.type === 'advantage' ? 'text-emerald-500' : 
              lastRoll.type === 'disadvantage' ? 'text-rose-500' : 
              lastRoll.type === 'initiative' ? 'text-rose-400' : 'text-amber-500'
            }`}>
              {lastRoll.type === 'initiative' ? 'Poslední Iniciativa' : 
               lastRoll.type === 'advantage' ? 'Výhoda' : 
               lastRoll.type === 'disadvantage' ? 'Nevýhoda' : 'Základní Hod'}
            </span>
            
            <div className="text-9xl font-black text-stone-100 drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] mb-6 font-mono leading-none">
              {lastRoll.total}
            </div>

            <div className="flex gap-3 items-center justify-center">
              {lastRoll.results.map((r, idx) => {
                const isRemoved = idx === lastRoll.removedIndex;
                
                return (
                  <div key={idx} className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 text-xl font-bold transition-all ${
                    isRemoved 
                      ? 'border-rose-900/40 text-rose-800/70 bg-rose-950/10 line-through scale-90 opacity-70' 
                      : 'border-amber-900/50 text-amber-500 bg-stone-900 shadow-xl'
                  }`}>
                    {r}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center opacity-20 flex flex-col items-center gap-6">
            <i className="fas fa-dice-d6 text-7xl animate-pulse"></i>
            <p className="fantasy-title text-sm tracking-widest uppercase">Osud čeká na tvůj tah</p>
          </div>
        )}
      </div>

      {/* Bottom Controls - Unified 2x2 Grid */}
      <div className="shrink-0 pb-24 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Top Row: Main rolls */}
          <button
            onClick={() => rollDrD('normal')}
            className="flex flex-col items-center justify-center py-4 rounded-2xl bg-stone-900 border border-stone-800 active:scale-95 transition-all hover:bg-amber-950/20 group shadow-lg"
          >
            <i className="fas fa-dice text-amber-500 mb-1.5 text-lg"></i>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Základ</span>
          </button>

          <button
            onClick={rollInitiative}
            className="flex flex-col items-center justify-center py-4 rounded-2xl bg-stone-900 border border-stone-800 active:scale-95 transition-all hover:bg-rose-950/20 group shadow-lg"
          >
            <i className="fas fa-bolt text-rose-500 mb-1.5 text-lg"></i>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Iniciativa</span>
          </button>

          {/* Bottom Row: Modifiers */}
          <button
            onClick={() => rollDrD('disadvantage')}
            className="flex flex-col items-center justify-center py-4 rounded-2xl bg-stone-900 border border-stone-800 active:scale-95 transition-all hover:bg-rose-950/30 group shadow-lg"
          >
            <i className="fas fa-angles-down text-rose-600 mb-1.5 text-lg"></i>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Nevýhoda</span>
          </button>

          <button
            onClick={() => rollDrD('advantage')}
            className="flex flex-col items-center justify-center py-4 rounded-2xl bg-stone-900 border border-stone-800 active:scale-95 transition-all hover:bg-emerald-950/20 group shadow-lg"
          >
            <i className="fas fa-angles-up text-emerald-600 mb-1.5 text-lg"></i>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Výhoda</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;