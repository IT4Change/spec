
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Type, 
  Text, 
  MapPin, 
  Image as ImageIcon,
  Calendar,
  Users,
  Tag,
  Plus,
  X,
  Trash2,
  Paperclip
} from 'lucide-react';

const ATTRIBUTE_TYPES = {
  TITLE: 'title',
  TEXT: 'text',
  LOCATION: 'location',
  MEDIA: 'media',
  DATE: 'date',
  PEOPLE: 'people',
  TAGS: 'tags',
};

const ATTRIBUTE_CONFIG = {
  [ATTRIBUTE_TYPES.TITLE]: { icon: Type, label: 'Titel' },
  [ATTRIBUTE_TYPES.TEXT]: { icon: Text, label: 'Text' },
  [ATTRIBUTE_TYPES.LOCATION]: { icon: MapPin, label: 'Ort' },
  [ATTRIBUTE_TYPES.MEDIA]: { icon: ImageIcon, label: 'Medien' },
  [ATTRIBUTE_TYPES.DATE]: { icon: Calendar, label: 'Datum' },
  [ATTRIBUTE_TYPES.PEOPLE]: { icon: Users, label: 'Personen' },
  [ATTRIBUTE_TYPES.TAGS]: { icon: Tag, label: 'Tags' },
};

const SmartPostWidget = () => {
  const [attributes, setAttributes] = useState([
    { id: Date.now(), type: ATTRIBUTE_TYPES.TEXT, value: '' }
  ]);

  const addAttribute = (type) => {
    const newAttribute = { 
      id: Date.now(), 
      type, 
      value: type === ATTRIBUTE_TYPES.MEDIA ? [] : '' 
    };
    setAttributes(prev => [...prev, newAttribute]);
  };

  const removeAttribute = (id) => {
    setAttributes(prev => prev.filter(attr => attr.id !== id));
  };

  const updateAttributeValue = (id, value) => {
    setAttributes(prev => 
      prev.map(attr => (attr.id === id ? { ...attr, value } : attr))
    );
  };
  
  const handleFileUpload = (id, event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    updateAttributeValue(id, (prevValue) => [...prevValue, ...newFiles]);
    toast({
      title: "Dateien hochgeladen",
      description: `${files.length} Datei(en) erfolgreich hinzugefügt.`
    });
  };

  const removeFile = (attributeId, fileId) => {
     updateAttributeValue(attributeId, (prevValue) => prevValue.filter(f => f.id !== fileId));
  };


  const handleSubmit = () => {
    const postData = {
      id: Date.now(),
      attributes,
      author: 'current_user',
      createdAt: new Date().toISOString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem('socialPosts') || '[]');
    existingPosts.unshift(postData);
    localStorage.setItem('socialPosts', JSON.stringify(existingPosts));

    toast({
      title: "Post erstellt!",
      description: "Dein Beitrag wurde erfolgreich veröffentlicht.",
    });

    setAttributes([{ id: Date.now(), type: ATTRIBUTE_TYPES.TEXT, value: '' }]);
  };
  
  const handleClear = () => {
    setAttributes([{ id: Date.now(), type: ATTRIBUTE_TYPES.TEXT, value: '' }]);
    toast({
        title: "Inhalt gelöscht",
        description: "Der Editor wurde zurückgesetzt."
    });
  }

  const renderAttribute = (attribute) => {
    const config = ATTRIBUTE_CONFIG[attribute.type];
    const Icon = config.icon;

    let inputComponent;

    switch (attribute.type) {
      case ATTRIBUTE_TYPES.TITLE:
        inputComponent = (
          <input
            type="text"
            value={attribute.value}
            onChange={(e) => updateAttributeValue(attribute.id, e.target.value)}
            placeholder="Ein fesselnder Titel..."
            className="w-full text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white"
          />
        );
        break;
      case ATTRIBUTE_TYPES.TEXT:
        inputComponent = (
          <textarea
            value={attribute.value}
            onChange={(e) => updateAttributeValue(attribute.id, e.target.value)}
            placeholder="Was möchtest du teilen?"
            rows={Math.max(3, attribute.value.split('\n').length)}
            className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-gray-300 resize-none"
          />
        );
        break;
      case ATTRIBUTE_TYPES.LOCATION:
        inputComponent = (
            <input
                type="text"
                value={attribute.value}
                onChange={(e) => updateAttributeValue(attribute.id, e.target.value)}
                placeholder="Ort, Adresse oder Koordinaten..."
                className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white"
            />
        );
        break;
      case ATTRIBUTE_TYPES.DATE:
         inputComponent = (
            <input
                type="datetime-local"
                value={attribute.value}
                onChange={(e) => updateAttributeValue(attribute.id, e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-white"
            />
        );
        break;
      case ATTRIBUTE_TYPES.PEOPLE:
         inputComponent = (
            <input
                type="text"
                value={attribute.value}
                onChange={(e) => updateAttributeValue(attribute.id, e.target.value)}
                placeholder="Personen mit Komma trennen..."
                className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white"
            />
        );
        break;
      case ATTRIBUTE_TYPES.TAGS:
        inputComponent = (
            <input
                type="text"
                value={attribute.value}
                onChange={(e) => updateAttributeValue(attribute.id, e.target.value)}
                placeholder="Tags mit Komma trennen..."
                className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white"
            />
        );
        break;
       case ATTRIBUTE_TYPES.MEDIA:
        inputComponent = (
          <div className="space-y-3">
             <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*,video/*';
                  input.multiple = true;
                  input.onchange = (e) => handleFileUpload(attribute.id, e);
                  input.click();
                }}
                className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Paperclip className="w-4 h-4 mr-2" />
                Dateien hinzufügen
              </Button>
            {attribute.value.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {attribute.value.map(file => (
                  <div key={file.id} className="relative group">
                    <img class="w-full h-24 object-cover rounded-md" alt={file.name} src="https://images.unsplash.com/photo-1687031317737-53bd68f49e9f" />
                    <button
                      onClick={() => removeFile(attribute.id, file.id)}
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        break;

      default:
        inputComponent = null;
    }

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-start space-x-3 p-3 bg-gray-900/50 rounded-lg group"
        >
            <Icon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-grow">{inputComponent}</div>
            <button 
                onClick={() => removeAttribute(attribute.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
  };

  const usedTypes = new Set(attributes.map(a => a.type));

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-700/50">
        <div className="space-y-3 mb-4">
            <AnimatePresence>
                {attributes.map(attr => (
                    <React.Fragment key={attr.id}>{renderAttribute(attr)}</React.Fragment>
                ))}
            </AnimatePresence>
        </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-700/50">
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Element hinzufügen
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-gray-800 border-gray-700 text-white">
                <div className="grid gap-2">
                    {Object.entries(ATTRIBUTE_CONFIG).map(([type, config]) => {
                        const Icon = config.icon;
                        const isDisabled = usedTypes.has(type) && ![ATTRIBUTE_TYPES.TEXT, ATTRIBUTE_TYPES.MEDIA].includes(type);
                        
                        return (
                            <Button
                                key={type}
                                variant="ghost"
                                onClick={() => addAttribute(type)}
                                disabled={isDisabled}
                                className="w-full justify-start disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {config.label}
                            </Button>
                        )
                    })}
                </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-3">
            <Button
                variant="ghost"
                onClick={handleClear}
                className="text-gray-400 hover:text-white hover:bg-red-500/20"
            >
                <Trash2 className="w-4 h-4 mr-2" />
                Leeren
            </Button>
            <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6"
            >
                Posten
            </Button>
          </div>
      </div>
    </div>
  );
};

export default SmartPostWidget;
