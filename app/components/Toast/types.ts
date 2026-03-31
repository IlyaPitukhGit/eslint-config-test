import type { ToastKey } from './ToastKeys';


export interface ToastConfig {
  key: ToastKey;
  type?: string;
  position?: 'top' | 'bottom';
  bottomOffset?: number;
  topOffset?: number;
  autoHide?: boolean;
  visibilityTime?: number;
  swipeable?: boolean;
  props?: Record<string, unknown>;
}

export interface ActiveToast {
  key: ToastKey;
  shownAt: number;
}
