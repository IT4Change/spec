import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Type, Image as ImageIcon, MapPin, Calendar, Users, Tag, Globe, Lock, Send, Trash2, Eye, Edit
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import TitleWidget from '@/components/widgets/TitleWidget';
import TextWidget from '@/components/widgets/TextWidget';
import MediaWidget from '@/components/widgets/MediaWidget';
import LocationWidget from '@/components/widgets/LocationWidget';
import DateWidget from '@/components/widgets/DateWidget';
import PeopleWidget from '@/components/widgets/PeopleWidget';
import TagsWidget from '@/components/widgets/TagsWidget';

const POST_TYPES = {
  POST: 'Post',
  EVENT: 'Veranstaltung',
  GROUP: 'Projekt/Gruppe',
  AD: 'Anzeige',
};

const WIDGET_TYPES = {
  TITLE: 'title',
  TEXT: 'text',
  MEDIA: 'media',
  LOCATION: 'location',
  DATE: 'date',
  PEOPLE: 'people',
  TAGS: 'tags',
};

const WIDGET_CONFIG = {
  [WIDGET_TYPES.TITLE]: { component: TitleWidget, icon: Type, label: 'Titel' },
  [WIDGET_TYPES.TEXT]: { component: TextWidget, icon: null, label: 'Beschreibung' },
  [WIDGET_TYPES.MEDIA]: { component: MediaWidget, icon: ImageIcon, label: 'Medien' },
  [WIDGET_TYPES.LOCATION]: { component: LocationWidget, icon: MapPin, label: 'Ort' },
  [WIDGET_TYPES.DATE]: { component: DateWidget, icon: Calendar, label: 'Datum' },
  [WIDGET_TYPES.PEOPLE]: { component: PeopleWidget, icon: Users, label: 'Personen' },
  [WIDGET_TYPES.TAGS]: { component: TagsWidget, icon: Tag, label: 'Tags' },
};

const POST_TYPE_DEFAULT_WIDGETS = {
  [POST_TYPES.POST]: [WIDGET_TYPES.TEXT],
  [POST_TYPES.EVENT]: [WIDGET_TYPES.TITLE, WIDGET_TYPES.TEXT, WIDGET_TYPES.DATE, WIDGET_TYPES.LOCATION, WIDGET_TYPES.PEOPLE],
  [POST_TYPES.GROUP]: [WIDGET_TYPES.TITLE, WIDGET_TYPES.TEXT, WIDGET_TYPES.PEOPLE],
  [POST_TYPES.AD]: [WIDGET_TYPES.TITLE, WIDGET_TYPES.TEXT, WIDGET_TYPES.TAGS],
};

const WIDGET_ORDER = [WIDGET_TYPES.TITLE, WIDGET_TYPES.TEXT, WIDGET_TYPES.MEDIA, WIDGET_TYPES.DATE, WIDGET_TYPES.LOCATION, WIDGET_TYPES.PEOPLE, WIDGET_TYPES.TAGS];

