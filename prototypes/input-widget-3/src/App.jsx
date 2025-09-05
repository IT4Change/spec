
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import SmartPostWidget from '@/components/SmartPostWidget';

function App() {
  return (
    <>
      <Helmet>
        <title>Social App - Smart Post Widget</title>
        <meta name="description" content="Eine intelligente Social App mit vielseitigem Post-Widget für verschiedene Inhaltstypen" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Smart Social Widget
            </h1>
            <p className="text-gray-300 text-lg">
              Teile Videos, Artikel, Events, Fragen und vieles mehr mit einem intelligenten Interface
            </p>
          </motion.div>

          <SmartPostWidget />
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
