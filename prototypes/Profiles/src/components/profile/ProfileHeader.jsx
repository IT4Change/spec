import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, User, Share2, Facebook, Twitter, Mail, Link as LinkIcon, MessageCircle, UserPlus, CalendarPlus, PlusCircle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/use-toast';

const ProfileHeader = ({ data, showBanner }) => {

  const ctaConfig = {
    person: { text: 'Verbinden', icon: UserPlus },
    event: { text: 'Teilnehmen', icon: CalendarPlus },
    offer: { text: 'Chat', icon: MessageCircle },
    quest: { text: 'Annehmen', icon: Target },
    project: { text: 'Mitmachen', icon: PlusCircle },
  };

  const currentCta = ctaConfig[data.type] || { text: 'Aktion', icon: PlusCircle };
  const CtaIcon = currentCta.icon;

  const handleAction = (action) => {
    toast({
      title: `🚀 Aktion: ${action}`,
      description: "🚧 Diese Funktion ist noch nicht implementiert—aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀"
    });
  };

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const shareTitle = `Schau dir dieses interessante Profil an: ${data.name}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Schau dir das an:\n\n' + currentUrl)}`;
        window.location.href = shareUrl;
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl).then(() => {
          toast({ title: "🔗 Link kopiert!", description: "Der Link wurde in die Zwischenablage kopiert." });
        }).catch(() => {
          toast({ title: "❌ Fehler", description: "Konnte den Link nicht kopieren." });
        });
        return;
      default:
        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                url: currentUrl,
            }).catch(console.error);
        } else {
             toast({ title: "❌ Fehler", description: "Teilen wird von diesem Browser nicht unterstützt." });
        }
        return;
    }
  };
  

  return (
    <div className="relative z-10">
      <motion.div
        animate={{ height: showBanner && data.banner ? '8rem' : 0, opacity: showBanner && data.banner ? 1 : 0 }}
        initial={false}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden"
      >
        {data.banner && (
          <>
            <img alt="Profil Bannerbild" className="w-full h-full object-cover" src={data.banner} />
            <div className="absolute inset-0 bg-black/20"></div>
          </>
        )}
      </motion.div>

      <div className="p-6 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center flex-shrink-0">
             <motion.div 
              className="relative z-10"
              animate={{ marginTop: showBanner && data.banner ? '-2rem' : '0rem' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg">
                {data.avatar ? (
                  <img alt={data.name} className="w-full h-full rounded-full object-cover" src={data.avatar} />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
            <span className="text-sm font-bold text-purple-600 mt-2 text-center">{data.distance}</span>
          </div>

          <div className="flex-1 pt-2">
            <div className="float-left">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{data.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{data.address}</span>
              </div>
            </div>
            <div className="float-right">
              <div className="flex items-center justify-end gap-2">
                <Button onClick={() => handleAction(currentCta.text)} className="flex-grow sm:flex-grow-0">
                    <CtaIcon className="h-4 w-4 mr-2" />
                    {currentCta.text}
                </Button>
                <Button size="icon" variant="outline" onClick={() => handleAction('Navigation')} className="w-9 h-9 flex-shrink-0">
                  <Navigation className="h-4 w-4" />
                </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="w-9 h-9 flex-shrink-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare('facebook')}><Facebook className="mr-2 h-4 w-4"/>Facebook</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('twitter')}><Twitter className="mr-2 h-4 w-4"/>Twitter</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('email')}><Mail className="mr-2 h-4 w-4"/>E-Mail</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare('copy')}><LinkIcon className="mr-2 h-4 w-4"/>Link kopieren</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;