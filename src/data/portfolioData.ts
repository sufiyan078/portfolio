export * from './profile';
export * from './projects';
export * from './skills';
export * from './inventory';
export * from './bossBattles';
export * from './achievements';
export * from './timeline';

// Aliases for backward compatibility
import { PROFILE } from './profile';
import { PROJECTS } from './projects';
import { INVENTORY_ITEMS } from './inventory';

export const PLAYER_PROFILE = PROFILE;
export const MISSIONS = PROJECTS;
export const INVENTORY_SKILLS = INVENTORY_ITEMS;
