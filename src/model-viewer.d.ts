import type React from 'react';

/**
 * Extended interface for the <model-viewer> custom element.
 * Exposes methods and properties used for AR activation.
 */
export interface ModelViewerElement extends HTMLElement {
  /** The URL/path of the 3D model to display. */
  src: string;
  /** Activates the AR session using the best available mode for the device. */
  activateAR(): Promise<void>;
  /** True if AR can be activated on this device with the current configuration. */
  readonly canActivateAR: boolean;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        ar?: boolean | string;
        'ar-modes'?: string;
        'ar-scale'?: string;
        'ar-placement'?: string;
        'camera-controls'?: boolean | string;
        'auto-rotate'?: boolean | string;
        'xr-environment'?: boolean | string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        'exposure'?: string;
        'ios-src'?: string;
      };
    }
  }
}

export {};