const SmartPostWidget = ({ onClose, initialPostType = POST_TYPES.POST }) => {
  const [postType, setPostType] = useState(initialPostType);
  const [activeWidgets, setActiveWidgets] = useState(
    POST_TYPE_DEFAULT_WIDGETS[initialPostType] || POST_TYPE_DEFAULT_WIDGETS[POST_TYPES.POST]
  );
  const [widgetData, setWidgetData] = useState({});
  const [isPublic, setIsPublic] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (initialPostType && initialPostType !== postType) {
      setPostType(initialPostType);
    }
  }, [initialPostType]);

  useEffect(() => {
    const newWidgets = POST_TYPE_DEFAULT_WIDGETS[postType];
    setActiveWidgets(newWidgets);

    const newWidgetData = {};
    // Keep data for all widgets, not just the active ones for the new post type
    Object.keys(widgetData).forEach(type => {
        newWidgetData[type] = widgetData[type];
    });
    setWidgetData(newWidgetData);
  }, [postType]);

  const toggleWidget = useCallback((widgetType) => {
    setActiveWidgets(prev => {
      const isRemoving = prev.includes(widgetType);
      if (isRemoving) {
        return prev.filter(w => w !== widgetType);
      } else {
        return [...prev, widgetType].sort((a, b) => WIDGET_ORDER.indexOf(a) - WIDGET_ORDER.indexOf(b));
      }
    });
  }, []);

  const updateWidgetData = useCallback((widgetType, data) => {
    setWidgetData(prev => {
      const newData = typeof data === 'function' ? data(prev[widgetType]) : data;
      return { ...prev, [widgetType]: newData };
    });
  }, []);

  const handleTextMentions = useCallback((mentions, type) => {
    const widgetType = type === '@' ? WIDGET_TYPES.PEOPLE : WIDGET_TYPES.TAGS;
    if (!activeWidgets.includes(widgetType)) {
      toggleWidget(widgetType);
    }
    updateWidgetData(widgetType, (prevData = []) => {
      const currentItems = new Set(prevData);
      mentions.forEach(item => currentItems.add(item));
      return Array.from(currentItems);
    });
  }, [activeWidgets, toggleWidget, updateWidgetData]);

  const handleSubmit = () => {
    const post = {
      id: Date.now(),
      postType,
      isPublic,
      data: widgetData,
      createdAt: new Date().toISOString(),
    };
    console.log("Submitting post:", post);
    const existingPosts = JSON.parse(localStorage.getItem('socialPosts') || '[]');
    localStorage.setItem('socialPosts', JSON.stringify([post, ...existingPosts]));
    toast({ title: "Beitrag erstellt!", description: "Dein Beitrag wurde erfolgreich gespeichert." });
    setPostType(POST_TYPES.POST);
    setActiveWidgets(POST_TYPE_DEFAULT_WIDGETS[POST_TYPES.POST]);
    setWidgetData({});
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const getWidgetLabel = (type) => {
    if (type === WIDGET_TYPES.TITLE && postType === POST_TYPES.GROUP) return "Name";
    if (type === WIDGET_TYPES.PEOPLE) {
      if (postType === POST_TYPES.EVENT) return "Teilnehmer einladen";
      if (postType === POST_TYPES.GROUP) return "Mitglieder einladen";
    }
    return WIDGET_CONFIG[type].label;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 w-full overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        {showPreview ? (
          <h2 className="text-lg font-semibold text-white">{postType} - Vorschau</h2>
        ) : (
          <Tabs value={postType} onValueChange={setPostType} className="w-full">
            <TabsList>
              {Object.values(POST_TYPES).map(type => (
                <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        <Button variant="ghost" onClick={() => setShowPreview(!showPreview)} className="text-sm text-slate-300 hover:text-white ml-4 flex-shrink-0">
          {showPreview ? <Edit className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showPreview ? 'Bearbeiten' : 'Vorschau'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={showPreview ? 'preview' : 'form'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {showPreview ? (
            <div className="p-6 prose prose-invert max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-purple-400 prose-strong:text-white">
              {widgetData.title && <h1>{widgetData.title}</h1>}
              {widgetData.text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{widgetData.text}</ReactMarkdown>}
              {widgetData.media && widgetData.media.length > 0 && (
                <div className="not-prose grid grid-cols-3 gap-2 my-4">
                  {widgetData.media.map(file => <img key={file.id} src={file.url} alt={file.name} className="rounded-lg object-cover aspect-square" />)}
                </div>
              )}
              {widgetData.date && widgetData.date.start && <p><strong>Datum:</strong> {new Date(widgetData.date.start).toLocaleString()}{widgetData.date.end && ` - ${new Date(widgetData.date.end).toLocaleString()}`}</p>}
              {widgetData.location && (widgetData.location.address || widgetData.location.location) && <p><strong>Ort:</strong> {widgetData.location.isOnline ? <a href={widgetData.location.location}>{widgetData.location.location}</a> : widgetData.location.address}</p>}
              {widgetData.people && widgetData.people.length > 0 && <p><strong>Personen:</strong> {widgetData.people.join(', ')}</p>}
              {widgetData.tags && widgetData.tags.length > 0 && <p><strong>Tags:</strong> {widgetData.tags.map(t => `#${t}`).join(' ')}</p>}
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-4">
              <AnimatePresence>
                {WIDGET_ORDER.map(widgetType => {
                  if (!activeWidgets.includes(widgetType)) return null;
                  
                  const WidgetComponent = WIDGET_CONFIG[widgetType].component;
                  const isTextWidget = widgetType === WIDGET_TYPES.TEXT;

                  return (
                    <motion.div
                      key={widgetType}
                      layout
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative"
                    >
                      <WidgetComponent
                        value={widgetData[widgetType]}
                        onChange={(data) => updateWidgetData(widgetType, data)}
                        label={getWidgetLabel(widgetType)}
                        onMention={handleTextMentions}
                        availableWidgets={WIDGET_ORDER.filter(w => !activeWidgets.includes(w) && WIDGET_CONFIG[w].icon)}
                        onToggleWidget={toggleWidget}
                        isTextWidget={isTextWidget}
                      />
                       {!isTextWidget && (
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-700/50" onClick={() => toggleWidget(widgetType)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex justify-between items-center rounded-b-2xl">
        <div className="flex items-center space-x-3">
          <Switch id="visibility-switch" checked={isPublic} onCheckedChange={setIsPublic} />
          <Label htmlFor="visibility-switch" className="flex items-center text-sm text-slate-300 cursor-pointer">
            {isPublic ? <Globe className="w-4 h-4 mr-2 text-green-400" /> : <Lock className="w-4 h-4 mr-2 text-red-400" />}
            {isPublic ? 'Öffentlich' : 'Privat'}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700/50" onClick={() => { setWidgetData({}); setActiveWidgets(POST_TYPE_DEFAULT_WIDGETS[postType])}}>
                <Trash2 className="w-4 h-4" />
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                <Send className="w-4 h-4 mr-2" />
                {postType === POST_TYPES.POST ? 'Posten' : 'Erstellen'}
            </Button>
        </div>
      </div>
    </div>
  );
};

export { POST_TYPES };

export default SmartPostWidget;
