
import React from 'react';
import { Helmet } from 'react-helmet';
import ProfilePrototype from '@/components/ProfilePrototype';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Profil Prototyp - Flexible Detailansichten</title>
        <meta name="description" content="Flexibles Profil-System für verschiedene Item-Typen mit konfigurierbaren Subkomponenten" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <ProfilePrototype />
        <Toaster />
      </div>
    </>
  );
}

export default App;
