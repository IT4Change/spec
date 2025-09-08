
import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Members = () => {
  const mockMembers = [
    {
      id: 1,
      name: 'Anna Schmidt',
      role: 'Organisatorin',
      status: 'online'
    },
    {
      id: 2,
      name: 'Max Müller',
      role: 'Mitglied',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Lisa Weber',
      role: 'Mitglied',
      status: 'online'
    }
  ];

  const handleJoinGroup = () => {
    toast({
      title: "👥 Gruppe beitreten",
      description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
    });
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-green-400' : 'bg-gray-400';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Mitglieder</h3>
        </div>
        <Button size="sm" onClick={handleJoinGroup}>
          <UserPlus className="h-4 w-4 mr-1" />
          Beitreten
        </Button>
      </div>

      <div className="space-y-3">
        {mockMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="relative">
              <img 
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">{member.name}</div>
              <div className="text-xs text-gray-500">{member.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          {mockMembers.length} Mitglieder insgesamt
        </span>
      </div>
    </div>
  );
};

export default Members;
