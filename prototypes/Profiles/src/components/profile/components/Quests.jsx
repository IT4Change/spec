
import React from 'react';
import { Target, Clock, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Quests = ({ questDetails }) => {
  const mockQuests = [
    {
      id: 1,
      title: 'Nachbarschaftshilfe: Einkaufen',
      description: 'Wöchentlicher Einkauf für ältere Nachbarin',
      difficulty: 'Einfach',
      timeRequired: '1-2 Stunden',
      reward: '20€',
      status: 'Verfügbar',
      category: 'Hilfe'
    },
    {
      id: 2,
      title: 'Garten-Buddy gesucht',
      description: 'Hilfe beim Anlegen eines Gemüsegartens',
      difficulty: 'Mittel',
      timeRequired: '3-4 Stunden',
      reward: 'Gemüse-Anteil',
      status: 'In Bearbeitung',
      category: 'Garten'
    },
    {
      id: 3,
      title: 'Deutsch-Tandem',
      description: 'Sprachpartner für Deutsch-Konversation',
      difficulty: 'Einfach',
      timeRequired: '1 Stunde/Woche',
      reward: 'Gegenseitiges Lernen',
      status: 'Verfügbar',
      category: 'Bildung'
    }
  ];

  const handleQuestClick = (questId) => {
    toast({
      title: "🎯 Quest annehmen",
      description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Einfach': return 'bg-green-100 text-green-800';
      case 'Mittel': return 'bg-yellow-100 text-yellow-800';
      case 'Schwer': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verfügbar': return 'bg-blue-100 text-blue-800';
      case 'In Bearbeitung': return 'bg-orange-100 text-orange-800';
      case 'Abgeschlossen': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Show quest details if provided
  if (questDetails) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Quest Details</h3>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Schwierigkeit:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questDetails.difficulty)}`}>
                {questDetails.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Zeitaufwand:</span>
              <span className="text-gray-700">{questDetails.timeRequired}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Belohnung:</span>
              <span className="text-gray-700">{questDetails.reward}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => handleQuestClick('current')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Target className="h-4 w-4 mr-2" />
          Quest annehmen
        </Button>
      </div>
    );
  }

  // Show quest list
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Verfügbare Quests</h3>
      </div>

      <div className="space-y-3">
        {mockQuests.map((quest) => (
          <div 
            key={quest.id} 
            className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer"
            onClick={() => handleQuestClick(quest.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{quest.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                {quest.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{quest.description}</p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(quest.difficulty)}`}>
                {quest.difficulty}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {quest.timeRequired}
              </span>
              <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                {quest.reward}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => toast({
          title: "🎯 Alle Quests anzeigen",
          description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
        })}
      >
        Alle Quests anzeigen
      </Button>
    </div>
  );
};

export default Quests;
