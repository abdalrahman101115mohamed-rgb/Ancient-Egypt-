/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CartoucheStudio } from './components/CartoucheStudio';
import { AlphabetExplorer } from './components/AlphabetExplorer';
import { InteractiveLessons } from './components/InteractiveLessons';
import { FlashcardQuiz } from './components/FlashcardQuiz';
import { SacredDictionary } from './components/SacredDictionary';
import { ScribeTutor } from './components/ScribeTutor';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('cartouche');

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f4efe6] flex flex-col font-sans selection:bg-[#d4a359]/30 selection:text-[#faebd7]">
      {/* Top Bar adhering to 3-zone contract */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Learning Hub */}
      <main className="flex-1">
        {/* Hero is shown prominently on hero tab or cartouche view start */}
        {activeTab === 'hero' && (
          <Hero
            onStartCartouche={() => setActiveTab('cartouche')}
            onExploreAlphabet={() => setActiveTab('alphabet')}
            onStartLessons={() => setActiveTab('lessons')}
          />
        )}

        {/* Dynamic Interactive Workspaces */}
        {activeTab === 'cartouche' && (
          <div>
            <Hero
              onStartCartouche={() => setActiveTab('cartouche')}
              onExploreAlphabet={() => setActiveTab('alphabet')}
              onStartLessons={() => setActiveTab('lessons')}
            />
            <CartoucheStudio />
          </div>
        )}

        {activeTab === 'alphabet' && <AlphabetExplorer />}

        {activeTab === 'lessons' && <InteractiveLessons />}

        {activeTab === 'quiz' && <FlashcardQuiz />}

        {activeTab === 'dictionary' && <SacredDictionary />}

        {activeTab === 'scribe' && <ScribeTutor />}
      </main>

      {/* Museum Archival Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
