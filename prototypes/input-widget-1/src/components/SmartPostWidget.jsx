
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  Video, 
  FileText, 
  HelpCircle, 
  Calendar, 
  MapPin, 
  MessageSquare, 
  Bell, 
  Navigation,
  Camera,
  RefreshCw,
  ExternalLink,
  Upload,
  Plus,
  X,
  Clock,
  Users
} from 'lucide-react';

const POST_TYPES = {
  VIDEO: 'video',
  ARTICLE: 'article', 
  QUESTION: 'question',
  ONLINE_EVENT: 'online_event',
  OFFLINE_EVENT: 'offline_event',
  SHORT_NEWS: 'short_news',
  REMINDER: 'reminder',
  LOCATION: 'location',
  PAST_EVENT: 'past_event',
  EVENT_UPDATE: 'event_update',
  CALL_TO_ACTION: 'call_to_action'
};

const POST_TYPE_CONFIG = {
  [POST_TYPES.VIDEO]: {
    icon: Video,
    label: 'Lustiges Video',
    color: 'from-red-500 to-pink-500',
    description: 'Teile ein unterhaltsames Video'
  },
  [POST_TYPES.ARTICLE]: {
    icon: FileText,
    label: 'Artikel',
    color: 'from-blue-500 to-cyan-500',
    description: 'Veröffentliche einen ausführlichen Artikel'
  },
  [POST_TYPES.QUESTION]: {
    icon: HelpCircle,
    label: 'Frage',
    color: 'from-green-500 to-emerald-500',
    description: 'Stelle eine Frage an die Community'
  },
  [POST_TYPES.ONLINE_EVENT]: {
    icon: Calendar,
    label: 'Online-Event',
    color: 'from-purple-500 to-violet-500',
    description: 'Bewirb ein Online-Event'
  },
  [POST_TYPES.OFFLINE_EVENT]: {
    icon: MapPin,
    label: 'Offline-Event',
    color: 'from-orange-500 to-red-500',
    description: 'Bewirb ein lokales Event'
  },
  [POST_TYPES.SHORT_NEWS]: {
    icon: MessageSquare,
    label: 'Kurze News',
    color: 'from-teal-500 to-cyan-500',
    description: 'Teile eine kurze Neuigkeit'
  },
  [POST_TYPES.REMINDER]: {
    icon: Bell,
    label: 'Erinnerung',
    color: 'from-yellow-500 to-orange-500',
    description: 'Erstelle eine Erinnerung'
  },
  [POST_TYPES.LOCATION]: {
    icon: Navigation,
    label: 'Standort',
    color: 'from-indigo-500 to-purple-500',
    description: 'Teile einen interessanten Ort'
  },
  [POST_TYPES.PAST_EVENT]: {
    icon: Camera,
    label: 'Vergangenes Event',
    color: 'from-pink-500 to-rose-500',
    description: 'Berichte über ein vergangenes Event'
  },
  [POST_TYPES.EVENT_UPDATE]: {
    icon: RefreshCw,
    label: 'Event-Update',
    color: 'from-emerald-500 to-teal-500',
    description: 'Update zu einem Event'
  },
  [POST_TYPES.CALL_TO_ACTION]: {
    icon: ExternalLink,
    label: 'Call to Action',
    color: 'from-violet-500 to-purple-500',
    description: 'Bewirb einen Link oder Aktion'
  }
};

