
import React from 'react';
import { Calendar, Clock, Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const EventFunctions = ({ eventDetails }) => {
  if (!eventDetails) return null;

  const handleJoin = () => {
    toast({
      title: "🎉 Event beitreten",
      description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'invited': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Bestätigt';
      case 'invited': return 'Eingeladen';
      default: return 'Unbekannt';
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
      </div>

      {/* Date and Time */}
      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-purple-600" />
          <span className="font-medium text-gray-900">
            {formatDate(eventDetails.startDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-purple-600" />
          <span className="text-gray-700">
            {eventDetails.startTime}
            {eventDetails.endTime && ` - ${eventDetails.endTime}`}
          </span>
        </div>
      </div>

      {/* Join Button */}
      <Button 
        onClick={handleJoin}
        className="w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Am Event teilnehmen
      </Button>

      {/* Participants */}
      {eventDetails.participants && eventDetails.participants.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-gray-900">
              Teilnehmer ({eventDetails.participants.length})
            </span>
          </div>
          <div className="space-y-2">
            {eventDetails.participants.map((participant, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">
                  {participant.name}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
                  {getStatusText(participant.status)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFunctions;
