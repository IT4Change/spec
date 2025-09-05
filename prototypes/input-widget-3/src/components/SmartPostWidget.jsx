
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

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
  Paperclip,
  Check
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
  [ATTRIBUTE_TYPES.TITLE]: { icon: Type, label: 'Titel', order: 1 },
  [ATTRIBUTE_TYPES.TEXT]: { icon: Text, label: 'Text', order: 2 },
  [ATTRIBUTE_TYPES.LOCATION]: { icon: MapPin, label: 'Ort', order: 4 },
  [ATTRIBUTE_TYPES.MEDIA]: { icon: ImageIcon, label: 'Medien', order: 3 },
  [ATTRIBUTE_TYPES.DATE]: { icon: Calendar, label: 'Datum', order: 5 },
  [ATTRIBUTE_TYPES.PEOPLE]: { icon: Users, label: 'Personen', order: 6 },
  [ATTRIBUTE_TYPES.TAGS]: { icon: Tag, label: 'Tags', order: 7 },
};

const SAMPLE_USERS = ["Anna", "Ben", "Carla", "David", "Elena", "Frank"];
const SAMPLE_TAGS = ["Wichtig", "Projekt", "Freizeit", "Idee", "Diskussion", "Update"];

const MapPicker = ({ position, onPositionChange, onConfirm }) => {
  const [markerPosition, setMarkerPosition] = useState(position);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        onPositionChange(e.latlng);
      },
    });
    return markerPosition === null ? null : <Marker position={markerPosition}></Marker>;
  }

  return (
    <div className="space-y-3">
      <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-700">
        <MapContainer center={position || [51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
       <Button onClick={onConfirm} size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
        <Check className="w-4 h-4 mr-2" />
        Ort bestätigen
      </Button>
    </div>
  );
};


const AutocompleteInput = ({ value, onChange, placeholder, suggestions }) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(inputValue.toLowerCase()) && !value.split(', ').includes(s)
  );

  const handleSelect = (suggestion) => {
    const parts = value ? value.split(', ') : [];
    parts.push(suggestion);
    onChange(parts.join(', '));
    setInputValue('');
    setShowSuggestions(false);
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white"
      />
      {value && <div className="text-gray-300 mt-1 text-sm">Ausgewählt: {value}</div>}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-40 overflow-y-auto">
          {filteredSuggestions.map(suggestion => (
            <div
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-700"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const SmartPostWidget = () => {
  const [attributes, setAttributes] = useState([
    { id: Date.now(), type: ATTRIBUTE_TYPES.TEXT, value: '' }
  ]);

  const sortedAttributes = useMemo(() => 
    [...attributes].sort((a, b) => ATTRIBUTE_CONFIG[a.type].order - ATTRIBUTE_CONFIG[b.type].order),
    [attributes]
  );
  
  const addAttribute = (type) => {
    let initialValue;
    switch(type) {
        case ATTRIBUTE_TYPES.MEDIA: initialValue = []; break;
        case ATTRIBUTE_TYPES.LOCATION: initialValue = { position: null, address: '', showMap: true }; break;
        case ATTRIBUTE_TYPES.DATE: initialValue = { start: '', end: '', showEnd: false, rrule: '' }; break;
        default: initialValue = '';
    }
    const newAttribute = { id: Date.now(), type, value: initialValue };
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
    
    setAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, value: [...attr.value, ...newFiles] } : attr
    ));

    toast({
      title: "Dateien hochgeladen",
      description: `${files.length} Datei(en) erfolgreich hinzugefügt.`
    });
  };

  const removeFile = (attributeId, fileId) => {
     setAttributes(prev => prev.map(attr => 
      attr.id === attributeId ? { ...attr, value: attr.value.filter(f => f.id !== fileId) } : attr
    ));
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
        inputComponent = <input type="text" value={attribute.value} onChange={(e) => updateAttributeValue(attribute.id, e.target.value)} placeholder="Ein fesselnder Titel..." className="w-full text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white" />;
        break;
      case ATTRIBUTE_TYPES.TEXT:
        inputComponent = <textarea value={attribute.value} onChange={(e) => updateAttributeValue(attribute.id, e.target.value)} placeholder="Was möchtest du teilen?" rows={Math.max(3, attribute.value.split('\n').length)} className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-gray-300 resize-none" />;
        break;
      case ATTRIBUTE_TYPES.LOCATION:
        if (attribute.value.showMap) {
          inputComponent = (
            <MapPicker 
              position={attribute.value.position}
              onPositionChange={async (latlng) => {
                 updateAttributeValue(attribute.id, { ...attribute.value, position: latlng });
              }}
              onConfirm={async () => {
                 let address = `Lat: ${attribute.value.position.lat.toFixed(4)}, Lng: ${attribute.value.position.lng.toFixed(4)}`;
                 try {
                   const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${attribute.value.position.lat}&lon=${attribute.value.position.lng}`);
                   const data = await response.json();
                   if (data && data.display_name) {
                     address = data.display_name;
                   }
                 } catch (error) {
                    console.error("Error fetching address:", error);
                 }
                 updateAttributeValue(attribute.id, { ...attribute.value, address, showMap: false });
              }}
            />);
        } else {
            inputComponent = <input type="text" value={attribute.value.address} readOnly onClick={() => updateAttributeValue(attribute.id, {...attribute.value, showMap: true })} placeholder="Ort auf Karte auswählen..." className="w-full bg-transparent border-none focus:ring-0 placeholder-gray-500 text-white cursor-pointer" />;
        }
        break;
      case ATTRIBUTE_TYPES.DATE:
         inputComponent = (
           <div className="space-y-3">
             <div className="flex items-center gap-2">
                <Label htmlFor={`start-${attribute.id}`} className="text-gray-400">Start</Label>
                <input id={`start-${attribute.id}`} type="datetime-local" value={attribute.value.start} onChange={(e) => updateAttributeValue(attribute.id, {...attribute.value, start: e.target.value})} className="w-full bg-transparent border-none focus:ring-0 text-white" />
             </div>
              {attribute.value.showEnd && (
                 <div className="flex items-center gap-2">
                    <Label htmlFor={`end-${attribute.id}`} className="text-gray-400">Ende</Label>
                    <input id={`end-${attribute.id}`} type="datetime-local" value={attribute.value.end} onChange={(e) => updateAttributeValue(attribute.id, {...attribute.value, end: e.target.value})} className="w-full bg-transparent border-none focus:ring-0 text-white" />
                 </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox id={`show-end-${attribute.id}`} checked={attribute.value.showEnd} onCheckedChange={(checked) => updateAttributeValue(attribute.id, {...attribute.value, showEnd: checked})} />
                <Label htmlFor={`show-end-${attribute.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300">Enddatum hinzufügen</Label>
             </div>
             <div>
                <Label htmlFor={`rrule-${attribute.id}`} className="text-sm text-gray-400">Wiederholungsregel (RFC 5545)</Label>
                <input id={`rrule-${attribute.id}`} type="text" value={attribute.value.rrule} onChange={(e) => updateAttributeValue(attribute.id, {...attribute.value, rrule: e.target.value})} placeholder="z.B. FREQ=WEEKLY;BYDAY=MO" className="mt-1 w-full bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 text-white"/>
             </div>
           </div>
        );
        break;
      case ATTRIBUTE_TYPES.PEOPLE:
         inputComponent = <AutocompleteInput value={attribute.value} onChange={(v) => updateAttributeValue(attribute.id, v)} placeholder="Personen hinzufügen..." suggestions={SAMPLE_USERS} />;
        break;
      case ATTRIBUTE_TYPES.TAGS:
        inputComponent = <AutocompleteInput value={attribute.value} onChange={(v) => updateAttributeValue(attribute.id, v)} placeholder="Tags hinzufügen..." suggestions={SAMPLE_TAGS} />;
        break;
       case ATTRIBUTE_TYPES.MEDIA:
        inputComponent = (
          <div className="space-y-3">
             <Button type="button" variant="outline" size="sm" onClick={() => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*,video/*'; i.multiple = true; i.onchange = (e) => handleFileUpload(attribute.id, e); i.click(); }} className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white" >
                <Paperclip className="w-4 h-4 mr-2" /> Dateien hinzufügen
              </Button>
            {attribute.value && attribute.value.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {attribute.value.map(file => (
                  <div key={file.id} className="relative group">
                    <img class="w-full h-24 object-cover rounded-md" alt={file.name} src="https://images.unsplash.com/photo-1687031317737-53bd68f49e9f" />
                    <button onClick={() => removeFile(attribute.id, file.id)} className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity" >
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
        <motion.div layout initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: -30, scale: 0.95 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="flex items-start space-x-3 p-3 bg-gray-900/50 rounded-lg group" >
            <Icon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-grow">{inputComponent}</div>
            <button onClick={() => removeAttribute(attribute.id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity" >
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
                {sortedAttributes.map(attr => (
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
                    {Object.entries(ATTRIBUTE_CONFIG).sort(([, a], [, b]) => a.order - b.order).map(([type, config]) => {
                        const Icon = config.icon;
                        const isDisabled = usedTypes.has(type) && ![ATTRIBUTE_TYPES.TEXT, ATTRIBUTE_TYPES.MEDIA].includes(type);
                        
                        return (
                            <Button key={type} variant="ghost" onClick={() => addAttribute(type)} disabled={isDisabled} className="w-full justify-start disabled:opacity-50 disabled:cursor-not-allowed">
                                <Icon className="w-4 h-4 mr-2" />
                                {config.label}
                            </Button>
                        )
                    })}
                </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleClear} className="text-gray-400 hover:text-white hover:bg-red-500/20" >
                <Trash2 className="w-4 h-4 mr-2" />
                Leeren
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6">
                Posten
            </Button>
          </div>
      </div>
    </div>
  );
};

export default SmartPostWidget;