const SmartPostWidget = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFormData({});
    setUploadedFiles([]);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event, fileType) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      type: fileType,
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Datei hochgeladen",
      description: `${files.length} Datei(en) erfolgreich hinzugefügt`
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmit = () => {
    const postData = {
      type: selectedType,
      ...formData,
      files: uploadedFiles,
      author: 'current_user', // Implicit
      date: new Date().toISOString() // Implicit
    };

    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem('socialPosts') || '[]');
    existingPosts.unshift({ ...postData, id: Date.now() });
    localStorage.setItem('socialPosts', JSON.stringify(existingPosts));

    toast({
      title: "Post erstellt!",
      description: `Dein ${POST_TYPE_CONFIG[selectedType].label} wurde erfolgreich veröffentlicht`
    });

    // Reset form
    setSelectedType(null);
    setFormData({});
    setUploadedFiles([]);
  };

  const renderTypeSelector = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
    >
      {Object.entries(POST_TYPE_CONFIG).map(([type, config]) => {
        const Icon = config.icon;
        return (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTypeSelect(type)}
            className={`p-4 rounded-xl bg-gradient-to-br ${config.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-sm mb-1">{config.label}</h3>
            <p className="text-xs opacity-90">{config.description}</p>
          </motion.button>
        );
      })}
    </motion.div>
  );

  const renderFileUpload = (fileType, label, accept = "*/*") => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = accept;
            input.multiple = true;
            input.onchange = (e) => handleFileUpload(e, fileType);
            input.click();
          }}
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Dateien auswählen
        </Button>
      </div>
      
      {uploadedFiles.filter(f => f.type === fileType).length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.filter(f => f.type === fileType).map(file => (
            <div key={file.id} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <span className="text-sm text-gray-300">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderInput = (field, label, type = "text", placeholder = "", required = false) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      ) : type === 'datetime-local' ? (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const renderFormFields = () => {
    const fields = [];

    switch (selectedType) {
      case POST_TYPES.VIDEO:
        fields.push(
          <div key="video-upload">
            {renderFileUpload('title_video', 'Video hochladen', 'video/*')}
          </div>
        );
        break;

      case POST_TYPES.ARTICLE:
        fields.push(
          renderFileUpload('title_image', 'Titelbild', 'image/*'),
          renderInput('title', 'Titel', 'text', 'Titel des Artikels...', true),
          renderInput('content', 'Artikel-Text', 'textarea', 'Schreibe deinen Artikel...', true),
          renderFileUpload('content_images', 'Bilder für den Artikel', 'image/*')
        );
        break;

      case POST_TYPES.QUESTION:
        fields.push(
          renderInput('question', 'Deine Frage', 'textarea', 'Was möchtest du wissen?', true)
        );
        break;

      case POST_TYPES.ONLINE_EVENT:
        fields.push(
          renderFileUpload('title_image', 'Event-Bild', 'image/*'),
          renderInput('title', 'Event-Titel', 'text', 'Name des Events...', true),
          renderInput('event_date', 'Datum & Zeit', 'datetime-local', '', true),
          renderInput('location_link', 'Meeting-Link', 'url', 'https://...', true),
          renderInput('description', 'Beschreibung', 'textarea', 'Beschreibe dein Event...')
        );
        break;

      case POST_TYPES.OFFLINE_EVENT:
        fields.push(
          renderFileUpload('title_image', 'Event-Bild', 'image/*'),
          renderInput('title', 'Event-Titel', 'text', 'Name des Events...', true),
          renderInput('event_date', 'Datum & Zeit', 'datetime-local', '', true),
          renderInput('location', 'Ort', 'text', 'Adresse oder Ortsname...', true),
          renderInput('description', 'Beschreibung', 'textarea', 'Beschreibe dein Event...')
        );
        break;

      case POST_TYPES.SHORT_NEWS:
        fields.push(
          renderInput('news_text', 'Neuigkeit', 'textarea', 'Was gibt es Neues?', true),
          renderFileUpload('image', 'Optionales Bild', 'image/*')
        );
        break;

      case POST_TYPES.REMINDER:
        fields.push(
          renderInput('reminder_text', 'Erinnerung', 'textarea', 'Woran soll erinnert werden?', true),
          renderInput('related_user', 'Bezogene Person', 'text', 'Name der Person (optional)')
        );
        break;

      case POST_TYPES.LOCATION:
        fields.push(
          renderInput('location_name', 'Ort', 'text', 'Name des Ortes...', true),
          renderInput('location_coords', 'Koordinaten', 'text', 'Lat, Lng oder Adresse...'),
          renderInput('description', 'Beschreibung', 'textarea', 'Beschreibe den Ort...')
        );
        break;

      case POST_TYPES.PAST_EVENT:
        fields.push(
          renderFileUpload('title_video', 'Event-Video', 'video/*'),
          renderInput('title', 'Event-Titel', 'text', 'Name des Events...', true),
          renderInput('event_date', 'Wann war das Event?', 'datetime-local', '', true),
          renderInput('location', 'Wo war das Event?', 'text', 'Ort des Events...'),
          renderInput('description', 'Beschreibung', 'textarea', 'Wie war das Event?'),
          renderFileUpload('event_images', 'Event-Bilder', 'image/*'),
          renderInput('participants', 'Teilnehmer', 'text', 'Wer war dabei? (Namen durch Komma getrennt)')
        );
        break;

      case POST_TYPES.EVENT_UPDATE:
        fields.push(
          renderFileUpload('title_image', 'Update-Bild', 'image/*'),
          renderInput('original_event', 'Ursprüngliches Event', 'text', 'Welches Event?', true),
          renderInput('update_text', 'Update-Text', 'textarea', 'Was gibt es Neues?', true),
          renderFileUpload('update_images', 'Update-Bilder', 'image/*'),
          renderInput('participants', 'Teilnehmer', 'text', 'Wer war dabei?')
        );
        break;

      case POST_TYPES.CALL_TO_ACTION:
        fields.push(
          renderFileUpload('title_image', 'Haupt-Bild', 'image/*'),
          renderInput('title', 'Titel', 'text', 'Überzeugender Titel...', true),
          renderInput('cta_link', 'Link', 'url', 'https://...', true),
          renderInput('description', 'Beschreibung', 'textarea', 'Warum sollten andere klicken?'),
          renderFileUpload('product_images', 'Produkt-Bilder', 'image/*')
        );
        break;
    }

    return fields.map((field, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {field}
      </motion.div>
    ));
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700">
      <AnimatePresence mode="wait">
        {!selectedType ? (
          <motion.div key="selector">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Was möchtest du teilen?
            </h2>
            {renderTypeSelector()}
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {React.createElement(POST_TYPE_CONFIG[selectedType].icon, {
                  className: "w-6 h-6 text-purple-400"
                })}
                <h2 className="text-xl font-bold text-white">
                  {POST_TYPE_CONFIG[selectedType].label}
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedType(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {renderFormFields()}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post veröffentlichen
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedType(null)}
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                Abbrechen
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartPostWidget;
