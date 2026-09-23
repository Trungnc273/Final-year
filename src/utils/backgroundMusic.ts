import { invitation } from '../config/invitation';

let invitationAudio: HTMLAudioElement | null = null;

export function getInvitationAudio(): HTMLAudioElement {
  if (!invitationAudio) {
    invitationAudio = new Audio(invitation.backgroundMusic);
    invitationAudio.loop = true;
    invitationAudio.volume = 0.45;
    invitationAudio.preload = 'none';
  }
  return invitationAudio;
}

export function playInvitationMusic(): void {
  const audio = getInvitationAudio();
  void audio.play().catch(() => {
    // Browsers may reject playback; the visible control remains available.
  });
}
