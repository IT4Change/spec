import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Heart, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  const handleFocus = () => {
    setIsCommentMode(true);
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
          className="absolute bottom-0 left-0 right-0 z-30 border-t bg-white shadow-lg"
        >
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 p-3"
          >
            <AnimatePresence mode="wait">
              {!isCommentMode ? (
                // Default State: Reactions + Compact Input
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between w-full gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReaction('likes')}
                      className={cn(
                        "flex items-center gap-2 transition-colors",
                        reactions.userLiked ? 'text-blue-600 bg-blue-100' : 'text-gray-600 hover:bg-blue-50'
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
                        reactions.userHearted ? 'text-red-600 bg-red-100' : 'text-gray-600 hover:bg-red-50'
                      )}
                    >
                      <Heart className="h-5 w-5" />
                      <span className="font-medium">{reactions.hearts}</span>
                    </Button>
                  </div>
                  <Input
                    ref={inputRef}
                    onFocus={handleFocus}
                    placeholder="Kommentar schreiben..."
                    className="flex-1"
                    readOnly
                  />
                </motion.div>
              ) : (
                // Comment Mode: Back + Expanded Input + Send
                <motion.div
                  key="comment"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-3 w-full"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onMouseDown={handleBack}
                    className="flex-shrink-0"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Input
                    ref={inputRef}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Schreibe einen Kommentar..."
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    variant="default"
                    size="icon"
                    onMouseDown={handleSend}
                    disabled={!commentText.trim()}
                    className="flex-shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileBottomBar;
