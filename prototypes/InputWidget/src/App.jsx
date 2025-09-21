import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import SmartPostWidget from '@/components/SmartPostWidget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
      <Helmet>
        <title>Social App - Smart Post Widget</title>
        <meta name="description" content="Eine intelligente Social App mit vielseitigem Post-Widget für verschiedene Inhaltstypen" />
      </Helmet>
      <DndProvider backend={HTML5Backend}>
        <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 sm:p-6 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <SmartPostWidget />
          </div>
        </main>
        <Toaster />
      </DndProvider>
    </>
  );
}

export default App;