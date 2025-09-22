
import React from 'react';
import { Award, Star, Trophy, Shield } from 'lucide-react';

const Badges = () => {
  const mockBadges = [
    {
      id: 1,
      name: 'Community Helfer',
      description: '10 Nachbarschaftshilfen abgeschlossen',
      icon: Shield,
      color: 'from-blue-500 to-purple-600',
      earned: true,
      earnedDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'Grüner Daumen',
      description: '5 Garten-Projekte unterstützt',
      icon: Star,
      color: 'from-green-500 to-emerald-600',
      earned: true,
      earnedDate: '2024-01-20'
    },
    {
      id: 3,
      name: 'Event Organisator',
      description: '3 Events erfolgreich organisiert',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-600',
      earned: false,
      progress: 2,
      total: 3
    },
    {
      id: 4,
      name: 'Super Eintrag',
      description: '50 Community-Punkte erreicht',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      earned: false,
      progress: 35,
      total: 50
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Award className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Badges & Erfolge</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mockBadges.map((badge) => {
          const IconComponent = badge.icon;
          
          return (
            <div 
              key={badge.id} 
              className={`p-3 rounded-lg border-2 transition-all ${
                badge.earned 
                  ? 'border-transparent bg-gradient-to-br ' + badge.color + ' text-white shadow-lg' 
                  : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  badge.earned ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  <IconComponent className={`h-6 w-6 ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
                </div>
                
                <h4 className={`font-medium text-sm mb-1 ${badge.earned ? 'text-white' : 'text-gray-900'}`}>
                  {badge.name}
                </h4>
                
                <p className={`text-xs mb-2 ${badge.earned ? 'text-white/90' : 'text-gray-600'}`}>
                  {badge.description}
                </p>

                {badge.earned ? (
                  <div className="text-xs text-white/80">
                    Erhalten: {formatDate(badge.earnedDate)}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className={`text-xs ${badge.earned ? 'text-white/80' : 'text-gray-500'}`}>
                      {badge.progress}/{badge.total}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                        style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          {mockBadges.filter(b => b.earned).length} von {mockBadges.length} Badges erhalten
        </span>
      </div>
    </div>
  );
};

export default Badges;
