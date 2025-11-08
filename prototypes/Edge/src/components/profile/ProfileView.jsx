import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Element as ScrollElement, scroller } from 'react-scroll';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavTabs from '@/components/profile/ProfileNavTabs';
import ProfileNavDots from '@/components/profile/ProfileNavDots';
import TextComponent from '@/components/profile/components/TextComponent';
import MediaGallery from '@/components/profile/components/MediaGallery';
import EventFunctions from '@/components/profile/components/EventFunctions';
import Comments from '@/components/profile/components/Comments';
import Crowdfunding from '@/components/profile/components/Crowdfunding';
import Members from '@/components/profile/components/Members';
import ComingEvents from '@/components/profile/components/ComingEvents';
import Projects from '@/components/profile/components/Projects';
import Quests from '@/components/profile/components/Quests';
import Badges from '@/components/profile/components/Badges';
import ContactInfo from '@/components/profile/components/ContactInfo';
import { useToast } from '@/components/ui/use-toast';
import MapPreview from '@/components/shared/MapPreview';
import ProfileBottomBar from '@/components/profile/ProfileBottomBar';

// Profile content component that will be reused across different modes
const ProfileContent = ({
  data,
  config,
  showBanner,
  reactions,
  handleReaction,
  handleCommentSubmit,
  handleScrollToComments,
  scrollRef,
  commentsRef,
  commentInputRef,
  activeComponents,
  commentsComponent,
  onClose,
  navigationSource,
  onSwitchToMap,
  dragBinder,
  isMobile,
  isDragging,
  panelState
}) => (
  <div className="bg-purple-900/50 backdrop-blur-lg w-full h-full flex flex-col rounded-t-2xl md:rounded-none relative">
    {/* Drag handle for mobile bottom sheet */}
    {isMobile && dragBinder && (
      <div {...dragBinder} className="w-full py-6 flex justify-center items-center touch-none cursor-grab active:cursor-grabbing bg-slate-800/40 border-b border-white/20">
        <div className={`w-12 h-1.5 rounded-full transition-all duration-200 ${
          isDragging
            ? 'bg-purple-400 w-16 h-2'
            : 'bg-gray-300'
        }`} />
        {/* State indicator dots */}
        <div className="absolute right-4 top-6 flex space-x-1">
          {['small', 'medium', 'maximized'].map((state) => (
            <div
              key={state}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                panelState === state ? 'bg-purple-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    )}

    <ProfileHeader
      data={data}
      showBanner={showBanner}
      onClose={onClose}
      navigationSource={navigationSource}
    />

    {config.navigation === 'tabs' && activeComponents.length > 0 && (
      <ProfileNavTabs
        components={activeComponents}
        scrollContainerRef={scrollRef}
      />
    )}

    <div className="flex-1 relative overflow-hidden">
      {config.navigation === 'dots' && activeComponents.length > 0 && (
        <ProfileNavDots
          components={activeComponents}
          scrollContainerRef={scrollRef}
        />
      )}

      <div ref={scrollRef} className="h-full overflow-y-auto" id="profile-scroll-container">
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-8">
          {activeComponents.map(({ key, component: Component, props }) => (
            <ScrollElement name={key} key={key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Component {...props} />
              </motion.div>
            </ScrollElement>
          ))}

          {config.components.comments && (
            <div className="pt-0" ref={commentsRef}>
              <ScrollElement name={commentsComponent.key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <commentsComponent.component {...commentsComponent.props} />
                </motion.div>
              </ScrollElement>
            </div>
          )}
          <div className="h-28"></div>
        </div>
      </div>
    </div>

    {/* Fixed Bottom Bar */}
    <ProfileBottomBar
      reactions={reactions}
      commentsCount={data.comments?.length || 0}
      onReaction={handleReaction}
      inputRef={commentInputRef}
      onCommentSubmit={handleCommentSubmit}
      isVisible={true}
    />
  </div>
);

const ProfileView = ({
  data,
  config,
  isModal = true,
  onClose,
  onSwitchToMap,
  navigationSource = null
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [reactions, setReactions] = useState({
    likes: data.reactions?.likes || 12,
    hearts: data.reactions?.hearts || 5,
    userLiked: false,
    userHearted: false
  });
  const [isMobile, setIsMobile] = useState(false);
  const [panelState, setPanelState] = useState('medium');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  const scrollRef = useRef(null);
  const commentsRef = useRef(null);
  const commentInputRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const { toast } = useToast();

  // Motion value for mobile bottom sheet
  const y = useMotionValue(`${100 - 65}%`);

  // Get y position for each state
  const getStateYPosition = (state) => {
    switch (state) {
      case 'small': return `${100 - 30}%`;
      case 'medium': return `${100 - 65}%`;
      case 'maximized': return '0%';
      case 'closed': return '100%';
      default: return `${100 - 65}%`;
    }
  };

  // Animation variants for mobile bottom sheet
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
      y: '0%',
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const snapToState = (targetState) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPanelState(targetState);
    const targetPosition = getStateYPosition(targetState);
    y.set(targetPosition);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
      setViewportHeight(window.innerHeight);
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
        const currentPosition = y.get();
        let initialY;
        if (typeof currentPosition === 'string' && currentPosition.includes('%')) {
          initialY = parseFloat(currentPosition.replace('%', ''));
        } else {
          const statePosition = getStateYPosition(panelState);
          initialY = parseFloat(statePosition.replace('%', ''));
        }
        return { startY: initialY, startState: panelState };
      }

      const startY = memo?.startY || 35;
      const dragOffset = (my / viewportHeight) * 100;
      const newY = Math.max(0, Math.min(85, startY + dragOffset));

      if (!last) {
        y.set(`${newY}%`);
        return { startY, newY, startState: memo?.startState || panelState };
      }

      if (last) {
        setIsDragging(false);
        const velocityThreshold = 500;
        const isQuickSwipe = Math.abs(vy) > velocityThreshold;

        let targetState = panelState;

        if (newY >= 85) {
          onClose();
          return memo;
        }

        if (isQuickSwipe) {
          if (vy > 0 && newY < 10) {
            setTimeout(() => y.set(`${newY}%`), 10);
            return memo;
          } else if (vy < 0 && newY > 75) {
            targetState = 'maximized';
          } else {
            setTimeout(() => y.set(`${newY}%`), 10);
            return memo;
          }
        } else {
          if (newY < 5) {
            targetState = 'maximized';
          } else if (newY > 80) {
            setTimeout(() => y.set(`${newY}%`), 10);
            return memo;
          } else {
            setTimeout(() => y.set(`${newY}%`), 10);
            return memo;
          }
        }

        snapToState(targetState);
      }

      return { startY, newY, startState: memo?.startState || panelState };
    },
    { axis: 'y', rubberband: true }
  );

  useEffect(() => {
    if (!isDragging) {
      const targetPosition = getStateYPosition(panelState);
      y.set(targetPosition);
    }
  }, [panelState, isDragging]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 10) {
      setShowBanner(true);
    } else if (latest > 10 && showBanner) {
      setShowBanner(false);
    }
  });
  
  const handleReaction = (type) => {
    setReactions(prev => {
        const userActionKey = `user${type.charAt(0).toUpperCase() + type.slice(1)}d`;
        const alreadyActed = prev[userActionKey];
        const change = alreadyActed ? -1 : 1;
        toast({
            title: `❤️ Reaktion ${alreadyActed ? 'entfernt' : 'hinzugefügt'}`,
            description: `Du hast ${alreadyActed ? 'dein' : 'ein'} ${type === 'likes' ? 'Like' : 'Herz'} ${alreadyActed ? 'zurückgenommen' : 'gegeben'}.`,
        });
        return {
            ...prev,
            [type]: prev[type] + change,
            [userActionKey]: !alreadyActed
        };
    });
  };
  
  const handleCommentSubmit = (commentText) => {
    // Add the new comment to the data
    toast({
      title: "💬 Kommentar hinzugefügt",
      description: "Dein Kommentar wurde erfolgreich gepostet.",
    });
    // TODO: Implement actual comment submission logic
    console.log('Comment submitted:', commentText);
  };

  const handleScrollToComments = () => {
    scroller.scrollTo('comments', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'profile-scroll-container',
      offset: -20,
    });
    // Focus the input after scrolling
    setTimeout(() => {
        commentInputRef.current?.focus();
    }, 800);
  };


  const componentsConfig = [
    { key: 'text', component: TextComponent, props: { text: data.text }, name: 'Über' },
    {
      key: 'map',
      component: MapPreview,
      props: {
        location: data.location,
        onSwitchToMap: onSwitchToMap
      },
      name: 'Karte',
      condition: !!data.location // Only show if there's location data
    },
    { key: 'mediaGallery', component: MediaGallery, props: { images: data.images || [] }, name: 'Galerie' },
    { key: 'eventFunctions', component: EventFunctions, props: { eventDetails: data.eventDetails }, name: 'Event' },
    { key: 'crowdfunding', component: Crowdfunding, props: { crowdfunding: data.crowdfunding }, name: 'Funding' },
    { key: 'members', component: Members, props: { members: data.members }, name: 'Mitglieder' },
    { key: 'comingEvents', component: ComingEvents, props: { events: data.comingEvents }, name: 'Events' },
    { key: 'projects', component: Projects, props: { projects: data.projects }, name: 'Projekte' },
    { key: 'quests', component: Quests, props: { questDetails: data.questDetails }, name: 'Quests' },
    { key: 'badges', component: Badges, props: { badges: data.badges }, name: 'Badges' },
    { key: 'contactInfo', component: ContactInfo, props: { contactInfo: data.contactInfo }, name: 'Kontakt' },
  ];

  const activeComponents = componentsConfig.filter(({ key, props, condition }) => {
    // Check explicit condition first (e.g., map only shows if location exists)
    if (condition !== undefined && !condition) return false;

    // Map component is always enabled if location exists (handled by condition above)
    if (key === 'map') return true;

    // For other components, check config
    if (!config.components[key]) return false;

    // Check if the component has the necessary data to render
    const propKeys = Object.keys(props);
    if (propKeys.length > 0) {
      return propKeys.some(propKey => props[propKey] !== undefined && props[propKey] !== null);
    }
    return true;
  });
  
  const commentsComponent = { key: 'comments', component: Comments, props: { reactions: reactions, comments: data.comments, onReaction: handleReaction, inputRef: commentInputRef }, name: 'Kommentare' };

  // Common props for ProfileContent
  const contentProps = {
    data,
    config,
    showBanner,
    reactions,
    handleReaction,
    handleCommentSubmit,
    handleScrollToComments,
    scrollRef,
    commentsRef,
    commentInputRef,
    activeComponents,
    commentsComponent,
    onClose,
    navigationSource,
    onSwitchToMap
  };

  // MODAL MODE (Feed overlay)
  if (isModal) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent showCloseButton={false} className="bg-transparent border-none p-0 max-w-3xl w-full h-[90vh] max-h-[90vh] shadow-none" style={{ display: 'block' }}>
          <DialogTitle className="sr-only">
            {data.title || data.name || 'Profile Details'}
          </DialogTitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-lg overflow-hidden h-full"
          >
            <ProfileContent
              {...contentProps}
              isMobile={false}
              dragBinder={null}
              isDragging={false}
              panelState={null}
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  // MOBILE BOTTOM SHEET MODE (Map view on mobile)
  if (isMobile) {
    return (
      <motion.div
        initial="closed"
        animate={panelState}
        exit="closed"
        variants={panelVariants}
        className="fixed inset-0 z-[1003] pointer-events-none"
        style={{ y }}
      >
        <div className="absolute inset-0 pointer-events-auto h-full">
          <ProfileContent
            {...contentProps}
            isMobile={true}
            dragBinder={dragBinder()}
            isDragging={isDragging}
            panelState={panelState}
          />
        </div>
      </motion.div>
    );
  }

  // DESKTOP SIDEBAR MODE (Map view on desktop)
  return (
    <div className="w-full h-full md:h-full md:max-h-full md:rounded-none overflow-hidden shadow-2xl shadow-black/50 md:border-l md:border-gray-300">
      <div className="w-full h-full">
        <ProfileContent
          {...contentProps}
          isMobile={false}
          dragBinder={null}
          isDragging={false}
          panelState={null}
        />
      </div>
    </div>
  );
};

export default ProfileView;