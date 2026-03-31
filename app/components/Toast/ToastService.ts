import Toast from 'react-native-toast-message';

import type { ToastKey } from './ToastKeys';
import type { ToastConfig, ActiveToast } from './types';

const TOAST_PRIORITY = { HIGH: 2, NORMAL: 1 } as const;

function getPriority(key: ToastKey): number {
  return key.startsWith('connection.') ? TOAST_PRIORITY.HIGH : TOAST_PRIORITY.NORMAL;
}

type CategoryDefaults = Pick<ToastConfig, 'autoHide' | 'visibilityTime' | 'swipeable'>;

const CATEGORY_DEFAULTS: Record<string, CategoryDefaults> = {
  'connection.': { autoHide: false, swipeable: false },
  'action.':     { autoHide: true,  visibilityTime: 3000, swipeable: true },
  'voicemail.':  { autoHide: true,  visibilityTime: 3000, swipeable: true },
  'error.':      { autoHide: true,  visibilityTime: 3000, swipeable: true },
};

function getCategoryDefaults(key: string): Partial<CategoryDefaults> {
  for (const prefix of Object.keys(CATEGORY_DEFAULTS)) {
    if (key.startsWith(prefix)) {
      return CATEGORY_DEFAULTS[prefix];
    }
  }
  return {};
}

export class ToastService {
  private static instance: ToastService | null = null;

  private currentKey: ToastKey | null = null;

  private constructor() {}

  static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  show(config: ToastConfig): void {
    if (this.currentKey === config.key) {
      return;
    }

    if (this.currentKey !== null) {
      if (getPriority(config.key) < getPriority(this.currentKey)) {
        return;
      }
    }

    const defaults = getCategoryDefaults(config.key);

    this.currentKey = config.key;
    const capturedKey = config.key;

    Toast.show({
      type:           config.type          ?? 'custom_toast',
      position:       config.position      ?? 'bottom',
      bottomOffset:   config.bottomOffset,
      topOffset:      config.topOffset,
      autoHide:       config.autoHide      ?? defaults.autoHide      ?? false,
      visibilityTime: config.visibilityTime ?? defaults.visibilityTime,
      swipeable:      config.swipeable     ?? defaults.swipeable     ?? false,
      props:          config.props,

      onHide: () => {
        if (this.currentKey === capturedKey) {
          this.currentKey = null;
        }
      },
    });
  }


  hide(key: ToastKey): void {
    if (this.currentKey !== key) {
      return;
    }

    this.currentKey = null;
    Toast.hide();
  }

  hideAll(): void {
    this.currentKey = null;
    Toast.hide();
  }

  isShowing(key: ToastKey): boolean {
    return this.currentKey === key;
  }

  getActiveToast(): ActiveToast | null {
    if (this.currentKey === null) {
      return null;
    }
    return { key: this.currentKey, shownAt: Date.now() };
  }

  resetOnLogout(): void {
    this.currentKey = null;
    Toast.hide();
  }
}

export const toastService = ToastService.getInstance();
