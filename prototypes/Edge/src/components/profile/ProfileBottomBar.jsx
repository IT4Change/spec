import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Heart, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ProfileBottomBar = ({
  reactions,
  commentsCount,
  onReaction,
  inputRef,
  onCommentSubmit,
  isVisible = true
}) => {
  const [isCommentMode, setIsCommentMode] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current && isCommentMode) {
      inputRef.current.style.height = 'auto';
      const scrollHeight = inputRef.current.scrollHeight;
      // Max height of 120px (approximately 5 lines)
      inputRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [commentText, isCommentMode]);

  const handleFocus = () => {
    setIsCommentMode(true);
  };

  const handleBlur = () => {
    // Only exit comment mode if there's no text
    if (!commentText.trim()) {
      setIsCommentMode(false);
    }
  };

  const handleBack = (e) => {
    // Use onMouseDown instead of onClick to prevent input blur
    e.preventDefault();
    setIsCommentMode(false);
    setCommentText('');
    inputRef.current?.blur();
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(commentText);
      setCommentText('');
      setIsCommentMode(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
    if (e.key === 'Escape') {
      setIsCommentMode(false);
      setCommentText('');
      inputRef.current?.blur();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/20 bg-slate-800/90 backdrop-blur-lg shadow-lg shadow-black/50"
        >
          <div className="flex items-center gap-3 p-3">
            {/* Reaction buttons - fade out when in comment mode */}
            <AnimatePresence>
              {!isCommentMode && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReaction('likes')}
                    className={cn(
                      "flex items-center gap-2 transition-colors",
                      reactions.userLiked ? 'text-purple-400 bg-purple-500/20' : 'text-white/70 hover:bg-white/10'
                    )}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span className="font-medium">{reactions.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReaction('hearts')}
                    className={cn(
                      "flex items-center gap-2 transition-colors",
                      reactions.userHearted ? 'text-red-400 bg-red-500/20' : 'text-white/70 hover:bg-white/10'
                    )}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">{reactions.hearts}</span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back button - appears when in comment mode */}
            <AnimatePresence>
              {isCommentMode && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onMouseDown={handleBack}
                    className="flex-shrink-0"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input - grows to fill space */}
            <motion.div
              layout
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1"
            >
              {isCommentMode ? (
                <Textarea
                  ref={inputRef}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  placeholder="Schreibe einen Kommentar..."
                  className="w-full resize-none min-h-[40px] max-h-[120px] overflow-y-auto transition-[height] duration-150 ease-out"
                  autoFocus
                  rows={1}
                />
              ) : (
                <Input
                  onFocus={handleFocus}
                  placeholder="Kommentar schreiben..."
                  className="w-full"
                  readOnly
                />
              )}
            </motion.div>

            {/* Send button - always visible */}
            <Button
              variant="default"
              size="icon"
              onMouseDown={handleSend}
              disabled={!isCommentMode || !commentText.trim()}
              className="flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileBottomBar;
