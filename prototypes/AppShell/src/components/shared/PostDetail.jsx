import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Heart, ThumbsUp, X, Calendar, MapPin, Users, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

const PostDetailContent = ({ post, author, users, handleNotImplemented, onClose, dragBinder, isMobile }) => (
  <div className="bg-slate-900/80 backdrop-blur-lg border-purple-500/50 text-white w-full h-full flex flex-col rounded-t-2xl md:rounded-none">
    {isMobile && (
      <div {...dragBinder} className="w-full py-4 flex justify-center items-center touch-none cursor-grab active:cursor-grabbing">
        <div className="w-10 h-1.5 bg-white/30 rounded-full" />
      </div>
    )}
    
    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/60 z-20" onClick={onClose}>
      <X className="h-5 w-5" />
    </Button>

    <div className="flex-1 overflow-y-auto">
      {post.media && post.media[0]?.type === 'image' && (
        <div className="h-48 md:h-64 w-full overflow-hidden relative">
          <img src={post.media[0].url} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-xl text-white">{author.name}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="text-sm text-white/60">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: de })}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{new Date(post.createdAt).toLocaleString('de-DE')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-white/80 mb-6 whitespace-pre-wrap">{post.content}</p>

        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          {post.type === 'event' && post.startTime && (
            <div className="flex items-center text-white/80 bg-white/10 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4 mr-2 text-blue-400" />
              <span>{new Date(post.startTime).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
          )}
          {post.location && (
            <div className="flex items-center text-white/80 bg-white/10 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4 mr-2 text-green-400" />
              <span>{post.location.name}</span>
            </div>
          )}
          {post.type === 'project' && post.members && (
            <div className="flex items-center text-white/80 bg-white/10 px-3 py-1 rounded-full">
              <Users className="h-4 w-4 mr-2 text-purple-400" />
              <span>{post.members.length} Mitglieder</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={handleNotImplemented}>
            <Heart className="h-4 w-4 mr-2" /> {post.reactions['❤️'] || 0}
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white" onClick={handleNotImplemented}>
            <ThumbsUp className="h-4 w-4 mr-2" /> {post.reactions['👍'] || 0}
          </Button>
        </div>

        <div className="border-t border-white/20 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Kommentare ({post.comments.length})</h3>
          <div className="space-y-4">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={users[comment.authorId]?.avatar} />
                  <AvatarFallback>{users[comment.authorId]?.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-white">{users[comment.authorId]?.name}</p>
                    <p className="text-xs text-white/50">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: de })}</p>
                  </div>
                  <p className="text-sm text-white/80 mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="p-6 border-t border-white/20 bg-slate-900/90">
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <img alt="Current user avatar" src="https://images.unsplash.com/flagged/photo-1608632359963-5828fa3b4141" />
          <AvatarFallback>DU</AvatarFallback>
        </Avatar>
        <Input placeholder="Schreibe einen Kommentar..." className="bg-white/10 border-white/20 text-white" />
        <Button size="icon" onClick={handleNotImplemented}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

const PostDetail = ({ post, onClose, isModal }) => {
  const [author, setAuthor] = useState(null);
  const [users, setUsers] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const initialHeight = window.innerHeight * 0.7;
  const height = useMotionValue(initialHeight);
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dragBinder = useDrag(
    ({ down, movement: [, my], velocity: [, vy], direction: [, dy] }) => {
      if (down) {
        height.set(initialHeight - my);
      } else {
        if (my > initialHeight * 0.5 || (vy > 0.5 && dy === 1)) {
          onClose();
        } else if (my < -initialHeight * 0.3 || (vy < -0.5 && dy === -1)) {
          controls.start({ height: window.innerHeight - 64 }); // Maximize (leave space for navbar)
        } else {
          controls.start({ height: initialHeight }); // Snap back to initial
        }
      }
    },
    {
      from: () => [0, -height.get()],
      bounds: { top: -(window.innerHeight - 64) },
      rubberband: true,
    }
  );

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    setUsers(storedUsers || {});
    if (storedUsers) {
      setAuthor(storedUsers[post.authorId]);
    }
  }, [post.authorId]);

  const handleNotImplemented = (e) => {
    e.stopPropagation();
    toast({
      title: "🚧 Feature nicht implementiert",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  if (!author) return null;

  if (isModal) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="bg-transparent border-none text-white p-0 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-none">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="rounded-lg overflow-hidden">
            <PostDetailContent post={post} author={author} users={users} handleNotImplemented={handleNotImplemented} onClose={onClose} isMobile={false} />
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  if (isMobile) {
    return (
      <motion.div
        style={{ height }}
        animate={controls}
        transition={{ type: 'spring', damping: 40, stiffness: 400 }}
        className="w-full absolute bottom-0 shadow-2xl shadow-black/50"
      >
        <PostDetailContent post={post} author={author} users={users} handleNotImplemented={handleNotImplemented} onClose={onClose} dragBinder={dragBinder()} isMobile={true} />
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full md:h-full md:max-h-full md:rounded-none overflow-hidden shadow-2xl shadow-black/50 md:border-l md:border-purple-500/30">
       <div className="w-full h-full">
         <PostDetailContent post={post} author={author} users={users} handleNotImplemented={handleNotImplemented} onClose={onClose} isMobile={false} />
       </div>
    </div>
  );
};

export default PostDetail;