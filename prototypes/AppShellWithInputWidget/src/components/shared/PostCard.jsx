import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageCircle, Heart, ThumbsUp, Calendar, MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

const PostCard = ({ post }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    setAuthor(users[post.authorId]);
  }, [post.authorId]);

  const handleNotImplemented = (e) => {
    e.stopPropagation();
    toast({
      title: "🚧 Feature nicht implementiert",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getPostTypePill = () => {
    switch (post.type) {
      case 'event':
        return <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Event</div>;
      case 'project':
        return <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Projekt</div>;
      case 'offer':
        return <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">Angebot</div>;
      default:
        return null;
    }
  };

  if (!author) return null;

  return (
    <motion.div
      className="bg-purple-900/50 backdrop-blur-lg rounded-xl border border-purple-400/30 overflow-hidden cursor-pointer relative shadow-2xl shadow-purple-900/50"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {post.media && post.media[0]?.type === 'image' && (
        <div className="h-48 w-full overflow-hidden relative">
          <img src={post.media[0].url} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/20 to-transparent"></div>
        </div>
      )}
      
      {getPostTypePill()}

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 mr-4 bg-slate-700 rounded-full flex-shrink-0"></div>
          <h2 className="text-xl font-bold text-white">{post.title}</h2>
        </div>

        <div className="space-y-2 mb-4">
            {post.location && (
              <div className="flex items-center text-sm text-white/70">
                <MapPin className="h-4 w-4 mr-2 text-purple-300" />
                <span>{post.location.name} (115km)</span>
              </div>
            )}
            {post.startTime && (
                <div className="flex items-center text-sm text-white/70">
                    <Clock className="h-4 w-4 mr-2 text-purple-300" />
                    <span>{new Date(post.startTime).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })} Uhr</span>
                </div>
            )}
        </div>

        <p className="text-white/80 line-clamp-3 mb-6">{post.content}</p>

        <div className="flex items-center mb-6">
          <Avatar className="h-6 w-6 mr-3">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-white/90">{author.name},</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-sm text-white/60 ml-1">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: de })}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{new Date(post.createdAt).toLocaleString('de-DE')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={handleNotImplemented}>
              <Heart className="h-4 w-4 mr-2" /> {post.reactions['❤️'] || 0}
            </Button>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={handleNotImplemented}>
              <ThumbsUp className="h-4 w-4 mr-2" /> {post.reactions['👍'] || 0}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={handleNotImplemented}>
            <MessageCircle className="h-4 w-4 mr-2" /> {post.comments.length} Kommentare
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;