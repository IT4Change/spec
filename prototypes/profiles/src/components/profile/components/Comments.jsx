
import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Comments = ({ comments: initialComments, inputRef }) => {
  const [newComment, setNewComment] = useState('');
  
  const mockComments = initialComments || [
    { id: 1, author: 'Max Müller', time: '2h ago', text: 'Tolle Idee! Bin gespannt, wie sich das Projekt entwickelt.' },
    { id: 2, author: 'Lisa Weber', time: '1h ago', text: 'Ich würde gerne mitmachen. Wo kann ich mich melden?' },
  ];

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "💬 Kommentar hinzufügen",
      description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
    });
    setNewComment('');
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Kommentare</h3>
      </div>

      <div className="space-y-4 mb-4">
        {mockComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img 
              alt={comment.author}
              className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1554829954-117d7897bf34" />
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
        {mockComments.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">Noch keine Kommentare vorhanden. Sei der Erste!</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Schreibe einen Kommentar..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
        />
        <Button 
          onClick={handleSubmitComment}
          size="sm"
          disabled={!newComment.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Comments;
