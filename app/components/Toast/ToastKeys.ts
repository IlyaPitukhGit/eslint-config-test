export const TOAST_KEYS = {

  CONNECTION: {
    NO_INTERNET: 'connection.no_internet',
  },

  ACTION: {
    COPY:     'action.copy',
    SAVED:    'action.saved',
    DELETED:  'action.deleted',
    DOWNLOAD: 'action.download',
    UNDO:     'action.undo',
    GENERAL:  'action.general',
  },

  VOICEMAIL: {
    ACTION: 'voicemail.action',
  },

  ERROR: {
    HTTP_404: 'error.http_404',
  },
} as const;

type ExtractLeaves<T> = T extends string
  ? T
  : { [K in keyof T]: ExtractLeaves<T[K]> }[keyof T];

export type ToastKey = ExtractLeaves<typeof TOAST_KEYS>;
