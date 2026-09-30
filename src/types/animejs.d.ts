declare module 'animejs' {
  export interface AnimatableParameters {
    [key: string]: any;
    x?: number | string | Record<string, any>;
    y?: number | string | Record<string, any>;
    ease?: string;
    duration?: number;
  }

  export interface AnimatableInstance {
    x(value: number | string): void;
    y(value: number | string): void;
    revert(): void;
    pause(): void;
    play(): void;
    [key: string]: any;
  }

  export function createAnimatable(
    targets: any,
    parameters?: AnimatableParameters
  ): AnimatableInstance;

  export const utils: {
    clamp(val: number, min: number, max: number): number;
    round(val: number, decimalLength?: number): number;
    random(min: number, max: number): number;
    [key: string]: any;
  };

  export type AnimationCallback = (_target?: any, rawIndex?: any, length?: any) => any;

  export function animate(
    targets: any,
    parameters?: {
      [key: string]: any | AnimationCallback;
      x?: number | string | AnimationCallback;
      y?: number | string | AnimationCallback;
      scale?: number | string | AnimationCallback;
      opacity?: number | string | AnimationCallback;
      rotate?: number | string | AnimationCallback;
      duration?: number | AnimationCallback;
      delay?: number | AnimationCallback;
      ease?: string;
      easing?: string;
    }
  ): any;

  const anime: any;
  export default anime;
}
