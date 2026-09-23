import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getInvitationAudio, playInvitationMusic } from '../../utils/backgroundMusic';

export const FloatingAudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(() => !getInvitationAudio().paused);

  useEffect(() => {
    const audio = getInvitationAudio();
    const syncState = () => setIsPlaying(!audio.paused);
    audio.addEventListener('play', syncState);
    audio.addEventListener('pause', syncState);
    syncState();
    return () => {
      audio.removeEventListener('play', syncState);
      audio.removeEventListener('pause', syncState);
    };
  }, []);

  const toggleSound = () => {
    const audio = getInvitationAudio();
    if (audio.paused) playInvitationMusic();
    else audio.pause();
  };

  return (
    <div className="floating-controls">
      <button
        type="button"
        onClick={toggleSound}
        id="btn-toggle-sound"
        className="control-pill-btn cursor-pointer"
        aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
        title={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#3d658e]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#557699]" />
        )}
      </button>
    </div>
  );
};
