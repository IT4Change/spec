import React from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/shared/PostCard';

const FeedView = ({ posts, sortOrder, onSelectPost }) => {

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'distance') {
      return (a.location?.lat || 0) - (b.location?.lat || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <motion.div 
      className="grid grid-cols-1 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {sortedPosts.map((post, index) => (
        <motion.div
          key={post.id}
          layoutId={`post-card-${post.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelectPost(post)}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeedView;