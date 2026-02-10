import React, { useState } from 'react';
import { Character, Race, SlotState } from '../types';
import { RACIAL_ABILITIES_DATA } from '../data/racial-abilities';

const BASE_CLASSES = ['Bojovník', 'Mastičkář', 'Zaříkávač', 'Lovec', 'Kejklíř'];

interface Props {
  onCreate: (newChar: Character) => void;
  onCancel: () => void;
}

const CharacterCreator: React.FC<Props> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('');
  const [race, setRace] = useState<Race>(Race.Clovek);
  const [ability, setAbility] = useState('');
  const [profession, setProfession] = useState(BASE_CLASSES[0]);
  const [telo, setTelo] = useState(5);
  const [vule, setVule] = useState(5);
  const [vliv, setVliv] = useState(5);

  const totalPoints = telo + vule + vliv;
  const pointsLeft = 15 - totalPoints;

  const handleCreate = () => {
    if (!name || !ability || pointsLeft !== 0) return;

    const createPool = (max: number) => ({
      max,
      slots: Array(max).fill(SlotState.Available)
    });

    const newChar: Character = {
      id: Date.now().toString(),
      name,
      race,
      classes: [{ name: profession, level: 1 }],
      xp: 0,
      telo: createPool(telo),
      vule: createPool(vule),
      vliv: createPool(vliv),
      inventory: [],
      money: { dukat: 0, gros: 0, halir: 0 },
      notes: '',
      skills: '',
      racialAbility: ability,
      classAbilities: {}
    };

    onCreate(newChar);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-stone-950 p-6 overflow-y-auto scrollbar-hide">
      <header className="flex justify-between items-center mb-8 shrink-0">
        <button onClick={onCancel} className="text-stone-500 hover:text-white uppercase text-[10px] font-bold tracking-widest">Zpět</button>
        <h2 className="fantasy-title text-xl text-amber-500">Nový Hrdina</h2>
        <div className="w-10"></div>
      </header>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em] mb-2 block">Jméno hrdiny</label>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-4 text-stone-200 focus:outline-none focus:border-amber-900/50"
            placeholder="např. Thranduil..."
          />
        </div>

        <div>
          <label className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em] mb-2 block">Rasa</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Race).map(r => (
              <button
                key={r}
                onClick={() => { setRace(r); setAbility(''); }}
                className={`py-2 px-3 rounded-xl border text-[11px] font-bold uppercase transition-all ${race === r ? 'bg-amber-900/20 border-amber-500 text-amber-500' : 'bg-stone-900 border-stone-800 text-stone-600'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em] mb-2 block">Zvláštní rasová schopnost</label>
          <div className="space-y-2">
            {RACIAL_ABILITIES_DATA[race].map(a => (
              <button
                key={a.name}
                onClick={() => setAbility(a.name)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${ability === a.name ? 'bg-rose-900/10 border-rose-500/50' : 'bg-stone-900 border-stone-800'}`}
              >
                <div className="text-[11px] font-bold text-stone-300 uppercase mb-1">{a.name}</div>
                {a.flavor && <div className="text-[9px] text-stone-500 italic mb-1">"{a.flavor}"</div>}
                <div className="text-[9px] text-stone-600 leading-tight">{a.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-inner">
          <div className="flex justify-between items-center mb-4">
             <label className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em]">Atributy (15 bodů)</label>
             <span className={`text-xs font-bold ${pointsLeft === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
               Zbývá: {pointsLeft}
             </span>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Tělo', val: telo, set: setTelo, color: 'text-emerald-500' },
              { label: 'Vůle', val: vule, set: setVule, color: 'text-blue-500' },
              { label: 'Vliv', val: vliv, set: setVliv, color: 'text-amber-500' }
            ].map(stat => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className={`text-xs font-bold uppercase ${stat.color}`}>{stat.label}</span>
                <div className="flex items-center gap-4 bg-stone-950 px-3 py-1 rounded-full border border-stone-800">
                  <button onClick={() => stat.set(Math.max(1, stat.val - 1))} className="text-stone-600 hover:text-white"><i className="fas fa-minus text-xs"></i></button>
                  <span className="font-bold text-stone-200 min-w-[1rem] text-center">{stat.val}</span>
                  <button onClick={() => pointsLeft > 0 && stat.set(stat.val + 1)} className="text-stone-600 hover:text-white"><i className="fas fa-plus text-xs"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em] mb-2 block">Povolání</label>
          <div className="grid grid-cols-2 gap-2">
            {BASE_CLASSES.map(c => (
              <button
                key={c}
                onClick={() => setProfession(c)}
                className={`py-2 px-3 rounded-xl border text-[11px] font-bold uppercase transition-all ${profession === c ? 'bg-amber-900/20 border-amber-500 text-amber-500' : 'bg-stone-900 border-stone-800 text-stone-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={!name || !ability || pointsLeft !== 0}
          className="w-full py-4 mt-6 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold uppercase tracking-widest shadow-xl disabled:opacity-30 transition-all active:scale-95"
        >
          Přijmout osud
        </button>
      </div>
      <div className="h-12 shrink-0"></div>
    </div>
  );
};

export default CharacterCreator;