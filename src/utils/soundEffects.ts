import { soundManager, type SoundEffectType } from './soundManager';

export type { SoundEffectType };

export const playCyberSound = (type: SoundEffectType) => {
  soundManager.playSound(type);
};

export const toggleSound = (): boolean => {
  return soundManager.toggleSound();
};

export const isSoundEnabled = (): boolean => {
  return soundManager.isSoundEnabled();
};

export const getUniversalAudioProps = (
  clickEffect: SoundEffectType = 'click',
  hoverEffect: SoundEffectType = 'hover',
  onClickCallback?: (e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent) => void
) => {
  return soundManager.getUniversalAudioProps(clickEffect, hoverEffect, onClickCallback);
};
