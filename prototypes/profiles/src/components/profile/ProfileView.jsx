import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
import ProfileReactionsBar from '@/components/profile/ProfileReactionsBar';
import { useToast } from '@/components/ui/use-toast';

const ProfileView = ({ data, config }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [showReactionsBar, setShowReactionsBar] = useState(true);
  const [reactions, setReactions] = useState({
    likes: data.reactions?.likes || 12,
    hearts: data.reactions?.hearts || 5,
    userLiked: false,
    userHearted: false
  });
  
  const scrollRef = useRef(null);
  const commentsRef = useRef(null);
  const commentInputRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const { toast } = useToast();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Banner logic
    if (latest <= 10) {
      setShowBanner(true);
    } else if (latest > 10 && showBanner) {
      setShowBanner(false);
    }

    // Reactions bar logic
    if (commentsRef.current) {
        const commentsTop = commentsRef.current.offsetTop;
        const scrollContainerHeight = scrollRef.current.clientHeight;
        const commentsVisibleThreshold = commentsTop - scrollContainerHeight + 100;

        if (latest >= commentsVisibleThreshold) {
            setShowReactionsBar(false);
        } else {
            setShowReactionsBar(true);
        }
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
    { key: 'mediaGallery', component: MediaGallery, props: { images: data.images || [] }, name: 'Galerie' },
    { key: 'eventFunctions', component: EventFunctions, props: { eventDetails: data.eventDetails }, name: 'Event' },
    { key: 'crowdfunding', component: Crowdfunding, props: { crowdfunding: data.crowdfunding }, name: 'Funding' },
    { key: 'members', component: Members, props: {}, name: 'Mitglieder' },
    { key: 'comingEvents', component: ComingEvents, props: {}, name: 'Events' },
    { key: 'projects', component: Projects, props: {}, name: 'Projekte' },
    { key: 'quests', component: Quests, props: { questDetails: data.questDetails }, name: 'Quests' },
    { key: 'badges', component: Badges, props: {}, name: 'Badges' },
    { key: 'contactInfo', component: ContactInfo, props: { contactInfo: data.contactInfo }, name: 'Kontakt' },
  ];

  const activeComponents = componentsConfig.filter(({ key, props }) => {
    if (!config.components[key]) return false;
    // Check if the component has the necessary data to render
    const propKeys = Object.keys(props);
    if (propKeys.length > 0) {
      return propKeys.some(propKey => props[propKey] !== undefined && props[propKey] !== null);
    }
    return true;
  });
  
  const commentsComponent = { key: 'comments', component: Comments, props: { reactions: reactions, comments: data.comments, onReaction: handleReaction, inputRef: commentInputRef }, name: 'Kommentare' };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-40 md:inset-auto md:right-4 md:top-4 md:bottom-4 md:w-1/2"
    >
      <div className="h-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
        <ProfileHeader data={data} showBanner={showBanner} />

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
            <div className="p-6 space-y-8">
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
            </div>
            
            {config.components.comments && (
               <div className="p-6 pt-0" ref={commentsRef}>
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
            <div className="h-20"></div>
          </div>
          
            {config.components.comments && (
                 <ProfileReactionsBar 
                    reactions={reactions}
                    commentsCount={data.comments?.length || 2}
                    onReaction={handleReaction}
                    onCommentClick={handleScrollToComments}
                    isVisible={showReactionsBar}
                />
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;