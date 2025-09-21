
import React from 'react';
import { DollarSign, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Crowdfunding = ({ crowdfunding }) => {
  if (!crowdfunding) return null;

  const progress = (crowdfunding.raised / crowdfunding.goal) * 100;

  const handleDonate = () => {
    toast({
      title: "💰 Spende tätigen",
      description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Crowdfunding</h3>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold text-gray-900">
            {crowdfunding.raised.toLocaleString('de-DE')}€
          </span>
          <span className="text-sm text-gray-600">
            von {crowdfunding.goal.toLocaleString('de-DE')}€
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{crowdfunding.donors} Spender</span>
          </div>
          <span>{Math.round(progress)}% erreicht</span>
        </div>
      </div>

      {/* Donate Button */}
      <Button 
        onClick={handleDonate}
        className="w-full mb-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      >
        <DollarSign className="h-4 w-4 mr-2" />
        Jetzt spenden
      </Button>

      {/* Recent Donations */}
      {crowdfunding.donations && crowdfunding.donations.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Letzte Spenden</h4>
          <div className="space-y-2">
            {crowdfunding.donations.slice(0, 3).map((donation, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{donation.donor}</span>
                <span className="font-medium text-green-600">{donation.amount}€</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Crowdfunding;
