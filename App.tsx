import React, { useState, useEffect } from 'react';
import { Character, Race, SlotState } from './types';
import CharacterSheet from './components/CharacterSheet';
import DiceRoller from './components/DiceRoller';
import Skills from './components/Skills';
import InventoryTab from './components/InventoryTab';
import Specializations from './components/Specializations';
import CharacterSelector from './components/CharacterSelector';
import CharacterCreator from './components/CharacterCreator';

const App: React.FC = () => {
  const [view, setView] = useState<'selector' | 'creator' | 'active'>('selector');
  const [activeTab, setActiveTab] = useState<'sheet' | 'skills' | 'inventory' | 'dice' | 'special'>('sheet');
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('drd_characters_v8');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('drd_characters_v8', JSON.stringify(characters));
  }, [characters]);

  const activeCharacter = characters.find(c => c.id === activeId);

  const updateCharacter = (updates: Partial<Character>) => {
    if (!activeId) return;
    setCharacters(prev => prev.map(c => c.id === activeId ? { ...c, ...updates } : c));
  };

  const handleCreate = (newChar: Character) => {
    setCharacters(prev => [...prev, newChar]);
    setActiveId(newChar.id);
    setView('active');
  };

  const handleSelect = (id: string) => {
    setActiveId(id);
    setView('active');
  };

  const handleDelete = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  if (view === 'selector') {
    return <CharacterSelector 
      characters={characters} 
      onSelect={handleSelect} 
      onDelete={handleDelete} 
      onCreateNew={() => setView('creator')} 
    />;
  }

  if (view === 'creator') {
    return <CharacterCreator 
      onCancel={() => setView('selector')} 
      onCreate={handleCreate} 
    />;
  }

  if (!activeCharacter) {
    setView('selector');
    return null;
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden bg-stone-950">
      <header className="h-12 bg-stone-900 border-b border-stone-800 flex items-center px-4 justify-between shrink-0">
        <button onClick={() => setView('selector')} className="text-stone-500 hover:text-amber-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <i className="fas fa-chevron-left"></i> Krčma
        </button>
        <span className="fantasy-title text-amber-500 text-xl truncate max-w-[200px] font-bold">{activeCharacter.name}</span>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'sheet' && (
          <CharacterSheet character={activeCharacter} updateCharacter={updateCharacter} />
        )}
        {activeTab === 'dice' && (
          <DiceRoller />
        )}
        {activeTab === 'special' && (
          <Specializations character={activeCharacter} updateCharacter={updateCharacter} />
        )}
        {activeTab === 'skills' && (
          <Skills character={activeCharacter} updateCharacter={updateCharacter} />
        )}
        {activeTab === 'inventory' && (
          <InventoryTab character={activeCharacter} updateCharacter={updateCharacter} />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-stone-900/98 backdrop-blur-md border-t border-stone-800 flex justify-around items-center h-16 px-0.5 z-50">
        <button onClick={() => setActiveTab('sheet')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'sheet' ? 'text-amber-500' : 'text-stone-500'}`}>
          <i className="fas fa-id-card text-base mb-1"></i>
          <span className="text-[7px] font-bold uppercase tracking-tighter">Hrdina</span>
        </button>
        <button onClick={() => setActiveTab('dice')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'dice' ? 'text-amber-500' : 'text-stone-500'}`}>
          <i className="fas fa-dice text-base mb-1"></i>
          <span className="text-[7px] font-bold uppercase tracking-tighter">Kostky</span>
        </button>
        <button onClick={() => setActiveTab('special')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'special' ? 'text-amber-500' : 'text-stone-500'}`}>
          <i className="fas fa-wand-magic-sparkles text-base mb-1"></i>
          <span className="text-[7px] font-bold uppercase tracking-tighter">Speciálky</span>
        </button>
        <button onClick={() => setActiveTab('skills')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'skills' ? 'text-amber-500' : 'text-stone-500'}`}>
          <i className="fas fa-hand-fist text-base mb-1"></i>
          <span className="text-[7px] font-bold uppercase tracking-tighter">Schopnosti</span>
        </button>
        <button onClick={() => setActiveTab('inventory')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'inventory' ? 'text-amber-500' : 'text-stone-500'}`}>
          <i className="fas fa-sack-xmark text-base mb-1"></i>
          <span className="text-[7px] font-bold uppercase tracking-tighter">Inventář</span>
        </button>
      </nav>
    </div>
  );
};

export default App;