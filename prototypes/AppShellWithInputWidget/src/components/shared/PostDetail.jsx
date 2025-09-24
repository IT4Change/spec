import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Plus, X, Calendar, MapPin, Users, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import EmojiReactionPicker from '@/components/ui/EmojiReactionPicker';

const PostDetailContent = ({ post, author, users, handleNotImplemented, onClose, dragBinder, isMobile, reactions, onEmojiSelect, onReactionClick, showEmojiPicker, setShowEmojiPicker, isDragging, panelState }) => (
  <div className="bg-slate-900/80 backdrop-blur-lg border-purple-500/50 text-white w-full h-full flex flex-col rounded-t-2xl md:rounded-none">
    {isMobile && (
      <div {...dragBinder} className="w-full py-6 flex justify-center items-center touch-none cursor-grab active:cursor-grabbing bg-slate-900/90 border-b border-white/10">
        <div className={`w-12 h-1.5 rounded-full transition-all duration-200 ${
          isDragging
            ? 'bg-purple-400 w-16 h-2'
            : 'bg-white/40'
        }`} />
        {/* State indicator dots */}
        <div className="absolute right-4 top-6 flex space-x-1">
          {['small', 'medium', 'maximized'].map((state) => (
            <div
              key={state}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                panelState === state ? 'bg-purple-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
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

        <div className="flex items-center space-x-2 flex-wrap mb-6 relative">
          {/* Display existing reactions */}
          {Object.entries(reactions).map(([emoji, count]) => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              className="text-white hover:text-white bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 h-8"
              onClick={(e) => onReactionClick(emoji, e)}
            >
              <span className="mr-1 opacity-100">{emoji}</span>
              <span className="text-xs text-white/90">{count}</span>
            </Button>
          ))}

          {/* Add reaction button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Emoji picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <EmojiReactionPicker
                onEmojiSelect={onEmojiSelect}
                onClose={() => setShowEmojiPicker(false)}
                reactions={reactions}
                className="top-full left-0 mt-2"
              />
            )}
          </AnimatePresence>
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState(post.reactions || {});
  const [panelState, setPanelState] = useState('medium');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  // Motion value for real-time panel positioning
  const y = useMotionValue(`${100 - 65}%`); // Start at medium position

  // Get y position percentage for each state
  const getStateYPosition = (state) => {
    switch (state) {
      case 'small': return `${100 - 30}%`;    // 30% height
      case 'medium': return `${100 - 65}%`;   // 65% height
      case 'maximized': return '0%';          // Full screen
      case 'closed': return '100%';           // Hidden
      default: return `${100 - 65}%`;
    }
  };

  // Animation variants for smooth transitions
  const panelVariants = {
    closed: {
      y: '100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    small: {
      y: `${100 - 30}%`,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    medium: {
      y: `${100 - 65}%`,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    maximized: {
      y: '0%', // Full screen
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const snapToState = (targetState) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPanelState(targetState);

    // Animate to target position
    const targetPosition = getStateYPosition(targetState);
    y.set(targetPosition);

    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
      const nextHeight = window.innerHeight;
      setViewportHeight(nextHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dragBinder = useDrag(
    ({ first, last, movement: [, my], velocity: [, vy], memo }) => {
      if (isAnimating) return memo;

      if (first) {
        setIsDragging(true);
        // Get current actual position from motion value, not panel state
        const currentPosition = y.get();
        let initialY;

        if (typeof currentPosition === 'string' && currentPosition.includes('%')) {
          initialY = parseFloat(currentPosition.replace('%', ''));
        } else {
          // Fallback to state-based position if motion value is not set properly
          const statePosition = getStateYPosition(panelState);
          initialY = parseFloat(statePosition.replace('%', ''));
        }

        return { startY: initialY, startState: panelState };
      }

      // Calculate new position based on drag movement
      const startY = memo?.startY || 35; // Default to medium (35% from top)
      const dragOffset = (my / viewportHeight) * 100; // Convert pixels to percentage
      const newY = Math.max(0, Math.min(85, startY + dragOffset)); // Limit: 0% (full) to 85% (15% height)

      // Allow free positioning during drag
      if (!last) {
        // Update panel position in real-time
        y.set(`${newY}%`);
        return { startY, newY, startState: memo?.startState || panelState };
      }

      if (last) {
        setIsDragging(false);
        const velocityThreshold = 500; // pixels per second
        const isQuickSwipe = Math.abs(vy) > velocityThreshold;

        // Determine target state based on velocity and position
        let targetState = panelState;

        // Check for close threshold first (15% height = 85% from top)
        if (newY >= 85) {
          onClose();
          return memo;
        }

        // Only snap at edges - free scaling in between
        if (isQuickSwipe) {
          // Quick swipe - use velocity direction for edge snapping only
          if (vy > 0 && newY < 10) {
            // Quick swipe down from very top - stay where dragged (no snap)
            // But ensure motion value sync happens after drag ends
            setTimeout(() => {
              // Sync after a brief delay to avoid race condition
              y.set(`${newY}%`);
            }, 10);
            return memo;
          } else if (vy < 0 && newY > 75) {
            // Quick swipe up from near bottom - snap to maximized
            targetState = 'maximized';
          } else {
            // No snapping for middle area quick swipes - stay where dragged
            setTimeout(() => {
              y.set(`${newY}%`);
            }, 10);
            return memo;
          }
        } else {
          // Slow drag - only snap at extreme edges
          if (newY < 5) {
            targetState = 'maximized'; // Very top edge - snap to maximized
          } else if (newY > 80) {
            // Near close threshold - but don't snap, let user position freely
            setTimeout(() => {
              y.set(`${newY}%`);
            }, 10);
            return memo;
          } else {
            // Free positioning in middle - no snapping
            setTimeout(() => {
              y.set(`${newY}%`);
            }, 10);
            return memo;
          }
        }

        snapToState(targetState);
      }

      return { startY, newY, startState: memo?.startState || panelState };
    },
    { axis: 'y', rubberband: true }
  );

  // Update motion value when panel state changes (but not during drag)
  useEffect(() => {
    if (!isDragging) {
      const targetPosition = getStateYPosition(panelState);
      y.set(targetPosition);
    }
  }, [panelState, isDragging]);

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

  const handleEmojiSelect = (emoji) => {
    const newReactions = { ...reactions };
    newReactions[emoji] = (newReactions[emoji] || 0) + 1;
    setReactions(newReactions);
  };

  const handleReactionClick = (emoji, e) => {
    e.stopPropagation();
    const newReactions = { ...reactions };
    newReactions[emoji] = (newReactions[emoji] || 0) + 1;
    setReactions(newReactions);
  };

  if (!author) return null;

  if (isModal) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="bg-transparent border-none text-white p-0 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-none">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="rounded-lg overflow-hidden">
            <PostDetailContent
              post={post}
              author={author}
              users={users}
              handleNotImplemented={handleNotImplemented}
              onClose={onClose}
              isMobile={false}
              reactions={reactions}
              onEmojiSelect={handleEmojiSelect}
              onReactionClick={handleReactionClick}
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Panel - No backdrop overlay to keep map interactive */}
        <motion.div
          initial="closed"
          animate={panelState}
          exit="closed"
          variants={panelVariants}
          className="fixed inset-0 z-[1003] pointer-events-none"
          style={{ y }}
        >
          <div className="absolute inset-0 pointer-events-auto">
            <PostDetailContent
              post={post}
              author={author}
              users={users}
              handleNotImplemented={handleNotImplemented}
              onClose={onClose}
              dragBinder={dragBinder()}
              isMobile={true}
              reactions={reactions}
              onEmojiSelect={handleEmojiSelect}
              onReactionClick={handleReactionClick}
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
              isDragging={isDragging}
              panelState={panelState}
            />
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <div className="w-full h-full md:h-full md:max-h-full md:rounded-none overflow-hidden shadow-2xl shadow-black/50 md:border-l md:border-purple-500/30">
       <div className="w-full h-full">
         <PostDetailContent
           post={post}
           author={author}
           users={users}
           handleNotImplemented={handleNotImplemented}
           onClose={onClose}
           isMobile={false}
           reactions={reactions}
           onEmojiSelect={handleEmojiSelect}
           onReactionClick={handleReactionClick}
           showEmojiPicker={showEmojiPicker}
           setShowEmojiPicker={setShowEmojiPicker}
         />
       </div>
    </div>
  );
};

export default PostDetail;
